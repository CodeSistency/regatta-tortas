"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { whatsappUrl } from "@/lib/site";

gsap.registerPlugin(useGSAP);

type Props = {
  label?: string;
  message?: string;
  variant?: "solid" | "outline" | "light";
  className?: string;
};

export default function WhatsAppButton({
  label = "Pedir por WhatsApp",
  message,
  variant = "solid",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (context, contextSafe) => {
      if (!contextSafe) return;
      const el = ref.current;
      if (!el) return;

      const onMove = contextSafe((e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.28,
          y: y * 0.34,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(innerRef.current, {
          x: x * 0.12,
          y: y * 0.16,
          duration: 0.5,
          ease: "power3.out",
        });
      });

      const onLeave = contextSafe(() => {
        gsap.to([el, innerRef.current], {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
        });
      });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  const styles =
    variant === "solid"
      ? "bg-ink text-cream hover:bg-rose-deep"
      : variant === "light"
        ? "bg-cream text-ink hover:bg-blush"
        : "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream";

  return (
    <a
      ref={ref}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${styles} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-3-.2-.31a8.07 8.07 0 0 1-1.24-4.31c0-4.47 3.64-8.11 8.12-8.11a8.1 8.1 0 0 1 8.11 8.11c0 4.48-3.64 8.12-8.11 8.12Zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span ref={innerRef} className="relative">
        {label}
      </span>
    </a>
  );
}
