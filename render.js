// Usage: node render.js cars/lexus-ux200.json [more.json ...]
// Renders each car JSON into output/<name>.jpg (post.html: 1080x1350, post-square.html: 1254x1254).
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
    const tpl = data.template || 'post.html';
    const size = data.size ? { width: data.size[0], height: data.size[1] } : tpl === 'post-square.html' ? { width: 1254, height: 1254 } : { width: 1080, height: 1350 };
    await page.setViewportSize(size);
    await page.goto('file://' + path.join(__dirname, 'template', tpl));
    await page.evaluate((d) => window.fill(d), data);
    const out = path.join(__dirname, 'output', path.basename(f, '.json') + '.jpg');   // JPEG: TikTok rejects PNG
    await page.screenshot({ path: out, type: 'jpeg', quality: 95 });
    console.log('wrote', out);
  }
  await browser.close();
})();
