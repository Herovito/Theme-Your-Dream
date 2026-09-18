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
