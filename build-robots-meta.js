#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pages, domain } = require('./site-manifest');
const business = require('./config');
const { references, validateSite } = require('./scripts/validate-links');
const root = __dirname;

function build({ environment = process.env.VERCEL_ENV || process.env.ENVIRONMENT || 'development',
  siteLive = process.env.SITE_LIVE === 'true', outputDir = path.join(root, '.vercel/output') } = {}) {
  // Fail closed: only an explicitly launched production build may be indexed.
  const live = environment === 'production' && siteLive === true;
  const measurementId = business.analyticsMeasurementId || '';
  if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) throw new Error('Invalid GA4 measurement ID');
  const robots = live ? 'index, follow' : 'noindex, nofollow';
  const target = path.resolve(outputDir);
  const relative = path.relative(root, target);
  if (relative !== path.join('.vercel', 'output') && !relative.startsWith('.scratch' + path.sep)) {
    throw new Error('Build output must be .vercel/output or a test directory inside .scratch');
  }
  // The checked absolute target is generated output, never source or .git.
  fs.rmSync(target, { recursive: true, force: true });
  const staticDir = path.join(target, 'static');
  fs.mkdirSync(staticDir, { recursive: true });
  const assets = new Set(['og-image.jpg', 'assets/fonts/Work-Sans-OFL.txt', 'assets/fonts/Rouge-Script-OFL.txt']);
  for (const page of pages) {
    let html = fs.readFileSync(path.join(root, page), 'utf8')
      .replace(/data-ga-id="[^"]*"/g, 'data-ga-id="' + (live ? measurementId : '') + '"')
      .replace(/(<meta name="robots" content=")[^"]+/, '$1' + robots)
      .replace(/(<span data-business="(kvk|btwId)">)[^<]+/g, (_, start, key) => start + business[key])
      .replace(/https:\/\/wa\.me\/\d+/g, 'https://wa.me/' + business.whatsapp)
      .replace(/mailto:[^"\s]+/g, 'mailto:' + business.email)
      .replace(/(class="site-footer__email"[^>]*>)[\s\S]*?(<\/a>)/g, '$1' + business.email + '$2')
      .replace(/(<strong>E-mailadres(?: voor privacyvragen)?:<\/strong>)\s*[^<]+/g, '$1 ' + business.email)
      .replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, start, json, end) => {
        const data = JSON.parse(json);
        if (data['@type'] === 'LocalBusiness') {
          data.telephone = '+' + business.whatsapp;
          data.email = business.email;
          data.sameAs = [business.instagram, business.tiktok];
        }
        return start + '\n' + JSON.stringify(data, null, 2) + '\n' + end;
      });
    fs.writeFileSync(path.join(staticDir, page), html);
    for (const ref of references(html)) {
      const file = ref.split(/[?#]/)[0];
      if (!file || /^(?:[a-z]+:|\/\/)/i.test(file)) continue;
      const decoded = decodeURIComponent(file);
      if (pages.includes(decoded)) continue;
      if (!/\.(?:css|js|png|jpg|jpeg|webp|svg|woff2?|ttf|pdf)$/i.test(decoded)) throw new Error(`Unexpected public asset: ${decoded}`);
      assets.add(decoded);
    }
  }
  for (const asset of assets) {
    const source = path.resolve(root, asset);
    if (!source.startsWith(root + path.sep)) throw new Error('Asset outside site root');
    // Include local dependencies of stylesheets, such as self-hosted fonts.
    if (asset.endsWith('.css')) {
      const css = fs.readFileSync(source, 'utf8');
      for (const match of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) {
        const ref = match[1];
        if (/^(?:[a-z]+:|\/\/|#)/i.test(ref)) continue;
        const dependency = path.resolve(path.dirname(source), decodeURIComponent(ref.split(/[?#]/)[0]));
        if (!dependency.startsWith(root + path.sep)) throw new Error('CSS asset outside site root');
        assets.add(path.relative(root, dependency).split(path.sep).join('/'));
      }
    }
    const destination = path.join(staticDir, asset);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
  fs.writeFileSync(path.join(staticDir, 'robots.txt'), `User-agent: *\n${live ? 'Allow' : 'Disallow'}: /\n\nSitemap: ${domain}/sitemap.xml\n`);
  fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map(page => `  <url><loc>${domain}/${page === 'index.html' ? '' : page}</loc></url>`).join('\n') + '\n</urlset>\n');
  const headers = {
    'X-Robots-Tag': robots,
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
  // Vercel Build Output API v3: headers and files share the same launch state.
  fs.writeFileSync(path.join(target, 'config.json'), JSON.stringify({
    version: 3,
    routes: [{ src: '/.*', headers, continue: true }, { src: '/', dest: '/index.html' }, { handle: 'filesystem' }]
  }, null, 2) + '\n');
  const errors = validateSite(staticDir, pages);
  if (errors.length) throw new Error(errors.join('\n'));
  return { staticDir, live, robots, assets: assets.size };
}

module.exports = { build };
if (require.main === module) {
  try { console.log('Build ready:', build()); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
