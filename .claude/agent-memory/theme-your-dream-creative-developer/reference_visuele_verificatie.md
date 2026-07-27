---
name: reference-visuele-verificatie
description: Hoe je in dit project visueel en gedragsmatig test — headless Chrome via CDP met Node, en waarom --virtual-time-budget scroll en rAF stukmaakt
metadata:
  type: reference
---

Er is in deze omgeving **geen preview/browser-MCP tool** beschikbaar. Testen
gaat via headless Chrome:

`/c/Program Files/Google/Chrome/Application/chrome.exe`
(Edge staat op `/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`)

Een statische server draait vaak al op **poort 3456**; `npx http-server`
faalt dan met EADDRINUSE terwijl de site gewoon bereikbaar is. Eerst curlen
voordat je een eigen server start.

## Voorkeursmethode: CDP aansturen met Node

Node 24 staat in deze omgeving en heeft een **ingebouwde WebSocket-client**,
dus je kunt Chrome via het DevTools Protocol aansturen **zonder puppeteer of
enige npm-installatie** (`node_modules` is leeg en dat mag zo blijven).

Patroon: `spawn` Chrome met `--headless=new --remote-debugging-port=9333
--user-data-dir=<uniek>`, haal de websocket-URL uit
`http://127.0.0.1:<poort>/json/list`, en stuur dan `Runtime.evaluate`,
`Page.navigate`, `Page.captureScreenshot` enzovoort.

Dit is de enige betrouwbare manier om te controleren:

- **scrollgedrag en requestAnimationFrame** — die lopen op echte tijd
- **`Emulation.setDeviceMetricsOverride`** — geeft een échte CSS-viewport op
  320px, inclusief kloppende media queries en `vw`-units
- **`Emulation.setEmulatedMedia`** met `prefers-reduced-motion: reduce`
- **`Emulation.setScriptExecutionDisabled`** — het no-JS-pad
- console-fouten, via `Runtime.consoleAPICalled` en `Runtime.exceptionThrown`

Ruim de tijdelijke `.mjs`-scripts en screenshotmap na afloop op.

## Valkuil: `--virtual-time-budget` breekt scroll en rAF

Onder `--virtual-time-budget` tikt **requestAnimationFrame niet** en komen
scrollgebeurtenissen niet aan. Alles wat via rAF loopt (de parallax, het
vullen van de headerbalk) lijkt dan kapot terwijl het gewoon werkt.

Herkenningspunt: als een functie waarvan je wéét dat hij werkt óók stilstaat,
is het de testopstelling en niet de code. Stap dan over op CDP.

`--virtual-time-budget` is prima voor gewone screenshots van statische
opmaak. `--force-prefers-reduced-motion` werkt **niet** onder `--headless=new`;
gebruik daar `Emulation.setEmulatedMedia`.

## Valkuil: `--window-size` onder ~500px liegt

Chrome dwingt een minimale vensterbreedte af. `--window-size=320,640` levert
geen CSS-viewport van 320px op. Gebruik `Emulation.setDeviceMetricsOverride`.

Een `<iframe>`-harnas werkt ook, maar de **scrollbalk van de iframe kost 15px**
en die vertekent metingen: een knop leek op 320px over twee regels te lopen
terwijl hij op een echte 320px-viewport gewoon paste.

## Screenshots wegschrijven

`--screenshot=` heeft een **absoluut Windows-pad met backslashes** nodig.
Relatieve paden en paden in de scratchpad-map geven "Toegang geweigerd" of
"pad niet gevonden". Schrijf naar een tijdelijke map in de projectroot.

Let op: een bash-heredoc eet backslashes op. Schrijf `.mjs`-hulpscripts met
Windows-paden met de Write-tool, niet met `cat <<EOF`.

Zie ook [[project-hero-split-homepage]].
