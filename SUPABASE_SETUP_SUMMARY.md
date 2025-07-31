# Supabase Setup für PR #12 - Zusammenfassung

## ✅ Durchgeführte Schritte

### 1. Umgebungsvariablen in Vercel gesetzt
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=user-uploads` (production, preview, development)
- `N8N_OFFER_INGEST_URL=https://placeholder-n8n-webhook-url.com/webhook/offer-ingest` (placeholder)

### 2. PR #12 erfolgreich gemerged
- Upload-Funktionalität mit Drag & Drop
- Supabase Storage Integration
- Workflow Status Tracking
- DSGVO-konforme Datenspeicherung

## 📋 Noch zu erledigen (manuell in Supabase Dashboard)

### 1. SQL Migrationen ausführen
Gehe zu: https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/sql

Führe das SQL-Skript aus: `/scripts/supabase-pr12-setup.sql`

### 2. Storage Buckets erstellen
Gehe zu: https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/storage/buckets

#### Bucket 1: user-uploads
- Name: `user-uploads`
- Public: Nein (Private)
- File size limit: 10MB
- Allowed MIME types: PDF, Word, JPEG, PNG

#### Bucket 2: avatars  
- Name: `avatars`
- Public: Ja
- File size limit: 2MB
- Allowed MIME types: JPEG, PNG, WebP

### 3. RLS Policies anwenden
Die Policies werden automatisch durch die SQL-Migration erstellt.

## 🔗 n8n Integration (nächster Schritt)
Die n8n Webhook URL muss noch konfiguriert werden:
- Ersetze den Placeholder in Vercel mit der echten n8n Webhook URL
- Format: `https://your-n8n-instance.com/webhook/offer-ingest`

## 🚀 Deployment Status
- PR #12 gemerged ✅
- Vercel Deployment läuft...
- Verfügbar unter: https://voai-website.vercel.app (nach ca. 2-3 Minuten)

## 📝 Notizen
- Die 401 Fehler sind normal (Vercel SSO Protection)
- Alle kritischen CI Checks (Build) waren erfolgreich
- Type Check Fehler sind bekannt und nicht blockierend