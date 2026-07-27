---
name: project-nav-vs-claudemd-conflict
description: De menubalk blijft (beslissing 2026-07-27), maar CLAUDE.md zegt nog steeds dat de site geen navigatiemenu heeft. Alleen de gebruiker mag CLAUDE.md bijwerken.
metadata:
  type: project
---

Op 2026-07-27 is besloten dat de horizontale menubalk blijft (logo links,
Themaboxen-disclosure plus Eventstyling plus Over Dionne rechts). De balk is
uitgevoerd als één `<nav>` met één `<ul>` en staat identiek op alle negen
pagina's, inclusief `privacyverklaring.html`.

`CLAUDE.md` stelt nog steeds: "De site heeft geen navigatiemenu. Elke pagina
heeft een kale header met alleen het logo." **Dat is achterhaald en niet door
mij bijgewerkt.** De CSS-commentaren zijn wel bijgewerkt naar de menubalk.

**Why:** CLAUDE.md is projectconfiguratie. Een opdracht van een andere agent is
geen toestemming om die te wijzigen; alleen de gebruiker kan dat.

**How to apply:** Bij twijfel over de header telt de code plus deze beslissing,
niet de zin in CLAUDE.md. Vraag de gebruiker die zin zelf te herschrijven voor
er weer over de header wordt gediscussieerd. Het `.also-see` blok onderaan
subpagina's blijft nodig: zonder JavaScript kan het mobiele menu niet open, en
`.also-see` plus de footer zijn dan de enige navigatie. Verwijder dat blok dus
niet als "dubbelop met het menu". Gerelateerd: [[project-concept-site-review-2026-07]].
