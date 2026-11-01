const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:520,height:220}});
await p.goto('file://'+process.cwd()+'/sticker.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.screenshot({path:'sticker.png',omitBackground:true});await b.close();})();
