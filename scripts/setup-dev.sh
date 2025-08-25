#!/bin/bash

echo "🚀 VoAI Development Setup"
echo "========================"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found. Please create it first."
    exit 1
fi

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

echo "✅ Environment variables loaded"

# Check required services
echo ""
echo "📋 Checking required services..."

# Check Supabase
if [[ -z "$SUPABASE_PROJECT_ID" ]]; then
    echo "❌ SUPABASE_PROJECT_ID not set"
    exit 1
fi

echo "✅ Supabase configured: $SUPABASE_PROJECT_ID"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build packages
echo ""
echo "🔨 Building packages..."
pnpm --filter @voai/billing build
pnpm --filter @voai/wf-core build

# Run Supabase migrations
echo ""
echo "🗄️  Running database migrations..."
npx supabase db push --project-id $SUPABASE_PROJECT_ID

# Check ClamAV (optional for development)
if command -v clamscan &> /dev/null; then
    echo "✅ ClamAV installed"
else
    echo "⚠️  ClamAV not installed. Install with:"
    echo "   macOS: brew install clamav"
    echo "   Ubuntu: sudo apt-get install clamav clamav-daemon"
fi

# Create test data
echo ""
echo "🌱 Creating test data..."
node scripts/seed-test-data.js

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start the worker: pnpm --filter @voai/worker dev"
echo "2. Start the frontend: pnpm --filter frontend dev"
echo "3. Visit http://localhost:3000"
echo ""
echo "🔍 Monitoring:"
echo "- Metrics: http://localhost:3000/api/metrics"
echo "- Status: http://localhost:3000/status"