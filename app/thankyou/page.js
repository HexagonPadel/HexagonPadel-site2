"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function PaymentSuccessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({
    motivations: [],
    canal: "",
  });

  return (
    <Suspense fallback={<div>Chargement des données...</div>}>
      <PaymentSuccessContent 
        submitted={submitted} 
        setSubmitted={setSubmitted} 
        answers={answers} 
        setAnswers={setAnswers} 
      />
    </Suspense>
  );
}

function PaymentSuccessContent({ submitted, setSubmitted, answers, setAnswers }) {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");

  const motivationsList = [
    "Le tamis remplaçable",
    "Les matériaux recyclés",
    "La performance de la raquette",
    "Le rapport qualité / prix",
    "Le 100% fabriqué en France",
    "L'esthétique unique de la raquette",
  ];

  const canalList = [
    "Bouche à oreille",
    "Réseaux sociaux (Instagram / Facebook / Linkedin / TikTok)",
    "Démonstration en club",
    "Presse généraliste",
    "Presse spécialisée padel",
    "Site e-commerce partenaire",
    "Recherche internet (référencement naturel)",
    "Publicité en ligne",
  ];

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      console.log("Email récupéré :", email);
    }
  }, []);

  const handleMotivationChange = (value) => {
    setAnswers((prev) => {
      const alreadySelected = prev.motivations.includes(value);
      return {
        ...prev,
        motivations: alreadySelected
          ? prev.motivations.filter((item) => item !== value)
          : [...prev.motivations, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const email = localStorage.getItem("email");
    const aspects = answers.motivations.join(', ');
    const publicité = answers.canal;


                // 🕓 Date à l'heure de Paris (format ISO)
                const dateParisISO = new Date().toLocaleString("sv-SE", {
                  timeZone: "Europe/Paris",
                  hour12: false,
                }).replace(' ', 'T'); // format 'YYYY-MM-DDTHH:mm:ss'


    const { data, error } = await supabase
      .from('output_thankyou')
      .insert([
        {
          email,
          aspects,
          publicite: publicité,
          date_thankyou: dateParisISO, // ← champ à ajouter dans Supabase
        },
      ]);

    if (error) {
      console.error("Erreur lors de l'insertion dans Supabase:", error.message);
    } else {
      console.log("Réponses enregistrées dans Supabase:", data);
    }

    console.log("Réponses QCM :", answers);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

        {/* Formulaire QCM */}
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-4">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-graphite-dark text-center">
                Merci pour votre (pré-)commande !
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-center text-graphite">
                  Aidez-nous à mieux cerner vos attentes en répondant à ces questions
                </p>

                {/* QCM motivations */}
                <div>
                  <p className="text-copper-light mb-2 font-bold">
                    Quels aspects des nos raquettes vous ont convaincu ?
                  </p>
                  <div className="space-y-2">
                    {motivationsList.map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value={item}
                          checked={answers.motivations.includes(item)}
                          onChange={() => handleMotivationChange(item)}
                          className="form-checkbox rounded-full h-4 w-4 accent-blue-500 focus:ring-0"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Canal d'acquisition */}
                <div>
                  <p className="text-copper-light mb-2 font-bold">
                    Comment avez-vous connu Hexagon Padel ?
                  </p>
                  <div className="space-y-2">
                    {canalList.map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="canal"
                          value={item}
                          checked={answers.canal === item}
                          onChange={() => setAnswers((prev) => ({ ...prev, canal: item }))}
                          className="form-radio rounded-full h-4 w-4 accent-blue-500 focus:ring-0"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bouton */}
                <button type="submit" className="btn-hero">
                  Soumettre mes réponses
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="text-copper-light font-semibold text-lg">
                Merci pour vos réponses
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Elles nous aident à nous améliorer.
              </p>
            </div>
          )}
        </div>

        {/* Facture PDF */}
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-graphite-dark text-center">Votre facture</h2>
          {pdfUrl ? (
            <>
              <div className="text-center">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 inline-block bg-black text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Télécharger ma facture
                </a>
              </div>
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                className="border rounded-lg"
              />
            </>
          ) : (
            <p className="text-gray-500 text-center">Aucune facture disponible.</p>
          )}
        </div>

      </div>
    </div>
  );
}