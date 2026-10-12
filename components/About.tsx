"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CakeImage from "./CakeImage";
import { houseImage } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT =
  "Detrás de cada Regatta hay madrugadas de horno, crema batida a mano y la convicción de que tu mesa tiene que verse tan bien como sabe. No hacemos tortas en serie: hacemos la tuya.";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Relleno palabra por palabra ligado al scroll
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      // Foto de apoyo: reveal por clip-path + parallax interno
      gsap.fromTo(
        "[data-house-frame]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-house-frame]", start: "top 82%" },
        },
      );
      gsap.fromTo(
        "[data-house-img]",
        { yPercent: -12 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-house-frame]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-6 py-28 sm:px-10 lg:py-44">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.35em] uppercase text-ink-soft">
            <span className="h-px w-10 bg-gold" />
            La casa
          </p>
          <p className="font-display text-[clamp(1.7rem,3.2vw,2.7rem)] leading-snug">
            {TEXT.split(" ").map((word, i) => (
              <span key={i} data-word className="inline-block">
                {word}
                {"\u00A0"}
              </span>
            ))}
          </p>
          <p className="mt-10 font-display text-xl italic text-rose-deep">
            — Regatta Gourmet
          </p>
        </div>

        <div className="lg:col-span-5">
          <div
            data-house-frame
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/8 shadow-[0_28px_70px_-28px_rgba(37,26,30,0.32)]"
          >
            <div data-house-img className="absolute inset-[-12%]">
              <CakeImage
                src={houseImage.src}
                alt={houseImage.alt}
                label="Regatta"
                className="size-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-ink-soft">
            Taller Regatta · Hecho a mano
          </p>
        </div>
      </div>
    </section>
  );
}
