# Chromatic Configuration Guide

## 🎯 Snapshot Budget Management

We're using Chromatic's **Free Tier** with the following limits:
- **5,000 snapshots per month**
- Chrome browser only
- Unlimited projects & collaborators

## 📊 Snapshot Optimization Strategy

### 1. **CI/CD Restrictions**
- ✅ Chromatic runs only on `main` branch pushes
- ✅ Skip draft PRs automatically
- ✅ Cancel duplicate runs with concurrency groups
- ✅ Only run when UI files change (components/pages/styles)

### 2. **Test Prioritization**
- Mark critical tests with `@critical` tag
- Example: `test('login flow @critical', async () => {})`
- CI runs only critical tests to save snapshots

### 3. **Configuration Settings**
- `onlyChanged: true` - Only snapshot changed components
- `exitZeroOnChanges: true` - Don't fail builds on visual changes
- `skip: true` - Skip when no relevant changes detected

## 📈 Monthly Snapshot Budget

Estimated usage with current setup:
- ~10 main branch deployments/month = ~500 snapshots
- ~20 critical test runs/month = ~1000 snapshots
- **Total: ~1500-2000 snapshots/month** (well under 5000 limit)

## 🛠️ Local Development

### Run all tests locally (no snapshot cost):
```bash
pnpm dev
pnpm exec playwright test
```

### Run Chromatic locally (counts toward limit):
```bash
pnpm chromatic
```

### Dry run (no snapshots):
```bash
pnpm exec chromatic --dry-run
```

## 🚨 Monitoring Usage

Check your usage at: https://www.chromatic.com/builds?appId=YOUR_APP_ID

## 💡 Tips to Stay Under Limit

1. **Use draft PRs** during development
2. **Group related changes** in single PRs
3. **Run locally first** before pushing
4. **Tag only critical tests** with @critical
5. **Skip Chromatic** for documentation/config changes

## 🔧 Emergency Controls

If approaching limit, you can:
1. Disable Chromatic workflow temporarily
2. Set `CHROMATIC_SKIP=true` in GitHub secrets
3. Increase `onlyChanged` sensitivity in config