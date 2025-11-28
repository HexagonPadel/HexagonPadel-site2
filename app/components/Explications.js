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
    frame:
      "Bien que 10x plus chère, nous privilégions la fibre de carbone à la fibre de verre pour combiner solidité et légèreté, pour notre cadre comme nos tamis.",
    benefits: [
      {
        title: "Puissance",
        description: (
          <>
            La fibre de carbone est <strong>5x plus rigide</strong> que la fibre
            de verre, permettant de mieux restituer l’énergie lors des frappes,
            et offrant ainsi un jeu plus explosif lors des coups offensifs.
          </>
        ),
      },
      {
        title: "Durabilité",
        description: (
          <>
            Le carbone transmet mieux les contraintes mécaniques à la résine, il{" "}
            <strong>limite l’apparition de microfissures</strong> qui
            fragilisent le tamis dans le temps, même en usage intensif.
          </>
        ),
      },
      {
        title: "Légèreté",
        description: (
          <>
            La fibre de carbone est <strong>40% plus légère</strong> que la
            fibre de verre. Nos cadres ajourés sont beaucoup plus fins que les
            cadres traditionnels, ce qui améliore grandement la maniabilité de
            la raquette.
          </>
        ),
      },
      {
        title: "Esthétique",
        description: (
          <>
            Les fibres de carbone apparentes dans notre cadre et sur les tamis
            des versions Puissance donnent un aspect élégant et unique avec des{" "}
            <strong>reflets chatoyants</strong> sous la lumière.
          </>
        ),
      },
    ],
    visuals: [
      {
        img: "https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Why%20carbon/non-woven.webp",
        caption:
          'Fibres de carbone non tissées et recyclées, utilisée <strong>sur tous les tamis</strong>',
      },
      {
        img: "https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Why%20carbon/large-chopped-e1735836661624.webp",
        caption:
          "Larges lames de carbone 12K utilisée pour <strong>rajouter de la puissance</strong>",
      },
      {
        img: "https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Why%20carbon/fin%20chopped.webp",
        caption:
          "Fins torons de carbone 12K pour <strong>rajouter de la puissance</strong>. Egalement utilisés pour fabriquer nos cadres en carbone forgé",
      },
    ],
  };

  /* ======== CARDS ======== */

  const Card = ({ title, children }) => (
    <div className="rounded-sm p-5 shadow-md bg-gray-200">
      <h4 className="text-lg font-bold mb-2 text-black">{title}</h4>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );

  const VisualCard = ({ img, caption }) => (
    <div className="flex flex-col w-full max-w-full">
      <img src={img} alt="" className="w-full aspect-[4/3] object-cover" />
      <div
        className="p-2 text-sm text-white-muted leading-tight text-justify"
        dangerouslySetInnerHTML={{ __html: caption }}
      />
    </div>
  );

  const VisualsGrid = () => (
    <div className="grid gap-4 mb-8 w-full md:grid-cols-3">
      {content.visuals.map((v, i) => (
        <VisualCard key={i} img={v.img} caption={v.caption} />
      ))}
    </div>
  );

  const CarbonEncart = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">
        Pourquoi le carbone est-il plus qualitatif que la fibre de verre ?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {content.benefits.map((b, i) => (
          <Card key={i} title={b.title}>
            {b.description}
          </Card>
        ))}
      </div>
    </div>
  );

  /* ======== MOBILE ======== */

  const MobileLayout = () => (
    <section
      className="section section--dark mb-4"
      style={{
        backgroundImage: 'url("/photos/carbon-texture.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      <div className="section-inner max-w-xl">
        <h2 className="section-title">Fibre de carbone exclusivement</h2>
        <p className="section-subtitle mb-6">{content.frame}</p>

        <VisualsGrid />

        <CarbonEncart />
      </div>
    </section>
  );

  /* ======== DESKTOP ======== */

  const DesktopLayout = () => (
    <section
      className="section section--dark mb-4"
      style={{
        backgroundImage: 'url("/photos/carbon-texture.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      <div className="section-inner max-w-5xl">
        <h2 className="section-title">Fibre de carbone exclusivement</h2>
        <p className="section-subtitle mb-6">{content.frame}</p>

        <VisualsGrid />

        <CarbonEncart />
      </div>
    </section>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}