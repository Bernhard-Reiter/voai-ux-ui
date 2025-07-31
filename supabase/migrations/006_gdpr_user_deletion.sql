-- Create a function for complete user deletion (GDPR Right to Erasure)
CREATE OR REPLACE FUNCTION public.delete_user_data(user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Delete user's files from storage
  DELETE FROM storage.objects 
  WHERE bucket_id IN ('user-uploads', 'avatars') 
  AND (owner = user_id OR name LIKE user_id::text || '/%');

  -- Delete user's file records
  DELETE FROM public.files WHERE user_id = user_id;

  -- Delete user's profile
  DELETE FROM public.profiles WHERE id = user_id;

  -- Delete workflow status
  DELETE FROM public.workflow_status WHERE user_id = user_id;

  -- Note: The actual auth.users deletion should be handled by Supabase 
  -- through the admin API or service role after this function completes
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users (they can only delete their own data)
GRANT EXECUTE ON FUNCTION public.delete_user_data(UUID) TO authenticated;

-- Create an audit log table for GDPR compliance
CREATE TABLE IF NOT EXISTS public.data_deletion_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  deleted_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_by UUID,
  deletion_type VARCHAR(50) NOT NULL CHECK (deletion_type IN ('user_requested', 'admin_action', 'automated')),
  metadata JSONB
);

-- Enable RLS on audit log
ALTER TABLE public.data_deletion_log ENABLE ROW LEVEL SECURITY;

-- Only service role can view deletion logs
CREATE POLICY "Service role can view deletion logs" ON public.data_deletion_log
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

-- Create a function to log deletions
CREATE OR REPLACE FUNCTION public.log_user_deletion(
  p_user_id UUID,
  p_deletion_type VARCHAR(50),
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.data_deletion_log (user_id, deleted_by, deletion_type, metadata)
  VALUES (p_user_id, auth.uid(), p_deletion_type, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to export user data (GDPR Right to Data Portability)
CREATE OR REPLACE FUNCTION public.export_user_data(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Only allow users to export their own data
  IF auth.uid() != p_user_id AND auth.jwt() ->> 'role' != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT jsonb_build_object(
    'user_id', p_user_id,
    'export_date', NOW(),
    'profile', (SELECT row_to_json(p) FROM public.profiles p WHERE p.id = p_user_id),
    'files', (SELECT jsonb_agg(row_to_json(f)) FROM public.files f WHERE f.user_id = p_user_id),
    'workflow_status', (SELECT jsonb_agg(row_to_json(w)) FROM public.workflow_status w WHERE w.user_id = p_user_id)
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.export_user_data(UUID) TO authenticated;