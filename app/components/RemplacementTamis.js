import { useState, useEffect } from "react";

// Composant principal RemplacementTamis
export default function RemplacementTamis() {
  const [isMobile, setIsMobile] = useState(false);

  // Hook pour détecter la taille de l'écran et définir le rendu mobile/desktop
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // breakpoint mobile < 768px
    }
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      step: "1",
      title: "Commandez votre tamis",
      description: "Sélectionnez le tamis compatible avec votre raquette",
    },
    {
      step: "2",
      title: "Recevez un bon prépayé",
      description: "Nous vous envoyons une étiquette pour l'expédition de votre raquette",
    },
    {
      step: "3",
      title: "Remplacement en atelier",
      description: "Nos experts remplacent le tamis avec vos personnalisations",
    },
    {
      step: "4",
      title: "Livraison offerte",
      description: "Votre raquette comme neuve est livrée directement chez vous",
    },
  ];

  // Rendu mobile
  function renderMobile() {
    return (
      <section className="bg-white-ghost py-6 px-4">
        <div className="container-custom-mobile">
          <div className="fade-in mb-6 text-center">
            <span className="badge blue-badge mb-6 py-1.5 px-4 inline-block">
              Service exclusif - Remplacement de tamis
            </span>
            <h1 className="text-2xl font-bold mb-4">
              Déjà client ? Offrez une nouvelle vie à votre raquette Hexagon Padel !
            </h1>
            <p className="text-graphite text-base mb-4">
              Notre service de remplacement de tamis vous permet de conserver votre raquette préférée 
              tout en lui donnant un nouveau look ou en optimisant ses performances.
            </p>
            <span className="inline-flex items-center text-accent font-medium text-base mb-6">
              Changez de style. Restez fidèle à votre raquette.
            </span>
          </div>

          <h3 className="text-2xl font-serif text-center mb-10">Comment ça fonctionne</h3>

          <div className="grid grid-cols-2 gap-4">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="how-it-works-card hover-lift mb-6 p-4 rounded">
                <div className="step-number">{step}</div>
                <h4 className="font-serif text-lg text-center mb-2">{title}</h4>
                <p className="text-graphite text-center text-sm">{description}</p>
              </div>
            ))}
          </div>

          <div id="replacementMeshes" className="mesh-grid-mobile my-6">
            {/* Produits tamis mobile */}
          </div>

          <div className="fade-in mt-4 text-center">
            <p className="text-graphite text-base mb-4 px-2">
              Ce service exclusif témoigne de notre engagement pour la durabilité et notre volonté 
              de vous offrir une expérience premium tout au long de la vie de votre raquette.
            </p>
            <a href="/engagements" className="btn-hero">
              En savoir plus sur notre démarche
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Rendu desktop
  function renderDesktop() {
    return (
      <section className="bg-white-ghost py-10 px-20">
        <div className="container-custom">
          <div className="fade-in mb-4 text-center">
            <span className="badge blue-badge mb-6 py-1.5 px-4">
              Service exclusif - Remplacement de tamis
            </span>
            <h1 className="text-4xl font-bold mb-6">
              Déjà client ? Offrez une nouvelle vie à votre raquette Hexagon Padel !
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-graphite text-lg mb-4">
                Notre service de remplacement de tamis vous permet de conserver votre raquette préférée 
                tout en lui donnant un nouveau look ou en optimisant ses performances.
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center text-accent font-medium text-xl mb-4">
                  Changez de style. Restez fidèle à votre raquette.
                </span>
              </div>
            </div>
          </div>

          <div className="fade-in mb-4">
            <h3 className="text-2xl font-serif text-center mb-10">Comment ça fonctionne</h3>
            <div className="how-it-works-grid">
              {steps.map(({ step, title, description }) => (
                <div key={step} className="how-it-works-card hover-lift">
                  <div className="step-number">{step}</div>
                  <h4 className="font-serif text-lg text-center mb-2">{title}</h4>
                  <p className="text-graphite text-center text-sm">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="replacementMeshes" className="mesh-grid">
            {/* Produits tamis desktop */}
          </div>

          <div className="fade-in mt-12 text-center">
            <p className="text-graphite text-lg mb-4">
              Ce service exclusif témoigne de notre engagement pour la durabilité et notre volonté 
              de vous offrir une expérience premium tout au long de la vie de votre raquette.
            </p>
            <a href="/engagements" className="btn-hero">
              En savoir plus sur notre démarche
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Retourne le rendu selon la taille d'écran
  return isMobile ? renderMobile() : renderDesktop();
}