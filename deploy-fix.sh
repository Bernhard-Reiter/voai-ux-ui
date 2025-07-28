#!/bin/bash

echo "🔧 Vercel Deployment Fix für Monorepo..."

# Sicherstellen dass wir im Root sind
cd /Users/bernhard/MCP\ Server/github-mcp-server/voai-website

# Vercel CLI deployment mit korrekten Einstellungen
echo "🚀 Starte Deployment mit korrekten Einstellungen..."

# Force deployment mit den richtigen Einstellungen
npx vercel \
  --prod \
  --yes \
  --build-env NEXT_PUBLIC_SUPABASE_URL="https://aqvnasuputatphvqrqam.supabase.co" \
  --build-env NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDUyMDksImV4cCI6MjA0ODM4MTIwOX0.eiNf3Fq-9MH5cusrH3LKcm5VvM6SBZ6Ax7HLbWDkT2Y" \
  --build-env NEXT_PUBLIC_APP_URL="https://voai-website.vercel.app" \
  --scope vi4 \
  --name voai-website