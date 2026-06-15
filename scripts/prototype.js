// Drives the real app through its in-app navigation (no deep links) to record
// an interactive walkthrough: login -> list -> detail -> add people ->
// assign guardian (bottom sheet) -> review. Saves step screenshots and an
// animated GIF of the prototype.
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const GIFEncoder = require('gif-encoder-2');
const { PNG } = require('pngjs');

const DIST = path.join(__dirname, '..', 'dist');
const OUT = path.join(__dirname, '..', 'preview');
const PORT = 8100;
const W = 390;
const H = 844;

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.ico': 'image/x-icon', '.ttf': 'font/ttf',
  '.json': 'application/json', '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(DIST, urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const asHtml = path.join(DIST, urlPath + '.html');
    filePath = fs.existsSync(asHtml) ? asHtml : path.join(DIST, 'index.html');
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Click the (optionally last) on-screen element whose trimmed text equals `text`.
async function tap(page, text, { last = false } = {}) {
  const box = await page.evaluate((t, useLast) => {
    const els = [...document.querySelectorAll('div,span,a')];
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
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const frames = []; // { buf, hold } captured for the GIF
  const grab = async (name, hold = 3) => {
    await sleep(700);
    const buf = await page.screenshot({ type: 'png' });
    frames.push({ buf, hold });
    if (name) fs.writeFileSync(path.join(OUT, `step-${name}.png`), buf);
    console.log('frame', name || '(tween)');
  };

  await page.goto(`http://localhost:${PORT}/login`, { waitUntil: 'networkidle0' });
  await sleep(1000);
  await grab('1-login', 4);

  await tap(page, 'Login');
  await grab('2-miqaats', 4);

  await tap(page, 'Register now');
  await grab('3-detail', 4);

  await tap(page, 'Register Now');
  await grab('4-add-people', 4);

  // Open the guardian assignment bottom sheet for Syed nazia.
  await tap(page, 'Assign');
  await grab('5-assign-sheet', 4);

  // Pick an adult in the sheet, then confirm.
  await tap(page, 'Yusuf husain', { last: true });
  await grab('6-assign-selected', 3);
  await tap(page, 'Add guardian');
  await grab('7-guardian-assigned', 4);

  await tap(page, 'Confirm');
  await grab('8-review', 5);

  await browser.close();
  server.close();

  // Encode GIF from the captured frames.
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
