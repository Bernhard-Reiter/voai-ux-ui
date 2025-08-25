#!/bin/bash

echo "🚀 VoAI Production Deployment"
echo "============================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check environment
if [ "$1" != "production" ]; then
    echo -e "${RED}❌ Please confirm production deployment: ./deploy-production.sh production${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  Production deployment starting...${NC}"

# Pre-flight checks
echo ""
echo "✈️  Pre-flight checks..."

# Check required environment variables
required_vars=(
    "VERCEL_TOKEN"
    "GITHUB_TOKEN"
    "SUPABASE_PROJECT_ID"
    "DATABASE_URL"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}❌ Missing required environment variable: $var${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables OK${NC}"

# Run tests
echo ""
echo "🧪 Running tests..."
pnpm test
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Tests failed. Aborting deployment.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Tests passed${NC}"

# Build check
echo ""
echo "🔨 Building project..."
pnpm build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Aborting deployment.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful${NC}"

# Database migrations
echo ""
echo "🗄️  Running database migrations..."
npx supabase db push --project-id $SUPABASE_PROJECT_ID
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Migration failed. Aborting deployment.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Migrations complete${NC}"

# Deploy to Vercel
echo ""
echo "☁️  Deploying to Vercel..."
vercel --prod --token=$VERCEL_TOKEN
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Vercel deployment failed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Vercel deployment complete${NC}"

# Deploy worker
echo ""
echo "⚙️  Deploying worker..."
cd worker
# Uncomment for your platform:
# railway up --service voai-worker
# flyctl deploy
# render deploy
cd ..

# Health check
echo ""
echo "❤️  Running health checks..."
sleep 10

# Check main app
response=$(curl -s -o /dev/null -w "%{http_code}" https://app.voai.com/api/health)
if [ "$response" != "200" ]; then
    echo -e "${RED}❌ Health check failed: HTTP $response${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Application is healthy${NC}"

# Create deployment record
echo ""
echo "📝 Recording deployment..."
cat > deployment-record.json << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "version": "$(git rev-parse HEAD)",
  "deployer": "$(git config user.name)",
  "environment": "production",
  "status": "success"
}
EOF

# Notify team (optional)
# curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
#   -H 'Content-type: application/json' \
#   -d '{"text":"🚀 VoAI deployed to production"}'

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📊 Next steps:"
echo "1. Monitor metrics: https://app.voai.com/api/metrics"
echo "2. Check logs: vercel logs"
echo "3. Monitor alerts in Grafana"
echo ""
echo "🎉 VoAI is now live in production!"