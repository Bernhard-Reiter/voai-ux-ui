# Supabase Manuelle Einrichtung - Schritt für Schritt

## 1. SQL-Migrationen ausführen

### Schritt 1: Öffne den SQL Editor
1. Gehe zu: https://aqvnasuputatphvqrqam.supabase.co
2. Klicke im linken Menü auf **SQL Editor**

### Schritt 2: Neues Query erstellen
1. Klicke auf **New query**
2. Kopiere den gesamten Inhalt aus `/scripts/supabase-pr12-setup.sql`
3. Füge den SQL-Code in den Editor ein

### Schritt 3: SQL ausführen
1. Klicke auf **Run** (oder drücke Cmd/Ctrl + Enter)
2. Warte bis "Success" angezeigt wird
3. Die folgenden Tabellen sollten erstellt worden sein:
   - `workflow_status`
   - `files`

### Schritt 4: Verifizierung
1. Gehe zu **Table Editor** im linken Menü
2. Du solltest die neuen Tabellen sehen:
   - `workflow_status`
   - `files`

## 2. Storage Buckets erstellen

### Schritt 1: Storage Section öffnen
1. Klicke im linken Menü auf **Storage**
2. Klicke auf **Create bucket**

### Schritt 2: Bucket "user-uploads" erstellen
1. **Name**: `user-uploads`
2. **Public bucket**: ❌ NEIN (unchecked)
3. **File size limit**: `10` MB
4. **Allowed MIME types**: 
   ```
   application/pdf
   application/msword
   application/vnd.openxmlformats-officedocument.wordprocessingml.document
   image/jpeg
   image/png
   ```
5. Klicke auf **Create bucket**

### Schritt 3: Bucket "avatars" erstellen
1. Klicke erneut auf **Create bucket**
2. **Name**: `avatars`
3. **Public bucket**: ✅ JA (checked)
4. **File size limit**: `2` MB
5. **Allowed MIME types**:
   ```
   image/jpeg
   image/png
   image/webp
   ```
6. Klicke auf **Create bucket**

## 3. Storage Policies konfigurieren

### Für "user-uploads" Bucket:
1. Klicke auf den `user-uploads` Bucket
2. Gehe zum Tab **Policies**
3. Klicke auf **New policy**

#### Policy 1: Upload
- **Policy name**: `Users can upload to their own folder`
- **Policy definition**: `INSERT`
- **Target roles**: `authenticated`
- **WITH CHECK expression**:
  ```sql
  auth.uid()::text = (storage.foldername(name))[1]
  ```

#### Policy 2: View
- **Policy name**: `Users can view their own files`
- **Policy definition**: `SELECT`
- **Target roles**: `authenticated`
- **USING expression**:
  ```sql
  auth.uid()::text = (storage.foldername(name))[1]
  ```

#### Policy 3: Update
- **Policy name**: `Users can update their own files`
- **Policy definition**: `UPDATE`
- **Target roles**: `authenticated`
- **USING expression**:
  ```sql
  auth.uid()::text = (storage.foldername(name))[1]
  ```

#### Policy 4: Delete
- **Policy name**: `Users can delete their own files`
- **Policy definition**: `DELETE`
- **Target roles**: `authenticated`
- **USING expression**:
  ```sql
  auth.uid()::text = (storage.foldername(name))[1]
  ```

### Für "avatars" Bucket:
Wiederhole die gleichen Schritte, aber mit diesen Anpassungen:
- **View Policy**: Target roles = `anon, authenticated` (für öffentlichen Zugriff)
- **Expression für Upload/Update/Delete**:
  ```sql
  auth.uid()::text = split_part(name, '.', 1)
  ```

## 4. Verifizierung

### Tabellen prüfen:
1. Gehe zu **Table Editor**
2. Stelle sicher, dass beide Tabellen existieren und RLS aktiviert ist (Schloss-Symbol)

### Storage Buckets prüfen:
1. Gehe zu **Storage**
2. Beide Buckets sollten aufgelistet sein
3. `user-uploads` sollte ein Schloss-Symbol haben (privat)
4. `avatars` sollte kein Schloss haben (öffentlich)

## 5. Fertig! 🎉

Die Supabase-Konfiguration ist jetzt abgeschlossen. Die Anwendung kann nun:
- Dateien hochladen und speichern
- Workflow-Status verfolgen
- Benutzer-spezifische Datenisolation gewährleisten

## Troubleshooting

Falls Fehler auftreten:
1. Stelle sicher, dass du als Admin eingeloggt bist
2. Prüfe die Browser-Konsole auf Fehler
3. Versuche die SQL-Befehle einzeln auszuführen
4. Kontrolliere, ob die Tabellennamen bereits existieren