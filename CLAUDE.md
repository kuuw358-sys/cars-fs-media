# CARS FS: instructions for Claude (read every session)

Instagram/TikTok account **cars__fs** (Kuwait used-car listings). Always reply in **Gulf Arabic**, short and mobile-friendly.
The owner's workflow: they send car photos + text here, and Claude does everything else. Their only steps are sending and saying "موافق".

## Approved template (the only one)
- **`template/post.html`, 1080×1350 (4:5)**, rendered with `node render.js cars/<car>.json` → `output/<car>.png`. Example: `cars/lexus-ux200.json`.
- Layout: brand / model / trim top-left, «للبيع» badge top-right, car photo in a rounded box, one row of 4 fields with icons (موديل، العداد، الصيانة، الفحص), then phone pill and price pill («السعر»).
- **Brand is written in Arabic** (e.g. «لكزس», not "Lexus"). Model stays as written (e.g. "UX 200").
- Write the trim only if it is in the car's text; otherwise leave it out of the JSON.
- The 4 fields come from the post text. If there is no price, the price pill says «اتصل للسعر».
- Other templates and branches (v3, v7 "white", `templates/` folder) are **old drafts. Never use them.**

## Steps for each car
1. Check the photos are original, with no AI edits to the car or background. If they are edited, tell the owner and stop until originals arrive.
2. Cover the number plate with the CARS FS sticker at the plate's angle (`tools/plate/`):
   `cd tools/plate && node mksticker.js W H && python3 plate.py in.jpg out.jpg TLx,TLy TRx,TRy BRx,BRy BLx,BLy`
3. Put the **first photo the owner sends** in the template (always, not the "clearest"), untouched, filling the full photo box: use `"photoFit": "cover"` (never a blurred side fill, never a shrunken box). All other photos go in the post as originals. Post images are 1080×1350, stories 1080×1920.
4. Show the owner the design and the full post. **Nothing is published before the word «موافق».**
5. Schedule on Instagram + TikTok via Metricool (brand `cars__fs`, blogId 7783138, timezone Asia/Kuwait). TikTok title = first line of the caption.
   Instagram story works via Metricool; TikTok story and Snapchat are manual.
6. After Metricool has taken its copy, delete the uploaded images from this repo.

## Content rules
- The caption is the owner's text **copied word for word**. If no text is sent, write nothing of our own.
- Template text goes on the template only.
- Remove any other dealer's name or logo from the text (e.g. "PANDA CAR بيع.. شراء.. تثمين").
- Sold car: red ribbon «مبـاع ✔» over the phone number on the same image, posted as a story and added to the «تم البيع» highlight.
- Ad offer: 2 KD per car until sold; two cars for 4 KD and the third free. Ads WhatsApp: 66071514.
- Tuesday comparison posts: see `tuesday-plan.md`.

## Hosting and limits
- Metricool here cannot link Google Drive, so images are uploaded **temporarily** to this public repo for Metricool to fetch, then deleted.
- GitHub's Acceptable Use Policy (sections 9 and 10) frowns on accounts that are mainly advertising or used as an image host. Keep it light: one push per car, delete images after scheduling, no other ads in the repo.
- Metricool free plan: 20 posts a month. Warn the owner when close.

## Repo and backup rules
- Never merge anything into `main` until the owner says «ادمج». Work on a branch first.
- Google Drive is normally **disconnected**. After any important change (rules, template or tools), remind the owner:
  «فيه تعديل، اربطني في Drive عشان نحفظ النسخة». Then save a dated copy, keep the latest two, and move older copies to the Drive trash.
