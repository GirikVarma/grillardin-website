# First draft verification — 24 October 2026

## Automated checks

`npm run build` and `npm test` pass. The build emits all 103 menu entries into readable HTML in 13 categories and binds initial responsive image sources. Checks verify the source row/category totals, unique category anchors, retained price conflict, local files and links, page anchors, duplicate IDs, JavaScript syntax, no customer-data forms, placeholder reservation mode and disabled signup.

## Browser checks

Inspected actual rendered homepage and menu in the in-app browser at desktop (1440 px), phone (390 px), and narrow/tablet widths (320/768 px). No horizontal overflow was observed at those four widths. Reviewed the full homepage progression, food crops, supplied design-render treatment, menu names/prices/descriptions, and phone menu layout. The default desktop viewport was also inspected during implementation.

Functional checks passed:

- Desktop/main and mobile menu links lead directly to the menu.
- Ingredient search for “flavoured butter” returns the six Lava Grill entries, including category-level accompaniment information.
- A nonsense search shows zero results and a working clear/reset action restores all 103 entries.
- Phone category dropdown scrolls to Desserts with the heading below the sticky category control.
- Mobile navigation opens/closes; reservation activation closes it and restores focus to the toggle.
- Reservation buttons display the placeholder message and do not create a booking, navigate to a phone/WhatsApp URL, or collect information.
- All four homepage image slots load successfully. No final browser console errors were recorded.
- Temporary viewport overrides were reset after QA.

## Refinement pass

Increased menu description and price sizes after viewing the first rendering; improved ingredient search to include category notes; fixed keyboard-focus contrast in the terracotta Visit section; restored mobile focus after reservation activation; corrected whitespace when mobile line breaks are hidden; adjusted the pizza focal point; and used the faithful original full logo in the dark footer.

## Limits

No real-device Safari/Android test or formal assistive-technology audit was performed. The menu's uncertain source price and notes remain flagged for owner verification. Business identity/contact details are unverified and intentionally empty; the supplied space images are architectural renders, and food photos are visibly illustrative. Reservations, signup, social/review links and press remain as scoped in CONTENT_NEEDED.md. Deployment verification is reported separately by the hosting result.

Working screenshots are in ignored `tmp/`: `home-desktop.png`, `home-mobile.png`, `menu-desktop.png`, and `menu-mobile.png`.
