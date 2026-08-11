---
name: project-mojibake-html-bestanden
description: De HTML-bestanden bevatten letterlijk opgeslagen mojibake (â‚¬ voor €, â†’ voor →), waardoor Edit-matches op die tekens mislukken
metadata:
  type: project
---

Meerdere HTML-bestanden bevatten mojibake die letterlijk als tekens in het bestand staat, niet als weergavefout: `â‚¬` in plaats van `€`, `â†’` in plaats van `→`, en losse controlebytes achter em-dashes (bijvoorbeeld `—` gevolgd door U+009D in `styling-boxes.html`). De `<meta charset="UTF-8">` klopt wel; de tekens zijn ooit dubbel geëncodeerd opgeslagen.

**Why:** Bij de prijsupdate van 2026-08-11 bleek de euro op alle vier boxpagina's als `â‚¬85` op het scherm te staan. Dat is bij die commit rechtgezet naar echte `€`. De pijlen in HTML-commentaren zijn blijven staan, want die zijn onzichtbaar voor bezoekers.

**How to apply:** Zichtbare mojibake altijd meteen herstellen naar het juiste teken. Loopt een Edit stuk op een regel met een em-dash of pijl, controleer dan eerst de ruwe bytes (`sed -n 'Np' bestand | cat -A`) en anker de match op een regel zonder speciale tekens. Grep op `â‚¬` na tekstwerk om te controleren dat er geen nieuwe zichtbare mojibake bij is gekomen.
