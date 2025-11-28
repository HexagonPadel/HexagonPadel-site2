'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Notoriete() {
  const logos = [
    { src: '/presse/logo1.webp', alt: 'Les Echos', href: 'https://www.lesechos.fr/pme-regions/pays-de-la-loire/hexagon-padel-la-premiere-raquette-made-in-france-a-lhorizon-2196074' },
    { src: '/presse/logo2.webp', alt: 'Ouest France 2', href: 'https://www.ouest-france.fr/pays-de-la-loire/clisson-44190/les-raquettes-de-padel-francaises-sont-de-clisson-10e8ec34-d29f-11ef-a472-523f8d5502d1' },
    { src: '/presse/logo3.webp', alt: 'Api News', href: 'https://agence-api.ouest-france.fr/pays-de-la-loire/loire-atlantique/plasturgie-hexagon-padel-une-raquette-made-in-france-en-carbone-recycle-17e81b7a-8dc0-4998-a26b-122edd5c6b5a' },
    { src: '/presse/logo4.webp', alt: 'Kivo', href: 'https://incubateur-kivo.fr/startups/hexagon-padel/' },
    { src: '/presse/logo5.webp', alt: 'Sport-Padel', href: 'https://www.sport-padel.fr/hexagon-padel-linnovation-francaise-raquettes-de-padel-5151' },
    { src: '/presse/logo6.webp', alt: 'IJ', href: 'https://www.informateurjudiciaire.fr/actualites/raquettes-made-in-l-a-le-smash-ecoresponsable-dhexagon-padel' },
    { src: '/presse/logo7.webp', alt: 'Usine Nouvelle', href: 'https://www.usinenouvelle.com/article/padel-un-bout-d-a320-dans-votre-raquette-la-start-up-nantaise-hexagon-padel-recycle-les-materiaux-aeronautiques.N2241541' },
  ];

  return (
    <section aria-labelledby="notoriete-title" className="section section-bright">
      <div className="section-inner">

        {/* Titre standardisé */}
        <h2 id="notoriete-title" className="section-title mb-6">
          Ils parlent de nous
        </h2>

        {/* Grille de logos */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 md:gap-6"
          role="list"
        >
          {logos.map((logo, i) => (
            <li key={i} className="group">
              <Link
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ouvrir l'article associé à ${logo.alt}`}
                className="block"
              >
                <div
                  className="
                    aspect-[3/2] w-full overflow-hidden rounded-2xl border border-neutral-200 
                    bg-white p-4 shadow-sm transition-transform duration-300 
                    hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-neutral-500
                  "
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="
                        object-contain grayscale opacity-80 transition duration-300 
                        group-hover:grayscale-0 group-hover:opacity-100
                      "
                      priority={i === 0}
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}