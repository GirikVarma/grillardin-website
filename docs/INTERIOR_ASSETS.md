# Grillardin interior reference and extracted assets

Source: user-supplied `Grillardin 2_renders .pdf`, 13 pages. Every page was rendered and visually reviewed; every distinct interior/exterior render was also reviewed at full image size. Contact sheet: `site/tmp/interiors-contact.jpg`.

## Classification and accuracy

These are architectural computer-generated design renders, not photographs of the finished venue. The material board, duplicated cover crop, CGI lighting/materials, repeated furniture, and numbered design views establish this distinction. Use a visible caption such as **Interior design render** or **Space preview · design render** in the website. Avoid claims that the depicted fit-out has been completed or that these are actual restaurant photos.

The document is a Studio Iona interior proposal. Its final page contains Studio Iona's website, designer phone numbers and New Delhi studio address. None of those details establish the restaurant's phone number, location, or opening hours. Do not repurpose them as Grillardin business information. Exterior imagery also does not establish a verified geographic location.

## Visual direction supported by the source

- Warm ivory and light ochre plaster; deep brown wood; terracotta floor/bar tile; forest/olive leatherette seating; brass or warm metal fixtures.
- Large botanical ceiling panels in cream, terracotta, muted sage and olive, divided by dark beams.
- Distinct scalloped brass pendants and luminous white globe chandeliers.
- Trailing plants around columns and glass booth dividers; small plants on tables.
- Open kitchen with deep green vertical tile and olive stools, framed by a decorative arch.
- Cream patterned floor tile, timber or warm stone-look tables, curved dark spindle chairs, framed food artwork and a botanical/cutlery wall motif.
- Atmosphere: warm, planted, comfortable, refined and sociable; suitable for an ivory/forest/terracotta editorial website. Do not infer a specific cuisine, heritage, service model or alcohol availability solely from the design views.

Suggested UI palette derived from the visual direction (interpretive rather than measured): warm ivory `#F5F0E6`, forest `#213E34`, olive `#727B51`, terracotta `#AB4E35`, dark brown `#38251B`, muted brass `#AF8B50`.

## Asset inventory

All published assets are direct extracts of the supplied PDF's embedded images, resized with Lanczos and encoded as WebP quality 86. No generated imagery, retouching, text removal, artificial extension, or content changes. Each has 800 px and 1600 px width variants, preserving the original aspect ratio. Interior originals are 3840 × 2560 px; exterior original is 2560 × 1063 px. Manifest includes dimensions, byte size, source page, source view label and alt text.

| Website file base | PDF page | PDF view label | Use |
| --- | --- | --- | --- |
| `dining-detail` | 3 | View 1 | Column, planting, open-kitchen arch and table detail |
| `dining-day` | 4 | View 2day | Recommended broad hero or opening space image |
| `dining-night` | 5 | View 3night | Alternate warm evening space preview |
| `dining-pattern` | 6 | View 4 | Ceiling, patterned wall and seating overview |
| `kitchen-corner` | 7 | View 5 | Kitchen corner and framed art |
| `dining-aisle` | 8 | View 6 | Recommended portrait crop showing depth, plants and dividers |
| `bar-detail` | 9 | View 7 | Bar design; does not verify a live beverage program |
| `dining-bar` | 10 | View 8 | Recommended wide room/gallery image |
| `kitchen-arch` | 11 | View 9 | Recommended detail image of arch, tile and planting |
| `exterior` | 12 | View 11 | Exterior design render; no location verification |

Files live at `site/dist/assets/interiors/{base}-{800|1600}.webp`. The machine-readable inventory is `site/dist/assets/interiors/manifest.json`.

## Pages not published as scene images

- Page 1: cover composition, with a crop of the same scene repeated on page 11 plus Studio Iona logo. The clean full-size page 11 render is used instead.
- Page 2: material board containing reference swatches/photos (flooring, hanging light, bar/kitchen tile, chair leatherette, sheer curtain, chandelier). Useful as design evidence; not original photographs of Grillardin and not scene images for website publication.
- Page 13: designer closing/contact page and Studio Iona branding. Not customer-facing restaurant content.

## Accessibility copy

Alt text should describe the visible space and preserve the render status. Suitable example: “Daytime design render of Grillardin’s dining room with a botanical ceiling, globe lights and olive seating.” Do not use alt text such as “Our restaurant photographed during lunch”.
