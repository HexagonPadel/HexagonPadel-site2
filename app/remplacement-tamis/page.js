"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

export default function RemplacementTamisPage() {
  const [isMobile, setIsMobile] = useState(false);

  // Détecter la taille d’écran
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Étapes du service */
  const steps = [
    {
      step: "1",
      title: "Commandez votre nouveau tamis",
      description:
        "Sélectionnez dans notre configurateur le tamis compatible avec votre cadre et personnalisez-le selon vos envies.",
    },
    {
      step: "2",
      title: "Expédiez votre raquette",
      description:
        "Nous vous envoyons une étiquette prépayée afin d’expédier votre raquette dans nos ateliers en toute sécurité.",
    },
    {
      step: "3",
      title: "Remplacement en atelier",
      description:
        "Nos techniciens remplacent le tamis selon vos spécifications, avec le même soin que lors de la fabrication initiale.",
    },
    {
      step: "4",
      title: "Retour gratuit chez vous",
      description:
        "Votre raquette comme neuve est livrée directement chez vous, prête à reprendre le jeu.",
    },
  ];

  return (
    <section className="bg-white-ghost py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Bandeau principal */}
        <div className="text-center mb-10 fade-in">
          <span className="badge blue-badge mb-6 py-1.5 px-4 inline-block">
            Service exclusif - Remplacement de tamis
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Offrez une nouvelle vie à votre raquette Hexagon Padel
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto">
            Le tamis de votre raquette peut se détériorer au fil du temps : la
            mousse interne perd de sa réactivité, les fibres se fatiguent, et
            les performances globales diminuent.  
            Grâce à notre système unique, vous pouvez simplement remplacer le
            tamis sans racheter une nouvelle raquette.
          </p>
        </div>

        {/* Conseils d’entretien et de fréquence */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            Quand remplacer votre tamis ?
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-center">
            Pour les joueurs réguliers (2 à 3 sessions par semaine), nous
            recommandons un remplacement tous les <strong>12 à 18 mois</strong>.  
            Les signes d’usure incluent une <em>perte de puissance</em>, un{" "}
            <em>ressenti moins ferme</em> à la frappe, ou encore un{" "}
            <em>bruit de contact différent</em>.  
            Si vous ressentez ces symptômes, il est temps d’offrir une seconde
            vie à votre raquette.
          </p>
        </div>

        {/* Processus étape par étape */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-center mb-10">
            Comment ça fonctionne ?
          </h2>
          <div
            className={`grid ${
              isMobile ? "grid-cols-2 gap-4" : "grid-cols-4 gap-8"
            }`}
          >
            {steps.map(({ step, title, description }) => (
              <div
                key={step}
                className="how-it-works-card hover-lift rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm"
              >
                <div className="step-number text-3xl font-bold text-sky-600 mb-2">
                  {step}
                </div>
                <h4 className="font-serif text-lg mb-2">{title}</h4>
                <p className="text-slate-600 text-sm leading-snug">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder configurateur */}
        <div className="my-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Configurez votre nouveau tamis
          </h2>
          <p className="text-slate-600 mb-6">
            Sélectionnez le matériau, la couleur et les finitions de votre
            futur tamis.  
            (Le configurateur sera disponible prochainement.)
          </p>
          <div className="border-2 border-dashed border-slate-300 rounded-3xl py-20 bg-white text-slate-400">
            🧩 <em>Zone configurateur tamis — à venir</em>
          </div>
        </div>

        {/* Section durabilité */}
        <div className="fade-in text-center max-w-3xl mx-auto">
          <p className="text-slate-700 text-base md:text-lg mb-6">
            Ce service reflète notre engagement envers la{" "}
            <strong>durabilité</strong> et la{" "}
            <strong>fabrication responsable en France</strong>.  
            En remplaçant uniquement le tamis, vous prolongez la vie de votre
            raquette tout en réduisant l’impact environnemental.
          </p>
          <Link href="/engagements" className="btn-hero inline-block">
            En savoir plus sur notre démarche
          </Link>
        </div>
      </div>
    </section>
  );
}