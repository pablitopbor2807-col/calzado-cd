/* Calzado C&D — portada */

// Selección premium (id del modelo, índice del color)
const CD_PREMIUM = [['d-maryury', 0], ['juance', 0], ['d-anahi-cafe', 0], ['enigma', 1], ['d-ciaga', 1], ['delta', 1], ['d-pai-de-durazno', 0], ['d-quintanilla', 0]];

// Foto de portada de cada categoría: [id del modelo, índice del color]
const CD_PORTADAS = {
  'mujer-plataforma': ['d-bloom', 0], 'mujer-deportivos': ['d-nova', 0], 'mujer-retro': ['d-quintero', 0],
  'mujer-mocasines': ['d-anahi-taupe', 0], 'mujer-sandalias': ['d-comfy', 0], 'mujer-importados': ['d-maryury', 0],
  'hombre-casual': ['smood', 1], 'hombre-deportivos': ['calamar', 1], 'hombre-importados': ['juance', 0]
};

// Filas de la portada: [contenedor, género, categoría]
const CD_FILAS = [['#rowRetro', 'mujer', 'retro'], ['#rowCasual', 'hombre', 'casual'], ['#rowPlataforma', 'mujer', 'plataforma']];

// Enlaces viejos (index.html#calamar, #mujer-retro) llevan a las páginas nuevas
(function redirigir() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (!h) return;
  const p = findProducto(h);
  if (p) return location.replace(urlProducto(p));
  const m = h.match(/^(mujer|hombre)(?:-(.+))?$/);
  if (m && (!m[2] || CD_CATEGORIAS[m[1]].some(c => c.id === m[2]))) location.replace(urlColeccion(m[1], m[2]));
})();

function buildCats() {
  ['mujer', 'hombre'].forEach(g => {
    $(g === 'mujer' ? '#catsMujer' : '#catsHombre').innerHTML = CD_CATEGORIAS[g].map(c => {
      const ps = CD_PRODUCTS.filter(p => p.genero === g && p.categoria === c.id);
      if (!ps.length) return '';
      const [pid, vi] = CD_PORTADAS[g + '-' + c.id] || [ps[0].id, 0];
      const p = findProducto(pid) || ps[0];
      const foto = (p.variantes[vi] || p.variantes[0]).fotos[0];
      const ventas = ps.map(precioDesde).filter(Boolean).map(x => x.venta);
      return `<a class="cat-card" href="${urlColeccion(g, c.id)}">
        <img src="${foto}" alt="${CD_GENEROS[g]} ${c.nombre}" loading="lazy">
        <span class="cat-info"><b>${c.nombre}</b><small>${ps.length} modelos${ventas.length ? ' · desde ' + cdFormato(Math.min(...ventas)) : ''}</small></span>
      </a>`;
    }).join('');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  $('#premiumRow').innerHTML = CD_PREMIUM.map(([id, vi]) => { const p = findProducto(id); return p ? cardHTML(p, vi) : ''; }).join('');
  buildCats();
  CD_FILAS.forEach(([sel, g, c]) => {
    $(sel).innerHTML = CD_PRODUCTS.filter(p => p.genero === g && p.categoria === c).slice(0, 10).map(p => cardHTML(p)).join('');
  });

  // Precio "desde" en la portada (sin contar sandalias)
  const ventas = CD_PRODUCTS.filter(p => p.categoria !== 'sandalias').flatMap(p => p.variantes.map(v => cdPrecio(p, v))).filter(Boolean).map(x => x.venta);
  if (ventas.length) $('#heroFrom').textContent = 'Tenis desde ' + cdFormato(Math.min(...ventas));
  $('#totalModelos').textContent = CD_PRODUCTS.length;
  document.querySelectorAll('[data-count]').forEach(el => {
    const [g, c] = el.dataset.count.split('-');
    el.textContent = CD_PRODUCTS.filter(p => p.genero === g && (!c || p.categoria === c)).length;
  });
});

/* ---------- Sección Mocasines: carrusel en 3D ---------- */
function initMocasines() {
  const ring = $('#mocaRing'); if (!ring) return;
  const ps = CD_PRODUCTS.filter(p => p.categoria === 'mocasines');
  if (!ps.length) { $('#mocasines').hidden = true; return; }
  ring.innerHTML = ps.map((p, i) => {
    const v = p.variantes[0], pr = cdPrecio(p, v);
    return `<a class="moca-card" data-i="${i}" href="${urlProducto(p)}">
      <span class="moca-img"><img src="${fotoHD(v.fotos[0])}" alt="Mocasín ${p.nombre}" loading="lazy"></span>
      <span class="moca-cap"><b>${p.nombre}</b>${pr ? `<span>${cdFormato(pr.venta)}</span>` : ''}</span>
    </a>`;
  }).join('');
  $('#mocaDots').innerHTML = ps.map((p, i) => `<button type="button" data-dot="${i}" aria-label="Ver ${p.nombre}"></button>`).join('');
  const ventas = ps.map(precioDesde).filter(Boolean).map(x => x.venta);
  if (ventas.length) $('#mocaPrice').textContent = 'Desde ' + cdFormato(Math.min(...ventas));

  const cards = [...ring.children], n = cards.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, tiltX = 0, tiltY = 0, timer;

  function paint() {
    cards.forEach((c, i) => {
      let d = i - cur;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      const a = Math.abs(d);
      c.style.transform = `translateX(${d * 58}%) translateZ(${-a * 220}px) rotateY(${-d * 38}deg)`;
      c.style.zIndex = 10 - a;
      c.classList.toggle('is-front', d === 0);
      c.setAttribute('tabindex', d === 0 ? '0' : '-1');
    });
    ring.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    document.querySelectorAll('#mocaDots button').forEach((b, i) => b.classList.toggle('on', i === cur));
  }
  const go = k => { cur = (k + n) % n; paint(); };
  const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(cur + 1), 4500); };

  $('#mocasines').addEventListener('click', e => {
    const b = e.target.closest('[data-moca]'); if (b) { go(cur + +b.dataset.moca); auto(); return; }
    const dot = e.target.closest('[data-dot]'); if (dot) { go(+dot.dataset.dot); auto(); return; }
    const card = e.target.closest('.moca-card');
    if (card && !card.classList.contains('is-front')) { e.preventDefault(); go(+card.dataset.i); auto(); }
  });

  // Deslizar con el dedo
  let x0 = null;
  const stage = $('#mocaStage');
  stage.addEventListener('pointerdown', e => { x0 = e.clientX; });
  stage.addEventListener('pointerup', e => {
    if (x0 != null && Math.abs(e.clientX - x0) > 40) { go(cur + (e.clientX < x0 ? 1 : -1)); auto(); }
    x0 = null;
  });

  if (!reduce) {
    // Al hacer scroll la pieza se inclina, como si la miraras desde arriba o desde abajo
    const onScroll = () => {
      const r = $('#mocasines').getBoundingClientRect();
      const p = (innerHeight / 2 - (r.top + r.height / 2)) / innerHeight; // -1..1 aprox.
      tiltX = Math.max(-12, Math.min(12, p * 22));
      paint();
    };
    addEventListener('scroll', onScroll, { passive: true });
    // Con el mouse, la pieza sigue el cursor
    stage.addEventListener('mousemove', e => {
      const r = stage.getBoundingClientRect();
      tiltY = ((e.clientX - r.left) / r.width - 0.5) * 16;
      paint();
    });
    stage.addEventListener('mouseleave', () => { tiltY = 0; paint(); });
    stage.addEventListener('mouseenter', () => clearInterval(timer));
    stage.addEventListener('mouseleave', auto);
    onScroll();
  }
  paint(); auto();
}
document.addEventListener('DOMContentLoaded', initMocasines);
