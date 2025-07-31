#!/bin/bash

# Supabase connection string
DATABASE_URL="postgresql://postgres:20Vi425!?@db.aqvnasuputatphvqrqam.supabase.co:5432/postgres"

echo "🚀 Executing Supabase migrations via psql..."
echo ""
echo "📌 Using DATABASE_URL to connect..."

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "❌ psql command not found. Please install PostgreSQL client."
    echo "   On macOS: brew install postgresql"
    echo "   On Ubuntu: sudo apt-get install postgresql-client"
    exit 1
fi

# Execute the SQL file
echo "📝 Running migrations from scripts/supabase-pr12-setup.sql..."
psql "$DATABASE_URL" -f ./scripts/supabase-pr12-setup.sql

if [ $? -eq 0 ]; then
    echo "✅ Migrations executed successfully!"
else
    echo "❌ Migration execution failed. Please check the error messages above."
fi

echo ""
echo "📋 Next steps:"
echo "1. Verify tables in Supabase Dashboard:"
echo "   https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/editor"
echo "2. Create Storage Buckets manually in the Dashboard"