# PRD — Off Course · Marroquinería

## Problem statement (original)
Local de venta de marroquinería "Off Course" (Instagram: @offcoursearg). Página web similar a shopnatural.ar. Marca: blanco, negro, gris claro, rosa pastel. Catálogo con carrito que se envía armado por WhatsApp a +54 9 11 5601-1898 (sin venta online real). Dirección: Soreda 6180, Wilde. Categorías: Billetera de hombre, Billetera de mujer, Neceser, Llaveros y accesorios, Mochilas, Riñoneras, Bandoleras, Portacelulares, Bolsos, Cartucheras, Morrales, Infantil.

## Arquitectura
- Frontend: React 19 + Tailwind + framer-motion + lenis + react-fast-marquee (todo el sitio es una one-page editorial).
- Backend: FastAPI + MongoDB (plantilla intacta; el catálogo vive en `/app/frontend/src/data/products.js` por ser vidriera sin checkout real).
- Carrito: estado en React Context + localStorage, checkout vía `wa.me/5491156011898` con mensaje pre-armado.

## Personas
- Clienta/o que mira el catálogo desde el celular y pide por WhatsApp.
- Dueña del local que quiere mostrar productos y recibir pedidos ordenados.

## Requisitos core (estáticos)
- Catálogo filtrable por las 12 categorías.
- Carrito con cantidades y total estimado.
- Botón "Enviar pedido por WhatsApp" con mensaje detallado.
- Datos de contacto: dirección, Instagram, WhatsApp.
- Estética marca: blanco/negro/gris/rosa pastel.

## Implementado (31 ago 2026)
- Hero cinético con reveal línea por línea enmascarado + parallax en imagen.
- Marquee editorial lento (cuero genuino / hecho a mano / etc.).
- Catálogo con 24 productos de MUESTRA (fotos stock verificadas, precios ejemplo), filtros por categoría con animación layout, grid asimétrico editorial.
- Carrito lateral: agregar/quitar, cantidades, total, persistencia local, toast de confirmación, checkout WhatsApp verificado (URL wa.me con pedido codificado).
- Manifiesto "Nosotros" en capítulos numerados (La materia / El oficio / El barrio).
- Sección "Cómo comprar": envíos, retiro en Soreda 6180 Wilde, medios de pago.
- Footer negro con CTA WhatsApp, Instagram @offcoursearg, dirección.
- Lenis smooth scroll, grain overlay, selección rosa, micro-interacciones.
- Backend sin cambios (health check OK).

## Actualización (31 ago 2026, v2)
- Logo real de Off Course incorporado (procesado: recorte circular + fondo transparente, guardado en `/app/frontend/public/logo.png`) en nav y footer.
- Medios de pago: "Mercado Pago" reemplazado por "tarjetas de débito y crédito".
- Todas las fotos de producto en formato vertical (aspect-[3/4]) para grillas alineadas.

## Backlog priorizado
- P0: Reemplazar productos de muestra por fotos y precios reales (editar `/app/frontend/src/data/products.js`).
- P1: Página de detalle de producto (colores/variantes).
- P1: Logo real de Off Course en el nav.
- P2: Panel simple para que la dueña edite productos sin tocar código.
- P2: Mapa de Google Maps con la dirección del local.

## Credenciales
- No requiere auth ni usuarios. Checkout: WhatsApp +5491156011898.

## Actualización (31 Jun 2026)
- Medios de pago: texto actualizado a "Efectivo, transferencia, tarjetas de débito y crédito."
- Grilla de catálogo unificada: todas las tarjetas de producto ahora tienen el mismo tamaño (3 columnas, aspecto 3:4), se eliminó el layout asimétrico.
