---
name: project-hero-split-homepage
description: De homepage-hero is een split layout met .js-gescopete overlay-header; opdrachten kunnen kleuren buiten het merkpalet vragen
metadata:
  type: project
---

De homepage heeft sinds 2026-07-27 een split hero (`.hero-split`): tekst links,
foto rechts, gestapeld onder 48rem. De headerbalk ligt daar doorzichtig
overheen en vult zich bij scrollen.

**Why:** de hero moest premium en onderscheidend worden zonder het rustige,
verzorgde karakter van het merk op te geven. De foto lost links op in de
paginakleur omdat dat de merkzin visueel maakt: van een vaag idee naar een
feest dat af is.

**How to apply:**

- De overlay-header is gescopet op `.js .hero-overlay` (klasse `js` wordt door
  een inline script in de `<head>` gezet, `hero-overlay` staat op `<body>` van
  alleen index.html). Zonder JavaScript valt de hele overlay weg en blijft de
  gewone gevulde balk staan — haal die scoping er niet uit, anders wordt het
  menu onleesbaar over gescrolde inhoud.
- Subpagina's gebruiken nog steeds `.page-hero`; die is bewust ongemoeid.

## Opdrachten kunnen kleuren buiten het merkpalet noemen

De briefing voor deze hero vroeg om `#F8F4EE`, `#3A2D28`, `#C79F87` en
`#B5896F`. Geen daarvan staat in het merkhandboek, en `#C79F87` haalt als
knopvlak met cream tekst maar 2.1:1 — ruim onder WCAG AA. Er is bewust
vastgehouden aan de bestaande tokens.

**Why:** het merkhandboek gaat vóór de concrete opdracht, en style.css
documenteert al waarom walnut en copper verdiepte tekstvarianten hebben.

**How to apply:** krijg je opnieuw hexwaarden aangeleverd, toets ze dan eerst
aan het palet in CLAUDE.md en reken het contrast na voordat je ze overneemt.
Meld de afwijking expliciet in de terugkoppeling. Dit is nog niet door de
gebruiker bevestigd — vraag bij twijfel of de afwijking akkoord is.

## De randen van de foto zijn gemaskeerd, niet overgoten

Sinds de verfijning van 2026-07-27 lost de foto op met `mask-image` op
`.hero-split__image` in plaats van met een dekkend cream verloop in het
`::after`. Het `::after` houdt alleen nog de sluier bovenlangs, die de
menutekst leesbaar moet houden.

**Why:** `.page` legt een radiale walnoot-waas over de linkerbovenhoek. Een
dekkend cream verloop erbovenop was dáár lichter dan de pagina ernaast
(gemeten 247,241,233 tegen 244,237,230), wat een zichtbare verticale naad
langs de kolomrand gaf. Met een masker verdwijnt de foto in plaats van dat er
kleur overheen komt, dus loopt de pagina-achtergrond er ononderbroken achter
door en kán er geen naad ontstaan.

**How to apply:** ga je iets aan die overgang veranderen, gebruik dan geen
dekkende kleur meer. Het `@supports (mask-image: ...)`-blok houdt het oude
verloop als vangnet; laat dat staan. Verlaag de sluier bovenlangs niet verder:
het slechtste contrast van de menutekst op de foto is nu 5,66:1 op 1920px, en
4,5:1 is de ondergrens.

De parallax op `.hero-split__img` gebruikt de losse `translate`-eigenschap,
niet `transform` — de foto heeft al een `transform`-animatie bij het laden en
die twee zouden elkaar overschrijven. De foto is aan de bovenkant 24px groter
dan zijn kader zodat de verschuiving nooit een rand vrijlegt.

## Openstaand aandachtspunt

`Foto hero.png` is 2,3 MB PNG en is het LCP-beeld. Er staat geen
beeldgereedschap (sharp, ImageMagick, cwebp) in de omgeving, dus comprimeren
moet buiten de agent gebeuren.

Zie ook [[reference-visuele-verificatie]].
