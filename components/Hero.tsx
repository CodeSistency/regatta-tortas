"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WhatsAppButton from "./WhatsAppButton";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CakeScene = dynamic(() => import("./CakeScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const textCol = useRef<HTMLDivElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Intro: líneas del título con clip reveal
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          "[data-hero-badge]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.15 },
        )
        .fromTo(
          "[data-hero-line] > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.25, stagger: 0.14 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.7",
        )
        .fromTo(
          canvasWrap.current,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "power3.out" },
          "-=1.3",
        );

      // Parallax de profundidad al scrollear
      gsap.to(textCol.current, {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(canvasWrap.current, {
        yPercent: 14,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* fondo: blobs rosados suaves */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 right-[-10%] size-[42rem] rounded-full bg-blush/50 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-12%] size-[36rem] rounded-full bg-cream-deep/70 blur-3xl" />
      </div>

      {/* header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <a href="#" className="font-display text-xl italic">
          Regatta
          <span className="not-italic text-xs tracking-[0.35em] uppercase align-middle ml-2 text-ink-soft">
            Gourmet
          </span>
        </a>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold tracking-[0.2em] uppercase text-ink-soft transition-colors hover:text-rose-deep"
        >
          {site.instagramHandle}
        </a>
      </header>

      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 pb-24 sm:px-10 lg:grid-cols-12 lg:gap-0 lg:pb-0">
        {/* texto */}
        <div ref={textCol} className="relative z-20 lg:col-span-7">
          <p
            data-hero-badge
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/70 px-4 py-2 text-[11px] font-semibold tracking-[0.28em] uppercase backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-gold" />
            Repostería artesanal · Hecho a pedido
          </p>

          <h1 className="font-display leading-[0.92] text-[clamp(3.6rem,11vw,9.5rem)]">
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block italic">Regatta</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-2">
              <span className="text-outline block font-black tracking-tight text-rose-deep uppercase">
                Gourmet
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Tortas personalizadas que se roban la celebración. Horneadas 24 h
            antes de tu evento, decoradas como pieza de museo.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-5">
            <WhatsAppButton />
            <a
              href="#coleccion"
              className="group text-sm font-semibold tracking-wide uppercase text-ink"
            >
              Ver la colección
              <span className="mt-1 block h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-300 group-hover:scale-x-50" />
            </a>
          </div>
        </div>

        {/* canvas 3d */}
        <div
          ref={canvasWrap}
          className="pointer-events-none absolute inset-0 z-10 lg:relative lg:col-span-5 lg:h-[80vh]"
          aria-hidden
        >
          <div className="absolute inset-0 opacity-40 sm:opacity-60 lg:opacity-100">
            <CakeScene />
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-ink-soft">
          Deslizá
        </span>
        <span className="h-10 w-px overflow-hidden bg-ink/15">
          <span className="block h-1/2 w-full animate-pulse bg-rose-deep" />
        </span>
      </div>

      {/* teléfono vertical */}
      <a
        data-hero-fade
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 rotate-90 text-[10px] font-semibold tracking-[0.4em] uppercase text-ink-soft transition-colors hover:text-rose-deep lg:block"
      >
        {site.phoneDisplay}
      </a>
    </section>
  );
}
