// Rasterizes the lantern emblem SVG into the PNG icons the PWA manifest needs,
// using the Chromium bundled with puppeteer (no native image libs required).
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PUBLIC = path.join(__dirname, '..', 'public');

function svg({ rounded, padScale }) {
  // padScale: lantern scale factor; smaller = more padding (for maskable safe zone)
  const s = 3.16 * padScale;
  const lanternW = 60 * s;
  const lanternH = 95 * s;
  const tx = (512 - lanternW) / 2;
  const ty = (512 - lanternH) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1F5A44"/><stop offset="1" stop-color="#0E2D21"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F0DDA8"/><stop offset="0.5" stop-color="#E3CD96"/><stop offset="1" stop-color="#C9A45C"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="${rounded ? 112 : 0}" fill="url(#bg)"/>
    <g transform="translate(${tx} ${ty}) scale(${s})">
      <path d="M30 2 L34 9 L26 9 Z" fill="url(#gold)"/>
      <rect x="27.5" y="9" width="5" height="6" rx="1.5" fill="url(#gold)"/>
      <path d="M18 18 Q30 12 42 18 L38 23 L22 23 Z" fill="url(#gold)"/>
      <path d="M22 23 L38 23 L44 34 L44 62 L38 73 L22 73 L16 62 L16 34 Z" fill="url(#gold)"/>
      <path d="M26 30 L34 30 L38 38 L38 58 L34 66 L26 66 L22 58 L22 38 Z" fill="#1F5A44" opacity="0.92"/>
      <path d="M33 40 a8 8 0 1 0 0 16 a6 6 0 1 1 0 -16 Z" fill="url(#gold)"/>
      <path d="M22 73 L38 73 L34 80 L26 80 Z" fill="url(#gold)"/>
      <ellipse cx="30" cy="83" rx="6" ry="2.4" fill="url(#gold)"/>
    </g>
  </svg>`;
}

async function render(page, markup, size, out) {
  const html = `<!doctype html><html><body style="margin:0">${markup}</body></html>`;
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  const el = await page.$('svg');
  const buf = await el.screenshot({ omitBackground: false });
  // puppeteer screenshots the element at its CSS size (512); resize via re-render is overkill,
  // so for 192 we set the svg width/height attributes accordingly.
  fs.writeFileSync(path.join(PUBLIC, out), buf);
  void size;
}

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // 512 standard (rounded)
  await render(page, svg({ rounded: true, padScale: 1 }), 512, 'pwa-512.png');
  // 192 standard — scale the svg element down
  await render(page, svg({ rounded: true, padScale: 1 }).replace('width="512" height="512"', 'width="192" height="192"'), 192, 'pwa-192.png');
  // 512 maskable (full-bleed bg, extra padding around emblem)
  await render(page, svg({ rounded: false, padScale: 0.78 }), 512, 'pwa-maskable-512.png');

  await browser.close();
  console.log('icons written to public/');
})().catch((e) => { console.error(e); process.exit(1); });
