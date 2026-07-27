import { spawn } from 'node:child_process';
const PORT = 9336;
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`,
  `--user-data-dir=C:\\Users\\Storm\\AppData\\Local\\Temp\\claude-p4-${Date.now()}`,
  '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function getWs() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const p = (await r.json()).find(t => t.type === 'page'); if (p) return p.webSocketDebuggerUrl; } catch {}
    await sleep(250);
  } throw new Error('no chrome');
}
const ws = new WebSocket(await getWs());
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
const send = (m, p = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }))?.result?.value;

await send('Page.enable'); await send('Runtime.enable');

for (const [label, w, h] of [['DESKTOP 1440', 1440, 900], ['MOBIEL 390', 390, 844]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
  await send('Page.navigate', { url: 'http://127.0.0.1:3456/index.html' });
  await sleep(1800);

  // Staan de stappen naast elkaar of onder elkaar?
  const layout = await ev(`(() => {
    const s = [...document.querySelectorAll('.process__step')];
    return { tops: s.map(e => Math.round(e.getBoundingClientRect().top)),
             cols: getComputedStyle(document.querySelector('.process')).gridTemplateColumns };
  })()`);

  // Scroll de werkwijze in beeld en meet WANNEER elke stap reveal-in krijgt
  const timing = await ev(`(async () => {
    const steps = [...document.querySelectorAll('.process__step')];
    const t0 = performance.now();
    const stamps = steps.map(() => null);
    const check = () => steps.forEach((s, i) => {
      if (stamps[i] === null && s.classList.contains('reveal-in')) stamps[i] = Math.round(performance.now() - t0);
    });
    document.querySelector('.process').scrollIntoView({ block: 'center', behavior: 'instant' });
    for (let k = 0; k < 90; k++) { check(); await new Promise(r => requestAnimationFrame(r)); }
    return stamps;
  })()`);

  // Foto-maskeronthulling: al klaar terwijl hij nog onder de vouw staat?
  await send('Page.navigate', { url: 'http://127.0.0.1:3456/index.html' });
  await sleep(1800);
  const photo = await ev(`(() => {
    const imgs = [...document.querySelectorAll('.site-photo--landscape')];
    const vh = innerHeight;
    return imgs.map(i => { const r = i.getBoundingClientRect(); const cs = getComputedStyle(i);
      return { topVh: Math.round(r.top / vh * 10) / 10, opacity: cs.opacity, clip: cs.clipPath,
               revealIn: i.classList.contains('reveal-in') }; });
  })()`);

  console.log(`\n===== ${label} =====`);
  console.log('grid-kolommen :', layout.cols);
  console.log('top per stap  :', JSON.stringify(layout.tops));
  console.log('reveal-in op  :', JSON.stringify(timing), 'ms na scroll');
  console.log('stappen echt na elkaar? ', new Set(timing).size > 1 ? 'JA' : 'NEE (allemaal tegelijk)');
  console.log('foto-onthulling (zonder scrollen):');
  photo.forEach(p => console.log(`   top=${String(p.topVh).padStart(5)}vh opacity=${p.opacity} clip=${p.clip} reveal-in=${p.revealIn}`));
}

// reduced motion op de foto's
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url: 'http://127.0.0.1:3456/index.html' });
await sleep(1500);
const rm = await ev(`(() => {
  const p = [...document.querySelectorAll('.site-photo--landscape')].map(i => getComputedStyle(i).opacity + '/' + getComputedStyle(i).clipPath);
  const s = [...document.querySelectorAll('.process__step')].map(i => getComputedStyle(i).opacity);
  return { photos: [...new Set(p)], steps: [...new Set(s)] };
})()`);
console.log('\n===== REDUCED MOTION =====');
console.log(JSON.stringify(rm));

ws.close(); chrome.kill(); process.exit(0);
