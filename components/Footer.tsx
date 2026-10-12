import { site, whatsappUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream px-6 py-12 sm:px-10">
      <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
        <p className="font-display text-2xl italic">
          Regatta
          <span className="ml-2 align-middle font-sans text-[10px] font-semibold tracking-[0.35em] uppercase not-italic text-ink-soft">
            Gourmet
          </span>
        </p>

        <nav className="flex items-center gap-8 text-xs font-semibold tracking-[0.2em] uppercase text-ink-soft">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-rose-deep"
          >
            Instagram
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-rose-deep"
          >
            WhatsApp
          </a>
          <a href="#coleccion" className="transition-colors hover:text-rose-deep">
            Colección
          </a>
        </nav>

        <p className="text-xs text-ink-soft">
          Hecho con crema, mantequilla y paciencia.
        </p>
      </div>
    </footer>
  );
}
