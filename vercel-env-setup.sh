#!/bin/bash

# Vercel Environment Variables Setup Script
echo "Setting up Vercel environment variables..."

# Supabase Configuration
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "https://aqvnasuputatphvqrqam.supabase.co"
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDUyMDksImV4cCI6MjA0ODM4MTIwOX0.eiNf3Fq-9MH5cusrH3LKcm5VvM6SBZ6Ax7HLbWDkT2Y"

# For now, we'll use placeholder values for these sensitive keys
# They should be replaced with actual values from Supabase dashboard
npx vercel env add SUPABASE_SERVICE_ROLE_KEY production <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjgwNTIwOSwiZXhwIjoyMDQ4MzgxMjA5fQ.placeholder-service-role-key"
npx vercel env add SUPABASE_JWT_SECRET production <<< "your-supabase-jwt-secret-from-dashboard"

# Additional environment variables
npx vercel env add NEXT_PUBLIC_APP_URL production <<< "https://voai-website.vercel.app"

echo "Environment variables setup complete!"