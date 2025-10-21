import Link from "next/link";
import Image from "next/image";

export default function Histoire() {
  return (
    <main className="bg-slate-50">
     
      {/* Introduction */}
      {/* titre */}
      <section className="py-16 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-left">
          Une vision née d’un constat
        </h1>

        <div className="mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Texte*/}
          <div className="flex flex-col text-left">
            <div className="flex-1">
              <p className="text-graphite mb-2 text">
                Plus de 95% des raquettes de padelvendues en Europe sont produites en Chine et au Pakistan, à partir de fibres de verre ou de carbone vierges.
              </p>
              <p className="text-graphite mb-2 ">
                Même les marques françaises ont totalement délocalisé ou sous-traité leur production à l’étranger.
              </p>
              <p className="text-graphite mt-4 ">
                En moyenne une raquette est remplacée tous les 14 mois. Combiné à l&apos;usage de matériaux à fort impact CO2 et à des importations lointaines, le modèle actuel n&apos;est pas soutenable à long terme.
              </p>
              <p className="text-graphite mt-4 ">
                Dans un marché sans alternative locale alliant performance et éco-responsabilité, Hexagon Padel est né pour changer la donne.
              </p>
            </div>
          </div>

          {/* Image*/}
          <div className="w-full flex items-stretch">
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//pakistan.webp"
              alt="Atelier de fabrication au Pakistan"
              className="w-full object-cover rounded-sm"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Image à gauche */}
          <div className="w-full flex items-stretch">
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//made-in-france.webp"
              alt="Atelier de fabrication en France"
              className="w-full object-cover rounded-sm"
              width={800}
              height={600}
            />
          </div>

          {/* Titre + Texte à droite */}
          <div className="flex flex-col text-left">
            <h1 className="text-3xl md:text-4xl font-semibold mb-10 ">
              Notre ambition est claire
            </h1>
            <div className="flex-1">
              <p className="text-graphite mb-2 ">
                Concevoir les premières raquettes de padel alliant performance, durabilité environnementale et fabrication 100 % française.
              </p>
              <p className="text-graphite mt-4 ">
                Nous voulons prouver qu’une autre voie est possible : celle d’une excellence technique, locale, à faible impact, qui ne sacrifie ni la qualité de jeu, ni le design, ni l’éthique.
              </p>
              <div className="mt-6">
                <Link
                  href="/engagements"
                  className="text-blue-electric font-medium hover:underline text-sm"
                >
                  → Voir nos engagements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quand l’artisanat rencontre l’ingénierie */}
      <section className="py-16 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-left">
          Quand l’artisanat rencontre l’ingénierie
        </h1>

        <div className="mx-auto grid md:grid-cols-3 gap-12 items-start">
          {/* Texte (2/3) */}
          <div className="flex flex-col text-left md:col-span-2">
            <div className="flex-1">
              <p className="text-graphite mb-2 ">
                Nos raquettes sont fabriquées en Loire-Atlantique dans une micro-usine dédiée, où l’on allie précision artisanale et process industriels de pointe.
              </p>
              <p className="text-graphite mt-4 ">
                Après deux années de R&D, nous avons développé un cadre monobloc en carbone forgé, conçu pour offrir un contrôle maximal, une absorption des vibrations exceptionnelle et une esthétique unique. Ce procédé aujourd’hui protégé par brevet permet de remplacer le tamis sans changer le cadre de la raquette.
              </p>
              <div className="mt-6">
                <Link
                  href="/technologies"
                  className="text-blue-electric font-medium hover:underline text-sm"
                >
                  → En savoir plus sur nos technologies
                </Link>
              </div>
            </div>
          </div>

          {/* Image (1/3) */}
          <div className="w-full h-full flex items-stretch">
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//man-sanding.webp"
              alt="Micro-factory française Hexagon Padel"
              className="w-full h-auto max-h-64 object-cover rounded-sm"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* Ambition de croissance */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">Un modèle pensé pour durer</h2>
          <p className=" md:text leading-relaxed">
            Nous ne voulons pas rester une exception : nous voulons devenir la référence française du padel responsable.
          </p>
          <p className=" md:text leading-relaxed mt-6">
            Notre ambition est de faire grandir Hexagon Padel sans compromis, en développant notre production locale, en étoffant notre gamme et en créant un véritable réseau de partenaires autour de notre vision.
          </p>
          <div className="mt-8">
            <Link href="/catalogue" className="text-blue-electric font-medium hover:underline text-sm">
              → Découvrir le catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Rejoindre l’aventure */}
      <section className="py-16 px-6 md:px-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Rejoignez l’aventure</h2>
        <p className="text-lg md:text-l leading-relaxed mb-6">
          Vous partagez nos valeurs et souhaitez contribuer à construire une marque de sport nouvelle génération ?
        </p>
        <p className="text-lg md:text-l leading-relaxed mb-10">
          Nous recherchons des talents, des distributeurs et des partenaires passionnés. Ensemble, faisons rayonner l’excellence française dans le monde du padel.
        </p>
        <Link
          href="/contact"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Nous contacter
        </Link>
      </section>
    </main>
  );
}