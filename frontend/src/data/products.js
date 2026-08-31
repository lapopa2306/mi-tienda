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
    id: "billetera-clasica-negra",
    name: "Billetera Clásica",
    category: "Billetera de hombre",
    price: 24000,
    image: IMG.wallet1,
    tag: "Best seller",
    description:
      "La billetera de todos los días: compacta, con espacio para tarjetas, billetes y DNI. Costuras reforzadas y cierre seguro.",
    colors: colors(
      "Negro",
      "Suela",
      [IMG.wallet1, IMG.wallet2],
      [IMG.wallet2, IMG.traba]
    ),
  },
  {
    id: "billetera-slim-suela",
    name: "Billetera Slim",
    category: "Billetera de hombre",
    price: 21000,
    image: IMG.wallet2,
    description:
      "Finita y liviana, ideal para el bolsillo delantero. Entran hasta 6 tarjetas y billetes doblados.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.wallet2, IMG.traba],
      [IMG.wallet1, IMG.wallet2]
    ),
  },
  {
    id: "billetera-grande-rosa",
    name: "Billetera Grande",
    category: "Billetera de mujer",
    price: 28000,
    image: IMG.walletW1,
    tag: "Nuevo",
    description:
      "Amplia y organizada: monedero con cierre, divisiones para tarjetas y espacio para el celular chico.",
    colors: colors(
      "Rosa",
      "Crema",
      [IMG.walletW1, IMG.walletW2],
      [IMG.walletW2, IMG.walletW1]
    ),
  },
  {
    id: "billetera-monedero-nude",
    name: "Billetera Monedero",
    category: "Billetera de mujer",
    price: 26000,
    image: IMG.walletW2,
    description:
      "Dos en uno: billetera y monedero con cierre metálico. Tamaño ideal para carteras chicas.",
    colors: colors(
      "Crema",
      "Rosa",
      [IMG.walletW2, IMG.walletW1],
      [IMG.walletW1, IMG.walletW2]
    ),
  },
  {
    id: "neceser-de-viaje",
    name: "Neceser de Viaje",
    category: "Neceser",
    price: 22000,
    image: IMG.neceser1,
    description:
      "Espacioso y con interior impermeable. Perfecto para llevar todo lo tuyo en viajes y escapadas.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.neceser1, IMG.neceser2],
      [IMG.neceser2, IMG.neceser1]
    ),
  },
  {
    id: "neceser-chico",
    name: "Neceser Chico",
    category: "Neceser",
    price: 16000,
    image: IMG.neceser2,
    description:
      "El tamaño justo para la cartera o la mochila. Cierre doble y forro fácil de limpiar.",
    colors: colors(
      "Crema",
      "Suela",
      [IMG.neceser2, IMG.neceser1],
      [IMG.neceser1, IMG.neceser2]
    ),
  },
  {
    id: "llavero-trenzado",
    name: "Llavero Trenzado",
    category: "Llaveros y accesorios",
    price: 6500,
    image: IMG.llavero,
    description:
      "Trenzado a mano con argolla metálica reforzada. Un detalle que dura años.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.llavero, IMG.traba],
      [IMG.traba, IMG.llavero]
    ),
  },
  {
    id: "traba-de-cuero",
    name: "Traba de Cuero",
    category: "Llaveros y accesorios",
    price: 8000,
    image: IMG.traba,
    description:
      "Traba multiuso para llaves o mochila. Herrajes en acabado dorado envejecido.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.traba, IMG.llavero],
      [IMG.llavero, IMG.traba]
    ),
  },
  {
    id: "mochila-urbana-negra",
    name: "Mochila Urbana",
    category: "Mochilas",
    price: 78000,
    image: IMG.mochila1,
    tag: "Best seller",
    description:
      "Para el día a día: entra la notebook de 15”, tiene bolsillo interno con cierre y tiras acolchadas regulables.",
    colors: colors(
      "Negro",
      "Suela",
      [IMG.mochila1, IMG.mochila2],
      [IMG.mochila2, IMG.mochila1]
    ),
  },
  {
    id: "mochila-suela",
    name: "Mochila Suela",
    category: "Mochilas",
    price: 72000,
    image: IMG.mochila2,
    description:
      "Estilo clásico con tapa y cierre magnético. Amplia, cómoda y cada vez más linda con el uso.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.mochila2, IMG.mochila1],
      [IMG.mochila1, IMG.mochila2]
    ),
  },
  {
    id: "rinonera-negra",
    name: "Riñonera Clásica",
    category: "Riñoneras",
    price: 32000,
    image: IMG.rinonera1,
    description:
      "Cómoda y segura, con doble compartimento y tira regulable. Se usa en la cintura o cruzada.",
    colors: colors(
      "Negro",
      "Oliva",
      [IMG.rinonera1, IMG.rinonera2],
      [IMG.rinonera2, IMG.rinonera1]
    ),
  },
  {
    id: "rinonera-rosa",
    name: "Riñonera Urbana",
    category: "Riñoneras",
    price: 30000,
    image: IMG.rinonera2,
    description:
      "Liviana y canchera, ideal para salidas. Bolsillo trasero oculto para lo más importante.",
    colors: colors(
      "Oliva",
      "Negro",
      [IMG.rinonera2, IMG.rinonera1],
      [IMG.rinonera1, IMG.rinonera2]
    ),
  },
  {
    id: "bandolera-mini",
    name: "Bandolera Mini",
    category: "Bandoleras",
    price: 38000,
    image: IMG.bandolera1,
    tag: "Nuevo",
    description:
      "Chiquita pero rendidora: celular, billetera y llaves. Tira regulable y cierre metálico.",
    colors: colors(
      "Crema",
      "Negro",
      [IMG.bandolera1, IMG.bandolera2],
      [IMG.bandolera2, IMG.bandolera1]
    ),
  },
  {
    id: "bandolera-suela",
    name: "Bandolera Grande",
    category: "Bandoleras",
    price: 42000,
    image: IMG.bandolera2,
    description:
      "Más espacio sin perder estilo. Compartimento principal amplio y bolsillo frontal con cierre.",
    colors: colors(
      "Suela",
      "Crema",
      [IMG.bandolera2, IMG.bandolera1],
      [IMG.bandolera1, IMG.bandolera2]
    ),
  },
  {
    id: "portacelular-con-tira",
    name: "Portacelular con Tira",
    category: "Portacelulares",
    price: 18000,
    image: IMG.porta1,
    description:
      "Llevá el celu cruzado y las manos libres. Entra cualquier modelo y tiene bolsillo para tarjetas.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.porta1, IMG.porta2],
      [IMG.porta2, IMG.porta1]
    ),
  },
  {
    id: "portacelular-mini",
    name: "Portacelular Mini",
    category: "Portacelulares",
    price: 15000,
    image: IMG.porta2,
    description:
      "Versión compacta, justa para el celular. Ideal para salir liviano.",
    colors: colors(
      "Negro",
      "Suela",
      [IMG.porta2, IMG.porta1],
      [IMG.porta1, IMG.porta2]
    ),
  },
  {
    id: "bolso-shopper",
    name: "Bolso Shopper",
    category: "Bolsos",
    price: 68000,
    image: IMG.bolso1,
    description:
      "El bolso que va con todo: trabajo, facu o finde. Manijas reforzadas y bolsillo interno con cierre.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.bolso1, IMG.bolso2],
      [IMG.bolso2, IMG.bolso1]
    ),
  },
  {
    id: "bolso-de-mano",
    name: "Bolso de Mano",
    category: "Bolsos",
    price: 58000,
    image: IMG.bolso2,
    description:
      "Elegante y estructurado, con cierre superior y base firme. Incluye tira larga desmontable.",
    colors: colors(
      "Crema",
      "Rosa",
      [IMG.bolso2, IMG.bolso1],
      [IMG.bolso1, IMG.bolso2]
    ),
  },
  {
    id: "cartuchera-classic",
    name: "Cartuchera Classic",
    category: "Cartucheras",
    price: 12000,
    image: IMG.cartuchera1,
    description:
      "Simple y resistente, con cierre metálico. Para lápices, maquillaje o cables.",
    colors: colors(
      "Suela",
      "Negro",
      [IMG.cartuchera1, IMG.cartuchera2],
      [IMG.cartuchera2, IMG.cartuchera1]
    ),
  },
  {
    id: "cartuchera-doble",
    name: "Cartuchera Doble",
    category: "Cartucheras",
    price: 14000,
    image: IMG.cartuchera2,
    description:
      "Dos compartimentos independientes para tener todo ordenado y a mano.",
    colors: colors(
      "Negro",
      "Rosa",
      [IMG.cartuchera2, IMG.cartuchera1],
      [IMG.cartuchera1, IMG.cartuchera2]
    ),
  },
  {
    id: "morral-playero",
    name: "Morral Playero",
    category: "Morrales",
    price: 45000,
    image: IMG.morral1,
    description:
      "Amplio y descontracturado, ideal para el verano. Cierra con solapa y hebilla regulable.",
    colors: colors(
      "Crema",
      "Suela",
      [IMG.morral1, IMG.morral2],
      [IMG.morral2, IMG.morral1]
    ),
  },
  {
    id: "morral-urbano",
    name: "Morral Urbano",
    category: "Morrales",
    price: 48000,
    image: IMG.morral2,
    description:
      "Para moverte por la ciudad: entra tablet o notebook chica, con bolsillos internos organizadores.",
    colors: colors(
      "Negro",
      "Oliva",
      [IMG.morral2, IMG.morral1],
      [IMG.morral1, IMG.morral2]
    ),
  },
  {
    id: "mochila-infantil",
    name: "Mochila Infantil",
    category: "Infantil",
    price: 35000,
    image: IMG.infantil1,
    description:
      "Tamaño ideal para el jardín o la escuela. Liviana, resistente y fácil de limpiar.",
    colors: colors(
      "Rosa",
      "Azul",
      [IMG.infantil1, IMG.infantil2],
      [IMG.infantil2, IMG.infantil1]
    ),
  },
  {
    id: "cartuchera-infantil",
    name: "Cartuchera Infantil",
    category: "Infantil",
    price: 9000,
    image: IMG.infantil2,
    description:
      "Divertida y duradera, con cierre doble para que la abran fácil los más chicos.",
    colors: colors(
      "Azul",
      "Rosa",
      [IMG.infantil2, IMG.infantil1],
      [IMG.infantil1, IMG.infantil2]
    ),
  },
];
