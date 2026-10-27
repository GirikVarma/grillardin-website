# Grillardin — remaining content and confirmations

Updated 27 October 2026 after the owner's menu confirmations, supplied food photographs, source story integration and direct Google Maps research.

## Now resolved

- Bocconcini salad is **Rs. 400**. The conflicting price flag is removed from the digital menu.
- The unpriced “Coriander Onion, Mushroom, Chili Cheese” line is omitted at the owner's instruction.
- Soup/salad options remain unchanged and confirmed. Tea remains in its current grouping.
- Source dish/ingredient spellings remain unchanged. [Spelling review](docs/SPELLING_REVIEW.md) lists possible errors for optional later correction.
- All 25 supplied food photographs are optimized and used in the food gallery. Selected photos also appear elsewhere; [photo mapping](docs/FOOD_PHOTOS_2026-10-27.md).
- The menu's page-3 story is published in full on `story.html`, with a short faithful summary on the homepage. Founder biography and dates are not invented.
- Address, phone, daily hours and a dated rating snapshot are sourced directly from the correct Google profile. [Evidence and conflicting secondary listings](docs/BUSINESS_SOURCES.md).

## Still needed

1. **Official social URLs:** Instagram, Facebook and WhatsApp destinations. The small footer icons currently announce “link coming soon.” They do not link to generic social homepages or invented accounts. Add each confirmed URL to `socials` in `dist/data/site.js` and rebuild.
2. **Reservation destination and workflow:** still a placeholder message. The presence of a booking service on Google does not authorize changing the agreed first-draft workflow. Supply the approved destination when ready.
3. **Business confirmation:** check the published Google address (including postal code 122101), phone and hours with the restaurant. Some secondary listings disagree. Confirm any holiday hours and provide email if it should be published.
4. **Photo-to-menu mapping:** confirm which exact named dish each photograph shows before individual dish-photo labels are added. Existing captions remain descriptive. Supply photographer credit/rights details if a credit is required.
5. **Finished interior photographs:** current supplied venue imagery is still correctly labelled architectural design renders.
6. **Optional personal story:** the menu's concept story is in place. Approved founder names, portraits, dates and first-person details could enrich a future iteration, if desired.
7. **Verified press/recognition:** provide original articles or links, publication/date and exact award evidence. The section remains hidden without verified entries.
8. **Optional menu refinements:** approve any spelling changes in the review, and supply tax/service-charge or allergen information if it should appear. None is guessed.

## Maintenance

- Restaurant details, review excerpts, social URLs, story, photo placement and reservation mode: `dist/data/site.js`.
- Full photo inventory: `dist/data/photos.js`.
- Menu: `dist/data/menu.js`.
- Shared header/footer and generated sections: `scripts/components.mjs`.
- Run `npm run build` and `npm test` after changes. The build refreshes all three static pages.


Update, 27 October 2026: the owner approved the corrections listed in `docs/SPELLING_REVIEW.md`, except Shaoji / Safeed / khumb / matter. Those regional spellings are preserved; all other listed corrections are applied to the website.
