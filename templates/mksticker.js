// usage: node mksticker.js WIDTH HEIGHT  -> sticker.png sized to the plate's proportions
const { chromium } = require('playwright');
const W = +process.argv[2] || 520, H = +process.argv[3] || 220, m = Math.min(W, H);
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=block" rel="stylesheet">
<style>html,body{margin:0;width:${W}px;height:${H}px;background:transparent}
.s{width:${W}px;height:${H}px;box-sizing:border-box;background:#0d0d0d;border:${Math.round(m*0.065)}px solid #f26a1f;border-radius:${Math.round(m*0.08)}px;display:flex;align-items:center;justify-content:center}
.s span{font-family:'Archivo Black';color:#f26a1f;font-size:${Math.round(Math.min(H*0.68, W*0.36))}px;line-height:1;transform:skewX(-12deg);letter-spacing:2px}</style></head>
<body><div class="s"><span>FS</span></div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.screenshot({path:'sticker.png',omitBackground:true});await b.close();})();
