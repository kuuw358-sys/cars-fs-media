# cars-fs-media

**Approved template: `template/post.html` (1080×1350).** The other templates (square, v3) are earlier drafts; do not use them. Full rules are in `CLAUDE.md`.

- Write the brand in Arabic (e.g. «لكزس»).

Rules for every car:
- Always write the brand.
- Write the trim (`trim`) only if it is given in the car's text. Otherwise leave it out of the JSON file and the line is hidden.

Instagram post template for CARS FS listings (1080×1350, 4:5).

## Layout
- **Top:** brand, model and trim on the left, «للبيع» badge on the right. Nothing covers the photo.
- **Middle:** the car photo, shown whole and sharp to the bottom. There is no white fade over the wheels or bumper.
  If the photo's shape doesn't match the box, the gaps are filled with a blurred copy of the same photo.
- **Bottom (compact):** one thin row with the year, mileage, service and inspection, then the price and phone pills.

## Usage
1. Put the **original** car photo in `photos/` (not a finished poster). A landscape 4:3 photo fills the box best.
2. Copy `cars/lexus-ux200.json`, then change the details and the `photo` path.
3. Render:
   ```
   node render.js cars/<car>.json
   ```
   The image is written to `output/<car>.png`.

Optional JSON fields:
- `"photoFit": "cover"` fills the box completely, but may crop the edges of the photo.
- `"photoPosition": "center 70%"` sets which part stays in view when cropping.

Font: Cairo (SIL Open Font License), bundled in `fonts/`.

## Square template on the designer background (1254×1254)
- The background is `template/bg-square.png`, and the template is `template/post-square.html`.
- Example: `cars/lexus-ux200-square.json`, rendered with `node render.js cars/lexus-ux200-square.json`.
- The car stays sharp down to the tyres. Only the ground below them fades into white, above the specs row.
- The `car` field sets the photo's position:
  - `left` and `width` set the photo's placement and width.
  - `bottom` is the line where the tyres sit on the canvas.
  - `tyreY` is where the tyres sit inside the photo, as a fraction from 0 to 1 of its height.
- The number plate is covered with the CARS FS plate before rendering (see `photos/lexus-ux200-original.jpg`).

## Final template (1221×1289), background `template/bg-v3.png`
- The template is `template/post-v3.html`.
- Example: `cars/lexus-ux200-v3.json`, rendered with `node render.js cars/lexus-ux200-v3.json`.
- The car photo fills the frame edge to edge with its full background. Only the ground below the tyres fades out, above the specs.
- The car photo is the background of the whole frame. First extend the ground in the original photo:
  `python3 tools/extend_ground.py photos/<car>-original.jpg photos/<car>-full.jpg`
  Set `photo` in the JSON file to the extended photo, and set `car.photoH` to the original photo's height.
- `frostOpacity` (0 to 1) sets how light the white layer over the info area is. The default is 0.78, and the Lexus example uses 0.55.
