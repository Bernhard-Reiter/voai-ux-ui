#!/bin/bash
set -e

TOKEN="PRz3rjY6MjqzR6PrgYCI0DqY"
TEAM_ID="team_TQs0xL2xyN4vpEmOOErruKNA"
PROJECT_ID="prj_DaI9YWeNQ274iiVYIQgHzpWPLga5"

echo "🔍 Fetching current production deployment..."
PROD_DEPLOYMENT=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$TEAM_ID" | \
  grep -o '"targets":{"production":{"id":"[^"]*"' | \
  sed 's/.*"id":"\([^"]*\)"/\1/')

echo "Current production deployment: $PROD_DEPLOYMENT"

echo "🚀 Getting latest working deployment..."
LATEST_DEPLOYMENT=$(npx vercel ls --token $TOKEN --scope $TEAM_ID | \
  grep "Ready" | head -1 | awk '{print $2}' | \
  sed 's/https:\/\///' | sed 's/.vercel.app//')

echo "Latest working deployment: $LATEST_DEPLOYMENT"

echo "📦 Updating production target..."
curl -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targets": {
      "production": {
        "deploymentId": "'$LATEST_DEPLOYMENT'"
      }
    }
  }'

echo -e "\n✅ Production deployment updated!"
echo "🔍 Verifying domains..."
sleep 5

curl -I https://voai.me
curl -I https://www.voai.me
curl -I https://voai-website.vercel.app