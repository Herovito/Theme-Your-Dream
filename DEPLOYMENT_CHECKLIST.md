# Deploymentchecklist

1. Voer `npm ci`, `npm run validate`, `npm test` en `npm run test:browser` uit.
2. Gebruik in Vercel de buildopdracht `npm run build`. Verwijder een eventuele handmatige Output Directory-override naar de repositoryhoofdmap; de build levert `.vercel/output`.
3. Controleer welke Git-branch aan Production is gekoppeld. Een wijziging op `concept-site` is niet automatisch een productielancering.
4. Zet bij de afgesproken livegang `SITE_LIVE=true` uitsluitend voor Production en maak een nieuwe deployment. Vercel levert `VERCEL_ENV` zelf.
5. Controleer op de gedeployde URL het menu, de vier galerijen, prijzen, WhatsApp-links en voorwaarden-PDF.
6. Controleer robots-meta, HTTP `X-Robots-Tag`, `/robots.txt` en `/sitemap.xml`. Production met liveflag: indexering aan. Preview: indexering uit.
7. Controleer domein, HTTPS en redirects op de werkelijke hosting. Controleer dat bijvoorbeeld `/README.md` en `/_mockup_preview.html` een 404 geven.

Bedrijfsgegevens zijn bevestigd en staan in `config.js`: WhatsApp 06-12166851, KvK 42125264, btw-id NL005516546B27. Controleer bedrijfs- en juridische inhoud opnieuw wanneer de bedrijfsvoering verandert.

Lokale controles bewijzen niet dat de hostinginstellingen of het live domein juist zijn. Publicatie en livegang moeten apart worden uitgevoerd en gecontroleerd.
