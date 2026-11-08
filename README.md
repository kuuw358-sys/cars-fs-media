# cars-fs-media

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
