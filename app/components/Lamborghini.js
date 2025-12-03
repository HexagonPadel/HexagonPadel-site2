import Image from "next/image";

export default function Lamborghini() {
  return (
    <section className="section section-bright">
      <div className="section-inner">

        {/* Titre de section */}
        <h2 className="section-title">
          Des supercars aux raquettes de padel
        </h2>

        {/* Sous-titre */}
        <p className="section-subtitle mb-8">
          Le carbone forgé, inventé par Lamborghini, a ouvert la voie à des usages
          totalement nouveaux dans l’industrie composite.
        </p>

        {/* Layout 2 colonnes */}
        <div className="section-layout-split">

          {/* Colonne gauche (image) */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <Image
                src="/photos/lamborghini.webp"
                alt="Carbone forgé des supercars Lamborghini"
                width={960}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Colonne droite (texte) */}
          <div>
            <p className="section-paragraph">
              Le carbone forgé, inventé par Lamborghini, a ouvert la voie à de
              nombreux scénarios jusqu’ici inexplorés dans le monde composite
              industriel : géométrie intégrée, flexibilité maximale et cycles de
              moulage plus rapides. Mais surtout, une esthétique avant-gardiste
              qui a marqué le design automobile.
            </p>

            <p className="section-paragraph">
              Chez Hexagon Padel, nous avons adapté cette technologie pour la
              mettre au service des joueurs de padel : nos cadres en carbone
              forgé offrent un niveau de sophistication digne de l’automobile de
              prestige.
            </p>

            <p className="section-paragraph">
              Nous sommes aujourd’hui les seuls à maîtriser le carbone forgé et
              à l’appliquer au monde du padel pour améliorer à la fois la
              performance et le plaisir de jeu.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}