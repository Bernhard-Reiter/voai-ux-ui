#!/bin/bash
# Safe Deployment Script für Vercel
# Verhindert die häufigsten Deployment-Fehler

set -e # Exit on error

echo "🚀 Vercel Safe Deployment Script"
echo "================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Environment Check
echo -e "\n${YELLOW}1. Checking environment...${NC}"
if [ -z "$VERCEL_TOKEN" ]; then
    echo -e "${RED}❌ VERCEL_TOKEN not set${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Environment variables OK${NC}"

# 2. Clean previous builds
echo -e "\n${YELLOW}2. Cleaning previous builds...${NC}"
rm -rf .next node_modules/.cache
echo -e "${GREEN}✅ Build artifacts cleaned${NC}"

# 3. Install dependencies
echo -e "\n${YELLOW}3. Installing dependencies...${NC}"
npm ci --legacy-peer-deps
echo -e "${GREEN}✅ Dependencies installed${NC}"

# 4. Run linter
echo -e "\n${YELLOW}4. Running ESLint...${NC}"
if npm run lint; then
    echo -e "${GREEN}✅ Linting passed${NC}"
else
    echo -e "${RED}❌ Linting failed - fixing automatically...${NC}"
    npm run lint -- --fix
    git add -A
    git commit -m "fix: Auto-fix ESLint errors" || true
fi

# 5. TypeScript check
echo -e "\n${YELLOW}5. Running TypeScript check...${NC}"
if npm run typecheck; then
    echo -e "${GREEN}✅ TypeScript check passed${NC}"
else
    echo -e "${RED}❌ TypeScript errors found${NC}"
    exit 1
fi

# 6. Build test
echo -e "\n${YELLOW}6. Testing build locally...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# 7. Check for common issues
echo -e "\n${YELLOW}7. Checking for common issues...${NC}"

# Check package.json
if grep -q "packageManager" package.json; then
    echo -e "${YELLOW}⚠️  Found packageManager field - removing...${NC}"
    sed -i.bak '/"packageManager"/d' package.json
    rm package.json.bak
fi

if grep -q "preinstall" package.json; then
    echo -e "${YELLOW}⚠️  Found preinstall script - removing...${NC}"
    sed -i.bak '/"preinstall"/d' package.json
    rm package.json.bak
fi

# Check vercel.json
if [ -f "vercel.json" ]; then
    if grep -q "commandForIgnoringBuildStep" vercel.json; then
        echo -e "${YELLOW}⚠️  Found ignoreCommand - this might cause issues${NC}"
    fi
fi

echo -e "${GREEN}✅ All checks completed${NC}"

# 8. Deploy
echo -e "\n${YELLOW}8. Ready to deploy!${NC}"
echo -e "Run: ${GREEN}vercel --prod${NC} or push to main branch"

# Optional: Auto-deploy
# vercel --prod --yes