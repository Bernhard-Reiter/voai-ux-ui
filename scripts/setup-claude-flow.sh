#!/bin/bash

echo "🤖 Setting up Claude Flow CI/CD Monitoring"
echo "=========================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "Installing GitHub CLI..."
    brew install gh
fi

echo -e "${GREEN}✅ GitHub CLI ready${NC}"

# Authenticate GitHub CLI
echo ""
echo "Authenticating GitHub CLI..."
gh auth login --with-token < <(echo $GITHUB_TOKEN)

# Set up repository secrets
echo ""
echo "Setting up repository secrets..."

# Add Claude Flow API key
gh secret set CLAUDE_FLOW_API_KEY --body "$CLAUDE_FLOW_API_KEY" --repo $GITHUB_REPOSITORY

# Add other required secrets
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN" --repo $GITHUB_REPOSITORY
gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID" --repo $GITHUB_REPOSITORY
gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID" --repo $GITHUB_REPOSITORY

echo -e "${GREEN}✅ Secrets configured${NC}"

# Enable required GitHub features
echo ""
echo "Configuring repository settings..."

# Enable auto-merge
gh repo edit --enable-auto-merge --delete-branch-on-merge

# Create required labels
echo ""
echo "Creating labels..."

gh label create "ready-to-merge" --description "PR is ready for auto-merge" --color "0e8a16"
gh label create "do-not-merge" --description "PR should not be merged" --color "d93f0b"
gh label create "dependencies" --description "Pull requests that update a dependency file" --color "0366d6"

echo -e "${GREEN}✅ Labels created${NC}"

# Set up branch protection
echo ""
echo "Setting up branch protection..."

gh api -X PUT /repos/$GITHUB_REPOSITORY/branches/main/protection \
  -f required_status_checks.strict=true \
  -f required_status_checks.contexts[]="lint-and-test" \
  -f required_status_checks.contexts[]="security-scan" \
  -f required_status_checks.contexts[]="claude-flow-analysis" \
  -f enforce_admins=false \
  -f required_pull_request_reviews.dismiss_stale_reviews=true \
  -f required_pull_request_reviews.require_code_owner_reviews=false \
  -f required_pull_request_reviews.required_approving_review_count=0 \
  -f restrictions=null \
  -f allow_force_pushes=false \
  -f allow_deletions=false

echo -e "${GREEN}✅ Branch protection configured${NC}"

# Create initial PR to test
echo ""
echo "Creating test PR..."

git checkout -b test/claude-flow-setup
echo "# Claude Flow Test" > CLAUDE_FLOW_TEST.md
git add CLAUDE_FLOW_TEST.md
git commit -m "test: Claude Flow auto-merge setup"
git push -u origin test/claude-flow-setup

gh pr create \
  --title "test: Claude Flow auto-merge setup" \
  --body "This PR tests the Claude Flow auto-merge functionality. It should be automatically merged when all checks pass." \
  --label "ready-to-merge"

echo -e "${GREEN}✅ Test PR created${NC}"

# Monitor setup
echo ""
echo -e "${YELLOW}📊 Claude Flow Monitoring Active${NC}"
echo ""
echo "Dashboard: https://github.com/${GITHUB_REPOSITORY}/actions"
echo "PR Monitor: https://github.com/${GITHUB_REPOSITORY}/pulls"
echo ""
echo "Claude Flow will now:"
echo "✓ Monitor all PRs every 15 minutes"
echo "✓ Auto-merge PRs when all checks pass"
echo "✓ Deploy to production after merge"
echo "✓ Send notifications on failures"
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"