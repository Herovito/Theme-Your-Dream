---
name: project-concept-site-review-2026-07
description: Concept-site draait op localhost:3456; het palet is per 2026-07-27 teruggezet naar het merkhandboek, met twee bewust verdiepte tekstvarianten.
metadata:
  type: project
---

De concept-site wordt bekeken op `http://localhost:3456` (`npm start` draait
`npx http-server .`). Er is geen buildstap voor de pagina's; `build-robots-meta.js`
herschrijft alleen de `<meta name="robots">` tag bij de Vercel-build.

Op 2026-07-27 is de paletafwijking opgelost: `:root` bevat nu uitsluitend de
zes merkhandboekkleuren als hexwaarde, plus twee bewust toegevoegde verdiepte
varianten:

- `--color-walnut-deep: #6B5646` en `--color-copper-deep: #7A5240`
- Reden: walnut haalt 4.29:1 en copper 3.69:1 op cream, terwijl WCAG AA 4.5:1
  eist. De verdiepte varianten zijn alleen voor tekst, links en knoppen; voor
  vlakken en randen blijven de handboekkleuren zelf in gebruik.
- Deze twee varianten zijn nog **niet** door de brandbewaker goedgekeurd.

**Why:** Eerder stonden er contrastclaims in het CSS-commentaar die niet klopten
omdat ze tegen de verkeerde achtergrond waren gemeten. De ratio's in de
commentaren zijn nu gemeten tegen de werkelijke achtergrond (cream, linen,
old pink).

**How to apply:** Vertrouw de tokens, niet losse hexwaarden; die staan nergens
anders meer in `style.css`. Twee gevolgen om te onthouden:

1. Linen `#EEE6DE` en cream `#F7F1EA` verschillen maar 1.10:1. De golven tussen
   de secties op de homepage lezen daardoor als een vlakke overgang in plaats
   van een golf. Alleen de overgang naar old pink is duidelijk zichtbaar. Dit
   is een gevolg van het handboek, geen fout; een oplossing hoort bij de
   creative developer of de brandbewaker te liggen.
2. Op old pink haalt alleen dark brown AA. `.story-section--rose` verdiept
   daarom lokaal de tokens (`--color-ink-soft`, `--color-button`) in plaats van
   elk element apart te overschrijven. Gebruik dat patroon opnieuw bij nieuwe
   donkere vlakken.

Gerelateerd: [[project-nav-vs-claudemd-conflict]], [[project-openstaande-fase1-bevindingen]].
