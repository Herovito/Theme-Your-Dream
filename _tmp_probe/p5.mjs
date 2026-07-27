import { spawn } from 'node:child_process';
const PORT = 9337;
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`,
  `--user-data-dir=C:\\Users\\Storm\\AppData\\Local\\Temp\\claude-p5-${Date.now()}`,
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
ws.addEventListener('message', (e2) => { const m = JSON.parse(e2.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
const send = (m, p = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }))?.result?.value;

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://127.0.0.1:3456/index.html' });
await sleep(2500);

// A. Welke animatie wint er op de verhaalfoto's, en zijn ze zichtbaar?
const a = await ev(`(() => [...document.querySelectorAll('.site-photo--landscape')].map(i => {
  const cs = getComputedStyle(i); const r = i.getBoundingClientRect();
  return {
    classes: i.className,
    anims: i.getAnimations().map(x => x.animationName + ':' + x.playState),
    clip: cs.clipPath, opacity: cs.opacity,
    zichtbareHoogte: Math.round(r.height),
    complete: i.complete
  };
}))()`);
console.log('=== A. VERHAALFOTOS HOMEPAGE (desktop, na 2,5s) ===');
a.forEach((p, i) => {
  const onzichtbaar = p.clip.includes('100%');
  console.log(`foto ${i + 1}: ${onzichtbaar ? '>>> ONZICHTBAAR <<<' : 'zichtbaar'} clip=${p.clip} opacity=${p.opacity}`);
  console.log(`         animaties: ${JSON.stringify(p.anims)}`);
});

// Screenshot van de eerste verhaalsectie als bewijs
await ev(`document.querySelector('.story-section').scrollIntoView({block:'start', behavior:'instant'})`);
await sleep(600);
const shot = await send('Page.captureScreenshot', { format: 'png' });
const fs = await import('node:fs');
fs.writeFileSync('C:\\Users\\Storm\\OneDrive - Sanacount\\Documenten\\Theme Your Dream\\Website-git\\_tmp_probe\\story.png', Buffer.from(shot.data, 'base64'));
console.log('screenshot -> _tmp_probe/story.png');

// B. Reduced motion: is de werkwijze zichtbaar?
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url: 'http://127.0.0.1:3456/index.html' });
await sleep(2000);
const b = await ev(`(() => {
  const steps = [...document.querySelectorAll('.process__step')];
  return steps.map(s => ({ opacity: getComputedStyle(s).opacity, revealIn: s.classList.contains('reveal-in'),
    anims: s.getAnimations().length, tekst: s.querySelector('.process__step-label')?.textContent }));
})()`);
console.log('\n=== B. WERKWIJZE BIJ prefers-reduced-motion ===');
b.forEach(s => console.log(`"${s.tekst}": opacity=${s.opacity} reveal-in=${s.revealIn} animaties=${s.anims} ${s.opacity === '0' ? '>>> ONZICHTBAAR <<<' : ''}`));

await ev(`document.querySelector('.process').scrollIntoView({block:'center', behavior:'instant'})`);
await sleep(800);
const shot2 = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('C:\\Users\\Storm\\OneDrive - Sanacount\\Documenten\\Theme Your Dream\\Website-git\\_tmp_probe\\werkwijze-rm.png', Buffer.from(shot2.data, 'base64'));
console.log('screenshot -> _tmp_probe/werkwijze-rm.png');

ws.close(); chrome.kill(); process.exit(0);
