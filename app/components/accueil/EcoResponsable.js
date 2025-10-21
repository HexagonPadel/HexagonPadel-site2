'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function EcoResponsable() {
  return (
    <div>

    

      {/* === SECTION INNOVATION ÉCO-RESPONSABLE === */}
      <section>
        <div className="bg-black py-12">
          <h2 className="text-center text-3xl font-bold text-white mb-10">Innovation éco-responsable</h2>

          {/* === return "desktop" (md:grid-cols-3) === */}
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">

            {/* === CARBONE RECYCLE === */}
            <motion.div 
              className="overflow-hidden"
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
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Carbone recyclé</h3>
                <p className="text-gray-400 leading-tight text-justify">
                  Nous recyclons des fibres de carbone de la filière aéronautique locale pour fabriquer nos cadres en carbone forgé.
                </p>
              </div>
            </motion.div>

            {/* === TAMIS INTERCHANGEABLE === */}
            <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image 
                src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//tamis-replace.webp" 
                alt="Tamis remplaçable" 
                width={500}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Tamis remplaçable</h3>
                <p className="text-gray-400 leading-tight text-justify">
                  Notre système breveté permet de remplacer uniquement le tamis en cas de casse, prolongeant la durée de vie de votre raquette et réduisant les déchets.
                </p>
              </div>
            </motion.div>

            {/* === RESINES BIOSOURCEES === */}
            <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Image 
                src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//resine-bio.webp" 
                alt="Résines biosourcées" 
                width={500}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Résines biosourcées</h3>
                <p className="text-gray-400 leading-tight text-justify">
                  Nos résines d&apos;origine végétale offrent d&apos;excellentes propriétés mécaniques tout en réduisant considérablement notre empreinte carbone.
                </p>
              </div>
            </motion.div>
          </div>

          {/* === CTA === */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
            viewport={{ once: true }}
          >
            <a href="/engagements">
              <button className="btn-hero">
                Explorer nos engagements
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}