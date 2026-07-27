---
name: reference-lokale-review-setup
description: Hoe je de concept-site visueel reviewt (dev server op poort 3456, headless Chrome) en de viewport-valkuil die tot valse bevindingen leidt
metadata:
  type: reference
---

De concept-site wordt lokaal geserveerd op `http://localhost:3456` (statische HTML in de repo-root, geen build nodig).

Visueel reviewen kan met headless Chrome, aanwezig op `/c/Program Files/Google/Chrome/Application/chrome.exe`:
`chrome.exe --headless=new --disable-gpu --hide-scrollbars --window-size=1440,3200 --screenshot=out.png --virtual-time-budget=6000 http://localhost:3456/index.html`

**Valkuil:** `--window-size` is niet hetzelfde als de viewport. Bij `--window-size=390,844` werd de viewport 485px breed en bij 1440 werd het 1409px. De screenshot legt dan alleen het linkerdeel vast, waardoor het lijkt alsof tekst horizontaal buiten beeld valt. Die "mobiele overflow" is een artefact, geen bug.

**How to apply:** Meet altijd na met `document.documentElement.clientWidth` en `scrollWidth` voordat je een layoutfout rapporteert. Kopieer daarvoor de pagina naar de scratchpad, plak er een meetscript achter en gebruik `--dump-dom`. Let op dat `--dump-dom` ook de scriptbron meeprint, dus grep op een patroon dat alleen in de uitvoer voorkomt (bijvoorbeeld `VP=[0-9]`) en niet op de letterlijke scripttekst.

De echte breekpunten in style.css liggen op 640, 700, 900, 1200 en 1800px; de header schakelt op 900px van mobiel naar desktopgedrag.
