'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { build } = require('../build-robots-meta');
const { pages } = require('../site-manifest');
const business = require('../config');
const { validateSite } = require('../scripts/validate-links');
const base = path.resolve(__dirname, '../.scratch/build-tests');

for (const [environment, siteLive, indexed] of [
  ['development', false, false], ['preview', true, false],
  ['production', false, false], ['production', true, true], ['unknown', true, false]
]) {
  test(`${environment}, SITE_LIVE=${siteLive}: consistent robots, header and public output`, () => {
    const outputDir = path.join(base, `${environment}-${siteLive}`);
    const result = build({ environment, siteLive, outputDir });
    const expected = indexed ? 'index, follow' : 'noindex, nofollow';
    assert.equal(result.robots, expected);
    const headers = JSON.parse(fs.readFileSync(path.join(outputDir, 'config.json'))).routes[0].headers;
    assert.equal(headers['X-Robots-Tag'], expected);
    assert.equal(headers['Cache-Control'], 'public, max-age=0, must-revalidate');
    const robots = fs.readFileSync(path.join(result.staticDir, 'robots.txt'), 'utf8');
    assert.ok(robots.includes(indexed ? '\nAllow: /' : '\nDisallow: /'));
    const titles = new Set();
    for (const page of pages) {
      const html = fs.readFileSync(path.join(result.staticDir, page), 'utf8');
      assert.ok(html.includes(`<meta name="robots" content="${expected}">`));
      assert.ok(html.includes('script.js?v='));
      assert.ok(!/\[invullen\]|Ã|VERVANGEN DOOR DIONNE/.test(html.replace(/<!--[\s\S]*?-->/g, '')));
      titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
    }
    assert.equal(titles.size, pages.length);
    for (const file of ['_mockup_preview.html', '_fotoshoot_preview.html', 'index-berry-preview.html', 'wave_final.html', 'config.js', 'README.md', 'Algemene voorwaarden Theme Your Dream.docx']) {
      assert.equal(fs.existsSync(path.join(result.staticDir, file)), false, file);
    }
    assert.deepEqual(validateSite(result.staticDir, pages), []);
    fs.writeFileSync(path.join(result.staticDir, 'old-preview.html'), 'stale');
    build({ environment, siteLive, outputDir });
    assert.equal(fs.existsSync(path.join(result.staticDir, 'old-preview.html')), false);
  });
}

test('business configuration updates HTML links, legal details and LocalBusiness JSON-LD', () => {
  const original = { ...business };
  try {
    Object.assign(business, { kvk: '12345678', btwId: 'NLTEST', whatsapp: '31600000000', email: 'test@example.test' });
    const { staticDir } = build({ outputDir: path.join(base, 'business') });
    const html = fs.readFileSync(path.join(staticDir, 'privacyverklaring.html'), 'utf8');
    assert.ok(html.includes('data-business="kvk">12345678'));
    assert.ok(html.includes('data-business="btwId">NLTEST'));
    assert.ok(html.includes('mailto:test@example.test'));
    assert.ok(html.includes('"telephone": "+31600000000"'));
    assert.ok(!html.includes(original.email));
  } finally { Object.assign(business, original); }
});

test('validator reports missing images, wrong case and invalid anchors', () => {
  const fixture = path.join(base, 'invalid-links');
  fs.mkdirSync(fixture, { recursive: true });
  fs.writeFileSync(path.join(fixture, 'index.html'), '<img src="missing.webp"><a href="Index.html">Home</a><a href="#missing">Jump</a><img srcset="also-missing.webp 480w">');
  const errors = validateSite(fixture, ['index.html']);
  assert.equal(errors.length, 4);
});

test('build refuses an output path pointing to source', () => {
  assert.throws(() => build({ outputDir: path.resolve(__dirname, '..') }), /Build output must/);
});

test('Analytics ID is exposed only in live production and rejects invalid IDs', () => {
  const original = business.analyticsMeasurementId;
  try {
    business.analyticsMeasurementId = 'G-TEST12345';
    for (const [environment, siteLive, expected] of [['preview', true, ''], ['production', false, ''], ['production', true, 'G-TEST12345']]) {
      const { staticDir } = build({ environment, siteLive, outputDir: path.join(base, `consent-${environment}-${siteLive}`) });
      assert.ok(fs.readFileSync(path.join(staticDir, 'index.html'), 'utf8').includes(`data-ga-id="${expected}"`));
    }
    business.analyticsMeasurementId = 'invalid';
    assert.throws(() => build({ outputDir: path.join(base, 'invalid-analytics') }), /Invalid GA4/);
  } finally { business.analyticsMeasurementId = original; }
});

test('published pages load local fonts with all font files and licenses included', () => {
  const { staticDir } = build({ outputDir: path.join(base, 'local-fonts') });
  for (const page of pages) {
    const html = fs.readFileSync(path.join(staticDir, page), 'utf8');
    assert.ok(html.includes('assets/fonts/fonts.css?v=1'));
    assert.ok(!/fonts\.(?:googleapis|gstatic)\.com/.test(html));
  }
  const css = fs.readFileSync(path.join(staticDir, 'assets/fonts/fonts.css'), 'utf8');
  for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
    const font = fs.readFileSync(path.join(staticDir, 'assets/fonts', match[1]));
    assert.equal(font.subarray(0, 4).toString(), 'wOF2');
  }
  for (const license of ['Work-Sans-OFL.txt', 'Rouge-Script-OFL.txt']) {
    assert.ok(fs.readFileSync(path.join(staticDir, 'assets/fonts', license), 'utf8').includes('SIL OPEN FONT LICENSE'));
  }
});

test('image script leaves every approved image tag exactly as it is', async () => {
  const sharp = require('sharp');
  const { syncImage, sources } = require('../scripts/optimize-images');
  const dir = path.resolve(__dirname, '../assets/images');
  const byName = new Map();
  for (const file of fs.readdirSync(dir)) {
    const match = file.match(/^(.+)-(\d+)\.webp$/);
    if (!match) continue;
    const { width, height } = await sharp(path.join(dir, file)).metadata();
    if (!byName.has(match[1])) byName.set(match[1], []);
    byName.get(match[1]).push({ file: `assets/images/${file}`, width, height });
  }
  let checked = 0;
  for (const page of pages) {
    const html = fs.readFileSync(path.resolve(__dirname, '..', page), 'utf8');
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      const src = tag.match(/\bsrc="(assets\/images\/[^"]+)"/)?.[1];
      if (!src) continue;
      const name = path.basename(src).replace(/-\d+\.webp$/, '');
      const variants = byName.get(name).sort((a, b) => a.width - b.width);
      const [, alt, options] = Object.values(sources).find(entry => entry[0] === name) || [];
      const fallback = variants.find(v => v.width >= 960) || variants.at(-1);
      assert.equal(syncImage(tag, { source: '', name, alt, options, variants, fallback }), tag, `${page}: ${src}`);
      checked++;
    }
  }
  assert.ok(checked >= 35);
});

test('image script only refreshes srcset and fills in missing attributes', () => {
  const { syncImage } = require('../scripts/optimize-images');
  const variants = [480, 960].map(width => ({ file: `assets/images/demo-${width}.webp`, width, height: width / 2 }));
  const context = { source: 'demo.jpg', name: 'demo', alt: undefined, variants, fallback: variants[1] };
  const srcset = 'assets/images/demo-480.webp 480w, assets/images/demo-960.webp 960w';
  const tuned = `<img src="assets/images/demo-480.webp" srcset="stale.webp 1w" sizes="50vw" width="7" height="3" alt="Demo">`;
  assert.equal(syncImage(tuned, context), `<img src="assets/images/demo-480.webp" srcset="${srcset}" sizes="50vw" width="7" height="3" alt="Demo">`);
  const bare = `<img loading="lazy"\n  src="demo.jpg"\n  alt="Demo" class="x">`;
  assert.equal(syncImage(bare, context), `<img loading="lazy"\n  src="assets/images/demo-960.webp" srcset="${srcset}" sizes="(min-width: 1200px) 1088px, calc(100vw - 48px)" width="960" height="480"\n  alt="Demo" class="x">`);
  const foreign = '<img src="assets/images/other-960.webp" alt="Other">';
  assert.equal(syncImage(foreign, context), foreign);
});
