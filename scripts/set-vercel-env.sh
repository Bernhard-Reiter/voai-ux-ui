#!/bin/bash

# Set Vercel Environment Variables using CLI
echo "🚀 Setting Vercel Environment Variables..."

# Set NEXT_PUBLIC_SUPABASE_URL
echo "https://aqvnasuputatphvqrqam.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "https://aqvnasuputatphvqrqam.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview  
echo "https://aqvnasuputatphvqrqam.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL development

# Set NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo "sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
echo "sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development

# Set SUPABASE_SERVICE_ROLE_KEY
echo "sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I" | vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo "sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I" | vercel env add SUPABASE_SERVICE_ROLE_KEY preview
echo "sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I" | vercel env add SUPABASE_SERVICE_ROLE_KEY development

# Set NEXT_PUBLIC_APP_URL
echo "https://voai-website-frontend.vercel.app" | vercel env add NEXT_PUBLIC_APP_URL production

echo "✅ Environment variables set!"
echo ""
echo "📋 Verifying..."
vercel env ls

echo ""
echo "🔄 Next step: Deploy to production"
echo "Run: vercel --prod"