---
name: bruiloftssite-storm-dionne
description: De gebruiker vraagt ook reviews van een tweede, losstaande site (bruiloft Storm en Dionne) die expliciet los van de Theme Your Dream merkregels beoordeeld moet worden.
metadata:
  type: project
---

Naast Theme Your Dream beheert de gebruiker een bruiloftssite op
`C:\Users\Storm\OneDrive - Sanacount\Documenten\bruiloft-storm-dionne`
(live: stormendionne.vercel.app, branch `main`). Statische HTML/CSS/JS op Vercel,
zonder buildstap, met een eigen palet (blush/sage) en Playfair Display plus
Work Sans.

**Why:** Op 2026-08-05 vroeg de gebruiker een technische review met de
uitdrukkelijke instructie "dit is een separaat project, beoordeel zuiver op
technische kwaliteit". Het Theme Your Dream merkhandboek, kleurpalet en de
schrijfregels uit `CLAUDE.md` gelden daar dus niet.

**How to apply:** Bij opdrachten over deze map: geen TYD-kleuren, -fonts of
-tone-of-voice opleggen. Beoordeel op HTML/CSS/JS-kwaliteit, toegankelijkheid,
performance en onderhoudbaarheid. De meetaanpak uit
[[reference-headless-controle]] werkt hier ongewijzigd; start wel eerst een
lokale server (`python -m http.server`) omdat de pagina's absolute paden als
`/pages/...` gebruiken en via `file://` breken.
