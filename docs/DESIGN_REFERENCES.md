# Open-source references — 27 October 2026

The update preserves the dependency-free static site. No animation framework, React runtime or third-party carousel was added.

- [Motion](https://github.com/motiondivision/motion), MIT: reference for restrained entrance timing, transform-based motion and reduced-motion behaviour. The site uses its own CSS/IntersectionObserver implementation rather than copying Motion code or examples.
- [Embla Carousel](https://github.com/davidjerleke/embla-carousel), MIT: reference for fluid swipeable photography, progress feedback and explicit carousel controls. The site uses its own native scrolling, CSS scroll snap and small progressive-enhancement controller. Pointer drag, touch scrolling, keyboard arrows, previous/next and pause are supported.
- [Simple Icons](https://github.com/simple-icons/simple-icons): Instagram, Facebook and WhatsApp SVGs downloaded from the project's official `develop/icons/` sources. The downloaded upstream CC0 license is retained at `dist/assets/icons/Simple-Icons-LICENSE.md`. Icons indicate their respective platforms; they do not imply account ownership or affiliation. Missing account destinations render labelled coming-soon buttons.

The circular food-through-fire seal is original SVG/CSS typesetting around the supplied lotus. It is decorative and hidden from assistive technology. Its rotation, section reveals and animated transitions respect reduced-motion preferences. The gallery has a visible pause button, pauses on hover/focus/offscreen/hidden tabs, and disables autoplay for reduced motion. Photographs are not generatively altered.
