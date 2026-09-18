'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { exactFile } = require('./validate-links');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
function createServer(outputDir = path.resolve(__dirname, '../.vercel/output')) {
  const root = path.join(outputDir, 'static');
  const config = JSON.parse(fs.readFileSync(path.join(outputDir, 'config.json')));
  return http.createServer((req, res) => {
    let name;
    try { name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname.slice(1)) || 'index.html'; }
    catch { res.writeHead(400); res.end('Invalid URL'); return; }
    for (const [key, value] of Object.entries(config.routes[0].headers)) res.setHeader(key, value);
    if (!exactFile(root, name)) { res.writeHead(404); res.end('Pagina niet gevonden'); return; }
    const extension = path.extname(name).toLowerCase();
    res.setHeader('Content-Type', extension === '.woff2' ? 'font/woff2' : types[extension] || 'application/octet-stream');
    fs.createReadStream(path.join(root, name)).pipe(res);
  });
}
module.exports = { createServer };
if (require.main === module) {
  const port = Number(process.env.PORT || 4173);
  createServer().listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`));
}
