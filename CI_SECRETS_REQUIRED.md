# Required CI/CD Secrets and Environment Variables

This document lists all the secrets and environment variables required for the CI/CD workflows to function properly.

## GitHub Actions Secrets

The following secrets need to be configured in the GitHub repository settings under Settings > Secrets and variables > Actions:

### Required Secrets

1. **CHROMATIC_PROJECT_TOKEN**
   - Description: Project token for Chromatic visual testing
   - How to obtain: Sign up at https://www.chromatic.com/ and create a project
   - Used in: `.github/workflows/chromatic.yml`

2. **VERCEL_TOKEN**
   - Description: Authentication token for Vercel deployments
   - How to obtain: Generate from https://vercel.com/account/tokens
   - Used in: `.github/workflows/deploy-vercel.yml`, `.github/workflows/ab-test-ci.yml`

3. **VERCEL_ORG_ID**
   - Description: Vercel organization ID
   - How to obtain: Found in Vercel dashboard under team settings
   - Used in: `.github/workflows/deploy-vercel.yml`

4. **TURBO_TOKEN** (Optional)
   - Description: Token for Turborepo remote caching
   - How to obtain: Sign up at https://turbo.build/repo and create a token
   - Used in: `.github/workflows/ab-test-ci.yml`, `.github/workflows/ab-test-ci-temp.yml`

### Repository Variables

The following variables need to be configured under Settings > Secrets and variables > Actions > Variables:

1. **TURBO_TEAM** (Optional)
   - Description: Team name for Turborepo
   - Used in: `.github/workflows/ab-test-ci.yml`, `.github/workflows/ab-test-ci-temp.yml`

## Setting Up Secrets

To add these secrets:

1. Go to your repository on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each secret with its corresponding value

## Vercel Project Configuration

The Vercel project ID is hardcoded in the workflow:
- Project ID: `prj_DaI9YWeNQ274iiVYIQgHzpWPLga5`

Make sure this project exists in your Vercel account or update it to match your actual project ID.

## Local Development

For local development, you can create a `.env` file with these values, but **never commit this file to version control**.

```bash
# .env.local
CHROMATIC_PROJECT_TOKEN=your_token_here
VERCEL_TOKEN=your_token_here
VERCEL_ORG_ID=your_org_id_here
TURBO_TOKEN=your_token_here
TURBO_TEAM=your_team_here
```

## Troubleshooting

If workflows are failing:

1. Check that all required secrets are configured
2. Verify that tokens haven't expired
3. Ensure the Vercel project ID matches your actual project
4. Check workflow logs for specific error messages