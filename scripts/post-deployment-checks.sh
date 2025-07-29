#!/bin/bash

# Post-Deployment Verification Script
# Usage: ./scripts/post-deployment-checks.sh [production-url]

PROD_URL=${1:-"https://voai-website.vercel.app"}
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Starting post-deployment checks for: $PROD_URL"
echo ""

# Function to check HTTP status
check_status() {
    local url=$1
    local expected=$2
    local status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "$expected" ]; then
        echo -e "${GREEN}✓${NC} $url - Status: $status"
        return 0
    else
        echo -e "${RED}✗${NC} $url - Status: $status (expected: $expected)"
        return 1
    fi
}

# Function to check security headers
check_security_headers() {
    local url=$1
    echo ""
    echo "🔒 Security Headers Check:"
    
    local headers=$(curl -sI "$url")
    
    # Check for important security headers
    if echo "$headers" | grep -qi "strict-transport-security"; then
        echo -e "${GREEN}✓${NC} HSTS header present"
    else
        echo -e "${RED}✗${NC} HSTS header missing"
    fi
    
    if echo "$headers" | grep -qi "x-frame-options"; then
        echo -e "${GREEN}✓${NC} X-Frame-Options header present"
    else
        echo -e "${RED}✗${NC} X-Frame-Options header missing"
    fi
    
    if echo "$headers" | grep -qi "x-content-type-options"; then
        echo -e "${GREEN}✓${NC} X-Content-Type-Options header present"
    else
        echo -e "${RED}✗${NC} X-Content-Type-Options header missing"
    fi
    
    if echo "$headers" | grep -qi "content-security-policy"; then
        echo -e "${GREEN}✓${NC} CSP header present"
    else
        echo -e "${YELLOW}⚠${NC} CSP header missing (check if implemented via meta tag)"
    fi
}

# Function to check DSGVO pages
check_dsgvo_compliance() {
    echo ""
    echo "📋 DSGVO Compliance Check:"
    
    check_status "$PROD_URL/privacy" 200
    check_status "$PROD_URL/impressum" 200
    check_status "$PROD_URL/terms" 200
}

# Function to check API endpoints
check_api_endpoints() {
    echo ""
    echo "🔌 API Endpoints Check:"
    
    # These might return 401/405 which is expected without auth
    local api_status=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/upload")
    if [ "$api_status" = "401" ] || [ "$api_status" = "405" ]; then
        echo -e "${GREEN}✓${NC} /api/upload - Protected (Status: $api_status)"
    else
        echo -e "${YELLOW}⚠${NC} /api/upload - Status: $api_status"
    fi
}

# Function to check static pages
check_static_pages() {
    echo ""
    echo "📄 Static Pages Check:"
    
    local pages=(
        "/"
        "/about"
        "/features"
        "/pricing"
        "/contact"
        "/login"
    )
    
    for page in "${pages[@]}"; do
        check_status "$PROD_URL$page" 200
    done
}

# Function to check performance
check_performance() {
    echo ""
    echo "⚡ Performance Check:"
    
    local start_time=$(date +%s%3N)
    curl -s -o /dev/null "$PROD_URL"
    local end_time=$(date +%s%3N)
    local response_time=$((end_time - start_time))
    
    if [ "$response_time" -lt 1000 ]; then
        echo -e "${GREEN}✓${NC} Homepage response time: ${response_time}ms"
    else
        echo -e "${YELLOW}⚠${NC} Homepage response time: ${response_time}ms (consider optimization)"
    fi
}

# Run all checks
echo "==================================="
echo "   Post-Deployment Verification    "
echo "==================================="

check_static_pages
check_dsgvo_compliance
check_api_endpoints
check_security_headers "$PROD_URL"
check_performance

echo ""
echo "==================================="
echo ""
echo "📊 Additional checks to perform manually:"
echo ""
echo "1. Security Headers Deep Scan:"
echo "   👉 https://securityheaders.com/?q=$PROD_URL"
echo ""
echo "2. SSL/TLS Configuration:"
echo "   👉 https://www.ssllabs.com/ssltest/analyze.html?d=${PROD_URL#https://}"
echo ""
echo "3. Cookie Consent Banner:"
echo "   - Open $PROD_URL in incognito mode"
echo "   - Verify cookie banner appears"
echo "   - Test accept/reject functionality"
echo ""
echo "4. Lighthouse Performance:"
echo "   - Open Chrome DevTools"
echo "   - Run Lighthouse audit"
echo "   - Target scores: Performance > 80, Accessibility > 90"
echo ""
echo "5. Vercel Analytics:"
echo "   👉 https://vercel.com/vi4/voai-website/analytics"
echo ""

# Summary
echo "==================================="
echo "✨ Deployment verification complete!"
echo "===================================="