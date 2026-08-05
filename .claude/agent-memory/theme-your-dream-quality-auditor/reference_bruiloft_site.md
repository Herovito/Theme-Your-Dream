---
name: reference-bruiloft-site
description: Second, unrelated site the user also has audited by this agent — wedding site Storm & Dionne, its repo path and live Vercel URL
metadata:
  type: reference
---

The user also owns a separate wedding site, unrelated to Theme Your Dream:

- Local repo: `C:\Users\Storm\OneDrive - Sanacount\Documenten\bruiloft-storm-dionne`
- GitHub: `https://github.com/Herovito/Stormendionne.git` (branch `main`)
- Live production: `https://stormendionne.vercel.app`
- Plain static site (no framework), served by Vercel with `outputDirectory: "."`. Local dev via `npx http-server`.
- RSVP runs through Formspree endpoint `xqerozqa` (POST-only; a GET returns 405, which is normal).

**Why:** This site is audited by the same quality-auditor agent but must NOT be judged against the Theme Your Dream brand handbook — it has its own "Blush & Sage" palette and its own tone.

**How to apply:** When asked to audit "de bruiloftswebsite", work in the path above and always verify against the live Vercel URL as well as localhost, per [[feedback-vercel-testing]]. Do not apply Theme Your Dream colour/tone rules there.

The site is distributed **only as a WhatsApp link** — it is the invitation itself, there is no print version. So the link-preview layer (Open Graph tags, `og:image`, favicon) and first-paint weight on mobile carry unusually high weight in any audit of this site; treat them as first-class findings rather than SEO nice-to-haves. The site also doubles as Herovito's portfolio piece, so the "Een Herovito website" footer credit must appear on every page, not only the homepage.

No browser automation is installed in that repo — Playwright lives in the Theme Your Dream `Website-git/node_modules`, and Node resolves modules from the *script's* location, so audit scripts must be run from inside `Website-git`.
