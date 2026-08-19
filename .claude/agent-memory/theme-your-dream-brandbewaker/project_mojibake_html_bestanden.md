---
name: project-mojibake-html-bestanden
description: De HTML-bestanden bevatten letterlijk opgeslagen mojibake (â‚¬ voor €, â†’ voor →), waardoor Edit-matches op die tekens mislukken
metadata:
  type: project
---

Meerdere HTML-bestanden bevatten mojibake die letterlijk als tekens in het bestand staat, niet als weergavefout: `â‚¬` in plaats van `€`, `â†’` in plaats van `→`, en losse controlebytes achter em-dashes (bijvoorbeeld `—` gevolgd door U+009D in `styling-boxes.html`). De `<meta charset="UTF-8">` klopt wel; de tekens zijn ooit dubbel geëncodeerd opgeslagen.

**Why:** Bij de prijsupdate van 2026-08-11 bleek de euro op alle vier boxpagina's als `â‚¬85` op het scherm te staan. Dat is bij die commit rechtgezet naar echte `€`. De pijlen in HTML-commentaren zijn blijven staan, want die zijn onzichtbaar voor bezoekers.

De footer is per 2026-08-11 helemaal schoon: eerst is de copyright rechtgezet (`\xc3\x82\xc2\xa9` naar `\xc2\xa9`), daarna in een tweede commit het middelpunt (`\xc3\x82\xc2\xb7` naar `\xc2\xb7`) op vijf pagina's. Geen enkel `.html`-bestand bevat nog een `\xc3\x82`-byte. `privacyverklaring.html` is de schone referentie, maar bevat nog `[invullen]` als KvK- en btw-nummer.

Alle `og:title`-tags zijn per 2026-08-11 schoon (commit `e5abe03`). Daarvoor stond er drievoudig gecodeerde rommel op de plek van de em-dash in `over_dionne.html` (`\xc3\xa2\xe2\x82\xac\xe2\x80\x9d\xc3\xa2\xe2\x82\xac\xc2\x9d`) en een em-dash met een losse `\xc2\x9d` erachter in `privacyverklaring.html`. In dezelfde commit zijn vier van diezelfde `\xe2\x80\x94\xc2\x9d`-combinaties uit de kaart-alt-teksten van `styling-boxes.html` verdwenen.

Wat nog openstaat is mojibake buiten de footer:
- Pijlen in HTML-commentaren (`â†’` en het zwaardere `Ã¢â€ â€™`) in `eventstyling.html`, `index.html`, `index-berry-preview.html`, `over_dionne.html` en `styling-boxes.html`. Onzichtbaar voor bezoekers, daarom bewust blijven staan.

**Terugkerend patroon:** een echte em-dash met een losse `\xc2\x9d` (U+009D) erachter. Dit maakt de regel visueel normaal in `grep`-uitvoer maar laat elke Edit-match stuklopen. Het zat in `styling-boxes.html` en `privacyverklaring.html`; controleer het als eerste wanneer een Edit op een regel met een em-dash onverklaarbaar faalt.

**How to apply:** Zichtbare mojibake altijd meteen herstellen naar het juiste teken. Controleer bij footerwerk de hele `site-footer__legal` blok, niet alleen de regel uit de opdracht. Tel dubbel gecodeerde tekens per bestand met `perl -0777 -ne 'my $c=()=/\xc3\x82/g; print $c'` voordat je iets vervangt, zodat je niet blind een byte-replace doet die een ander teken raakt. Loopt een Edit stuk op een regel met een em-dash of pijl, controleer dan eerst de ruwe bytes (`sed -n 'Np' bestand | cat -A`) en anker de match op een regel zonder speciale tekens. Grep op `â‚¬` na tekstwerk om te controleren dat er geen nieuwe zichtbare mojibake bij is gekomen.
