#!/bin/bash
# Branch Protection Setup für GitHub

echo "🔒 Setting up Branch Protection Rules"
echo "===================================="

REPO="Bernhard-Reiter/voai-ux-ui"
BRANCH="main"

# Set branch protection
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/$REPO/branches/$BRANCH/protection \
  --field required_status_checks='{"strict":true,"contexts":["CI","Deploy to Vercel"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true \
  --field lock_branch=false \
  --field allow_fork_syncing=true

echo "✅ Branch protection enabled!"

# Enable auto-merge
gh repo edit $REPO --enable-auto-merge --delete-branch-on-merge

echo "✅ Auto-merge enabled!"
echo ""
echo "Branch Protection Summary:"
echo "- Required status checks: CI, Deploy to Vercel"
echo "- Required reviews: 1"
echo "- Dismiss stale reviews: Yes"
echo "- Auto-merge: Enabled"
echo "- Delete branch on merge: Yes"