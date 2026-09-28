/* Calzado C&D — catálogo con filtros (página Catálogo y páginas de colección) */

const PAGINA = 24;
const cfg = window.CD_PAGE || {};
const params = new URLSearchParams(location.search);
const state = {
  genero: cfg.genero || params.get('genero') || 'todos',
  cat: cfg.cat || params.get('cat') || 'todas',
  talla: +params.get('talla') || null,
  q: params.get('q') || '',
  orden: 'destacados',
  visibles: PAGINA
};
const fijo = !!cfg.genero; // en las páginas de colección el género no cambia

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
    const orden = { retro: 0, plataforma: 1, deportivos: 2, importados: 3, mocasines: 4, sandalias: 5 };
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

function render() {
  const list = filtrados();
  $('#grid').innerHTML = list.slice(0, state.visibles).map(p => cardHTML(p, null, state.talla)).join('');
  const rest = list.length - state.visibles;
  $('#moreBtn').hidden = rest <= 0;
  $('#moreBtn').textContent = `Ver más modelos (${rest})`;
  $('#empty').textContent = state.q
    ? `No encontramos "${state.q}". Prueba con otro nombre o escríbenos por WhatsApp.`
    : 'No hay modelos en esa talla. Escríbenos y te ayudamos a encontrar uno.';
  $('#empty').hidden = list.length > 0;
  $('#resultCount').textContent = list.length + (list.length === 1 ? ' modelo' : ' modelos');
  if (!fijo) $('#catTitle').textContent = state.genero === 'todos' ? 'Todo el catálogo'
    : state.cat === 'todas' ? `Tenis para ${state.genero}` : `${CD_GENEROS[state.genero]} · ${catNombre(state.genero, state.cat)}`;
}

function paintFilters() {
  const gt = $('#genderTabs');
  if (gt) gt.querySelectorAll('.g-btn').forEach(b => b.classList.toggle('is-active', b.dataset.genero === state.genero));
  const tabs = $('#catTabs');
  if (state.genero === 'todos') { tabs.hidden = true; tabs.innerHTML = ''; }
  else {
    const count = c => CD_PRODUCTS.filter(p => p.genero === state.genero && (c === 'todas' || p.categoria === c)).length;
    tabs.hidden = false;
    tabs.innerHTML = [{ id: 'todas', nombre: 'Todas' }, ...CD_CATEGORIAS[state.genero]].map(c => fijo
      ? `<a class="tab ${state.cat === c.id ? 'is-active' : ''}" href="${urlColeccion(state.genero, c.id)}">${c.nombre} <small>${count(c.id)}</small></a>`
      : `<button class="tab ${state.cat === c.id ? 'is-active' : ''}" data-cat="${c.id}">${c.nombre} <small>${count(c.id)}</small></button>`).join('');
  }
  const base = state.genero === 'todos' ? CD_PRODUCTS : CD_PRODUCTS.filter(p => p.genero === state.genero);
  const all = [...new Set(base.flatMap(cdTallas))].filter(t => t >= 34 && t <= 44).sort((a, b) => a - b);
  if (state.talla && !all.includes(state.talla)) state.talla = null;
  $('#sizeFilter').innerHTML = '<span class="size-chip label">Talla</span>' +
    all.map(t => `<button class="size-chip ${t === state.talla ? 'is-active' : ''}" data-talla="${t}">${t}</button>`).join('');
}

function setFiltro(genero, cat = 'todas') {
  state.genero = genero; state.cat = cat; state.visibles = PAGINA;
  paintFilters(); render();
}

document.addEventListener('DOMContentLoaded', () => {
  $('#search').value = state.q;
  paintFilters(); render();

  const gt = $('#genderTabs');
  if (gt) gt.addEventListener('click', e => { const b = e.target.closest('[data-genero]'); if (b) setFiltro(b.dataset.genero); });
  $('#catTabs').addEventListener('click', e => { const b = e.target.closest('button[data-cat]'); if (b) setFiltro(state.genero, b.dataset.cat); });
  $('#sizeFilter').addEventListener('click', e => {
    const b = e.target.closest('[data-talla]'); if (!b) return;
    const t = +b.dataset.talla;
    state.talla = state.talla === t ? null : t; state.visibles = PAGINA;
    paintFilters(); render();
  });
  $('#moreBtn').addEventListener('click', () => { state.visibles += PAGINA; render(); });
  $('#sortSelect').addEventListener('change', e => { state.orden = e.target.value; state.visibles = PAGINA; render(); });
  $('#search').addEventListener('input', e => { state.q = e.target.value.trim(); state.visibles = PAGINA; render(); });
});
