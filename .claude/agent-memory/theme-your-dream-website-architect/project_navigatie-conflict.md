---
name: navigatie-conflict
description: Open beslissing — CLAUDE.md schrijft een site zonder navigatiemenu voor, maar de gebouwde site heeft een dropdownmenu. Niet opgelost per 2026-07-27.
metadata:
  type: project
---

CLAUDE.md bevat de regel "De site heeft geen navigatiemenu. Elke pagina heeft een kale header met alleen het logo." De gebouwde site (branch `concept-site`) heeft wel een menu: Themaboxen-dropdown links, Eventstyling centraal, Over Dionne rechts, plus een mobiele hamburger. Daarnaast bestaat het `also-see`-blok onderaan subpagina's nog, waarvan de CSS-comment zegt dat het "een klassiek menu op de subpagina's vervangt". De site heeft dus twee navigatiesystemen naast elkaar.

**Why:** De gebruiker heeft dit conflict per 2026-07-27 nog niet expliciet beslecht. Het merkhandboek zelf verbiedt een menu niet, het eist alleen rust en dat de klant nooit onnodig hoeft te zoeken. Beide oplossingen kunnen merkconform zijn, maar niet tegelijk.

**How to apply:** Ga bij navigatievoorstellen niet uit van "geen menu" als vaststaand feit en verwijder het menu ook niet eigenhandig omdat CLAUDE.md dat zegt. Leg de keuze eerst aan de gebruiker voor: menu behouden en `also-see` schrappen, of menu schrappen en `also-see` als enige route uitbouwen. Zodra de keuze is gemaakt, moet CLAUDE.md of de implementatie worden bijgetrokken zodat de regel en de code weer overeenkomen.
