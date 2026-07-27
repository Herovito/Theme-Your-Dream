---
name: feedback-auditcijfers-narekenen
description: Meet bevindingen uit audit- of coordinatoropdrachten zelf na voor je ze oplost; in fase 2 waren drie van de vier claims achterhaald.
metadata:
  type: feedback
---

Controleer cijfers en codeclaims uit een opdracht altijd eerst tegen de huidige
code, en meld het verschil in plaats van de opdracht letterlijk uit te voeren.

**Why:** Bij de fase 2 opdracht van 2026-07-27 klopten drie van de vier
technische claims niet meer, omdat fase 1 de code al had veranderd:

- "header 267px op mobiel" was in werkelijkheid 123px (gemeten, alle breedtes).
  Het gestelde doel van circa 130px was dus al gehaald voor ik begon.
- "`.nav-link:focus { outline: none }`" bestond niet meer; `.nav-link` en
  `.nav-dropdown__item` hadden al `:focus-visible` met een zichtbare ring. Het
  enige echte geval was `.form-input:focus`.
- "trim de `--space-5` gaps op `.site-nav__list`" sloeg nergens op: die lijst
  staat onder 900px op `gap: 0`.

Blind uitvoeren had hier tot zinloze of schadelijke wijzigingen geleid.

Los daarvan meldde de coordinator halverwege dat WebP-conversie "niet mogelijk
is zonder externe tools". Dat was ook onjuist, zie [[reference-beeldconversie]].
Een onjuiste premisse van de coordinator is geen reden om een taak te laten
vallen; benoem hem en laat de gebruiker kiezen.

Bij de fase 5 opdracht van 2026-07-27 gebeurde hetzelfde, nu met claims over
dode code. Twee van de "verwijder dit" punten waren onjuist:

- "`initBoxZoomScroll()` is dood want eventstyling en themaboxen laden script.js
  niet." Alle negen pagina's laden script.js. Beide pagina's hebben vier
  `.mood-card--photo`, de regel `.mood-card__img.zoom-in-view` bestaat, en
  gemeten kregen 4 van 4 kaarten de klasse. Blind verwijderen had een werkend
  creatief effect gesloopt.
- "`.section--cta` is gelijk aan `.section--cta-padded`." Niet waar: hij mist de
  padding en wordt gebruikt in `over_dionne.html`.

Wat wel klopte was vaak om een andere reden dan opgegeven. `initProcessAnimation()`
was inderdaad weg te halen, maar niet omdat het niets vond: het vond wel degelijk
`.process__step`, alleen bestaat de klasse `.step-reveal` die het toevoegde
nergens als CSS-regel, en de animatie draait al vanuit de basisregel.

Standaardcontrole bij iedere "dit is dode code" claim: grep de klasse in `*.html`
met aanhalingstekens eromheen (anders matcht `brand` ook `branded`), controleer
welke pagina's het script laden, en controleer of de klasse die JS toevoegt
werkelijk een CSS-regel heeft. Zeg per punt of het klopte.

**How to apply:** Meet eerst met de headless Chrome-opzet uit
[[reference-headless-controle]], grep de genoemde selectors, en zet het gemeten
getal naast het geclaimde getal in de terugkoppeling en de commitboodschap. Als
een doel al gehaald blijkt, zeg dat en beperk je tot de werkelijk resterende
winst, in plaats van iets te verzinnen om de taak "gedaan" te laten lijken.
