-- GDPR Data Retention Policy Implementation
-- This migration sets up automatic data retention and cleanup

-- Create a table to track data retention policies
CREATE TABLE IF NOT EXISTS public.data_retention_policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  retention_days INTEGER NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(table_name)
);

-- Insert default retention policies
INSERT INTO public.data_retention_policies (table_name, retention_days)
VALUES 
  ('data_deletion_log', 2555), -- 7 years for audit logs
  ('workflow_status', 90),     -- 90 days for workflow data
  ('files', 365);              -- 1 year for files
  
-- Create a function to clean up old data based on retention policies
CREATE OR REPLACE FUNCTION public.cleanup_old_data()
RETURNS void AS $$
DECLARE
  policy RECORD;
BEGIN
  -- Loop through active retention policies
  FOR policy IN 
    SELECT * FROM public.data_retention_policies 
    WHERE enabled = true
  LOOP
    -- Clean up workflow_status
    IF policy.table_name = 'workflow_status' THEN
      DELETE FROM public.workflow_status 
      WHERE updated_at < NOW() - INTERVAL '1 day' * policy.retention_days;
    END IF;
    
    -- Clean up files
    IF policy.table_name = 'files' THEN
      DELETE FROM public.files 
      WHERE created_at < NOW() - INTERVAL '1 day' * policy.retention_days
      AND status IN ('completed', 'failed');
    END IF;
    
    -- Clean up deletion logs (keep for compliance)
    IF policy.table_name = 'data_deletion_log' THEN
      DELETE FROM public.data_deletion_log 
      WHERE deleted_at < NOW() - INTERVAL '1 day' * policy.retention_days;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to run cleanup daily (requires pg_cron extension)
-- Note: pg_cron must be enabled in Supabase dashboard
-- SELECT cron.schedule('cleanup-old-data', '0 3 * * *', 'SELECT public.cleanup_old_data();');

-- Create an index on timestamp columns for better cleanup performance
CREATE INDEX IF NOT EXISTS idx_workflow_status_updated_at ON public.workflow_status(updated_at);
CREATE INDEX IF NOT EXISTS idx_files_created_at ON public.files(created_at);
CREATE INDEX IF NOT EXISTS idx_data_deletion_log_deleted_at ON public.data_deletion_log(deleted_at);

-- Create a function to anonymize old user data instead of deleting
CREATE OR REPLACE FUNCTION public.anonymize_old_user_data(days_old INTEGER DEFAULT 730)
RETURNS void AS $$
BEGIN
  -- Anonymize old profiles (keep the record but remove PII)
  UPDATE public.profiles
  SET 
    email = 'anonymized-' || id::text || '@example.com',
    full_name = 'Anonymized User',
    bio = NULL,
    metadata = jsonb_build_object('anonymized_at', NOW())
  WHERE created_at < NOW() - INTERVAL '1 day' * days_old
  AND email NOT LIKE 'anonymized-%';
  
  -- Remove metadata from old files
  UPDATE public.files
  SET 
    original_name = 'anonymized-file',
    metadata = jsonb_build_object('anonymized_at', NOW())
  WHERE created_at < NOW() - INTERVAL '1 day' * days_old
  AND original_name != 'anonymized-file';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.cleanup_old_data() TO service_role;
GRANT EXECUTE ON FUNCTION public.anonymize_old_user_data(INTEGER) TO service_role;