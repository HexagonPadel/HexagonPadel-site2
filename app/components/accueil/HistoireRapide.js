"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function EcoResponsable() {
  return (
    <>
      {/* === SECTION HISTOIRE === */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6 md:flex md:items-center md:gap-12">

          {/* === IMAGE (desktop + mobile) === */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-[400px] aspect-square">
              <Image
                src="/gui-debut.png"
                alt="Fondateur Hexagon Padel"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* === TEXTE (desktop + mobile) === */}
          <motion.div 
            className="md:w-1/2 flex items-center"
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mt-6 md:mt-0">
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text text-graphite-dark mb-6">
                Fondé avec passion dans notre atelier à Clisson en Loire-Atlantique, Hexagon Padel représente l&apos;alliance parfaite entre savoir-faire artisanal et innovation technologique.
              </p>
              <p className="text text-graphite-dark mb-6">
                Notre engagement local va de pair avec notre vision globale : créer des raquettes éco-conçues qui changent les règles du jeu grâce à des matériaux recyclés et des technologies brevetées comme notre tamis remplaçable.
              </p>
              <p className="text text-graphite-dark mb-6">
                Chaque raquette est le fruit d&apos;un processus rigoureux, combinant les exigences de la haute performance sportive avec une démarche environnementale responsable.
              </p>
              <Link href="/histoire" className="btn-hero">
                Découvrir notre histoire
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}