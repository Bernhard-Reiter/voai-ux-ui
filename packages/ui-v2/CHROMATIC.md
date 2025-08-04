# Chromatic Visual Testing Guide

## Overview

Chromatic is a visual testing tool that captures snapshots of our Storybook stories and detects visual changes across commits.

## Setup

1. **Get Project Token**: 
   - Sign up at [chromatic.com](https://www.chromatic.com)
   - Create a new project
   - Copy the project token

2. **Add Token to GitHub Secrets**:
   - Go to Settings → Secrets → Actions
   - Add `CHROMATIC_PROJECT_TOKEN` with your token

3. **Local Development**:
   ```bash
   # Set token locally
   export CHROMATIC_PROJECT_TOKEN=your-token-here
   
   # Run Chromatic
   npm run chromatic
   ```

## How It Works

1. **Automatic Runs**: Chromatic runs on every PR and push to main
2. **Visual Snapshots**: Takes screenshots of all Storybook stories
3. **Change Detection**: Compares snapshots to detect visual changes
4. **Review Process**: Changes must be reviewed and approved

## Best Practices

### Writing Visual Tests

1. **Consistent States**: Ensure components render consistently
   ```typescript
   export const Default: Story = {
     args: {
       // Fixed props for consistent snapshots
       label: "Button",
       disabled: false,
     },
   };
   ```

2. **Cover All States**: Create stories for all visual states
   - Default
   - Hover (use `.hover` suffix)
   - Focus (use `.focus` suffix)
   - Active
   - Disabled
   - Loading
   - Error

3. **Responsive Design**: Test different viewport sizes
   ```typescript
   export const Mobile: Story = {
     parameters: {
       viewport: {
         defaultViewport: 'mobile1',
       },
     },
   };
   ```

### Reviewing Changes

1. **Intentional Changes**: Accept changes that match your code updates
2. **Unintentional Changes**: Reject and investigate unexpected changes
3. **Cross-browser Issues**: Check changes across different browsers

## Workflow

1. **Make changes** to components
2. **Update stories** if needed
3. **Push to GitHub**
4. **Chromatic runs** automatically
5. **Review changes** in Chromatic UI
6. **Accept/Reject** visual changes
7. **Merge PR** once approved

## Ignoring Files

Some files are excluded from visual testing:
- Style files (`*.css`, `*.scss`)
- Generated token files
- Utility files without visual output

## Troubleshooting

### Build Failures
- Check Storybook builds locally: `npm run build-storybook`
- Ensure all dependencies are installed
- Check for console errors in stories

### False Positives
- Animations: Use `prefers-reduced-motion` for consistent snapshots
- Dates/Times: Mock these values in stories
- Random data: Use fixed seed values

### Performance
- Keep stories focused on single components
- Avoid heavy computations in stories
- Use `parameters.chromatic.delay` for async content

## Benefits

1. **Catch Visual Bugs**: Detect unintended UI changes
2. **Design System Consistency**: Ensure components stay consistent
3. **Collaboration**: Designers can review visual changes
4. **Documentation**: Visual history of component evolution
5. **Confidence**: Deploy with confidence knowing UI is tested