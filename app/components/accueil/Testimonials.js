'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // ✅ Import de next/image

const testimonials = [
  {
    nom: 'Julien',
    role: 'Joueur confirmé',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//man-2.webp',
    texte:
      'Depuis que j’ai essayé la raquette HexaPro, mon jeu a bien changé. La qualité des matériaux, notamment le carbone forgé, se ressent dès le premier coup. C’est la raquette parfaite pour un joueur exigeant comme moi.',
  },
  {
    nom: 'Thomas',
    role: 'Entraîneur amateur',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//man-3.webp',
    texte:
      'Je cherchais une raquette qui puisse durer plusieurs saisons sans perdre ses performances. La HexaCore est clairement conçue pour durer, et son design élégant attire les compliments à chaque match.',
  },
  {
    nom: 'Sophie',
    role: 'Joueuse amateur',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//woman-2.webp',
    texte:
      'J’ai toujours eu du mal avec les raquettes trop lourdes ou mal équilibrées. Hexagon a créé une raquette légère mais incroyablement précise, même sur les coups décentrés. Mon bras et mon jeu me disent merci !',
  },
  {
    nom: 'Claire',
    role: 'Joueuse compétitive',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//woman-1.webp',
    texte:
      'En tournoi, je peux compter sur la puissance et le contrôle qu’offre cette raquette. La sensation lors des smashs est incomparable, et j’ai gagné en confiance dans mon jeu.',
  },
  {
    nom: 'Mathieu',
    role: 'Joueur débutant',
    image: 'https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//man-1.webp',
    texte:
      'Hexagon ne se contente pas de vendre une raquette : ils offrent une vraie expérience premium. De la qualité du grip à l’équilibre parfait, chaque détail a été pensé pour les joueurs exigeants.',
  },
];

const visibleCount = 3;
const total = testimonials.length;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, visibleCount)];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index === total) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 700);

      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true);
    }
  }, [index]);

  return (
    <div className="bg-slate-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          Ce qu&apos;en disent nos joueurs
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{
              transform: `translateX(-${(index * 100) / extendedTestimonials.length}%)`,
              width: `${(extendedTestimonials.length) * (100 / visibleCount)}%`,
            }}
          >
            {extendedTestimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-6 flex-shrink-0"
                style={{ width: `${100 / extendedTestimonials.length}%` }}
              >
                <div className="h-full">
                  <div className="flex items-center mb-4 p-2">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.nom}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{testimonial.nom}</h3>
                      <p className="text-gray-500 text-xs leading-tight">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="italic font-thin text-graphite-dark text-sm px-6 pb-6">
                  &quot;{testimonial.texte}&quot;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}