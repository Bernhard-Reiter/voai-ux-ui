-- Fix permissions for Supabase tables
-- Run this after creating the tables

-- Grant usage on public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant all privileges on tables to service_role
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Grant specific permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflow_status TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.files TO authenticated;

-- Grant permissions to anon users (read only)
GRANT SELECT ON public.workflow_status TO anon;
GRANT SELECT ON public.files TO anon;

-- Make sure the tables are owned by the right user
ALTER TABLE public.workflow_status OWNER TO postgres;
ALTER TABLE public.files OWNER TO postgres;

-- Verify RLS is enabled
ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Test query to verify permissions
SELECT 
    schemaname,
    tablename,
    tableowner,
    has_table_privilege('anon', schemaname||'.'||tablename, 'SELECT') as anon_select,
    has_table_privilege('authenticated', schemaname||'.'||tablename, 'SELECT') as auth_select,
    has_table_privilege('service_role', schemaname||'.'||tablename, 'SELECT') as service_select
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('workflow_status', 'files');