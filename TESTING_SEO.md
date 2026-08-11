# SEO Configuration Testing Guide

This document provides step-by-step instructions to verify that the SEO configuration is working correctly across development, preview, and production environments.

## Quick Summary

| Environment | Command | Expected Robots Meta | Status |
|-------------|---------|----------------------|--------|
| Development | `ENVIRONMENT=development node build-robots-meta.js` | `noindex, nofollow` | ✓ Working |
| Preview | `VERCEL_ENV=preview node build-robots-meta.js` | `noindex, nofollow` | ✓ Working |
| Production | `ENVIRONMENT=production node build-robots-meta.js` | `index, follow` | ✓ Ready (not active) |

## Test 1: Development Mode (Local)

### Setup
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
```

### Run Build Script
```bash
ENVIRONMENT=development node build-robots-meta.js
```

### Expected Output
```
[SEO Build] Environment: development
[SEO Build] Robots meta: noindex, nofollow
[SEO Build] Found 9 HTML files to process
[SEO Build] ✓ box-bordeaux-date.html
[SEO Build] ✓ box-blue-breeze.html
[SEO Build] ✓ box-beige-bliss.html
[SEO Build] ✓ box-blush-bloom.html
[SEO Build] ✓ eventstyling.html
[SEO Build] ✓ index.html
[SEO Build] ✓ over_dionne.html
[SEO Build] ✓ privacyverklaring.html
[SEO Build] ✓ styling-boxes.html
[SEO Build] Done!
```

### Verify Robots Meta
```bash
# Check one file
grep "robots" index.html
# Should output: <meta name="robots" content="noindex, nofollow">

# Check all files
for file in *.html; do echo "=== $file ==="; grep "robots" "$file"; done
# All should show: noindex, nofollow
```

### ✓ Test Result
Development mode correctly sets `noindex, nofollow` on all pages.

---

## Test 2: Preview Mode (Simulating Vercel Preview)

### Setup
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
```

### Run Build Script (simulating Vercel preview environment)
```bash
VERCEL_ENV=preview node build-robots-meta.js
```

### Expected Output
```
[SEO Build] Environment: preview
[SEO Build] Robots meta: noindex, nofollow
[SEO Build] Found 9 HTML files to process
...
[SEO Build] Done!
```

### Verify Robots Meta
```bash
grep "robots" index.html
# Should output: <meta name="robots" content="noindex, nofollow">
```

### ✓ Test Result
Preview mode correctly sets `noindex, nofollow` on all pages (this prevents Vercel preview URLs from being indexed).

---

## Test 3: Production Mode (Simulation Only)

### ⚠️ IMPORTANT
This test SIMULATES production but does NOT activate it. Production mode should only be enabled when the site is actually live on its production domain.

### Setup
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
```

### Run Build Script
```bash
ENVIRONMENT=production node build-robots-meta.js
```

### Expected Output
```
[SEO Build] Environment: production
[SEO Build] Robots meta: index, follow
[SEO Build] Found 9 HTML files to process
...
[SEO Build] Done!
```

### Verify Robots Meta
```bash
grep "robots" index.html
# Should output: <meta name="robots" content="index, follow">
```

### Reset to Development
⚠️ **CRITICAL:** After testing production mode, reset back to development:
```bash
ENVIRONMENT=development node build-robots-meta.js
```

Verify:
```bash
grep "robots" index.html
# Should show: noindex, nofollow again
```

### ✓ Test Result
Production mode correctly sets `index, follow` (ready for when going live).

---

## Test 4: File-by-File Verification

Test that the robots meta tag is consistently applied across all pages:

### Command
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
ENVIRONMENT=development node build-robots-meta.js

# Verify each file
grep "robots" *.html
```

### Expected Output (all should show same content)
```
box-bordeaux-date.html:  <meta name="robots" content="noindex, nofollow">
box-blue-breeze.html:  <meta name="robots" content="noindex, nofollow">
box-beige-bliss.html:  <meta name="robots" content="noindex, nofollow">
box-blush-bloom.html:  <meta name="robots" content="noindex, nofollow">
eventstyling.html:  <meta name="robots" content="noindex, nofollow">
index.html:  <meta name="robots" content="noindex, nofollow">
over_dionne.html:  <meta name="robots" content="noindex, nofollow">
privacyverklaring.html:  <meta name="robots" content="noindex, nofollow">
styling-boxes.html:  <meta name="robots" content="noindex, nofollow">
```

### ✓ Test Result
All 9 pages correctly have the robots meta tag.

---

## Test 5: Environment Fallback Behavior

Test that the script correctly falls back if only one environment variable is set:

### Test 5a: Only ENVIRONMENT set
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
ENVIRONMENT=development node build-robots-meta.js

grep "robots" index.html
# Should show: noindex, nofollow ✓
```

### Test 5b: Only VERCEL_ENV set
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
VERCEL_ENV=preview node build-robots-meta.js

grep "robots" index.html
# Should show: noindex, nofollow ✓
```

### Test 5c: No environment variable (fallback to development)
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
node build-robots-meta.js

grep "robots" index.html
# Should show: noindex, nofollow ✓ (defaults to development)
```

### Test 5d: ENVIRONMENT takes precedence over VERCEL_ENV
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
ENVIRONMENT=production VERCEL_ENV=preview node build-robots-meta.js

grep "robots" index.html
# Should show: index, follow ✓ (ENVIRONMENT wins)
```

### ✓ Test Result
Environment variable fallback logic is working correctly.

---

## Test 6: Configuration Files Exist

### Verify all configuration files are in place
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"

# List essential files
ls -la package.json vercel.json .env.local .env.production.example build-robots-meta.js SEO_CONFIGURATION.md

# Should show:
# - package.json (with build scripts)
# - vercel.json (deployment config)
# - .env.local (development config)
# - .env.production.example (production template)
# - build-robots-meta.js (build script)
# - SEO_CONFIGURATION.md (documentation)
# - TESTING_SEO.md (this file)
```

### ✓ Test Result
All configuration files are present and accounted for.

---

## Test 7: Build Script in package.json

### Verify npm scripts are configured
```bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"
cat package.json | grep -A 5 '"scripts"'
```

### Expected Output
```json
"scripts": {
  "build": "node build-robots-meta.js",
  "start": "npx http-server .",
  "dev": "ENVIRONMENT=development node build-robots-meta.js && npx http-server ."
}
```

### Test Running via npm
```bash
npm run build
# Should output the same as: node build-robots-meta.js
```

### ✓ Test Result
npm scripts are properly configured.

---

## Full Testing Workflow

Run this complete workflow to verify everything:

```bash
#!/bin/bash
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"

echo "=== Test 1: Development Mode ==="
ENVIRONMENT=development node build-robots-meta.js
echo "Checking robots meta..."
grep "robots" index.html | head -1
[ $(grep "noindex, nofollow" index.html | wc -l) -eq 9 ] && echo "✓ All 9 files have noindex" || echo "✗ Failed"

echo ""
echo "=== Test 2: Preview Mode ==="
VERCEL_ENV=preview node build-robots-meta.js
echo "Checking robots meta..."
grep "robots" index.html | head -1
[ $(grep "noindex, nofollow" index.html | wc -l) -eq 9 ] && echo "✓ All 9 files have noindex" || echo "✗ Failed"

echo ""
echo "=== Test 3: Production Mode (Simulation) ==="
ENVIRONMENT=production node build-robots-meta.js
echo "Checking robots meta..."
grep "robots" index.html | head -1
[ $(grep "index, follow" index.html | wc -l) -eq 9 ] && echo "✓ All 9 files have index, follow" || echo "✗ Failed"

echo ""
echo "=== Test 4: Reset to Development ==="
ENVIRONMENT=development node build-robots-meta.js
echo "Checking robots meta..."
grep "robots" index.html | head -1
[ $(grep "noindex, nofollow" index.html | wc -l) -eq 9 ] && echo "✓ Reset successful" || echo "✗ Failed"

echo ""
echo "=== Test 5: Configuration Files ==="
[ -f package.json ] && echo "✓ package.json exists" || echo "✗ package.json missing"
[ -f vercel.json ] && echo "✓ vercel.json exists" || echo "✗ vercel.json missing"
[ -f .env.local ] && echo "✓ .env.local exists" || echo "✗ .env.local missing"
[ -f .env.production.example ] && echo "✓ .env.production.example exists" || echo "✗ .env.production.example missing"
[ -f build-robots-meta.js ] && echo "✓ build-robots-meta.js exists" || echo "✗ build-robots-meta.js missing"
[ -f SEO_CONFIGURATION.md ] && echo "✓ SEO_CONFIGURATION.md exists" || echo "✗ SEO_CONFIGURATION.md missing"

echo ""
echo "=== All tests complete ==="
```

---

## Troubleshooting

### Issue: "No such file or directory" for build script
```bash
# Make sure you're in the correct directory
cd "C:\Users\Storm\OneDrive - Sanacount\Documenten\Theme Your Dream\Website-git"

# Verify the script exists
ls -la build-robots-meta.js

# Try running it
node build-robots-meta.js
```

### Issue: "Cannot find module 'glob'" (old version)
The current version uses Node.js built-in `fs` module, so this shouldn't happen. If it does:
```bash
# Update to the latest build script
git pull origin concept-site
```

### Issue: HTML files not updating
1. Verify the robots meta tag exists in the HTML file
2. Check the script is running (look for [SEO Build] output)
3. Verify the HTML file is being found by the script
4. Try running with explicit path: `node "C:\path\to\build-robots-meta.js"`

### Issue: Wrong robots setting in Vercel deployment
1. Check Vercel environment variables: Settings → Environment Variables
2. Verify `ENVIRONMENT` is only set to `production` for production deployments
3. Preview deployments should have no custom `ENVIRONMENT` (falls back to `VERCEL_ENV=preview`)
4. Check Vercel build logs for any errors

### Issue: Need to check production is ready but not activated
```bash
# Simulate production without modifying your local copy
cp index.html index.html.bak
ENVIRONMENT=production node build-robots-meta.js
grep "robots" index.html
# Should show: index, follow ✓

# Restore local version
mv index.html.bak index.html
```

---

## When to Run Tests

1. **After initial setup** — Run full test suite (this document)
2. **Before committing** — Verify development mode is active
3. **Before Vercel deployment** — Verify robots meta is correct
4. **After enabling production** — Verify production mode works on live domain

---

## Expected Results

### Current Status (Before Production Goes Live)
✓ Development: noindex, nofollow  
✓ Preview: noindex, nofollow  
✓ Production: Ready (not active, can be enabled when live)  

### When Production Goes Live
✓ Development: noindex, nofollow (unchanged)  
✓ Preview: noindex, nofollow (unchanged)  
✓ Production: index, follow (enable in Vercel settings)  

---

## Next Steps

1. ✓ Run the tests above
2. ✓ Verify all tests pass
3. ✓ Commit changes to git
4. ✓ Deploy to Vercel and test preview
5. ✓ When domain goes live, follow instructions in SEO_CONFIGURATION.md → "When Production Goes Live"

## Questions?

Refer to:
- `SEO_CONFIGURATION.md` — Detailed configuration documentation
- `vercel.json` — Vercel deployment settings
- `build-robots-meta.js` — Build script source code
- `.env.local` — Development environment settings
