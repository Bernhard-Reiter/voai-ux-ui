# DNS Konfiguration für voai.vi4.me

## ✅ Domain erfolgreich zu Vercel hinzugefügt!

Die Domain `voai.vi4.me` wurde erfolgreich zu Ihrem Vercel-Projekt hinzugefügt.

## 🔧 Erforderliche DNS-Änderung

### Aktuelle Einstellung:
```
voai.vi4.me    A    81.19.145.164
```

### NEUE Einstellung (bitte ändern):
```
voai.vi4.me    A    76.76.21.21
```

## 📝 Schritt-für-Schritt Anleitung:

1. **Loggen Sie sich bei Ihrem DNS-Provider ein** (world4you.at)

2. **Ändern Sie den A-Record:**
   - Von: `81.19.145.164`
   - Zu: `76.76.21.21`

3. **Speichern Sie die Änderungen**

4. **Warten Sie auf DNS-Propagation** (normalerweise 5-30 Minuten)

## 🌐 Alternativ: Nameserver ändern

Falls Sie vollständige Kontrolle an Vercel übergeben möchten:
- Ändern Sie die Nameserver zu:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

## ⏱️ Nach der DNS-Änderung:

- Vercel wird automatisch die Domain verifizieren
- Sie erhalten eine E-Mail bei erfolgreicher Verifizierung
- Die Website wird dann unter https://voai.vi4.me erreichbar sein
- SSL-Zertifikat wird automatisch erstellt

## 🔍 Status überprüfen:

```bash
# Domain-Status prüfen
vercel domains inspect voai.vi4.me

# DNS-Propagation testen
dig voai.vi4.me
```

## 📧 Support:

Bei Problemen:
- Vercel Dashboard: https://vercel.com/vi4/voai-website-phase4/settings/domains
- DNS-Dokumentation: https://vercel.link/domain-configuration