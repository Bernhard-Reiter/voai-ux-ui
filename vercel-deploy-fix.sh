#!/bin/bash

echo "🚀 Fixing Vercel deployment configuration..."

# Ensure we're in the project root
cd /Users/bernhard/MCP\ Server/github-mcp-server/voai-website

# Clean up any previous attempts
rm -rf .vercel/output 2>/dev/null || true

# Update vercel.json to ensure correct paths
cat > vercel.json << 'EOF'
{
  "buildCommand": "cd ../.. && pnpm turbo run build --filter=@voai/frontend",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
EOF

# Create a deployment script that runs from the correct directory
cat > apps/frontend/deploy.sh << 'EOF'
#!/bin/bash
# This script should be run from apps/frontend
npx vercel --prod --yes \
  --cwd ../.. \
  --build-env NEXT_PUBLIC_SUPABASE_URL="https://aqvnasuputatphvqrqam.supabase.co" \
  --build-env NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDUyMDksImV4cCI6MjA0ODM4MTIwOX0.eiNf3Fq-9MH5cusrH3LKcm5VvM6SBZ6Ax7HLbWDkT2Y" \
  --build-env NEXT_PUBLIC_APP_URL="https://voai-website.vercel.app" \
  --local-config ../../vercel.json
EOF

chmod +x apps/frontend/deploy.sh

# Move vercel.json to apps/frontend temporarily
cp vercel.json apps/frontend/vercel.json

echo "📁 Deploying from apps/frontend directory..."
cd apps/frontend

# Deploy from the frontend directory
npx vercel --prod --yes 2>&1 | tee ../../deployment-fix.log