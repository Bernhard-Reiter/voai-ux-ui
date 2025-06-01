# GitHub Pages Setup

## Schritte zur Einrichtung:

1. **Repository auf GitHub erstellen**
   - Repository Name: `voai`
   - Public Repository wählen

2. **Code hochladen**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git remote add origin https://github.com/DEIN-USERNAME/voai.git
   git push -u origin main
   ```

3. **GitHub Pages aktivieren**
   - Gehe zu Settings → Pages
   - Source: "GitHub Actions" auswählen
   - Der Workflow startet automatisch beim Push

4. **Deployment überprüfen**
   - Warte bis der Workflow abgeschlossen ist (ca. 2-3 Minuten)
   - Deine Seite ist verfügbar unter:
     ```
     https://DEIN-USERNAME.github.io/voai/
     ```

## Wichtige Hinweise:

- Der `basePath` in `next.config.ts` ist auf `/voai` gesetzt
- Alle Links und Assets verwenden relative Pfade
- Bei jedem Push auf `main` wird automatisch neu deployed
- Der Build-Prozess erstellt statische HTML-Dateien im `out` Ordner

## Fehlerbehebung:

- Falls die Seite nicht erscheint, prüfe unter Actions ob der Workflow erfolgreich war
- Stelle sicher, dass GitHub Pages in den Repository Settings aktiviert ist
- Der erste Deploy kann bis zu 10 Minuten dauern