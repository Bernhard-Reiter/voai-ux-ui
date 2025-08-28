-- Drop old workflow_status table if exists to ensure clean migration
DROP TABLE IF EXISTS public.workflow_status CASCADE;

-- Create unified workflow status table
CREATE TABLE public.workflow_status (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id uuid NOT NULL REFERENCES public.workflow_jobs(id) ON DELETE CASCADE,
    stage text NOT NULL,
    message text,
    progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT NOW(),
    created_by uuid DEFAULT auth.uid()
);

-- Create constraint for valid stages
ALTER TABLE public.workflow_status
ADD CONSTRAINT valid_stage CHECK (stage IN (
    'created',
    'queued',
    'processing',
    'completed',
    'failed',
    'cancelled',
    'retrying',
    'paused',
    'resumed',
    'validation',
    'preprocessing',
    'postprocessing'
));

-- Create indexes for performance
CREATE INDEX idx_workflow_status_job_id ON public.workflow_status(job_id);
CREATE INDEX idx_workflow_status_stage ON public.workflow_status(stage);
CREATE INDEX idx_workflow_status_created_at ON public.workflow_status(created_at DESC);
CREATE INDEX idx_workflow_status_job_stage ON public.workflow_status(job_id, stage);

-- Enable RLS
ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view status for their own jobs
CREATE POLICY "Users can view their job status"
ON public.workflow_status
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.workflow_jobs
        WHERE workflow_jobs.id = workflow_status.job_id
        AND workflow_jobs.created_by = auth.uid()
    )
);

-- RLS Policy: Service role can view all status
CREATE POLICY "Service role can view all status"
ON public.workflow_status
FOR SELECT
USING (auth.role() = 'service_role');

-- RLS Policy: Only service role can insert status updates
CREATE POLICY "Service role can insert status"
ON public.workflow_status
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- RLS Policy: Only service role can update status
CREATE POLICY "Service role can update status"
ON public.workflow_status
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Create function to get latest status for a job
CREATE OR REPLACE FUNCTION public.get_latest_job_status(p_job_id uuid)
RETURNS TABLE (
    stage text,
    message text,
    progress integer,
    created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT stage, message, progress, created_at
    FROM public.workflow_status
    WHERE job_id = p_job_id
    ORDER BY created_at DESC
    LIMIT 1;
$$;

-- Grant permissions
GRANT ALL ON public.workflow_status TO service_role;
GRANT SELECT ON public.workflow_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_latest_job_status TO authenticated;

-- Add helpful comments
COMMENT ON TABLE public.workflow_status IS 'Unified status tracking for all workflow jobs with stage validation and progress tracking';
COMMENT ON COLUMN public.workflow_status.stage IS 'Current stage of the job execution';
COMMENT ON COLUMN public.workflow_status.progress IS 'Progress percentage (0-100)';
COMMENT ON COLUMN public.workflow_status.metadata IS 'Additional metadata for the status update';