# Testen

- `npm run validate`: interne verwijzingen, bestandsnamen inclusief hoofdletters, ankers, JSON-LD en placeholders.
- `npm test`: buildvarianten, robots-meta en HTTP-headers, publicatie-allowlist, bedrijfsconfiguratie, validator en veilige uitvoermap.
- `npm run test:browser`: negen pagina's op 320, 375, 768, 1024, 1440 en 1920px; galerijen, afbeeldingen, overflow, JavaScript-fouten, mobiele navigatie en toetsenbordbediening. Controleert ook uitgeschakeld/geblokkeerd JavaScript en reduced motion.
- Axe-controles draaien op 375 en 1440px. Een geslaagde automatische scan vervangt geen volledige handmatige toegankelijkheidsaudit.

Browsertests gebruiken een tijdelijke lokale server met de gegenereerde build. Resultaten en screenshots: `.scratch/browser/`. Playwright Chromium moet geïnstalleerd zijn.

`npm run build` genereert de uiteindelijke uitvoer. Controleer na deployment ook de daadwerkelijke HTTP-headers en robots.txt: lokale tests kunnen geen afwijkende dashboardinstellingen of domeinconfiguratie uitsluiten.
