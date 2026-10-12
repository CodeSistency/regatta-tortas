const items = [
  "Tortas personalizadas",
  "Cupcakes",
  "Tortas frías",
  "Mesas dulces",
  "Cumpleaños",
  "Bodas & eventos",
  "Hecho a pedido",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative z-10 -rotate-1 border-y border-ink/10 bg-ink py-4 text-cream">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-sm font-semibold tracking-[0.22em] uppercase"
          >
            {item}
            <svg viewBox="0 0 12 12" className="size-2.5 fill-gold-soft" aria-hidden>
              <path d="M6 0l1.5 4.5L12 6 7.5 7.5 6 12 4.5 7.5 0 6l4.5-1.5L6 0z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
