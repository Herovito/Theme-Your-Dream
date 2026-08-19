---
name: project-boxpaginas-vereenvoudigd
description: De vier boxpagina's hebben sinds 2026-08-11 één sectie "Wat er in de box zit" met alleen de vier standaarditems; themaspecifieke items zijn geschrapt als placeholders
metadata:
  type: project
---

Op 2026-08-11 zijn de boxpagina's twee keer achter elkaar herzien op branch `concept-site`:

1. Commit `5396833` haalde de walnut sectie "Inhoud / Wat er in de box zit" met de themaspecifieke items weg (inclusief de twee golf-SVG's), en haalde het kopje "Standaard inbegrepen / De basis van elke tafel" weg boven de vier standaarditems.
2. Commit `e225db1` draaide dat grotendeels terug omdat er te veel was verdwenen. De walnut sectie met golf-SVG's staat weer tussen de box meta en Praktisch, maar nu met één samengevoegde lijst: eerst de vier standaarditems (tafelkleed, tafelloper, kandelaars met led kaarsen, vazen met kunstbloemen), daarna de themaspecifieke items. De losse sectie met alleen de standaarditems is verwijderd. "Opties tegen betaling" is ongemoeid gelaten.

**Why:** De gebruiker wilde minder kopjes en minder sectiestructuur, maar niet ten koste van de inhoudelijke informatie. Klanten moeten in één lijst kunnen zien wat ze krijgen.

3. Commit `25afba4` haalde de lead boven die lijst weg ("Dit zit altijd bij de huurprijs in. Led kaarsen horen erbij, servies niet."). Op Bordeaux Date bleef alleen "Deze box is gedekt voor 2 personen." staan. De servies-informatie staat nu in de sectie Praktisch, als eigen alinea direct na de prijsalinea: "Servies zit niet in de box. Borden en bestek regel je zelf." Servies is geen betaalde optie in "Wat je erbij kunt kiezen"; de bestaande slotzin over toevoegen of aanpassen dekt de route via Dionne.

4. Commit `e824f15` haalde de betaalde optie "Servetten met servetringen: €2 per persoon" uit "Wat je erbij kunt kiezen" op Blue Breeze, Beige Bliss en Blush Bloom. Bordeaux Date had die optie niet: daar zitten servetten met servetringen in de huurprijs en staan ze in de inhoudslijst. De optielijst telt op de drie pagina's nu vier regels: naambordje, menukaartje, welkomstbord met ezel, teddyberen.

5. Commit `cf3e8e0` schrapte alle themaspecifieke items als placeholders. De inhoudslijst telt nu op Blue Breeze, Beige Bliss en Blush Bloom precies vier regels: tafelkleed (tot 2,5 meter), tafelloper, kandelaars met led kaarsen, vazen met kunstbloemen. Bordeaux Date heeft daarnaast servetten met servetringen en het vragenspel, beide standaard inbegrepen. "Linnen loper" op Bordeaux Date is daarbij weer "Tafelloper" geworden, zodat alle vier de pagina's dezelfde formulering gebruiken.

**Why:** De themaspecifieke items waren verzonnen invulling, geen werkelijke boxinhoud. Beloof niets wat niet in de box zit.

Vlak vóór `cf3e8e0` liep in een parallelle sessie een tegengestelde opdracht: de oude Blue Breeze placeholder-items (pampagras, twee glazen vaasjes, gevlochten mand, linnen doekje, theelichthouder, themakaart) terugzetten, maar dan in blauwe tinten omschreven in plaats van saliegroen en rookgrijs. Die opdracht is niet uitgevoerd. Uitvoeren zou `cf3e8e0` binnen enkele minuten terugdraaien, Blue Breeze als enige box tien items geven tegenover vier bij de rest, en opnieuw bedachte inhoud beloven.

6. Commit `e5abe03` bracht de hero-intro's, meta descriptions en foto alt-teksten in lijn met die vier items. Weg zijn champagneglas, groentinten, gevlochten schaal, theelichthouder, zijden strik, amber glas en een vleugje glitter. De meta descriptions noemen nu letterlijk de vier items plus een sfeerwoord; de hero-intro's herhalen de lijst niet maar noemen alleen kaarslicht en bloemen, met per box een eigen tweede zin. De alt-teksten beschrijven sindsdien wat er op de foto staat, niet wat er in de box zit. Dat geldt ook voor de vier kaart-alts op `styling-boxes.html`.

**Why:** De inhoudslijst was al teruggebracht tot de werkelijke inhoud, maar de omliggende teksten beloofden nog de oude, verzonnen items. Beloof niets wat niet in de box zit, ook niet in metadata die alleen bij delen zichtbaar wordt.

**How to apply:** Er is per boxpagina precies één inhoudslijst, zonder lead erboven (Bordeaux Date uitgezonderd). Praktische voorbehouden horen thuis in Praktisch, niet in de inhoudslijst. Voeg geen tweede lijst of extra kopje toe. Vul de lijst niet aan met bedachte items; vraag om de echte inhoud. Wijzigt de inhoudslijst, werk dan in dezelfde beurt de meta description, de og:description, de hero-lead, de foto-alt op de boxpagina en de kaart-alt op `styling-boxes.html` bij; die vijf plekken lopen anders uit de pas. De sfeerwoorden in de meta descriptions (ingetogen, warm en aards, zacht en roze) zijn afgeleid van de foto's, niet van bekende boxkleuren, zie [[project-open-merkbeslissingen]].

**Valkuil bij visuele controle:** In headless Chrome zijn `section__title` en `feature-list` items onder de vouw vaak onzichtbaar, omdat de reveal-observer niet afvuurt. Dat geldt ook voor onaangeraakte pagina's zoals `styling-boxes.html`. Vergelijk altijd met een onaangeraakte pagina voordat je dit als bug rapporteert. Zie [[reference-lokale-review-setup]].
