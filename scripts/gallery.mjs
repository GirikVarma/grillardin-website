import {escape, image} from './components.mjs';

const pad = number => String(number).padStart(2, '0');

export function gallery({slideshow, reel}, photoById) {
  const slides = slideshow.map(photoById);
  const reelPhotos = reel.map(photoById);

  const shots = slides.map(photo => {
    const portrait = photo.height > photo.width;
    const backdrop = portrait
      ? `<img class="food-shot-backdrop" src="${escape(photo.small)}" alt="" aria-hidden="true" loading="lazy" decoding="async">`
      : '';
    return `<div class="swiper-slide food-shot${portrait ? ' food-shot-portrait' : ''}">${backdrop}${image(photo, {
      className: 'food-shot-image',
      sizes: portrait ? '(max-width: 700px) 60vw, 35vw' : '(max-width: 700px) 92vw, 76vw',
    })}</div>`;
  }).join('\n');

  const thumbs = slides.map((photo, index) =>
    `<button class="food-thumb" type="button" data-food-slide="${index}" aria-label="Show photo ${index + 1} of ${slides.length}" aria-controls="food-slideshow"${index === 0 ? ' aria-current="true"' : ''}>
      <img src="${escape(photo.small)}" alt="" loading="lazy" decoding="async">
      <span aria-hidden="true">${pad(index + 1)}</span>
    </button>`
  ).join('\n');

  const frames = reelPhotos.map(photo =>
    `<figure class="food-reel-frame">${image(photo, {sizes: '(min-width: 1600px) 1600px, 100vw'})}</figure>`
  ).join('\n');

  return `<div class="food-showcase">
  <section id="gallery" class="food-gallery section-wrap" aria-labelledby="gallery-title">
    <div class="food-gallery-head">
      <h2 id="gallery-title">Food gallery</h2>
      <a class="food-reel-jump" href="#scroll-reel">More photos <span aria-hidden="true">↘</span></a>
    </div>
    <div class="food-gallery-grid">
      <div class="food-slideshow">
        <div class="swiper" id="food-slideshow" role="group" aria-roledescription="carousel" aria-label="Grillardin food photos">
          <div class="swiper-wrapper">${shots}</div>
        </div>
        <div class="food-slide-controls" aria-label="Slideshow controls" hidden>
          <div class="food-slide-status">
            <span id="food-slide-count" aria-label="Photo 1 of ${slides.length}"><b>01</b> <span>/</span> ${pad(slides.length)}</span>
            <div class="food-slide-timer" aria-hidden="true"></div>
          </div>
          <div class="food-slide-buttons">
            <button type="button" data-gallery-prev aria-label="Previous photo" aria-controls="food-slideshow"><span aria-hidden="true">←</span></button>
            <button type="button" data-gallery-pause aria-label="Pause food slideshow" aria-controls="food-slideshow"><span aria-hidden="true">Ⅱ</span></button>
            <button type="button" data-gallery-next aria-label="Next photo" aria-controls="food-slideshow"><span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
      <div class="food-filmstrip" aria-label="Choose a photo" hidden>${thumbs}</div>
    </div>
  </section>
  <section id="scroll-reel" class="food-reel" aria-labelledby="food-reel-title">
    <header class="food-reel-head section-wrap">
      <h2 id="food-reel-title">From our kitchen</h2>
      <p class="food-reel-instruction"><span aria-hidden="true">↓</span> Scroll for more photos</p>
    </header>
    <div class="food-reel-pin">
      <div class="food-reel-canvas">${frames}</div>
      <div class="food-reel-controls" aria-hidden="true">
        <span class="eyebrow">Grillardin</span>
        <div class="food-reel-meter"><span></span></div>
        <span class="food-reel-count"><b>01</b> / ${pad(reelPhotos.length)}</span>
      </div>
    </div>
  </section>
</div>`;
}
