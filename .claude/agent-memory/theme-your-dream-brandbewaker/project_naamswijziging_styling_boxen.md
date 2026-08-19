---
name: project-naamswijziging-styling-boxen
description: Op 2026-08-11 zijn themaboxen hernoemd naar styling boxen en de vier boxen naar Bordeaux Date, Blush Bloom, Beige Bliss en Blue Breeze; drie merkpunten staan hierdoor open
metadata:
  type: project
---

Op 2026-08-11 is op branch `concept-site` de volledige site omgezet (commit `ec9833c`): `themaboxen` werd `styling boxen`, `themabox` werd `styling box`, en de vier boxen kregen nieuwe namen (Time to Celebrate → Bordeaux Date, It's Your Day → Blush Bloom, Warm & Cosy → Beige Bliss, Natural → Blue Breeze). Paginabestanden heten nu `styling-boxes.html` en `box-<naam>.html`.

**Why:** Opdracht van de gebruiker; de bestandshernoemingen stonden bij aanvang al gestaged, dus het besluit was buiten deze sessie al genomen.

Drie punten zijn hierbij niet opgelost en staan nog open:

1. **Boxinhoud past niet meer bij de nieuwe naam.** Blue Breeze beschreef saliegroen, rookgrijs en pampagras; Bordeaux Date naturel linnen en goudkleurig, geen bordeaux. Op 2026-08-11 is de inhoudslijst van Blue Breeze omgezet naar blauw (commit `e824f15`: rookblauw, zacht blauw, blauw glas, blauwe droogbloemen). De tekst klopt nu, maar de foto niet: `Themabox 2.png` toont saliegroen linnen, groen glas en een kaart met de letterlijke tekst "NATURAL". Ook de hero-lead ("zachte groentinten"), de meta description, de alt-tekst op de boxpagina en de alt-tekst op de kaart in `styling-boxes.html` spreken nog van groen en natuurlijke materialen. Bordeaux Date is inhoudelijk nog onaangeroerd. Zie [[project-boxpaginas-vereenvoudigd]].
2. **Blauw staat niet in het merkpalet** (Cream, Linen, Dark brown, Walnut, Old pink, Copper). "Blue Breeze" introduceert een kleurbelofte die het palet niet kan waarmaken.
3. **Anglicismen in Nederlandse lopende tekst.** Het handboek vraagt natuurlijk Nederlands; "styling boxen" en vier Engelse boxnamen zijn een verschuiving in tone of voice.

**How to apply:** Gebruik in lopende tekst "styling boxen" en "styling box" zonder koppelteken (CLAUDE.md verbiedt koppeltekens in lopende tekst). Gebruik `styling-boxes` alleen in technische identifiers: bestandsnamen, `href`, canonical/og-URL's en het dropdown-id `nav-styling-boxes`. Raak de fotobestandsnamen (`Themabox.png`, `Themabox 2.png` en verder) niet aan, die staan zo op schijf. Breng punt 1 en 2 ter sprake voordat je nieuwe copy of foto's voor deze boxen maakt. Zie ook [[project-open-merkbeslissingen]].
