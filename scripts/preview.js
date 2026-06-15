// Serves the exported web build (SPA fallback) and screenshots each route
// at iPhone-ish dimensions using the Chromium that ships with puppeteer.
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const DIST = path.join(__dirname, '..', 'dist');
const OUT = path.join(__dirname, '..', 'preview');
const PORT = 8099;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(DIST, urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const asHtml = path.join(DIST, urlPath + '.html');
    if (fs.existsSync(asHtml)) filePath = asHtml;
    else filePath = path.join(DIST, 'index.html'); // SPA fallback
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

const routes = [
  ['login', '01-login'],
  ['miqaats', '02-miqaat-list'],
  ['detail', '03-registration-detail'],
  ['add-people', '04-add-people'],
  ['review', '05-review'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  for (const [route, name] of routes) {
    await page.goto(`http://localhost:${PORT}/${route}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    await sleep(1200); // let fonts/gradients settle
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log('captured', name);
  }

  await browser.close();
  server.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
