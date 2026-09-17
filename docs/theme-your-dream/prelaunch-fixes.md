# Herstelcontrole voorafgaand aan livegang

De oorspronkelijke review betrof commit `26034309d589f6eb96057a6210efc267386089d2`. De boxlayout is daarna aangepast op basis van de gebruikerswijzigingen in `6ece57a24e7f34dee0559a3e213a53f9cf946c91`.

## Uitgevoerde correcties

- Verborgen koppen en lijsten zijn zichtbaar zonder afhankelijkheid van animaties. De privacypagina gebruikt het gedeelde menu en script.
- Proceskolommen schalen mee met het scherm; lange juridische tekst breekt af op kleine schermen.
- Tekst- en knopcontrast is verbeterd met gedeelde kleurvariabelen.
- Responsive WebP-afbeeldingen vervangen zware originelen op de openbare pagina's. De eerste hero/galerijfoto wordt direct geladen; overige foto's laden uitgesteld.
- De nieuwe boxgalerijen behouden de inhoud en foto's van de gebruiker. Desktop gebruikt exact 7,5% / 50% / 5% / 30% / 7,5%; tot 900px staan de onderdelen onder elkaar. De beperkende maximumcontainerbreedte is verwijderd.
- Galerijknoppen hebben grotere klikvlakken, zichtbare toetsenbordfocus en uitgeschakelde eindknoppen. Zonder JavaScript zijn de foto's horizontaal te scrollen.
- Overzichtsprijzen komen overeen met de bijgewerkte boxpagina's: Bordeaux Date 39 euro, Blue Breeze 59 euro, Beige Bliss 49 euro en Blush Bloom 64 euro.
- Bevestigde bedrijfsgegevens zijn verwerkt in de website. De KvK-placeholder in de voorwaarden-PDF en het DOCX-bronbestand is vervangen; de gepubliceerde PDF is visueel gecontroleerd.
- Unieke paginatitels, herstelde privacy-ankers/tekencodering en gecontroleerde JSON-LD.
- Menu en inhoud blijven bruikbaar als JavaScript ontbreekt; toetsenbord- en mobiele bediening worden getest.
- De build genereert robots-meta, robots.txt en HTTP-headers vanuit dezelfde liveflag. Alleen expliciet livegezette productie is indexeerbaar.
- Publicatie is beperkt tot de negen manifestpagina's en benodigde bestanden. Interne documenten en experimenten worden niet meegenomen.
- Gewijzigde assets worden opnieuw gevalideerd door de browser, zonder eenjarige immutable-cache.
- De linkvalidator meldt ontbrekende assets, hoofdletterfouten en ongeldige ankers daadwerkelijk als fouten.
- Onderhouds- en deploymentdocumentatie beschrijft de huidige build en controles. De npm-lockfile wordt niet meer genegeerd.

## Verificatie

`npm test`: acht buildtests geslaagd. `npm run validate`: geslaagd. `npm run build`: geslaagd, standaard noindex.

De browsertest controleert negen pagina's op zes breedtes (320, 375, 768, 1024, 1440 en 1920px), de exacte desktopverhoudingen en alle galerijafbeeldingen. Axe draait op 375 en 1440px. Daarnaast worden mobiele menu's, toetsenbordbediening, ontbrekend JavaScript en reduced motion gecontroleerd. Alle 54 layoutcontroles en 18 Axe-scans slaagden. De interactie- en fallbackcontroles slaagden afzonderlijk na correctie van een timingafhankelijkheid in de test. Screenshots staan in `.scratch/browser/`.

## Buiten de lokale controle

Publicatie, DNS, HTTPS, hostinginstellingen en de uiteindelijke HTTP-respons moeten op de gedeployde site worden gecontroleerd. De privacyverklaring noemt TransIP als host, terwijl de repository op Vercel is voorbereid; bevestig bij livegang welke partij daadwerkelijk host. Een automatische toegankelijkheidsscan en technische review zijn geen volledige handmatige toegankelijkheids- of juridische audit.

Deze herstelcontrole publiceert geen deployment en verstuurt geen WhatsApp-bericht.
