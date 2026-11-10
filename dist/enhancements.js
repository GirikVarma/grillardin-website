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
  $$('.section-heading,.space-heading,.story-copy,.guest-heading,.story-page-intro,.story-article h2,.story-food-strip').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.85){el.classList.add('will-reveal');reveal.observe(el)}});
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
})();
