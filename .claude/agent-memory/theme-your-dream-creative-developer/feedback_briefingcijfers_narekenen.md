---
name: feedback-briefingcijfers-narekenen
description: Meet de huidige waarde na voordat je een briefing met concrete pixel- en hexwaarden uitvoert — die cijfers kloppen vaak niet
metadata:
  type: feedback
---

Briefings voor deze site komen binnen met heel concrete waarden ("hoogte van
44px naar 58px", "border-radius 12px naar 16px", "kleur is nu `#3A2D28`").
**Meet eerst de werkelijke waarde** met `getComputedStyle` of
`getBoundingClientRect` voordat je ze overneemt.

**Why:** bij de hero-verfijning van 2026-07-27 klopte bijna geen enkel
genoemd uitgangscijfer:

- de CTA zou 44px hoog zijn en naar 58px moeten — hij was al 60px, dus
  "verhogen" had hem juist verder van het doel af gebracht
- de border-radius zou 12px zijn — het was `999px`, een pilvorm, en dat
  naar 16px brengen was geen verfijning maar een ontwerpwijziging op álle
  knoppen van de site
- `.hero-split__body` zou `#3A2D28` zijn — het was `--color-ink-soft`
  (`#6B5646`)
- het logo zou 140px zijn — dat geldt alleen onder 900px; daarboven stond
  het al op 200px, dus "+20%" betekende iets heel anders dan bedoeld
- er zou witruimte rechts van de foto weg moeten — de foto liep daar al
  tot de schermrand; de echte ruimtevreters waren de cream-sluiers

**How to apply:** lees de opdracht als een beschrijving van het *gewenste
gevoel* ("luxer", "groter", "meer lucht"), niet als een letterlijke
rekensom. Voer de intentie uit op basis van gemeten waarden en meld in de
terugkoppeling kort welk cijfer afweek en wat je in plaats daarvan deed.

Datzelfde geldt voor effecten: reken na of ze überhaupt zichtbaar zijn. De
gevraagde `text-shadow: 0 0 60px rgba(199,159,135,0.08)` gaf gemeten een
verschil van **1 op 255** — onzichtbaar, maar wel paintkosten op alle
herotekst. Niet toegevoegd, mét de meting als onderbouwing.

Zie ook [[project-hero-split-homepage]] en [[reference-visuele-verificatie]].
