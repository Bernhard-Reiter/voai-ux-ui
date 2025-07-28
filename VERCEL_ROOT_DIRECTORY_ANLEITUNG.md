# Vercel Root Directory Einstellung - WICHTIG!

## Das Problem
Vercel findet die Next.js App nicht, weil es im falschen Verzeichnis sucht. Die Root Directory MUSS manuell im Vercel Dashboard gesetzt werden.

## Schritt-für-Schritt Anleitung

### 1. Vercel Dashboard öffnen
Gehe zu: https://vercel.com/vi4/voai-website/settings/general

### 2. Root Directory Setting finden
- Scrolle runter zum Abschnitt **"Build & Development Settings"**
- Suche nach dem Feld **"Root Directory"**

### 3. Root Directory setzen
- Klicke in das Eingabefeld "Root Directory"
- Gib genau ein: `apps/frontend`
- **WICHTIG**: Kein führender oder abschließender Slash!
- Richtig: `apps/frontend`
- Falsch: `/apps/frontend/` oder `apps/frontend/`

### 4. Änderungen speichern
- Klicke auf den **"Save"** Button
- Vercel wird fragen, ob ein neues Deployment gestartet werden soll

### 5. Redeployment starten
- Wähle **"Redeploy"** 
- Oder gehe zu "Deployments" Tab und klicke auf "Redeploy" beim letzten Deployment

## Was passiert dann?
- Vercel wird im Verzeichnis `apps/frontend` nach der Next.js App suchen
- Der Build-Befehl `pnpm turbo run build --filter=@voai/frontend` wird korrekt ausgeführt
- Die Output Directory `apps/frontend/.next` wird gefunden
- Die `/features` Seite und alle anderen Routen funktionieren

## Warum geht das nicht über CLI?
Die Root Directory ist eine Projekt-Einstellung auf Vercel's Seite und kann nur über das Web-Interface geändert werden. Es ist keine Einstellung, die in vercel.json oder über die CLI gesetzt werden kann.

## Alternative (falls das nicht funktioniert)
Falls das Setting nicht sichtbar ist oder nicht funktioniert, können wir alternativ:
1. Ein neues Vercel-Projekt erstellen mit der korrekten Root Directory
2. Die Domain vom alten zum neuen Projekt umziehen

Aber normalerweise sollte das Root Directory Setting verfügbar und die einfachste Lösung sein.