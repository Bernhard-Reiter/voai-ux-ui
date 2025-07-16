# Supabase Setup Guide

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Get your credentials from:
- **Project URL**: Settings → API → Project URL
- **Anon Key**: Settings → API → Project API keys → anon public
- **Service Role Key**: Settings → API → Project API keys → service_role (keep secret!)

## Database Setup

### 1. Run Migrations

In your Supabase dashboard:
1. Go to SQL Editor
2. Copy the contents of these files and run them in order:
   - `supabase/migrations/20240716_initial_schema.sql`
   - `supabase/migrations/20240716_row_level_security.sql`

### 2. Enable Authentication Providers

1. Go to Authentication → Providers
2. Enable the following:
   - Email (enabled by default)
   - Google (optional)
   - GitHub (optional)

### 3. Configure Auth URLs

In Authentication → URL Configuration, add:
- Site URL: `http://localhost:3000` (for development)
- Redirect URLs: 
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3001/auth/callback`

## Testing the Setup

1. Start the frontend app:
   ```bash
   cd apps/frontend
   pnpm dev
   ```

2. Navigate to http://localhost:3000/auth
3. Create an account or sign in
4. You should be redirected to the dashboard

## Database Schema

### Tables

1. **profiles**
   - Stores user profile information
   - Automatically created on user signup

2. **negotiations**
   - Main table for negotiation data
   - Linked to user profiles
   - Statuses: draft, active, completed, archived

3. **documents**
   - Stores document metadata
   - Linked to negotiations and users
   - Actual files stored in Supabase Storage

### Row Level Security

All tables have RLS enabled:
- Users can only see/edit their own data
- Automatic user isolation for multi-tenancy

## Troubleshooting

### Auth Issues
- Check that your environment variables are set correctly
- Verify redirect URLs in Supabase dashboard
- Check browser console for errors

### Database Issues
- Ensure migrations ran successfully
- Check RLS policies are enabled
- Verify user has proper permissions

### Storage Issues
- Ensure 'documents' bucket exists
- Check storage policies are applied
- Verify file upload size limits