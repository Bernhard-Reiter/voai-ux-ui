# ✅ Pull Request erfolgreich vorbereitet

## Branch gepusht
Der Branch `fix/chromatic-workflow-parameter` wurde erfolgreich zu GitHub gepusht.

## Pull Request erstellen
Bitte öffnen Sie folgenden Link, um die Pull Request zu erstellen:
**https://github.com/Bernhard-Reiter/voai-ux-ui/pull/new/fix/chromatic-workflow-parameter**

## PR Details zum Kopieren

### Title:
```
fix: remove invalid storybookflags parameter from chromatic workflow
```

### Description:
```markdown
## Problem
The Chromatic workflow is failing on the main branch with the following error:
```
Unexpected input(s) 'storybookFlags', valid inputs are ['allowConsoleErrors', 'appCode', 'autoAcceptChanges', ...]
```

## Root Cause
The workflow file `.github/workflows/chromatic.yml` contains an invalid parameter `storybookFlags: '--webpack-stats-json'` on line 85. This parameter is not supported by chromaui/action@v11.

## Changes
- Removed the invalid `storybookFlags: '--webpack-stats-json'` parameter from the Chromatic GitHub Action

## Testing
- ✅ Verified that the parameter is not listed in the chromaui/action@v11 documentation
- ✅ Ran `pnpm lint` locally - all checks pass
- ✅ Ran `pnpm type-check` locally - all checks pass

## Expected Result
After merging this PR, the Chromatic workflow should run successfully on the main branch.

Fixes the CI/CD pipeline failure on main.
```

## Status
- ✅ Code-Änderung implementiert
- ✅ Branch gepusht
- ✅ Lokale Tests erfolgreich
- ⏳ PR muss über GitHub Web UI erstellt werden

Nach dem Merge sollte die CI/CD Pipeline wieder grün sein!