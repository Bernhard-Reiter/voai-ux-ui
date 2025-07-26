# 🚀 Supabase Setup Guide für VOAI

## 📋 Voraussetzungen

- Supabase Account (kostenlos unter https://supabase.com)
- Environment Variables in Vercel gesetzt
- Phase 4 Branch gemerged

## 🔧 Schritt-für-Schritt Anleitung

### 1. Supabase Projekt erstellen

1. Gehen Sie zu https://app.supabase.com
2. Klicken Sie auf "New Project"
3. Projekt-Details eingeben:
   - **Name**: voai-production (oder voai-dev für Testing)
   - **Database Password**: Sicheres Passwort generieren
   - **Region**: Frankfurt (eu-central-1) für deutsche Nutzer
   - **Plan**: Free tier reicht für den Start

### 2. Google OAuth aktivieren

1. Im Supabase Dashboard: **Authentication** → **Providers**
2. **Google** Provider aktivieren
3. Google Cloud Console öffnen:
   - Neues Projekt oder existierendes nutzen
   - APIs & Services → Credentials
   - OAuth 2.0 Client ID erstellen
   - Authorized redirect URIs:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
4. Client ID und Client Secret in Supabase eintragen
5. **Save** klicken

### 3. Redirect URLs konfigurieren

Im Supabase Dashboard: **Authentication** → **URL Configuration**

```
Site URL: https://voai-website-frontend.vercel.app
Redirect URLs:
- http://localhost:3000/auth/callback
- https://voai-website-frontend.vercel.app/auth/callback
- https://voai-website-*.vercel.app/auth/callback (für Preview Deployments)
```

### 4. Migrations ausführen

#### Option A: Supabase CLI (Empfohlen)

```bash
# Supabase CLI installieren
npm install -g supabase

# Mit Projekt verbinden
supabase link --project-ref [YOUR-PROJECT-REF]

# Migrations ausführen
supabase db push

# Oder einzeln:
supabase migration up 001_workflow_status.sql
supabase migration up 002_files_table_rls.sql
supabase migration up 003_profiles_table_rls.sql
supabase migration up 004_storage_buckets_rls.sql
```

#### Option B: SQL Editor im Dashboard

1. **SQL Editor** im Supabase Dashboard öffnen
2. Jede Migration aus `/supabase/migrations/` kopieren und ausführen:
   - 001_workflow_status.sql
   - 002_files_table_rls.sql
   - 003_profiles_table_rls.sql
   - 004_storage_buckets_rls.sql

### 5. RLS (Row Level Security) verifizieren

Im SQL Editor ausführen:

```sql
-- Prüfen ob RLS aktiviert ist
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Alle Policies anzeigen
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Alle Tabellen sollten `rowsecurity = true` haben!

### 6. Storage Buckets einrichten

1. **Storage** im Dashboard öffnen
2. Buckets sollten durch Migration erstellt sein:
   - `user-uploads` (privat)
   - `avatars` (öffentlich)
3. Falls nicht, manuell erstellen mit entsprechenden Policies

### 7. Environment Variables aktualisieren

Falls noch nicht geschehen, in Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
```

Diese Werte finden Sie unter **Settings** → **API** in Supabase.

## 🧪 Testen

### 1. Lokaler Test

```bash
# .env.local mit Ihren Werten erstellen
cp .env.example .env.local

# Dev Server starten
pnpm dev

# Öffnen Sie http://localhost:3000/login
```

### 2. Auth Flow testen

1. Auf "Mit Google anmelden" klicken
2. Google Account auswählen
3. Sollte zu /dashboard weiterleiten
4. Logout testen

### 3. Datenbank prüfen

Im Supabase Dashboard → **Table Editor**:

- Nach Login sollte Eintrag in `auth.users` sein
- Profile in `profiles` Tabelle
- Workflow Status kann getestet werden

## 🔒 Sicherheits-Checkliste

- [ ] RLS auf allen Tabellen aktiviert
- [ ] Service Role Key NUR server-seitig verwendet
- [ ] Redirect URLs korrekt konfiguriert
- [ ] Keine sensiblen Daten in Logs
- [ ] HTTPS für alle URLs

## 🚨 Häufige Probleme

### "Invalid Redirect URL"
- Prüfen Sie die Redirect URLs in Supabase
- Stellen Sie sicher, dass `/auth/callback` korrekt ist

### "User not found"
- Prüfen Sie ob Migrations ausgeführt wurden
- RLS Policies könnten zu restriktiv sein

### "500 Error nach Login"
- Environment Variables in Vercel prüfen
- Supabase Service Role Key könnte fehlen

## 📞 Support

Bei Problemen:
1. Supabase Logs prüfen (Dashboard → Logs)
2. Vercel Function Logs checken
3. Browser Console für Client-Fehler

---

**Letzte Aktualisierung**: 2025-07-26
**Status**: Ready for Production Setup