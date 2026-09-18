# Homepage review na Claude Code

Beoordeeld: commit 932bf5e, lokale build, 19 september 2026.
Referenties: gebruikersmockup en bestaande pagina Alle stylingboxen.
Deze review wijzigt geen websitebestanden of teksten.

## Eerst herstellen

1. **Analytics-configuratie ontbreekt op homepage (P1 vóór activering GA).**
   index.html:480 laadt consent.js zonder data-ga-id="". De build vervangt uitsluitend dit attribuut; consent.js leest uitsluitend document.currentScript.dataset.gaId. Daardoor blijft de homepage ongeconfigureerd, ook wanneer een geldig ID in config.js staat. Op andere pagina’s kan Analytics dan wel werken. Herstel dezelfde scriptintegratie als op de boxpagina’s, inclusief versienummers en defer. De banner zelf wordt nog wel geladen; dit is geen bewijs van tracking vóór toestemming.

2. **Eerder verwijderde placeholder is terug (P2).**
   index.html:269 gebruikt weer assets/images/styling-box-1536.webp. De afgebeelde doos met ballonnen/backdrop is niet de eerder gekozen echte Beige Bliss-foto. Zet de eerder goedgekeurde echte foto terug, zonder zichtbare toelichting toe te voegen. Controleer src, srcset, afmetingen en uitsnede samen.

3. **De knop Bekijk de mogelijkheden slaat Eventstyling over (P2).**
   index.html:149 verwijst uitsluitend naar styling-boxes.html, terwijl de hero beide diensten introduceert. Advies: link naar de bestaande sectie met beide diensten via een sectieanker en houd rekening met de vaste header. De knoptekst hoeft hiervoor niet te wijzigen.

## Visuele aanbevelingen

4. **Mobiele route naar aanbod verkorten.**
   Op viewport 390 x 844 staat de eerste contactknop op y=923; de hero is 1036 px hoog en de detailsectie nog eens 1239 px. De dienstensectie begint op y=2415. Verklein de mobiele herofoto en maak het fotoblok compacter, of presenteer de diensten eerder. Behoud leesbare tekst en voldoende knopruimte; tekst inkorten alleen na akkoord van gebruiker.

5. **Minder herhaling van hetzelfde evenement.**
   De hero, grote detailfoto, twee kleinere details en het Eventstyling-blok tonen dezelfde rood-roze setting. Dit is authentiek, maar domineert sterker dan de rustige, gevarieerde referentie. Gebruik minder beelden van hetzelfde evenement in het eerste deel; geef de echte boxfotografie eerder ruimte. Geen nieuwe beelden of productinhoud verzinnen.

## Behouden

- Warme huisstijl, grote serifkoppen, duidelijke primaire en secundaire knoppen.
- Afgeronde fotokaders en Rouge Script-boxnamen sluiten aan op het boxoverzicht.
- Persoonlijke Dionne-sectie en zichtbare boxprijzen.
- Het ontwerp hoeft niet opnieuw opgebouwd te worden.

## Verificatie

- npm run build: geslaagd.
- npm run validate: geslaagd, inclusief lokale links, assets, anchors en JSON-LD.
- npm test: 4/10 geslaagd, 6 mislukt. Vijf failures betreffen de ontbrekende script.js?v= verwijzing op de homepage; de zesde betreft ontbrekend data-ga-id. Dit zijn twee oorzaken, niet zes verschillende defecten.
- Desktop en mobiel visueel bekeken. Mobiel menu en submenu geopend; link naar Alle stylingboxen succesvol gevolgd.
- Geen volledige nieuwe toegankelijkheidsaudit of fysieke telefooncontrole uitgevoerd.

## Randvoorwaarden voor uitvoering door Claude Code

Wijzig geen zichtbare teksten zonder akkoord van de gebruiker. Behoud zakelijke gegevens, prijzen, cookiekeuzes en de bestaande boxpagina’s. Neem de actuele gebruikerswijzigingen mee en overschrijf geen .claude-geheugenbestanden. Voer build, validator en buildtests opnieuw uit; controleer desktop en mobiel visueel. Houd subjectieve ontwerpkeuzes apart van technische reparaties.

## Uitvoering 19 september 2026

Homepage aangepast op verzoek van gebruiker, met behoud van alle zichtbare hoofdinhoud (automatisch vergeleken):
- Compacte hero met echte foto van Dionne aan het werk; mobiel tekst en knoppen eerst.
- Compact detailblok met drie foto's; twee dienstkaarten naast elkaar vanaf tablet.
- Vier boxen naast elkaar op desktop, twee op tablet, één op smalle telefoons.
- Placeholder vervangen door echte Beige Bliss-foto. Persoonlijk blok gebruikt het bestaande portret.
- Mogelijkheden-knop verwijst naar beide diensten met header-offset.
- Consent-attribuut, scriptversies en defer hersteld. Contrast van slottekst gecorrigeerd.
- Homepagevormgeving apart in home.css; boxoverzicht en detailpagina's ongemoeid.

Validatie: 10/10 buildtests geslaagd, build en linkvalidator geslaagd. Homepagecontrole op 320/390/768/1280/1920px: geen overflow, ontbrekende beelden of JS-fouten; anker werkt. Axe op 390 en 1280px: geen WCAG A/AA-overtredingen gevonden. Mobiele eerste CTA rond y=440 in plaats van y=923. Browserregressietest bijgewerkt naar huidige cover__img-selector; volledige 54-combinatietest niet opnieuw uitgevoerd.
