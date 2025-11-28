"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Histoire() {
  return (
    <section className="section section-bright">
      <div className="section-inner">

        {/* === TITRE & SOUS-TITRE (standard sections) === */}
        <div className="max-w-3xl mb-8 md:mb-12">
          <h2 className="section-title">Notre histoire</h2>
          <p className="section-subtitle">
            Un projet né près de Nantes, mêlant innovation, artisanat et écoresponsabilité.
          </p>
        </div>

        {/* === LAYOUT 2 COLONNES === */}
        <div className="section-layout-split gap-10 md:gap-16">

          {/* === IMAGE === */}
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-[420px] aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/gui-debut.png"
                alt="Fondateur Hexagon Padel"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* === TEXTE === */}
          <motion.div
            className="flex items-center w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="section-paragraph text-graphite-dark">
                Fondé avec passion dans notre atelier à Clisson en Loire-Atlantique, Hexagon Padel
                représente l&apos;alliance entre savoir-faire artisanal et innovation technologique.
              </p>

              <p className="section-paragraph text-graphite-dark">
                Notre engagement local va de pair avec notre vision globale : créer des raquettes
                éco-conçues qui changent les règles du jeu grâce à des matériaux recyclés et des
                technologies brevetées comme notre tamis remplaçable.
              </p>

              <p className="section-paragraph text-graphite-dark">
                Chaque raquette est le fruit d&apos;un processus rigoureux, combinant haute performance
                sportive et démarche environnementale responsable.
              </p>

              <Link href="/histoire" className="btn-action btn-action--flat">
                Découvrir notre histoire
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}