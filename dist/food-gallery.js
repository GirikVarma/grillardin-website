(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setupSlideshow() {
    const stage = document.querySelector('#food-slideshow');
    if (!window.Swiper) return;

    const gallery = document.querySelector('#gallery');
    const count = document.querySelector('#food-slide-count');
    const timer = document.querySelector('.food-slide-timer');
    const play = document.querySelector('[data-gallery-pause]');
    const thumbs = [...document.querySelectorAll('.food-thumb')];
    const pad = number => String(number).padStart(2, '0');
    let wantsPlay = !reducedMotion.matches;
    let inView = false;

    gallery.classList.add('is-ready');
    const slider = new window.Swiper(stage, {
      effect: 'creative',
      creativeEffect: {
        prev: { translate: ['-34%', 0, -160], scale: 0.9, opacity: 0.35 },
        next: { translate: ['100%', 0, 0] },
      },
      loop: true,
      speed: reducedMotion.matches ? 0 : 850,
      grabCursor: true,
      lazyPreloadPrevNext: 1,
      a11y: {wrapperLiveRegion: false},
      autoplay: {
        enabled: false,
        delay: 2800,
        disableOnInteraction: false,
      },
      on: {
        realIndexChange(swiper) {
          renderCurrentPhoto(swiper.realIndex);
        },
        autoplayTimeLeft(_swiper, _timeLeft, fractionLeft) {
          timer.style.setProperty('--progress', 1 - fractionLeft);
        },
      },
    });

    function renderCurrentPhoto(index) {
      const current = index + 1;
      count.querySelector('b').textContent = pad(current);
      count.setAttribute('aria-label', `Photo ${current} of ${thumbs.length}`);
      for (const [thumbIndex, thumb] of thumbs.entries()) {
        if (thumbIndex === index) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      }
    }

    function syncPlayback() {
      play.setAttribute('aria-label', wantsPlay ? 'Pause food slideshow' : 'Play food slideshow');
      play.firstElementChild.textContent = wantsPlay ? 'Ⅱ' : '▶';
      const shouldPlay = wantsPlay && inView && document.visibilityState === 'visible';
      if (shouldPlay && !slider.autoplay.running) slider.autoplay.start();
      if (!shouldPlay && slider.autoplay.running) slider.autoplay.stop();
    }

    play.addEventListener('click', () => {
      wantsPlay = !wantsPlay;
      syncPlayback();
    });
    gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => slider.slidePrev());
    gallery.querySelector('[data-gallery-next]').addEventListener('click', () => slider.slideNext());
    for (const [index, thumb] of thumbs.entries()) {
      thumb.addEventListener('click', () => slider.slideToLoop(index));
    }
    gallery.addEventListener('focusin', event => {
      if (event.target === play || !event.target.matches(':focus-visible')) return;
      wantsPlay = false;
      syncPlayback();
    });
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', event => {
      slider.params.speed = event.matches ? 0 : 850;
      if (event.matches) wantsPlay = false;
      syncPlayback();
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.intersectionRatio >= 0.3;
        syncPlayback();
      }, { threshold: 0.3 });
      observer.observe(stage);
    } else {
      inView = true;
    }
    gallery.querySelector('.food-slide-controls').hidden = false;
    gallery.querySelector('.food-filmstrip').hidden = false;
    renderCurrentPhoto(slider.realIndex);
    syncPlayback();
  }

  function setupScrollReel() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) return;

    const reel = document.querySelector('#scroll-reel');
    const pin = reel.querySelector('.food-reel-pin');
    const frames = [...reel.querySelectorAll('.food-reel-frame')];
    const meter = reel.querySelector('.food-reel-meter span');
    const counter = reel.querySelector('.food-reel-count b');

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      reel.classList.add('is-animated');

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate() {
          const progress = this.progress();
          const frame = progress < 0.29 ? 1 : progress < 0.71 ? 2 : 3;
          counter.textContent = `0${frame}`;
        },
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${Math.max(600, Math.round(window.innerHeight * 1.12))}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.24,
        },
      });

      timeline
        .to(meter, { scaleX: 1, duration: 1 }, 0)
        .fromTo(frames[0].querySelector('img'), { scale: 1.03 }, { scale: 1.15, duration: 0.44 }, 0)
        .to(frames[1], { clipPath: 'inset(0% 0% 0%)', duration: 0.29 }, 0.14)
        .fromTo(frames[1].querySelector('img'), { scale: 1.14 }, { scale: 1.015, duration: 0.69 }, 0.14)
        .to(frames[2], { clipPath: 'inset(0% 0% 0%)', duration: 0.31 }, 0.55)
        .fromTo(frames[2].querySelector('img'), { scale: 1.13 }, { scale: 1.01, duration: 0.45 }, 0.55);

      return () => {
        reel.classList.remove('is-animated');
        counter.textContent = '01';
      };
    });
  }

  setupSlideshow();
  setupScrollReel();

  // ScrollTrigger measures the pinned section during startup. Resolve the
  // initial fragment after layout so it uses the final page positions.
  const initialHash = location.hash;
  const target = document.getElementById(initialHash.slice(1));
  const navigationType = performance.getEntriesByType('navigation')[0]?.type;
  if (target && navigationType === 'navigate') {
    requestAnimationFrame(() => {
      if (location.hash === initialHash) target.scrollIntoView({behavior: 'instant'});
    });
  }
})();
