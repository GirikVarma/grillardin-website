import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'), dist=resolve(root,'dist');
const read=file=>readFileSync(resolve(dist,file),'utf8');
const context={window:{}};
for(const file of ['data/menu.js','data/site.js','data/photos.js']) vm.runInNewContext(read(file),context);
const {GRILLARDIN_MENU:menu,GRILLARDIN_SITE:site,GRILLARDIN_PHOTOS:photos}=context.window;
assert.equal(menu.categories.length,13,'Source has 13 categories');
assert.equal(menu.categories.reduce((n,c)=>n+c.items.length,0),103,'Source has 103 priced menu rows');
assert.equal(new Set(menu.categories.map(c=>c.id)).size,13,'Unique category anchors');
assert.equal(menu.categories.find(c=>c.id==='salads').items.find(i=>i.name.includes('Bocconcini')).price,'Rs. 400','Owner-confirmed salad price');
assert.equal(menu.categories.find(c=>c.id==='add-ons').note,undefined,'Owner removed the stray Add Ons line');
assert.equal(menu.categories.find(c=>c.id==='shakes').items.some(i=>i.name==='TEA'),true,'Tea grouping preserved');
assert.equal(photos.length,25,'All supplied photos are included');
assert.equal(site.story.paragraphs.length,9,'Full source story is retained');
assert.equal(site.reservation.mode,'placeholder','Booking remains a prototype');
assert.equal(site.signup.enabled,false,'No personal data collection');
for(const page of ['index.html','menu.html','story.html']){
 const html=read(page);
 assert.match(html,/<title>[^<]+<\/title>/,'Page title');
 assert.match(html,/<meta name="viewport"/,'Responsive viewport');
 assert.doesNotMatch(html,/<form\b/,'No customer-data form');
 assert.match(html,/<a href="\.\/"[^>]*>Home<\/a>/,'Home navigation is explicit');
 assert.match(html,/href="story.html"/,'Story is accessible directly');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`No duplicate IDs in ${page}`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:|tel:)/.test(url))continue;
  const [name,hash]=url.split('#');
  const file=name==='./'?'index.html':name||page;
  assert.ok(existsSync(resolve(dist,file)),`Missing ${url} in ${page}`);
  if(hash&&file.endsWith('.html'))assert.match(read(file),new RegExp(`id="${hash}"`),`Missing anchor ${url}`);
 }
}
const homeHtml=read('index.html'),storyHtml=read('story.html');
assert.equal([...homeHtml.matchAll(/class="gallery-slide"/g)].length,25,'All supplied photos in carousel');
assert.equal([...homeHtml.matchAll(/class="guest-quote"/g)].length,10,'Ten attributed review excerpts');
assert.equal(site.reviews.length,10,'Ten selected guest reviews');
assert.equal(new Set(site.reviews.map(r=>r.author)).size,10,'Ten different reviewers');
assert.ok(site.reviews.every(r=>r.stars===5&&r.url.startsWith('https://')&&r.checked==='2026-10-27'),'All reviews verified five-star sources');
assert.equal([...homeHtml.matchAll(/class="review-pair"/g)].length,5,'Five pairs of reviews');
assert.equal([...homeHtml.matchAll(/aria-label="[1-5] of 5" hidden/g)].length,4,'Only one pair is initially visible');
const menuText=JSON.stringify(menu);
for(const typo of ['Iceburg','Pinapple','Watermilon','Miixed','Tandoori chicke,','Burre Blanc','Portabello','Candid Rose','Gulam Jamun','Gulukand','Mukkwas','Kolkatta','Amratsari'])assert.ok(!menuText.includes(typo),`Corrected ${typo}`);
for(const regional of ['Shaoji','Safeed','khumb','matter'])assert.ok(menuText.includes(regional),`Regional spelling retained: ${regional}`);
assert.match(homeHtml,/data-review-pause/,'Guest reviews can be paused');
assert.match(homeHtml,/data-gallery-pause/,'Visible autoplay pause control');
assert.match(homeHtml,/data-social-pending="Instagram"/,'Social links are honest placeholders');
assert.doesNotMatch(homeHtml,/assets\/food\//,'Homepage stock food photography replaced');
assert.doesNotMatch(homeHtml,/Photographs of Grillardin’s own dishes are on their way/,'Old image placeholder removed');
assert.match(storyHtml,/The Journey of Grilling/,'Dedicated story page');
assert.match(storyHtml,/We are delighted that you have chosen Grillardin/,'Story closing retained');
assert.match(read('enhancements.css'),/prefers-reduced-motion/,'Motion preference respected');
for(const photo of photos)for(const key of ['src','small'])assert.ok(existsSync(resolve(dist,photo[key])),`Missing supplied photo ${photo[key]}`);
for(const [slot,image] of Object.entries(site.images))for(const key of ['src','small']){
 if(!image[key])continue;
 assert.ok(existsSync(resolve(dist,image[key])),`Missing ${slot} ${key}: ${image[key]}`);
 assert.ok(statSync(resolve(dist,image[key])).size>1000,`Empty image ${image[key]}`);
}
const menuHtml=read('menu.html');
assert.equal([...menuHtml.matchAll(/class="menu-item"/g)].length,103,'All entries are readable in pre-rendered HTML');
for(const file of ['app.js','enhancements.js','data/menu.js','data/site.js','data/photos.js'])execFileSync(process.execPath,['--check',resolve(dist,file)]);
console.log('PASS: 3 pages, 103 menu rows, owner corrections, full story, 25 photos, review attribution, Home navigation, local links/assets/anchors, JS syntax, prototype constraints.');
