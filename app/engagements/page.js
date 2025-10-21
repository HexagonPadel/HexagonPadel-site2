import Link from "next/link";
import Image from "next/image";

export default function Engagements() {
  return (
    <main className="bg-slate-50">

      {/* Qualité */}
      <section className="py-16 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-left">
          Qualité premium
        </h1>
        <div className="mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col text-left">
            <div className="flex-1">
              <p className="text-graphite mb-2 text">
                Nos raquettes sont testées, retestées, et approuvées par des joueurs passionnés, amateurs comme professionnels.
              </p>
              <p className="text-graphite mb-2">
                Nous utilisons uniquement des fibres de carbone haut de gamme pour assurer une réactivité et une durabilité exceptionnelles. Nous n&apos;utilisons aucune fibre de verre.
              </p>
              <p className="text-graphite mt-4">
                Chaque produit est soumis à un contrôle qualité rigoureux et bénéficie d’une garantie étendue.
              </p>
              <p className="text-graphite mt-4">
                Nos cadres en Carbone Forgé sont garantis 2 ans contre la casse et vous offrent un style inimitable sur le court.
              </p>
            </div>
          </div>
          <div className="w-full flex items-stretch">
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//bg-hero.webp"
              alt="Raquette sur fond sombre"
              width={800}
              height={400}
              className="w-full object-cover rounded-sm max-h-64"
            />
          </div>
        </div>
      </section>

      {/* Made in France */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="w-full flex items-stretch">
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//production.webp"
              alt="Atelier de fabrication en France"
              width={800}
              height={500}
              className="w-full object-cover rounded-sm"
            />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="italic text-3xl md:text-4xl font-semibold mb-10">
              Made in France
            </h1>
            <div className="flex-1">
              <p className="text-graphite mb-2">
                Saviez-vous que plus de 95% des raquettes vendues en Europe sont en réalité fabriquées en Asie par des sous-traitants spécialisés ?
              </p>
              <p className="text-graphite mt-4">
                Nous avons fait le choix de la ré-industrialisation en implantant notre micro-usine à Clisson, en Loire-Atlantique, ce qui fait d&apos;Hexagon Padel le seul fabricant français.
              </p>
              <p className="text-graphite mt-4">
                Cette micro-usine est un équilibre précis entre les nouvelles technologies et l’artisanat. Une partie des étapes de fabrication est automatisée (découpage, ébavurage, perçage), le reste est fabriqué à la main par nos artisans qualifiés.
              </p>
              <p className="text-graphite mt-4">
                C’est aussi un engagement fort pour soutenir l’économie régionale, limiter les transports, et proposer une fabrication authentiquement Made in France
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matériaux */}
      <section className="py-16 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-left">
          Fabrication éco-responsable
        </h1>
        <div className="mx-auto grid md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col text-left md:col-span-2">
            <div className="flex-1">
              <p className="text-graphite mb-2">
                Selon une étude externe, une raquette Hexagon Padel émet <strong>70% moins de gaz à effet de serre</strong> lors de sa fabrication par rapport à une raquette traditionnelle fabriquée en Asie.
              </p>
              <p className="text-graphite mt-4 font-semibold">
                90% de matériaux recyclés ou biosourcés :
              </p>
              <ul className="list-disc pl-6 text-graphite mt-2 space-y-2">
                <li>
                  Nos fibres de carbone sont 100% recyclées et proviennent de la filière aéronautique et éolienne de l&apos;Ouest de la France.
                </li>
                <li>
                  Nos cadres en carbone forgé sont fabriqués à partir de fibres déchiquetées issues de chutes de production. Nos tamis sont produits à partir de tissus agglomérés de fibres recyclées, ainsi que de fibres déchiquetées pour certains de nos modèles.
                </li>
                <li>
                  Nos résines epoxy sont bio-sourcées à 100%.
                </li>
                <li>
                  Nous n&apos;utilisons aucune peinture ni stickers, nos tamis ont par essence un style inimitable.
                </li>
              </ul>
              <p className="text-graphite mt-4">
                En fin de vie le tamis de nos raquettes est entièrement remplaçable par un neuf dans notre atelier. Réparons avant de re-fabriquer !
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
          <div className="w-full h-full flex items-stretch">
            <Image
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//resine-bio.webp"
              alt="Micro-factory française Hexagon Padel"
              width={800}
              height={400}
              className="w-full h-auto max-h-64 object-cover rounded-sm"
            />
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