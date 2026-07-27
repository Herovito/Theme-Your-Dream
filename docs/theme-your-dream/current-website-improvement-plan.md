# Theme Your Dream — Integraal Website Verbeterplan

**Datum:** 26 juli 2026  
**Status:** Concept voor goedkeuring  
**Versie:** 1.0

---

## SAMENVATTING

De huidige Theme Your Dream website (**pure HTML/CSS statische site**) voelt rustig, verzorgd en merkconform. **Echter:** De website ontbreekt kritieke elementen voor conversie en is niet gereed voor publieke publicatie.

### 🎯 Kernbevindingen

**Sterke onderdelen:**
- ✓ Merkconformiteit en tone of voice (7-8/10)
- ✓ Visuele rust en typografie
- ✓ Kern-kernboodschap duidelijk ("Je hoeft nog geen plan te hebben")
- ✓ WhatsApp als contactroute goed ingezet
- ✓ Werkwijze van 4 stappen ondersteunt vertrouwen

**Kritieke gaten:**
- ✗ **NOINDEX op alle pagina's** — Google indexeert niet (SEO blocker)
- ✗ **Geen portfolio** — geen bewijs dat Dionne goed werk levert
- ✗ **Onduidelijk onderscheid** Eventstyling vs Themaboxen
- ✗ **Kleurpalet wijkt af** van merkhandboek (hexcodes fout)
- ✗ **Privacyverklaring onvolledig** (KvK/Btw niet ingevuld)
- ✗ **Geen pricing op eventstyling** — budgettwijfel onbeantwoord

### 📈 Scores per agent

| Agent | Score | Kernbevinding |
|-------|-------|---|
| **Creatief** | 7.5/10 | Rustig maar te subtiel; foto's als protagonist nodig |
| **Merk** | 7/10 | Toon adresseert goed, maar kleurcodes wijken af |
| **Website** | 6/10 | Sitemap 70%, twee kritieke twijfels niet geadresseerd |
| **SEO** | 4/10 | Noindex-blocker + pricing/portfolio ontbreken |

---

## ONDERZOCHTE HUIDIGE SITUATIE

### Technische basis
- **Framework:** Pure HTML5 + CSS3 (geen build, geen framework)
- **Pagina's:** 8 (homepage + 6 interne + privacyverklaring)
- **Afbeeldingen:** 4 sfeerfoto's + 4 box hero's
- **Animaties:** Wave transitions, scroll reveals, parallax, CTA pulse
- **Hosting:** Onbekend (waarschijnlijk Vercel via Git)
- **Status:** Noindex, nofollow op ALLE pagina's (must fix)

### Huige content
- **Homepage:** 7 secties (hero, intro, eventstyling, themaboxen, over dionne, werkwijze, CTA)
- **Eventstyling:** Intro + feature list + werkwijze + mood grid + CTA
- **Themaboxen:** Overview + feature list + 4 boxes in grid
- **Themabox details:** Prijzen (€85), borg (€40), inhoudlijst, praktische info
- **Over Dionne:** Portret + persoonlijke intro + stijllijst + werkwijze
- **Privacyverklaring:** Kopie aanwezig, maar KvK/Btw-id niet ingevuld

### Ontbrekend
- ✗ Portfolio/case studies (KRITIEK)
- ✗ FAQ (HOOG)
- ✗ Testimonials/reviews (HOOG)
- ✗ Werkfoto's Dionne (HOOG)
- ✗ Foto's themabox inhoud (HOOG)
- ✗ Local SEO setup (MEDIUM)
- ✗ Partner informatia (MEDIUM)

---

## STERKE ONDERDELEN DIE BEHOUDEN BLIJVEN

### Merk & Tone
- Hero quote: "Je hoeft nog geen plan te hebben. Een idee is genoeg." — behouden
- Kern-messaging: "Jij geniet. Wij zorgen dat alles klopt." — behouden
- No menu header (alleen logo) — behouden (merkconform)
- Vier-stappen werkwijze — behouden (sterke kernboodschap)
- Kleurgebruik (warm palette) — behouden, maar hexcodes fixen

### Visueel
- Golfanimaties tussen secties — behouden (subtiel en zinvol)
- Sfeerfotografie (linnen, kaarsen, bloemen) — behouden, aanvullen met portfolio
- Typografie (Fraunces + Work Sans) — behouden
- Whitespace en rustgebied — behouden

### Content
- Eventstyling feature list ("Van tafel tot backdrop...") — behouden, aanvullen met cases
- Themaboxen collectie-idee — behouden, beter differentieren
- Over Dionne persoonlijke stem — behouden, aanvullen met werkfoto's
- CTA "Vertel Dionne jouw idee" — behouden

### Technisch
- Pure HTML/CSS zonder dependencies — behouden (simpel, snel)
- Responsive design met mobile nav toggle — behouden
- Accessibility: prefers-reduced-motion supported — behouden
- Alt-teksten op afbeeldingen — behouden

---

## BELANGRIJKSTE PROBLEMEN

### 🚨 KRITIEK (moet voor launch)

#### 1. **NOINDEX blocker**
- **Status:** Alle pagina's hebben `<meta name="robots" content="noindex, nofollow">`
- **Gevolg:** Google ziet website niet, geen SEO
- **Fix:** Verwijderen of wijzigen naar `index, follow`
- **Prioriteit:** ONMIDDELLIJK

#### 2. **Portfolio ontbreekt**
- **Status:** Geen case studies, geen bewijs van kwaliteit
- **Gevolg:** Klant twijfelt: "Kan Dionne dit echt?"
- **Fix:** Minimaal 3-5 echte projecten met foto's + klantgetuigenis
- **Prioriteit:** KRITIEK (voor launch)

#### 3. **Onderscheid Eventstyling vs Themaboxen onduidelijk**
- **Status:** Beide services voelen gelijk zwaargewicht, verschil unclear
- **Gevolg:** Klant weet niet waar te beginnen
- **Fix:** Homepage herstructureren: Eventstyling als premium/groeirichting, Themaboxen als laagdrempel
- **Prioriteit:** HOOG (voor launch)

#### 4. **Werkfoto's Dionne ontbreken**
- **Status:** Alleen portret, geen werk zichtbaar
- **Gevolg:** Merkhandboek zegt "Dionne aan het werk, niet gemaakt poserend"
- **Fix:** Minimaal 3-5 werkfoto's van Dionne in actie (setting table, arranging flowers, etc.)
- **Prioriteit:** HOOG (voor launch)

#### 5. **Privacyverklaring onvolledig**
- **Status:** "[in te vullen]" voor KvK en Btw-id
- **Gevolg:** Juridisch/vertrouwensprobleem
- **Fix:** Ingevuld, plus "contactpagina" verwijzing verwijderen
- **Prioriteit:** HOOG (juridisch vereist)

### 🔶 HOOG (moet snel)

#### 6. **Kleurcodes wijken af van merkhandboek**
- **Status:** Cream (#EDE1D2 ipv #F7F1EA), Old pink (#C9A492 ipv #C7A49A)
- **Gevolg:** Merkconsistentie verzwakt
- **Fix:** CSS tokens exact merkhandboek-hexcodes
- **Prioriteit:** HOOG (merkintegriteit)

#### 7. **Pricing ontbreekt op eventstyling**
- **Status:** Geen budgetindicatie gegeven
- **Gevolg:** "Is dit voor mijn budget?" twijfel onbeantwoord
- **Fix:** Voeg prijsrange toe ("Eventstyling begint bij €500")
- **Prioriteit:** HOOG (conversie)

#### 8. **FAQ ontbreekt**
- **Status:** Geen antwoorden op veel gestelde vragen
- **Gevolg:** Twijfel, meer WhatsApp-vragen, conversie-drop
- **Fix:** FAQ section met 8-10 veel gestelde vragen
- **Prioriteit:** HOOG (conversie)

#### 9. **Testimonials/reviews ontbreken**
- **Status:** Alleen Dionne's claims, geen klantbewijs
- **Gevolg:** Vertrouwen onvoldoende gebouwd
- **Fix:** Minimaal 3-5 klantgetuigenissen (tekst + foto/video)
- **Prioriteit:** HOOG (vertrouwen)

#### 10. **Foto's van themabox inhoud ontbreken**
- **Status:** Alleen hero foto van volledige box
- **Gevolg:** Klant weet niet wat erin zit (afbeelding)
- **Fix:** Close-ups van items per box (styling tips ook toevoegen)
- **Prioriteit:** HOOG (conversie)

---

## GEWENSTE EINDRICHTING

### Visueel & Interactie
- **Foto's als protagonist**: Groter, meer visual storytelling
- **Eventstyling als premium service**: Fluïde, organische animaties, luxe-feel
- **Themaboxen als collectie**: Meer gestructureerd, curation-feel (niet webshop)
- **Dionne prominent**: Werkfoto's, portret, persoonlijke voice
- **Portfolio als proof**: Echte projecten met context

### Content & Messaging
- **Twee-track klantreis**: "Dit is voor eventstyling" vs "Dit is voor themaboxen"
- **Twijfels adresseren**: Budget, kwaliteit, proces duidelijk
- **Transparantie**: Prijzen, werkwijze, partners zichtbaar
- **Klantbewijs**: Testimonials, reviews, cases prominent

### Technisch
- **SEO gereed**: Noindex verwijderd, sitemap, local schema
- **Fast & accessible**: Pure HTML/CSS behouden, optimize images
- **Mobile-first**: Alle interacties testen op 320px-1920px
- **Privacy-compliant**: Formulieren veilig, GDPR duidelijk

---

## VOORGESTELDE SITEMAP

### Huig (Actief)
```
✓ Homepage (index.html)
✓ Eventstyling (eventstyling.html)
✓ Themaboxen (themaboxen.html)
  ✓ Time to Celebrate (box-celebrate.html)
  ✓ Natural (box-natural.html)
  ✓ Warm & Cosy (box-warm-cosy.html)
  ✓ It's Your Day (box-your-day.html)
✓ Over Dionne (over_dionne.html)
✓ Privacyverklaring (privacyverklaring.html)
```

### Nieuw (Nodig)
```
✗ Portfolio (portfolio.html) — KRITIEK
✗ FAQ (faq.html) — HOOG
✗ Contact (contact.html) — MEDIUM (WhatsApp werkt, maar info pagina helpt)
✗ Partners (partners.html) — LAAG (optioneel)
```

---

## NAVIGATIESTRUCTUUR (Voorstel)

### Huig
```
        [Logo - centraal, klein]
    
  Eventstyling | Themaboxen | Over Dionne
```

### Verbeterd
```
         [Logo - centraal]
    
Eventstyling | Themaboxen | Over Dionne

+ Footer met:
  - Sitemap link
  - Contact info
  - Social links
  - Legal links
```

---

## PAGINADOELEN (VOORGESTELD)

### Homepage
- **Doel:** Klant voelt dat TYD voor hem/haar is; duidelijk welke service kiezen
- **Primaire actie:** Naar Eventstyling OF Themaboxen pagina (niet direct WhatsApp)
- **Klanttwijfels adresseren:** Alle 6 (budgettwijfel met prijsrange, kwaliteit met testimonials)
- **Informatie:** Hero → Wie is Dionne → Twee diensten met duidelijk verschil → Werkwijze → Social proof → CTA

### Eventstyling
- **Doel:** "Dit is premium service, Dionne doet het allemaal" overtuigen
- **Primaire actie:** "Vertel Dionne jouw idee"
- **Onderdelen:** Intro → Wat Dionne regelt → Budget range → Werkwijze → Partners → Portfolio cases → Testimonials → CTA

### Themaboxen
- **Doel:** "Dit is makkelijk, aanbodvol, curated" overkomen
- **Primaire actie:** "Reserveer jouw box"
- **Onderdelen:** Intro → Hoe het werkt → Vier boxes (met prijs op overzicht) → Beschikbaarheid → Shipping info → Reviews → CTA

### Themabox detail (per box)
- **Doel:** Koopbeslissing faciliteren
- **Primaire actie:** "Reserveer"
- **Onderdelen:** Box naam + hero → Prijs + borg → Wat erin → Hoe je het stijlt (foto's voor/na) → Reviews → Shipping → Damage policy → "Reserveer"

### Over Dionne
- **Doel:** Vertrouwen geven via persoon, niet alleen service
- **Primaire actie:** "Kies eventstyling" of "Bekijk themaboxen"
- **Onderdelen:** Portret → Persoonlijke intro (eigen stem) → Stijl → Werkwijze → Werkfoto's (3-5) → Testimonials → Service links

### Portfolio (NIEUW)
- **Doel:** Bewijs geven dat Dionne goed werk levert
- **Primaire actie:** "Vertel Dionne jouw idee"
- **Onderdelen:** Per project (3-5): Foto gallery → Event type + klant industry → Wat Dionne deed → Klant testimonial

### FAQ (NIEUW)
- **Doel:** Twijfels uit de weg ruimen
- **Onderdelen:**
  1. Eventstyling: Budget, partners, proces, levering, timing
  2. Themaboxen: Prijs, borg, beschadiging, shipping, beschikbaarheid
  3. Dionne: Achtergrond, locatie, beschikbaarheid

### Contact (NIEUW - optioneel)
- **Doel:** Verwachtingen management
- **Onderdelen:** WhatsApp link + E-mail + Responstijd expectation + Wat Dionne vraagt in eerste contact

---

## CREATIEVE RICHTING (5 Ingrepen)

Uit creative developer analyse komen 5 kenmerkende creatieve ingrepen:

### **Ingreep 1: Foto's als protagonist**
- **Wat:** Foto's groter, meer impact in story sections
- **Waarom:** Dionne's werk IS het bewijs; nu zijn foto's illustratief
- **Hoe:** 60% foto, 40% tekst (omgedraaid van huig)
- **Voorbeeld:** Eventstyling sectie → grote foto van tafel-setup (80% breedte) + tekst ernaast

### **Ingreep 2: Werkwijze als visueel journey**
- **Wat:** Vier stappen (Vertellen → Meedenken → Concreet → Verzorgd) visueel als progressie
- **Waarom:** Nu zijn het vier losse labels; ze zouden het merknarratief zijn
- **Hoe:** Continuum met visual progression (sketch → detail → complete)
- **Animatie:** Stap-voor-stap reveal bij scroll

### **Ingreep 3: Eventstyling & Themaboxen visueel onderscheiden**
- **Wat:** Twee distinct visual languages
- **Waarom:** Nu voelen ze verwisselbaar
- **Hoe:**
  - **Eventstyling:** Organische layouts, fluïde waves, grote foto's, luxe-feel
  - **Themaboxen:** Grid-gebaseerd, structure, collection-view, accessible-feel

### **Ingreep 4: Dynamische interactie op cards**
- **Wat:** Portfolio/box cards met meer life bij hover
- **Waarom:** Statische cards voelen niet engaged
- **Hoe:** Hover → reveal beschrijving, details, kleur swatches
- **Niet te veel:** Subtiel, elegant, merkconform

### **Ingreep 5: Wave-symboliek versterken**
- **Wat:** Golf niet alleen technisch, maar emotioneel moment
- **Waarom:** Symboliseert "jij hoeft niet na te denken, wij nemen over"
- **Hoe:** Golfanimatie organisch, niet lineair; moment voelbaar
- **Optioneel:** Subtiel geluid-effect (test accessibility)

---

## TECHNISCHE ARCHITECTUUR

### Behouden
- ✓ Pure HTML5/CSS3 (geen framework upgrade)
- ✓ Single style.css + script.js
- ✓ Responsive mobile-first approach
- ✓ prefers-reduced-motion support
- ✓ Semantic HTML, accessibility good

### Verbeteringen
- [ ] CSS tokens exact merkhandboek-hexcodes
- [ ] Image optimization (WebP, lazy-loading)
- [ ] Remove noindex meta tags
- [ ] Add sitemap.xml
- [ ] Add robots.txt (eenvoudig)
- [ ] Add LocalBusiness schema markup
- [ ] Improve focus-states op interactive elements
- [ ] Test performance op slow 3G

### Niet toevoegen
- ✗ Geen framework (React, Vue, etc.)
- ✗ Geen externe dependencies (jQuery, etc.)
- ✗ Geen cookies/analytics tot explicit ToS
- ✗ Geen form submissions via POST (tenzij server-side setup)

---

## COMPONENTENPLAN

### Bestaande components (behouden & uitbreiden)
- Hero section (homepage + subpagina's)
- Story section (Eventstyling, Themaboxen met foto)
- Feature list (bullets als `<li class="feature-list__item">`)
- CTA button ("Vertel Dionne jouw idee")
- Wave transition (SVG divider)
- Process steps (4-stap werkwijze)
- Card grid (Themaboxen, Portfolio)

### Nieuwe components
- **Testimonial card** (foto + quote + naam)
- **FAQ accordion** (vraag/antwoord collapsible)
- **Portfolio case study** (foto gallery + beschrijving + CTA)
- **Price card** (voor prijsrange display)
- **Trust badges** (klantaantal, award, feature)

---

## DESIGNSYSTEEM

### Color Tokens (EXACT Merkhandboek)
```css
:root {
  --color-cream: #F7F1EA;        /* Primary background */
  --color-linen: #EEE6DE;         /* Secondary background */
  --color-dark-brown: #4A3329;    /* Text, dark elements */
  --color-walnut: #8C6B5A;        /* Accent warm */
  --color-old-pink: #C7A49A;      /* Accent soft */
  --color-copper: #A76F5B;        /* Accent warm-pink */
}
```

### Typography Tokens (Behouden)
```css
:root {
  --font-display: "Fraunces", Georgia, serif;   /* H1, H2 */
  --font-body: "Work Sans", -apple-system, sans-serif;  /* Body */
}
```

### Spacing Tokens
```css
:root {
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4.5rem;
  --space-7: 6rem;
  --space-8: 8rem;
}
```

---

## CONTENTPLAN

### Homepage
- [ ] Herstructureer hero + intro voor duidelijk merk-intro
- [ ] Voeg testimonial section toe (3-5 quotes)
- [ ] Voeg "Twee diensten" onderscheid duidelijk toe
- [ ] Update werkwijze naar visueel continuum
- [ ] Voeg social proof toe (numbers: feesten, klanten, etc.)

### Eventstyling pagina
- [ ] Voeg budget range toe ("Vanaf €500")
- [ ] Voeg partners list toe (florist, caterer, DJ, etc.)
- [ ] Voeg portfolio cases toe (3-5 minimum)
- [ ] Voeg pricing guide toe (ranges by scope)
- [ ] Voeg FAQ link toe

### Themaboxen pagina
- [ ] Voeg prijzen op overzicht toe (nu alleen in detail)
- [ ] Voeg beschikbaarheid toe
- [ ] Voeg shipping info toe
- [ ] Voeg testimonials per box toe
- [ ] Update kopij (vervang "worden samengesteld" met "compleet klaar")

### Themabox detail pagina
- [ ] Voeg 5-8 foto's van inhoud toe
- [ ] Voeg styling tips toe (hoe zet je het neer)
- [ ] Voeg damage policy details toe
- [ ] Voeg "ook populair" links naar andere boxes toe
- [ ] Voeg testimonials toe

### Over Dionne pagina
- [ ] Voeg 3-5 werkfoto's toe (Dionne in action)
- [ ] Voeg klantgetuigenissen toe (3-5)
- [ ] Voeg referenties/background toe (hoeveel jaren ervaring?)
- [ ] Voeg locatie toe (waar woont/werkt ze?)
- [ ] Voeg portfolio linkage toe

### Portfolio pagina (NIEUW)
- [ ] Per project: Hero foto + beschrijving + klant quote + "Zelf laten doen?" CTA
- [ ] Minimaal 3, ideaal 5-8 projecten
- [ ] Variatie in event types (bruiloft, verjaardag, bedrijf, etc.)
- [ ] Werkfoto's (setup in progress) + final results

### FAQ pagina (NIEUW)
- [ ] Eventstyling FAQ: budget, partners, timing, proces, beschikbaarheid
- [ ] Themaboxen FAQ: prijs, borg, beschadiging, verzending, levering
- [ ] Dionne FAQ: achtergrond, locatie, responstijd, booking

### Contact pagina (NIEUW - optioneel)
- [ ] WhatsApp link (met prefilled message template)
- [ ] Email option
- [ ] Responstijd expectation
- [ ] Wat Dionne in eerste contact vraagt

---

## SEO PLAN

### KRITIEK (nodig voor launch)
- [ ] **Remove noindex/nofollow** van alle pagina's
- [ ] **Create sitemap.xml** (7-8 pagina's)
- [ ] **Add robots.txt** (eenvoudig, geen disallow)
- [ ] **Fix page titles** (keyword-first, 50-60 char)
- [ ] **Fix meta descriptions** (120-150 char, CTA-driven)

### HOOG
- [ ] **LocalBusiness schema** (nome, address, phone, hours)
- [ ] **Breadcrumb schema** (hjälpa Google strukturera)
- [ ] **Product schema** (themaboxen met pricing)
- [ ] **Fix heading hierarchy** (H1 → H2 → H3, geen skips)
- [ ] **Improve internal linking** (context-rijke anker teksten)

### MEDIUM
- [ ] **Google Business Profile** (local presence)
- [ ] **Image optimization** (alt-text all, file sizes reduced)
- [ ] **FAQ schema** (Google kan highlight FAQ entries)
- [ ] **OpenGraph data** (social sharing, rij preview)

### Local SEO (LAAG nu, maar important later)
- [ ] Workspace area duidelijk (online? regio? NL-bred?)
- [ ] Local keywords (bijv. "eventstyling Amsterdam")
- [ ] Location page per regio (optioneel)
- [ ] GMB setup (Google My Business)

---

## PERFORMANCEPLAN

### Afbeeldingen
- [ ] Compress all images (WebP format)
- [ ] Lazy-loading implementeren waar passend
- [ ] Responsive srcset (1x, 2x, different sizes)
- [ ] Alt-text compleet en beschrijvend

### JavaScript
- [ ] Bestaande animations testen op slow 3G
- [ ] Intersection Observer al efficient (good)
- [ ] Remove unused CSS (minify style.css)
- [ ] Defer non-critical JS

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] Testen op DevTools throttling (slow 4G)

---

## TESTPLAN

### Functionality
- [ ] Alle links werken (200 responses)
- [ ] WhatsApp link werkt op mobile + desktop
- [ ] Hover states werken (desktop)
- [ ] Focus states zichtbaar (keyboard nav)
- [ ] Mobile menu toggle werkt

### Responsive
- [ ] 320px (mobile phone)
- [ ] 768px (tablet)
- [ ] 1280px (desktop)
- [ ] 1920px+ (large screen)
- [ ] Alle teksten leesbaar, geen overflow

### Accessibility
- [ ] Keyboard navigation compleet
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Color contrast WCAG AA (4.5:1 minimum)
- [ ] prefers-reduced-motion: animations disabled
- [ ] Focus visible: outline clear op all focusable elements

### Browser Compatibility
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Performance
- [ ] DevTools Lighthouse: > 90 (Performance, Accessibility)
- [ ] PageSpeed Insights: > 80 mobile & desktop
- [ ] WebPageTest: DOMContentLoaded < 2.5s

### SEO
- [ ] sitemap.xml: all 8+ pages listed
- [ ] robots.txt: Disallow nothing (allow all)
- [ ] noindex/nofollow: REMOVED
- [ ] meta descriptions: all pages
- [ ] heading hierarchy: valid H1-H3
- [ ] Internal links: contextual, descriptive

---

## ONTBREKENDE CONTENT & MEDIA

### Van Dionne nodig

**Foto's:**
- [ ] 3-5 werkfoto's van haar in action (tafel zetten, bloemen schikken, etc.)
- [ ] Portfolio: 3-5 echte projecten (foto's van setup, finale result)
- [ ] Themaboxen detail: 5-8 close-ups per box (items, details, styling)
- [ ] Testimonials: 3-5 klantfoto's (of video's)

**Content:**
- [ ] Klantgetuigenissen (1-2 zinnen per klant + naam)
- [ ] Budget range voor eventstyling (bijv. "€500-€3000")
- [ ] Partner list (florist, caterer, DJ, etc.)
- [ ] Background Dionne (jaren ervaring, opleiding)
- [ ] FAQ answers (8-10 vragen)

**Info:**
- [ ] KvK nummer
- [ ] Btw-id
- [ ] Werkgebied (Amsterdam? Online? NL-wijd?)
- [ ] Responstijd expectation (< 24 uur?)
- [ ] Beschikbaarheid (bookable months ahead?)

---

## RISICO'S

### Content risico's
- 🔴 **Geen portfolio beschikbaar:** Kan launch vertragen
- 🔴 **Geen klantgetuigenissen:** Vertrouwen onvoldoende
- 🟡 **Pricing sensitiviteit:** Dionne wil misschien niet transparent zijn
- 🟡 **Werkfoto's ontbreken:** Portfolio zonder achter-de-schermen voelt onvolledig

### Technische risico's
- 🟡 **Mobile animaties performance:** Test op slow devices
- 🟡 **Cross-browser compatibility:** Older browsers?
- 🟡 **Image file sizes:** Veel nieuwe foto's kunnen traag maken

### Business risico's
- 🔴 **Kleur-accuraatheid:** Merkimplementatie moet exact zijn
- 🟡 **SEO indexering:** Noindex removal moet direct
- 🟡 **Privacy/juridisch:** Onvolledig formulier op website

---

## PRIORITEIT UITVOERINGSFASEN

### **FASE 0: Blocker (deze week)**
- [ ] Remove noindex/nofollow
- [ ] Voeg site-uri aan search console
- [ ] Complete privacyverklaring (KvK, Btw-id)

### **FASE 1: MVP (week 1-2)**
- [ ] Portfolio pagina (3-5 cases)
- [ ] Werkfoto's Dionne (3-5)
- [ ] Klantgetuigenissen (3-5 testimonials)
- [ ] Budget indicatie eventstyling
- [ ] FAQ pagina (core Q&A)
- [ ] Homepage onderscheid Eventstyling vs Themaboxen duidelijker

### **FASE 2: Polish (week 2-3)**
- [ ] Creatieve ingrepen implementeren (foto's als protagonist, werkwijze journey)
- [ ] Themabox detail: inhoud foto's + styling tips
- [ ] Eventstyling: partner info + pricing guide
- [ ] Contact pagina (optioneel)
- [ ] Local schema markup toevoegen

### **FASE 3: Optimization (week 3-4)**
- [ ] SEO optimization (page titles, meta, schema)
- [ ] Image optimization (WebP, responsive srcset)
- [ ] Performance testing (Lighthouse, PageSpeed)
- [ ] Accessibility audit (WCAG AA)
- [ ] Browser testing (cross-browser)

### **FASE 4: QA & Launch (week 4)**
- [ ] Full functional testing
- [ ] Content proofread
- [ ] Quality auditor final check
- [ ] Deployment security review
- [ ] Live!

---

## ACCEPTATIECRITERIA

Website is gereed voor publicatie wanneer:

1. ✓ **Noindex verwijderd** — Google kan indexeren
2. ✓ **Portfolio aanwezig** — Minimaal 3 echte cases
3. ✓ **Klantgetuigenissen zichtbaar** — Minimaal 3 testimonials
4. ✓ **Pricing duidelijk** — Budget range eventstyling + themaboxen prijzen
5. ✓ **Werkfoto's Dionne** — Minimaal 3 work shots
6. ✓ **FAQ compleet** — Core vragen beantwoord
7. ✓ **Privacyverklaring compleet** — KvK, Btw, contact info
8. ✓ **Mobile test** — Werkt perfect op 320px, 768px, 1280px
9. ✓ **Accessibility** — WCAG AA, keyboard nav werkt
10. ✓ **Performance** — Lighthouse > 90, LCP < 2.5s
11. ✓ **SEO basics** — Sitemap, robots.txt, schema markup
12. ✓ **Content proofd** — Geen typo's, tone correct
13. ✓ **Quality audit passed** — Auditor geeft go-ahead

---

## BESTANDEN DIE WAARSCHIJNLIJK WORDEN AANGEPAST

### HTML
- [ ] index.html (homepage restructure)
- [ ] eventstyling.html (add budget, partners, portfolio)
- [ ] themaboxen.html (add prices, testimonials)
- [ ] box-*.html (add images, styling tips)
- [ ] over_dionne.html (add work photos, testimonials)
- [ ] privacyverklaring.html (complete info)

### CSS
- [ ] style.css (color tokens exact, new components)

### Nieuwe bestanden
- [ ] portfolio.html (NIEUW)
- [ ] faq.html (NIEUW)
- [ ] contact.html (NIEUW - optioneel)
- [ ] sitemap.xml (NIEUW)
- [ ] robots.txt (NIEUW)

### Afbeeldingen
- [ ] 15-25 nieuwe foto's (portfolio, work shots, testimonials, box details)

---

## ONDERDELEN DIE NIET WORDEN GEWIJZIGD

- ✓ Framework (blijft pure HTML/CSS)
- ✓ Merkhandboek (niet wijzigen, alleen implementeren)
- ✓ Kernboodschappen (hero, werkwijze, CTA)
- ✓ Header design (logo only, geen menu)
- ✓ Wave animations (behouden, subtiel)
- ✓ Typografie (Fraunces/Work Sans)

---

## ONDERDELEN WAARVOOR EXPLICIETE TOESTEMMING NODIG IS

1. **Publicatie naar productie** — geen deployment zonder expliciete go-ahead
2. **DNS wijzigingen** — wanneer migreren naar live domein
3. **Analytics activeren** — cookie consent nodig
4. **Portfolio foto's publiceren** — klantgoedkeuring vereist
5. **Testimonialsusing foto's** — klanttoestemming vereist
6. **Werkfoto's van Dionne** — Dionne's expliciete toestemming
7. **Pricing publiceren** — Dionne's business approval

---

## VOLGENDE STAP

Dit document dient ter goedkeuring voorgesteld aan Dionne. Zodra akkoord:

1. **Week 1:** Gather content (foto's, testimonials, copy)
2. **Week 2:** Implement FASE 0-1 (blockers + MVP)
3. **Week 3:** Implement FASE 2 (polish)
4. **Week 4:** FASE 3-4 (optimization + launch)

**Geschatte workload:** 40-60 uur frontend development + content gathering

---

**Opgesteld door:** Theme Your Dream Digitaal Projectteam  
**Agenten:** Website Architect, Brandbewaker, Frontend Architect, Creative Developer, SEO Strategist  
**Versie:** 1.0 Concept