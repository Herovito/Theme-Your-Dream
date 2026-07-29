---
name: project-parallelle-sessies
description: Storm werkt soms met meerdere Claude-sessies tegelijk in deze repo, waardoor onafgeronde wijzigingen in een commit van een andere sessie belanden
metadata:
  type: project
---

In deze repo lopen soms twee Claude-sessies naast elkaar. Op 2026-07-30 werden vier tekstupdates aan `over_dionne.html` en `eventstyling.html` (hero-titel, stijllijst, werkwijze-fasen, tafelstyling) opgeslokt door commit `5af1c95` van een parallelle sessie, met een commitbericht dat alleen over hero-tekst, walnut-secties en het logo ging. De wijzigingen waren daarna al gepusht.

**Why:** De werkdirectory is gedeeld. Een andere sessie die `git add -A` gebruikt, commit ook alles wat ik nog niet had vastgelegd. Historie herschrijven is dan geen optie meer omdat de commit al op de remote staat.

**How to apply:** Controleer `git status` en `git log` direct voordat je commit, niet alleen aan het begin van de sessie. Commit tekst- en merkwijzigingen zo snel mogelijk na het maken, in een eigen commit, zodat ze traceerbaar blijven. Merk het op in je eindantwoord wanneer werk in een vreemde commit terecht is gekomen, in plaats van historie te herschrijven. Zie ook [[user-rol]].
