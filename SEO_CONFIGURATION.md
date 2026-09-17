# SEO-configuratie

`build-robots-meta.js` genereert HTML-meta, HTTP-headers, robots.txt en sitemap.xml samen. Bronbestanden worden hierbij niet aangepast.

| Omgeving | SITE_LIVE | Resultaat |
|---|---|---|
| production | true | index, follow; Allow: / |
| production | ontbreekt of false | noindex, nofollow; Disallow: / |
| preview, development of onbekend | elke waarde | noindex, nofollow; Disallow: / |

`VERCEL_ENV` heeft voorrang op `ENVIRONMENT`. Zonder beide geldt development. Alleen de exacte waarde `true` schakelt de liveflag in.

`site-manifest.js` bepaalt domein en sitemap-pagina's. Pagina's hebben eigen titels en canonieke URL's. De HTTP-headers staan in het gegenereerde `.vercel/output/config.json`; pas deze niet handmatig aan. De bronversie van robots.txt wordt niet gekopieerd.

CSS, JavaScript en afbeeldingen gebruiken `public, max-age=0, must-revalidate`, zodat gewijzigde bestanden niet een jaar vast blijven zitten in de browsercache.

Noindex en robots.txt zijn geen toegangsbeveiliging. Gebruik hosting-authenticatie wanneer een preview niet openbaar toegankelijk mag zijn.
