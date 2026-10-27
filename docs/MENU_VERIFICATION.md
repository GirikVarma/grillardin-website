# Menu transcription verification

**Current status:** owner confirmations from 27 October 2026 are applied; bocconcini salad is Rs. 400, the stray Add Ons line is removed, other choices/groupings/spellings are preserved. The notes below document the initial source audit; see the final owner-confirmation section for the resolution.

Source: `Menu New.pdf`, supplied by the user at:

`supplied restaurant PDF`

Verified on 24 October 2026 by extracting text and rendering all 19 source pages at 160 dpi. All eight pages containing menu entries were visually read at full rendered size. The cover, story page, back cover, and eight artwork pages were also visually inspected. Artwork pages contain no additional menu entries or contact details.

The website data is in `dist/data/menu.js`, exposed as `window.GRILLARDIN_MENU`. It contains **13 categories and 103 menu rows**. Each source row with a printed `Rs.` price appears once. Multiple choices printed as one row remain one row; option labels remain in the item name or description. No recipes, ingredients, dietary labels, or prices have been invented.

| Source page | Source category | Rows in source | Rows in data |
| --- | --- | ---: | ---: |
| 5 | Soups | 5 | 5 |
| 5 | Salads | 4 | 4 |
| 7 | Small Plates From Grills and Tandoor | 14 | 14 |
| 9 | Large Plates | 8 | 8 |
| 11 | Curries of the Indian Subcontinent | 16 | 16 |
| 12 | Add Ons | 9 | 9 |
| 12 | From Lava Grill | 6 | 6 |
| 14 | Pizza (Thin Crust) | 5 | 5 |
| 14 | Desserts | 6 | 6 |
| 16 | Mocktails | 10 | 10 |
| 16 | Shakes, including the separately spaced TEA row | 5 | 5 |
| 18 | Healthy Drink | 9 | 9 |
| 18 | Flavour Drinks | 6 | 6 |
| **Total** | | **103** | **103** |

## Items requiring confirmation

1. **Marinated Grape Tomatoes, Baby Beets and Bocconcini, page 5:** a right-aligned `Rs. 400` is printed next to the name. The next line reads `basil pesto. 550`. The extra `550` is visible in the rendered source, not an extraction error. The website displays **Price to confirm**. The data retains `sourcePrice: "Rs. 400 (also stray 550)"` for review. Neither number has been chosen as the definitive public price.
2. **Unpriced Add Ons line, page 12:** `Coriander Onion, Mushroom, Chili Cheese` appears on a separate line after the Pulao Rice / Jeera Rice / Steamed Rice entry. It has no price, label, or explicit association with a preceding entry. The category note retains the exact words and adds `details to confirm`. It has not been turned into an additional priced item or assigned to a bread or rice choice.
3. **Smoked Tomato Soup, page 5:** the printed price string is `Rs. 350 / 450 / 450`; the next line lists `(Mushroom / Bacon / Prawns)`. Both strings are preserved without a new interpretation or an additional base price.
4. **House Caesar Salad, page 5:** the printed prices are `Rs. 350 / 450 / 550`; the next line lists `(Grilled vegetables / Chicken / prawns)`. These option labels remain directly in the item's description.
5. **Tea grouping, page 16:** `TEA` has a price of `Rs. 145` and the choices `Green Tea, Jasmine Tea, Lemon Zinger Honey Tea`. It appears below the four shake entries with extra whitespace, without a separate decorative category heading. It remains a row in Shakes; its source grouping should be confirmed before changing the menu structure.

## Transcription conventions

- Prices retain the source's `Rs.` denomination. The PDF does not explicitly state an ISO currency code, so the data does not assign one.
- Line breaks, decorative capitalisation, numbered drink prefixes, and trailing punctuation have been normalised for a web menu. No numeric price has been changed.
- The curry introduction and lava-grill accompaniment line are retained as category descriptions. The source's `seved` in the lava-grill note is corrected to `Served`; its substantive wording is retained.
- Names and unusual ingredient spellings are deliberately preserved, including `Iceburg`, `Pinapple`, `Shaoji`, `Safeed`, `Kolkatta`, `Amratsari`, `khumb`, `matter`, `Burre Blanc`, `Portabello`, `Gulam`, `Gulukand`, `Mukkwas`, `Candid Rose`, `Tangering`, `Watermilon`, `Miixed`, and `Tandoori chicke`. These are possible source proofreading issues, not transcription omissions. Confirm spelling changes with the restaurant before publication.
- Both Nagpur curry entries are retained because the source contains distinct chicken and paneer preparations with different prices.
- No tax, service-charge, availability, allergy, vegetarian, vegan, halal, or other operational claims were added; none are specified in the supplied menu.

## Brand and contact evidence

The source cover uses a lotus mark above a serif `GRILLARDIN` wordmark, a thin underline, and the script tagline **Your Grilling Hub**. The palette is deep blue/navy with gold. The story page heading is **The Journey of Grilling** and describes Grillardin as bringing grilling techniques and traditions together under one roof.

No address, phone number, email, opening hours, social handles, reservation link, or location coordinates are printed anywhere in this 19-page menu.

The lotus asset was extracted from the **nine original native vector path shapes** on page 1, without tracing, redrawing, or image generation. These are supplied as:

- `dist/assets/brand/grillardin-mark.svg`: exact source path coordinates, source gold colour `#d7b56d`, transparent background.
- `dist/assets/brand/grillardin-mark.png`: rendered from the same original PDF path operators at 984 × 828 pixels, RGBA with transparent background. Visually checked against the source cover.

The wordmark font and script tagline were not approximated as a new logo.

## Verification evidence

Working renders and extracted text are in `tmp/menu-work/` at the workspace root. `page-5.png`, `page-7.png`, `page-9.png`, `page-11.png`, `page-12.png`, `page-14.png`, `page-16.png`, and `page-18.png` show the eight menu content pages. `blank-pages.png` is a contact sheet of the eight artwork pages. These are working materials, not website assets.

A programmatic check counted 103 `Rs.` price rows in the eight source menu pages, matching the 103 data rows. All data rows require a nonempty name and price; category IDs are unique. The one conflicting price is the deliberate `Price to confirm` exception documented above.

## Owner confirmations — 27 October 2026 (supersedes the earlier uncertainty list)

The owner confirmed that the bocconcini salad is **Rs. 400**; the public data now uses that value and no price warning. The unpriced Coriander Onion/Mushroom/Chili Cheese line has been removed at the owner's instruction. Soup/salad choices are confirmed as transcribed; Tea stays under Shakes. The original PDF is unchanged. All 103 priced rows remain. Source dish and ingredient spellings are deliberately preserved; [SPELLING_REVIEW.md](SPELLING_REVIEW.md) flags potential errors for the owner without silently changing them. The nine source story paragraphs on menu page 3 now populate the dedicated story page.


Update, 27 October 2026: the owner approved the corrections listed in `docs/SPELLING_REVIEW.md`, except Shaoji / Safeed / khumb / matter. Those regional spellings are preserved; all other listed corrections are applied to the website.
