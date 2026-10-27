# Grillardin asset inventory and replacement guide

Updated 27 October 2026.

## Restaurant food photography — now in use

The owner supplied 25 photographs in the WhatsApp folder attached to this update. These replace the previous stock food images in the visible website. All 25 appear in the homepage carousel; selected photos appear in the layered hero, menu category interludes and story page.

- WebP files: `dist/assets/dishes/table-01-800.webp` through `table-25-1600.webp`.
- Source filenames, descriptive captions, dimensions and alt text: `dist/data/photos.js`.
- Provenance and optimization notes: [FOOD_PHOTOS_2026-10-27.md](docs/FOOD_PHOTOS_2026-10-27.md).
- Main placements: `images.hero`, `images.feature`, `gallery` and `menuPhotos` in `dist/data/site.js`.

Originals remain untouched. Derivatives are resized without upscaling and encoded as WebP. No generated additions, recolouring or food retouching was applied. Exact menu-item identities are not inferred from appearance.

## Supplied interior design renders — still in use

The user's 13-page Studio Iona interior proposal contains architectural renders, not finished-venue photographs. The homepage room/detail images retain visible design-render captions and accurate alt text. Ten extracted scenes, with 800/1600px variants, remain in `dist/assets/interiors/` for future use. [Full scene notes](docs/INTERIOR_ASSETS.md) and the local asset manifest retain provenance. Replace these with actual completed-space photographs when available; update captions only then.

## Previous stock imagery — no longer displayed

The two previously used Unsplash food photographs are retained in `dist/assets/food/` as unused source assets. Their original license/photographer records remain in [FOOD_ASSET_SOURCES.md](docs/FOOD_ASSET_SOURCES.md). No page references them after this update. They should not be reintroduced as photographs of Grillardin's dishes.

## Supplied branding and menu

The lotus and complete original logo were faithfully extracted from the supplied menu. Files in `dist/assets/brand/` retain source shape/proportion and gold. The original logo appears in the footer; header typesetting uses the lotus beside text. The source PDF remains available at `dist/menu-original.pdf`. Current digital-menu corrections are in [MENU_VERIFICATION.md](docs/MENU_VERIFICATION.md).

## Fonts and icons

- Cormorant Garamond and DM Sans remain locally hosted under their bundled SIL Open Font Licenses in `dist/assets/fonts/`.
- Instagram, Facebook and WhatsApp SVGs come from [Simple Icons](https://github.com/simple-icons/simple-icons); the upstream CC0 license is included in `dist/assets/icons/Simple-Icons-LICENSE.md`.
- [DESIGN_REFERENCES.md](docs/DESIGN_REFERENCES.md) records the Motion/Embla references and original lightweight implementation. No third-party animation library is shipped.

When replacing an asset, update its source record, responsive variants, alt text and caption; run the build; inspect desktop and mobile focal points. Retain original rights/credit information.
