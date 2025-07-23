# Visual Test Baselines

This directory contains the baseline images for visual regression testing.

## How it works

1. **Baseline Creation**: When you run `pnpm visual:update`, new baseline images are created
2. **Comparison**: Running `pnpm visual:test` compares current screenshots against these baselines
3. **Updates**: Only update baselines when visual changes are intentional

## Best Practices

- Review baseline changes carefully before committing
- Use descriptive commit messages when updating baselines
- Consider using Git LFS for this directory if baselines grow large

## Upgrading to Chromatic

When ready to upgrade to Chromatic:
1. Add `CHROMATIC_PROJECT_TOKEN` to GitHub secrets
2. Uncomment Chromatic step in `.github/workflows/ci.yml`
3. Optionally remove this directory (Chromatic manages baselines in cloud)