(() => {
 'use strict';
 const $=(s,base=document)=>base.querySelector(s),$$=(s,base=document)=>[...base.querySelectorAll(s)];
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 let frame;
 function updateProgress(){frame=null;const range=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${range>0?scrollY/range:0})`;}
 window.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateProgress)},{passive:true});updateProgress();
 // Content is visible by default; only off-screen elements opt into a reveal.
 if(!motion.matches&&'IntersectionObserver' in window){
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');reveal.unobserve(entry.target)}}),{threshold:0.08});
  $$('.section-heading,.gallery-heading,.space-heading,.story-copy,.guest-heading,.story-page-intro,.story-article h2,.story-food-strip').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.85){el.classList.add('will-reveal');reveal.observe(el)}});
 }
 $$('[data-social-pending]').forEach(button=>button.addEventListener('click',()=>{
  const toast=$('#reservation-message');if(!toast)return;
  $('span',toast).textContent=`${button.dataset.socialPending} link coming soon.`;toast.hidden=false;
  clearTimeout(button._messageTimer);button._messageTimer=setTimeout(()=>{toast.hidden=true},5000);
 }));
 function initReviews(){
  const section=$('.guest-section');if(!section)return;
  const pairs=$$('.review-pair',section),cards=$$('.guest-quote',section),pause=$('[data-review-pause]',section);
  // Shuffle the cards once so every guest appears exactly once in a full rotation.
  for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]]}
  pairs.forEach((pair,i)=>pair.replaceChildren(...cards.slice(i*2,i*2+2)));
  let current=0,paused=motion.matches,hover=false,focus=false,visible=false,timer;
  function label(){pause.disabled=motion.matches;pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',motion.matches?'Automatic reviews disabled by reduced motion preference':paused?'Play guest reviews':'Pause guest reviews');$('[data-review-pause-label]',pause).textContent=motion.matches?'Motion off':paused?'Play':'Pause'}
  function schedule(){clearTimeout(timer);if(!paused&&!motion.matches&&!hover&&!focus&&visible&&!document.hidden)timer=setTimeout(()=>go(current+1,false),7000)}
  function go(next,manual=true){
   pairs[current].getAnimations().forEach(animation=>animation.cancel());pairs[current].hidden=true;
   current=(next+pairs.length)%pairs.length;const incoming=pairs[current];incoming.hidden=false;
   if(!motion.matches)incoming.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.3,1)'});
   $('[data-review-index]',section).textContent=String(current+1).padStart(2,'0');
   if(manual){paused=true;label();$('[data-review-status]',section).textContent=`Showing ${cards.length} selected reviews, pair ${current+1} of ${pairs.length}: ${$$('figcaption strong',incoming).map(el=>el.textContent).join(' and ')}.`}
   schedule();
  }
  $('[data-review-prev]',section).addEventListener('click',()=>go(current-1));
  $('[data-review-next]',section).addEventListener('click',()=>go(current+1));
  pause.addEventListener('click',()=>{paused=!paused;label();schedule()});
  section.addEventListener('mouseenter',()=>{hover=true;schedule()});section.addEventListener('mouseleave',()=>{hover=false;schedule()});
  section.addEventListener('focusin',()=>{focus=true;schedule()});section.addEventListener('focusout',()=>requestAnimationFrame(()=>{focus=section.contains(document.activeElement);schedule()}));
  document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{if(motion.matches)paused=true;label();schedule()});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.15}).observe(section);
  $('.review-navigation',section).hidden=false;label();
 }
 initReviews();
 const gallery=$('.food-gallery');if(!gallery)return;
 const track=$('.gallery-track',gallery),slides=$$('.gallery-slide',track),pause=$('[data-gallery-pause]',gallery);
 let index=0,manualPaused=motion.matches,hovered=false,focused=false,visible=false,timer=null;
 const canPlay=()=>!manualPaused&&!motion.matches&&!hovered&&!focused&&visible&&!document.hidden;
 function label(){pause.disabled=motion.matches;pause.setAttribute('aria-pressed',String(manualPaused));pause.setAttribute('aria-label',motion.matches?'Slideshow disabled by reduced motion preference':manualPaused?'Play food slideshow':'Pause food slideshow');$('[data-pause-label]',pause).textContent=motion.matches?'Motion off':manualPaused?'Play':'Pause';$('span[aria-hidden]',pause).textContent=manualPaused?'▷':'Ⅱ';}
 function schedule(){clearTimeout(timer);if(canPlay())timer=setTimeout(()=>{go(index+1,false);schedule()},5500)}
 function stop(){manualPaused=true;label();schedule()}
 function go(next,byUser=true){index=(next+slides.length)%slides.length;const left=slides[index].offsetLeft-slides[0].offsetLeft;track.scrollTo({left,behavior:motion.matches||index===0?'instant':'smooth'});if(byUser)stop();$('[data-gallery-index]',gallery).textContent=String(index+1).padStart(2,'0');}
 $('[data-gallery-prev]',gallery).addEventListener('click',()=>go(index-1));
 $('[data-gallery-next]',gallery).addEventListener('click',()=>go(index+1));
 pause.addEventListener('click',()=>{manualPaused=!manualPaused;label();schedule()});
 track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(index+(event.key==='ArrowRight'?1:-1))}});
 track.addEventListener('pointerdown',stop,{passive:true});
 let downX=null,initialScroll=0,isDragging=false;
 track.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button===0){downX=event.clientX;initialScroll=track.scrollLeft;isDragging=false;track.setPointerCapture(event.pointerId)}});
 track.addEventListener('pointermove',event=>{if(downX===null)return;const delta=event.clientX-downX;if(Math.abs(delta)>4)isDragging=true;if(isDragging){track.classList.add('is-dragging');track.scrollLeft=initialScroll-delta}});
 function endDrag(){downX=null;track.classList.remove('is-dragging')}
 track.addEventListener('pointerup',endDrag);track.addEventListener('pointercancel',endDrag);
 track.addEventListener('scroll',()=>{const left=track.scrollLeft;index=slides.reduce((best,slide,i)=>Math.abs(slide.offsetLeft-slides[0].offsetLeft-left)<Math.abs(slides[best].offsetLeft-slides[0].offsetLeft-left)?i:best,0);$('[data-gallery-index]',gallery).textContent=String(index+1).padStart(2,'0')},{passive:true});
 gallery.addEventListener('mouseenter',()=>{hovered=true;schedule()});gallery.addEventListener('mouseleave',()=>{hovered=false;schedule()});
 gallery.addEventListener('focusin',()=>{focused=true;schedule()});gallery.addEventListener('focusout',()=>{requestAnimationFrame(()=>{focused=gallery.contains(document.activeElement);schedule()})});
 document.addEventListener('visibilitychange',schedule);
 motion.addEventListener('change',()=>{if(motion.matches)manualPaused=true;label();schedule()});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.15}).observe(gallery);
 label();
})();
