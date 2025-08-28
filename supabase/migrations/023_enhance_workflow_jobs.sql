-- Add audit fields to workflow_jobs table
ALTER TABLE public.workflow_jobs
ADD COLUMN IF NOT EXISTS completed_at timestamptz,
ADD COLUMN IF NOT EXISTS failed_at timestamptz,
ADD COLUMN IF NOT EXISTS retry_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_retries integer DEFAULT 3,
ADD COLUMN IF NOT EXISTS last_error text,
ADD COLUMN IF NOT EXISTS duration_ms integer,
ADD COLUMN IF NOT EXISTS started_at timestamptz;

-- Add constraints for audit fields
ALTER TABLE public.workflow_jobs
ADD CONSTRAINT retry_count_non_negative CHECK (retry_count >= 0),
ADD CONSTRAINT max_retries_positive CHECK (max_retries > 0),
ADD CONSTRAINT duration_ms_positive CHECK (duration_ms IS NULL OR duration_ms >= 0);

-- Create function to update audit timestamps
CREATE OR REPLACE FUNCTION public.update_workflow_job_audit()
RETURNS TRIGGER AS $$
BEGIN
    -- When job starts processing
    IF OLD.status != 'processing' AND NEW.status = 'processing' THEN
        NEW.started_at = NOW();
        NEW.updated_at = NOW();
    END IF;
    
    -- When job completes
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        NEW.completed_at = NOW();
        NEW.updated_at = NOW();
        -- Calculate duration if started_at is set
        IF NEW.started_at IS NOT NULL THEN
            NEW.duration_ms = EXTRACT(MILLISECOND FROM (NOW() - NEW.started_at))::integer;
        END IF;
    END IF;
    
    -- When job fails
    IF OLD.status != 'failed' AND NEW.status = 'failed' THEN
        NEW.failed_at = NOW();
        NEW.updated_at = NOW();
        -- Calculate duration if started_at is set
        IF NEW.started_at IS NOT NULL THEN
            NEW.duration_ms = EXTRACT(MILLISECOND FROM (NOW() - NEW.started_at))::integer;
        END IF;
    END IF;
    
    -- Increment retry count when retrying
    IF OLD.status = 'failed' AND NEW.status = 'pending' THEN
        NEW.retry_count = COALESCE(OLD.retry_count, 0) + 1;
        NEW.updated_at = NOW();
        -- Clear previous failure timestamp
        NEW.failed_at = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create audit trigger
CREATE TRIGGER workflow_jobs_audit_trigger
BEFORE UPDATE ON public.workflow_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_workflow_job_audit();

-- Create job metrics view for monitoring
CREATE OR REPLACE VIEW public.job_metrics AS
SELECT 
    type,
    status,
    queue_name,
    COUNT(*) as job_count,
    AVG(duration_ms) as avg_duration_ms,
    MIN(duration_ms) as min_duration_ms,
    MAX(duration_ms) as max_duration_ms,
    AVG(retry_count) as avg_retry_count,
    MAX(retry_count) as max_retry_count,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_count,
    COUNT(*) FILTER (WHERE status = 'processing') as processing_count,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE retry_count > 0) as retried_count,
    MIN(created_at) as oldest_job,
    MAX(created_at) as newest_job,
    MAX(completed_at) as last_completed,
    MAX(failed_at) as last_failed
FROM public.workflow_jobs
GROUP BY type, status, queue_name;

-- Create detailed job performance view
CREATE OR REPLACE VIEW public.job_performance AS
SELECT 
    id,
    type,
    status,
    queue_name,
    created_at,
    started_at,
    completed_at,
    failed_at,
    duration_ms,
    retry_count,
    CASE 
        WHEN started_at IS NOT NULL AND completed_at IS NULL AND failed_at IS NULL 
        THEN EXTRACT(MILLISECOND FROM (NOW() - started_at))::integer
        ELSE duration_ms
    END as current_duration_ms,
    CASE
        WHEN status = 'pending' AND created_at < NOW() - INTERVAL '5 minutes' THEN 'stuck_pending'
        WHEN status = 'processing' AND started_at < NOW() - INTERVAL '30 minutes' THEN 'stuck_processing'
        WHEN status = 'failed' AND retry_count >= max_retries THEN 'max_retries_reached'
        ELSE 'normal'
    END as health_status
FROM public.workflow_jobs;

-- Create function to clean up old completed jobs
CREATE OR REPLACE FUNCTION public.cleanup_old_jobs(p_days_to_keep integer DEFAULT 30)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_deleted_count integer;
BEGIN
    DELETE FROM public.workflow_jobs
    WHERE status = 'completed'
    AND completed_at < NOW() - (p_days_to_keep || ' days')::interval
    RETURNING id INTO v_deleted_count;
    
    RETURN COALESCE(v_deleted_count, 0);
END;
$$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_workflow_jobs_status_queue ON public.workflow_jobs(status, queue_name);
CREATE INDEX IF NOT EXISTS idx_workflow_jobs_completed_at ON public.workflow_jobs(completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_workflow_jobs_failed_at ON public.workflow_jobs(failed_at) WHERE failed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_workflow_jobs_retry_count ON public.workflow_jobs(retry_count) WHERE retry_count > 0;

-- Grant appropriate permissions
GRANT SELECT ON public.job_metrics TO authenticated;
GRANT SELECT ON public.job_performance TO authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_jobs TO service_role;

-- Add comments
COMMENT ON VIEW public.job_metrics IS 'Aggregated metrics for workflow jobs by type, status, and queue';
COMMENT ON VIEW public.job_performance IS 'Detailed performance and health information for individual jobs';
COMMENT ON FUNCTION public.cleanup_old_jobs IS 'Removes completed jobs older than specified days (default 30)';