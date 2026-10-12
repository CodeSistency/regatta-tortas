"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WhatsAppButton from "./WhatsAppButton";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTASection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-cta] > *",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        },
      );

      // estrellas doradas flotando
      gsap.to("[data-star]", {
        y: -14,
        rotate: 12,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, from: "random" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ink px-6 py-28 text-cream sm:px-10 lg:py-40"
    >
      {/* brillo rosado de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60rem 30rem at 70% 20%, rgba(229,164,188,0.16), transparent 60%), radial-gradient(50rem 26rem at 20% 90%, rgba(185,138,47,0.12), transparent 60%)",
        }}
      />

      {/* estrellas doradas */}
      {[
        "top-[15%] left-[12%]",
        "top-[25%] right-[15%]",
        "bottom-[20%] left-[22%]",
        "bottom-[30%] right-[25%]",
        "top-[55%] left-[6%]",
        "top-[10%] right-[40%]",
      ].map((pos, i) => (
        <svg
          key={i}
          data-star
          viewBox="0 0 12 12"
          aria-hidden
          className={`absolute ${pos} size-3 fill-gold-soft/70`}
        >
          <path d="M6 0l1.5 4.5L12 6 7.5 7.5 6 12 4.5 7.5 0 6l4.5-1.5L6 0z" />
        </svg>
      ))}

      <div data-cta className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold tracking-[0.4em] uppercase text-gold-soft">
          Hoy es el día
        </p>
        <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]">
          ¿Antojo <span className="italic text-rose">serio</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/70">
          Contanos qué celebrás y te devolvemos propuesta con sabores, diseño y
          precio el mismo día.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6">
          <WhatsAppButton variant="light" label="Escribir por WhatsApp" />
          <a
            href={`https://wa.me/${site.phoneIntl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-2xl italic text-cream/85 transition-colors hover:text-rose"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
