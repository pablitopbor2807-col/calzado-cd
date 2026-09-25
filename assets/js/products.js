/* =====================================================================
   CALZADO C&D — catálogo de productos (hombre y mujer)
   ---------------------------------------------------------------------
   PRECIOS: PRECIO_MAYORISTA = precio por mayor de cada modelo (COP).
     Hombre: catálogo "CABALLERO MAYOR".  Mujer: catálogo "DAMA MAYOR 21 SEPTIEMBRE 2026".
   La página calcula sola:
     precio de venta  = mayorista + 45%   (redondeado hacia arriba a $1.000)
     precio "antes"   = precio de venta ÷ 0,80  → se muestra tachado con -20%
   Si un color cuesta distinto, usa la clave "modelo/color", ej: "calamar/rojo".
   Mientras un modelo esté en null se muestra "Precio a consultar".
   ===================================================================== */

const CD_MARGEN = 0.45;   // 45% sobre el precio mayorista
const CD_REBAJA = 0.20;   // rebaja simulada del 20%

const PRECIO_MAYORISTA = {
  // ---------- Hombre ----------
  'ciro': 85000,  // Ciro
  'ondred': 85000,  // Ondred
  'smood': 80000,  // Smood
  'nobel': 85000,  // Nobel
  'medichi': 80000,  // Medichi
  'mqueen': 75000,  // Mqueen
  'mexico': 75000,  // México
  'natael': 75000,  // Natael
  'cano': 90000,  // Cano
  'gregory': 75000,  // Gregory
  'toguen': 85000,  // Toguen
  'nakin': 80000,  // Nakin
  'giovanny': 85000,  // Giovanny
  'bautista': 75000,  // Bautista
  'panter': 85000,  // Panter
  'sneaker': 75000,  // Sneaker
  'calamar-2-0': 75000,  // Calamar 2.0
  'onix': 85000,  // Onix
  'slim': 75000,  // Slim
  'wolf': 75000,  // Wolf
  'leons': 85000,  // Leons
  '530': 85000,  // 530
  'giraldo': 78000,  // Giraldo
  'american': 85000,  // American
  'clasic': 75000,  // Clasic
  'classic-ja': 80000,  // Classic JA
  'fercho': 75000,  // Fercho
  'mocasin': 75000,  // Mocasín
  'calamar': 85000,  // Calamar
  'fermin': 88000,  // Fermín
  'anton': 80000,  // Antón
  'sport': 70000,  // Sport
  'impacto': 75000,  // Impacto
  'diego-t': 75000,  // Diego T
  'titanrush': 75000,  // Titanrush
  'frankil': 85000,  // Frankil
  'jumping': 75000,  // Jumping
  'm11': 75000,  // M11
  'm02': 75000,  // M02
  'dreamer': 75000,  // Dreamer
  'victor': 75000,  // Victor
  'rayos': 75000,  // Rayos
  'connor': 75000,  // Connor
  'leo': 75000,  // Leo
  'juance': 95000,  // Juance
  'cristiano': 95000,  // Cristiano
  'molotov': 95000,  // Molotov
  'enigma': 95000,  // Enigma
  'delta': 95000,  // Delta
  'atlas': 95000,  // Atlas
  'gregory/negro-rojo': 85000,
  'giovanny/azul': 80000,
  'onix/todo-negro': 65000,
  'onix/negro-blanco': 65000,
  'classic-ja/verde': 85000,
  'calamar/petroleo': 75000,

  // ---------- Mujer ----------
  'd-comfy': 95000,  // Comfy
  'd-soso': 95000,  // Soso
  'd-anahi': 130000,  // Anahi
  'd-tokisha': 90000,  // Tokisha
  'd-tokisha-new': 90000,  // Tokisha New
  'd-wish': 40000,  // Wish
  'd-edna': 65000,  // Edna
  'd-amara': 65000,  // Amara
  'd-anitta': 65000,  // Anitta
  'd-candy-moon': 75000,  // Candy Moon
  'd-vanity': 80000,  // Vanity
  'd-ivonny': 80000,  // Ivonny
  'd-tata': 70000,  // Tata
  'd-andy': 80000,  // Andy
  'd-miu': 85000,  // Miu
  'd-bloom': 97000,  // Bloom
  'd-agora': null,  // Agora
  'd-mqueen-gold': 82000,  // Mqueen Gold
  'd-davianka': 93000,  // Davianka
  'd-mayra': 85000,  // Mayra
  'd-niko': 85000,  // Niko
  'd-dolly': 85000,  // Dolly
  'd-gg': 85000,  // Gg
  'd-nova': 85000,  // Nova
  'd-empire': 77000,  // Empire
  'd-valu': 80000,  // Valu
  'd-mulan': 75000,  // Mulan
  'd-vina': null,  // Vina
  'd-seleccion-1': 75000,  // Selección 1
  'd-seleccion-2': 75000,  // Selección 2
  'd-seleccion-3': 75000,  // Selección 3
  'd-seleccion-4': 75000,  // Selección 4
  'd-penelope': 85000,  // Penelope
  'd-rihaza': 85000,  // Rihaza
  'd-emperatriz': 85000,  // Emperatriz
  'd-roma-2-0': 85000,  // Roma 2.0
  'd-maria-luna': 85000,  // Maria Luna
  'd-alice': 85000,  // Alice
  'd-lino': 85000,  // Lino
  'd-ivana': 90000,  // Ivana
  'd-ivana/blanco': 85000,  // color con precio distinto
  'd-aroma': 85000,  // Aroma
  'd-bernard': 90000,  // Bernard
  'd-royal': 85000,  // Royal
  'd-salome': 70000,  // Salome
  'd-maria-estrella': 85000,  // Maria Estrella
  'd-marce': 90000,  // Marce
  'd-ingrata': 85000,  // Ingrata
  'd-nazly': 85000,  // Nazly
  'd-gabriela': 85000,  // Gabriela
  'd-briana': null,  // Briana
  'd-little-star': 75000,  // Little Star
  'd-cactus': 80000,  // Cactus
  'd-ibery': null,  // Ibery
  'd-lorrein': 78000,  // Lorrein
  'd-quintero': 75000,  // Quintero
  'd-sirley': null,  // Sirley
  'd-yina': 80000,  // Yina
  'd-wolf': 75000,  // Wolf
  'd-miu-miu': 77000,  // Miu Miu
  'd-sereina': 77000,  // Sereina
  'd-durca': 70000,  // Durca
  'd-hasley': 75000,  // Hasley
  'd-audry': 70000,  // Audry
  'd-marsmello': 75000,  // Marsmello
  'd-hasley-lisboa': 75000,  // Hasley Lisboa
  'd-golding': 75000,  // Golding
  'd-solano': 90000,  // Solano
  'd-solano/talco': 85000,  // color con precio distinto
  'd-solano/negro': 85000,  // color con precio distinto
  'd-solange': 90000,  // Solange
  'd-sole': 85000,  // Sole
  'd-deili': 80000,  // Deili
  'd-elegans': 82000,  // Elegans
  'd-amarte': 80000,  // Amarte
  'd-dubai': 80000,  // Dubai
  'd-mia': 81000,  // Mia
  'd-boni': 75000,  // Boni
  'd-cosmo-3-0': 82000,  // Cosmo 3.0
  'd-unique': 80000,  // Unique
  'd-nectar': 80000,  // Nectar
  'd-abu-dabi': 80000,  // Abu Dabi
  'd-divine': 80000,  // Divine
  'd-alaia': null,  // Alaia
  'd-klim': 80000,  // Klim
  'd-tifanny': 75000,  // Tifanny
  'd-ebani': 85000,  // Ebani
  'd-igo': null,  // Igo
  'd-inaki': null,  // Iñaki
  'd-becky-bost': 80000,  // Becky Bost
  'd-duarte': 78000,  // Duarte
  'd-delphine': 80000,  // Delphine
  'd-delphine/blanco': 75000,  // color con precio distinto
  'd-delphine/broches-talco': 85000,  // color con precio distinto
  'd-silvia': 85000,  // Silvia
  'd-brito': 80000,  // Brito
  'd-rendon': 80000,  // Rendon
  'd-manelyk': 80000,  // Manelyk
  'd-arena': null,  // Arena
  'd-madison': 85000,  // Madison
  'd-royal-fashionista': 85000,  // Royal Fashionista
  'd-fashion-trendy': 85000,  // Fashion Trendy
  'd-play-boy': 90000,  // Play Boy
  'd-mindy': 90000,  // Mindy
  'd-lyon-fashionista': 85000,  // Lyon Fashionista
  'd-algodon-broches': 85000,  // Algodón broches
  'd-algodon': 85000,  // Algodón
  'd-oreo': 75000,  // Oreo
  'd-missy': 78000,  // Missy
  'd-hands': 80000,  // Hands
  'd-yolimar': 70000,  // Yolimar
  'd-hasley-quintero': 75000,  // Hasley Quintero
  'd-aleja': 75000,  // Aleja
  'd-mqueen-luna': 75000,  // Mqueen Luna
  'd-bambi': 75000,  // Bambi
  'd-nucita': 80000,  // Nucita
  'd-coco': 80000,  // Coco
  'd-brisa': 80000,  // Brisa
  'd-lyon': 75000,  // Lyon
  'd-romantic': 70000,  // Romantic
  'd-eliana': 78000,  // Eliana
  'd-eliana-2-0': 78000,  // Eliana 2.0
  'd-doris': 75000,  // Doris
  'd-lucia': 75000,  // Lucia
  'd-dove': 80000,  // Dove
  'd-esmeralda': 75000,  // Esmeralda
  'd-glitter': 75000,  // Glitter
  'd-divas': 80000,  // Divas
  'd-divas/glitter': 75000,  // color con precio distinto
  'd-quintin': 77000,  // Quintin
  'd-mani': 72000,  // Mani
  'd-gate': 77000,  // Gate
  'd-gate/negro': 75000,  // color con precio distinto
  'd-titanic': 85000,  // Titanic
  'd-titanic/negro': 75000,  // color con precio distinto
  'd-gala': 75000,  // Gala
  'd-isabella': 80000,  // Isabella
  'd-ganchito': 80000,  // Ganchito
  'd-rosita': 80000,  // Rosita
  'd-touss': 80000,  // Touss
  'd-olena-italiana': 75000,  // Olena Italiana
  'd-roma': 75000,  // Roma
  'd-indiana': 80000,  // Indiana
  'd-nirvana': 75000,  // Nirvana
  'd-sevilla': 75000,  // Sevilla
  'd-new-wish-2-0': 70000,  // New Wish 2.0
  'd-sandia': 75000,  // Sandia
  'd-treici': 80000,  // Treici
  'd-eipril': 80000,  // Eipril
  'd-530': 85000,  // 530
  'd-rodriguez': 78000,  // Rodriguez
  'd-giraldo': 78000,  // Giraldo
  'd-honey': null,  // Honey
  'd-ciaga': 120000,  // Ciaga
  'd-spring': 95000,  // Spring
  'd-spring/crema-lila': 100000,  // color con precio distinto
  'd-panqueik': 100000,  // Panqueik
  'd-pai-de-durazno': 100000,  // Pai De Durazno
  'd-salazar': 100000,  // Salazar
  'd-quintana': 100000,  // Quintana
  'd-quintanilla': 100000,  // Quintanilla
  'd-gaviria': 100000,  // Gaviria
  'd-mariani': 100000,  // Mariani
  'd-orozco': null,  // Orozco
  'd-maryury': 120000,  // Maryury
  'd-camila': 110000,  // Camila
};

const CD_GENEROS = {
  hombre: 'Hombre',
  mujer: 'Mujer'
};

// Categorías por género, en el orden en que se muestran
const CD_CATEGORIAS = {
  hombre: [
    { id: 'casual', nombre: 'Casual', desc: 'Clásicos para todos los días' },
    { id: 'deportivos', nombre: 'Deportivos', desc: 'Livianos y cómodos' },
    { id: 'importados', nombre: 'Importados', desc: 'Alta gama' }
  ],
  mujer: [
    { id: 'plataforma', nombre: 'Plataforma', desc: 'Suela alta, look limpio' },
    { id: 'deportivos', nombre: 'Deportivos', desc: 'Chunky y running' },
    { id: 'retro', nombre: 'Retro', desc: 'Rayas y suela caramelo' },
    { id: 'sandalias', nombre: 'Sandalias y pantuflas', desc: 'Comodidad total' },
    { id: 'importados', nombre: 'Importados', desc: 'Alta gama' }
  ]
};

const CD_PRODUCTS = [
  {
    "id": "ciro",
    "nombre": "Ciro",
    "variantes": [
      {
        "color": "Gris",
        "hex": "#8a8d91",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/ciro-gris-200.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "ondred",
    "nombre": "Ondred",
    "variantes": [
      {
        "color": "Café",
        "hex": "#5a4032",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/ondred-cafe-201.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "smood",
    "nombre": "Smood",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/smood-negro-210.jpg"
        ]
      },
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/smood-azul-211.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "nobel",
    "nombre": "Nobel",
    "variantes": [
      {
        "color": "Gris / Blanco",
        "hex": "#b9b4ac",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/nobel-gris-blanco-300.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/nobel-negro-301.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "medichi",
    "nombre": "Medichi",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/medichi-negro-310.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/medichi-blanco-311.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "mqueen",
    "nombre": "Mqueen",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#e8e0d0",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/mqueen-crema-400.jpg",
          "assets/img/productos/mqueen-crema-401.jpg"
        ]
      },
      {
        "color": "Blanco / Negro",
        "hex": "#f2f0ec",
        "tallas": [
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/mqueen-blanco-negro-1500.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "mexico",
    "nombre": "México",
    "variantes": [
      {
        "color": "Blanco / Verde",
        "hex": "#2f6b45",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/mexico-blanco-verde-410.jpg",
          "assets/img/productos/mexico-blanco-verde-411.jpg"
        ]
      },
      {
        "color": "Blanco / Verde",
        "hex": "#2f6b45",
        "tallas": [
          38,
          39
        ],
        "fotos": [
          "assets/img/productos/mexico-blanco-verde-2210.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "natael",
    "nombre": "Natael",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/natael-negro-500.jpg",
          "assets/img/productos/natael-negro-501.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "cano",
    "nombre": "Cano",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#2a2a2a",
        "tallas": [
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/cano-negro-510.jpg",
          "assets/img/productos/cano-negro-511.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "gregory",
    "nombre": "Gregory",
    "variantes": [
      {
        "color": "Crema / Café",
        "hex": "#e3d9c6",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/gregory-crema-cafe-600.jpg",
          "assets/img/productos/gregory-crema-cafe-601.jpg"
        ]
      },
      {
        "color": "Negro / Rojo",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/gregory-negro-rojo-610.jpg",
          "assets/img/productos/gregory-negro-rojo-611.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "toguen",
    "nombre": "Toguen",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/toguen-negro-700.jpg",
          "assets/img/productos/toguen-negro-701.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "nakin",
    "nombre": "Nakin",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/nakin-negro-710.jpg",
          "assets/img/productos/nakin-negro-711.jpg"
        ]
      },
      {
        "color": "Azul oscuro",
        "hex": "#1f2a44",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/nakin-azul-oscuro-800.jpg",
          "assets/img/productos/nakin-azul-oscuro-801.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "giovanny",
    "nombre": "Giovanny",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/giovanny-azul-810.jpg",
          "assets/img/productos/giovanny-azul-811.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          37,
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/giovanny-negro-1000.jpg",
          "assets/img/productos/giovanny-negro-1001.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          37,
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/giovanny-blanco-1010.jpg",
          "assets/img/productos/giovanny-blanco-1011.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "bautista",
    "nombre": "Bautista",
    "variantes": [
      {
        "color": "Negro / Gris",
        "hex": "#6d7076",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/bautista-negro-gris-900.jpg",
          "assets/img/productos/bautista-negro-gris-901.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "panter",
    "nombre": "Panter",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/panter-negro-910.jpg",
          "assets/img/productos/panter-negro-911.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "sneaker",
    "nombre": "Sneaker",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/sneaker-blanco-1100.jpg",
          "assets/img/productos/sneaker-blanco-1101.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "calamar-2-0",
    "nombre": "Calamar 2.0",
    "variantes": [
      {
        "color": "Negro / Azul",
        "hex": "#2c3440",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/calamar-2-0-negro-azul-1110.jpg",
          "assets/img/productos/calamar-2-0-negro-azul-1111.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "onix",
    "nombre": "Onix",
    "variantes": [
      {
        "color": "Todo negro",
        "hex": "#111111",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/onix-todo-negro-1200.jpg",
          "assets/img/productos/onix-todo-negro-1201.jpg"
        ]
      },
      {
        "color": "Negro / Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/onix-negro-blanco-1210.jpg",
          "assets/img/productos/onix-negro-blanco-1211.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#6f7378",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/onix-gris-1300.jpg",
          "assets/img/productos/onix-gris-1301.jpg"
        ]
      },
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/onix-azul-1310.jpg",
          "assets/img/productos/onix-azul-1311.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "slim",
    "nombre": "Slim",
    "variantes": [
      {
        "color": "Gris",
        "hex": "#8a8d91",
        "tallas": [
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/slim-gris-1400.jpg",
          "assets/img/productos/slim-gris-1401.jpg"
        ]
      },
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/slim-azul-2610.jpg",
          "assets/img/productos/slim-azul-2611.jpg"
        ]
      },
      {
        "color": "Rojo",
        "hex": "#b3202a",
        "tallas": [
          39,
          40
        ],
        "fotos": [
          "assets/img/productos/slim-rojo-2810.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41
        ],
        "fotos": [
          "assets/img/productos/slim-blanco-2900.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "wolf",
    "nombre": "Wolf",
    "variantes": [
      {
        "color": "Blanco / Negro",
        "hex": "#e9e6e0",
        "tallas": [
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/wolf-blanco-negro-1501.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/wolf-negro-1510.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/wolf-blanco-1511.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "leons",
    "nombre": "Leons",
    "variantes": [
      {
        "color": "Blanco / Negro",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/leons-blanco-negro-1600.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#556048",
        "tallas": [
          39,
          43
        ],
        "fotos": [
          "assets/img/productos/leons-verde-1700.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          43
        ],
        "fotos": [
          "assets/img/productos/leons-negro-1710.jpg",
          "assets/img/productos/leons-negro-1711.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "530",
    "nombre": "530",
    "variantes": [
      {
        "color": "Blanco / Gris",
        "hex": "#d7d7d7",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/530-blanco-gris-1601.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "giraldo",
    "nombre": "Giraldo",
    "variantes": [
      {
        "color": "Blanco / Negro",
        "hex": "#e9e6e0",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/giraldo-blanco-negro-1610.jpg",
          "assets/img/productos/giraldo-blanco-negro-1611.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "american",
    "nombre": "American",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          39,
          40,
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/american-azul-1701.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "clasic",
    "nombre": "Clasic",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/productos/clasic-negro-1800.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "classic-ja",
    "nombre": "Classic JA",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          38
        ],
        "fotos": [
          "assets/img/productos/classic-ja-negro-1801.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#556048",
        "tallas": [
          37,
          38
        ],
        "fotos": [
          "assets/img/productos/classic-ja-verde-2211.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "fercho",
    "nombre": "Fercho",
    "variantes": [
      {
        "color": "Blanco / Beige",
        "hex": "#e3d9c6",
        "tallas": [
          38,
          39,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/fercho-blanco-beige-1810.jpg"
        ]
      },
      {
        "color": "Blanco / Rojo",
        "hex": "#b3202a",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/fercho-blanco-rojo-2300.jpg"
        ]
      },
      {
        "color": "Negro / Amarillo",
        "hex": "#d9cf5a",
        "tallas": [
          39,
          43
        ],
        "fotos": [
          "assets/img/productos/fercho-negro-amarillo-2301.jpg"
        ]
      },
      {
        "color": "Negro / Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41
        ],
        "fotos": [
          "assets/img/productos/fercho-negro-blanco-2310.jpg"
        ]
      },
      {
        "color": "Blanco / Amarillo",
        "hex": "#e6d44a",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/productos/fercho-blanco-amarillo-2901.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#4a4d53",
        "tallas": [
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/fercho-gris-2910.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "mocasin",
    "nombre": "Mocasín",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#3b4a63",
        "tallas": [
          38,
          40,
          41,
          43
        ],
        "fotos": [
          "assets/img/productos/mocasin-azul-1811.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "calamar",
    "nombre": "Calamar",
    "variantes": [
      {
        "color": "Petróleo",
        "hex": "#5b646c",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/productos/calamar-petroleo-1900.jpg"
        ]
      },
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          37,
          38,
          39,
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/calamar-azul-1901.jpg"
        ]
      },
      {
        "color": "Negro / Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/productos/calamar-negro-blanco-1910.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#4f5a3c",
        "tallas": [
          39,
          40,
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/calamar-verde-1911.jpg"
        ]
      },
      {
        "color": "Gris oscuro",
        "hex": "#4a4d53",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/calamar-gris-oscuro-2000.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          37,
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/calamar-blanco-2001.jpg"
        ]
      },
      {
        "color": "Gris claro",
        "hex": "#b5bcc4",
        "tallas": [
          38,
          39
        ],
        "fotos": [
          "assets/img/productos/calamar-gris-claro-2010.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#9a9ea3",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/calamar-gris-2011.jpg"
        ]
      },
      {
        "color": "Rojo",
        "hex": "#b3202a",
        "tallas": [
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/calamar-rojo-2711.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "fermin",
    "nombre": "Fermín",
    "variantes": [
      {
        "color": "Miel",
        "hex": "#c8923a",
        "tallas": [
          43,
          44
        ],
        "fotos": [
          "assets/img/productos/fermin-miel-2100.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "anton",
    "nombre": "Antón",
    "variantes": [
      {
        "color": "Blanco / Azul",
        "hex": "#f2f0ec",
        "tallas": [
          37,
          38,
          39,
          41,
          44
        ],
        "fotos": [
          "assets/img/productos/anton-blanco-azul-2101.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "sport",
    "nombre": "Sport",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/productos/sport-azul-2110.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "impacto",
    "nombre": "Impacto",
    "variantes": [
      {
        "color": "Blanco / Verde",
        "hex": "#f2f0ec",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/productos/impacto-blanco-verde-2111.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "diego-t",
    "nombre": "Diego T",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41
        ],
        "fotos": [
          "assets/img/productos/diego-t-blanco-2200.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "titanrush",
    "nombre": "Titanrush",
    "variantes": [
      {
        "color": "Blanco / Rojo",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/titanrush-blanco-rojo-2201.jpg"
        ]
      },
      {
        "color": "Blanco / Verde",
        "hex": "#2f6b45",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/productos/titanrush-blanco-verde-2500.jpg"
        ]
      },
      {
        "color": "Blanco / Gris",
        "hex": "#d7d7d7",
        "tallas": [
          38,
          40,
          41
        ],
        "fotos": [
          "assets/img/productos/titanrush-blanco-gris-2501.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "frankil",
    "nombre": "Frankil",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          44
        ],
        "fotos": [
          "assets/img/productos/frankil-azul-2311.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "jumping",
    "nombre": "Jumping",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#1f2a44",
        "tallas": [
          39,
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/jumping-azul-2400.jpg",
          "assets/img/productos/jumping-azul-2401.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#8a8d91",
        "tallas": [
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/jumping-gris-2700.jpg",
          "assets/img/productos/jumping-gris-2701.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "m11",
    "nombre": "M11",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/m11-blanco-2410.jpg"
        ]
      },
      {
        "color": "Verde / Gris",
        "hex": "#4f7a5a",
        "tallas": [
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/m11-verde-gris-2411.jpg"
        ]
      },
      {
        "color": "Gris / Rojo",
        "hex": "#b3202a",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/m11-gris-rojo-2511.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "m02",
    "nombre": "M02",
    "variantes": [
      {
        "color": "Negro / Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/m02-negro-blanco-2510.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          42
        ],
        "fotos": [
          "assets/img/productos/m02-blanco-2600.jpg"
        ]
      },
      {
        "color": "Gris / Verde",
        "hex": "#44605a",
        "tallas": [
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/m02-gris-verde-2601.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "dreamer",
    "nombre": "Dreamer",
    "variantes": [
      {
        "color": "Negro / Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/dreamer-negro-blanco-2710.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "victor",
    "nombre": "Victor",
    "variantes": [
      {
        "color": "Gris / Negro",
        "hex": "#4a4d53",
        "tallas": [
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/victor-gris-negro-2800.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "rayos",
    "nombre": "Rayos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          38,
          39,
          42
        ],
        "fotos": [
          "assets/img/productos/rayos-negro-2801.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "connor",
    "nombre": "Connor",
    "variantes": [
      {
        "color": "Blanco / Azul",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          42
        ],
        "fotos": [
          "assets/img/productos/connor-blanco-azul-2811.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "casual"
  },
  {
    "id": "leo",
    "nombre": "Leo",
    "variantes": [
      {
        "color": "Azul / Amarillo",
        "hex": "#1f2a44",
        "tallas": [
          39,
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/leo-azul-amarillo-2911.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "deportivos"
  },
  {
    "id": "juance",
    "nombre": "Juance",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/juance-negro-3100.jpg",
          "assets/img/productos/juance-negro-3101.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#6f7378",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/juance-gris-3110.jpg",
          "assets/img/productos/juance-gris-3111.jpg"
        ]
      },
      {
        "color": "Negro / Beige",
        "hex": "#c49a6c",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/juance-negro-beige-3200.jpg",
          "assets/img/productos/juance-negro-beige-3201.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "importados"
  },
  {
    "id": "cristiano",
    "nombre": "Cristiano",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#111111",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/cristiano-negro-3210.jpg",
          "assets/img/productos/cristiano-negro-3211.jpg"
        ]
      },
      {
        "color": "Negro / Rojo",
        "hex": "#b3202a",
        "tallas": [
          39,
          40,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/cristiano-negro-rojo-3300.jpg",
          "assets/img/productos/cristiano-negro-rojo-3301.jpg"
        ]
      },
      {
        "color": "Negro / Gris",
        "hex": "#b5bcc4",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/cristiano-negro-gris-3310.jpg",
          "assets/img/productos/cristiano-negro-gris-3311.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "importados"
  },
  {
    "id": "molotov",
    "nombre": "Molotov",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/molotov-negro-3400.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#d7d7d7",
        "tallas": [
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/molotov-blanco-3401.jpg"
        ]
      },
      {
        "color": "Negro / Verde",
        "hex": "#2f6b45",
        "tallas": [
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/molotov-negro-verde-3410.jpg",
          "assets/img/productos/molotov-negro-verde-3411.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "importados"
  },
  {
    "id": "enigma",
    "nombre": "Enigma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#111111",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/enigma-negro-3510.jpg",
          "assets/img/productos/enigma-negro-3511.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#a9d12b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/enigma-verde-3500.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#5d6068",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/enigma-gris-3501.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "importados"
  },
  {
    "id": "delta",
    "nombre": "Delta",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#111111",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/delta-negro-3600.jpg"
        ]
      },
      {
        "color": "Negro / Verde",
        "hex": "#1f8f7a",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/delta-negro-verde-3601.jpg"
        ]
      },
      {
        "color": "Negro / Blanco",
        "hex": "#f2f0ec",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/delta-negro-blanco-3610.jpg",
          "assets/img/productos/delta-negro-blanco-3611.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "importados"
  },
  {
    "id": "atlas",
    "nombre": "Atlas",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#111111",
        "tallas": [
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/atlas-negro-3710.jpg",
          "assets/img/productos/atlas-negro-3711.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#4a4d53",
        "tallas": [
          40,
          41,
          42
        ],
        "fotos": [
          "assets/img/productos/atlas-gris-3700.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#4f5a3c",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/productos/atlas-verde-3701.jpg"
        ]
      }
    ],
    "genero": "hombre",
    "categoria": "importados"
  },
  {
    "id": "d-comfy",
    "nombre": "Comfy",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Vainilla",
        "hex": "#efe2c4",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-comfy-vainilla-0.jpg"
        ]
      },
      {
        "color": "Choconut",
        "hex": "#cfc8bd",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-comfy-choconut-0.jpg"
        ]
      },
      {
        "color": "Miel",
        "hex": "#b9793a",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-comfy-miel-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-soso",
    "nombre": "Soso",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Ocre",
        "hex": "#c98b3c",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-soso-ocre-0.jpg"
        ]
      },
      {
        "color": "Mostaza",
        "hex": "#c9982e",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-soso-mostaza-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-anahi",
    "nombre": "Anahi",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Taupe",
        "hex": "#8f7d6c",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-anahi-taupe-0.jpg"
        ]
      },
      {
        "color": "Miel",
        "hex": "#b9793a",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-anahi-miel-0.jpg"
        ]
      },
      {
        "color": "Cafe Abano",
        "hex": "#6b4a33",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-anahi-cafe-abano-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-tokisha",
    "nombre": "Tokisha",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Lila",
        "hex": "#c7b3e6",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-lila-0.jpg"
        ]
      },
      {
        "color": "Toalla",
        "hex": "#f4c6d6",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-toalla-0.jpg"
        ]
      },
      {
        "color": "Negra",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-negra-0.jpg"
        ]
      },
      {
        "color": "Adinerada",
        "hex": "#8fb86a",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-adinerada-0.jpg"
        ]
      },
      {
        "color": "Menta",
        "hex": "#a8dcc8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-menta-0.jpg"
        ]
      },
      {
        "color": "Pollito",
        "hex": "#f4d65c",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-pollito-0.jpg"
        ]
      },
      {
        "color": "Salpicon",
        "hex": "#e59ac4",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-salpicon-0.jpg"
        ]
      },
      {
        "color": "Cremita",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-cremita-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-tokisha-new",
    "nombre": "Tokisha New",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Multicolor",
        "hex": "#e59ac4",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tokisha-new-multicolor-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-wish",
    "nombre": "Wish",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Negra",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-wish-negra-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-wish-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-edna",
    "nombre": "Edna",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Negra",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-edna-negra-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-amara",
    "nombre": "Amara",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Negra",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-amara-negra-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-amara-talco-0.jpg"
        ]
      },
      {
        "color": "Amareto",
        "hex": "#8a5a3b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-amara-amareto-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-anitta",
    "nombre": "Anitta",
    "genero": "mujer",
    "categoria": "sandalias",
    "variantes": [
      {
        "color": "Negra",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-anitta-negra-0.jpg"
        ]
      },
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-anitta-crema-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-candy-moon",
    "nombre": "Candy Moon",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-candy-moon-talco-0.jpg",
          "assets/img/dama/d-candy-moon-talco-1.jpg"
        ]
      },
      {
        "color": "Talco 2",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-candy-moon-talco-2-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-vanity",
    "nombre": "Vanity",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Confitura",
        "hex": "#f0b8c6",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-vanity-confitura-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-vanity-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ivonny",
    "nombre": "Ivonny",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco Azul",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ivonny-talco-azul-0.jpg"
        ]
      },
      {
        "color": "Talco Ocre",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ivonny-talco-ocre-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-tata",
    "nombre": "Tata",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36
        ],
        "fotos": [
          "assets/img/dama/d-tata-talco-0.jpg"
        ]
      },
      {
        "color": "Talco 2",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tata-talco-2-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-andy",
    "nombre": "Andy",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-andy-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-miu",
    "nombre": "Miu",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco Verde",
        "hex": "#f1eee8",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-miu-talco-verde-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-bloom",
    "nombre": "Bloom",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          36,
          37,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-bloom-crema-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-bloom-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-agora",
    "nombre": "Agora",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Arequipe",
        "hex": "#d7b58a",
        "tallas": [
          36,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-agora-arequipe-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-agora-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mqueen-gold",
    "nombre": "Mqueen Gold",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Blanco Negro",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mqueen-gold-blanco-negro-0.jpg"
        ]
      },
      {
        "color": "Durazno",
        "hex": "#f2c2a2",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mqueen-gold-durazno-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-davianka",
    "nombre": "Davianka",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Blanco Negro",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-davianka-blanco-negro-0.jpg",
          "assets/img/dama/d-davianka-blanco-negro-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mayra",
    "nombre": "Mayra",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mayra-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-niko",
    "nombre": "Niko",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-niko-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-dolly",
    "nombre": "Dolly",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Mantequilla",
        "hex": "#f3e3b3",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-dolly-mantequilla-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-gg",
    "nombre": "Gg",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-gg-talco-0.jpg"
        ]
      },
      {
        "color": "Avanced",
        "hex": "#cfc8bd",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-gg-avanced-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-nova",
    "nombre": "Nova",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Cielo",
        "hex": "#a9c7e0",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-cielo-0.jpg"
        ]
      },
      {
        "color": "Avanced",
        "hex": "#cfc8bd",
        "tallas": [
          35,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-nova-avanced-0.jpg"
        ]
      },
      {
        "color": "Crema Blue",
        "hex": "#efe4cf",
        "tallas": [
          34,
          35,
          36,
          38
        ],
        "fotos": [
          "assets/img/dama/d-nova-crema-blue-0.jpg"
        ]
      },
      {
        "color": "Uva",
        "hex": "#6d4a7a",
        "tallas": [
          35,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-nova-uva-0.jpg"
        ]
      },
      {
        "color": "Green",
        "hex": "#6f8f6a",
        "tallas": [
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-green-0.jpg"
        ]
      },
      {
        "color": "Avanced Negro",
        "hex": "#1b1b1b",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-nova-avanced-negro-0.jpg"
        ]
      },
      {
        "color": "Green 2",
        "hex": "#6f8f6a",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-green-2-0.jpg"
        ]
      },
      {
        "color": "Ocre Rosa",
        "hex": "#c98b3c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-ocre-rosa-0.jpg"
        ]
      },
      {
        "color": "Colors",
        "hex": "#e59ac4",
        "tallas": [
          39
        ],
        "fotos": [
          "assets/img/dama/d-nova-colors-0.jpg"
        ]
      },
      {
        "color": "Ocre",
        "hex": "#c98b3c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-ocre-0.jpg"
        ]
      },
      {
        "color": "Café",
        "hex": "#6b4a33",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-cafe-0.jpg"
        ]
      },
      {
        "color": "Talco Verde",
        "hex": "#f1eee8",
        "tallas": [
          35,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-talco-verde-0.jpg"
        ]
      },
      {
        "color": "Cafe",
        "hex": "#6b4a33",
        "tallas": [
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-cafe-0.jpg"
        ]
      },
      {
        "color": "Lima",
        "hex": "#cfc8bd",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-lima-0.jpg"
        ]
      },
      {
        "color": "Confitura",
        "hex": "#f0b8c6",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-confitura-0.jpg"
        ]
      },
      {
        "color": "Navy",
        "hex": "#1f2a44",
        "tallas": [
          36,
          37,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-navy-0.jpg"
        ]
      },
      {
        "color": "Blanco Negro",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-blanco-negro-0.jpg"
        ]
      },
      {
        "color": "Beige Negro",
        "hex": "#dccab0",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-beige-negro-0.jpg"
        ]
      },
      {
        "color": "Forro Red",
        "hex": "#c0242c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-forro-red-0.jpg"
        ]
      },
      {
        "color": "Old Gris",
        "hex": "#9a9ea3",
        "tallas": [
          35,
          36,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-old-gris-0.jpg"
        ]
      },
      {
        "color": "Animal Print",
        "hex": "#b08a5a",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-nova-animal-print-0.jpg"
        ]
      },
      {
        "color": "Blanco Gris",
        "hex": "#f7f7f5",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-blanco-gris-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nova-negro-0.jpg",
          "assets/img/dama/d-nova-negro-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-empire",
    "nombre": "Empire",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-empire-blanco-0.jpg"
        ]
      },
      {
        "color": "Blanco Café",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          37,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-empire-blanco-cafe-0.jpg"
        ]
      },
      {
        "color": "Rosa",
        "hex": "#e8b4bf",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-empire-rosa-0.jpg"
        ]
      },
      {
        "color": "Lila",
        "hex": "#c7b3e6",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-empire-lila-0.jpg"
        ]
      },
      {
        "color": "Gris",
        "hex": "#9a9ea3",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-empire-gris-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-valu",
    "nombre": "Valu",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Blanco Rojo",
        "hex": "#f7f7f5",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-valu-blanco-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mulan",
    "nombre": "Mulan",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          39
        ],
        "fotos": [
          "assets/img/dama/d-mulan-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-vina",
    "nombre": "Vina",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Animal Print",
        "hex": "#b08a5a",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-vina-animal-print-0.jpg",
          "assets/img/dama/d-vina-animal-print-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-seleccion-1",
    "nombre": "Selección 1",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Rojo",
        "hex": "#c0242c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-seleccion-1-rojo-0.jpg"
        ]
      },
      {
        "color": "Amarillo",
        "hex": "#f1c40f",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-seleccion-1-amarillo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-seleccion-2",
    "nombre": "Selección 2",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Rojo",
        "hex": "#c0242c",
        "tallas": [
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-seleccion-2-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-seleccion-3",
    "nombre": "Selección 3",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          38
        ],
        "fotos": [
          "assets/img/dama/d-seleccion-3-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-seleccion-4",
    "nombre": "Selección 4",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-seleccion-4-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-penelope",
    "nombre": "Penelope",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-penelope-talco-0.jpg"
        ]
      },
      {
        "color": "Glitter",
        "hex": "#d9d4e0",
        "tallas": [
          35,
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-penelope-glitter-0.jpg"
        ]
      },
      {
        "color": "Talco 2",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-penelope-talco-2-0.jpg"
        ]
      },
      {
        "color": "Negro Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          39
        ],
        "fotos": [
          "assets/img/dama/d-penelope-negro-blanco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-rihaza",
    "nombre": "Rihaza",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-rihaza-blanco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-emperatriz",
    "nombre": "Emperatriz",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco Arequipe",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-talco-arequipe-0.jpg"
        ]
      },
      {
        "color": "Vino",
        "hex": "#6d1f2d",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-vino-0.jpg"
        ]
      },
      {
        "color": "Talco Cafe",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-talco-cafe-0.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#5f7f5a",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-verde-0.jpg"
        ]
      },
      {
        "color": "Talco Negro",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-talco-negro-0.jpg"
        ]
      },
      {
        "color": "Todo Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-todo-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-emperatriz-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-roma-2-0",
    "nombre": "Roma 2.0",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-roma-2-0-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-maria-luna",
    "nombre": "Maria Luna",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-maria-luna-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-maria-luna-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-alice",
    "nombre": "Alice",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-alice-talco-0.jpg",
          "assets/img/dama/d-alice-talco-1.jpg"
        ]
      },
      {
        "color": "Arena",
        "hex": "#d8c4a3",
        "tallas": [
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-alice-arena-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-alice-negro-0.jpg"
        ]
      },
      {
        "color": "Talco 2",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-alice-talco-2-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-lino",
    "nombre": "Lino",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lino-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lino-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ivana",
    "nombre": "Ivana",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ivana-crema-0.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ivana-blanco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-aroma",
    "nombre": "Aroma",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          39
        ],
        "fotos": [
          "assets/img/dama/d-aroma-blanco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-bernard",
    "nombre": "Bernard",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-bernard-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-bernard-negro-0.jpg"
        ]
      },
      {
        "color": "Negro Cafe",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-bernard-negro-cafe-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-royal",
    "nombre": "Royal",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Mantequilla",
        "hex": "#f3e3b3",
        "tallas": [
          34,
          35,
          36,
          37,
          40
        ],
        "fotos": [
          "assets/img/dama/d-royal-mantequilla-0.jpg"
        ]
      },
      {
        "color": "Cafe 2.0",
        "hex": "#6b4a33",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-royal-cafe-2-0-0.jpg"
        ]
      },
      {
        "color": "Vino",
        "hex": "#6d1f2d",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-royal-vino-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-salome",
    "nombre": "Salome",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Rojo",
        "hex": "#c0242c",
        "tallas": [
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-salome-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-maria-estrella",
    "nombre": "Maria Estrella",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-maria-estrella-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-maria-estrella-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-marce",
    "nombre": "Marce",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-marce-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36
        ],
        "fotos": [
          "assets/img/dama/d-marce-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ingrata",
    "nombre": "Ingrata",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-ingrata-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-nazly",
    "nombre": "Nazly",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nazly-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nazly-negro-0.jpg"
        ]
      },
      {
        "color": "Rojo",
        "hex": "#c0242c",
        "tallas": [
          35,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-nazly-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-gabriela",
    "nombre": "Gabriela",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-gabriela-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-briana",
    "nombre": "Briana",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-briana-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-little-star",
    "nombre": "Little Star",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-little-star-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-little-star-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-cactus",
    "nombre": "Cactus",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-cactus-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ibery",
    "nombre": "Ibery",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ibery-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-lorrein",
    "nombre": "Lorrein",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lorrein-negro-blanco-0.jpg"
        ]
      },
      {
        "color": "Negro Blanco 2",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lorrein-negro-blanco-2-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-quintero",
    "nombre": "Quintero",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Cafe",
        "hex": "#6b4a33",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-cafe-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-talco-0.jpg"
        ]
      },
      {
        "color": "Crema 2.0",
        "hex": "#efe4cf",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-quintero-crema-2-0-0.jpg"
        ]
      },
      {
        "color": "Colors",
        "hex": "#e59ac4",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-colors-0.jpg"
        ]
      },
      {
        "color": "Print",
        "hex": "#b08a5a",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-print-0.jpg"
        ]
      },
      {
        "color": "Cereza",
        "hex": "#7a1f2b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-quintero-cereza-0.jpg"
        ]
      },
      {
        "color": "Suela Negra",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-suela-negra-0.jpg"
        ]
      },
      {
        "color": "Todo Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintero-todo-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-sirley",
    "nombre": "Sirley",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Cereza",
        "hex": "#7a1f2b",
        "tallas": [
          34,
          35,
          36
        ],
        "fotos": [
          "assets/img/dama/d-sirley-cereza-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-yina",
    "nombre": "Yina",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Glitter",
        "hex": "#d9d4e0",
        "tallas": [
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-yina-glitter-0.jpg"
        ]
      },
      {
        "color": "Hub",
        "hex": "#cfc8bd",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-yina-hub-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-wolf",
    "nombre": "Wolf",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Blanco Negro",
        "hex": "#f7f7f5",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-wolf-blanco-negro-0.jpg",
          "assets/img/dama/d-wolf-blanco-negro-1.jpg"
        ]
      },
      {
        "color": "Tommy",
        "hex": "#c0242c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/dama/d-wolf-tommy-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          39,
          40,
          41,
          42,
          43
        ],
        "fotos": [
          "assets/img/dama/d-wolf-negro-0.jpg"
        ]
      },
      {
        "color": "Negro Rojo",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          39,
          42,
          43
        ],
        "fotos": [
          "assets/img/dama/d-wolf-negro-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-miu-miu",
    "nombre": "Miu Miu",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-miu-miu-talco-0.jpg"
        ]
      },
      {
        "color": "Talco 2",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-miu-miu-talco-2-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-sereina",
    "nombre": "Sereina",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-sereina-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-durca",
    "nombre": "Durca",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36
        ],
        "fotos": [
          "assets/img/dama/d-durca-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-hasley",
    "nombre": "Hasley",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Rosa",
        "hex": "#e8b4bf",
        "tallas": [
          34,
          35,
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-hasley-rosa-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-audry",
    "nombre": "Audry",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco Rojo",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          40
        ],
        "fotos": [
          "assets/img/dama/d-audry-talco-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-marsmello",
    "nombre": "Marsmello",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Rojo",
        "hex": "#c0242c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-marsmello-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-hasley-lisboa",
    "nombre": "Hasley Lisboa",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-hasley-lisboa-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-golding",
    "nombre": "Golding",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-golding-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-solano",
    "nombre": "Solano",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Arequipe",
        "hex": "#d7b58a",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-solano-arequipe-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-solano-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-solano-negro-0.jpg"
        ]
      },
      {
        "color": "Snow",
        "hex": "#f7f7f5",
        "tallas": [
          36,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-solano-snow-0.jpg"
        ]
      },
      {
        "color": "Negro Charol",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-solano-negro-charol-0.jpg"
        ]
      },
      {
        "color": "Cereza",
        "hex": "#7a1f2b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-solano-cereza-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-solange",
    "nombre": "Solange",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#2f5da8",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-solange-azul-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-solange-negro-0.jpg"
        ]
      },
      {
        "color": "Blanco Charol",
        "hex": "#f7f7f5",
        "tallas": [
          36,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-solange-blanco-charol-0.jpg"
        ]
      },
      {
        "color": "Amareto",
        "hex": "#8a5a3b",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-solange-amareto-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-sole",
    "nombre": "Sole",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Cafe",
        "hex": "#6b4a33",
        "tallas": [
          35,
          36,
          37,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-sole-cafe-0.jpg",
          "assets/img/dama/d-sole-cafe-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-deili",
    "nombre": "Deili",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-deili-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-elegans",
    "nombre": "Elegans",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco Arequipe",
        "hex": "#f1eee8",
        "tallas": [
          34,
          37,
          39
        ],
        "fotos": [
          "assets/img/dama/d-elegans-talco-arequipe-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-amarte",
    "nombre": "Amarte",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-amarte-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-amarte-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-dubai",
    "nombre": "Dubai",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-dubai-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-dubai-negro-0.jpg"
        ]
      },
      {
        "color": "Todo Negro",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-dubai-todo-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mia",
    "nombre": "Mia",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mia-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-boni",
    "nombre": "Boni",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Miel",
        "hex": "#b9793a",
        "tallas": [
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-boni-miel-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-cosmo-3-0",
    "nombre": "Cosmo 3.0",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-cosmo-3-0-talco-0.jpg",
          "assets/img/dama/d-cosmo-3-0-talco-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-unique",
    "nombre": "Unique",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Miel",
        "hex": "#b9793a",
        "tallas": [
          35,
          36,
          37,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-unique-miel-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-nectar",
    "nombre": "Nectar",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nectar-crema-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-abu-dabi",
    "nombre": "Abu Dabi",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-abu-dabi-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          37,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-abu-dabi-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-divine",
    "nombre": "Divine",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-divine-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-alaia",
    "nombre": "Alaia",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-alaia-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-klim",
    "nombre": "Klim",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          37,
          40
        ],
        "fotos": [
          "assets/img/dama/d-klim-talco-0.jpg",
          "assets/img/dama/d-klim-talco-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-tifanny",
    "nombre": "Tifanny",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          40
        ],
        "fotos": [
          "assets/img/dama/d-tifanny-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ebani",
    "nombre": "Ebani",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ebani-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-igo",
    "nombre": "Igo",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Chocolate",
        "hex": "#4e3426",
        "tallas": [
          35,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-igo-chocolate-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-igo-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-inaki",
    "nombre": "Iñaki",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-inaki-crema-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-inaki-talco-0.jpg"
        ]
      },
      {
        "color": "Arena",
        "hex": "#d8c4a3",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-inaki-arena-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-becky-bost",
    "nombre": "Becky Bost",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-becky-bost-talco-0.jpg",
          "assets/img/dama/d-becky-bost-talco-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-duarte",
    "nombre": "Duarte",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-duarte-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-duarte-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-delphine",
    "nombre": "Delphine",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-delphine-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          38
        ],
        "fotos": [
          "assets/img/dama/d-delphine-negro-0.jpg"
        ]
      },
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          36,
          38
        ],
        "fotos": [
          "assets/img/dama/d-delphine-blanco-0.jpg"
        ]
      },
      {
        "color": "Broches Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-delphine-broches-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-silvia",
    "nombre": "Silvia",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-silvia-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-brito",
    "nombre": "Brito",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco Shampagne",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-brito-talco-shampagne-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-rendon",
    "nombre": "Rendon",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco Shampagne",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-rendon-talco-shampagne-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-manelyk",
    "nombre": "Manelyk",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro Mate",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          40
        ],
        "fotos": [
          "assets/img/dama/d-manelyk-negro-mate-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-arena",
    "nombre": "Arena",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-arena-negro-0.jpg",
          "assets/img/dama/d-arena-negro-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-madison",
    "nombre": "Madison",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Arequipe",
        "hex": "#d7b58a",
        "tallas": [
          35,
          36,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-madison-arequipe-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-madison-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-madison-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-royal-fashionista",
    "nombre": "Royal Fashionista",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          36,
          40
        ],
        "fotos": [
          "assets/img/dama/d-royal-fashionista-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-fashion-trendy",
    "nombre": "Fashion Trendy",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Cafe",
        "hex": "#6b4a33",
        "tallas": [
          35,
          36,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-cafe-0.jpg"
        ]
      },
      {
        "color": "Negro Carnaza",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-negro-carnaza-0.jpg"
        ]
      },
      {
        "color": "Talco Gris",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-talco-gris-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-negro-0.jpg"
        ]
      },
      {
        "color": "Talco Negro",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-talco-negro-0.jpg",
          "assets/img/dama/d-fashion-trendy-talco-negro-1.jpg"
        ]
      },
      {
        "color": "Blanco Rojo",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-blanco-rojo-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-fashion-trendy-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-play-boy",
    "nombre": "Play Boy",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Celeste",
        "hex": "#9cc9e8",
        "tallas": [
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-play-boy-celeste-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-play-boy-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-play-boy-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mindy",
    "nombre": "Mindy",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mindy-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-lyon-fashionista",
    "nombre": "Lyon Fashionista",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lyon-fashionista-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-algodon-broches",
    "nombre": "Algodón broches",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-algodon-broches-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-algodon-broches-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-algodon",
    "nombre": "Algodón",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-algodon-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-oreo",
    "nombre": "Oreo",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-oreo-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-oreo-talco-0.jpg"
        ]
      },
      {
        "color": "Avellana",
        "hex": "#a87c55",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-oreo-avellana-0.jpg",
          "assets/img/dama/d-oreo-avellana-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-missy",
    "nombre": "Missy",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35
        ],
        "fotos": [
          "assets/img/dama/d-missy-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-missy-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-hands",
    "nombre": "Hands",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-hands-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-hands-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-yolimar",
    "nombre": "Yolimar",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-yolimar-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-hasley-quintero",
    "nombre": "Hasley Quintero",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-hasley-quintero-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-aleja",
    "nombre": "Aleja",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-aleja-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-aleja-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mqueen-luna",
    "nombre": "Mqueen Luna",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mqueen-luna-negro-0.jpg"
        ]
      },
      {
        "color": "Blanco Rojo",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mqueen-luna-blanco-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-bambi",
    "nombre": "Bambi",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-bambi-blanco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-nucita",
    "nombre": "Nucita",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Cafe",
        "hex": "#6b4a33",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nucita-cafe-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-coco",
    "nombre": "Coco",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-coco-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-coco-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-brisa",
    "nombre": "Brisa",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Rojo",
        "hex": "#c0242c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-brisa-rojo-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-lyon",
    "nombre": "Lyon",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Arequipe",
        "hex": "#d7b58a",
        "tallas": [
          37,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lyon-arequipe-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-lyon-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-lyon-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-romantic",
    "nombre": "Romantic",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-romantic-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-eliana",
    "nombre": "Eliana",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          40
        ],
        "fotos": [
          "assets/img/dama/d-eliana-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-eliana-2-0",
    "nombre": "Eliana 2.0",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Glitter",
        "hex": "#d9d4e0",
        "tallas": [
          35,
          36,
          38
        ],
        "fotos": [
          "assets/img/dama/d-eliana-2-0-glitter-0.jpg",
          "assets/img/dama/d-eliana-2-0-glitter-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-doris",
    "nombre": "Doris",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Original",
        "hex": "#e8e2d6",
        "tallas": [
          35,
          36,
          37,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-doris-original-0.jpg"
        ]
      },
      {
        "color": "Shampagne",
        "hex": "#e6d3b3",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-doris-shampagne-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-lucia",
    "nombre": "Lucia",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Gris",
        "hex": "#9a9ea3",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-lucia-gris-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-dove",
    "nombre": "Dove",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-dove-crema-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-esmeralda",
    "nombre": "Esmeralda",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Gris Durazno",
        "hex": "#9a9ea3",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-esmeralda-gris-durazno-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-esmeralda-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-glitter",
    "nombre": "Glitter",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-glitter-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-divas",
    "nombre": "Divas",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-divas-crema-0.jpg"
        ]
      },
      {
        "color": "Glitter",
        "hex": "#d9d4e0",
        "tallas": [
          38
        ],
        "fotos": [
          "assets/img/dama/d-divas-glitter-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-divas-negro-0.jpg"
        ]
      },
      {
        "color": "Todo Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          37,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-divas-todo-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-quintin",
    "nombre": "Quintin",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Cafe",
        "hex": "#6b4a33",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintin-cafe-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintin-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintin-negro-0.jpg"
        ]
      },
      {
        "color": "Sintetico",
        "hex": "#3a3a3a",
        "tallas": [
          35,
          37
        ],
        "fotos": [
          "assets/img/dama/d-quintin-sintetico-0.jpg"
        ]
      },
      {
        "color": "Vino",
        "hex": "#6d1f2d",
        "tallas": [
          38
        ],
        "fotos": [
          "assets/img/dama/d-quintin-vino-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mani",
    "nombre": "Mani",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-mani-talco-0.jpg",
          "assets/img/dama/d-mani-talco-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-gate",
    "nombre": "Gate",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Todo Negro",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-gate-todo-negro-0.jpg",
          "assets/img/dama/d-gate-todo-negro-1.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-gate-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-titanic",
    "nombre": "Titanic",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-titanic-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-titanic-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-gala",
    "nombre": "Gala",
    "genero": "mujer",
    "categoria": "retro",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-gala-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-isabella",
    "nombre": "Isabella",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-isabella-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35
        ],
        "fotos": [
          "assets/img/dama/d-isabella-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ganchito",
    "nombre": "Ganchito",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          36
        ],
        "fotos": [
          "assets/img/dama/d-ganchito-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-rosita",
    "nombre": "Rosita",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35
        ],
        "fotos": [
          "assets/img/dama/d-rosita-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-touss",
    "nombre": "Touss",
    "genero": "mujer",
    "categoria": "plataforma",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-touss-negro-0.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-touss-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-olena-italiana",
    "nombre": "Olena Italiana",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-olena-italiana-talco-0.jpg",
          "assets/img/dama/d-olena-italiana-talco-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-roma",
    "nombre": "Roma",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-roma-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-roma-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-indiana",
    "nombre": "Indiana",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Arequipe",
        "hex": "#d7b58a",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-indiana-arequipe-0.jpg"
        ]
      },
      {
        "color": "Durazno",
        "hex": "#f2c2a2",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-indiana-durazno-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-nirvana",
    "nombre": "Nirvana",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Arequipe",
        "hex": "#d7b58a",
        "tallas": [
          35,
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-nirvana-arequipe-0.jpg"
        ]
      },
      {
        "color": "Jean",
        "hex": "#5876a3",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-nirvana-jean-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-sevilla",
    "nombre": "Sevilla",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro Talco",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-sevilla-negro-talco-0.jpg"
        ]
      },
      {
        "color": "Heart Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36
        ],
        "fotos": [
          "assets/img/dama/d-sevilla-heart-crema-0.jpg"
        ]
      },
      {
        "color": "Verde",
        "hex": "#5f7f5a",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-sevilla-verde-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-new-wish-2-0",
    "nombre": "New Wish 2.0",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-new-wish-2-0-talco-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-sandia",
    "nombre": "Sandia",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Cow",
        "hex": "#8a6a4a",
        "tallas": [
          36,
          39
        ],
        "fotos": [
          "assets/img/dama/d-sandia-cow-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-treici",
    "nombre": "Treici",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Ocre Negro",
        "hex": "#c98b3c",
        "tallas": [
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-treici-ocre-negro-0.jpg",
          "assets/img/dama/d-treici-ocre-negro-1.jpg"
        ]
      },
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-treici-talco-0.jpg"
        ]
      },
      {
        "color": "Ocre",
        "hex": "#c98b3c",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-treici-ocre-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-treici-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-eipril",
    "nombre": "Eipril",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco Crema",
        "hex": "#f1eee8",
        "tallas": [
          35,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-eipril-talco-crema-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-eipril-negro-0.jpg",
          "assets/img/dama/d-eipril-negro-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-530",
    "nombre": "530",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Blanco",
        "hex": "#f7f7f5",
        "tallas": [
          34,
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-530-blanco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-530-negro-0.jpg"
        ]
      },
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          34,
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-530-crema-0.jpg"
        ]
      },
      {
        "color": "Negro Blanco",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-530-negro-blanco-0.jpg",
          "assets/img/dama/d-530-negro-blanco-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-rodriguez",
    "nombre": "Rodriguez",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-rodriguez-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-giraldo",
    "nombre": "Giraldo",
    "genero": "mujer",
    "categoria": "deportivos",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-giraldo-talco-0.jpg"
        ]
      },
      {
        "color": "Natas",
        "hex": "#efe8da",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-giraldo-natas-0.jpg"
        ]
      },
      {
        "color": "Print",
        "hex": "#b08a5a",
        "tallas": [
          36,
          40
        ],
        "fotos": [
          "assets/img/dama/d-giraldo-print-0.jpg"
        ]
      },
      {
        "color": "Blanco Negro",
        "hex": "#f7f7f5",
        "tallas": [
          35,
          40
        ],
        "fotos": [
          "assets/img/dama/d-giraldo-blanco-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-honey",
    "nombre": "Honey",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Camel",
        "hex": "#c08a55",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-honey-camel-0.jpg",
          "assets/img/dama/d-honey-camel-1.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-ciaga",
    "nombre": "Ciaga",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Beige",
        "hex": "#dccab0",
        "tallas": [
          35,
          36,
          38,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ciaga-beige-0.jpg"
        ]
      },
      {
        "color": "Plata",
        "hex": "#c9ccd1",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-ciaga-plata-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-spring",
    "nombre": "Spring",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Crema Lila",
        "hex": "#efe4cf",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-spring-crema-lila-0.jpg"
        ]
      },
      {
        "color": "Crema Azul",
        "hex": "#efe4cf",
        "tallas": [
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-spring-crema-azul-0.jpg"
        ]
      },
      {
        "color": "Gris Rosa",
        "hex": "#9a9ea3",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-spring-gris-rosa-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-panqueik",
    "nombre": "Panqueik",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Crema Café",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-panqueik-crema-cafe-0.jpg"
        ]
      },
      {
        "color": "Beige",
        "hex": "#dccab0",
        "tallas": [
          35,
          36
        ],
        "fotos": [
          "assets/img/dama/d-panqueik-beige-0.jpg"
        ]
      },
      {
        "color": "Blanco Gris",
        "hex": "#f7f7f5",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-panqueik-blanco-gris-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-pai-de-durazno",
    "nombre": "Pai De Durazno",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Azul",
        "hex": "#2f5da8",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-pai-de-durazno-azul-0.jpg"
        ]
      },
      {
        "color": "Gris Lila",
        "hex": "#9a9ea3",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-pai-de-durazno-gris-lila-0.jpg"
        ]
      },
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37
        ],
        "fotos": [
          "assets/img/dama/d-pai-de-durazno-crema-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-salazar",
    "nombre": "Salazar",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Talco Negro",
        "hex": "#f1eee8",
        "tallas": [
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-salazar-talco-negro-0.jpg"
        ]
      },
      {
        "color": "Oro Rosa",
        "hex": "#e3b8a2",
        "tallas": [
          37
        ],
        "fotos": [
          "assets/img/dama/d-salazar-oro-rosa-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-quintana",
    "nombre": "Quintana",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Cereza",
        "hex": "#7a1f2b",
        "tallas": [
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintana-cereza-0.jpg"
        ]
      },
      {
        "color": "Ocre Chocolate",
        "hex": "#c98b3c",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-quintana-ocre-chocolate-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-quintanilla",
    "nombre": "Quintanilla",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Miel",
        "hex": "#b9793a",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-quintanilla-miel-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-quintanilla-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-gaviria",
    "nombre": "Gaviria",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Apple",
        "hex": "#dfe8b8",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-gaviria-apple-0.jpg"
        ]
      },
      {
        "color": "Crema Chocolate",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-gaviria-crema-chocolate-0.jpg"
        ]
      },
      {
        "color": "Vainilla",
        "hex": "#efe2c4",
        "tallas": [
          35,
          36,
          39
        ],
        "fotos": [
          "assets/img/dama/d-gaviria-vainilla-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-mariani",
    "nombre": "Mariani",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Crema",
        "hex": "#efe4cf",
        "tallas": [
          35,
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-mariani-crema-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-orozco",
    "nombre": "Orozco",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Néctar",
        "hex": "#f0c9a0",
        "tallas": [
          37,
          39
        ],
        "fotos": [
          "assets/img/dama/d-orozco-nectar-0.jpg"
        ]
      },
      {
        "color": "Leche",
        "hex": "#f3eee4",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-orozco-leche-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          36,
          37,
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-orozco-negro-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-maryury",
    "nombre": "Maryury",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-maryury-talco-0.jpg"
        ]
      },
      {
        "color": "Negro",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          35,
          36,
          37,
          38,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-maryury-negro-0.jpg"
        ]
      },
      {
        "color": "Negro 2",
        "hex": "#1b1b1b",
        "tallas": [
          34,
          36,
          39,
          40
        ],
        "fotos": [
          "assets/img/dama/d-maryury-negro-2-0.jpg"
        ]
      },
      {
        "color": "Talco 2",
        "hex": "#f1eee8",
        "tallas": [
          35,
          36,
          37,
          38
        ],
        "fotos": [
          "assets/img/dama/d-maryury-talco-2-0.jpg"
        ]
      }
    ]
  },
  {
    "id": "d-camila",
    "nombre": "Camila",
    "genero": "mujer",
    "categoria": "importados",
    "variantes": [
      {
        "color": "Talco",
        "hex": "#f1eee8",
        "tallas": [
          38,
          39
        ],
        "fotos": [
          "assets/img/dama/d-camila-talco-0.jpg"
        ]
      }
    ]
  }
];

function cdSlug(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cdRedondeo(n) { return Math.ceil(n / 1000) * 1000; }

/* Devuelve { mayorista, venta, antes } o null si aún no hay precio */
function cdPrecio(product, variante) {
  const key = variante ? product.id + '/' + cdSlug(variante.color) : null;
  const mayorista = (key && PRECIO_MAYORISTA[key] != null) ? PRECIO_MAYORISTA[key] : PRECIO_MAYORISTA[product.id];
  if (mayorista == null) return null;
  const venta = cdRedondeo(mayorista * (1 + CD_MARGEN));
  const antes = Math.round(venta / (1 - CD_REBAJA) / 1000) * 1000;
  return { mayorista, venta, antes };
}

function cdFormato(n) { return '$' + n.toLocaleString('es-CO'); }

function cdTallas(product) {
  const s = new Set();
  product.variantes.forEach(v => v.tallas.forEach(t => s.add(t)));
  return [...s].sort((a, b) => a - b);
}
