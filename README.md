# Grillardin — website

A lightweight, responsive, static website. No package installation, framework, backend, account system or data collection is needed. Requires Node.js 18+ for the convenience scripts.

```sh
cd grillardin-website
npm run build
npm test
npm run dev
```

Open http://127.0.0.1:4173. Set `PORT=4174 npm run dev` to use another local port. Any static server can also serve `dist/`.

## Update content

| File | Purpose |
| --- | --- |
| `dist/data/site.js` | Verified business facts, reviews, social URLs, full source story, photo placement and reservation settings |
| `dist/data/menu.js` | All 103 menu rows in 13 source categories; run `npm run build` after edits |
| `dist/data/photos.js` | All 25 supplied food photographs with source mapping, captions and responsive dimensions |
| `dist/story.html` | Dedicated source story page; article generated from story data |
| `scripts/components.mjs` | Shared Home/Menu/Story navigation, footer, gallery, review and business sections |
| `dist/enhancements.css`, `dist/enhancements.js` | Layered hero, decorative seal, native food and review carousels, scroll reveals and social placeholders |
| `dist/index.html` | Homepage composition and general invitation copy |
| `dist/menu.html` | Menu page shell; the marked menu content is generated from menu data |
| `dist/styles.css` | Responsive design, local fonts, focus and reduced-motion styles |
| `dist/app.js` | Search, category navigation, mobile navigation, image/config binding and reservation message |
| `dist/assets/` | Locally hosted source logo, open fonts/icons, 25 supplied food photographs and supplied interior renders |
| `CONTENT_NEEDED.md` | Facts, assets and menu details to confirm |
| `TEMPORARY_ASSETS.md` | Provenance and replacement guide |
| `docs/MENU_VERIFICATION.md` | Menu transcription count and unresolved source content |

The hero and feature photographs can be replaced by changing `images.hero` and `images.feature` in `site.js`. Supply small and large variants, accurate alt text and an appropriate caption. The current food photographs are supplied by the restaurant. `menuPhotos` selects category photo pairs without asserting an exact dish match. Interior assets are clearly labelled design renders, not photographs of the finished restaurant.

## Scope and publishing

The menu can be read without JavaScript; search and mobile category jumping progressively enhance it. Desktop category navigation and the mobile dropdown are populated by the same menu data. The original supplied menu PDF is linked as an alternative.

Reservation buttons currently show a short status message. There is no booking form or customer submission. Google-sourced visiting details and 10 verified five-star Google/District review excerpts are visible, shuffled two at a time with pause and navigation controls, with their verification date and source links. Social icons show a coming-soon message until official URLs are supplied. Press stays hidden without verified entries. No signup popup is active.


The concrete update plan is in `docs/UPDATE_PLAN_2026-10-27.md`. Business sources, photo mapping, open-source design references, spelling review and browser verification are in `docs/`. The full story is verified against page 3 of the supplied menu.
