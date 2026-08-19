# Theme Your Dream — Production Readiness Checklist

## Infrastructure & Deployment
- [x] Vercel configured with proper headers (nosniff, SAMEORIGIN, CSP)
- [x] Cache-busting for CSS (query parameters v=timestamp)
- [x] Asset caching: 1 year for images/fonts, 1 hour for HTML
- [x] Security headers implemented (X-Content-Type-Options, Referrer-Policy)
- [x] Robots.txt in place (currently: noindex/nofollow for pre-launch)
- [x] Sitemap.xml complete with all pages

## Content & SEO
- [x] Schema.org JSON-LD (LocalBusiness) on all pages
- [x] Meta descriptions on all pages
- [x] Open Graph tags for social sharing
- [x] Canonical URLs set
- [x] Page titles descriptive (when launched, not generic "Theme Your Dream")

## Accessibility
- [x] Alt-text on all images (verified)
- [x] WCAG AA contrast ratios (verified in prior audit)
- [x] Semantic HTML (header, nav, main, footer)
- [x] Skip-to-content link on all pages
- [x] Focus indicators visible
- [x] prefers-reduced-motion respected
- [x] aria-labels on buttons and interactive elements
- [x] Keyboard navigation working

## Performance
- [x] Lazy loading on all images (loading="lazy")
- [x] Font optimization (preconnect, font-display=swap)
- [x] Script.js cached prefers-reduced-motion (no repeated media queries)
- [x] CSS minification ready for production (71KB baseline)
- [x] No render-blocking resources
- [x] Critical images preload (hero image)

## Functionality
- [x] All internal links valid (validate-links.sh available)
- [x] Mobile menu working
- [x] Dropdown navigation (Styling boxen) working
- [x] Back-to-top button working
- [x] Scroll animations working
- [x] Parallax effect on hero (respects prefers-reduced-motion)

## Configuration
- [x] Centralized business config (config.js: WhatsApp, email, KvK, BTW)
- [x] Environment variables ready (if needed)
- [x] No hardcoded API keys or secrets

## Before Launch (Future)
- [ ] Change robots.txt: Disallow / → Allow /
- [ ] Update X-Robots-Tag in vercel.json: noindex/nofollow → index/follow
- [ ] Verify production domain DNS
- [ ] SSL certificate active
- [ ] Monitor Vercel error logs
- [ ] Test all links on live site
- [ ] Lighthouse audit (target: >95 across all metrics)

## Deployment Command (When Ready)
```bash
# Change robots.txt
sed -i 's/Disallow: \//Allow: \//g' robots.txt

# Update X-Robots-Tag in vercel.json
# (manually: change "noindex, nofollow" to "index, follow")

# Commit
git add robots.txt vercel.json
git commit -m "Production: Enable indexing"
git push
```

---
Last updated: 2026-08-20  
Next audit: Before going live
