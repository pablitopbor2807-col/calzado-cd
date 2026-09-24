/* =====================================================================
   CALZADO C&D — catálogo de productos
   ---------------------------------------------------------------------
   PRECIOS: PRECIO_MAYORISTA = precio por mayor de cada modelo (COP), tomado del
   catálogo "CABALLERO MAYOR" del proveedor.
   La página calcula sola:
     precio de venta  = mayorista + 45%   (redondeado hacia arriba a $1.000)
     precio "antes"   = precio de venta ÷ 0,80  → se muestra tachado con -20%
   Si un color cuesta distinto, usa la clave "modelo/color", ej: "calamar/rojo".
   Mientras un modelo esté en null se muestra "Precio a consultar".
   ===================================================================== */

const CD_MARGEN = 0.45;   // 45% sobre el precio mayorista
const CD_REBAJA = 0.20;   // rebaja simulada del 20%

const PRECIO_MAYORISTA = {
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
  // Colores con precio distinto al del modelo
  'gregory/negro-rojo': 85000,
  'giovanny/azul': 80000,
  'onix/todo-negro': 65000,
  'onix/negro-blanco': 65000,
  'classic-ja/verde': 85000,
  'calamar/petroleo': 75000,
};

const CD_LINEAS = {
  coleccion: 'Colección C&D',
  importados: 'Tennis importado'
};

const CD_PRODUCTS = [
  {
    "id": "ciro",
    "nombre": "Ciro",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "ondred",
    "nombre": "Ondred",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "smood",
    "nombre": "Smood",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "nobel",
    "nombre": "Nobel",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "medichi",
    "nombre": "Medichi",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "mqueen",
    "nombre": "Mqueen",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "mexico",
    "nombre": "México",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "natael",
    "nombre": "Natael",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "cano",
    "nombre": "Cano",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "gregory",
    "nombre": "Gregory",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "toguen",
    "nombre": "Toguen",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "nakin",
    "nombre": "Nakin",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "giovanny",
    "nombre": "Giovanny",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "bautista",
    "nombre": "Bautista",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "panter",
    "nombre": "Panter",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "sneaker",
    "nombre": "Sneaker",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "calamar-2-0",
    "nombre": "Calamar 2.0",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "onix",
    "nombre": "Onix",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "slim",
    "nombre": "Slim",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "wolf",
    "nombre": "Wolf",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "leons",
    "nombre": "Leons",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "530",
    "nombre": "530",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "giraldo",
    "nombre": "Giraldo",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "american",
    "nombre": "American",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "clasic",
    "nombre": "Clasic",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "classic-ja",
    "nombre": "Classic JA",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "fercho",
    "nombre": "Fercho",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "mocasin",
    "nombre": "Mocasín",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "calamar",
    "nombre": "Calamar",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "fermin",
    "nombre": "Fermín",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "anton",
    "nombre": "Antón",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "sport",
    "nombre": "Sport",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "impacto",
    "nombre": "Impacto",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "diego-t",
    "nombre": "Diego T",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "titanrush",
    "nombre": "Titanrush",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "frankil",
    "nombre": "Frankil",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "jumping",
    "nombre": "Jumping",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "m11",
    "nombre": "M11",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "m02",
    "nombre": "M02",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "dreamer",
    "nombre": "Dreamer",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "victor",
    "nombre": "Victor",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "rayos",
    "nombre": "Rayos",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "connor",
    "nombre": "Connor",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "leo",
    "nombre": "Leo",
    "linea": "coleccion",
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
    ]
  },
  {
    "id": "juance",
    "nombre": "Juance",
    "linea": "importados",
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
    ]
  },
  {
    "id": "cristiano",
    "nombre": "Cristiano",
    "linea": "importados",
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
    ]
  },
  {
    "id": "molotov",
    "nombre": "Molotov",
    "linea": "importados",
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
    ]
  },
  {
    "id": "enigma",
    "nombre": "Enigma",
    "linea": "importados",
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
    ]
  },
  {
    "id": "delta",
    "nombre": "Delta",
    "linea": "importados",
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
    ]
  },
  {
    "id": "atlas",
    "nombre": "Atlas",
    "linea": "importados",
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
