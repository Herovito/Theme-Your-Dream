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
  'Dionne-removebg-preview-v2.png': ['dionne-portret']
};

async function main() {
  fs.mkdirSync(path.join(root, 'assets/images'), { recursive: true });
  for (const [source, [name, alt]] of Object.entries(sources)) {
    const input = path.join(root, source);
    const metadata = await sharp(input).rotate().metadata();
    const originalWidth = metadata.autoOrient?.width || metadata.width;
    const widths = [...new Set([480, 960, 1600].map(width => Math.min(width, originalWidth)))];
    const variants = [];
    for (const width of widths) {
      const file = `assets/images/${name}-${width}.webp`;
      const info = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toFile(path.join(root, file));
      variants.push({ file, ...info });
    }
    const fallback = variants.find(v => v.width >= 960) || variants.at(-1);
    for (const page of pages) {
      const file = path.join(root, page);
      let html = fs.readFileSync(file, 'utf8');
      html = html.replace(/<img\b[^>]*>/g, tag => {
        const current = tag.match(/\bsrc="([^"]+)"/)?.[1];
        if (current !== source && !current?.startsWith(`assets/images/${name}-`)) return tag;
        const sizes = tag.includes('mood-card__img')
          ? '(min-width: 1200px) 300px, (min-width: 640px) 45vw, calc(100vw - 48px)'
          : tag.includes('hero-split__img')
            ? '(min-width: 1024px) 60vw, 100vw'
            : tag.includes('over-dionne-quote__photo') ? '(min-width: 900px) 336px, 224px'
              : '(min-width: 1200px) 1088px, calc(100vw - 48px)';
        tag = tag.replace(/\s+(?:srcset|sizes|width|height)="[^"]*"/g, '')
          .replace(/\bsrc="[^"]+"/, `src="${fallback.file}" srcset="${variants.map(v=>`${v.file} ${v.width}w`).join(', ')}" sizes="${sizes}" width="${fallback.width}" height="${fallback.height}"`);
        return alt ? tag.replace(/\balt="[^"]*"/, `alt="${alt}"`) : tag;
      });
      fs.writeFileSync(file, html);
    }
    console.log(`${source}: ${(fs.statSync(input).size / 1024).toFixed(0)} KiB -> ${variants.map(v => `${v.width}w ${(v.size / 1024).toFixed(0)} KiB`).join(', ')}`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
