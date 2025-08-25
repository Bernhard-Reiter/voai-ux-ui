# 🤖 Claude Flow CI/CD Integration

## Overview

Claude Flow automatically monitors, reviews, and merges PRs when all checks pass. It provides intelligent CI/CD automation with built-in safety checks.

## ✅ Features

- **Auto-merge PRs** when all checks are green
- **Code review** with security and performance analysis
- **Continuous monitoring** every 15 minutes
- **Auto-deployment** after successful merges
- **Dashboard updates** with CI/CD metrics
- **Smart notifications** for important events

## 🚀 Quick Start

```bash
# Setup Claude Flow
chmod +x scripts/setup-claude-flow.sh
./scripts/setup-claude-flow.sh

# Check status
gh workflow run claude-flow-monitor
```

## 📋 How It Works

1. **PR Created** → Claude Flow analyzes code
2. **Checks Run** → Lint, tests, security scan
3. **All Green** → Claude Flow approves
4. **Auto-merge** → PR merged automatically
5. **Deploy** → Production deployment triggered

## 🏷️ Labels

- `ready-to-merge` - PR will be auto-merged when checks pass
- `do-not-merge` - Blocks auto-merge
- `dependencies` - Dependabot PRs (auto-merged)

## 📊 Monitoring

### Dashboard
- View at: [CI/CD Dashboard Issue](https://github.com/Bernhard-Reiter/voai-ux-ui/issues?q=label:claude-flow-dashboard)
- Updates hourly with metrics
- Shows 24-hour statistics

### Metrics Tracked
- CI success rate
- PR merge time
- Deploy frequency
- Build duration
- Open PR count

## 🔧 Configuration

Edit `claude-flow.config.js` to customize:
- Auto-merge rules
- Required checks
- Notification settings
- Security policies

## 🚨 Alerts

Claude Flow alerts on:
- 3+ CI failures in a row
- PRs older than 7 days
- Deployment failures
- Security vulnerabilities

## 📈 Workflows

### PR Check & Auto-Merge
- Runs on every PR
- Executes all checks
- Merges if passing

### Claude Flow Monitor
- Runs every 15 minutes
- Finds mergeable PRs
- Triggers deployments

### Dashboard Update
- Runs hourly
- Updates metrics
- Posts to issue

## 🔒 Security

- HMAC verification on webhooks
- Dependency scanning
- SAST analysis
- License checking

## 🤝 Manual Override

To prevent auto-merge:
1. Add `do-not-merge` label
2. Request changes in review
3. Mark PR as draft

## 📞 Support

Issues with Claude Flow?
- Check [Actions tab](https://github.com/Bernhard-Reiter/voai-ux-ui/actions)
- Review logs in workflow runs
- Contact: bernhard@voai.de

---

**Claude Flow is now monitoring this repository 24/7** 🎉