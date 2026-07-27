# Deployment Checklist

Use this checklist for each deployment. The first section blocks production;
the rest covers SEO configuration.

## BLOKKERS — ontbrekende bedrijfsgegevens (production only)

De site mag niet naar productie zolang deze gegevens nog niet van Dionne zijn
ontvangen. Alle plaatsen zijn gemarkeerd met dezelfde tekst, zodat één zoek-
opdracht volstaat:

```bash
grep -rn "VERVANGEN DOOR DIONNE" *.html
# Levert 0 regels op zodra alles is ingevuld.
```

| Gegeven | Placeholder in de code | Waar |
|---|---|---|
| WhatsApp-nummer | `wa.me/31000000000` | `index.html`, `eventstyling.html`, `themaboxen.html`, `over_dionne.html`, `box-celebrate.html`, `box-natural.html`, `box-warm-cosy.html`, `box-your-day.html` |
| KvK-nummer | `[VERVANGEN DOOR DIONNE: KvK-nummer]` | footer van alle 9 pagina's, plus `privacyverklaring.html` artikel 1 |
| Btw-id | `[VERVANGEN DOOR DIONNE: btw-id]` | footer van alle 9 pagina's, plus `privacyverklaring.html` artikel 1 |

- [ ] WhatsApp-nummer ontvangen en op alle 8 pagina's ingevuld
  - Formaat: landcode plus nummer, zonder `+` en zonder voorloopnul.
    Nederlands 06-nummer `06 12 34 56 78` wordt `31612345678`.
  - Het nummer staat letterlijk in de `href`, niet in JavaScript, zodat de
    knop blijft werken wanneer JavaScript uitstaat.
  - Alleen het nummer vervangen; de `?text=`-boodschap is per pagina anders
    en hoort zo te blijven.
- [ ] KvK-nummer ontvangen en ingevuld
- [ ] Btw-id ontvangen en ingevuld
- [ ] De HTML-commentaarregels met `[VERVANGEN DOOR DIONNE: ...]` verwijderd
- [ ] Controle: `grep -rn "VERVANGEN DOOR DIONNE" *.html` geeft geen resultaat
- [ ] Controle: `grep -rn "wa.me/31000000000" *.html` geeft geen resultaat
- [ ] WhatsApp-knop op een echte telefoon getest (opent WhatsApp met het
      juiste nummer en de juiste voorgevulde tekst)

Waarom een zichtbare placeholder in plaats van `xxxxxxxx`: een reeks x-en ziet
uit als een bewuste keuze en kan ongemerkt live gaan. Een placeholder met een
opdracht erin valt direct op. Het WhatsApp-nummer is met opzet `31000000000`
en geen plausibel nummer, zodat een bezoeker nooit per ongeluk een vreemde
aanschrijft.

## Pre-Deployment (Before pushing to Vercel)

- [ ] Development environment set to `ENVIRONMENT=development` in `.env.local`
- [ ] All HTML files have correct robots meta for current environment
  ```bash
  grep "robots" *.html | sort | uniq
  # Should show: noindex, nofollow (for preview/dev)
  ```
- [ ] No `ENVIRONMENT=production` variable set locally
- [ ] Build script runs without errors
  ```bash
  node build-robots-meta.js
  # Should show: [SEO Build] Done! (no errors)
  ```
- [ ] Git shows clean status (no untracked config files in repo)
  ```bash
  git status
  # Only tracked files should show
  ```
- [ ] `package.json` has build scripts configured
  ```bash
  grep '"build"' package.json
  # Should show: "build": "node build-robots-meta.js"
  ```

## Vercel Deployment (Preview)

### Automatic via Vercel
- [ ] Push to feature branch (creates preview deployment)
  ```bash
  git push origin feature-branch
  ```
- [ ] Wait for Vercel build to complete
  - Check: https://vercel.com/[project]/deployments

### Verification after Preview Deployment
- [ ] Access preview URL: `https://[project]-git-[branch].vercel.app`
- [ ] Check robots meta in preview deployment
  ```bash
  # On your machine:
  curl https://[project]-git-[branch].vercel.app | grep "robots"
  # Should show: noindex, nofollow
  ```
- [ ] Check X-Robots-Tag header
  ```bash
  curl -I https://[project]-git-[branch].vercel.app | grep X-Robots
  # Should show: X-Robots-Tag: noindex, nofollow
  ```
- [ ] Visual inspection
  - Open preview URL in browser
  - Right-click → View Page Source
  - Look for: `<meta name="robots" content="noindex, nofollow">`

## Production Deployment (Manual, when site goes live)

### Step 1: Prepare Production Configuration
- [ ] Review SEO_CONFIGURATION.md section "When Production Goes Live"
- [ ] All tests pass locally (see TESTING_SEO.md)
- [ ] Production domain is live and ready
- [ ] SSL certificate is valid
- [ ] DNS is pointing to Vercel

### Step 2: Set Production Environment Variable in Vercel
- [ ] Go to Vercel project: https://vercel.com/[project]/settings/environment-variables
- [ ] Create new environment variable:
  - Key: `ENVIRONMENT`
  - Value: `production`
  - Environments: **Production only** (NOT preview or development)
  - Click: Add
- [ ] Verify variable is scoped to "Production" only (do NOT apply to preview)

### Step 3: Deploy to Production
- [ ] Merge feature branch to main
  ```bash
  git checkout main
  git merge feature-branch
  git push origin main
  ```
- [ ] Wait for Vercel production deployment
  - Check: https://vercel.com/[project]/deployments
  - Look for: "Production" with green checkmark

### Step 4: Verify Production Configuration
- [ ] Check robots meta on production domain
  ```bash
  curl https://themeyourdream.nl | grep "robots"
  # Should show: index, follow
  ```
- [ ] Check header
  ```bash
  curl -I https://themeyourdream.nl | grep X-Robots
  # Should show either: nothing (preferred) or X-Robots-Tag without noindex
  ```
- [ ] Check all pages
  ```bash
  for page in index box-celebrate box-natural box-warm-cosy box-your-day eventstyling over_dionne themaboxen privacyverklaring; do
    echo "=== $page.html ==="
    curl https://themeyourdream.nl/$page.html 2>/dev/null | grep "robots"
  done
  # All should show: index, follow
  ```
- [ ] Visual verification
  - Open domain in browser
  - Right-click → View Page Source
  - Confirm: `<meta name="robots" content="index, follow">`

### Step 5: Verify Preview Still Protected
- [ ] Create a new preview deployment
  ```bash
  git checkout -b test-branch
  echo "test" >> TESTING_SEO.md
  git add .
  git commit -m "test"
  git push origin test-branch
  ```
- [ ] Wait for Vercel preview build
- [ ] Check preview robots meta
  ```bash
  curl https://[project]-git-test-branch.vercel.app | grep "robots"
  # Should show: noindex, nofollow (NOT index, follow!)
  ```
- [ ] Cleanup test branch
  ```bash
  git checkout main
  git branch -D test-branch
  git push origin --delete test-branch
  ```

## Post-Deployment Monitoring (Production)

### Week 1
- [ ] **Day 1:**
  - Check Google Search Console: robots.txt and robots meta (if created)
  - Verify no errors in crawl stats
  - Check indexing status (should still be "Discovering")
  
- [ ] **Day 3:**
  - Check Bing Webmaster Tools
  - Verify no errors reported
  
- [ ] **Day 7:**
  - Check Search Console again
  - Should see pages in "Discovered URLs" (not "Indexed" yet, that takes time)

### Week 2-4
- [ ] **Ongoing:**
  - Monitor Search Console weekly
  - Look for indexing progress (1-3 weeks is normal)
  - Check for any crawl errors
  - Verify no "noindex" warnings
  - Watch for canonicalization issues

### Troubleshooting During Rollout

If search engines still show preview URLs indexed:
- [ ] Verify production site has correct `index, follow` robots meta
- [ ] Go to Search Console → URL Inspection
- [ ] Request indexing for production pages
- [ ] Mark preview URLs as "Remove" in Search Console

If production site doesn't appear in search results after 3 weeks:
- [ ] Verify robots meta: `index, follow`
- [ ] Verify no other noindex directives in headers
- [ ] Check for robots.txt blocking
- [ ] Verify canonical tags (if added) point to correct domain
- [ ] Submit sitemap to Search Console
- [ ] Check for "Crawl errors" in Search Console
- [ ] Review Bing Webmaster Tools for issues

## Regular Maintenance (Ongoing)

### Monthly
- [ ] Check Search Console indexing stats
  ```
  Search Console → Coverage → Indexed pages
  Should show only production domain pages
  ```
- [ ] Verify no preview URLs indexed
  ```
  Search Console → Coverage → Excluded → Robots tag
  Should show 0 (or only old preview URLs from before)
  ```

### Quarterly
- [ ] Review robots.txt (when added)
- [ ] Review sitemap (when added)
- [ ] Check for any canonicalization issues
- [ ] Monitor for unexpected noindex directives

### Before Major Updates
- [ ] Run local tests (TESTING_SEO.md)
- [ ] Verify development mode
- [ ] Test preview deployment
- [ ] Ensure production config is still intact

## Important Reminders

**Do NOT:**
- ✗ Commit `.env.production` to the repository
- ✗ Set `ENVIRONMENT=production` locally
- ✗ Mix production and preview deployments
- ✗ Index preview URLs (keep them protected)
- ✗ Hardcode domain names in config

**Do:**
- ✓ Keep `.env.local` with `ENVIRONMENT=development` committed
- ✓ Set production variables only in Vercel (Project Settings)
- ✓ Test preview before promoting to production
- ✓ Keep preview deployments at `noindex, nofollow`
- ✓ Use environment variables for environment-specific settings

## Git Workflow

```bash
# Feature development
git checkout -b feature-branch
# Make changes
ENVIRONMENT=development node build-robots-meta.js
git add .
git commit -m "Feature description"
git push origin feature-branch

# Vercel creates preview automatically
# Preview URL: https://[project]-git-feature-branch.vercel.app

# After review/testing
git checkout main
git merge feature-branch
git push origin main

# Vercel updates production automatically
# If ENVIRONMENT=production is set in Vercel settings
# robots meta will be: index, follow
```

## Files to Monitor

Monitor these files for SEO configuration:
- `vercel.json` — Deployment configuration
- `build-robots-meta.js` — Build script logic
- `.env.local` — Development settings
- `package.json` — Build scripts

If any of these are modified accidentally:
```bash
git diff build-robots-meta.js
# Review changes

git checkout -- build-robots-meta.js
# Reset if needed
```

## Success Criteria

### Preview Deployments
- [ ] All preview URLs show: `robots: noindex, nofollow`
- [ ] No preview URLs appear in search results
- [ ] X-Robots-Tag header: `noindex, nofollow`

### Production (When Live)
- [ ] Production URL shows: `robots: index, follow`
- [ ] No `noindex` in any headers
- [ ] Canonical tags point to production (if added)
- [ ] Pages appear in Search Console
- [ ] Pages begin appearing in search results (1-3 weeks)

## Questions or Issues?

Refer to:
1. `SEO_CONFIGURATION.md` — Full documentation
2. `TESTING_SEO.md` — Testing procedures
3. `build-robots-meta.js` — Source code
4. `vercel.json` — Configuration details
