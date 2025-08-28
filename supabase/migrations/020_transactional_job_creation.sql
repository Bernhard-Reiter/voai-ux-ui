-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to create job with queue in a transactional manner
-- This ensures job creation and queue assignment are atomic
CREATE OR REPLACE FUNCTION public.create_job_with_queue(
    p_type text,
    p_data jsonb DEFAULT '{}'::jsonb,
    p_options jsonb DEFAULT '{}'::jsonb,
    p_queue_name text DEFAULT 'default'
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_job_id uuid;
    v_valid_types text[] := ARRAY['audio_processing', 'file_upload', 'workflow', 'notification', 'export', 'import'];
    v_valid_queues text[] := ARRAY['default', 'priority', 'batch', 'scheduled'];
BEGIN
    -- Input validation
    IF p_type IS NULL OR p_type = '' THEN
        RAISE EXCEPTION 'Job type cannot be null or empty';
    END IF;
    
    IF NOT (p_type = ANY(v_valid_types)) THEN
        RAISE EXCEPTION 'Invalid job type: %. Valid types are: %', p_type, array_to_string(v_valid_types, ', ');
    END IF;
    
    IF NOT (p_queue_name = ANY(v_valid_queues)) THEN
        RAISE EXCEPTION 'Invalid queue name: %. Valid queues are: %', p_queue_name, array_to_string(v_valid_queues, ', ');
    END IF;
    
    -- Validate JSON structure
    IF p_data IS NULL THEN
        p_data := '{}'::jsonb;
    END IF;
    
    IF p_options IS NULL THEN
        p_options := '{}'::jsonb;
    END IF;
    
    -- Generate job ID
    v_job_id := gen_random_uuid();
    
    -- Insert job into workflow_jobs table
    INSERT INTO public.workflow_jobs (
        id,
        type,
        status,
        data,
        options,
        queue_name,
        created_by,
        created_at,
        updated_at
    ) VALUES (
        v_job_id,
        p_type,
        'pending',
        p_data,
        p_options,
        p_queue_name,
        auth.uid(),
        NOW(),
        NOW()
    );
    
    -- Log initial status
    INSERT INTO public.workflow_status (
        job_id,
        stage,
        message,
        progress,
        created_at
    ) VALUES (
        v_job_id,
        'created',
        format('Job created with type: %s in queue: %s', p_type, p_queue_name),
        0,
        NOW()
    );
    
    RETURN v_job_id;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error and re-raise
        RAISE LOG 'Error creating job: %', SQLERRM;
        RAISE;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_job_with_queue TO authenticated;

-- Revoke execute from public and anon for security
REVOKE EXECUTE ON FUNCTION public.create_job_with_queue FROM public, anon;

-- Add comment for documentation
COMMENT ON FUNCTION public.create_job_with_queue IS 
'Creates a new job with transactional guarantees. Ensures job creation and initial status logging are atomic. Only accessible to authenticated users.';