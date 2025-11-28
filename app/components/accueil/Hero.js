"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "../../globals.css";

export default function Hero({ onScrollToConfigurator }) {
  const [heroHeight, setHeroHeight] = useState("100vh");

  useEffect(() => {
    const header = document.querySelector("header");
    const calc = () => {
      const headerHeight = header?.offsetHeight || 0;
      const vh = window.visualViewport?.height || window.innerHeight;
      setHeroHeight(`${vh - headerHeight}px`);
    };
    calc();
  }, []);

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ height: heroHeight }}
    >
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/bg-hero.webp"
          alt="Background Hero"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Overlays au-dessus de l'image */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-4 pb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-4 font-serif text-[clamp(1.75rem,4vw,3.5rem)] leading-tight"
        >
          La raquette de padel française
          <br />
          qui change les règles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="mb-6 max-w-xl text-[clamp(1rem,2vw,1.25rem)] opacity-80"
        >
          Fabrication 100% française, tamis remplaçable, matériaux recyclés
        </motion.p>

        {/* Bouton Hero type "action" réutilisable */}
        <motion.button
          onClick={onScrollToConfigurator}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="btn-action"
        >
          <span className="btn-action__text">
            Configurez votre raquette →
          </span>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator z-30">
        <span>Découvrir</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}