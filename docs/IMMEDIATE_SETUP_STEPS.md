# 🚀 SOFORT DURCHZUFÜHREN - Vercel & Supabase Setup

## 1️⃣ Vercel Environment Variables (2 Minuten)

### Schritt 1: Vercel Dashboard öffnen
```
https://vercel.com/dashboard
```

### Schritt 2: Projekt auswählen
- Klicken Sie auf **voai-website-frontend**

### Schritt 3: Environment Variables setzen
1. Navigieren Sie zu: **Settings** → **Environment Variables**
2. Klicken Sie auf **Add New**
3. Fügen Sie JEDE Variable einzeln hinzu:

#### Variable 1:
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://aqvnasuputatphvqrqam.supabase.co`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- Klicken Sie **Save**

#### Variable 2:
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- Klicken Sie **Save**

#### Variable 3:
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development
- Klicken Sie **Save**

#### Variable 4:
- **Key**: `NEXT_PUBLIC_APP_URL`
- **Value**: `https://voai-website-frontend.vercel.app`
- **Environment**: ✅ Production
- Klicken Sie **Save**

## 2️⃣ Supabase Setup (5 Minuten)

### Schritt 1: Supabase Dashboard öffnen
```
https://supabase.com/dashboard/project/aqvnasuputatphvqrqam
```

### Schritt 2: Authentication URLs konfigurieren
1. Gehen Sie zu: **Authentication** → **URL Configuration**
2. Setzen Sie:
   - **Site URL**: `https://voai-website-frontend.vercel.app`
3. Unter **Redirect URLs** fügen Sie ALLE diese URLs hinzu:
   ```
   https://voai-website-frontend.vercel.app/auth/callback
   https://voai-website-frontend.vercel.app/auth/confirm
   https://voai-website-frontend.vercel.app/auth/reset-password
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/confirm
   http://localhost:3000/auth/reset-password
   ```
4. Klicken Sie **Save**

### Schritt 3: Google OAuth aktivieren
1. Gehen Sie zu: **Authentication** → **Providers**
2. Finden Sie **Google**
3. Toggle **Enable Sign in with Google** auf **ON**
4. Sie benötigen Google OAuth Credentials:
   - Wenn Sie diese noch nicht haben, folgen Sie dem Link zu Google Cloud Console
   - Kopieren Sie die **Callback URL** aus Supabase
   - Fügen Sie diese in Google Cloud Console als Authorized redirect URI ein
5. Fügen Sie ein:
   - **Google Client ID**
   - **Google Client Secret**
6. Klicken Sie **Save**

### Schritt 4: SQL Migrations ausführen
1. Gehen Sie zu: **SQL Editor**
2. Klicken Sie **New query**
3. Kopieren Sie diesen KOMPLETTEN SQL Code und führen Sie ihn aus:

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

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user
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

-- Create trigger for new users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON public.profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- Grant access
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON public.profiles(created_at DESC);
```

4. Klicken Sie **RUN**

### Schritt 5: Workflow Status Table prüfen
1. Gehen Sie zu: **Table Editor**
2. Prüfen Sie ob folgende Tables existieren:
   - ✅ profiles
   - ✅ workflow_status
3. Beide sollten **RLS enabled** zeigen

## 3️⃣ Vercel Redeploy (1 Minute)

### Option A: Über Vercel Dashboard
1. Gehen Sie zu: **Deployments**
2. Finden Sie das neueste Deployment
3. Klicken Sie auf die drei Punkte (...) 
4. Wählen Sie **Redeploy**
5. Bestätigen Sie mit **Redeploy**

### Option B: Über Terminal
```bash
cd /Users/bernhard/voai-website-phase4
vercel --prod
```

## 4️⃣ Verifizierung (2 Minuten)

Nach dem Redeploy (dauert ca. 2-3 Minuten):

1. Öffnen Sie: https://voai-website-frontend.vercel.app
2. Die Seite sollte OHNE 500 Error laden
3. Klicken Sie auf **Login**
4. Sie sollten den Google Login Button sehen
5. Testen Sie den Login Flow

## ⚠️ Troubleshooting

### Falls immer noch 500 Error:
1. Prüfen Sie Vercel Function Logs
2. Stellen Sie sicher, dass ALLE Env Vars gesetzt sind
3. Prüfen Sie, dass der Redeploy abgeschlossen ist

### Falls Google Login nicht funktioniert:
1. Prüfen Sie Google Cloud Console Settings
2. Warten Sie 5-10 Minuten (OAuth braucht Zeit)
3. Prüfen Sie Redirect URLs in Supabase

## 📞 Direktlinks

- Vercel Env Vars: https://vercel.com/[your-team]/voai-website-frontend/settings/environment-variables
- Supabase Auth: https://supabase.com/dashboard/project/aqvnasuputatphvqrqam/auth/url-configuration
- Supabase Providers: https://supabase.com/dashboard/project/aqvnasuputatphvqrqam/auth/providers
- Supabase SQL Editor: https://supabase.com/dashboard/project/aqvnasuputatphvqrqam/sql/new

---

**WICHTIG**: Führen Sie diese Schritte JETZT aus, damit die Website funktioniert!