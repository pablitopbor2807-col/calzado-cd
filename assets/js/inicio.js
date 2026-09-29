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
