# Supabase Migrations

This directory contains all database migrations for the application, with a focus on Row Level Security (RLS) policies.

## Migration Files

### 001_workflow_status.sql ✅
- Creates the `workflow_status` table for tracking n8n workflow executions
- Implements RLS policies for user isolation
- Includes real-time subscription support

### 002_files_table_rls.sql 🆕
- Creates the `files` table for tracking uploaded files
- Implements comprehensive RLS policies:
  - Users can only access their own files
  - Service role has full access for backend operations
- Includes proper indexes for performance

### 003_profiles_table_rls.sql 🆕
- Creates the `profiles` table for user profile data
- Implements RLS policies for profile access control
- Includes automatic profile creation on user signup
- Users can only access and modify their own profile

### 004_storage_buckets_rls.sql 🆕
- Sets up Supabase Storage buckets with RLS:
  - `user-uploads`: Private bucket for user files
  - `avatars`: Public bucket for profile pictures
- Implements folder-based isolation for user uploads
- Enforces file size and type restrictions

### 005_rls_summary.sql 📋
- Documentation file summarizing all RLS policies
- Includes verification queries for checking RLS status

## Running Migrations

To apply these migrations to your Supabase instance:

```bash
# Using Supabase CLI
supabase db push

# Or apply individually
supabase db push --include 001_workflow_status.sql
supabase db push --include 002_files_table_rls.sql
# etc...
```

## Security Principles

All tables follow these RLS principles:

1. **User Isolation**: Users can only access their own data using `auth.uid()`
2. **Service Role Access**: Backend services can bypass RLS using service role key
3. **Cascade Deletion**: User data is automatically deleted when user is deleted
4. **No Public Access**: All tables require authentication

## Verification

After applying migrations, verify RLS is enabled:

```sql
-- Check if RLS is enabled on all tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- List all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## Testing RLS Policies

Always test RLS policies by:

1. Creating test users
2. Attempting to access data across users (should fail)
3. Verifying service role can access all data
4. Testing CRUD operations for each table

## Important Notes

- Never disable RLS on tables containing user data
- Always use `auth.uid()` for user identification
- Consider performance implications of complex RLS policies
- Use proper indexes to optimize RLS query performance