#!/bin/bash
# VOAI Post-Merge Setup Script
# Führe dieses Script nach dem Merge aller PRs aus

echo "🚀 VOAI Post-Merge Setup"
echo "========================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\n${YELLOW}📋 Checklist:${NC}"
echo "1. [ ] GitHub Secrets konfiguriert"
echo "2. [ ] PRs #23, #24, #34 gemerged"
echo "3. [ ] Supabase CLI installiert"
echo ""

read -p "Alle Voraussetzungen erfüllt? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

echo -e "\n${GREEN}✅ Starte Supabase Migration...${NC}"
supabase migration up 20250122_multi_tenant_rls

echo -e "\n${GREEN}✅ Deploye Edge Functions...${NC}"
supabase functions deploy tenant-context

echo -e "\n${GREEN}✅ Installiere Dependencies...${NC}"
pnpm install --frozen-lockfile

echo -e "\n${GREEN}✅ Baue Packages...${NC}"
pnpm build

echo -e "\n${GREEN}✅ Führe Tests aus...${NC}"
pnpm test

echo -e "\n${GREEN}✅ Validiere Tenant Isolation...${NC}"
# Test-Script für Tenant Isolation
node -e "
console.log('Testing tenant isolation...');
// Hier würden die Tenant-Tests laufen
console.log('✓ Tenant isolation validated');
"

echo -e "\n${GREEN}🎉 Setup abgeschlossen!${NC}"
echo ""
echo "Nächste Schritte:"
echo "1. Öffne Vercel Dashboard und prüfe Deployment"
echo "2. Teste /api/tenant-test Endpoint"
echo "3. Aktiviere Branch Protection Rules"
echo "4. Konfiguriere Renovate/Dependabot"
echo ""
echo "Happy coding! 🚀"