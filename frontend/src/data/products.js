 const U = (id) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;
const P = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

export const CATEGORIES = [
  "Billetera de hombre",
  "Billetera de mujer",
  "Neceser",
  "Llaveros y accesorios",
  "Mochilas",
  "Riñoneras",
  "Bandoleras",
  "Portacelulares",
  "Bolsos",
  "Cartucheras",
  "Morrales",
  "Infantil",
];

const HEX = {
  Negro: "#211e1c",
  Suela: "#a3693c",
  Crema: "#e9dfd2",
  Rosa: "#e8c4c9",
  Gris: "#9b9b9b",
  Oliva: "#6b6f4e",
  Azul: "#3d4a5d",
};

const IMG = {
  wallet1: U("photo-1628483211662-9bcc692c46dc"),
  wallet2: U("photo-1579014134953-1580d7f123f3"),
  traba: U("photo-1614179689702-355944cd0918"),
  walletW1: U("photo-1627123424574-724758594e93"),
  walletW2: U("photo-1575428652377-a2d80e2277fc"),
  neceser1: P(2905238),
  neceser2: U("photo-1606522754091-a3bbf9ad4cb3"),
  llavero: U("photo-1676276550349-580c49631496"),
  mochila1: U("photo-1622560480605-d83c853bc5c3"),
  mochila2: U("photo-1680039211156-66c721b87625"),
  rinonera1: U("photo-1590874103328-eac38a683ce7"),
  rinonera2: U("photo-1547949003-9792a18a2601"),
  bandolera1: U("photo-1594633312681-425c7b97ccd1"),
  bandolera2: U("photo-1548036328-c9fa89d128fa"),
  porta1: U("photo-1524498250077-390f9e378fc0"),
  porta2: U("photo-1622560480654-d96214fdc887"),
  bolso1: U("photo-1691480150204-66dd1eb77391"),
  bolso2: U("photo-1584917865442-de89df76afd3"),
  cartuchera1: P(1152077),
  cartuchera2: P(5699008),
  morral1: U("photo-1566150905458-1bf1fc113f0d"),
  morral2: U("photo-1591561954557-26941169b49e"),
  infantil1: U("photo-1553062407-98eeb64c6a62"),
  infantil2: U("photo-1587467512961-120760940315"),
};

const colors = (a, b, imgsA, imgsB) => [
  { name: a, hex: HEX[a], images: imgsA },
  { name: b, hex: HEX[b], images: imgsB },
];

// Productos, precios, descripciones y colores de MUESTRA — reemplazar por el catálogo real.
export const PRODUCTS = [
  {
    id: "billetera-maxi-trendy",
    name: "Maxi Billetera Trendy",
    category: "Billetera de mujer",
    price: 20000,
    image: "/products/billetera-maxi-trendy-roja-1.png",
    colors: [
      {
        name: "Roja",
        hex: "#e2143a",
        images: [
          "/products/billetera-maxi-trendy-roja-1.png",
          "/products/billetera-maxi-trendy-roja-2.png",
          "/products/billetera-maxi-trendy-roja-3.png",
        ],
      },
    ],
  },
  {
    id: "billetera-doble-trendy",
    name: "Billetera Doble Trendy",
    category: "Billetera de mujer",
    price: 20000,
    image: "/products/billetera-doble-trendy-marron-1.png",
    colors: [
      {
        name: "Marrón",
        hex: HEX.Suela,
        images: [
          "/products/billetera-doble-trendy-marron-1.png",
          "/products/billetera-doble-trendy-marron-2.png",
        ],
      },
    ],
  },
  {
    id: "billetera-cierre-doble-trendy",
    name: "Billetera Cierre Doble Trendy",
    category: "Billetera de mujer",
    price: 20000,
    image: "/products/billetera-cierre-doble-trendy-negra-1.png",
    colors: [
      {
        name: "Negra",
        hex: HEX.Negro,
        images: [
          "/products/billetera-cierre-doble-trendy-negra-1.png",
          "/products/billetera-cierre-doble-trendy-negra-2.png",
        ],
      },
    ],
  },
  {
    id: "billetera-simple-ona-saenz",
    name: "Billetera Simple Ona Saenz",
    category: "Billetera de mujer",
    price: 20000,
    image: "/products/billetera-simple-ona-saenz-negra-1.png",
    colors: [
      {
        name: "Negra",
        hex: HEX.Negro,
        images: [
          "/products/billetera-simple-ona-saenz-negra-1.png",
          "/products/billetera-simple-ona-saenz-negra-2.png",
        ],
      },
    ],
  },
  {
    id: "billetera-chica-oreiro",
    name: "Billetera Chica Oreiro",
    category: "Billetera de mujer",
    price: 24000,
    image: "/products/billetera-chica-oreiro-marron-1.png",
    colors: [
      {
        name: "Marrón",
        hex: HEX.Suela,
        images: [
          "/products/billetera-chica-oreiro-marron-1.png",
          "/products/billetera-chica-oreiro-marron-2.png",
        ],
      },
    ],
  },
  {
    id: "neceser-pu-amayra",
    name: "Neceser PU Amayra",
    category: "Neceser",
    price: 12000,
    image: "/products/neceser-pu-amayra-1.jpg",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/neceser-pu-amayra-1.jpg",
          "/products/neceser-pu-amayra-2.jpg",
        ],
      },
    ],
  },
  {
    id: "neceser-animal-print",
    name: "Neceser Animal Print",
    category: "Neceser",
    price: 12000,
    image: "/products/neceser-animal-print-rosa.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/neceser-animal-print-rosa.png"],
      },
      {
        name: "Verde",
        hex: "#a8b89a",
        images: ["/products/neceser-animal-print-verde.png"],
      },
      {
        name: "Crema",
        hex: HEX.Crema,
        images: ["/products/neceser-animal-print-crema.png"],
      },
      {
        name: "Negro",
        hex: HEX.Negro,
        images: ["/products/neceser-animal-print-negro.png"],
      },
    ],
  },
  {
    id: "neceser-pratys",
    name: "Neceser Pratys",
    category: "Neceser",
    price: 12000,
    image: "/products/neceser-pratys-rosa.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/neceser-pratys-rosa.png"],
      },
      {
        name: "Rojo",
        hex: "#c81d3f",
        images: ["/products/neceser-pratys-rojo.png"],
      },
      {
        name: "Verde",
        hex: "#a8b89a",
        images: ["/products/neceser-pratys-verde.png"],
      },
      {
        name: "Negro",
        hex: HEX.Negro,
        images: ["/products/neceser-pratys-negro.png"],
      },
      {
        name: "Crema",
        hex: HEX.Crema,
        images: ["/products/neceser-pratys-crema.png"],
      },
    ],
  },
  {
    id: "neceser-oreiro",
    name: "Neceser Oreiro",
    category: "Neceser",
    price: 19000,
    image: "/products/neceser-oreiro-negro-1.png",
    description: "Fabricado en PU.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/neceser-oreiro-negro-1.png",
          "/products/neceser-oreiro-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "neceser-triple-amayra",
    name: "Neceser Triple Amayra",
    category: "Neceser",
    price: 18000,
    image: "/products/neceser-triple-amayra-negro-1.png",
    description: "Set de 3 neceseres, ideal para viaje.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/neceser-triple-amayra-negro-1.png",
          "/products/neceser-triple-amayra-negro-2.png",
        ],
      },
      {
        name: "Verde agua",
        hex: "#c3d6cf",
        images: ["/products/neceser-triple-amayra-verde-agua.png"],
      },
    ],
  },
  {
    id: "neceser-triple-trendy",
    name: "Neceser Triple Trendy",
    category: "Neceser",
    price: 26400,
    image: "/products/neceser-triple-trendy.jpg",
    description: "Set de 3 neceseres, ideal para viaje.",
  },
  {
    id: "rinonera-maxi",
    name: "Riño Maxi",
    category: "Riñoneras",
    price: 17000,
    image: "/products/rinonera-maxi-negro-1.png",
    description:
      "Fabricada en cordura, cuenta con 2 compartimentos. Mide 18x33.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/rinonera-maxi-negro-1.png",
          "/products/rinonera-maxi-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "rinonera-oreiro",
    name: "Riño Oreiro",
    category: "Riñoneras",
    price: 43000,
    image: "/products/rinonera-oreiro-suela.png",
    description: "Fabricada en PU.",
    colors: [
      {
        name: "Suela",
        hex: HEX.Suela,
        images: ["/products/rinonera-oreiro-suela.png"],
      },
    ],
  },
  {
    id: "rinonera-trendy-flecha",
    name: "Riño Trendy Flecha",
    category: "Riñoneras",
    price: 35000,
    image: "/products/rinonera-trendy-flecha-crema.png",
    description: "Fabricada en PU liso.",
    colors: [
      {
        name: "Crema",
        hex: HEX.Crema,
        images: ["/products/rinonera-trendy-flecha-crema.png"],
      },
    ],
  },
  {
    id: "rinonera-engomada",
    name: "Riño Engomada",
    category: "Riñoneras",
    price: 14000,
    image: "/products/rinonera-engomada-negro.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: ["/products/rinonera-engomada-negro.png"],
      },
    ],
  },
  {
    id: "rinonera-cordon",
    name: "Riño Cordón",
    category: "Riñoneras",
    price: 14000,
    image: "/products/rinonera-cordon-negro.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: ["/products/rinonera-cordon-negro.png"],
      },
    ],
  },
  {
    id: "rinonera-engomada-rayas",
    name: "Riño Engomada Rayas",
    category: "Riñoneras",
    price: 14000,
    image: "/products/rinonera-engomada-rayas-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/rinonera-engomada-rayas-negro-1.png",
          "/products/rinonera-engomada-rayas-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "morral-cruzado-amy",
    name: "Morral Cruzado Amy",
    category: "Morrales",
    price: 20000,
    image: "/products/morral-cruzado-amy-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/morral-cruzado-amy-negro-1.png",
          "/products/morral-cruzado-amy-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "morral-cruzado",
    name: "Morral Cruzado",
    category: "Morrales",
    price: 20000,
    image: "/products/morral-cruzado-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/morral-cruzado-negro-1.png",
          "/products/morral-cruzado-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "morral-independiente",
    name: "Morral Independiente",
    category: "Morrales",
    price: 38000,
    image: "/products/morral-independiente-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/morral-independiente-1.png",
          "/products/morral-independiente-2.png",
        ],
      },
    ],
  },
  {
    id: "morral-boca-juniors",
    name: "Morral Boca Juniors",
    category: "Morrales",
    price: 38000,
    image: "/products/morral-boca-juniors-1.png",
    colors: [
      {
        name: "Azul y amarillo",
        hex: "#1f4aa8",
        images: [
          "/products/morral-boca-juniors-1.png",
          "/products/morral-boca-juniors-2.png",
        ],
      },
    ],
  },
  {
    id: "morral-racing-club",
    name: "Morral Racing Club",
    category: "Morrales",
    price: 38000,
    image: "/products/morral-racing-club-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/morral-racing-club-1.png",
          "/products/morral-racing-club-2.png",
        ],
      },
    ],
  },
  {
    id: "morral-river-plate",
    name: "Morral River Plate",
    category: "Morrales",
    price: 38000,
    image: "/products/morral-river-plate-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/morral-river-plate-1.png",
          "/products/morral-river-plate-2.png",
        ],
      },
    ],
  },
  {
    id: "portacelular-bcy",
    name: "Portacelular BCY",
    category: "Portacelulares",
    price: 27000,
    image: "/products/portacelular-bcy-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/portacelular-bcy-negro-1.png",
          "/products/portacelular-bcy-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "portacelular-oreiro",
    name: "Portacelular Oreiro",
    category: "Portacelulares",
    price: 32000,
    image: "/products/portacelular-oreiro-rojo-1.png",
    colors: [
      {
        name: "Rojo",
        hex: "#e2143a",
        images: [
          "/products/portacelular-oreiro-rojo-1.png",
          "/products/portacelular-oreiro-rojo-2.png",
        ],
      },
    ],
  },
  {
    id: "mochila-urbana-hombre",
    name: "Mochila Urbana Hombre",
    category: "Mochilas",
    price: 46000,
    image: "/products/mochila-urbana-hombre-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/mochila-urbana-hombre-negro-1.png",
          "/products/mochila-urbana-hombre-negro-2.png",
          "/products/mochila-urbana-hombre-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "mochila-pu-trendy",
    name: "Mochila PU Trendy",
    category: "Mochilas",
    price: 58000,
    image: "/products/mochila-pu-trendy-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/mochila-pu-trendy-negro-1.png",
          "/products/mochila-pu-trendy-negro-2.png",
          "/products/mochila-pu-trendy-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "mochila-bolso",
    name: "Mochila Bolso",
    category: "Mochilas",
    price: 44000,
    image: "/products/mochila-bolso-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/mochila-bolso-negro-1.png",
          "/products/mochila-bolso-negro-2.png",
          "/products/mochila-bolso-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "mochila-urbana-travel-tech",
    name: "Mochila Urbana Travel Tech",
    category: "Mochilas",
    price: 49000,
    image: "/products/mochila-urbana-travel-tech-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/mochila-urbana-travel-tech-negro-1.png",
          "/products/mochila-urbana-travel-tech-negro-2.png",
          "/products/mochila-urbana-travel-tech-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "mochila-deportiva-trendy",
    name: "Mochila Deportiva Trendy",
    category: "Mochilas",
    price: 44000,
    image: "/products/mochila-deportiva-trendy-azul-1.png",
    colors: [
      {
        name: "Azul",
        hex: HEX.Azul,
        images: [
          "/products/mochila-deportiva-trendy-azul-1.png",
          "/products/mochila-deportiva-trendy-azul-2.png",
        ],
      },
    ],
  },
  {
    id: "mochila-everlast",
    name: "Mochila Everlast",
    category: "Mochilas",
    price: 50000,
    image: "/products/mochila-everlast-gris-1.png",
    description: "Fabricada en PU.",
    colors: [
      {
        name: "Gris",
        hex: HEX.Gris,
        images: [
          "/products/mochila-everlast-gris-1.png",
          "/products/mochila-everlast-gris-2.png",
          "/products/mochila-everlast-gris-3.png",
        ],
      },
    ],
  },
  {
    id: "mochila-a",
    name: "Mochila A.",
    category: "Mochilas",
    price: 42000,
    image: "/products/mochila-a-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/mochila-a-negro-1.png",
          "/products/mochila-a-negro-2.png",
          "/products/mochila-a-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "portacelular-oreiro-tachas",
    name: "Portacelular Oreiro Tachas",
    category: "Portacelulares",
    price: 38000,
    image: "/products/portacelular-oreiro-tachas-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/portacelular-oreiro-tachas-negro-1.png",
          "/products/portacelular-oreiro-tachas-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "portacelular-pu",
    name: "Portacelular PU",
    category: "Portacelulares",
    price: 38000,
    image: "/products/portacelular-pu-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/portacelular-pu-negro-1.png",
          "/products/portacelular-pu-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "bandolera-bcy",
    name: "Bandolera BCY",
    category: "Bandoleras",
    price: 19000,
    image: "/products/bandolera-bcy-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/bandolera-bcy-negro-1.png",
          "/products/bandolera-bcy-negro-2.png",
          "/products/bandolera-bcy-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "bandolera-triple",
    name: "Bandolera Triple",
    category: "Bandoleras",
    price: 34000,
    image: "/products/bandolera-triple-3.jpg",
    description: "Mide 15x19, fabricada en PU.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/bandolera-triple-3.jpg",
          "/products/bandolera-triple-1.jpg",
          "/products/bandolera-triple-2.jpg",
        ],
      },
    ],
  },
  {
    id: "bolso-deportivo",
    name: "Bolso Deportivo",
    category: "Bolsos",
    price: 35000,
    image: "/products/bolso-deportivo-1.jpg",
    description:
      "Mide 27x50, fabricado en tela engomada, cuenta con compartimento para zapatillas.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/bolso-deportivo-1.jpg",
          "/products/bolso-deportivo-2.jpg",
        ],
      },
    ],
  },
  {
    id: "bolso-de-viaje",
    name: "Bolso de Viaje",
    category: "Bolsos",
    price: 35000,
    image: "/products/bolso-viaje-1.jpg",
    description: "Mide 26x38.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/bolso-viaje-1.jpg",
          "/products/bolso-viaje-2.jpg",
          "/products/bolso-viaje-3.jpg",
          "/products/bolso-viaje-4.jpg",
        ],
      },
    ],
  },
  {
    id: "cartuchera-river-plate",
    name: "Cartuchera River Plate",
    category: "Cartucheras",
    price: 20000,
    image: "/products/cartuchera-river-plate-1.png",
    colors: [
      {
        name: "Negro y Rojo",
        hex: HEX.Negro,
        images: [
          "/products/cartuchera-river-plate-1.png",
          "/products/cartuchera-river-plate-2.png",
          "/products/cartuchera-river-plate-3.png",
        ],
      },
    ],
  },
  {
    id: "cartuchera-independiente",
    name: "Cartuchera Independiente",
    category: "Cartucheras",
    price: 20000,
    image: "/products/cartuchera-independiente.png",
    colors: [
      {
        name: "Rojo",
        hex: "#c81d3f",
        images: ["/products/cartuchera-independiente.png"],
      },
    ],
  },
  {
    id: "cartuchera-boca-juniors",
    name: "Cartuchera Boca Juniors",
    category: "Cartucheras",
    price: 20000,
    image: "/products/cartuchera-boca-juniors.png",
    colors: [
      {
        name: "Azul y Amarillo",
        hex: HEX.Azul,
        images: ["/products/cartuchera-boca-juniors.png"],
      },
    ],
  },
  {
    id: "cartuchera-racing-club",
    name: "Cartuchera Racing Club",
    category: "Cartucheras",
    price: 20000,
    image: "/products/cartuchera-racing-1.png",
    colors: [
      {
        name: "Azul y Celeste",
        hex: HEX.Azul,
        images: [
          "/products/cartuchera-racing-1.png",
          "/products/cartuchera-racing-2.png",
        ],
      },
    ],
  },
  {
    id: "cartuchera-rigida-autos",
    name: "Cartuchera Rígida",
    category: "Infantil",
    price: 14000,
    image: "/products/cartuchera-rigida-autos-1.png",
    colors: [
      {
        name: "Rojo y Azul",
        hex: "#c81d3f",
        images: ["/products/cartuchera-rigida-autos-1.png"],
      },
    ],
  },
  {
    id: "cartuchera-spiderman-triple",
    name: "Cartuchera Spider-Man Triple",
    category: "Infantil",
    price: 26000,
    image: "/products/cartuchera-spiderman-triple-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/cartuchera-spiderman-triple-1.png",
          "/products/cartuchera-spiderman-triple-2.png",
        ],
      },
    ],
  },
  {
    id: "cartuchera-spiderman",
    name: "Cartuchera Spider-Man",
    category: "Infantil",
    price: 29000,
    image: "/products/cartuchera-spiderman-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/cartuchera-spiderman-1.png",
          "/products/cartuchera-spiderman-2.png",
        ],
      },
    ],
  },
  {
    id: "mochi-labubu",
    name: "Mochi Labubu",
    category: "Infantil",
    price: 33000,
    image: "/products/mochi-labubu-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/mochi-labubu-1.png"],
      },
    ],
  },
  {
    id: "mochi-play",
    name: "Mochi Play",
    category: "Infantil",
    price: 33000,
    image: "/products/mochi-play-1.png",
    colors: [
      {
        name: "Azul",
        hex: HEX.Azul,
        images: ["/products/mochi-play-1.png"],
      },
    ],
  },
  {
    id: "mochi-rainbow",
    name: "Mochi Rainbow",
    category: "Infantil",
    price: 33000,
    image: "/products/mochi-rainbow-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/mochi-rainbow-1.png"],
      },
    ],
  },
  {
    id: "mochi-galaxia",
    name: "Mochi Galaxia",
    category: "Infantil",
    price: 33000,
    image: "/products/mochi-galaxia-1.png",
    colors: [
      {
        name: "Azul",
        hex: HEX.Azul,
        images: ["/products/mochi-galaxia-1.png"],
      },
    ],
  },
  {
    id: "mochi-gameover",
    name: "Mochi Game Over",
    category: "Infantil",
    price: 26000,
    image: "/products/mochi-gameover-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: ["/products/mochi-gameover-1.png"],
      },
    ],
  },
  {
    id: "mochi-helado",
    name: "Mochi Helado",
    category: "Infantil",
    price: 26000,
    image: "/products/mochi-helado-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/mochi-helado-1.png"],
      },
    ],
  },
  {
    id: "mochi-gatito",
    name: "Mochi Gatito",
    category: "Infantil",
    price: 30000,
    image: "/products/mochi-gatito-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/mochi-gatito-1.png"],
      },
    ],
  },
  {
    id: "cartuchera-triple",
    name: "Cartuchera Triple",
    category: "Infantil",
    price: 24000,
    image: "/products/cartuchera-triple-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: [
          "/products/cartuchera-triple-1.png",
          "/products/cartuchera-triple-2.png",
          "/products/cartuchera-triple-3.png",
        ],
      },
    ],
  },
  {
    id: "cartuchera-bandolera-chimola",
    name: "Cartuchera Bandolera Chimola",
    category: "Infantil",
    price: 37000,
    image: "/products/cartuchera-bandolera-chimola-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: [
          "/products/cartuchera-bandolera-chimola-1.png",
          "/products/cartuchera-bandolera-chimola-2.png",
          "/products/cartuchera-bandolera-chimola-3.png",
          "/products/cartuchera-bandolera-chimola-4.png",
        ],
      },
    ],
  },
  {
    id: "cartuchera-pony-rigida",
    name: "Cartuchera Pony Rígida",
    category: "Infantil",
    price: 22000,
    image: "/products/cartuchera-pony-rigida-1.png",
    colors: [
      {
        name: "Verde",
        hex: "#5fc9b8",
        images: [
          "/products/cartuchera-pony-rigida-1.png",
          "/products/cartuchera-pony-rigida-2.png",
        ],
      },
    ],
  },
  {
    id: "lunchera-trendy",
    name: "Lunchera Trendy",
    category: "Infantil",
    price: 32000,
    image: "/products/lunchera-trendy-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: [
          "/products/lunchera-trendy-1.png",
          "/products/lunchera-trendy-2.png",
        ],
      },
    ],
  },
  {
    id: "mochila-jardin-minnie",
    name: "Mochila Jardín Minnie",
    category: "Infantil",
    price: 38000,
    image: "/products/mochila-jardin-minnie-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: ["/products/mochila-jardin-minnie-1.png"],
      },
    ],
  },
  {
    id: "mochila-boca-juniors",
    name: "Mochila Boca Juniors",
    category: "Infantil",
    price: 44000,
    image: "/products/mochila-boca-juniors-1.png",
    colors: [
      {
        name: "Azul y Amarillo",
        hex: HEX.Azul,
        images: [
          "/products/mochila-boca-juniors-1.png",
          "/products/mochila-boca-juniors-2.png",
          "/products/mochila-boca-juniors-3.png",
        ],
      },
    ],
  },
  {
    id: "mochila-racing-club",
    name: "Mochila Racing Club",
    category: "Infantil",
    price: 44000,
    image: "/products/mochila-racing-club-1.png",
    colors: [
      {
        name: "Azul y Celeste",
        hex: HEX.Azul,
        images: [
          "/products/mochila-racing-club-1.png",
          "/products/mochila-racing-club-2.png",
          "/products/mochila-racing-club-3.png",
        ],
      },
    ],
  },
  {
    id: "billetera-chica-trendy-celeste",
    name: "Billetera Chica Trendy",
    category: "Billetera de mujer",
    price: 12000,
    image: "/products/billetera-chica-trendy-celeste-1.png",
    colors: [
      {
        name: "Celeste",
        hex: "#7fd1cf",
        images: ["/products/billetera-chica-trendy-celeste-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-trendy-cuadros",
    name: "Billetera Chica Trendy Cuadros",
    category: "Billetera de mujer",
    price: 12000,
    image: "/products/billetera-chica-trendy-cuadros-verde-1.png",
    colors: [
      {
        name: "Verde Oscuro",
        hex: HEX.Oliva,
        images: ["/products/billetera-chica-trendy-cuadros-verde-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-leblu",
    name: "Billetera Chica Leblu",
    category: "Billetera de mujer",
    price: 12000,
    image: "/products/billetera-chica-leblu-marron-1.png",
    colors: [
      {
        name: "Marrón",
        hex: HEX.Suela,
        images: ["/products/billetera-chica-leblu-marron-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-trendy-parche",
    name: "Billetera Chica Trendy Parche",
    category: "Billetera de mujer",
    price: 12000,
    image: "/products/billetera-chica-trendy-parche-suela-1.png",
    colors: [
      {
        name: "Suela",
        hex: HEX.Suela,
        images: ["/products/billetera-chica-trendy-parche-suela-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-trendy-love",
    name: "Billetera Chica Trendy Love",
    category: "Billetera de mujer",
    price: 12000,
    image: "/products/billetera-chica-trendy-love-suela-1.png",
    colors: [
      {
        name: "Suela",
        hex: HEX.Suela,
        images: ["/products/billetera-chica-trendy-love-suela-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-trendy-canelon",
    name: "Billetera Chica Trendy Canelón",
    category: "Billetera de mujer",
    price: 12000,
    image: "/products/billetera-chica-trendy-canelon-negra-1.png",
    colors: [
      {
        name: "Negra",
        hex: HEX.Negro,
        images: ["/products/billetera-chica-trendy-canelon-negra-1.png"],
      },
      {
        name: "Suela",
        hex: HEX.Suela,
        images: ["/products/billetera-chica-trendy-canelon-suela-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-amayra",
    name: "Billetera Chica Amayra",
    category: "Billetera de mujer",
    price: 14000,
    image: "/products/billetera-chica-amayra-marron-1.png",
    colors: [
      {
        name: "Marrón",
        hex: HEX.Suela,
        images: ["/products/billetera-chica-amayra-marron-1.png"],
      },
      {
        name: "Negra",
        hex: HEX.Negro,
        images: ["/products/billetera-chica-amayra-negra-1.png"],
      },
    ],
  },
  {
    id: "billetera-cuadrada-amayra",
    name: "Billetera Cuadrada Amayra",
    category: "Billetera de mujer",
    price: 14000,
    image: "/products/billetera-cuadrada-amayra-negra-1.png",
    colors: [
      {
        name: "Negra",
        hex: HEX.Negro,
        images: ["/products/billetera-cuadrada-amayra-negra-1.png"],
      },
      {
        name: "Marrón",
        hex: HEX.Suela,
        images: ["/products/billetera-cuadrada-amayra-marron-1.png"],
      },
    ],
  },
  {
    id: "billetera-boton-amayra",
    name: "Billetera Botón Amayra",
    category: "Billetera de mujer",
    price: 17000,
    image: "/products/billetera-boton-amayra-gris-1.png",
    colors: [
      {
        name: "Gris Oscuro",
        hex: HEX.Gris,
        images: ["/products/billetera-boton-amayra-gris-1.png"],
      },
    ],
  },
  {
    id: "billetera-chica-mango",
    name: "Billetera Chica Mango",
    category: "Billetera de mujer",
    price: 16000,
    image: "/products/billetera-chica-mango-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/billetera-chica-mango-negro-1.png",
          "/products/billetera-chica-mango-negro-2.png",
        ],
      },
    ],
  },
  {
    id: "tarjetero",
    name: "Tarjetero",
    category: "Billetera de mujer",
    price: 1200,
    image: "/products/tarjetero-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: ["/products/tarjetero-negro-1.png"],
      },
    ],
  },
  {
    id: "billetera-simple-punteada",
    name: "Billetera Simple Punteada",
    category: "Billetera de mujer",
    price: 17000,
    image: "/products/billetera-simple-punteada-suela-1.png",
    colors: [
      {
        name: "Suela",
        hex: HEX.Suela,
        images: ["/products/billetera-simple-punteada-suela-1.png"],
      },
    ],
  },
  {
    id: "billetera-simple-cuadrada",
    name: "Billetera Simple Cuadrada",
    category: "Billetera de mujer",
    price: 17000,
    image: "/products/billetera-simple-cuadrada-marron-1.png",
    colors: [
      {
        name: "Marrón",
        hex: HEX.Suela,
        images: ["/products/billetera-simple-cuadrada-marron-1.png"],
      },
    ],
  },
  {
    id: "billetera-simple-bolsillo",
    name: "Billetera Simple Bolsillo",
    category: "Billetera de mujer",
    price: 17000,
    image: "/products/billetera-simple-bolsillo-negra-1.png",
    colors: [
      {
        name: "Negra",
        hex: HEX.Negro,
        images: ["/products/billetera-simple-bolsillo-negra-1.png"],
      },
    ],
  },
  {
    id: "billetera-simple-gama",
    name: "Billetera Simple Gama",
    category: "Billetera de mujer",
    price: 17000,
    image: "/products/billetera-simple-gama-negra-1.png",
    colors: [
      {
        name: "Negra",
        hex: HEX.Negro,
        images: ["/products/billetera-simple-gama-negra-1.png"],
      },
    ],
  },
  {
    id: "billetera-simple-bcy",
    name: "Billetera Simple BCY",
    category: "Billetera de mujer",
    price: 17000,
    image: "/products/billetera-simple-bcy-rosa-1.png",
    colors: [
      {
        name: "Rosa",
        hex: HEX.Rosa,
        images: [
          "/products/billetera-simple-bcy-rosa-1.png",
          "/products/billetera-simple-bcy-rosa-2.png",
        ],
      },
      {
        name: "Crema",
        hex: HEX.Crema,
        images: ["/products/billetera-simple-bcy-crema-1.png"],
      },
      {
        name: "Negra",
        hex: HEX.Negro,
        images: ["/products/billetera-simple-bcy-negra-1.png"],
      },
    ],
  },
  {
    id: "bolso-yoga",
    name: "Bolso Yoga",
    category: "Bolsos",
    price: 30000,
    image: "/products/bolso-yoga-negro-1.png",
    description: "Viene con compartimento para zapatillas.",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/bolso-yoga-negro-1.png",
          "/products/bolso-yoga-negro-2.png",
          "/products/bolso-yoga-negro-3.png",
        ],
      },
    ],
  },
  {
    id: "bolso-totem",
    name: "Bolso Totem",
    category: "Bolsos",
    price: 27000,
    image: "/products/bolso-totem-negro-1.png",
    colors: [
      {
        name: "Negro",
        hex: HEX.Negro,
        images: [
          "/products/bolso-totem-negro-1.png",
          "/products/bolso-totem-negro-2.png",
          "/products/bolso-totem-negro-3.png",
        ],
      },
    ],
  },
];
