(() => {
  'use strict';
  const site = window.GRILLARDIN_SITE;
  const $ = (s, base = document) => base.querySelector(s);
  const $$ = (s, base = document) => [...base.querySelectorAll(s)];
  function element(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function safeUrl(value) {
    if (!value) return null;
    try { const url = new URL(value); return ['https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  }
  function link(text, url) {
    const href = safeUrl(url);
    if (!href) return null;
    const el = element('a', '', text); el.href = href;
    if (href.startsWith('https:')) { el.target = '_blank'; el.rel = 'noopener'; }
    return el;
  }
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  $$('[data-image]').forEach(img => {
    const asset = site.images[img.dataset.image];
    if (!asset) return;
    img.src = asset.src; img.alt = asset.alt;
    if (asset.small) {
      const interior = asset.src.includes('/interiors/');
      img.srcset = `${asset.small} ${asset.smallWidth || (interior ? 800 : 900)}w, ${asset.src} ${asset.width || (interior ? 1600 : 1800)}w`;
      img.sizes = img.dataset.image === 'room' ? '90vw' : '(max-width: 760px) 88vw, 48vw';
    }
  });
  $$('[data-caption]').forEach(el => { el.textContent = site.images[el.dataset.caption]?.caption || ''; });
  $$('[data-story]').forEach(el => { if (site.story[el.dataset.story]) el.textContent = site.story[el.dataset.story]; });
  const navToggle = $('.nav-toggle'), mobileNav = $('#mobile-nav');
  function closeNav() { if (!navToggle) return; navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', 'Open navigation'); mobileNav.hidden = true; }
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation'); mobileNav.hidden = expanded;
  });
  $$('#mobile-nav a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') { closeNav(); navToggle.focus(); } });
  const toast = $('#reservation-message'); let toastTimer;
  $$('[data-reserve]').forEach(button => button.addEventListener('click', () => {
    const url = site.reservation.mode === 'link' && safeUrl(site.reservation.url);
    if (url) { window.location.assign(url); return; }
    const fromMobileNav = mobileNav?.contains(button);
    closeNav(); if (fromMobileNav) navToggle.focus();
    clearTimeout(toastTimer); $('span', toast).textContent = site.reservation.message;
    toast.hidden = false; toastTimer = setTimeout(() => { toast.hidden = true; }, 7000);
  }));
  $('button', toast)?.addEventListener('click', () => { toast.hidden = true; clearTimeout(toastTimer); });
  const business = $('#business-details');
  if (business && !business.hasAttribute('data-built-business') && (site.address || site.hours.length || site.phone || site.email || site.directionsUrl || site.whatsappUrl)) {
    business.replaceChildren();
    if (site.address) business.append(element('address', '', site.address));
    if (site.hours.length) { const dl = element('dl'); site.hours.forEach(({ days, time }) => { dl.append(element('dt', '', days), element('dd', '', time)); }); business.append(dl); }
    [['Directions', site.directionsUrl], ['Call us', site.phone && `tel:${site.phone}`], ['Email', site.email && `mailto:${site.email}`], ['WhatsApp', site.whatsappUrl]].forEach(([text, url]) => { const a = link(text, url); if (a) business.append(a); });
  }
  const press = $('#press-section');
  const verifiedPress = site.press.filter(item => safeUrl(item.url) && item.title && item.publication);
  if (press && verifiedPress.length) { press.hidden = false; press.append(element('h2', '', 'In good company.')); verifiedPress.forEach(item => press.append(link(`${item.publication} — ${item.title}`, item.url))); }

  const menu = window.GRILLARDIN_MENU;
  if (!menu || !$('#menu-content')) return;
  const content = $('#menu-content'), categoryNav = $('#category-nav'), categorySelect = $('#category-select'), search = $('#menu-search'), clear = $('#clear-search'), count = $('#menu-count');
  const total = menu.categories.reduce((n, category) => n + category.items.length, 0);
  const allSections = [];
  menu.categories.forEach((category, i) => {
    const a = element('a', '', category.name); a.href = `#${category.id}`; categoryNav.append(a);
    const option = element('option', '', category.name); option.value = category.id; categorySelect.append(option);
    const existing = document.getElementById(category.id);
    const haystack = item => `${item.name} ${item.description || ''} ${item.note || ''} ${category.name} ${category.description || ''} ${category.note || ''}`.toLocaleLowerCase();
    if (existing) {
      const renderedItems = $$('.menu-item', existing);
      allSections.push({section: existing, rows: category.items.map((item, index) => ({el: renderedItems[index], haystack: haystack(item)})), a, option});
      return;
    }
    const section = element('section', 'menu-category'); section.id = category.id; section.setAttribute('aria-labelledby', `heading-${category.id}`);
    const heading = element('div', 'category-heading'); heading.append(element('span', '', String(i + 1).padStart(2, '0')));
    const h2 = element('h2', '', category.name); h2.id = `heading-${category.id}`; heading.append(h2); section.append(heading);
    if (category.description) section.append(element('p', 'category-description', category.description));
    const items = element('div', 'menu-items');
    const rows = category.items.map(item => {
      const row = element('article', 'menu-item'); const top = element('div', 'item-heading');
      top.append(element('h3', '', item.name), element('span', 'item-price', item.price)); row.append(top);
      if (item.description) row.append(element('p', 'item-description', item.description));
      if (item.note && item.note.replace(/\.$/, '') !== item.price) row.append(element('p', 'item-note', item.note));
      items.append(row);
      return { el: row, haystack: haystack(item) };
    });
    section.append(items);
    if (category.note) section.append(element('p', 'category-note', category.note));
    content.append(section); allSections.push({ section, rows, a, option });
  });
  const empty = element('div', 'no-results'); empty.hidden = true;
  empty.append(element('h2', '', 'A different craving?'), element('p', '', 'No dishes match that search. Try another word or explore the whole menu.'));
  const reset = element('button', 'text-link', 'Explore the whole menu ↗'); empty.append(reset); content.append(empty);
  function filterMenu() {
    const query = search.value.trim().toLocaleLowerCase(); let matches = 0;
    document.body.classList.toggle('is-searching', Boolean(query));
    allSections.forEach(({ section, rows, a, option }) => {
      let visible = 0;
      rows.forEach(row => { const match = !query || query.split(/\s+/).every(word => row.haystack.includes(word)); row.el.hidden = !match; if (match) visible++; });
      section.hidden = visible === 0; a.hidden = visible === 0; option.disabled = visible === 0; matches += visible;
    });
    clear.hidden = !search.value; empty.hidden = matches !== 0;
    count.textContent = query ? `${matches} ${matches === 1 ? 'dish' : 'dishes'} found` : `${total} dishes & drinks · ${menu.categories.length} categories`;
    categorySelect.value = '';
  }
  function clearSearch() { search.value = ''; filterMenu(); search.focus(); }
  search.addEventListener('input', filterMenu); clear.addEventListener('click', clearSearch); reset.addEventListener('click', clearSearch); filterMenu();
  categorySelect.addEventListener('change', () => { if (categorySelect.value) { document.getElementById(categorySelect.value)?.scrollIntoView(); history.replaceState(null, '', `#${categorySelect.value}`); } });
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { const current = allSections.find(item => item.section === entry.target); allSections.forEach(item => { item.a.classList.toggle('active', item === current); if (item === current) item.a.setAttribute('aria-current', 'location'); else item.a.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-5% 0px -70% 0px' });
  allSections.forEach(({ section }) => observer.observe(section));
  if (location.hash) requestAnimationFrame(() => { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }); });
})();
