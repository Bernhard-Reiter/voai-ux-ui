# Manual Pull Request Creation Instructions

Since the GitHub CLI is having issues accessing the repository, here are the manual steps to create the pull request:

## Branch Information
- **Branch name**: `feat/phase-5-main-workflow`
- **Base branch**: `main`
- **Commit**: `324314d feat(phase-5): implement main workflow integration with upload and realtime status`

## Pull Request Details

### Title
```
feat(phase-5): Implement main workflow integration
```

### Description
```markdown
## Summary
- Implemented complete upload workflow with realtime status updates
- Added webhook authentication system for secure communication
- Integrated DSGVO-compliant data retention policies with automatic cleanup

## Changes
- **Upload Component**: New `UploadBox` component with drag-and-drop, progress tracking, and realtime status updates
- **Status Management**: Added `StatusBadge` component and enhanced `useWorkflowStatus` hook for realtime updates
- **Security**: Implemented webhook authentication with HMAC signature verification
- **Data Retention**: Added Supabase migrations for DSGVO-compliant 90-day data retention with automatic cleanup
- **Testing**: Comprehensive test coverage including unit, integration, and visual tests
- **Documentation**: Added detailed documentation for data retention policies and deployment steps

## Test plan
- [x] Upload functionality works with drag-and-drop and file selection
- [x] Realtime status updates display correctly
- [x] Webhook authentication prevents unauthorized access
- [x] Data retention policies automatically clean up old data
- [x] All tests pass (unit, integration, visual)
- [x] Build succeeds without errors

🤖 Generated with [Claude Code](https://claude.ai/code)
```

## Files Changed (26 files)
- `.env.example` - Updated environment variables
- `.github/workflows/ci.yml` - CI workflow updates
- `README.md` - Documentation updates
- Various new documentation files for deployment and SSO
- `apps/frontend/package.json` - Package updates
- New components in `packages/ui/src/`:
  - `molecules/StatusBadge.tsx`
  - `organisms/UploadBox.tsx`
  - `organisms/UploadBox.test.tsx`
  - `organisms/UploadBox.visual.test.tsx`
- `packages/shared/hooks/useWorkflowStatus.ts` - Enhanced workflow status hook
- `packages/shared/lib/webhook-auth.ts` - New webhook authentication
- New Supabase migrations for data retention
- New integration tests

## Steps to Create PR

1. Go to your repository on GitHub
2. Click on "Pull requests" tab
3. Click "New pull request"
4. Select `main` as the base branch
5. Select `feat/phase-5-main-workflow` as the compare branch
6. Copy and paste the title and description from above
7. Create the pull request

## Alternative: Command Line with Token

If you have a valid GitHub token, you can try:

```bash
# First, ensure you're on the correct branch
git checkout feat/phase-5-main-workflow

# Push to ensure it's up to date
git push origin feat/phase-5-main-workflow

# Try creating PR with explicit token
GITHUB_TOKEN=your_token_here gh pr create \
  --title "feat(phase-5): Implement main workflow integration" \
  --body-file CREATE_PR_INSTRUCTIONS.md \
  --base main \
  --head feat/phase-5-main-workflow
```