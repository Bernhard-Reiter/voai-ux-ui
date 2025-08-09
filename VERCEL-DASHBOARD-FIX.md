# 🔧 Vercel Dashboard Fix

Das Deployment scheitert, weil Vercel die package.json nicht findet. 

## Lösung im Vercel Dashboard:

1. **Gehen Sie zu**: https://vercel.com/vi4/voai-circula-showcase/settings

2. **General → Root Directory**:
   - Leer lassen oder `.` eingeben (NICHT `apps/showcase`)

3. **General → Build & Development Settings**:
   ```
   Build Command: cd apps/showcase && pnpm build
   Output Directory: apps/showcase/.next
   Install Command: pnpm install --frozen-lockfile
   ```

4. **Environment Variables** sind bereits gesetzt:
   - UI_VARIANT = A
   - NEXT_PUBLIC_VARIANT_TEST = true
   - ENABLE_ANALYTICS = true

5. **Klicken Sie auf "Save"**

6. **Neues Deployment triggern**:
   - Gehen Sie zu "Deployments"
   - Klicken Sie auf die drei Punkte beim letzten Deployment
   - "Redeploy"

## Alternative: Neues Projekt mit GitHub Import

Falls das nicht funktioniert:

1. Löschen Sie das aktuelle Projekt
2. Gehen Sie zu https://vercel.com/new
3. Import from GitHub: `https://github.com/Bernhard-Reiter/voai-ux-ui`
4. **WICHTIG**: Root Directory auf `apps/showcase` setzen
5. Vercel erkennt automatisch Next.js

Das ist der sicherste Weg!