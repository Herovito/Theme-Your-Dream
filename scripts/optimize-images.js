'use strict';

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { pages } = require('../site-manifest');
const root = path.resolve(__dirname, '..');
const sources = {
  'images/Beige Bliss.JPG': ['beige-bliss', 'Gedekte tafel in beige en bruine tinten met bloemen en gouden details'],
  'images/Blue Breeze.JPG': ['blue-breeze', 'Tafelstyling in blauwe tinten met bloemen en kaarsen'],
  'images/Blush Bloom.JPG': ['blush-bloom', 'Tafelstyling in roze tinten met bloemen en decoratie'],
  'images/Bordeaux Date.jpeg': ['bordeaux-date', 'Gedekte tafel voor twee met bordeauxrode accenten, bloemen en kaarsen'],
  'Fotoshoot Berry One/WhatsApp Image 2026-08-06 at 16.13.13 (8).jpeg': ['dionne-hero'],
  'Fotoshoot Berry One/berry-one-backdrop-setup.jpg': ['berry-backdrop'],
  'Fotoshoot Berry One/berry-one-flowers-arrangement.jpg': ['berry-bloemen'],
  'Fotoshoot Berry One/berry-one-table-detail.jpg': ['berry-tafeldetail'],
  'Fotoshoot Berry One/berry-one-table-eventstyling.jpg': ['berry-eventstyling'],
  'Fotoshoot Berry One/berry-one-table-flowers-detail.jpg': ['berry-bloemendetail'],
  'Fotoshoot Berry One/berry-one-table-perspective.jpg': ['berry-tafel'],
  'Themabox.png': ['styling-box'],
  'dionne-aan-het-werk-1344.jpg': ['dionne-aan-het-werk'],
  'Fotoshoot Berry One/dionne-bord.jpeg': ['dionne-bord', 'Dionne met het ronde Theme Your Dream-bord'],
  'Fotoshoot Berry One/WhatsApp Image 2026-08-06 at 16.13.13 (19).jpeg': ['dionne-styling', 'Dionne zet een kaars recht op een gedekte feesttafel in een feesttent'],
  'Dionne.jpeg': ['dionne-portret', null, {
    cutout: 'Dionne-removebg-preview-v2.png',
    widths: [408, 816, 900],
    fallbackWidth: 408,
    sizes: '(min-width: 1100px) min(23vw, 24rem), (min-width: 700px) min(33vw, 20rem), min(78vw, 19rem)'
  }]
};

// Portret op transparante achtergrond: kleur en detail komen uit het 900px brede origineel,
// het bestaande vrijstaande beeld levert het alfamasker. Breedtes die het vrijstaande beeld
// zelf haalt (408px) komen rechtstreeks daaruit.
async function portraitVariants(input, { cutout, widths }, name) {
  const cutoutPath = path.join(root, cutout);
  const cutoutWidth = (await sharp(cutoutPath).metadata()).width;
  const { width: W, height: H } = await sharp(input).metadata();
  const original = await sharp(input).removeAlpha().raw().toBuffer();
  const cutoutUp = await sharp(cutoutPath).resize(W, H, { kernel: 'cubic' }).ensureAlpha().raw().toBuffer();
  const rawAlpha = Buffer.alloc(W * H), solid = Buffer.alloc(W * H), alpha = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) {
    rawAlpha[i] = cutoutUp[i * 4 + 3];
    solid[i] = rawAlpha[i] >= 250 ? 255 : 0;
  }
  const smooth = await sharp(rawAlpha, { raw: { width: W, height: H, channels: 1 } })
    .blur(2.4).extractChannel(0).raw().toBuffer();
  for (let i = 0; i < W * H; i++) {
    const t = Math.min(1, Math.max(0, (smooth[i] / 255 - 0.28) / (0.72 - 0.28)));
    alpha[i] = Math.round(255 * t * t * (3 - 2 * t));
  }
  const core = await sharp(solid, { raw: { width: W, height: H, channels: 1 } })
    .blur(2).threshold(252).blur(1.5).extractChannel(0).raw().toBuffer();
  const pixels = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const weight = core[i] / 255;
    for (let c = 0; c < 3; c++) pixels[i * 4 + c] = Math.round(weight * original[i * 3 + c] + (1 - weight) * cutoutUp[i * 4 + c]);
    pixels[i * 4 + 3] = alpha[i];
  }
  const composite = sharp(pixels, { raw: { width: W, height: H, channels: 4 } });
  const variants = [];
  for (const width of widths) {
    const file = `assets/images/${name}-${width}.webp`;
    const target = path.join(root, file);
    const info = width <= cutoutWidth
      ? await sharp(cutoutPath).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(target)
      : await composite.clone().resize(width, Math.round(width * H / W), { kernel: 'lanczos3' })
        .webp({ quality: 82, alphaQuality: 100, effort: 5 }).toFile(target);
    variants.push({ file, ...info });
  }
  return variants;
}

// De HTML blijft de bron van waarheid voor de context van iedere afbeelding: gekozen `src`,
// `sizes`, `width` en `height` zijn goedgekeurde, handmatig afgestemde waarden en worden nooit
// overschreven. Het script houdt alleen `srcset` gelijk aan de gegenereerde varianten en vult
// ontbrekende attributen aan met een standaardwaarde. Een tag die al klopt blijft daardoor
// byte voor byte gelijk, ook qua opmaak, en een tweede run levert nooit een diff op.
function syncImage(tag, { source, name, alt, options = {}, variants, fallback }) {
  const current = tag.match(/\bsrc="([^"]+)"/)?.[1];
  if (current !== source && !current?.startsWith(`assets/images/${name}-`)) return tag;
  const chosen = variants.find(v => v.file === current) || fallback;
  const defaultSizes = options.sizes
    || (name.startsWith('gallery-')
    ? '(min-width: 901px) 50vw, calc(100vw - 48px)'
    : tag.includes('mood-card__img')
    ? '(min-width: 1200px) 300px, (min-width: 640px) 45vw, calc(100vw - 48px)'
    : tag.includes('hero-split__img')
      ? '(min-width: 1024px) 60vw, 100vw'
      : tag.includes('over-dionne-quote__photo') ? '(min-width: 900px) 336px, 224px'
        : '(min-width: 1200px) 1088px, calc(100vw - 48px)');
  const srcset = variants.map(v => `${v.file} ${v.width}w`).join(', ');
  const has = (html, key) => new RegExp(`\\s${key}="`).test(html);
  const insertAfter = (html, anchor, key, value) =>
    html.replace(new RegExp(`(\\s${anchor}="[^"]*")`), (match) => `${match} ${key}="${value}"`);
  let out = chosen.file === current ? tag : tag.replace(/\bsrc="[^"]+"/, () => `src="${chosen.file}"`);
  out = has(out, 'srcset')
    ? out.replace(/(\ssrcset=")[^"]*(")/, (match, open, close) => `${open}${srcset}${close}`)
    : insertAfter(out, 'src', 'srcset', srcset);
  if (!has(out, 'sizes')) out = insertAfter(out, 'srcset', 'sizes', defaultSizes);
  if (!has(out, 'width')) out = insertAfter(out, 'sizes', 'width', chosen.width);
  if (!has(out, 'height')) out = insertAfter(out, 'width', 'height', chosen.height);
  return alt ? out.replace(/\balt="[^"]*"/, () => `alt="${alt}"`) : out;
}

async function main() {
  fs.mkdirSync(path.join(root, 'assets/images'), { recursive: true });
  const galleryRoot = path.join(root, 'images/boxen');
  if (fs.existsSync(galleryRoot)) {
    for (const box of fs.readdirSync(galleryRoot)) {
      for (const image of fs.readdirSync(path.join(galleryRoot, box))) {
        if (!/\.(?:jpe?g|png)$/i.test(image)) continue;
        sources[`images/boxen/${box}/${image}`] = ['gallery-' + path.parse(image).name];
      }
    }
  }
  for (const [source, [name, alt, options = {}]] of Object.entries(sources)) {
    if (process.argv.includes('--gallery') && !source.startsWith('images/boxen/')) continue;
    const input = path.join(root, source);
    const variants = [];
    if (options.cutout) {
      variants.push(...await portraitVariants(input, options, name));
    } else {
      const metadata = await sharp(input).rotate().metadata();
      const originalWidth = metadata.autoOrient?.width || metadata.width;
      const widths = [...new Set([480, 960, 1600].map(width => Math.min(width, originalWidth)))];
      for (const width of widths) {
        const file = `assets/images/${name}-${width}.webp`;
        const info = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
          .webp({ quality: 82, effort: 5 }).toFile(path.join(root, file));
        variants.push({ file, ...info });
      }
    }
    const fallback = options.fallbackWidth
      ? variants.find(v => v.width === options.fallbackWidth)
      : variants.find(v => v.width >= 960) || variants.at(-1);
    for (const page of pages) {
      const file = path.join(root, page);
      const before = fs.readFileSync(file, 'utf8');
      const html = before.replace(/<img\b[^>]*>/g, tag => syncImage(tag, { source, name, alt, options, variants, fallback }));
      if (html !== before) fs.writeFileSync(file, html);
    }
    console.log(`${source}: ${(fs.statSync(input).size / 1024).toFixed(0)} KiB -> ${variants.map(v => `${v.width}w ${(v.size / 1024).toFixed(0)} KiB`).join(', ')}`);
  }
}

if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });

module.exports = { syncImage, sources };
