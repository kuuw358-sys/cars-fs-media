const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const v of ['A','B','C','D']) {
    const p = await b.newPage({ viewport: { width: 2016, height: 1512 } });
    await p.goto('file://' + process.cwd() + '/variants.html#' + v);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(700);
    await p.screenshot({ path: `var_${v}.png` }); await p.close();
  }
  await b.close();
})();
