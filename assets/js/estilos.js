/* Calzado C&D — sección "Encuentra tu estilo" de la página de Mujer: carrusel en 3D */

// Estilos que se muestran por género: [categoría, nombre del estilo, frase, id del modelo para la foto, índice del color]
const CD_ESTILOS = {
  mujer: [
    ['plataforma', 'Sneakers', 'Plataforma y look limpio', 'd-bloom', 0],
    ['deportivos', 'Chunky', 'Deportivos con suela alta', 'd-nova', 0],
    ['retro', 'Retro', 'Rayas y suela caramelo', 'd-quintero', 0],
    ['mocasines', 'Mocasines', 'Gamuza con plataforma', 'd-anahi-taupe', 0],
    ['sandalias', 'Comfy', 'Pantuflas, sandalias y slides', 'd-comfy', 0],
    ['importados', 'Importados', 'Diseños que no ves en todas partes', 'd-maryury', 0]
  ],
  hombre: [
    ['casual', 'Casual', 'Para el trabajo y el día a día', 'smood', 1],
    ['deportivos', 'Deportivos', 'Livianos, cómodos y con estilo', 'calamar', 1],
    ['importados', 'Importados', 'Alta gama que se nota', 'juance', 0]
  ]
};

function initEstilos() {
  const ring = $('#mocaRing'); if (!ring) return;
  const genero = (window.CD_PAGE && window.CD_PAGE.genero) || 'mujer';
  const items = CD_ESTILOS[genero].map(([cat, nombre, frase, pid, vi]) => {
    const ps = CD_PRODUCTS.filter(p => p.genero === genero && p.categoria === cat);
    const p = findProducto(pid) || ps[0];
    if (!ps.length || !p) return null;
    const ventas = ps.map(precioDesde).filter(Boolean).map(x => x.venta);
    return { cat, nombre, frase, n: ps.length, desde: ventas.length ? Math.min(...ventas) : null, foto: (p.variantes[vi] || p.variantes[0]).fotos[0] };
  }).filter(Boolean);
  ring.innerHTML = items.map((it, i) => `<a class="moca-card" data-i="${i}" href="${urlColeccion(genero, it.cat)}">
      <span class="moca-img"><img src="${ROOT + fotoHD(it.foto)}" alt="${it.nombre}" loading="lazy"></span>
      <span class="moca-cap"><span class="cap-l"><b>${it.nombre}</b><small>${it.frase}</small></span><span class="cap-r">${it.n} modelos${it.desde ? '<br>desde ' + cdFormato(it.desde) : ''}</span></span>
    </a>`).join('');
  $('#mocaDots').innerHTML = items.map((it, i) => `<button type="button" data-dot="${i}" aria-label="Ver ${it.nombre}"></button>`).join('');

  const cards = [...ring.children], n = cards.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, tiltX = 0, tiltY = 0, timer;
  function paint() {
    cards.forEach((c, i) => {
      let d = i - cur;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      const a = Math.abs(d);
      c.style.transform = `translateX(${d * 50}%) translateZ(${-a * 220}px) rotateY(${-d * 38}deg)`;
      c.style.zIndex = 10 - a;
      c.style.opacity = a > 2 ? 0 : 1;
      c.classList.toggle('is-front', d === 0);
      c.setAttribute('tabindex', d === 0 ? '0' : '-1');
    });
    ring.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    document.querySelectorAll('#mocaDots button').forEach((b, i) => b.classList.toggle('on', i === cur));
    $('#estiloActual').textContent = `${items[cur].nombre} · ${items[cur].n} modelos`;
  }
  const go = k => { cur = (k + n) % n; paint(); };
  const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(cur + 1), 4500); };
  const sec = $('#estilos');
  sec.addEventListener('click', e => {
    const b = e.target.closest('[data-moca]'); if (b) { go(cur + +b.dataset.moca); auto(); return; }
    const dot = e.target.closest('[data-dot]'); if (dot) { go(+dot.dataset.dot); auto(); return; }
    const card = e.target.closest('.moca-card');
    if (card && !card.classList.contains('is-front')) { e.preventDefault(); go(+card.dataset.i); auto(); }
  });
  let x0 = null;
  const stage = $('#mocaStage');
  stage.addEventListener('pointerdown', e => { x0 = e.clientX; });
  stage.addEventListener('pointerup', e => {
    if (x0 != null && Math.abs(e.clientX - x0) > 40) { go(cur + (e.clientX < x0 ? 1 : -1)); auto(); }
    x0 = null;
  });
  if (!reduce) {
    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      tiltX = Math.max(-12, Math.min(12, (innerHeight / 2 - (r.top + r.height / 2)) / innerHeight * 22));
      paint();
    };
    addEventListener('scroll', onScroll, { passive: true });
    stage.addEventListener('mousemove', e => { const r = stage.getBoundingClientRect(); tiltY = ((e.clientX - r.left) / r.width - 0.5) * 16; paint(); });
    stage.addEventListener('mouseleave', () => { tiltY = 0; paint(); auto(); });
    stage.addEventListener('mouseenter', () => clearInterval(timer));
    onScroll();
  }
  paint(); auto();
}
document.addEventListener('DOMContentLoaded', initEstilos);
