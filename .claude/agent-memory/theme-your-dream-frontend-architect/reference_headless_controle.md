---
name: reference-headless-controle
description: Chrome staat lokaal geïnstalleerd en kan via CDP zonder dependencies worden aangestuurd; --screenshot alleen is onbetrouwbaar.
metadata:
  type: reference
---

Voor visuele en layoutcontrole is geen extra pakket nodig. Chrome staat op
`C:/Program Files/Google/Chrome/Application/chrome.exe`. Node (v24) heeft een
ingebouwde `WebSocket` en `fetch`, dus een minimale CDP-client past in circa
30 regels: start Chrome met `--headless=new --remote-debugging-port=<poort>
--user-data-dir=<eigen map>`, haal de socket-URL op via
`http://127.0.0.1:<poort>/json/version`, en gebruik
`Emulation.setDeviceMetricsOverride` plus `Runtime.evaluate`.

Twee valkuilen die tijd hebben gekost:

1. **`chrome --headless --screenshot` alleen is misleidend.** De schermafbeelding
   wordt gemaakt voordat `style.css` is toegepast, dus je ziet een ongestileerde
   pagina en trekt verkeerde conclusies (bijvoorbeeld "de hamburger ontbreekt").
   Wacht via `Runtime.evaluate` tot een bekende token de verwachte waarde heeft,
   bijvoorbeeld `--color-cream === '#F7F1EA'`.
2. **Zet `Network.setCacheDisabled` aan.** Zonder dat meet je een oude CSS uit
   de profielcache, ook bij een schijnbaar verse `--user-data-dir`.

**How to apply:** Gebruik dit voor contrastmetingen tegen de werkelijk gerenderde
achtergrond (loop de DOM af, tel alfa-lagen op) en voor overflowcontrole per
breedte. Dat is betrouwbaarder dan hexwaarden uit de CSS narekenen.
