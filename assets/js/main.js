/* Calzado C&D — catálogo, filtros, ficha de producto y bolsa */

// Número de WhatsApp de pedidos, con indicativo de Colombia (57) y sin "+".
const CD_WHATSAPP = '573045309015';

// Envío al cliente
const CD_ENVIO = 20000;
const CD_ENVIO_GRATIS = 200000;
const CD_PAGOS = 'Bancolombia o Nequi';

const $ = (s, el = document) => el.querySelector(s);
const state = { genero: 'todos', cat: 'todas', talla: null, orden: 'destacados', q: '', visibles: 24 };
const PCT = Math.round(CD_REBAJA * 100);
const PAGINA = 24;

// Modelos de la selección premium en la portada (id, índice del color)
const CD_PREMIUM = [['d-maryury', 0], ['juance', 0], ['d-anahi', 2], ['cristiano', 1], ['d-ciaga', 1], ['delta', 1], ['d-pai-de-durazno', 0], ['d-quintanilla', 0]];

// Foto de portada de cada categoría: [id del modelo, índice del color]
const CD_PORTADAS = {
  'mujer-plataforma': ['d-bloom', 0], 'mujer-deportivos': ['d-nova', 0], 'mujer-retro': ['d-quintero', 0],
  'mujer-sandalias': ['d-comfy', 0], 'mujer-importados': ['d-maryury', 0],
  'hombre-casual': ['smood', 1], 'hombre-deportivos': ['calamar', 1], 'hombre-importados': ['juance', 0]
};

function waLink(texto) {
  const base = CD_WHATSAPP ? 'https://wa.me/' + CD_WHATSAPP : 'https://wa.me/';
  return base + '?text=' + encodeURIComponent(texto);
}

/* Precio más bajo entre las variantes (para la tarjeta y el orden) */
function precioDesde(p) {
  const precios = p.variantes.map(v => cdPrecio(p, v)).filter(Boolean);
  if (!precios.length) return null;
  const min = precios.reduce((a, b) => (b.venta < a.venta ? b : a));
  return { ...min, varia: new Set(precios.map(x => x.venta)).size > 1 };
}

function priceHTML(pr, { desde = false, off = false } = {}) {
  if (!pr) return '<span class="ask">Precio a consultar</span>';
  return (desde ? '<span class="from">Desde</span>' : '') +
    `<span class="now">${cdFormato(pr.venta)}</span><span class="was">${cdFormato(pr.antes)}</span>` +
    (off ? `<span class="off">−${PCT}%</span>` : '');
}

function catNombre(genero, cat) {
  const c = (CD_CATEGORIAS[genero] || []).find(x => x.id === cat);
  return c ? c.nombre : '';
}

/* ---------- Catálogo ---------- */
function filtrados() {
  let list = CD_PRODUCTS.filter(p => state.genero === 'todos' || p.genero === state.genero);
  if (state.genero !== 'todos' && state.cat !== 'todas') list = list.filter(p => p.categoria === state.cat);
  if (state.q) {
    const q = cdSlug(state.q);
    list = list.filter(p => cdSlug(p.nombre + ' ' + p.variantes.map(v => v.color).join(' ') + ' ' + p.genero + ' ' + catNombre(p.genero, p.categoria)).includes(q));
  }
  if (state.talla) list = list.filter(p => p.variantes.some(v => v.tallas.includes(state.talla)));
  const pv = p => (precioDesde(p) || {}).venta;
  if (state.orden === 'destacados' && state.genero === 'todos') {
    // Mezcla mujer y hombre para que se vean ambos desde el inicio
    const orden = { retro: 0, plataforma: 1, deportivos: 2, importados: 3, sandalias: 4 };
    const m = list.filter(p => p.genero === 'mujer').sort((a, b) => orden[a.categoria] - orden[b.categoria]);
    const h = list.filter(p => p.genero === 'hombre'), out = [];
    while (m.length || h.length) { out.push(...m.splice(0, 2)); if (h.length) out.push(h.shift()); }
    list = out;
  }
  if (state.orden === 'nombre') list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
  if (state.orden.startsWith('precio')) {
    const dir = state.orden === 'precio-asc' ? 1 : -1;
    list = [...list].sort((a, b) => (pv(a) == null) - (pv(b) == null) || dir * ((pv(a) || 0) - (pv(b) || 0)));
  }
  return list;
}

function cardHTML(p, vi) {
  const v = vi != null ? p.variantes[vi] : (state.talla && p.variantes.find(x => x.tallas.includes(state.talla))) || p.variantes[0];
  const pr = precioDesde(p);
  const alt = v.fotos[1] || (p.variantes[1] && p.variantes[1].fotos[0]);
  const n = p.variantes.length;
  const t = cdTallas(p);
  const sw = p.variantes.slice(0, 7).map(x => `<span class="sw" style="background:${x.hex}" title="${x.color}"></span>`).join('') +
    (n > 7 ? `<span class="sw-more">+${n - 7}</span>` : '');
  return `<button class="card" data-id="${p.id}" data-color="${p.variantes.indexOf(v)}">
    <div class="card-media">
      ${pr ? `<span class="badge">−${PCT}%</span>` : ''}
      ${p.categoria === 'importados' ? '<span class="tag-imp">Importado</span>' : ''}
      <img src="${v.fotos[0]}" alt="Tenis ${p.nombre} ${v.color}" loading="lazy">
      ${alt ? `<img class="alt" src="${alt}" alt="" loading="lazy">` : ''}
    </div>
    <div class="card-body">
      <p class="card-kicker">${CD_GENEROS[p.genero]} · ${catNombre(p.genero, p.categoria)}</p>
      <h3 class="card-name">${p.nombre}</h3>
      <p class="card-meta">${n > 1 ? n + ' colores' : v.color} · Tallas ${t[0]}–${t[t.length - 1]}</p>
      <div class="swatches">${sw}</div>
      <div class="price">${priceHTML(pr, { desde: pr && pr.varia })}</div>
    </div>
  </button>`;
}

function render() {
  const list = filtrados();
  const shown = list.slice(0, state.visibles);
  $('#grid').innerHTML = shown.map(p => cardHTML(p)).join('');
  const rest = list.length - shown.length;
  $('#moreBtn').hidden = rest <= 0;
  $('#moreBtn').textContent = `Ver más modelos (${rest})`;
  $('#empty').textContent = state.q
    ? `No encontramos "${state.q}". Prueba con otro nombre o escríbenos por WhatsApp.`
    : 'No hay modelos disponibles en esa talla. Escríbenos y te ayudamos a encontrar uno.';
  $('#empty').hidden = list.length > 0;
  $('#resultCount').textContent = list.length + (list.length === 1 ? ' modelo' : ' modelos');
  $('#catTitle').textContent = state.genero === 'todos' ? 'Nuestro catálogo'
    : state.cat === 'todas' ? `Tenis para ${state.genero}` : `${CD_GENEROS[state.genero]} · ${catNombre(state.genero, state.cat)}`;
}

function paintFilters() {
  document.querySelectorAll('#genderTabs .g-btn').forEach(b => b.classList.toggle('is-active', b.dataset.genero === state.genero));
  const tabs = $('#catTabs');
  if (state.genero === 'todos') { tabs.hidden = true; tabs.innerHTML = ''; }
  else {
    const cats = CD_CATEGORIAS[state.genero];
    const count = c => CD_PRODUCTS.filter(p => p.genero === state.genero && (c === 'todas' || p.categoria === c)).length;
    tabs.hidden = false;
    tabs.innerHTML = [{ id: 'todas', nombre: 'Todas' }, ...cats].map(c =>
      `<button class="tab ${state.cat === c.id ? 'is-active' : ''}" data-cat="${c.id}">${c.nombre} <small>${count(c.id)}</small></button>`).join('');
  }
  // Tallas según el género
  const base = state.genero === 'todos' ? CD_PRODUCTS : CD_PRODUCTS.filter(p => p.genero === state.genero);
  const all = [...new Set(base.flatMap(cdTallas))].filter(t => t >= 34 && t <= 44).sort((a, b) => a - b);
  if (state.talla && !all.includes(state.talla)) state.talla = null;
  $('#sizeFilter').innerHTML = '<span class="size-chip label">Talla</span>' +
    all.map(t => `<button class="size-chip ${t === state.talla ? 'is-active' : ''}" data-talla="${t}">${t}</button>`).join('');
}

/* Cambia género/categoría, repinta y (opcional) baja al catálogo */
function setFiltro(genero, cat = 'todas', scroll = false) {
  state.genero = genero; state.cat = cat; state.visibles = PAGINA;
  paintFilters(); render();
  if (scroll) $('#catalogo').scrollIntoView({ behavior: 'smooth' });
}

function buildCats() {
  ['mujer', 'hombre'].forEach(g => {
    const el = $(g === 'mujer' ? '#catsMujer' : '#catsHombre');
    el.innerHTML = CD_CATEGORIAS[g].map(c => {
      const ps = CD_PRODUCTS.filter(p => p.genero === g && p.categoria === c.id);
      if (!ps.length) return '';
      const [pid, vi] = CD_PORTADAS[g + '-' + c.id] || [ps[0].id, 0];
      const p = CD_PRODUCTS.find(x => x.id === pid) || ps[0];
      const foto = (p.variantes[vi] || p.variantes[0]).fotos[0];
      const ventas = ps.map(precioDesde).filter(Boolean).map(x => x.venta);
      return `<a class="cat-card" href="#${g}-${c.id}" data-go="${g}" data-cat="${c.id}">
        <img src="${foto}" alt="${CD_GENEROS[g]} ${c.nombre}" loading="lazy">
        <span class="cat-info"><b>${c.nombre}</b><small>${ps.length} modelos${ventas.length ? ' · desde ' + cdFormato(Math.min(...ventas)) : ''}</small></span>
      </a>`;
    }).join('');
  });
}

/* Guía de tallas: largo del pie aproximado (27 cm = talla 41, cada talla ≈ 0,67 cm) */
function guiaHTML(tallas) {
  const cm = t => (27 + (t - 41) * 2 / 3).toFixed(1).replace('.', ',');
  const ts = tallas.length ? tallas : [37, 38, 39, 40, 41, 42, 43];
  return `<table><thead><tr><th>Talla</th>${ts.map(t => `<th>${t}</th>`).join('')}</tr></thead>
    <tbody><tr><td>Pie (cm)</td>${ts.map(t => `<td>${cm(t)}</td>`).join('')}</tr></tbody></table>
    <p>Medidas aproximadas del largo del pie. Para medirte: pon el pie sobre una hoja contra la pared, marca la punta del dedo más largo y mide. Si quedas entre dos tallas, pide la más grande. ¿Dudas? Escríbenos y te ayudamos.</p>`;
}

/* ---------- Ficha de producto ---------- */
const modal = { p: null, vi: 0, foto: 0, talla: null };

function openModal(id, vi = 0) {
  modal.p = CD_PRODUCTS.find(p => p.id === id);
  modal.vi = vi; modal.foto = 0;
  modal.talla = state.talla && modal.p.variantes[vi].tallas.includes(state.talla) ? state.talla : null;
  $('#mTitle').textContent = modal.p.nombre;
  $('#mLinea').textContent = `${CD_GENEROS[modal.p.genero]} · ${catNombre(modal.p.genero, modal.p.categoria)}`;
  $('#mGuide').hidden = true; $('#mGuideBtn').setAttribute('aria-expanded', 'false');
  paintModal();
  $('#modal').hidden = false;
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', '#' + id);
}

function paintModal() {
  const { p, vi } = modal;
  const v = p.variantes[vi];
  const pr = cdPrecio(p, v);
  $('#mImg').src = v.fotos[modal.foto];
  $('#mImg').alt = `Tenis ${p.nombre} ${v.color}`;
  $('#mBadge').hidden = !pr;
  $('#mBadge').textContent = `−${PCT}%`;
  $('#mThumbs').innerHTML = v.fotos.length > 1
    ? v.fotos.map((f, i) => `<button data-foto="${i}" class="${i === modal.foto ? 'is-active' : ''}"><img src="${f}" alt=""></button>`).join('')
    : '';
  $('#mPrice').innerHTML = priceHTML(pr, { off: true });
  $('#mSave').textContent = pr ? `Ahorras ${cdFormato(pr.antes - pr.venta)}` : '';
  $('#mColor').textContent = v.color;
  $('#mSwatches').innerHTML = p.variantes.map((x, i) =>
    `<button class="sw ${i === vi ? 'is-active' : ''}" data-vi="${i}" style="background:${x.hex}" title="${x.color}" aria-label="${x.color}"></button>`).join('');
  $('#mGuide').innerHTML = guiaHTML(v.tallas);
  $('#mSizes').innerHTML = v.tallas.map(t => `<button data-t="${t}" class="${t === modal.talla ? 'is-active' : ''}">${t}</button>`).join('');
  $('#mHint').textContent = modal.talla ? '' : 'Selecciona tu talla';
  const envio = pr && pr.venta >= CD_ENVIO_GRATIS ? 'Gratis' : cdFormato(CD_ENVIO);
  const txt = `Hola Calzado C&D 👋 Quiero pedir:\n• ${p.nombre} — ${v.color}${modal.talla ? ' — Talla ' + modal.talla : ''}` +
    (pr ? ` — ${cdFormato(pr.venta)}\nEnvío: ${envio}` : '') + '\n¿Está disponible?';
  $('#mWa').href = waLink(txt);
}

function closeModal() {
  if (!$('#modal').hidden && location.hash) history.replaceState(null, '', location.pathname + location.search);
  $('#modal').hidden = true;
  document.body.style.overflow = '';
}

/* ---------- Bolsa ---------- */
const BAG_KEY = 'cd_bolsa';
let bag = [];
try { bag = JSON.parse(localStorage.getItem(BAG_KEY)) || []; } catch (e) { bag = []; }
function saveBag() { try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch (e) {} }

function bagLines() {
  return bag.map(it => {
    const p = CD_PRODUCTS.find(x => x.id === it.id);
    const v = p && p.variantes.find(x => x.color === it.color);
    return p && v ? { ...it, p, v, pr: cdPrecio(p, v) } : null;
  }).filter(Boolean);
}

function paintBag() {
  const lines = bagLines();
  $('#bagCount').textContent = lines.length;
  $('#bagItems').innerHTML = lines.length ? lines.map((l, i) => `
    <div class="bag-item">
      <img src="${l.v.fotos[0]}" alt="">
      <div><b>${l.p.nombre}</b><p>${l.v.color} · Talla ${l.talla}</p><p>${l.pr ? cdFormato(l.pr.venta) : 'Precio a consultar'}</p></div>
      <button class="rm" data-rm="${i}">Quitar</button>
    </div>`).join('') : '<p class="bag-empty">Tu bolsa está vacía.<br>Elige tus tenis favoritos del catálogo.</p>';
  const sub = lines.reduce((s, l) => s + (l.pr ? l.pr.venta : 0), 0);
  const antes = lines.reduce((s, l) => s + (l.pr ? l.pr.antes : 0), 0);
  const envio = !lines.length ? 0 : sub >= CD_ENVIO_GRATIS ? 0 : CD_ENVIO;
  const total = sub + envio;
  const fs = $('#freeShip');
  if (!lines.length) { fs.className = 'free-ship'; fs.innerHTML = `Envío gratis en compras desde ${cdFormato(CD_ENVIO_GRATIS)}`; }
  else if (sub >= CD_ENVIO_GRATIS) { fs.className = 'free-ship done'; fs.innerHTML = '✓ Tu envío es gratis'; }
  else { fs.className = 'free-ship'; fs.innerHTML = `Te faltan <b>${cdFormato(CD_ENVIO_GRATIS - sub)}</b> para el envío gratis<div class="bar"><i style="width:${Math.min(100, sub / CD_ENVIO_GRATIS * 100)}%"></i></div>`; }
  $('#bagSub').textContent = cdFormato(sub);
  $('#bagShip').textContent = !lines.length ? '—' : envio ? cdFormato(envio) : 'Gratis';
  $('#bagShip').classList.toggle('free', !!lines.length && !envio);
  $('#bagTotal').textContent = cdFormato(total);
  $('#bagSave').textContent = antes > sub ? `Estás ahorrando ${cdFormato(antes - sub)}` : '';
  const sin = lines.some(l => !l.pr);
  const txt = 'Hola Calzado C&D 👋 Quiero hacer este pedido:\n' +
    lines.map(l => `• ${l.p.nombre} — ${l.v.color} — Talla ${l.talla}${l.pr ? ' — ' + cdFormato(l.pr.venta) : ''}`).join('\n') +
    (sub ? `\nSubtotal: ${cdFormato(sub)}\nEnvío: ${envio ? cdFormato(envio) : 'Gratis'}\nTotal: ${cdFormato(total)}${sin ? ' (+ precios por confirmar)' : ''}` : '') +
    `\nPago por: ${CD_PAGOS}` +
    '\n\nMis datos de envío:\nNombre:\nCédula:\nCiudad:\nDirección:\nTeléfono:';
  const send = $('#bagSend');
  send.href = waLink(txt);
  send.toggleAttribute('disabled', !lines.length);
  send.style.pointerEvents = lines.length ? '' : 'none';
}

function openBag() { paintBag(); $('#drawer').hidden = false; document.body.style.overflow = 'hidden'; }
function closeBag() { $('#drawer').hidden = true; document.body.style.overflow = ''; }

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Eventos ---------- */
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  const saludo = waLink('Hola Calzado C&D 👋 Quiero información sobre sus tenis.');
  $('#waFloat').href = saludo;
  $('#footerWa').href = saludo;

  buildCats();
  $('#premiumRow').innerHTML = CD_PREMIUM.map(([id, vi]) => {
    const p = CD_PRODUCTS.find(x => x.id === id);
    return p ? cardHTML(p, vi) : '';
  }).join('');
  $('#premiumRow').addEventListener('click', e => { const c = e.target.closest('.card'); if (c) openModal(c.dataset.id, +c.dataset.color); });
  paintFilters();
  render();
  paintBag();

  $('#genderTabs').addEventListener('click', e => { const b = e.target.closest('[data-genero]'); if (b) setFiltro(b.dataset.genero); });
  $('#catTabs').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) setFiltro(state.genero, b.dataset.cat); });
  $('#sizeFilter').addEventListener('click', e => {
    const b = e.target.closest('[data-talla]'); if (!b) return;
    const t = +b.dataset.talla;
    state.talla = state.talla === t ? null : t; state.visibles = PAGINA;
    paintFilters(); render();
  });
  // Enlaces del menú, portada y tarjetas de categoría
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-go]'); if (!a) return;
    e.preventDefault();
    setFiltro(a.dataset.go, a.dataset.cat || 'todas', true);
    history.replaceState(null, '', '#' + a.dataset.go + (a.dataset.cat ? '-' + a.dataset.cat : ''));
  });
  $('#moreBtn').addEventListener('click', () => { state.visibles += PAGINA; render(); });
  $('#mGuideBtn').addEventListener('click', () => {
    const g = $('#mGuide'); g.hidden = !g.hidden; $('#mGuideBtn').setAttribute('aria-expanded', String(!g.hidden));
  });
  $('#sortSelect').addEventListener('change', e => { state.orden = e.target.value; state.visibles = PAGINA; render(); });

  // Portada: fotos con nombre y precio que abren la ficha
  document.querySelectorAll('[data-cap]').forEach(el => {
    const p = CD_PRODUCTS.find(x => x.id === el.dataset.cap);
    const pr = p && precioDesde(p);
    if (p) el.innerHTML = `<b>${p.nombre}</b>${pr ? `<span>${cdFormato(pr.venta)}</span>` : ''}`;
  });
  document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => {
    const p = CD_PRODUCTS.find(x => x.id === b.dataset.open);
    const vi = b.dataset.colorName ? Math.max(0, p.variantes.findIndex(v => v.color === b.dataset.colorName)) : 0;
    openModal(b.dataset.open, vi);
  }));

  $('#grid').addEventListener('click', e => {
    const c = e.target.closest('.card');
    if (c) openModal(c.dataset.id, +c.dataset.color);
  });

  $('#modal').addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return closeModal();
    const sw = e.target.closest('[data-vi]');
    if (sw) {
      modal.vi = +sw.dataset.vi; modal.foto = 0;
      if (!modal.p.variantes[modal.vi].tallas.includes(modal.talla)) modal.talla = null;
      return paintModal();
    }
    const th = e.target.closest('[data-foto]');
    if (th) { modal.foto = +th.dataset.foto; return paintModal(); }
    const sz = e.target.closest('[data-t]');
    if (sz) { modal.talla = +sz.dataset.t; return paintModal(); }
  });

  $('#mAdd').addEventListener('click', () => {
    if (!modal.talla) { $('#mHint').textContent = 'Elige una talla para agregar a la bolsa'; return; }
    bag.push({ id: modal.p.id, color: modal.p.variantes[modal.vi].color, talla: modal.talla });
    saveBag(); paintBag(); closeModal();
    toast(`${modal.p.nombre} talla ${modal.talla} agregado a la bolsa`);
  });

  $('#bagOpen').addEventListener('click', openBag);
  $('#drawer').addEventListener('click', e => {
    if (e.target.closest('[data-close-bag]')) return closeBag();
    const rm = e.target.closest('[data-rm]');
    if (rm) { bag.splice(+rm.dataset.rm, 1); saveBag(); paintBag(); }
  });

  $('#search').addEventListener('input', e => { state.q = e.target.value.trim(); state.visibles = PAGINA; render(); });

  $('#mShare').addEventListener('click', async () => {
    const url = location.href.split('#')[0] + '#' + modal.p.id;
    try {
      if (navigator.share) await navigator.share({ title: 'Tenis ' + modal.p.nombre + ' — Calzado C&D', url });
      else { await navigator.clipboard.writeText(url); toast('Enlace copiado'); }
    } catch (e) {}
  });

  // Portada: precio "desde" calculado con el catálogo
  const ventas = CD_PRODUCTS.filter(p => p.categoria !== 'sandalias').flatMap(p => p.variantes.map(v => cdPrecio(p, v))).filter(Boolean).map(x => x.venta);
  if (ventas.length) $('#heroFrom').textContent = 'Tenis desde ' + cdFormato(Math.min(...ventas));

  // Enlaces directos: #calamar (modelo), #mujer, #hombre-casual (categoría)
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (CD_PRODUCTS.some(p => p.id === id)) return openModal(id);
    const m = id.match(/^(mujer|hombre)(?:-(.+))?$/);
    if (m && (!m[2] || CD_CATEGORIAS[m[1]].some(c => c.id === m[2]))) setFiltro(m[1], m[2] || 'todas', true);
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeBag(); } });
});
