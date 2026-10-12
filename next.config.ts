import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de stock (Unsplash) mientras no estén las fotos reales del taller.
    // Al reemplazarlas por archivos en public/images/ este bloque se puede borrar.
    // Nota: no fijamos `search` porque las URLs llevan query de transformación
    // (?auto=format&fit=crop&w=...&q=...). El pathname acota a /photo-*.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },
};

export default nextConfig;
