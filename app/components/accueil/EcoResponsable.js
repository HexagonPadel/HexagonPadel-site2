'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EcoResponsable() {
  return (
    <section 
    className="section section--dark"
    style={{
      backgroundImage: 'url("/photos/carbon-texture.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "transparent",
    }}
    >
      <div className="section-inner">

        {/* === TITRE ALIGNÉ À GAUCHE (standard sections) === */}

          <div className="section-title">
            Innovation éco-responsable
          </div>
          <div className="section-subtitle mb-8">
            Réduire l&apos;empreinte carbone sans compromis sur la performance, grâce à des choix de matériaux et de conception pensés pour durer.
          </div>


        {/* === GRID DES CARTES === */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARBONE RECYCLE */}
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//chute-carbone.webp"
              alt="Carbone recyclé"
              width={500}
              height={250}
              className="w-full h-56 object-cover"
            />

              <h2 className=" text-xl font-semibold mb-4 mt-4">
                Carbone recyclé
              </h2>
              <p className="section-paragraph text-justify">
                Nous recyclons des fibres de carbone de la filière aéronautique locale pour fabriquer
                nos cadres en carbone forgé.
              </p>

          </motion.div>

          {/* TAMIS INTERCHANGEABLE */}
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src="/photos/tamis-remplacable.webp"
              alt="Tamis remplaçable"
              width={500}
              height={250}
              className="w-full h-56 object-cover"
            />
         
              <h3 className="text-xl font-semibold mb-4 mt-4">
                Tamis remplaçable
              </h3>
              <p className="section-paragraph text-justify">
                Notre système breveté permet de remplacer uniquement le tamis en cas de casse,
                prolongeant la durée de vie de votre raquette et réduisant les déchets.
              </p>
        
          </motion.div>

          {/* RESINES BIOSOURCEES */}
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="/photos/resine-bio.webp"
              alt="Résines biosourcées"
              width={500}
              height={250}
              className="w-full h-56 object-cover"
            />

              <h3 className="text-xl font-semibold mb-4 mt-4">
                Résines biosourcées
              </h3>
              <p className="section-paragraph text-justify">
                Nos résines d&apos;origine végétale offrent d&apos;excellentes propriétés mécaniques
                tout en réduisant considérablement notre empreinte carbone.
              </p>

          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Link href="/engagements">
            <button className="btn-action btn-action--flat">
              Explorer nos engagements
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}