'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'; // Importation de Image de Next.js

const hotspots = [
  {
    id: 1,
    x: '40%',
    y: '18%',
    side: 'gauche',
    title: 'Tamis 100% carbone hybride (non-tissé et forgé) personnalisable',
    description: 'Contrôle exceptionnel et durabilité accrue',
    image: ''
  },
  {
    id: 2,
    x: '70%',
    y: '15%',
    side: 'droite',
    title: 'Mousse EVA Soft bi-matière « Dual Core »',
    description: 'Équilibre idéal entre contrôle précis et puissance décuplée',
    image: ''
  },
  {
    id: 3,
    x: '55%',
    y: '35%',
    side: 'droite',
    title: 'Surface texturée',
    description: 'Texture 3D pour un spin mieux maîtrisé',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/hotspot-a2.webp'
  },
  {
    id: 4,
    x: '40%',
    y: '60%',
    side: 'droite',
    title: 'Cadre en carbone forgé',
    description: 'Rapport poids / puissance inégalé',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/hotspot-b3.webp'
  },
  {
    id: 5,
    x: '50%',
    y: '75%',
    side: 'gauche',
    title: 'Manche ergonomique facetté',
    description: 'Prise en main optimale et contrôle précis à chaque frappe',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/hotspot-a4.webp'
  },
  {
    id: 6,
    x: '52%',
    y: '97%',
    side: 'gauche',
    title: 'Dragone antibactérienne et remplaçable',
    description: 'Sécurité et hygiène sans compromis',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/dragone.webp'
  },
  {
    id: 7,
    x: '50%',
    y: '5%',
    side: 'gauche',
    title: 'Embossage',
    description: 'Nom du modèle gravé en relief dans le cadre',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/hotspot-b4.webp'
  },
  {
    id: 8,
    x: '50%',
    y: '55%',
    side: 'gauche',
    title: 'Logo personnalisable',
    description: 'Logo coloré et texturé en relief',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/hotspot-b2.webp'
  },
  {
    id: 9,
    x: '48%',
    y: '97%',
    side: 'gauche',
    title: 'Insert métallique directement dans le manche du cadre',
    description: '',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/hotspot-b1.webp'
  },
]

export default function Hotspots() {
  const [activeHotspot, setActiveHotspot] = useState(null)

  return (
    <div className="relative max-w-md sm:max-w-lg mx-auto aspect-[4/5]">
      {/* Image */}
      <Image
        src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Hotspots/raquette1-hotspots.webp"
        alt="Raquette de padel"
        className="w-full h-full object-contain"
        width={800} // Largeur de l'image
        height={1000} // Hauteur de l'image
      />

      {/* Hotspots */}
      {hotspots.map(h => (
        <div
          key={h.id}
          onMouseEnter={() => setActiveHotspot(h)}
          onMouseLeave={() => setActiveHotspot(null)}
          className="absolute"
          style={{
            top: h.y,
            left: h.x,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Halo pulsant */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-600"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: [1, 1.5],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: 'easeOut'
              }}
            />
            {/* Point central */}
            <div className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full hover:scale-110 transition-transform duration-200 shadow cursor-pointer z-10" />
          </div>
        </div>
      ))}

      {/* Bulle descriptive */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, x: activeHotspot.side === 'droite' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeHotspot.side === 'droite' ? 30 : -30 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50 bg-white p-6 rounded-xl shadow-2xl text-left pointer-events-none"
            style={{
              top: `calc(${activeHotspot.y} - 10rem)`,
              left: `calc(${activeHotspot.x} - 50%)`,
              transform: 'translate(0, 0)',
            }}
          >
            <h2 className="text-lg font-semibold text-black mb-2">{activeHotspot.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{activeHotspot.description}</p>
            {activeHotspot.image && (
              <Image
                src={activeHotspot.image}
                alt={activeHotspot.title}
                className="rounded-lg max-h-[300px] object-contain w-full"
                width={300} // Largeur de l'image
                height={300} // Hauteur de l'image
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}