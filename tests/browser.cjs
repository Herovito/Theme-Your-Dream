const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const { createServer } = require('../scripts/serve');
const { pages } = require('../site-manifest');
const { build } = require('../build-robots-meta');
const out = path.resolve(__dirname, '../.scratch/browser');
const results = [];
fs.mkdirSync(out, { recursive: true });

(async () => {
  const outputDir = path.join(out, 'build');
  build({ environment: 'preview', siteLive: false, outputDir });
  const server = createServer(outputDir);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    for (const width of (process.env.BROWSER_INTERACTIONS_ONLY ? [] : [320, 375, 768, 1024, 1440, 1920])) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      for (const file of pages) {
        const errors = [], failed = [];
        const onError = e => errors.push(e.message);
        const onResponse = r => { if (r.url().startsWith(origin) && r.status() >= 400) failed.push(r.url()); };
        page.on('pageerror', onError); page.on('response', onResponse);
        await page.goto(origin + '/' + file);
        if (await page.locator('.cookie-banner').isVisible()) await page.getByRole('button', { name: 'Weigeren', exact: true }).click();
        const dots = page.locator('.photo-slider__dot');
        for (let i = 0; i < await dots.count(); i++) {
          await dots.nth(i).click();
          await page.waitForFunction(index => {
            const image = document.querySelectorAll('.photo-slider__slide img')[index];
            return image.complete && image.naturalWidth > 0;
          }, i);
        }
        if (await dots.count()) {
          assert.ok(await page.locator('.photo-slider__btn--next').isDisabled());
          await dots.first().click();
          assert.ok(await page.locator('.photo-slider__btn--prev').isDisabled());
        }
        await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 650) {
            window.scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 50));
          }
        });
        await page.waitForTimeout(1200);
        const state = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src),
          hidden: [...document.querySelectorAll('main h1, main h2, main h3, main .feature-list__item, main .process__step')].filter(e => getComputedStyle(e).opacity === '0').map(e => e.textContent.trim()),
          hero: document.querySelector('.cover__img')?.getAttribute('loading')
        }));
        assert.ok(state.width <= width + 1, `${file} overflows at ${width}: ${state.width}`);
        assert.deepEqual(state.broken, [], `${file}: broken images`);
        assert.deepEqual(state.hidden, [], `${file}: hidden content`);
        assert.deepEqual(errors, [], `${file}: JavaScript errors`);
        assert.deepEqual(failed, [], `${file}: failed local requests`);
        if (file === 'index.html') assert.equal(state.hero, 'eager');
        if (file.startsWith('box-') && width > 900) {
          const layout = await page.evaluate(() => {
            const photo = document.querySelector('.photo-slider-wrapper').getBoundingClientRect();
            const info = document.querySelector('.info-panel').getBoundingClientRect();
            const width = document.documentElement.clientWidth;
            return { photo: photo.width / width, info: info.width / width,
              left: photo.left / width, right: (width - info.right) / width,
              gap: (info.left - photo.right) / width };
          });
          for (const [part, expected] of Object.entries({ left: 0.075, photo: 0.5, gap: 0.05, info: 0.3, right: 0.075 })) {
            assert.ok(Math.abs(layout[part] - expected) < 0.001, `${file} ${width}px ${part}: ${layout[part]}`);
          }
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        let violations = [];
        if (width === 375 || width === 1440) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          violations = axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
        }
        results.push({ file, width, ...state, violations });
        await page.screenshot({ path: path.join(out, `${file}-${width}.png`), fullPage: true });
        console.log(`${file} ${width}px: layout OK, ${violations.length} accessibility violations`);
        page.off('pageerror', onError); page.off('response', onResponse);
      }
      await context.close();
    }
    const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
    for (const file of pages) {
      await page.goto(origin + '/' + file);
        if (await page.locator('.cookie-banner').isVisible()) await page.getByRole('button', { name: 'Weigeren', exact: true }).click();
      await page.getByRole('button', { name: 'Menu openen' }).click();
      await page.getByRole('button', { name: 'Styling boxen', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.nav-link--dropdown').getAttribute('aria-expanded') === 'true');
      assert.ok(await page.locator('.nav-dropdown a').first().isVisible());
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.nav-link--dropdown').getAttribute('aria-expanded'), 'false');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.site-header__menu-toggle').getAttribute('aria-expanded'), 'false');
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(origin + '/');
        if (await page.locator('.cookie-banner').isVisible()) await page.getByRole('button', { name: 'Weigeren', exact: true }).click();
    await page.locator('.nav-link--dropdown').focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.nav-link--dropdown').getAttribute('aria-expanded') === 'true');
    await page.locator('.nav-dropdown a').first().waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Alle styling boxen');
    await page.keyboard.press('Escape');
    await page.mouse.move(0, 500);
    assert.equal(await page.locator('.nav-link--dropdown').getAttribute('aria-expanded'), 'false');

    for (const mode of ['no-js', 'blocked-script', 'reduced-motion']) {
      const context = await browser.newContext({ javaScriptEnabled: mode !== 'no-js', reducedMotion: mode === 'reduced-motion' ? 'reduce' : 'no-preference', viewport: { width: 375, height: 812 } });
      if (mode === 'blocked-script') await context.route('**/script.js*', route => route.abort());
      const p = await context.newPage();
      for (const file of ['privacyverklaring.html', 'eventstyling.html', 'box-beige-bliss.html']) {
        await p.goto(origin + '/' + file);
        if (mode !== 'reduced-motion') assert.ok(await p.locator('.nav-dropdown a').first().isVisible(), `${mode}: nav inaccessible`);
        const opacity = await p.locator('main .feature-list__item').first().evaluate(e => getComputedStyle(e).opacity);
        assert.equal(opacity, '1', `${mode}: hidden list`);
      }
      await context.close();
    }
    fs.writeFileSync(path.join(out, process.env.BROWSER_INTERACTIONS_ONLY ? 'interactions.json' : 'results.json'), JSON.stringify(results, null, 2));
    const violations = results.filter(r => r.violations.length);
    assert.deepEqual(violations, [], 'Accessibility failures: see .scratch/browser/results.json');
    console.log(process.env.BROWSER_INTERACTIONS_ONLY ? 'All interaction and fallback checks passed.' : 'All layouts, links, menus, keyboard, fallback and accessibility checks passed.');
  } finally {
    fs.writeFileSync(path.join(out, process.env.BROWSER_INTERACTIONS_ONLY ? 'interactions.json' : 'results.json'), JSON.stringify(results, null, 2));
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
