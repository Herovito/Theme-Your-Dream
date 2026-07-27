---
name: project-animatielaag-dode-code
description: De scroll-reveal- en zoomeffecten in script.js zijn gemeten no-ops; controleer altijd of een effect echt afgaat voordat je erop voortbouwt
metadata:
  type: project
---

Gemeten op 2026-07-27 met CDP (zie [[reference-visuele-verificatie]]): een groot
deel van de "animatielaag" van deze site doet feitelijk niets.

- **Scroll reveals zijn geen scroll reveals.** `.section__title`,
  `.content-block` en `.process__step` dragen `opacity: 0` plus
  `animation: ... forwards` in hun *basisregel*. Die animatie speelt af bij het
  laden van de pagina, niet bij het in beeld komen. Gemeten stond een
  `.section__title` op 6,34 viewports onder de vouw al op `opacity: 1` met
  `reveal-in=false`. `initScrollReveals()` voegt de klasse pas veel later toe en
  zet dan alleen nog een `animation-delay` op een animatie die al klaar is.
- **`initBoxZoomScroll()` is dode code door specificiteit.**
  `img.lazy-load-fade.loaded` (0,2,1) wint op de `animation`-eigenschap van
  `.mood-card__img.zoom-in-view` (0,2,0). `getAnimations()` geeft alleen
  `image-fade-in`; de transform blijft `none`.
- **`.js` staat alleen op index.html.** De inline `classList.add('js')` ontbreekt
  op de acht andere pagina's. Wil je een starttoestand achter `.js` zetten, dan
  moet dat scriptje eerst overal in de `<head>`.

**Why:** hierdoor lijkt de site meer beweging te hebben dan hij heeft, en een
opdracht als "maak de animaties subtieler" zou op niet-werkende code worden
uitgevoerd.

**How to apply:** meet met `getAnimations()` en `getComputedStyle().opacity`
*voordat* je een bestaand effect verfijnt of als referentie gebruikt. Let bij
deze codebase specifiek op animatie-specificiteitsconflicten met de
`lazy-load-fade`-regels bovenin style.css.

Sluit aan bij [[feedback-briefingcijfers-narekenen]]: niet alleen genoemde
cijfers kloppen vaak niet, ook aangenomen gedrag niet.
