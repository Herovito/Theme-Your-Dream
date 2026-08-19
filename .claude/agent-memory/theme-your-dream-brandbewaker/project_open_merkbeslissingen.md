---
name: project-open-merkbeslissingen
description: Onopgeloste punten op de concept-site branch (navigatiemenu vs CLAUDE.md, kleurpalet-drift, de vier boxfoto's die de oude namen en de verkeerde inhoud tonen) die een besluit van Dionne nodig hebben
metadata:
  type: project
---

Op branch `concept-site` staan keuzes die aantoonbaar afwijken van het merkhandboek en CLAUDE.md, of die inhoudelijk nog niet dichtgetimmerd zijn.

**1. Navigatiemenu.** CLAUDE.md zegt: "De site heeft geen navigatiemenu. Elke pagina heeft een kale header met alleen het logo." In de code staat wel een menubalk (Styling boxen met dropdown, Eventstyling, Over Dionne), bewust toegevoegd in commits rond 2026-07-26.

**Why:** Het menu is er met opzet gekomen (meerdere commits achter elkaar over de menubalk), dus dit is geen ongelukje maar een richtingswijziging die alleen nog niet in CLAUDE.md is doorgevoerd. Het handboek zelf verbiedt een menu niet, het noemt donkerbruin juist voor "tekst, navigatie". De strengere regel staat in CLAUDE.md.

**2. Kleurpalet-drift.** De basisachtergronden in style.css zijn niet de handboekkleuren: `#EDE1D2` staat waar Cream `#F7F1EA` hoort en `#E2CDBA` waar Linen `#EEE6DE` hoort. Copper `#A76F5B` komt niet voor. Er is een zevende kleur `--color-sage: #8C9275` toegevoegd.

**Why:** De contrastannotaties in de CSS-commentaren (4.66, 4.37, 4.95) kloppen exact bij de officiële Cream #F7F1EA, niet bij de huidige achtergrond. De stylesheet is dus oorspronkelijk op het merkpalet gebouwd en de achtergrond is later donkerder gemaakt zonder de rest bij te werken. Een stille groentint is wél toegestaan door het handboek (pagina 50, "secundair accent: stille groentint"), maar zonder vastgelegde hex.

**3. Wat hoort er standaard in de Bordeaux Date box?** Bordeaux Date is de enige box met een vaste prijs (€39, expliciet niet per meter) en een cadeau-achtige inhoud: linnen zakje, champagneglas, feestkaart, houten hanger. De andere drie boxen kosten €89 per 2,5 meter tafel en hebben sinds 2026-08-11 twee extra secties: "De basis van elke tafel" (tafelkleed tot 2,5 meter, tafelloper, kandelaars met led kaarsen, vazen met kunstbloemen, geen servies) en "Wat je erbij kunt kiezen" (servetten, naambordje, menukaartje, welkomstbord, teddy uitbreiding).

**Why:** De opdracht was om die twee secties op alle vier de boxpagina's te zetten. Op Bordeaux Date is dat bewust niet gedaan: een tafelkleed voor 2,5 meter en een teddy-prijs per 2,5 meter tafel spreken de eigen prijsalinea op diezelfde pagina tegen ("Bij deze box reken je dus niet per meter"). Twee elkaar tegensprekende inhoudslijsten op één pagina schaadt het vertrouwen dat de pagina juist moet winnen.

**Stand 2026-08-11 (tweede opdracht):** De gebruiker heeft alsnog uitdrukkelijk gevraagd beide secties ook op `box-bordeaux-date.html` te zetten; dat is gedaan (commit "Add: package contents and options to Bordeaux Date box"). Bordeaux Date is daarmee feitelijk als tafelbox gepositioneerd. De pagina spreekt zichzelf nu op twee plekken tegen en dat is nog niet opgelost: de prijsalinea zegt "€39, een vaste prijs voor de hele box, niet per meter" terwijl er nu een tafelkleed tot 2,5 meter en een teddy van €15 per 2,5 meter tafel onder staan, en de sectie "Wat er in de box zit" noemt geen tafelkleed, tafelloper of kandelaars.

**Stand 2026-08-11 (derde opdracht):** De prijsalinea is op verzoek herschreven. "Bij deze box reken je dus niet per meter" is eruit; er staat nu dat €39 een vaste prijs is waar de basis (tafelkleed, tafelloper, kandelaars, vazen) in zit en dat opties daar apart bij komen. Daarmee is de tegenstrijdigheid met de teddyprijs per 2,5 meter tafel weg en is Bordeaux Date definitief een tafelbox met vaste prijs.

**Stand 2026-08-11 (vierde opdracht):** In de prijsalinea staat nu ook de maat: "Dat is een vaste prijs voor een tafel tot 2,5 meter". Daarmee sluit de prijs aan op het tafelkleed onder "De basis van elke tafel". Let op: de box-meta bovenaan de pagina toonde toen nog kaal "€39"; dat is bij de negende opdracht rechtgezet.

**Stand 2026-08-11 (zesde opdracht):** Bordeaux Date is nu vastgelegd als box voor 2 personen op één tafel tot 2,5 meter, niet uitbreidbaar naar twee tafels. Dat staat in de hero-lead, als lead boven "Wat er in de box zit" en als eigen alinea onder Praktisch (met doorverwijzing naar de andere styling boxen of naar Dionne). Aan de inhoudslijst zijn servetten met servetringen en een vragenspel toegevoegd; beide zijn standaard inbegrepen. Servetten stonden daardoor dubbel op de pagina en zijn op déze pagina uit "Wat je erbij kunt kiezen" gehaald (op de drie andere boxen blijven ze betaalde optie à €2 per persoon). De teddyprijs is op deze pagina "€15" zonder "per 2,5 meter tafel", omdat een prijs per meter een uitbreidbaarheid suggereert die de box niet heeft. Die twee laatste keuzes zijn afgeleide interpretaties, geen letterlijke opdracht.

**Stand 2026-08-11 (zevende opdracht):** `styling-boxes.html` heeft een eigen sectie "Hoe werken de prijzen?" gekregen tussen het boxenraster en de CTA (commit `a78ada0`). De korte prijsalinea die daar al onder het raster stond is daarin opgegaan, dus de prijzen staan er niet dubbel. Gevolg: prijzen (€89 / €70 per 2,5 meter, borg €100 / €75, Bordeaux Date €39 met borg €75) staan nu op twee plekken: de overzichtspagina én de vier boxpagina's. Wijzig een prijs nooit op één van de twee.

**Stand 2026-08-11 (achtste opdracht):** De verhuurperiode (standaard 3 dagen, elke extra dag €10 per 2,5 meter tafel) staat nu op alle vijf prijsplekken: in "Hoe werken de prijzen?" op `styling-boxes.html` en als eigen alinea in Praktisch direct onder de prijsalinea op de vier boxpagina's (commit `414c80c`). Op Bordeaux Date staat er bewust alleen "elke extra dag €10", zonder "per 2,5 meter tafel", omdat die box één vaste tafel is en een prijs per meter uitbreidbaarheid suggereert. Dat is dezelfde afgeleide interpretatie als bij de teddyprijs, geen letterlijke opdracht.

**Stand 2026-08-11 (negende opdracht):** De box-meta bovenaan `box-bordeaux-date.html` toont nu "€39 voor 2,5 meter" (commit `240b7e1`), gelijk van vorm aan de drie andere boxen. De opdracht noemde de sectie "Praktisch", maar daar stond de maat al sinds de vierde opdracht; de box-meta was de enige plek op die pagina waar hij nog ontbrak. Commitboodschap daarom aangepast van "in Praktisch" naar "in box-meta". Op `styling-boxes.html` is niets gewijzigd: de zin "Die kost €39 met een borg van €75" wordt daar direct gevolgd door "Deze box is bedoeld voor een tafel tot 2,5 meter voor 2 personen en is niet uitbreidbaar", dus de maat toevoegen zou hem binnen twee zinnen herhalen.

**How to apply (punt 3):** Opgelost. De inhoudslijst is teruggebracht tot de werkelijke items, "Linnen loper" heet weer "Tafelloper" en het champagneglas is verdwenen. Zie [[project-boxpaginas-vereenvoudigd]].

**4. De vier boxfoto's tonen de oude boxnamen en niet de boxinhoud.** Op elke foto staat een kaartje met de oude naam er letterlijk op gedrukt: `Thema 1.png` "TIME TO celebrate" (nu Bordeaux Date), `Themabox 2.png` "NATURAL" (nu Blue Breeze), `Themabox 3.png` "WARM & COSY" (nu Beige Bliss), `Themabox 4.png` "IT'S YOUR DAY to shine" (nu Blush Bloom). Daarnaast tonen de foto's kartonnen cadeaudozen met droogbloemen, touw en glaswerk, terwijl de boxen bestaan uit tafelkleed, tafelloper, kandelaars met led kaarsen en vazen met kunstbloemen. Geen van de vier items is op enige foto te zien, en er staat op geen enkele foto een gedekte tafel.

**Why:** De foto's zijn stockbeelden uit de periode vóór de naamswijziging van 2026-08-11. Een bezoeker die de foto naast de inhoudslijst legt ziet twee verschillende producten, en leest bovendien een andere naam dan in de kop staat. Dat raakt precies wat de boxpagina moet doen: vertrouwen winnen.

**How to apply (punt 4):** Dit is niet met tekst op te lossen; de alt-teksten beschrijven sinds commit `e5abe03` wel eerlijk de foto, maar de foto zelf blijft het verkeerde product tonen. Vraag Dionne om foto's van de werkelijke boxen, bij voorkeur van een gedekte tafel met natuurlijk licht. Bewerk de bestaande foto's niet en verzin geen tekst die de mismatch wegpoetst. Dit hangt samen met punt 1 van [[project-naamswijziging-styling-boxen]] (de groene foto onder de naam Blue Breeze).

**Opgelost (2026-08-11, vijfde opdracht):** "Teddy uitbreiding" heet sitebreed "Teddyberen als tafeldecoratie" (commit `b019ed1`), op alle vier de boxpagina's in de optielijst en in de prijsalinea van Bordeaux Date. Daarmee is de eerdere open vraag "een bezoeker kan 'teddy' niet plaatsen" weg: de optie zegt nu zelf wat het is en waar het voor dient. Prijs blijft €15 per 2,5 meter tafel.

**How to apply (punt 1 en 2):** Voer geen van beide afwijkingen stilzwijgend verder door en herstel ze ook niet eigenhandig. Vraag bij werk aan header/navigatie of aan kleuren eerst of het besluit al gevallen is. Wordt het menu behouden, dan moet CLAUDE.md met expliciete toestemming worden bijgewerkt.

**Opgelost (2026-08-11):** Alle zichtbare mojibake is weg. Eerst de footer (`Â© 2026` en het middelpunt `Â·`), daarna in commit `e5abe03` de `og:title` van `over_dionne.html` en `privacyverklaring.html` plus de vier kaart-alt-teksten op `styling-boxes.html`. Alleen pijlen in HTML-commentaren staan nog, die zijn onzichtbaar voor bezoekers. Zie [[project-mojibake-html-bestanden]], [[project-naamswijziging-styling-boxen]] en [[reference-lokale-review-setup]].

**Opgelost (2026-08-11):** De knoptekst is nu sitebreed exact "Vertel Dionne jouw idee" (11 keer), conform CLAUDE.md. Het eerdere suffix "via WhatsApp" staat nergens meer.
