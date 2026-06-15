// Drives the built PWA through its real navigation to record an interactive
// walkthrough GIF: login -> list -> detail -> add people -> assign guardian
// (bottom sheet) -> review. Also saves per-step screenshots.
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const GIFEncoder = require('gif-encoder-2');
const { PNG } = require('pngjs');
const { createServer } = require('./serve.cjs');

const OUT = path.join(__dirname, '..', 'preview');
const PORT = 8100;
const W = 390;
const H = 844;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tap(page, text, { last = false } = {}) {
  const box = await page.evaluate((t, useLast) => {
    const els = [...document.querySelectorAll('button,div,span,a,label')];
    const matches = els.filter((e) => {
      if (e.getClientRects().length === 0) return false;
      const own = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
      return own === t || e.textContent.trim() === t;
    });
    const el = useLast ? matches[matches.length - 1] : matches[0];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, text, last);
  if (!box) throw new Error(`Tap target not found: "${text}"`);
  await page.mouse.click(box.x, box.y);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = createServer();
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const frames = [];
  const grab = async (name, hold = 4) => {
    await sleep(650);
    const buf = await page.screenshot({ type: 'png' });
    frames.push({ buf, hold });
    if (name) fs.writeFileSync(path.join(OUT, `step-${name}.png`), buf);
    console.log('frame', name);
  };

  await page.goto(`http://localhost:${PORT}/#/login`, { waitUntil: 'networkidle0' });
  await sleep(800);
  await grab('1-login');
  await tap(page, 'Login');
  await grab('2-miqaats');
  await tap(page, 'Register now');
  await grab('3-detail');
  await tap(page, 'Register Now');
  await grab('4-add-people');
  await tap(page, 'Assign');
  await grab('5-assign-sheet');
  await tap(page, 'Yusuf husain', { last: true });
  await grab('6-assign-selected', 3);
  await tap(page, 'Add guardian');
  await grab('7-guardian-assigned');
  await tap(page, 'Confirm');
  await grab('8-review', 5);

  await browser.close();
  server.close();

  const encoder = new GIFEncoder(W, H, 'neuquant', true);
  encoder.setDelay(650);
  encoder.setRepeat(0);
  encoder.start();
  for (const { buf, hold } of frames) {
    const png = PNG.sync.read(buf);
    for (let i = 0; i < hold; i++) encoder.addFrame(png.data);
  }
  encoder.finish();
  fs.writeFileSync(path.join(OUT, 'prototype.gif'), encoder.out.getData());
  console.log('wrote preview/prototype.gif');
})().catch((e) => { console.error(e); process.exit(1); });
