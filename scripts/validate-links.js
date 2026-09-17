'use strict';

const fs = require('node:fs');
const path = require('node:path');

function references(html) {
  const result = [];
  for (const tag of html.matchAll(/<(?:a|link|img|script|source)\b[^>]*>/gi)) {
    for (const attr of tag[0].matchAll(/\b(href|src|srcset)\s*=\s*["']([^"']+)["']/gi)) {
      if (attr[1].toLowerCase() === 'srcset') result.push(...attr[2].split(',').map(item => item.trim().split(/\s+/)[0]));
      else result.push(attr[2]);
    }
  }
  return result;
}

function exactFile(root, relative) {
  let current = root;
  for (const part of relative.split(/[\\/]/)) {
    if (!part || part === '.' || part === '..' || !fs.existsSync(current) || !fs.statSync(current).isDirectory()) return false;
    if (!fs.readdirSync(current).includes(part)) return false;
    current = path.join(current, part);
  }
  return fs.statSync(current).isFile();
}

function validateSite(root, pages) {
  const errors = [];
  for (const page of pages) {
    if (!exactFile(root, page)) { errors.push(`${page}: missing page`); continue; }
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    for (const ref of references(html)) {
      if (/^(?:[a-z]+:|\/\/)/i.test(ref)) continue;
      let url;
      try { url = new URL(ref, 'https://site.test/' + page); } catch { errors.push(`${page}: invalid URL ${ref}`); continue; }
      const target = decodeURIComponent(url.pathname.slice(1)) || 'index.html';
      if (!exactFile(root, target)) { errors.push(`${page}: missing or incorrect case: ${ref}`); continue; }
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = fs.readFileSync(path.join(root, target), 'utf8');
        const ids = [...targetHtml.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
        if (!ids.includes(decodeURIComponent(url.hash.slice(1)))) errors.push(`${page}: missing anchor ${ref}`);
      }
    }
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { errors.push(`${page}: invalid JSON-LD`); }
    }
    if (/\[invullen\]|\[KvK\]|VERVANGEN DOOR DIONNE/.test(html)) errors.push(`${page}: unresolved placeholder`);
  }
  return errors;
}

module.exports = { references, validateSite, exactFile };
if (require.main === module) {
  const root = path.resolve(process.argv[2] || path.join(__dirname, '../.vercel/output/static'));
  const errors = validateSite(root, require('../site-manifest').pages);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('All page, asset, anchor and JSON-LD checks passed.');
}
