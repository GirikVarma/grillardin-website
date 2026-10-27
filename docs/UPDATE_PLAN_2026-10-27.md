# Grillardin update plan — 27 October 2026

## Direction and acceptance

Keep the warm cream, olive, terracotta and original lotus identity, but make real food the visual lead. Use a layered hero composition with a slow decorative circular seal, photographic hover depth, gentle section entrances, and a horizontal food carousel. Motion (https://github.com/motiondivision/motion) informs restrained reveal timing; Embla Carousel (https://github.com/davidjerleke/embla-carousel) informs fluid swiping and explicit carousel controls. Implement with native browser/CSS capabilities, preserving the dependency-free static stack. All movement respects reduced motion; autoplay has a visible pause control and pauses offscreen, when the tab is hidden, on hover and keyboard focus.

1. Preserve the existing Site ID, audience, static build, 103 menu rows and working menu search. Synchronize its source before changing files.
2. Inspect all 25 provided food images, optimize them into 800/1600px WebP variants without upscaling, keep a numbered filename/provenance manifest, and use descriptive captions without guessing exact dish identities. Replace both stock homepage images; use the collection in a lazy-loaded carousel and selected category interludes in the menu. No image is assigned as proof of a particular named dish unless confirmed.
3. Add explicit Home navigation across desktop, mobile and footer on all three pages. Our Story navigation and the homepage story button lead to story.html. Populate the homepage with a brief based on menu page 3 and the dedicated page with the complete source story, preserving its meaning and wording.
4. Add a visually distinctive guest-review section using short exact excerpts from named Google reviewers, a dated Google rating snapshot and a source link. Verify the correct listing directly rather than using aggregator ratings.
5. Use the Google profile's address, telephone and weekly hours. Add directions and source links. Do not activate reservations merely because a third-party booking link exists. Keep the existing reservation message.
6. Add small recognizable Instagram/Facebook/WhatsApp icons. With account URLs unprovided, render clearly labelled coming-soon controls, not generic platform URLs or invented handles. Store URLs in central config for later activation.
7. Resolve user-confirmed menu details: bocconcini salad Rs. 400; omit the unpriced Coriander Onion/Mushroom/Chili Cheese line; preserve soup/salad choices, Tea placement and source spellings. Record suspected spellings separately, never silently correct them.
8. Update build generation and regression checks for story content, all 103 rows, sources, all local assets, Home navigation, social placeholders, carousel controls, confirmed price and removed stray note. Review desktop, phone and tablet screenshots; test gallery navigation/pause, search/empty state/category jump and reservation message. Refine observed visual defects before publishing the updated source and opening the same private URL.

## Verified evidence

- Story: supplied Menu New.pdf, page 3, visually checked and text extracted.
- Photos: all 25 JPEGs in the user-supplied WhatsApp folder; contact sheet inspected.
- Google Maps listing: Grillardin, location 28.4050462 / 77.0587197, business ID 0x390d2394bd147d0d:0x6c6b79255ca7e30. Direct profile inspected on 27 October 2026: 4.8 from 475 reviews; 1st Floor, M3M IFC, Badshahpur, Sector 66, Gurugram, Haryana 122101; 096677 15068; daily 12:30–11:30 pm. Holiday hours may differ. District/Zomato and older listings conflict on sector, postal code, phone or operating status, so they are not used for the public facts.
- Google excerpts: divya jhawar (5 stars, displayed 4 months ago), Shalini S (5 stars, displayed 6 months ago). Use short excerpts totalling fewer than 25 quoted words across the profile; no fabricated dates, avatars or testimonials. Present as selected excerpts, not a complete or statistically representative review sample.

## Deliberate limits

No booking engine, signup, personal data submission, new backend, invented social account, unsupported dish-photo mapping, publication/award claim or change of Site audience. The supplied interior images remain accurately captioned design renders.
