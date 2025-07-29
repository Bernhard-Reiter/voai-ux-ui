# 📍 Vercel Root Directory - Genauer Standort

## Schritt-für-Schritt Anleitung mit Screenshots

### 1. Vercel Dashboard öffnen
- Gehen Sie zu: https://vercel.com
- Loggen Sie sich ein
- Wählen Sie Ihr Team "vi4" aus (oben links)

### 2. Projekt auswählen
- Klicken Sie auf das Projekt "voai-website"
- URL sollte sein: https://vercel.com/vi4/voai-website

### 3. Settings/Einstellungen öffnen
- Klicken Sie oben auf den Tab "Settings" (Einstellungen)
- URL wird zu: https://vercel.com/vi4/voai-website/settings

### 4. Root Directory finden
Im Settings-Bereich:

1. **Scrollen Sie nach unten** zu "Build & Development Settings"
   ODER
2. **Klicken Sie links** im Menü auf "General"

### 5. Root Directory Feld lokalisieren

Das Feld befindet sich unter:
```
Build & Development Settings
├── Framework Preset: Next.js (erkannt)
├── Build Command: [...]
├── Output Directory: [...]
└── Root Directory: [HIER IST ES!] 👈
```

### 6. Root Directory ändern

**Aktueller Wert:** Wahrscheinlich `apps/frontend`
**Neuer Wert:** `.` (nur ein Punkt) oder leer lassen

⚠️ **WICHTIG**: 
- Wenn dort `apps/frontend` steht, löschen Sie es
- Geben Sie nur einen Punkt `.` ein
- Oder lassen Sie das Feld komplett leer

### 7. Speichern
- Klicken Sie auf "Save" (Speichern)
- Es erscheint eine Bestätigung

## 🔍 Alternative Navigation

Falls Sie es nicht finden:

1. **Direkt-Link**: 
   https://vercel.com/vi4/voai-website/settings/general

2. **Über Projekt-Übersicht**:
   - Gehen Sie zur Projekt-Hauptseite
   - Klicken Sie auf das Zahnrad-Symbol ⚙️
   - Wählen Sie "Project Settings"

## ✅ Bestätigung

Nach der Änderung sollte es so aussehen:
```
Root Directory: .
```
oder
```
Root Directory: [leer]
```

## 🚀 Nach der Änderung

1. Gehen Sie zurück zur Projekt-Übersicht
2. Klicken Sie auf "Redeploy" beim letzten Deployment
3. Wählen Sie "Redeploy with existing Build Cache"

Das Deployment sollte nun erfolgreich sein!