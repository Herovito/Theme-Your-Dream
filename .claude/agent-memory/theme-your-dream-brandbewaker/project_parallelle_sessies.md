---
name: project-parallelle-sessies
description: Storm werkt soms met meerdere Claude-sessies tegelijk in deze repo, waardoor onafgeronde wijzigingen in een commit van een andere sessie belanden
metadata:
  type: project
---

In deze repo lopen soms twee Claude-sessies naast elkaar. Op 2026-07-30 werden vier tekstupdates aan `over_dionne.html` en `eventstyling.html` (hero-titel, stijllijst, werkwijze-fasen, tafelstyling) opgeslokt door commit `5af1c95` van een parallelle sessie, met een commitbericht dat alleen over hero-tekst, walnut-secties en het logo ging. De wijzigingen waren daarna al gepusht.

**Why:** De werkdirectory is gedeeld. Een andere sessie die `git add -A` gebruikt, commit ook alles wat ik nog niet had vastgelegd. Historie herschrijven is dan geen optie meer omdat de commit al op de remote staat.

Het werkt ook andersom. Op 2026-08-11 slokte mijn eigen commit `1f97839` ("Update: Bordeaux Date contents...") de footerfix `Â© 2026` → `© 2026` van een parallelle sessie op, op acht andere HTML-pagina's. Die stonden al gestaged in de index toen ik `git commit` zonder padargument draaide; mijn eigen hunks had ik netjes met `git apply --cached` geselecteerd, maar dat helpt niet als er al andermans werk in de index staat.

Let op een valkuil in het advies hieronder: **`git commit -- pad.html` commit de werkboomversie van dat pad en negeert wat je gedeeltelijk hebt gestaged.** Op 2026-08-11 selecteerde ik bij de nav-herordening met `git apply --cached` alleen mijn nav-hunks in `index.html`, maar door daarna met een expliciet pad te committen ging de foto-wijziging van de parallelle sessie (`dionne-aan-het-werk-1344.jpg`) alsnog mee. Zichtbaar aan het regelaantal: 35 gewijzigde regels in plaats van de 30 die gestaged stonden. Hersteld met `git reset --soft HEAD~1`, opnieuw stagen, en committen zonder padargument.

**How to apply:** Kies bewust tussen twee routes. Staat er alleen jouw werk in de index, dan is `git commit -- pad.html` veilig. Heb je gedeeltelijk gestaged met `git apply --cached`, commit dan juist **zonder** pad en controleer eerst met `git diff --cached | grep -E '^[+-][^+-]'` dat er niets vreemds in de index zit. Vergelijk na iedere commit het regelaantal met wat gestaged stond; wijkt het af, dan is er werk van een andere sessie meegelift. Laat bestanden nooit gestaged staan terwijl je nog verder werkt. Dat is precies het gat waarin het misgaat: op 2026-08-11 stonden acht footerfixes een paar seconden gestaged tijdens het uitpluizen van een patch, en in dat venster committe de andere sessie ze weg. Stage en commit in één handeling, met expliciet pad. Controleer `git status` en `git log` direct voordat je commit, niet alleen aan het begin van de sessie. Draai altijd eerst `git diff --cached --stat` en commit met een expliciet pad (`git commit -- box-x.html`) wanneer er meer in de index kan staan dan jouw werk. Commit tekst- en merkwijzigingen zo snel mogelijk na het maken, in een eigen commit, zodat ze traceerbaar blijven. Merk het op in je eindantwoord wanneer werk in een vreemde commit terecht is gekomen, in plaats van historie te herschrijven. Zie ook [[user-rol]].
