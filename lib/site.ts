export const site = {
  name: "Regatta Gourmet",
  tagline: "Repostería de autor",
  description:
    "Tortas personalizadas, cupcakes y tortas frías hechas a pedido. Repostería artesanal con ingredientes reales.",
  phoneDisplay: "0416 821 2879",
  phoneIntl: "584168212879",
  instagram: "https://instagram.com/regattagourmet",
  instagramHandle: "@regattagourmet",
} as const;

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(
    message ??
      "¡Hola Regatta Gourmet! Quiero pedir una torta. ¿Me cuentan sabores y precios?",
  )}`;

export type Cake = {
  id: string;
  index: string;
  name: string;
  note: string;
  image: string;
  alt: string;
};

/**
 * PLACEHOLDER: fotos de stock de Unsplash (licencia libre, sin atribución
 * obligatoria) hasta que estén las fotos reales del taller.
 * Para reemplazar: poné los archivos en public/images/ y cambiá `image` por
 * la ruta local (ej. "/images/cake-coquette.jpg"). Después se puede borrar el
 * bloque `images.remotePatterns` de next.config.ts.
 */
const stock = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const cakes: Cake[] = [
  {
    id: "coquette",
    index: "01",
    name: "Coquette Rosa",
    note: "Crema rosa peinada y acabado liso de pastelería. La que rompe el feed.",
    image: stock("photo-1621303837174-89787a7d4729"),
    alt: "Torta rosa y blanca sobre plato de cerámica blanco",
  },
  {
    id: "fresas",
    index: "02",
    name: "Fresas & Crema",
    note: "Bizcocho húmedo, crema chantilly y fresas frescas cortadas a mano.",
    image: stock("photo-1622621746668-59fb299bc4d7"),
    alt: "Torta de fresas con crema sobre plato de cerámica blanco",
  },
  {
    id: "fria",
    index: "03",
    name: "Torta Fría de Frutos",
    note: "Capas frías de crema con fresas y arándanos. Alerta de antojo serio.",
    image: stock("photo-1650419424455-d0513aaf0dd6"),
    alt: "Torta fría decorada con fresas y arándanos frescos",
  },
  {
    id: "minis",
    index: "04",
    name: "Mini Tortas Minimal",
    note: "Formato individual, acabado limpio y tu mensaje. Para mesas dulces.",
    image: stock("photo-1702323213598-2b715d326919"),
    alt: "Tres mini tortas minimalistas sobre pedestales blancos",
  },
];

/** Foto editorial de apoyo para la sección "La casa". */
export const houseImage = {
  src: stock("photo-1759769583882-556d39191357", 1100),
  alt: "Torta verde con crema en ondas y perlas doradas",
} as const;

export const steps = [
  {
    index: "01",
    title: "Escribinos",
    text: "Contanos la fecha, la ocasión y cuántos comen. Respondemos el mismo día por WhatsApp.",
  },
  {
    index: "02",
    title: "La diseñamos juntos",
    text: "Sabores, relleno, paleta y decoración. Te mandamos propuesta y presupuesto cerrado.",
  },
  {
    index: "03",
    title: "A celebrar",
    text: "Horneamos 24–48 h antes de tu evento. Retirás por nuestro taller o coordinamos entrega.",
  },
] as const;
