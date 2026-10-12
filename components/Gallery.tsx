"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CakeImage from "./CakeImage";
import { cakes, whatsappUrl, type Cake } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CakeCard({
  cake,
  tall = false,
  priority = false,
}: {
  cake: Cake;
  tall?: boolean;
  priority?: boolean;
}) {
  const card = useRef<HTMLAnchorElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe) => {
      if (!contextSafe) return;
      const el = card.current;
      if (!el) return;

      // Parallax: la foto viaja dentro del marco al scrollear
      gsap.fromTo(
        imgWrap.current,
        { yPercent: -10 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Tilt 3D al hover
      const onMove = contextSafe((e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        gsap.to(el, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      const onLeave = contextSafe(() => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
        });
      });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: card },
  );

  return (
    <a
      ref={card}
      href={whatsappUrl(`¡Hola Regatta Gourmet! Me encantó la torta "${cake.name}". ¿Me cuentan más?`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block will-change-transform"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-ink/8 shadow-[0_24px_60px_-24px_rgba(37,26,30,0.25)] ${
          tall ? "aspect-[4/5]" : "aspect-[4/4.4]"
        }`}
      >
        <div ref={imgWrap} className="absolute inset-[-12%]">
          <CakeImage
            src={cake.image}
            alt={cake.alt}
            label={cake.name}
            priority={priority}
            className="size-full transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        {/* número editorial */}
        <span className="absolute top-5 left-5 rounded-full bg-cream/85 px-3 py-1 font-display text-sm italic backdrop-blur">
          {cake.index}
        </span>

        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent p-6 pt-16 text-cream opacity-95 transition-all duration-500 group-hover:translate-y-0">
          <h3 className="font-display text-3xl italic">{cake.name}</h3>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-cream/85">
            {cake.note}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-soft">
            Pedir esta torta
            <svg viewBox="0 0 16 16" className="size-3 fill-current transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              <path d="M2 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-gallery-head] > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="coleccion" className="relative px-6 py-28 sm:px-10 lg:py-40">
      <div data-gallery-head className="mb-16 flex flex-wrap items-end justify-between gap-6 lg:mb-24">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-rose-deep">
            Piezas de la casa
          </p>
          <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-none">
            La <span className="italic text-rose-deep">colección</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
          Cada torta se diseña a medida: sabores, relleno, paleta y decoración.
          Estas son las que más piden.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <CakeCard cake={cakes[0]} tall priority />
        </div>
        <div className="lg:col-span-5 lg:mt-32">
          <CakeCard cake={cakes[1]} />
        </div>
        <div className="lg:col-span-5 lg:-mt-24">
          <CakeCard cake={cakes[2]} />
        </div>
        <div className="lg:col-span-7 lg:mt-16">
          <CakeCard cake={cakes[3]} tall />
        </div>
      </div>
    </section>
  );
}
