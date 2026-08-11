# SEO Configuration — Theme Your Dream

## Overview

This document explains how robots meta tags and SEO settings are configured to protect the preview environment from search engine indexing, while preparing for production when the site goes live.

**Current Status:**
- ✓ Preview deployments (Vercel): **noindex, nofollow** (protected)
- ✓ Development (localhost): **noindex, nofollow** (protected)
- ⏳ Production (future): Ready to enable **index, follow** when live

## The Problem

Search engines should NOT index preview or development deployments of Theme Your Dream. They should only index the live production site on the official domain. Without proper configuration:

- Search engines may index Vercel preview URLs (e.g., `theme-your-dream-preview.vercel.app`)
- Users could find outdated preview versions in search results
- Duplicate content across preview and production confuses search ranking
- Preview content gets accidentally indexed as the "real" site

## The Solution

Environment-based configuration ensures:

1. **Preview stays protected** — all Vercel preview deployments get `noindex, nofollow`
2. **Development stays protected** — localhost gets `noindex, nofollow`
3. **Production ready** — can be enabled with one environment variable when live
4. **Automatic** — no manual changes needed per deployment

## How It Works

### Build-Time Modification

The file `build-robots-meta.js` runs during every Vercel deployment:

1. Reads the `ENVIRONMENT` variable (or falls back to `VERCEL_ENV`)
2. If environment is `preview` or `development` → sets robots meta to `noindex, nofollow`
3. If environment is `production` → sets robots meta to `index, follow`
4. Updates all HTML files with the correct robots meta tag

### Environment Detection

- **Vercel Preview:** `VERCEL_ENV` is automatically set to `"preview"` by Vercel
- **Vercel Production:** `VERCEL_ENV` is automatically set to `"production"` by Vercel
- **Local Development:** `ENVIRONMENT` in `.env.local` is set to `"development"`
- **Manual Override:** `ENVIRONMENT` environment variable takes precedence

### Files Modified During Build

The following HTML files are updated with environment-appropriate robots meta:

- `index.html`
- `box-bordeaux-date.html`
- `box-blue-breeze.html`
- `box-beige-bliss.html`
- `box-blush-bloom.html`
- `eventstyling.html`
- `over_dionne.html`
- `privacyverklaring.html`
- `styling-boxes.html`

## Configuration Files

### `vercel.json`
Vercel deployment configuration:
- Sets `build` command to run the robots meta update script
- Adds `X-Robots-Tag` header as a backup (for search engines that respect headers)
- Configures default `ENVIRONMENT=preview` for all preview deployments
- Ready for production configuration (will be updated when going live)

### `.env.local`
Local development configuration:
- `ENVIRONMENT=development` — ensures robots meta = `noindex, nofollow` locally
- Committed to Git so all developers get the same config
- Should NOT be overridden in production

### `.env.production.example`
Template showing how to configure production (when going live):
- Documents the step-by-step process for enabling production
- Shows where to set `ENVIRONMENT=production` in Vercel
- NOT committed; this is a template only

### `package.json`
Build and development scripts:
- `npm run build` — runs the robots meta update script (called by Vercel)
- `npm run dev` — runs locally with environment-appropriate settings
- `npm start` — runs a local development server

### `build-robots-meta.js`
The Node.js build script that:
- Runs during Vercel build process
- Updates robots meta tags in all HTML files
- Logs progress for debugging
- Exits with error if any file can't be processed

## Current Status: Preview Stays Protected

### ✓ Robots Meta Tag
```html
<!-- Current in all files (verified) -->
<meta name="robots" content="noindex, nofollow">
```

### ✓ X-Robots-Tag Header
Vercel adds this header to all responses:
```
X-Robots-Tag: noindex, nofollow
```

This provides defense-in-depth: even if HTML meta tags are somehow removed, the HTTP header tells search engines not to index.

### ✓ Environment Variables
- Preview deployments have `VERCEL_ENV=preview` (automatic)
- Build script detects this and ensures `noindex, nofollow` is set
- No manual configuration needed

## When Production Goes Live

When Theme Your Dream domain is ready and live, follow these steps:

### Step 1: Prepare Production Config
Already done! No code changes needed.

### Step 2: Enable Production Environment in Vercel
1. Go to Vercel project settings
2. Go to **Environment Variables**
3. Create new variable:
   - Name: `ENVIRONMENT`
   - Value: `production`
   - Environments: select **Production** only (NOT preview)
4. Save

### Step 3: Deploy to Production
1. Merge all changes to `main` branch
2. Push to production
3. Vercel will detect `ENVIRONMENT=production` and:
   - Run build script
   - Update all HTML robots meta to `index, follow`
   - Keep preview deployments at `noindex, nofollow`

### Step 4: Verify Production Config
After deployment to production domain:

```bash
# Check robots meta in HTML
curl https://themeyourdream.nl | grep "robots"
# Should show: <meta name="robots" content="index, follow">

# Check header
curl -I https://themeyourdream.nl | grep X-Robots-Tag
# Should show: X-Robots-Tag: index, follow (or just remove the header)
```

### Step 5: Submit to Search Engines
1. Create and test `robots.txt` (optional but recommended)
2. Create XML sitemap (e.g., `sitemap.xml`)
3. Submit to Google Search Console
4. Submit to Bing Webmaster Tools
5. Monitor indexing for 1-2 weeks

## Important Notes

### Robots Meta Tag Behavior
- **noindex, nofollow:** Search engines don't index the page and don't follow links
- **index, follow:** Search engines index the page and follow internal links
- Both are respected by Google, Bing, and other major search engines
- Preview deployments should ALWAYS be `noindex, nofollow`

### Canonical Tags
Currently: Not set (will be added when production is live)

When production goes live, add to each HTML:
```html
<link rel="canonical" href="https://themeyourdream.nl/[page]">
```

This tells search engines which version is the "real" one.

### Open Graph / Meta Properties
Currently: Not set

When production goes live, add:
```html
<meta property="og:url" content="https://themeyourdream.nl/[page]">
<meta property="og:site_name" content="Theme Your Dream">
```

### Sitemap and robots.txt
Currently: Not present

When production goes live, create:
- `robots.txt` — tells search engines what to crawl
- `sitemap.xml` — lists all pages for search engines

### Search Engine Delays
After enabling production:
- Google may take 1-2 weeks to start indexing
- Preview URLs may remain indexed for a few weeks (that's OK—they're marked noindex)
- Monitor Search Console to verify indexing progress

## Testing

### Test Preview Environment (Vercel)
Deploy a preview branch to Vercel:
```bash
# Deploy preview
git push origin feature-branch

# Check Vercel preview URL robots meta
curl https://[project]-git-[branch].vercel.app | grep "robots"
# Should show: noindex, nofollow
```

### Test Development Environment (Local)
Run locally:
```bash
npm run dev
```

Check localhost:
```bash
curl http://localhost:8080 | grep "robots"
# Should show: noindex, nofollow
```

### Simulate Production
```bash
# Set environment variable and run build
ENVIRONMENT=production node build-robots-meta.js

# Check output
grep "robots" index.html
# Should show: index, follow

# Reset to development
ENVIRONMENT=development node build-robots-meta.js
```

## Troubleshooting

### Problem: Preview still shows `noindex` after enabling production
- Check Vercel logs: `vercel logs [project]`
- Verify `ENVIRONMENT=production` is set in Vercel Environment Variables for production
- Rebuild and redeploy

### Problem: Production shows `noindex, nofollow` instead of `index, follow`
- Check that `ENVIRONMENT` variable is set to `production` in Vercel
- Check that variable is scoped to "Production" environment only
- Run build script locally to test: `ENVIRONMENT=production node build-robots-meta.js`

### Problem: Build script fails
- Check Node.js version: `node --version` (must be 18.0.0 or higher)
- Check glob module is available: `npm install glob`
- Run script manually: `node build-robots-meta.js`
- Check Vercel build logs for errors

### Problem: Changes not taking effect
- Clear browser cache: Ctrl+Shift+Delete (hard refresh)
- Check HTML source (right-click → View Page Source)
- Wait for Vercel build to complete (check Vercel dashboard)

## Files Changed/Created

- ✓ `package.json` — Build scripts and dependencies
- ✓ `vercel.json` — Vercel deployment configuration
- ✓ `build-robots-meta.js` — Build-time script to update robots meta
- ✓ `.env.local` — Development environment (committed)
- ✓ `.env.production.example` — Production template (NOT committed)
- ✓ `SEO_CONFIGURATION.md` — This document

## Next Steps

1. **Test locally:**
   ```bash
   npm run dev
   # Verify robots meta = noindex, nofollow
   ```

2. **Test preview deployment:**
   - Push to a feature branch
   - Check Vercel preview URL
   - Verify robots meta = noindex, nofollow

3. **Test production config (when ready):**
   - Follow "When Production Goes Live" section above

4. **Monitor preview deployments:**
   - Ensure no preview URLs get indexed
   - Check Search Console occasionally

## References

- [Google: Block search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Vercel: Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel: Custom Headers](https://vercel.com/docs/edge-network/headers)
- [MDN: Meta name robots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#robots)

## Questions?

See the configuration files for inline comments:
- `vercel.json` — Deployment config
- `build-robots-meta.js` — Build script
- `.env.local` — Development settings
- `.env.production.example` — Production settings
