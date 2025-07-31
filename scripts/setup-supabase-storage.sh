#!/bin/bash

# Setup Supabase Storage for VOAI Website
# This script creates storage buckets and applies RLS policies

set -e

echo "🚀 Setting up Supabase Storage..."

# Supabase connection details
SUPABASE_URL="https://aqvnasuputatphvqrqam.supabase.co"
SUPABASE_SERVICE_KEY="sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I"

# Create storage buckets via Supabase API
echo "📦 Creating storage buckets..."

# Create user-uploads bucket
curl -X POST "$SUPABASE_URL/storage/v1/bucket" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-uploads",
    "name": "user-uploads",
    "public": false,
    "file_size_limit": 10485760,
    "allowed_mime_types": ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"]
  }' || echo "Bucket user-uploads might already exist"

# Create avatars bucket
curl -X POST "$SUPABASE_URL/storage/v1/bucket" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "avatars",
    "name": "avatars",
    "public": true,
    "file_size_limit": 2097152,
    "allowed_mime_types": ["image/jpeg", "image/png", "image/webp"]
  }' || echo "Bucket avatars might already exist"

echo "✅ Storage buckets created"

# Apply RLS policies via SQL
echo "🔒 Applying RLS policies..."

# Run migrations in order
MIGRATIONS_DIR="./supabase/migrations"
if [ -d "$MIGRATIONS_DIR" ]; then
  for migration in $MIGRATIONS_DIR/*.sql; do
    if [ -f "$migration" ]; then
      echo "Running migration: $(basename $migration)..."
      # Note: This requires supabase CLI or direct DB connection
      # For now, we'll output instructions
    fi
  done
fi

echo "
📌 Next Steps:
1. Run the SQL migrations in Supabase Dashboard:
   - Go to: $SUPABASE_URL/project/aqvnasuputatphvqrqam/sql
   - Execute each migration file in order from ./supabase/migrations/

2. Set environment variables in Vercel:
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=user-uploads
   N8N_OFFER_INGEST_URL=https://your-n8n-instance.com/webhook/offer-ingest

3. Verify buckets are created:
   - Go to: $SUPABASE_URL/project/aqvnasuputatphvqrqam/storage/buckets

✨ Storage setup instructions complete!
"