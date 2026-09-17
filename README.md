# Theme Your Dream

Statische website met negen pagina's, responsive fotogalerijen en contact via WhatsApp. HTML, CSS en JavaScript; Node.js bouwt de publiceerbare bestanden.

## Lokaal werken

```sh
npm ci
npm run dev
```

Preview: http://127.0.0.1:4173. `npm start` serveert de laatst gebouwde versie; `npm run dev` bouwt eerst opnieuw.

## Onderhoud

- `site-manifest.js`: openbare pagina's en canoniek domein.
- `config.js`: bevestigde contact- en bedrijfsgegevens; de build verwerkt deze in de HTML.
- `style.css` en `script.js`: gedeelde vormgeving, menu en galerijen.
- `scripts/optimize-images.js`: responsive WebP-afbeeldingen. `npm run images -- --gallery` verwerkt de boxgalerijen; originelen blijven behouden.
- `Algemene voorwaarden Theme Your Dream.pdf`: openbare voorwaarden; het DOCX-bronbestand wordt niet gepubliceerd.

De desktopindeling van de boxen is 7,5% marge / 50% foto / 5% tussenruimte / 30% tekst / 7,5% marge. De vijf gridkolommen gebruiken dezelfde beschikbare viewportbreedte. Tot en met 900px staan foto en tekst onder elkaar.

## Controle en publicatie

```sh
npm run validate
npm test
npm run test:browser
npm run build
```

Voor browsertests is Playwright Chromium nodig (`npx playwright install chromium`). Screenshots en resultaten staan in `.scratch/browser/`.

De build maakt `.vercel/output` volgens de Vercel Build Output API. Alleen pagina's uit het manifest en benodigde assets worden gepubliceerd. De repositoryhoofdmap is geen publicatiemap.

Indexering staat uitsluitend aan bij `VERCEL_ENV=production` en `SITE_LIVE=true`. Zie [deploymentchecklist](DEPLOYMENT_CHECKLIST.md), [SEO-configuratie](SEO_CONFIGURATION.md) en [testinstructies](TESTING_SEO.md).
