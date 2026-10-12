import Reveal from "./Reveal";
import { steps } from "@/lib/site";

export default function Process() {
  return (
    <section className="relative bg-blush/40 px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-rose-deep">
            Sin vueltas
          </p>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-tight">
            Pedir tu torta es <span className="italic">así de fácil</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-24">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.15}>
              <div className="group border-t-2 border-ink/15 pt-8 transition-colors duration-300 hover:border-rose-deep">
                <span className="font-display text-6xl italic text-rose/60 transition-colors duration-300 group-hover:text-rose-deep lg:text-7xl">
                  {step.index}
                </span>
                <h3 className="mt-5 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
