#!/bin/bash
# Deployment ohne Team-Scope (persönlicher Account)

echo "🚀 Starte Vercel Deployment (Persönlicher Account)..."

# Setze Token
export VERCEL_TOKEN="lcAfzDsg3RfL7skYdGxPeRl8"

# Deploy ohne --scope flag
npx vercel --prod --yes

echo "✅ Deployment gestartet!"