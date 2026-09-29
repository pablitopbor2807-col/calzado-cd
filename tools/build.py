#!/usr/bin/env python3
"""Calzado C&D — genera todas las páginas del sitio a partir de assets/js/products.js.

Uso (desde la carpeta del sitio):  python3 tools/build.py

Crea: index.html, catalogo.html, politicas.html, coleccion/*.html, producto/*.html,
sitemap.xml y robots.txt. Cada vez que cambies precios o productos, vuelve a correrlo.
"""
import html, json, math, os, re, shutil, unicodedata

SITE = 'https://pablitopbor2807-col.github.io/calzado-cd/'
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(BASE)
E = lambda s: html.escape(str(s), quote=True)

# ---------- Leer catálogo ----------
src = open('assets/js/products.js', encoding='utf-8').read()
PRODUCTS = json.loads(re.search(r'const CD_PRODUCTS = (\[.*?\]);\n', src, re.S).group(1))
MARGEN = float(re.search(r'const CD_MARGEN = ([\d.]+)', src).group(1))
REBAJA = float(re.search(r'const CD_REBAJA = ([\d.]+)', src).group(1))
PRECIOS = {k: (None if v == 'null' else int(v)) for k, v in re.findall(r"^  '([a-z0-9/-]+)': (\d+|null),", src, re.M)}
cats_js = re.search(r'const CD_CATEGORIAS = (\{.*?\n\});', src, re.S).group(1)
cats_js = re.sub(r"(\w+):", r'"\1":', cats_js).replace("'", '"')
CATS = json.loads(re.sub(r',(\s*[\]}])', r'\1', cats_js))
GEN = {'hombre': 'Hombre', 'mujer': 'Mujer'}

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def precio(p, v):
    m = PRECIOS.get(p['id'] + '/' + slug(v['color']))
    if m is None: m = PRECIOS.get(p['id'])
    if m is None: return None
    venta = math.ceil(round(m * (1 + MARGEN), 6) / 1000) * 1000
    antes = math.floor(venta / (1 - REBAJA) / 1000 + 0.5) * 1000
    return venta, antes

def fmt(n): return '$' + f'{n:,}'.replace(',', '.')
def cat_nombre(g, c): return next((x['nombre'] for x in CATS[g] if x['id'] == c), '')
def slug_prod(p): return p['genero'] + '-' + re.sub(r'^d-', '', p['id'])
def tallas(p): return sorted({t for v in p['variantes'] for t in v['tallas']})

assert len({slug_prod(p) for p in PRODUCTS}) == len(PRODUCTS), 'Hay dos productos con la misma dirección'

# ---------- Piezas comunes ----------
ICON_WA = '<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1s-.5-.2-.7.2l-1 1.2c-.2.2-.4.3-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.8 6.5 6.5 0 0 0 1.4 3.4 14.8 14.8 0 0 0 5.7 5c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.2-.2-.5-.3Z"/></svg>'

def layout(*, root, path, title, desc, body, scripts, page=None, og_image='assets/img/dama-hd/d-maryury-talco-0.jpg', extra_head=''):
    page_js = f'<script>window.CD_PAGE = {json.dumps({**(page or {}), "root": root}, ensure_ascii=False)};</script>'
    js = ''.join(f'<script src="{root}assets/js/{s}"></script>' for s in scripts)
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<meta name="theme-color" content="#0f1b2d">
<link rel="canonical" href="{SITE}{path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Calzado C&amp;D">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:image" content="{SITE}{og_image}">
<meta property="og:url" content="{SITE}{path}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{root}assets/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}assets/css/style.css">
{extra_head}</head>
<body>

<div class="announce" aria-label="Avisos">
  <div class="announce-track">
    <span>Hasta <b>−20%</b> en todo el catálogo</span>
    <span>Envío <b>gratis</b> desde $200.000</span>
    <span>Llega en 2 a 3 días</span>
  </div>
</div>

<header class="header">
  <div class="wrap header-in">
    <a href="{root}index.html" class="brand" aria-label="Calzado C&amp;D inicio"><img src="{root}assets/img/logo.png" alt="Calzado C&amp;D"></a>
    <nav class="nav">
      <a href="{root}coleccion/mujer.html">Mujer</a>
      <a href="{root}coleccion/hombre.html">Hombre</a>
      <a href="{root}catalogo.html">Catálogo</a>
      <a href="{root}politicas.html#envios">Envíos y pagos</a>
    </nav>
    <button class="bag-btn" id="bagOpen" aria-label="Abrir bolsa">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
      <span class="bag-count" id="bagCount">0</span>
    </button>
  </div>
  <nav class="subnav" aria-label="Secciones">
    <a href="{root}coleccion/mujer.html">Mujer</a>
    <a href="{root}coleccion/hombre.html">Hombre</a>
    <a href="{root}coleccion/mujer-importados.html">Importados</a>
    <a href="{root}catalogo.html">Todo</a>
  </nav>
</header>

{body}

<footer class="footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <img src="{root}assets/img/logo-light.png" alt="Calzado C&amp;D" class="footer-logo">
        <p>Tenis para ella y para él. Calidad y duración en cada par.</p>
        <a class="btn btn-gold" data-wa target="_blank" rel="noopener" href="https://wa.me/573045309015">Pide por WhatsApp</a>
      </div>
      <nav class="foot-col" aria-label="Comprar">
        <h4>Comprar</h4>
        <a href="{root}coleccion/mujer.html">Mujer</a>
        <a href="{root}coleccion/hombre.html">Hombre</a>
        <a href="{root}coleccion/mujer-importados.html">Importados de mujer</a>
        <a href="{root}coleccion/hombre-importados.html">Importados de hombre</a>
        <a href="{root}catalogo.html">Todo el catálogo</a>
      </nav>
      <nav class="foot-col" aria-label="Ayuda">
        <h4>Ayuda</h4>
        <a href="{root}politicas.html#envios">Envíos y entregas</a>
        <a href="{root}politicas.html#cambios">Cambios y devoluciones</a>
        <a href="{root}politicas.html#garantia">Garantía</a>
        <a href="{root}politicas.html#tallas">Guía de tallas</a>
        <a href="{root}politicas.html#preguntas">Preguntas frecuentes</a>
      </nav>
      <nav class="foot-col" aria-label="Legal">
        <h4>Legal</h4>
        <a href="{root}politicas.html#terminos">Términos y condiciones</a>
        <a href="{root}politicas.html#retracto">Derecho de retracto</a>
        <a href="{root}politicas.html#privacidad">Política de privacidad</a>
        <a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a>
      </nav>
      <div class="foot-col">
        <h4>Contacto</h4>
        <a href="https://wa.me/573045309015" target="_blank" rel="noopener">WhatsApp 304 530 9015</a>
        <span>Envíos a toda Colombia</span>
        <span>Entrega en 2 a 3 días</span>
      </div>
    </div>
    <div class="foot-bottom">
      <small>© <span class="year">2026</span> Calzado C&amp;D. Todos los derechos reservados.</small>
      <div class="pay"><span>Pagas con</span><b>Bancolombia</b><b>Nequi</b></div>
    </div>
  </div>
</footer>

<a class="wa-float" data-wa target="_blank" rel="noopener" href="https://wa.me/573045309015" aria-label="Escríbenos por WhatsApp">{ICON_WA}</a>

<div class="drawer" id="drawer" hidden>
  <div class="modal-backdrop" data-close-bag></div>
  <aside class="drawer-panel" aria-label="Tu bolsa">
    <div class="drawer-head">
      <h3>Tu bolsa</h3>
      <button class="icon-close" data-close-bag aria-label="Cerrar">×</button>
    </div>
    <div class="drawer-body" id="bagItems"></div>
    <div class="drawer-foot">
      <div class="free-ship" id="freeShip"></div>
      <div class="bag-line"><span>Subtotal</span><b id="bagSub">$0</b></div>
      <div class="bag-line"><span>Envío</span><b id="bagShip">—</b></div>
      <div class="bag-total"><span>Total</span><b id="bagTotal">$0</b></div>
      <p class="bag-save" id="bagSave"></p>
      <a class="btn btn-wa btn-block" id="bagSend" target="_blank" rel="noopener">Enviar pedido por WhatsApp</a>
    </div>
  </aside>
</div>

<div class="toast" id="toast" role="status"></div>

{page_js}
<script src="{root}assets/js/products.js"></script>
<script src="{root}assets/js/tienda.js"></script>
{js}
</body>
</html>
'''

HOW_SHIP = open('tools/partes/como_comprar.html', encoding='utf-8').read()

def filtros(genero_toggle):
    toggle = '''        <div class="gender" id="genderTabs" role="tablist" aria-label="Género">
          <button class="g-btn is-active" data-genero="todos" role="tab">Todo</button>
          <button class="g-btn" data-genero="mujer" role="tab">Mujer</button>
          <button class="g-btn" data-genero="hombre" role="tab">Hombre</button>
        </div>
''' if genero_toggle else ''
    return f'''      <div class="filters">
        <label class="search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
          <input id="search" type="search" placeholder="Busca un modelo o color" autocomplete="off">
        </label>
{toggle}        <div class="tabs" id="catTabs" hidden></div>
        <div class="filter-row">
          <div class="size-filter" id="sizeFilter" aria-label="Filtrar por talla"></div>
          <label class="sort">
            <span>Ordenar</span>
            <select id="sortSelect">
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">Nombre A–Z</option>
            </select>
          </label>
        </div>
      </div>
      <div class="grid" id="grid"></div>
      <p class="empty" id="empty" hidden></p>
      <div class="more"><button class="btn btn-outline" id="moreBtn" hidden>Ver más modelos</button></div>'''

def crumbs(root, items):
    parts = [f'<a href="{root}index.html">Inicio</a>'] + [f'<a href="{h}">{E(t)}</a>' if h else f'<span aria-current="page">{E(t)}</span>' for t, h in items]
    return '<nav class="crumbs" aria-label="Ruta">' + '<i>/</i>'.join(parts) + '</nav>'

pages = {}

# ---------- Portada ----------
pages['index.html'] = layout(root='', path='', title='Calzado C&D — Tenis para mujer y hombre',
    desc='Más de 200 modelos de tenis para mujer y hombre con hasta 20% de descuento. Envío gratis desde $200.000. Pide por WhatsApp.',
    scripts=['inicio.js'], body=open('tools/partes/inicio.html', encoding='utf-8').read().replace('{{COMO_COMPRAR}}', HOW_SHIP))

# ---------- Catálogo completo ----------
pages['catalogo.html'] = layout(root='', path='catalogo.html', title='Catálogo completo — Calzado C&D',
    desc='Todos los tenis de Calzado C&D para mujer y hombre. Busca por modelo, color o talla.',
    scripts=['catalogo.js'], body=f'''<main>
  <section class="catalog catalog-page" id="catalogo">
    <div class="wrap">
      {crumbs('', [('Catálogo', None)])}
      <div class="catalog-head">
        <h1 class="section-title" id="catTitle">Todo el catálogo</h1>
        <p class="result-count" id="resultCount"></p>
      </div>
{filtros(True)}
    </div>
  </section>
</main>''')

# ---------- Sección de estilos (página de Mujer) ----------
ESTILOS_T = '''  <section class="moca" id="estilos" aria-labelledby="estilosTitle">
    <div class="wrap moca-in">
      <div class="moca-copy">
        <h2 id="estilosTitle">Encuentra tu estilo</h2>
        <p>{txt}</p>
        <p class="moca-price" id="estiloActual"></p>
        <a class="btn btn-cream" href="#catalogo">Ver todos los modelos</a>
      </div>
      <div class="moca-stage" id="mocaStage">
        <div class="moca-ring" id="mocaRing"></div>
        <div class="moca-nav">
          <button type="button" class="moca-arrow" data-moca="-1" aria-label="Anterior">‹</button>
          <div class="moca-dots" id="mocaDots"></div>
          <button type="button" class="moca-arrow" data-moca="1" aria-label="Siguiente">›</button>
        </div>
      </div>
    </div>
  </section>'''

ESTILOS_TXT = {'mujer': 'Sneakers, chunky, retro, mocasines, comfy e importados. Desliza y entra al que más va contigo.',
               'hombre': 'Casual, deportivos e importados. Desliza y entra al que más va contigo.'}

# ---------- Colecciones ----------
PORTADA = {'mujer': ('d-maryury', 0), 'hombre': ('juance', 0), 'mujer-plataforma': ('d-bloom', 0), 'mujer-deportivos': ('d-nova', 0),
    'mujer-retro': ('d-quintero', 0), 'mujer-mocasines': ('d-anahi-taupe', 0), 'mujer-sandalias': ('d-comfy', 0),
    'mujer-importados': ('d-maryury', 0), 'hombre-casual': ('smood', 1), 'hombre-deportivos': ('calamar', 1), 'hombre-importados': ('juance', 0)}
DESC_GEN = {'mujer': 'Plataformas, retro, deportivos, mocasines e importados. Tallas 34 a 40.',
            'hombre': 'Casual, deportivos e importados. Tallas 37 a 44.'}
for g in ('mujer', 'hombre'):
    for c in [None] + [x['id'] for x in CATS[g]]:
        key = g + ('-' + c if c else '')
        ps = [p for p in PRODUCTS if p['genero'] == g and (not c or p['categoria'] == c)]
        if not ps: continue
        titulo = f'Tenis para {g}' if not c else f'{cat_nombre(g, c)} para {g}'
        cdesc = DESC_GEN[g] if not c else next(x['desc'] for x in CATS[g] if x['id'] == c) + '.'
        ventas = [precio(p, v)[0] for p in ps for v in p['variantes'] if precio(p, v)]
        pid, vi = PORTADA.get(key, (ps[0]['id'], 0))
        fp = next(p for p in PRODUCTS if p['id'] == pid)['variantes'][vi]['fotos'][0]
        items = [(GEN[g], f'../coleccion/{g}.html' if c else None)] + ([(cat_nombre(g, c), None)] if c else [])
        body = f'''<main>
  <section class="coll-hero">
    <div class="wrap coll-hero-in">
      <div class="coll-copy">
        {crumbs('../', items)}
        <h1>{E(titulo)}</h1>
        <p>{E(cdesc)}</p>
        <p class="coll-meta"><b>{len(ps)}</b> modelos{f' · desde <b>{fmt(min(ventas))}</b>' if ventas else ''}</p>
      </div>
      <img class="coll-img" src="../{fp.replace('/dama/', '/dama-hd/')}" alt="{E(titulo)}">
    </div>
  </section>
{ESTILOS_T.replace('{txt}', ESTILOS_TXT[g]) if not c else ''}
  <section class="catalog" id="catalogo">
    <div class="wrap">
      <div class="catalog-head"><h2 class="section-title" id="catTitle">{E(cat_nombre(g, c) if c else 'Todos los modelos')}</h2><p class="result-count" id="resultCount"></p></div>
{filtros(False)}
    </div>
  </section>
</main>'''
        pages[f'coleccion/{key}.html'] = layout(root='../', path=f'coleccion/{key}.html', title=f'{titulo} — Calzado C&D',
            desc=f'{cdesc} {len(ps)} modelos' + (f' desde {fmt(min(ventas))}' if ventas else '') + '. Envío gratis desde $200.000.',
            scripts=['catalogo.js'] + (['estilos.js'] if not c else []), page={'genero': g, 'cat': c or 'todas'}, body=body,
            og_image=fp.replace('/dama/', '/dama-hd/'))

# ---------- Productos ----------
for p in PRODUCTS:
    g, c = p['genero'], p['categoria']
    v0 = p['variantes'][0]
    pr = precio(p, v0)
    ts = tallas(p)
    colores = ', '.join(v['color'] for v in p['variantes'])
    foto_hd = v0['fotos'][0].replace('/dama/', '/dama-hd/')
    n = len(p['variantes'])
    txt_tallas = f"Tallas {ts[0]} a {ts[-1]}." if len(ts) > 1 else f"Talla {ts[0]}."
    txt_color = f"Disponible en {n} colores: {colores}." if n > 1 else f"Color {colores.lower()}."
    desc = f"Tenis {p['nombre']} para {g}, línea {cat_nombre(g, c).lower()}. {txt_color} {txt_tallas}"
    meta = f"{desc} {'Precio ' + fmt(pr[0]) + '. ' if pr else ''}Envío gratis desde $200.000."
    ld = {'@context': 'https://schema.org', '@type': 'Product', 'name': f"Tenis {p['nombre']}", 'brand': {'@type': 'Brand', 'name': 'Calzado C&D'},
          'image': [SITE + v['fotos'][0].replace('/dama/', '/dama-hd/') for v in p['variantes']], 'description': desc}
    if pr: ld['offers'] = {'@type': 'Offer', 'price': pr[0], 'priceCurrency': 'COP', 'url': f"{SITE}producto/{slug_prod(p)}.html"}
    price_html = (f'<span class="now">{fmt(pr[0])}</span><span class="was">{fmt(pr[1])}</span><span class="off">−{round(REBAJA*100)}%</span>'
                  if pr else '<span class="ask">Precio a consultar</span>')
    body = f'''<main class="pdp">
  <div class="wrap">
    {crumbs('../', [(GEN[g], f'../coleccion/{g}.html'), (cat_nombre(g, c), f'../coleccion/{g}-{c}.html'), (p['nombre'], None)])}
    <div class="pdp-in">
      <div class="gallery">
        <div class="zoom" id="zoom" role="button" tabindex="0" aria-label="Ampliar foto">
          <img id="pImg" src="../{foto_hd}" alt="Tenis {E(p['nombre'])} {E(v0['color'])}">
          <span class="badge" id="pBadge"{'' if pr else ' hidden'}>−{round(REBAJA*100)}%</span>
          {'<span class="tag-imp">Importado</span>' if c == 'importados' else ''}
        </div>
        <div class="gallery-bar">
          <div class="thumbs" id="pThumbs"></div>
          <button class="zoom-btn" id="pOpenZoom" type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/></svg>
            Ampliar foto
          </button>
        </div>
      </div>
      <div class="pdp-info">
        <p class="card-kicker">{GEN[g]} · {E(cat_nombre(g, c))}</p>
        <h1>{E(p['nombre'])}</h1>
        <div class="price" id="pPrice">{price_html}</div>
        <p class="m-save" id="pSave"></p>
        <div class="m-block">
          <p class="m-label">Color: <b id="pColor">{E(v0['color'])}</b></p>
          <div class="swatches lg" id="pSw"></div>
        </div>
        <div class="m-block">
          <div class="m-label-row"><p class="m-label">Talla</p><a class="m-guide-btn" href="#guia">Guía de tallas</a></div>
          <div class="sizes" id="pSizes"></div>
          <p class="m-hint" id="pHint"></p>
        </div>
        <button class="btn btn-dark btn-block" id="pAdd">Agregar a la bolsa</button>
        <a class="btn btn-wa btn-block" id="pWa" target="_blank" rel="noopener" href="https://wa.me/573045309015">Pedir este par por WhatsApp</a>
        <button class="m-share" id="pShare" type="button">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>
          Compartir este modelo
        </button>
        <ul class="pdp-points">
          <li><b>Envío $20.000</b> · gratis desde $200.000</li>
          <li><b>Llega en 2 a 3 días</b> · pagas por Bancolombia o Nequi</li>
          <li><b>Cambio de talla</b> dentro de 5 días hábiles · <a href="../politicas.html#cambios">ver política</a></li>
        </ul>
        <section class="pdp-guide" id="guia">
          <h2>Guía de tallas</h2>
          <div id="pGuide"></div>
        </section>
        <section class="pdp-desc">
          <h2>Detalles</h2>
          <p>{E(desc)}</p>
        </section>
      </div>
    </div>
  </div>
  <section class="related">
    <div class="wrap">
      <div class="premium-head"><h2 class="section-title">También te puede gustar</h2><div class="shelf-nav"><a class="link-more" href="../coleccion/{g}-{c}.html">Ver {E(cat_nombre(g, c).lower())}</a><button class="arrow" data-scroll="#related" data-dir="-1" aria-label="Anteriores">‹</button><button class="arrow" data-scroll="#related" data-dir="1" aria-label="Siguientes">›</button></div></div>
      <div class="shelf-row" id="related"></div>
    </div>
  </section>
</main>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="Foto ampliada">
  <div class="lb-stage" id="lbStage"><img id="lbImg" alt="" draggable="false"></div>
  <div class="lb-bar">
    <button type="button" id="lbMinus" aria-label="Alejar">−</button>
    <span>Pellizca o toca dos veces para acercar</span>
    <button type="button" id="lbPlus" aria-label="Acercar">+</button>
  </div>
  <button class="lb-close" data-lb-close aria-label="Cerrar">×</button>
</div>'''
    pages[f'producto/{slug_prod(p)}.html'] = layout(root='../', path=f'producto/{slug_prod(p)}.html',
        title=f"Tenis {p['nombre']} para {g} — Calzado C&D", desc=meta, scripts=['producto.js'],
        page={'id': p['id']}, body=body, og_image=foto_hd,
        extra_head=f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n')

# ---------- Políticas ----------
pages['politicas.html'] = layout(root='', path='politicas.html', title='Políticas y ayuda — Calzado C&D',
    desc='Envíos, cambios y devoluciones, garantía, derecho de retracto, privacidad y preguntas frecuentes de Calzado C&D.',
    scripts=[], body=open('tools/politicas_main.html', encoding='utf-8').read())

# ---------- Escribir ----------
for d in ('producto', 'coleccion'):
    shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
for path, content in pages.items():
    open(path, 'w', encoding='utf-8').write(content)
urls = [''] + [p for p in pages if p != 'index.html']
open('sitemap.xml', 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join(f'  <url><loc>{SITE}{u}</loc></url>\n' for u in urls) + '</urlset>\n')
open('robots.txt', 'w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}sitemap.xml\n')
print(f"Listo: {len(pages)} páginas ({sum(1 for p in pages if p.startswith('producto/'))} de producto, "
      f"{sum(1 for p in pages if p.startswith('coleccion/'))} de colección).")
