#!/bin/bash

# Script to update Vercel environment variables with new Supabase keys

echo "🔄 Updating Vercel Environment Variables..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# New Supabase keys
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU4MDcyNSwiZXhwIjoyMDY1MTU2NzI1fQ.o0EzGNGZ1G1R9pjKWkRAAA4KjJVi5naJMNaOj0AEGTQ"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3MjUsImV4cCI6MjA2NTE1NjcyNX0.8uHezlmnL4okIZPH4vSh-MEANyF-_UkILE65hFV_60w"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed!${NC}"
    echo "Please install it with: npm i -g vercel"
    exit 1
fi

echo -e "${YELLOW}📋 Removing old environment variables...${NC}"

# Remove old keys (with confirmation)
echo "y" | vercel env rm SUPABASE_SERVICE_ROLE_KEY production
echo "y" | vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production

echo -e "${GREEN}✅ Old keys removed${NC}"

echo -e "${YELLOW}📝 Adding new environment variables...${NC}"

# Add new keys
echo "$SUPABASE_SERVICE_ROLE_KEY" | vercel env add SUPABASE_SERVICE_ROLE_KEY production
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SUPABASE_SERVICE_ROLE_KEY added successfully${NC}"
else
    echo -e "${RED}❌ Failed to add SUPABASE_SERVICE_ROLE_KEY${NC}"
    exit 1
fi

echo "$NEXT_PUBLIC_SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ NEXT_PUBLIC_SUPABASE_ANON_KEY added successfully${NC}"
else
    echo -e "${RED}❌ Failed to add NEXT_PUBLIC_SUPABASE_ANON_KEY${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 All environment variables updated successfully!${NC}"
echo -e "${YELLOW}📦 Remember to redeploy your application for changes to take effect.${NC}"