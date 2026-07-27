---
name: project-open-merkbeslissingen
description: Drie onopgeloste punten op de concept-site branch (navigatiemenu vs CLAUDE.md, kleurpalet-drift, knoptekst met via WhatsApp) die een expliciet besluit van Dionne nodig hebben
metadata:
  type: project
---

Op branch `concept-site` staan keuzes die aantoonbaar afwijken van het merkhandboek en CLAUDE.md, en die nog niet besloten zijn. Alle zijn tijdens het werk van 2026-07-27 gesignaleerd en aan de gebruiker voorgelegd.

**1. Navigatiemenu.** CLAUDE.md zegt: "De site heeft geen navigatiemenu. Elke pagina heeft een kale header met alleen het logo." In de code staat wel een menubalk (Themaboxen met dropdown, Eventstyling, Over Dionne), bewust toegevoegd in commits rond 2026-07-26.

**Why:** Het menu is er met opzet gekomen (meerdere commits achter elkaar over de menubalk), dus dit is geen ongelukje maar een richtingswijziging die alleen nog niet in CLAUDE.md is doorgevoerd. Het handboek zelf verbiedt een menu niet, het noemt donkerbruin juist voor "tekst, navigatie". De strengere regel staat in CLAUDE.md.

**2. Kleurpalet-drift.** De basisachtergronden in style.css zijn niet de handboekkleuren: `#EDE1D2` staat waar Cream `#F7F1EA` hoort en `#E2CDBA` waar Linen `#EEE6DE` hoort. Copper `#A76F5B` komt niet voor. Er is een zevende kleur `--color-sage: #8C9275` toegevoegd.

**Why:** De contrastannotaties in de CSS-commentaren (4.66, 4.37, 4.95) kloppen exact bij de officiële Cream #F7F1EA, niet bij de huidige achtergrond. De stylesheet is dus oorspronkelijk op het merkpalet gebouwd en de achtergrond is later donkerder gemaakt zonder de rest bij te werken. Een stille groentint is wél toegestaan door het handboek (pagina 50, "secundair accent: stille groentint"), maar zonder vastgelegde hex.

**3. Knoptekst met kanaalsuffix.** CLAUDE.md zegt: "De contactknop heet altijd: Vertel Dionne jouw idee". Op de site staat overal de langere variant "Vertel Dionne jouw idee via WhatsApp". Bij FASE 3 (2026-07-27) zijn de vijf afwijkende boxknoppen ("Reserveer jouw themabox via WhatsApp") naar diezelfde langere variant gebracht, omdat uniformiteit met de bestaande vier pagina's het doel van de opdracht was.

**Why:** De letterlijke CLAUDE.md-tekst volgen zou vijf knoppen hebben opgeleverd die van de andere vier verschillen. De kern van de naam blijft intact en het suffix benoemt alleen het kanaal, wat aansluit bij "persoonlijke route naar WhatsApp" uit het handboek.

**How to apply:** Behandel "Vertel Dionne jouw idee via WhatsApp" als de huidige sitebrede standaard, maar als Dionne de letterlijke korte vorm wil, wijzig dan alle acht knoppen tegelijk en werk CLAUDE.md niet stilzwijgend bij.

**How to apply (punt 1 en 2):** Voer geen van beide afwijkingen stilzwijgend verder door en herstel ze ook niet eigenhandig. Vraag bij werk aan header/navigatie of aan kleuren eerst of het besluit al gevallen is. Wordt het menu behouden, dan moet CLAUDE.md met expliciete toestemming worden bijgewerkt. Zie ook [[reference-lokale-review-setup]].
