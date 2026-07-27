---
name: project-open-merkbeslissingen
description: Twee onopgeloste conflicten op de concept-site branch (navigatiemenu vs CLAUDE.md, en kleurpalet-drift) die een expliciet besluit van Dionne nodig hebben
metadata:
  type: project
---

Op branch `concept-site` staan twee keuzes die aantoonbaar afwijken van het merkhandboek en CLAUDE.md, en die nog niet besloten zijn. Beide zijn tijdens de merkreview van 2026-07-27 gesignaleerd en aan de gebruiker voorgelegd.

**1. Navigatiemenu.** CLAUDE.md zegt: "De site heeft geen navigatiemenu. Elke pagina heeft een kale header met alleen het logo." In de code staat wel een menubalk (Themaboxen met dropdown, Eventstyling, Over Dionne), bewust toegevoegd in commits rond 2026-07-26.

**Why:** Het menu is er met opzet gekomen (meerdere commits achter elkaar over de menubalk), dus dit is geen ongelukje maar een richtingswijziging die alleen nog niet in CLAUDE.md is doorgevoerd. Het handboek zelf verbiedt een menu niet, het noemt donkerbruin juist voor "tekst, navigatie". De strengere regel staat in CLAUDE.md.

**2. Kleurpalet-drift.** De basisachtergronden in style.css zijn niet de handboekkleuren: `#EDE1D2` staat waar Cream `#F7F1EA` hoort en `#E2CDBA` waar Linen `#EEE6DE` hoort. Copper `#A76F5B` komt niet voor. Er is een zevende kleur `--color-sage: #8C9275` toegevoegd.

**Why:** De contrastannotaties in de CSS-commentaren (4.66, 4.37, 4.95) kloppen exact bij de officiële Cream #F7F1EA, niet bij de huidige achtergrond. De stylesheet is dus oorspronkelijk op het merkpalet gebouwd en de achtergrond is later donkerder gemaakt zonder de rest bij te werken. Een stille groentint is wél toegestaan door het handboek (pagina 50, "secundair accent: stille groentint"), maar zonder vastgelegde hex.

**How to apply:** Voer geen van beide afwijkingen stilzwijgend verder door en herstel ze ook niet eigenhandig. Vraag bij werk aan header/navigatie of aan kleuren eerst of het besluit al gevallen is. Wordt het menu behouden, dan moet CLAUDE.md met expliciete toestemming worden bijgewerkt. Zie ook [[reference-lokale-review-setup]].
