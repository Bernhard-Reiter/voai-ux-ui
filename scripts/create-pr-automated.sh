#!/bin/bash

# Script to create PR automatically
set -e

echo "📋 Creating Pull Request for Vercel deployment..."

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "vercel-deploy" ]; then
    echo "❌ Error: Not on vercel-deploy branch. Current branch: $CURRENT_BRANCH"
    echo "Run: git checkout vercel-deploy"
    exit 1
fi

# Check if PR_DESCRIPTION_VERCEL.md exists
if [ ! -f "PR_DESCRIPTION_VERCEL.md" ]; then
    echo "❌ Error: PR_DESCRIPTION_VERCEL.md not found"
    exit 1
fi

# Create PR using GitHub CLI
echo "🚀 Creating PR..."
PR_URL=$(gh pr create \
    --base main \
    --head vercel-deploy \
    --title "feat: Vercel deployment configuration for DSGVO-compliant hosting" \
    --body-file PR_DESCRIPTION_VERCEL.md \
    2>&1)

if [ $? -eq 0 ]; then
    echo "✅ PR created successfully!"
    echo "📎 PR URL: $PR_URL"
    
    # Open PR in browser
    echo "🌐 Opening PR in browser..."
    open "$PR_URL"
    
    echo ""
    echo "Next steps:"
    echo "1. ⏳ Wait for CI checks to complete"
    echo "2. 🔀 Merge the PR (Squash and merge recommended)"
    echo "3. ⏱️  Wait 2-3 minutes for deployment"
    echo "4. 🧪 Run: ./scripts/post-deployment-checks.sh https://voai-website.vercel.app"
else
    echo "❌ Failed to create PR"
    echo "Error: $PR_URL"
    echo ""
    echo "Alternative: Open this URL in your browser:"
    echo "https://github.com/Bernhard-Reiter/voai-website/compare/main...vercel-deploy?expand=1"
fi