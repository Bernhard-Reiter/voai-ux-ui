-- Ensure pgboss schema exists
CREATE SCHEMA IF NOT EXISTS pgboss;

-- Grant usage on pgboss schema to necessary roles
GRANT USAGE ON SCHEMA pgboss TO service_role;
GRANT USAGE ON SCHEMA pgboss TO authenticated;

-- Configure pgboss retention policies
-- Note: These settings would typically be configured in your pgBoss initialization code
-- This migration documents the expected configuration

-- Create monitoring view for pgboss queue status
CREATE OR REPLACE VIEW public.pgboss_queue_status AS
SELECT 
    name as queue_name,
    COUNT(*) FILTER (WHERE state = 'created') as created_count,
    COUNT(*) FILTER (WHERE state = 'active') as active_count,
    COUNT(*) FILTER (WHERE state = 'completed') as completed_count,
    COUNT(*) FILTER (WHERE state = 'expired') as expired_count,
    COUNT(*) FILTER (WHERE state = 'cancelled') as cancelled_count,
    COUNT(*) FILTER (WHERE state = 'failed') as failed_count,
    COUNT(*) FILTER (WHERE state = 'retry') as retry_count,
    COUNT(*) as total_count,
    MIN(createdon) as oldest_job_created,
    MAX(createdon) as newest_job_created,
    AVG(EXTRACT(EPOCH FROM (completedon - startedon)) * 1000)::integer as avg_duration_ms
FROM pgboss.job
GROUP BY name;

-- Create view for job state transitions
CREATE OR REPLACE VIEW public.pgboss_job_transitions AS
SELECT 
    id,
    name as queue_name,
    state,
    createdon,
    startedon,
    completedon,
    EXTRACT(EPOCH FROM (completedon - startedon)) * 1000 as duration_ms,
    retrycount,
    retrydelay,
    retrybackoff,
    retrylimit,
    data,
    output
FROM pgboss.job
ORDER BY createdon DESC;

-- Create function to get pgboss health status
CREATE OR REPLACE FUNCTION public.get_pgboss_health()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
DECLARE
    v_result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'total_jobs', COUNT(*),
        'active_jobs', COUNT(*) FILTER (WHERE state = 'active'),
        'failed_jobs', COUNT(*) FILTER (WHERE state = 'failed'),
        'completed_today', COUNT(*) FILTER (WHERE state = 'completed' AND completedon >= CURRENT_DATE),
        'oldest_pending', MIN(createdon) FILTER (WHERE state = 'created'),
        'queues', (
            SELECT jsonb_agg(DISTINCT name)
            FROM pgboss.job
        )
    ) INTO v_result
    FROM pgboss.job;
    
    RETURN v_result;
END;
$$;

-- Create function to purge old pgboss jobs
CREATE OR REPLACE FUNCTION public.purge_old_pgboss_jobs(
    p_days_to_keep integer DEFAULT 7,
    p_states text[] DEFAULT ARRAY['completed', 'failed', 'expired', 'cancelled']
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_deleted_count integer;
BEGIN
    DELETE FROM pgboss.job
    WHERE state = ANY(p_states)
    AND createdon < NOW() - (p_days_to_keep || ' days')::interval;
    
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
    
    RETURN v_deleted_count;
END;
$$;

-- Create index for performance (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE schemaname = 'pgboss' 
        AND tablename = 'job' 
        AND indexname = 'job_name_state_idx'
    ) THEN
        CREATE INDEX job_name_state_idx ON pgboss.job(name, state);
    END IF;
END $$;

-- Grant read access to authenticated users for monitoring views
GRANT SELECT ON public.pgboss_queue_status TO authenticated;
GRANT SELECT ON public.pgboss_job_transitions TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_pgboss_health() TO authenticated;

-- Grant purge function only to service role
GRANT EXECUTE ON FUNCTION public.purge_old_pgboss_jobs TO service_role;

-- Revoke direct access to pgboss tables from authenticated users (security)
REVOKE ALL ON ALL TABLES IN SCHEMA pgboss FROM authenticated;

-- Add helpful comments
COMMENT ON VIEW public.pgboss_queue_status IS 'Real-time monitoring of pgBoss queue statistics';
COMMENT ON VIEW public.pgboss_job_transitions IS 'Detailed view of pgBoss job state transitions';
COMMENT ON FUNCTION public.get_pgboss_health IS 'Returns overall health metrics for pgBoss job processing';
COMMENT ON FUNCTION public.purge_old_pgboss_jobs IS 'Removes old pgBoss jobs based on age and state (default: 7 days)';

-- Document retention policy recommendations
COMMENT ON SCHEMA pgboss IS 'pgBoss job queue schema. Recommended retention: 7 days for completed jobs, 30 days for failed jobs. Configure in pgBoss initialization: { archiveCompletedAfterSeconds: 604800, deleteAfterDays: 30 }';