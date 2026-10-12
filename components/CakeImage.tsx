"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Imagen de torta con placeholder editorial si el archivo aún no existe.
 * Las fotos van en public/images/ (ver lib/site.ts para los nombres).
 */
export default function CakeImage({
  src,
  alt,
  label,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  /** Desactiva el lazy-load. Usar sólo en la primera imagen visible (LCP). */
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-blush via-cream-deep to-rose/40 ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 64 64"
          className="size-14 text-rose-deep/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M10 50h44M14 50V38c0-2 1-3 3-3h30c2 0 3 1 3 3v12" />
          <path d="M20 35v-6c0-2 1-3 3-3h18c2 0 3 1 3 3v6" />
          <path d="M32 26v-8m0 0c-2 0-3-1.5-3-3s1.5-3 3-5c1.5 2 3 3.5 3 5s-1 3-3 3Z" />
          <path d="M18 44c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 4 2" />
        </svg>
        <span className="px-6 text-center font-display text-2xl italic text-rose-deep">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setMissing(true)}
      className={`object-cover ${className}`}
    />
  );
}
