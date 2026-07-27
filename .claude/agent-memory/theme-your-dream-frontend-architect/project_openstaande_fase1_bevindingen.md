---
name: project-openstaande-fase1-bevindingen
description: Wat na fase 1, 2 en 6 (2026-07-27) nog openstaat: no-JS menu, inline styles, dood formulier, PNG's, de voorwaarden-PDF en de status van .env.local.
metadata:
  type: project
---

Stand na de fase 2 commit van 2026-07-27 ("FASE 2: focusring, reduced motion,
headerhoogte, dode links").

**Opgelost in fase 2:**

1. ~~Geen globale reduced-motion terugval.~~ Vangnet staat nu achteraan
   `style.css` als sectie 13. Bewust `animation-duration: 0.01ms` en niet
   `animation: none`, omdat `.section__title`, `.content-block` en
   `.process__step` op `opacity: 0` staan en pas zichtbaar worden door de
   `forwards`-vulling van hun eigen animatie. `animation: none` zou die inhoud
   permanent onzichtbaar maken. Dat is hier de valkuil.
2. ~~Dode PDF-links.~~ Vervangen door `.site-footer__legal-pending`, een span
   zonder link. Geen 404 meer.

**Blijft openstaan:**

1. **Zonder JavaScript kan het mobiele menu niet open.** Bewuste keuze; de
   checkbox-hack kost meer dan hij oplevert. `.also-see` en de footer blijven
   daardoor noodzakelijk als navigatie.
2. **Inline styles in `index.html`**: `style="margin-right: 8px"` op het
   WhatsApp-icoon terwijl `.cta--whatsapp` `gap: 0` zet, plus twee inline
   stijlen op de e-mailterugval.
3. **Welk voorwaardenbestand terugkomt is een vraag voor Dionne.** Er waren
   twee namen in omloop: `Algemene voorwaarden Theme Your Dream.pdf` (acht
   pagina's) en `algemene-voorwaarden.pdf` (alleen privacyverklaring). Zodra
   het bestand er is, vervangt één span per pagina weer door een link.
4. **Dood formulier.** `.form-input`, `.form-actions`, `.form-btn` en
   `.form-step` in `style.css` plus `initProgressiveContactForm` in `script.js`
   worden door geen enkele pagina gebruikt; er staat nergens een `<form>`.
   WhatsApp is de contactroute. Kan weg, maar dat is een eigen opdracht.
5. **Foto's staan nog als PNG**, circa 32MB over dertien bestanden, zonder
   `srcset` en zonder lazy loading. Zie [[reference-beeldconversie]]: dit is
   technisch wel degelijk uitvoerbaar.

6. **`.env.local` staat in `.gitignore` maar is nog steeds tracked** (sinds
   commit f7a3558). Fase 6 voegde het patroon toe; dat werkt niet op een
   bestand dat al in de index staat. Het bestand bevat geen geheimen, alleen
   `ENVIRONMENT=development` plus commentaar, en niets leest het in (er is geen
   dotenv). `DEPLOYMENT_CHECKLIST.md` en `SEO_CONFIGURATION.md` zeggen juist
   expliciet dat het bestand bewust gecommit blijft. Die twee standpunten
   spreken elkaar tegen. Untracken kan met `git rm --cached .env.local`, maar
   dat hoort bij de gebruiker omdat de documentatie dan mee moet.

**How to apply:** Punt 5 is verreweg de grootste winst, punt 4 daarna. Punt 3
en 6 horen bij de gebruiker.

Gerelateerd: [[project-concept-site-review-2026-07]], [[reference-headless-controle]].
