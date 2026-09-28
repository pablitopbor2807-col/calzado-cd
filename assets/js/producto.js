/* Calzado C&D — página de producto: colores, tallas, zoom, guía de tallas y relacionados */

const P = findProducto(window.CD_PAGE.id);
const S = { vi: 0, foto: 0, talla: null };
{
  const c = +new URLSearchParams(location.search).get('c');
  if (c > 0 && c < P.variantes.length) S.vi = c;
}

function paint() {
  const v = P.variantes[S.vi];
  const pr = cdPrecio(P, v);
  const img = $('#pImg'), src = ROOT + fotoHD(v.fotos[S.foto]);
  if (img.getAttribute('src') !== src) {
    img.classList.add('loading');
    img.onload = () => img.classList.remove('loading');
    img.src = src;
    if (img.complete) img.classList.remove('loading');
  }
  img.alt = `Tenis ${P.nombre} ${v.color}`;
  $('#pBadge').hidden = !pr;
  $('#pThumbs').innerHTML = v.fotos.length > 1
    ? v.fotos.map((f, i) => `<button data-foto="${i}" class="${i === S.foto ? 'is-active' : ''}" aria-label="Foto ${i + 1}"><img src="${ROOT + f}" alt=""></button>`).join('')
    : '';
  $('#pPrice').innerHTML = priceHTML(pr, { off: true });
  $('#pSave').textContent = pr ? `Ahorras ${cdFormato(pr.antes - pr.venta)}` : '';
  $('#pColor').textContent = v.color;
  $('#pSw').innerHTML = P.variantes.map((x, i) =>
    `<button class="sw ${i === S.vi ? 'is-active' : ''}" data-vi="${i}" style="background:${x.hex}" title="${x.color}" aria-label="${x.color}"></button>`).join('');
  $('#pSizes').innerHTML = v.tallas.map(t => `<button data-t="${t}" class="${t === S.talla ? 'is-active' : ''}">${t}</button>`).join('');
  $('#pHint').textContent = S.talla ? '' : 'Selecciona tu talla';
  $('#pGuide').innerHTML = guiaHTML(v.tallas);
  const envio = pr && pr.venta >= CD_ENVIO_GRATIS ? 'Gratis' : cdFormato(CD_ENVIO);
  $('#pWa').href = waLink(`Hola Calzado C&D 👋 Quiero pedir:\n• ${P.nombre} — ${v.color}${S.talla ? ' — Talla ' + S.talla : ''}` +
    (pr ? ` — ${cdFormato(pr.venta)}\nEnvío: ${envio}` : '') + `\n${location.href.split('?')[0]}\n¿Está disponible?`);
  history.replaceState(null, '', location.pathname + (S.vi ? '?c=' + S.vi : ''));
}

/* ---------- Zoom en computador: la foto se amplía siguiendo el mouse ---------- */
const zoom = $('#zoom');
const puedeHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
if (puedeHover) {
  zoom.addEventListener('mousemove', e => {
    const r = zoom.getBoundingClientRect();
    const img = $('#pImg');
    img.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
    img.style.transform = 'scale(2.2)';
  });
  zoom.addEventListener('mouseleave', () => { $('#pImg').style.transform = ''; });
}

/* ---------- Visor a pantalla completa: pellizcar, doble toque y arrastrar ---------- */
const lb = { scale: 1, x: 0, y: 0, pts: new Map(), start: null, lastTap: 0 };
function lbApply() {
  const img = $('#lbImg');
  const st = $('#lbStage').getBoundingClientRect();
  const maxX = Math.max(0, (img.offsetWidth * lb.scale - st.width) / 2);
  const maxY = Math.max(0, (img.offsetHeight * lb.scale - st.height) / 2);
  lb.x = Math.min(maxX, Math.max(-maxX, lb.x));
  lb.y = Math.min(maxY, Math.max(-maxY, lb.y));
  img.style.transform = `translate(${lb.x}px, ${lb.y}px) scale(${lb.scale})`;
  $('#lightbox').classList.toggle('zoomed', lb.scale > 1);
}
function lbZoomAt(scale, cx, cy) {
  const st = $('#lbStage').getBoundingClientRect();
  const ox = cx - (st.left + st.width / 2), oy = cy - (st.top + st.height / 2);
  const k = scale / lb.scale;
  lb.x = ox - (ox - lb.x) * k; lb.y = oy - (oy - lb.y) * k; lb.scale = scale;
  lbApply();
}
function openLightbox() {
  $('#lbImg').src = $('#pImg').src;
  $('#lbImg').alt = $('#pImg').alt;
  lb.scale = 1; lb.x = 0; lb.y = 0; lbApply();
  $('#lightbox').hidden = false; document.body.style.overflow = 'hidden';
}
function closeLightbox() { $('#lightbox').hidden = true; document.body.style.overflow = ''; }

const stage = $('#lbStage');
stage.addEventListener('pointerdown', e => {
  stage.setPointerCapture(e.pointerId);
  lb.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (lb.pts.size === 2) {
    const [a, b] = [...lb.pts.values()];
    lb.start = { d: Math.hypot(a.x - b.x, a.y - b.y), scale: lb.scale };
  } else {
    lb.start = { x: e.clientX, y: e.clientY, tx: lb.x, ty: lb.y, moved: false };
  }
});
stage.addEventListener('pointermove', e => {
  if (!lb.pts.has(e.pointerId)) return;
  lb.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (lb.pts.size === 2 && lb.start && lb.start.d) {
    const [a, b] = [...lb.pts.values()];
    const s = Math.min(4, Math.max(1, lb.start.scale * Math.hypot(a.x - b.x, a.y - b.y) / lb.start.d));
    lbZoomAt(s, (a.x + b.x) / 2, (a.y + b.y) / 2);
  } else if (lb.pts.size === 1 && lb.start && lb.start.tx != null) {
    const dx = e.clientX - lb.start.x, dy = e.clientY - lb.start.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) lb.start.moved = true;
    if (lb.scale > 1) { lb.x = lb.start.tx + dx; lb.y = lb.start.ty + dy; lbApply(); }
  }
});
function endPointer(e) {
  const wasTap = lb.pts.size === 1 && lb.start && lb.start.tx != null && !lb.start.moved;
  lb.pts.delete(e.pointerId);
  if (lb.pts.size === 0 && wasTap) {
    const now = Date.now();
    if (now - lb.lastTap < 320) { lbZoomAt(lb.scale > 1 ? 1 : 2.5, e.clientX, e.clientY); if (lb.scale === 1) { lb.x = lb.y = 0; lbApply(); } lb.lastTap = 0; }
    else lb.lastTap = now;
  }
  if (lb.pts.size < 2) lb.start = null;
}
stage.addEventListener('pointerup', endPointer);
stage.addEventListener('pointercancel', endPointer);
stage.addEventListener('wheel', e => {
  e.preventDefault();
  lbZoomAt(Math.min(4, Math.max(1, lb.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15))), e.clientX, e.clientY);
}, { passive: false });
$('#lightbox').addEventListener('click', e => { if (e.target.closest('[data-lb-close]')) closeLightbox(); });
$('#lbMinus').addEventListener('click', () => { const r = stage.getBoundingClientRect(); lbZoomAt(Math.max(1, lb.scale - 0.75), r.left + r.width / 2, r.top + r.height / 2); });
$('#lbPlus').addEventListener('click', () => { const r = stage.getBoundingClientRect(); lbZoomAt(Math.min(4, lb.scale + 0.75), r.left + r.width / 2, r.top + r.height / 2); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ---------- Eventos ---------- */
document.addEventListener('DOMContentLoaded', () => {
  paint();
  // Precarga las fotos de los otros colores para que el cambio sea inmediato
  P.variantes.forEach(x => { const i = new Image(); i.src = ROOT + fotoHD(x.fotos[0]); });

  zoom.addEventListener('click', openLightbox);
  $('#pOpenZoom').addEventListener('click', openLightbox);

  $('.pdp-info').addEventListener('click', e => {
    const sw = e.target.closest('[data-vi]');
    if (sw) {
      S.vi = +sw.dataset.vi; S.foto = 0;
      if (!P.variantes[S.vi].tallas.includes(S.talla)) S.talla = null;
      return paint();
    }
    const sz = e.target.closest('[data-t]');
    if (sz) { S.talla = +sz.dataset.t; return paint(); }
  });
  $('#pThumbs').addEventListener('click', e => {
    const th = e.target.closest('[data-foto]');
    if (th) { S.foto = +th.dataset.foto; paint(); }
  });

  $('#pAdd').addEventListener('click', () => {
    if (!S.talla) { $('#pHint').textContent = 'Elige una talla para agregar a la bolsa'; $('#pSizes').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    addToBag(P, S.vi, S.talla);
    openBag();
  });

  $('#pShare').addEventListener('click', async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title: 'Tenis ' + P.nombre + ' — Calzado C&D', url });
      else { await navigator.clipboard.writeText(url); toast('Enlace copiado'); }
    } catch (e) {}
  });

  // También te puede gustar: misma categoría y, si faltan, mismo género
  const mismos = CD_PRODUCTS.filter(p => p.id !== P.id && p.genero === P.genero && p.categoria === P.categoria);
  const otros = CD_PRODUCTS.filter(p => p.id !== P.id && p.genero === P.genero && p.categoria !== P.categoria);
  $('#related').innerHTML = [...mismos, ...otros].slice(0, 8).map(p => cardHTML(p)).join('');
});
