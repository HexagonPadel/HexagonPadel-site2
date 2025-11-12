// This React component implements a Frequently Asked Questions (FAQ)
// section using the accordion primitives from the shadcn/ui library.
// It presents common objections raised by potential customers in an
// elegant, premium design. The section is responsive and uses
// Tailwind CSS utility classes for styling.

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * FAQ component rendered as an accordion. Each item can be expanded
 * independently to reveal its answer. The styling aims for a clean,
 * premium feel with soft shadows, rounded corners and neutral colors.
 */
export default function Faq() {
  // Array of questions and answers. Each entry represents one FAQ item.
  const items = [
    {
      question: "Vos raquettes sont‑elles vraiment performantes ?",
      answer:
        "Nos modèles sont testés et retestés par des joueurs passionnés, amateurs comme professionnels. Chaque raquette est fabriquée avec des fibres de carbone haut de gamme et soumise à un contrôle qualité rigoureux, pour garantir réactivité et durabilité."
    },
    {
      question: "Les cadres en carbone forgé ne risquent‑ils pas de casser ?",
      answer:
        "Le cadre en carbone forgé est conçu à partir de fibres courtes compactées à haute pression afin de créer une structure dense sans points faibles. Ce procédé rend la raquette plus rigide, plus réactive et capable d’absorber les chocs, tout en étant garantie pendant deux ans contre la casse."
    },
    {
      question: "Que se passe‑t‑il si le tamis s’use ou se casse ?",
      answer:
        "Grâce au système breveté de tamis remplaçable, seul le tamis est à changer en cas d’usure ou de casse. Vous conservez votre cadre et choisissez un nouveau tamis personnalisé, réduisant ainsi les coûts et l’impact environnemental."
    },
    {
      question: "Vos raquettes sont‑elles vraiment ‘Made in France’ ?",
      answer:
        "Oui : toutes nos raquettes sont fabriquées dans notre micro‑usine située à Clisson, en Loire‑Atlantique. Cela fait d’Hexagon Padel le seul fabricant français de raquettes de padel, soutenant ainsi l’économie locale et limitant les transports."
    },
    {
      question: "Votre démarche est‑elle écologique ?",
      answer:
        "Notre production émet environ 70 % de gaz à effet de serre en moins qu’une fabrication classique. Elle repose sur plus de 90 % de matériaux recyclés ou biosourcés, et nous n’utilisons ni peinture ni stickers pour préserver l’environnement."
    },
    {
      question: "Pourquoi le prix est‑il plus élevé que certaines marques asiatiques ?",
      answer:
        "Nos raquettes sont fabriquées en France avec des matériaux de haute qualité et un procédé innovant. Le système de production à la demande et la remplaçabilité du tamis permettent de proposer un prix juste en limitant les stocks et en réduisant le coût total sur la durée."
    },
    {
      question: "Quelle garantie proposez‑vous ?",
      answer:
        "Chaque raquette bénéficie d’une garantie de deux ans couvrant les défauts de matériaux et de fabrication dans le cadre d’une utilisation normale. En cas de problème avéré, nous procédons à un remplacement ou à une réparation."
    },
    {
      question: "Quand pourrai‑je commander une raquette ?",
      answer:
        "Nos raquettes sont actuellement en phase finale de test et d’industrialisation, avec une commercialisation prévue pour début 2026. Vous pouvez vous inscrire pour être informé(e) en avant‑première du lancement."
    },
  ];

  /// État indiquant quels items sont ouverts
  const [open, setOpen] = useState(() => items.map(() => false));

  const toggleItem = (index) => {
    setOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section className="w-full bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-gray-800">
          Questions fréquentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.question}
                </span>
                <ChevronDown
                  className={
                    open[index]
                      ? "h-6 w-6 text-gray-500 transform rotate-180 transition-transform duration-300"
                      : "h-6 w-6 text-gray-500 transform rotate-0 transition-transform duration-300"
                  }
                />
              </button>
              {open[index] && (
                <div className="border-t border-gray-200 px-6 pb-6 pt-4 text-gray-600 text-base leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}