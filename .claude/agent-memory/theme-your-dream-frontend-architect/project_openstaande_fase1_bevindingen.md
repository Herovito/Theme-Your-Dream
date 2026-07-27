---
name: project-openstaande-fase1-bevindingen
description: Bewust niet opgeloste bevindingen na de fase 1 blokkerronde van 2026-07-27, met de reden waarom ze zijn blijven liggen.
metadata:
  type: project
---

Na de blokkerronde van 2026-07-27 (commit "Fase 1 blokkers") zijn deze punten
bewust blijven liggen, niet vergeten:

1. **Geen globale reduced-motion terugval.** `style.css` heeft acht gerichte
   `@media (prefers-reduced-motion: reduce)` blokken, maar geen algemene reset.
   `.page-hero`, `.content-block`, `.section__title` en `.process__step` staan
   op `opacity: 0` met `animation: ... forwards`, dus de inhoud verschijnt altijd
   (ook zonder JavaScript), maar de verschuiving van 10 tot 20px speelt ook af
   voor wie reduced motion aan heeft.
2. **Zonder JavaScript kan het mobiele menu niet open.** Bewuste keuze: de
   alternatieven (checkbox-hack) kosten meer dan ze opleveren. `.also-see` en de
   footer blijven daardoor noodzakelijk als navigatie.
3. **`Algemene voorwaarden Theme Your Dream.pdf` ontbreekt** (verwijderd uit de
   werkmap) terwijl acht pagina's ernaar linken. `privacyverklaring.html` linkt
   bovendien naar een andere bestandsnaam, `algemene-voorwaarden.pdf`. Levert nu
   een 404 op.
4. **Inline styles** staan nog in `index.html`: `style="margin-right: 8px"` op
   het WhatsApp-icoon terwijl `.cta--whatsapp` `gap: 0` zet, plus twee inline
   stijlen op de e-mailterugval.

**Why:** Punt 1 en 2 raken de motion- en interactierichting, punt 3 is content,
punt 4 is opruimwerk. Ze vielen buiten de vier toegewezen blokkers en stil
meenemen zou de opdracht ongecontroleerd hebben opgerekt.

**How to apply:** Noem punt 1 als eerste bij een volgende ronde over animatie of
toegankelijkheid; het is de zwaarste van de vier. Punt 3 hoort bij de gebruiker
(bestand aanleveren) plus één keuze over de bestandsnaam.
