# 🔧 Supabase Manual Setup Guide

## Schritt 1: Supabase Dashboard öffnen

1. Gehen Sie zu: https://supabase.com/dashboard
2. Wählen Sie Ihr Projekt: `voai-backend`
3. Oder nutzen Sie direkt: https://supabase.com/dashboard/project/aqvnasuputatphvqrqam

## Schritt 2: Authentication konfigurieren

### 2.1 Site URL setzen:
1. Navigieren Sie zu: **Authentication → URL Configuration**
2. Setzen Sie **Site URL** auf: `https://voai-website-frontend.vercel.app`
3. Klicken Sie auf **Save**

### 2.2 Redirect URLs hinzufügen:
Fügen Sie folgende URLs zu **Redirect URLs** hinzu:
```
https://voai-website-frontend.vercel.app/auth/callback
https://voai-website-frontend.vercel.app/auth/confirm
https://voai-website-frontend.vercel.app/auth/reset-password
http://localhost:3000/auth/callback
http://localhost:3000/auth/confirm
http://localhost:3000/auth/reset-password
```

### 2.3 Google OAuth aktivieren:
1. Gehen Sie zu: **Authentication → Providers**
2. Klicken Sie auf **Google**
3. Toggle **Enable Google provider** auf ON
4. Fügen Sie Ihre Google OAuth Credentials ein:
   - **Client ID**: (aus Google Cloud Console)
   - **Client Secret**: (aus Google Cloud Console)
5. **Authorized redirect URI** kopieren und in Google Cloud Console eintragen

## Schritt 3: Database Setup

### 3.1 SQL Editor öffnen:
1. Gehen Sie zu: **SQL Editor**
2. Klicken Sie auf **New query**

### 3.2 Profiles Table erstellen:
Kopieren Sie folgenden SQL Code und führen Sie ihn aus:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3.3 Workflow Status Table:
Falls noch nicht vorhanden, führen Sie auch aus:

```sql
-- Create workflow_status table
CREATE TABLE IF NOT EXISTS public.workflow_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workflow_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own workflows" ON public.workflow_status
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own workflows" ON public.workflow_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workflows" ON public.workflow_status
  FOR UPDATE USING (auth.uid() = user_id);
```

## Schritt 4: API Settings

### 4.1 JWT Secret:
1. Gehen Sie zu: **Settings → API**
2. Notieren Sie sich den **JWT Secret** (wird für erweiterte Features benötigt)

### 4.2 Service Role Key:
1. Der Service Role Key ist bereits in `.env.local`
2. Dieser wird NUR server-seitig verwendet

## Schritt 5: Testen

### 5.1 Auth Flow testen:
1. Öffnen Sie: https://voai-website-frontend.vercel.app
2. Klicken Sie auf **Login**
3. Wählen Sie **Continue with Google**
4. Nach erfolgreicher Anmeldung sollten Sie zum Dashboard weitergeleitet werden

### 5.2 Database testen:
1. Gehen Sie zu: **Table Editor → profiles**
2. Nach dem ersten Login sollte hier ein Eintrag erscheinen

## 🔍 Troubleshooting

### Google OAuth Error:
1. Prüfen Sie die Redirect URI in Google Cloud Console
2. Stellen Sie sicher, dass die Domain verifiziert ist
3. Warten Sie 5-10 Minuten nach Änderungen

### RLS Policy Errors:
1. Prüfen Sie im SQL Editor: `SELECT * FROM pg_policies`
2. Stellen Sie sicher, dass RLS aktiviert ist
3. Testen Sie Policies mit: `SET ROLE authenticated`

### Connection Errors:
1. Prüfen Sie die Supabase URL
2. Verifizieren Sie die Anon Key
3. Prüfen Sie CORS Settings

## 📞 Support

Bei Problemen:
1. Supabase Discord: https://discord.supabase.com
2. Supabase Docs: https://supabase.com/docs
3. Status Page: https://status.supabase.com