// usage: node mksticker.js WIDTH HEIGHT  -> sticker.png (CARS FS logo plate) sized to the plate's proportions
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const W = +process.argv[2] || 720, H = +process.argv[3] || 180, m = Math.min(W, H);
const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo_new_white.png')).toString('base64');
const html = `<html><body style="margin:0;background:transparent"><div style="width:${W}px;height:${H}px;box-sizing:border-box;border-radius:${Math.round(m*0.16)}px;
background:linear-gradient(180deg,#2a2a2a,#0b0b0b 55%,#000);border:${Math.max(4,Math.round(m*0.04))}px solid #f26a1f;
box-shadow:inset 0 3px 0 rgba(255,255,255,.18),inset 0 -6px 10px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center">
<img src="${logo}" style="max-width:${Math.round(W*0.86)}px;max-height:${Math.round(H*0.72)}px"></div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
await p.setContent(html);await p.waitForTimeout(300);await p.screenshot({path:'sticker.png',omitBackground:true});await b.close();})();
