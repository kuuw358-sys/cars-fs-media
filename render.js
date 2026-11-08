// Usage: node render.js cars/lexus-ux200.json [more.json ...]
// Renders each car JSON into output/<name>.png (1080x1350, Instagram 4:5).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const files = process.argv.slice(2);
  if (!files.length) { console.error('usage: node render.js cars/<car>.json ...'); process.exit(1); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  fs.mkdirSync(path.join(__dirname, 'output'), { recursive: true });
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    await page.goto('file://' + path.join(__dirname, 'template', 'post.html'));
    await page.evaluate((d) => window.fill(d), data);
    const out = path.join(__dirname, 'output', path.basename(f, '.json') + '.png');
    await page.screenshot({ path: out });
    console.log('wrote', out);
  }
  await browser.close();
})();
