# Supabase Keys Update Instructions

## ✅ Completed Tasks

1. **Supabase Keys Generated** ✓
   - New anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3MjUsImV4cCI6MjA2NTE1NjcyNX0.8uHezlmnL4okIZPH4vSh-MEANyF-_UkILE65hFV_60w`
   - New service role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU4MDcyNSwiZXhwIjoyMDY1MTU2NzI1fQ.o0EzGNGZ1G1R9pjKWkRAAA4KjJVi5naJMNaOj0AEGTQ`

2. **Local .env.local Updated** ✓
   - File has been updated with new keys

## ⚠️ Manual Actions Required

### 1. Update Vercel Environment Variables

```bash
# Remove old keys
vercel env rm SUPABASE_SERVICE_ROLE_KEY production
vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Add new keys
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU4MDcyNSwiZXhwIjoyMDY1MTU2NzI1fQ.o0EzGNGZ1G1R9pjKWkRAAA4KjJVi5naJMNaOj0AEGTQ" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3MjUsImV4cCI6MjA2NTE1NjcyNX0.8uHezlmnL4okIZPH4vSh-MEANyF-_UkILE65hFV_60w" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

### 2. Update GitHub Secrets

Go to: https://github.com/Bernhard-Reiter/voai-website/settings/secrets/actions

Update the following secrets:
- **SUPABASE_SERVICE_ROLE_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU4MDcyNSwiZXhwIjoyMDY1MTU2NzI1fQ.o0EzGNGZ1G1R9pjKWkRAAA4KjJVi5naJMNaOj0AEGTQ`
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3MjUsImV4cCI6MjA2NTE1NjcyNX0.8uHezlmnL4okIZPH4vSh-MEANyF-_UkILE65hFV_60w`

## 🔄 Next Steps

1. Deploy to Vercel after updating environment variables
2. Verify the application works with new keys
3. Monitor for any authentication issues

## 📅 Rotation Schedule

Consider rotating these keys every 90 days for security best practices.