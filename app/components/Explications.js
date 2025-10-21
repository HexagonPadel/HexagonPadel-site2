import { useEffect, useState } from "react";

export default function Explications() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content = {
    intro:
      "Tous nos modèles sont en forme de goutte d’eau et sont destinés à des joueurs de niveau intermédiaire à avancé.",
    frame:
      "Nous privilégions la fibre de carbone à la fibre de verre pour combiner solidité et légèreté, pour notre cadre et nos tamis.",
    benefits: [
      {
        title: "Puissance",
        description: (
            <>
              La fibre de carbone est <strong>5x plus rigide</strong> que la fibre de verre, permettant de mieux restituer l’énergie lors des frappes, et offrant ainsi un jeu plus explosif lors des coups offensifs.
            </>
          ),
         },
      {
        title: "Durabilité",
        description:(
            <>
          Le carbone transmet mieux les contraintes mécaniques à la résine, il <strong>limite l’apparition de microfissures</strong> qui fragilisent le tamis dans le temps, même en usage intensif.
          </>
      ),
        },
      {
        title: "Légèreté",
        description:(
            <>
          La fibre de carbone est <strong>40% plus légère</strong> que la fibre de verre. Nos cadres ajourés sont beaucoup plus fins que les cadres traditionnels, ce qui améliore grandement la maniabilité de la raquette.
          </>
      ),
        },
      {
        title: "Esthétique",
        description:(
            <>
          Les fibres de carbone apparentes dans notre cadre et sur les tamis des versions Puissance donnent un aspect élégant et unique avec des <strong>reflets chatoyants</strong> sous la lumière.
          </>
      ),
        },
    ],
    visuals: [
      {
        img: "https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Why%20carbon/non-woven.webp",
        caption: 'Fibres de carbone non tissées et recyclées, utilisée <strong>sur tous les tamis</strong>',
      },
      {
        img: "https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Why%20carbon/large-chopped-e1735836661624.webp",
        caption: "Larges lames de carbone 12K utilisée pour <strong>rajouter de la puissance</strong>",
      },
      {
        img: "https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Why%20carbon/fin%20chopped.webp",
        caption: "Fins torons de carbone 12K pour <strong>rajouter de la puissance</strong>. Egalement utilisés pour fabriquer nos cadres en carbone forgé",
      },
    ],
  };

  const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${className}`}>{children}</h2>
  );

  const Card = ({ title, children }) => (
    <div className="rounded-sm  p-5 shadow-md bg-gray-200">
      <h4 className="text-lg font-bold mb-2 text-graphite">{title}</h4>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
  const VisualCard = ({ img, caption }) => (
    <div className="flex flex-col w-full max-w-full">
      <img src={img} alt={caption} className="w-full aspect-[4/3] object-cover" />
      <div
  className="p-2 text-sm text-gray-400 leading-tight text-justify"
  dangerouslySetInnerHTML={{ __html: caption }}
/>
    </div>
  );

  const VisualsGrid = () => (
    <div className="flex flex-row gap-4 mb-8 w-full">
      {content.visuals.map((v, i) => (
        <div key={i} className="flex-1 min-w-0 max-w-[33.3333%]">
          <VisualCard img={v.img} caption={v.caption} />
        </div>
      ))}
    </div>
  );

  const CarbonEncart = () => (
    <div className="">
      <h3 className="text-xl font-bold mb-4 text-white">
        Pourquoi le carbone est-il plus qualitatif que la fibre de verre ?
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
        {content.benefits.map((b, i) => (
          <Card key={i} title={b.title}>
            {b.description}
          </Card>
        ))}
      </div>
    </div>
  );

  const MobileLayout = () => (
    <section className="bg-black px-4 py-10 rounded-sm mb-4">
      
      <div className="max-w-xl mx-auto">
        <SectionTitle className="text-white">Fibre de carbone exclusivement</SectionTitle>
        <p className="mb-4 text-gray-400">{content.frame}</p>
        <VisualsGrid />
        <p className="mb-4 text-gray-400">{content.intro}</p>
        <CarbonEncart />
      </div>
    </section>
  );

  const DesktopLayout = () => (
    <section className="bg-black px-20 py-20 mb-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle className="text-white">Fibre de carbone exclusivement</SectionTitle>
        <p className="mb-4 text-gray-400">{content.frame}</p>
        <VisualsGrid />
        <p className="mb-4 text-gray-400">{content.intro}</p>
        <CarbonEncart />
      </div>
    </section>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}