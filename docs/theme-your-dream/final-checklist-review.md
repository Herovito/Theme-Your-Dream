# Eindcontrole op basis van de aangeleverde checklist

Datum: 18 september 2026. Gecontroleerde code: `8f737cc`, branch `concept-site`.

**Conclusie:** de lokale technische controles slagen. De checklist kan nog niet volledig worden afgetekend: er zijn inhoudelijke verbeterpunten en de productieomgeving is niet geverifieerd. Tijdens deze controle is de websitecode niet gewijzigd.

## Aantoonbaar gecontroleerd

- Acht buildtests geslaagd, inclusief productie/liveflag, previewblokkade, configuratie, publicatie-allowlist en linkvalidator.
- Link-, asset-, anker- en JSON-LD-validatie geslaagd; build geslaagd.
- Chromium: negen pagina's op 320, 375, 768, 1024, 1440 en 1920px. Geen horizontale overflow, verborgen geteste koppen/lijsten, kapotte lokale afbeeldingen, mislukte lokale requests of JavaScript-fouten.
- Achttien Axe-scans (negen pagina's op 375 en 1440px) zonder gerapporteerde WCAG 2.1 A/AA-overtredingen. Dit is geen volledige WCAG-certificering.
- Mobiel menu, dropdown, Escape en desktoptoetsenbordbediening geslaagd. Alle galerijstipjes laden hun afbeelding; eindknoppen worden uitgeschakeld.
- Fallback bij uitgeschakeld/geblokkeerd JavaScript en reduced motion geslaagd. Galerijtransitie met reduced motion gemeten op 0,01ms.
- Aanvullend: Firefox- en WebKit-engines op 375, 768 en 2560px, Chromium op 699, 900 en 2560px, steeds alle negen pagina's. Geen gemeten horizontale overflow of JavaScript-fouten.
- Alle negen pagina's met 200% root-font-size op 1280px: geen horizontale documentoverflow. Dit is een gerichte tekstschaaltest, geen volledige visuele browserzoomtest; vaste px-tekst schaalt hiermee niet mee.

## Status per onderdeel

| Onderdeel | Status | Toelichting |
|---|---|---|
| Merk en ontwerp | Grotendeels akkoord | Boxfoto's en overzicht hebben 24px afronding. Andere sitefoto's behouden bewust organische vormen. Cream is #E0CDB8 en Linen #C9B5A0, conform de bestaande goedgekeurde site, niet de oude checklistkleuren. |
| Typografie en ruimte | Gecontroleerd, niet absoluut afgetekend | Responsive controles slagen; geen garantie op afwezigheid van ieder weeswoord bij alle mogelijke breedtes. |
| Taal | Basiscontrole geslaagd | Geen genoemde clichéwoorden, TODO/FIXME of invulvelden gevonden in de gescande zichtbare HTML-tekst. Geen volledige redactionele/juridische eindredactie. |
| CTA's | Akkoord met afgesproken uitzonderingen | Boxdetail: Reserveer deze box plus bescheiden vraaglink. Overzicht: App Dionne voor advies. Algemene pagina's: Vertel Dionne jouw idee. |
| Lijsten | Functioneel passend | Inhoudslijsten gebruiken feature-list; navigatie en de goedgekeurde praktische definitielijst gebruiken hun eigen semantiek. Die moeten niet naar feature-list worden omgebouwd. |
| Navigatie en interactie | Geslaagd binnen testscope | Menubediening, galerijstipjes, eindtoestanden, keyboard en fallback getest. Back-to-top gebruikt in code de drempel >300px. |
| SEO | Basis geslaagd | Negen unieke titels, één H1 per pagina, logische kopvolgorde en meta descriptions aanwezig. Beschrijvingen 86–155 tekens; exact 155 is geen verplicht doel. |
| Afbeeldingen | Geoptimaliseerd; alt-teksten verbeteren | Responsive WebP aanwezig. Grootste gepubliceerde afbeelding circa 288 KiB. Zestien galerij-alt-teksten zijn nog generiek: boxnaam plus foto 1–4. |
| Toegankelijkheid | Automatische scans geslaagd; handwerk open | Beschrijvende alt-teksten verbeteren. Galerijstipjes zijn 32×32px in plaats van de gevraagde 44×44px; ook gewone tekstlinks halen niet overal 44px hoogte. |
| Privacy | Niet afgetekend | TransIP staat als host vermeld, terwijl een Vercel-preview wordt gebruikt. Google Fonts wordt extern geladen en staat niet concreet benoemd in de privacytekst. Werkelijke dienstverleners en gegevensstromen moeten worden afgestemd. |
| Browsers/apparaten | Enginecontroles geslaagd | Chromium, Firefox en WebKit lokaal getest. Geen afzonderlijke actuele Chrome-/Edge-release of echte iPhone, Android en tablet getest. |
| Deployment | Lokale output geslaagd; productie open | Publicatie-allowlist, robots, sitemap en cacheheaders worden gebouwd. Werkelijke DNS, HTTPS, dashboardvariabelen, redirects en HTTP-headers niet bevestigd. De opgegeven preview vroeg bij de eerdere browsercontrole om Vercel-login. |
| 404 | Basis aanwezig, live open | Lokale server retourneert 404 voor onbekende bestanden. Geen eigen vormgegeven 404-pagina aanwezig; echte hostingrespons nog controleren. |
| Content compleet | Bedrijfsgegevens aanwezig; bedrijfsafspraken controleren | Contactgegevens en prijzen verwerkt; ophalen/retour wordt met Dionne afgesproken. Eigendom/bereikbaarheid van socialmedia-accounts en berichtbezorging niet vastgesteld. |
| Performance | Bestanden verbeterd; scores niet gemeten | Geen actuele Lighthouse- of PageSpeed-meting. CSS en JS zijn niet geminificeerd; externe font-CSS blijft onderdeel van het laadpad. Geen score van 80/90 geclaimd. |
| Monitoring | Niet vastgesteld | Geen Analytics/Sentry-integratie gevonden in de openbare paginacode. Hostingmonitoring niet gecontroleerd. Niet automatisch toegevoegd. |

## Concrete resterende punten

1. **Vóór livegang: hosting en privacy laten aansluiten.** Bevestig de daadwerkelijke hostingpartij, beschrijf de gebruikte externe diensten en controleer de productieconfiguratie. Geen hostingnaam raden of juridisch akkoord afgeven op basis van de repository.
2. **Zestien galerij-alt-teksten inhoudelijk maken.** Beschrijf per foto de getoonde tafel of het detail, na visuele inspectie van de betreffende afbeelding.
3. **Klikvlakken van galerijstipjes naar 44×44px.** Het zichtbare stipje kan klein blijven. De huidige 32px is een afwijking van de aangeleverde checklist; de geslaagde AA-scan betekent niet dat dit 44px-doel is gehaald.
4. **Productie- en performancetest afronden.** Controleer de toegankelijke deployment, DNS/HTTPS, robots/meta/headers, 404 en externe contactbestemmingen. Meet vervolgens de werkelijke mobiele laadsnelheid.
5. **Echte apparaten en visuele zoomcontrole.** Controleer minimaal één iPhone/Safari en één Android-toestel, inclusief touch, tekstvergroting en staand/liggend gebruik.

## Correcties op de checklist zelf

- Copyright 2026 is correct voor deze controle; niet terugzetten naar 2025.
- Geen apart dark mode-ontwerp, contactformulier of video aanwezig: bijbehorende punten zijn niet van toepassing.
- Een openbaar zakelijk e-mailadres is een bewuste contactmogelijkheid. Verbergen is geen voorwaarde voor een geslaagde technische review.
- Een cookiebanner niet automatisch toevoegen. De code bevat geen aangetroffen analytics-/trackingimplementatie, en document.cookie was leeg tijdens de lokale controles. Dit sluit servercookies of andere gegevensverwerking op de uiteindelijke host niet uit. Volgens de [Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl/actueel/foute-cookiebanners-aangepast-na-ingrijpen-ap) vereisen uitsluitend strikt noodzakelijke functionele cookies geen toestemming. Beoordeel dit opnieuw bij toevoeging van tracking.
- Externe fonts zijn wel een externe resource, ook zonder cookie. De site gebruikt de [Google Fonts API](https://developers.google.com/fonts/docs/getting_started); lokaal hosten is een mogelijke vervolgstap om die externe fontverzoeken weg te nemen.
- Analytics, monitoring en error tracking zijn keuzes, geen reden om zonder opdracht nieuwe diensten of tracking te activeren.

## Bewijsbestanden en sign-off

- `.scratch/browser/results.json`: 54 layoutresultaten, inclusief 18 Axe-scans; screenshots per pagina/breedte.
- `.scratch/checklist-browsers.json`: 81 aanvullende engine/breedtecontroles en negen tekstschaalcontroles.
- `.scratch/checklist-content.json`: titels, koppen, beschrijvingen, alt-teksten en externe bronnen per pagina.
- Uitvoer `npm test`, `npm run validate`, `npm run build`, `npm run test:browser`: geslaagd.

**Geen livegang-sign-off gegeven.** Productiecontrole, de genoemde privacyafstemming en resterende handmatige controles zijn nog open. Er is tijdens deze review geen deployment uitgevoerd en geen bericht verzonden.

## Besluiten na deze review

De gebruiker heeft Vercel als definitieve host bevestigd en gekozen voor lokaal gehoste lettertypen. De privacytekst is daarop aangepast; Work Sans en Rouge Script worden met hun licenties lokaal gepubliceerd. De bestaande foto-omschrijvingen blijven op verzoek ongewijzigd. De klikvlakken zijn niet aangepast; daarvoor is geen afzonderlijke keuze gemaakt.
