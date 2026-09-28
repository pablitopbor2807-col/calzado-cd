/* Calzado C&D — funciones compartidas por todas las páginas:
   precios, tarjetas, bolsa de compras, guía de tallas y WhatsApp */

// Número de WhatsApp de pedidos, con indicativo de Colombia (57) y sin "+".
const CD_WHATSAPP = '573045309015';

// Envío al cliente
const CD_ENVIO = 20000;
const CD_ENVIO_GRATIS = 200000;
const CD_PAGOS = 'Bancolombia o Nequi';

// Ruta a la raíz del sitio ('' en la raíz, '../' en producto/ y coleccion/)
const ROOT = (window.CD_PAGE && window.CD_PAGE.root) || '';
const PCT = Math.round(CD_REBAJA * 100);
const $ = (s, el = document) => el.querySelector(s);

function waLink(texto) {
  return 'https://wa.me/' + CD_WHATSAPP + '?text=' + encodeURIComponent(texto);
}

/* ---------- Direcciones de las páginas ---------- */
function slugProducto(p) { return p.genero + '-' + p.id.replace(/^d-/, ''); }
function urlProducto(p, vi) { return ROOT + 'producto/' + slugProducto(p) + '.html' + (vi ? '?c=' + vi : ''); }
function urlColeccion(genero, cat) { return ROOT + 'coleccion/' + genero + (cat && cat !== 'todas' ? '-' + cat : '') + '.html'; }
function findProducto(id) { return CD_PRODUCTS.find(p => p.id === id); }
function fotoHD(f) { return f.replace('/img/dama/', '/img/dama-hd/'); }

/* ---------- Precios ---------- */
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

function rangoTallas(t) { return t.length > 1 ? `Tallas ${t[0]}–${t[t.length - 1]}` : `Talla ${t[0]}`; }

/* ---------- Tarjeta de producto ---------- */
function cardHTML(p, vi, talla) {
  if (vi == null) vi = Math.max(0, talla ? p.variantes.findIndex(x => x.tallas.includes(talla)) : 0);
  const v = p.variantes[vi];
  const pr = precioDesde(p);
  const alt = v.fotos[1] || v.fotos[0];
  const n = p.variantes.length;
  const sw = p.variantes.slice(0, 5).map((x, i) => `<button type="button" class="sw ${i === vi ? 'is-active' : ''}" data-sw="${i}" style="background:${x.hex}" title="${x.color}" aria-label="Ver color ${x.color}"></button>`).join('') +
    (n > 5 ? `<span class="sw-more">+${n - 5}</span>` : '');
  return `<article class="card" data-id="${p.id}">
    <a class="card-media" href="${urlProducto(p, vi)}" aria-label="${p.nombre} ${v.color}">
      ${pr ? `<span class="badge">−${PCT}%</span>` : ''}
      ${p.categoria === 'importados' ? '<span class="tag-imp">Importado</span>' : ''}
      <img class="main" src="${ROOT + v.fotos[0]}" alt="Tenis ${p.nombre} ${v.color}" loading="lazy">
      <img class="alt" src="${ROOT + alt}" alt="" loading="lazy">
    </a>
    <div class="card-body">
      <p class="card-kicker">${CD_GENEROS[p.genero]} · ${catNombre(p.genero, p.categoria)}</p>
      <h3 class="card-name"><a href="${urlProducto(p, vi)}">${p.nombre}</a></h3>
      <p class="card-meta"><span class="card-color">${v.color}</span> · ${rangoTallas(cdTallas(p))}</p>
      <div class="swatches">${sw}</div>
      <div class="price">${priceHTML(pr, { desde: pr && pr.varia })}</div>
    </div>
  </article>`;
}

/* Tocar un color en la tarjeta cambia la foto y el enlace a ese color */
document.addEventListener('click', e => {
  const sw = e.target.closest('.card [data-sw]');
  if (!sw) return;
  const card = sw.closest('.card');
  const p = findProducto(card.dataset.id);
  const i = +sw.dataset.sw, v = p.variantes[i];
  card.querySelector('img.main').src = ROOT + v.fotos[0];
  card.querySelector('img.main').alt = `Tenis ${p.nombre} ${v.color}`;
  card.querySelector('img.alt').src = ROOT + (v.fotos[1] || v.fotos[0]);
  card.querySelector('.card-color').textContent = v.color;
  card.querySelectorAll('a').forEach(a => a.href = urlProducto(p, i));
  card.querySelectorAll('[data-sw]').forEach(b => b.classList.toggle('is-active', b === sw));
});

/* Flechas de los estantes deslizables */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-scroll]'); if (!b) return;
  const row = $(b.dataset.scroll);
  row.scrollBy({ left: +b.dataset.dir * row.clientWidth * 0.8, behavior: 'smooth' });
});

/* ---------- Guía de tallas: largo del pie aproximado (27 cm = talla 41, ≈0,67 cm por talla) ---------- */
function cmTalla(t) { return (27 + (t - 41) * 2 / 3).toFixed(1).replace('.', ','); }
function guiaHTML(tallas) {
  const ts = tallas.length ? tallas : [37, 38, 39, 40, 41, 42, 43];
  return `<div class="guide-table"><table><thead><tr><th>Talla</th>${ts.map(t => `<th>${t}</th>`).join('')}</tr></thead>
    <tbody><tr><td>Pie (cm)</td>${ts.map(t => `<td>${cmTalla(t)}</td>`).join('')}</tr></tbody></table></div>
    <p class="guide-note">Medidas aproximadas del largo del pie. Para medirte: pon el pie sobre una hoja contra la pared, marca la punta del dedo más largo y mide. Si quedas entre dos tallas, pide la más grande.</p>`;
}

/* ---------- Bolsa de compras (se guarda en este dispositivo) ---------- */
const BAG_KEY = 'cd_bolsa';
let bag = [];
try { bag = JSON.parse(localStorage.getItem(BAG_KEY)) || []; } catch (e) { bag = []; }
function saveBag() { try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch (e) {} }

function bagLines() {
  return bag.map(it => {
    const p = findProducto(it.id);
    const v = p && p.variantes.find(x => x.color === it.color);
    return p && v ? { ...it, p, v, pr: cdPrecio(p, v) } : null;
  }).filter(Boolean);
}

function addToBag(p, vi, talla) {
  bag.push({ id: p.id, color: p.variantes[vi].color, talla });
  saveBag(); paintBag();
  toast(`${p.nombre} talla ${talla} agregado a la bolsa`);
}

function paintBag() {
  const lines = bagLines();
  $('#bagCount').textContent = lines.length;
  $('#bagItems').innerHTML = lines.length ? lines.map((l, i) => `
    <div class="bag-item">
      <a href="${urlProducto(l.p, l.p.variantes.indexOf(l.v))}"><img src="${ROOT + l.v.fotos[0]}" alt=""></a>
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
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- Arranque común ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.year').forEach(y => y.textContent = new Date().getFullYear());
  const saludo = waLink('Hola Calzado C&D 👋 Quiero información sobre sus tenis.');
  document.querySelectorAll('[data-wa]').forEach(a => a.href = saludo);

  // Avisos de arriba: en celular es una cinta que se desplaza; se duplica el texto para que no se corte
  const cinta = $('.announce-track');
  if (cinta) {
    const copia = [...cinta.children].map(n => { const c = n.cloneNode(true); c.classList.add('dup'); c.setAttribute('aria-hidden', 'true'); return c; });
    copia[0].classList.add('dup-first');
    cinta.append(...copia);
  }

  paintBag();
  $('#bagOpen').addEventListener('click', openBag);
  $('#drawer').addEventListener('click', e => {
    if (e.target.closest('[data-close-bag]')) return closeBag();
    const rm = e.target.closest('[data-rm]');
    if (rm) { bag.splice(+rm.dataset.rm, 1); saveBag(); paintBag(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBag(); });
});
