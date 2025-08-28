-- Enable realtime for workflow_status table
ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_status;

-- Enable realtime for workflow_jobs table
ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_jobs;

-- Create helper function to append workflow status with realtime notification
CREATE OR REPLACE FUNCTION public.append_workflow_status(
    p_job_id uuid,
    p_stage text,
    p_message text DEFAULT NULL,
    p_progress integer DEFAULT NULL,
    p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_status_id uuid;
    v_job_exists boolean;
BEGIN
    -- Verify job exists
    SELECT EXISTS (
        SELECT 1 FROM public.workflow_jobs WHERE id = p_job_id
    ) INTO v_job_exists;
    
    IF NOT v_job_exists THEN
        RAISE EXCEPTION 'Job with ID % does not exist', p_job_id;
    END IF;
    
    -- Insert new status record
    INSERT INTO public.workflow_status (
        job_id,
        stage,
        message,
        progress,
        metadata,
        created_at
    ) VALUES (
        p_job_id,
        p_stage,
        p_message,
        COALESCE(p_progress, 0),
        p_metadata,
        NOW()
    ) RETURNING id INTO v_status_id;
    
    -- Update job status if stage maps to a job status
    CASE p_stage
        WHEN 'processing' THEN
            UPDATE public.workflow_jobs 
            SET status = 'processing', updated_at = NOW() 
            WHERE id = p_job_id AND status != 'processing';
        WHEN 'completed' THEN
            UPDATE public.workflow_jobs 
            SET status = 'completed', updated_at = NOW() 
            WHERE id = p_job_id AND status != 'completed';
        WHEN 'failed' THEN
            UPDATE public.workflow_jobs 
            SET status = 'failed', updated_at = NOW() 
            WHERE id = p_job_id AND status != 'failed';
        WHEN 'cancelled' THEN
            UPDATE public.workflow_jobs 
            SET status = 'cancelled', updated_at = NOW() 
            WHERE id = p_job_id AND status != 'cancelled';
        ELSE
            -- For other stages, just update the timestamp
            UPDATE public.workflow_jobs 
            SET updated_at = NOW() 
            WHERE id = p_job_id;
    END CASE;
    
    RETURN v_status_id;
END;
$$;

-- Create function to get realtime status updates for a job
CREATE OR REPLACE FUNCTION public.subscribe_to_job_updates(p_job_id uuid)
RETURNS TABLE (
    job_id uuid,
    stage text,
    message text,
    progress integer,
    created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT 
        job_id,
        stage,
        message,
        progress,
        created_at
    FROM public.workflow_status
    WHERE job_id = p_job_id
    ORDER BY created_at DESC;
$$;

-- Create materialized view for active job monitoring (refreshed periodically)
CREATE MATERIALIZED VIEW IF NOT EXISTS public.active_jobs_monitor AS
SELECT 
    j.id,
    j.type,
    j.status,
    j.queue_name,
    j.created_at,
    j.started_at,
    COALESCE(
        EXTRACT(EPOCH FROM (NOW() - j.started_at)) * 1000,
        0
    )::integer as running_duration_ms,
    s.stage as latest_stage,
    s.message as latest_message,
    s.progress as latest_progress,
    s.created_at as latest_update
FROM public.workflow_jobs j
LEFT JOIN LATERAL (
    SELECT stage, message, progress, created_at
    FROM public.workflow_status
    WHERE job_id = j.id
    ORDER BY created_at DESC
    LIMIT 1
) s ON true
WHERE j.status IN ('pending', 'processing')
WITH DATA;

-- Create index on materialized view
CREATE INDEX IF NOT EXISTS idx_active_jobs_monitor_status 
ON public.active_jobs_monitor(status);

-- Create function to refresh active jobs monitor
CREATE OR REPLACE FUNCTION public.refresh_active_jobs_monitor()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.active_jobs_monitor;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.append_workflow_status TO service_role;
GRANT EXECUTE ON FUNCTION public.subscribe_to_job_updates TO authenticated;
GRANT EXECUTE ON FUNCTION public.refresh_active_jobs_monitor TO service_role;

-- Grant select on materialized view
GRANT SELECT ON public.active_jobs_monitor TO authenticated;

-- Create scheduled job to refresh the materialized view (note: this would be done via pg_cron or external scheduler)
-- Example pg_cron command (requires pg_cron extension):
-- SELECT cron.schedule('refresh-active-jobs', '*/1 * * * *', 'SELECT public.refresh_active_jobs_monitor();');

-- Add comments
COMMENT ON FUNCTION public.append_workflow_status IS 'Appends a new status entry for a job with automatic realtime notification';
COMMENT ON FUNCTION public.subscribe_to_job_updates IS 'Helper function to subscribe to realtime updates for a specific job';
COMMENT ON MATERIALIZED VIEW public.active_jobs_monitor IS 'Materialized view for monitoring active jobs, refreshed every minute';

-- Document realtime subscription pattern
COMMENT ON TABLE public.workflow_status IS E'Realtime-enabled table for job status updates. Subscribe using:\n\nconst channel = supabase.channel(''job-updates'')\n  .on(''postgres_changes'', {\n    event: ''INSERT'',\n    schema: ''public'',\n    table: ''workflow_status'',\n    filter: `job_id=eq.${jobId}`\n  }, (payload) => {\n    console.log(''New status:'', payload.new)\n  })\n  .subscribe()';