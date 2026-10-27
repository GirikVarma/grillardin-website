import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import vm from 'node:vm';
import {escape,image,header,footer,seal,gallery,reviews,business} from './components.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),dist=resolve(root,'dist');
const context={window:{}};
for(const f of ['menu','site','photos'])vm.runInNewContext(readFileSync(resolve(dist,`data/${f}.js`),'utf8'),context);
const {GRILLARDIN_MENU:menu,GRILLARDIN_SITE:site,GRILLARDIN_PHOTOS:photos}=context.window;
const p=(className,value)=>value?`<p class="${className}">${escape(value)}</p>`:'';
function marked(html,name,markup){const a=`<!-- ${name}_START -->`,b=`<!-- ${name}_END -->`;if(!html.includes(a)||!html.includes(b))throw Error(`Missing markers: ${name}`);return html.slice(0,html.indexOf(a)+a.length)+'\n'+markup+'\n'+html.slice(html.indexOf(b));}
const photoById=id=>photos.find(p=>p.id===id);
const menuMarkup=menu.categories.map((category,i)=>{
 const selected=(site.menuPhotos[category.id]||[]).map(photoById);
 const photography=selected.length?`<div class="menu-photo-pair">${selected.map((photo,index)=>`<figure>${image(photo,{sizes:'(max-width: 760px) 42vw, 28vw'})}<figcaption>${index===0?'From the Grillardin table':'A closer look'}</figcaption></figure>`).join('')}</div>`:'';
 return `<section class="menu-category" id="${escape(category.id)}" aria-labelledby="heading-${escape(category.id)}"><div class="category-heading"><span>${String(i+1).padStart(2,'0')}</span><h2 id="heading-${escape(category.id)}">${escape(category.name)}</h2></div>${photography}${p('category-description',category.description)}<div class="menu-items">${category.items.map(item=>`<article class="menu-item"><div class="item-heading"><h3>${escape(item.name)}</h3><span class="item-price">${escape(item.price)}</span></div>${p('item-description',item.description)}${item.note&&item.note.replace(/\.$/,'')!==item.price?p('item-note',item.note):''}</article>`).join('')}</div>${p('category-note',category.note)}</section>`;
}).join('\n');
for(const page of ['index.html','menu.html','story.html']){
 const path=resolve(dist,page);let html=readFileSync(path,'utf8');
 html=html.replace(/<header class="site-header">[\s\S]*?<\/header>/,header(page));
 html=html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,footer(site));
 if(page==='menu.html')html=marked(html,'MENU_CONTENT',menuMarkup);
 if(page==='index.html'){
  html=marked(html,'GALLERY',gallery(photos));html=marked(html,'REVIEWS',reviews(site));
  html=marked(html,'BUSINESS',business(site));html=marked(html,'HERO_SEAL',seal());
 }
 if(page==='story.html'){
  const article=`<div class="story-article-layout section-wrap"><aside><span class="eyebrow">The Grillardin story</span><span class="article-line"></span><a href="menu-original.pdf#page=3" target="_blank" rel="noopener">From our printed menu ↗</a></aside><article class="story-article" aria-labelledby="journey-title"><p class="eyebrow">Food through fire</p><h2 id="journey-title">${escape(site.story.pageTitle)}</h2>${site.story.paragraphs.map((text,i)=>`<p class="${i===0?'article-lede':i>=7?'article-closing':''}">${escape(text)}</p>`).join('')}</article></div><div class="story-food-strip section-wrap">${[photos[0],photos[11],photos[23]].map(photo=>`<figure>${image(photo,{sizes:'(max-width: 760px) 60vw, 30vw'})}<figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>`;
  html=marked(html,'STORY_ARTICLE',article);html=marked(html,'STORY_SEAL',seal('seal-story'));
 }
 html=html.replace(/<img\b[^>]*data-image="([^"]+)"[^>]*>/g,(tag,slot)=>{
  const asset=site.images[slot];if(!asset)return tag;
  const interior=asset.src.includes('/interiors/');
  tag=tag.replace(/\s(?:src|srcset|sizes|alt)="[^"]*"/g,'');
  return tag.replace(/>$/,` src="${escape(asset.src)}" srcset="${escape(asset.small)} ${asset.smallWidth||(interior?800:900)}w, ${escape(asset.src)} ${asset.width||1600}w" sizes="${slot==='room'?'90vw':'(max-width: 760px) 88vw, 48vw'}" alt="${escape(asset.alt)}">`);
 });
 html=html.replace(/(<figcaption data-caption="([^"]+)">)[\s\S]*?<\/figcaption>/g,(_,tag,slot)=>tag+escape(site.images[slot]?.caption||'')+'</figcaption>');
 html=html.replace(/(<(?:p|h2)\b[^>]*data-story="([^"]+)"[^>]*>)[\s\S]*?(<\/(?:p|h2)>)/g,(_,tag,key,end)=>tag+escape(site.story[key]||'')+end);
 writeFileSync(path,html);
}
console.log(`Built 3 pages, ${menu.categories.length} categories / ${menu.categories.reduce((n,c)=>n+c.items.length,0)} menu entries, ${photos.length} food photographs, and the source story.`);
