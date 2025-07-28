#!/bin/bash

echo "🚀 Starte Vercel Deployment mit Override-Einstellungen..."

cd /Users/bernhard/MCP\ Server/github-mcp-server/voai-website

# Force deployment ohne Git-Check
npx vercel --prod --force --yes \
  --build-env VERCEL_FORCE_NO_BUILD_CACHE="1" \
  --build-env NEXT_PUBLIC_SUPABASE_URL="https://aqvnasuputatphvqrqam.supabase.co" \
  --build-env NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDUyMDksImV4cCI6MjA0ODM4MTIwOX0.eiNf3Fq-9MH5cusrH3LKcm5VvM6SBZ6Ax7HLbWDkT2Y" \
  --build-env NEXT_PUBLIC_APP_URL="https://voai-website.vercel.app" \
  2>&1 | tee vercel-deploy.log