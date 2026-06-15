// Screenshots each route of the built PWA at phone dimensions.
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { createServer } = require('./serve.cjs');

const OUT = path.join(__dirname, '..', 'preview');
const PORT = 8099;
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
  const server = createServer();
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  for (const [route, name] of routes) {
    await page.goto(`http://localhost:${PORT}/${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(900);
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log('captured', name);
  }
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
