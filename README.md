# Theme Your Dream — Website

Tijdelijke landingspagina van **Theme Your Dream**, de eventstyling studio
van Dionne. De pagina is de eerste stap van een website die de komende
jaren verder wordt uitgebreid.

## Wat is Theme Your Dream

Theme Your Dream verkoopt geen decoratie, maar rust. Klanten komen vaak met
een idee, niet met een uitgewerkt plan. Dionne denkt mee, werkt het idee uit
en neemt daarna de regie over — de klant hoeft zich nergens meer zorgen over
te maken.

De merkbelofte staat centraal op elke pagina:

> Je hoeft nog geen plan te hebben. Een idee is genoeg.

## Gebruikte techniek

- **HTML5** — semantische opbouw (`header`, `main`, `section`, `footer`)
- **CSS3** — custom properties (design tokens), Flexbox, `clamp()` voor
  vloeiende typografie, geen frameworks
- **Geen JavaScript** — de pagina heeft op dit moment geen interactiviteit
  nodig en blijft daardoor maximaal snel en stabiel
- **Google Fonts** — Fraunces (koppen) en Work Sans (lopende tekst), geen
  betaalde lettertypen

Er is bewust voor pure HTML/CSS gekozen: geen React, geen build-stap, geen
afhankelijkheden. Dat houdt de site licht, snel en eenvoudig te onderhouden
voor de komende jaren.

## Projectstructuur

```
/
├── index.html    Landingspagina
├── style.css     Alle styling, met design tokens in :root
├── logo.png      Officieel logo (transparante achtergrond)
└── README.md     Dit bestand
```

Alle bestanden staan plat in de hoofdmap van de repository. Eerdere versies
van dit document beschreven een mapstructuur met een aparte `assets`-map.
Die structuur is niet meegegaan naar GitHub, en de code is daarom
aangepast naar de bestandsindeling die er nu werkelijk staat.

### Logo vervangen

Wil je later een nieuw logo plaatsen? Vervang het bestand `logo.png` door
het nieuwe logobestand, met dezelfde naam. De rest van de code verandert
niet mee, zolang de afbeelding een vergelijkbare verhouding (breed/hoog)
heeft. Bij een sterk afwijkende verhouding kan het `width`/`height`-
attribuut in `index.html` bijgewerkt worden voor de beste scherpte.

Er is op dit moment geen los faviconbestand. De browser gebruikt `logo.png`
ook als favicon en als icoon op het startscherm van mobiele toestellen. Wil
je daarvoor op termijn een vierkant, strakker icoon, dan kan dat als apart
bestand worden toegevoegd.

### Logo wordt niet getoond op de live website

Komt dit later weer voor: controleer eerst of het bestand `logo.png`
daadwerkelijk in de repository staat, op de hoofdmap, en of de naam exact
overeenkomt met wat in `index.html` staat (`src="logo.png"`). De meeste
hosting, waaronder Vercel, is hoofdlettergevoelig: `Logo.png` is niet
hetzelfde bestand als `logo.png`.

Tot een eventueel probleem is opgelost blijft de pagina overigens gewoon
overeind staan: in plaats van een kapot beeldicoon toont de site
automatisch de tekst "Theme Your Dream" in het koppenlettertype. Dat is
een vangnet voor onderweg, geen vervanging voor het echte logo: zie je die
tekstuele naam in plaats van het logo zelf, dan is dat het signaal dat
`logo.png` niet gevonden wordt en actie nodig is.

## Design — kleuren en typografie

Het kleurenpalet is direct afgeleid van het officiële logo: donkerbruin en
oudroze, aangevuld met een stille, warme groentint. Geen zwart, geen
spierwit, geen goud — uitsluitend warme natuurtinten. Alle kleuren staan
als CSS custom properties boven in `style.css`, zodat toekomstige pagina's
dezelfde tokens kunnen hergebruiken.

- **Fraunces** voor koppen — sierlijk, warm serif
- **Work Sans** voor lopende tekst — modern en goed leesbaar

## Toegankelijkheid

- Voldoende kleurcontrast (WCAG AA) op alle tekst- en knopkleuren
- Zichtbare focus-states bij toetsenbordnavigatie (`:focus-visible`)
- "Direct naar inhoud"-link voor schermlezers en toetsenbordgebruikers
- Alt-tekst op het logo
- `prefers-reduced-motion` wordt gerespecteerd: animaties worden uitgeschakeld
  voor bezoekers die dat hebben ingesteld

## Responsive gedrag

Mobile-first opgebouwd, met verfijningen op:

- Mobiel (vanaf ~375px)
- Tablet (vanaf 640px)
- Laptop (vanaf 900px)
- Desktop (vanaf 1200px)
- Ultra-wide (vanaf 1800px) — de inhoud blijft gecentreerd en leesbaar,
  zonder dat de pagina visueel "verdwaalt" in lege zijkanten

## Volgende stappen

Deze pagina is gebouwd als fundament. Bij uitbreiding naar meerdere
pagina's:

- Hergebruik de design tokens in `:root` van `style.css` voor consistentie
- De klasse `.signature-line` ligt al klaar als herbruikbaar grafisch
  detail, geïnspireerd op de swoosh uit het logo
- Houd nieuwe content in dezelfde toon: warm, rustig, persoonlijk —
  nooit commercieel of gehaast

## Designlog

**V1 — Eerste opzet.** Tekstuele tijdelijke pagina, basisstructuur.

**V2 — Merkidentiteit.** Officieel logo verwerkt (vrijstaand gemaakt en
geoptimaliseerd), kleurenpalet afgeleid van het logo, projectstructuur
opgezet, SEO/toegankelijkheid toegevoegd.

**V3 — Verfijning.** Compositie verbeterd zodat het oog logo → slogan →
intro → uitnodiging volgt, zuiver via witruimte (geen kleur of animatie).
Logo vergroot voor meer status. Introtekst herschreven naar een warmer,
persoonlijker ritme. CTA verruimd zodat hij als uitnodiging voelt in
plaats van als knop. Zichtbare achtergrondtextuur vervangen door een
nauwelijks waarneembare gradient. Coming-soon-lijst symmetrisch gemaakt
op alle schermformaten.

**V4 — Laatste polijstronde.** Logo nog eens 25 procent vergroot en op
hogere resolutie aangeleverd voor scherpte op elk scherm. Een CSS-only
fallback toegevoegd die de merknaam toont als het logobestand om wat voor
reden dan ook niet laadt, zodat de pagina nooit kapot oogt. Introductie-
tekst herschreven naar een directere, herkenbaardere beschrijving van het
gevoel waarmee klanten vaak binnenkomen. Footerregel verwijderd die het
logo alleen maar herhaalde. Achtergrond nog verder verzacht. CTA optisch
verlicht zonder de kleur of het contrast aan te passen. Alle koppeltekens
in lopende tekst gecontroleerd en waar nodig herschreven.

**V5 — Logo daadwerkelijk gerepareerd.** De code verwees naar
`assets/logo/logo.png`, maar die map was niet meegegaan naar de
GitHub-repository: daar stond alleen een los bestand `logo.png` in de
hoofdmap. Daardoor laadde het logo nooit, en verscheen steeds de
tekstuele noodoplossing uit V4 in plaats van het echte logo. Alle
verwijzingen in `index.html` en `style.css` zijn aangepast naar het pad
waar het bestand daadwerkelijk staat. De projectstructuur in dit document
is bijgewerkt naar de werkelijke, platte bestandsindeling.
# Trigger concept-site deployment Thu Jul 23 19:27:02     2026
