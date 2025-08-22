# Fix for Chromatic Workflow

## Problem
The Chromatic workflow is failing on the main branch with the following error:
```
Unexpected input(s) 'storybookFlags', valid inputs are ['allowConsoleErrors', 'appCode', 'autoAcceptChanges', ...]
```

## Root Cause
The workflow file `.github/workflows/chromatic.yml` contains an invalid parameter `storybookFlags: '--webpack-stats-json'` on line 85. This parameter is not supported by chromaui/action@v11.

## Solution
Remove line 85 from `.github/workflows/chromatic.yml`:

### Before:
```yaml
      - name: Run Chromatic (Free Tier)
        if: steps.check-changes.outputs.ui_changed == 'true'
        uses: chromaui/action@v11
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
          storybookBuildDir: apps/storybook/storybook-static
          onlyChanged: true
          exitZeroOnChanges: true
          autoAcceptChanges: true
          skip: 'dependabot/**'
          externals: |
            - packages/ui/src/**
            - apps/showcase/src/**
          traceChanged: true
          storybookFlags: '--webpack-stats-json'  # <-- REMOVE THIS LINE
```

### After:
```yaml
      - name: Run Chromatic (Free Tier)
        if: steps.check-changes.outputs.ui_changed == 'true'
        uses: chromaui/action@v11
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
          storybookBuildDir: apps/storybook/storybook-static
          onlyChanged: true
          exitZeroOnChanges: true
          autoAcceptChanges: true
          skip: 'dependabot/**'
          externals: |
            - packages/ui/src/**
            - apps/showcase/src/**
          traceChanged: true
```

## How to Apply
1. Edit `.github/workflows/chromatic.yml`
2. Remove line 85 containing `storybookFlags: '--webpack-stats-json'`
3. Commit with message: `fix: remove invalid storybookflags parameter from chromatic workflow`
4. Push to main or create a PR

## Additional Notes
- The lint and type-check commands pass successfully
- No other CI/CD configuration changes are needed
- This should fix the failing Chromatic workflow on the main branch