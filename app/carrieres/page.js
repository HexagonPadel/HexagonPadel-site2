import React from 'react';

// Cette page présente la section carrière de notre site. Elle est volontairement générale
// pour accueillir les candidatures spontanées et refléter l’esprit premium et sobre de Hexagon Padel.
// Aucun poste spécifique n’est proposé pour le moment, mais nous restons à l’écoute des talents.
export default function carrières() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <main className="w-full max-w-5xl px-6 py-20">
        <h1 className="text-4xl font-semibold mb-6">
          Rejoignez notre aventure Hexagon Padel
        </h1>
        <p className="mb-4 text-lg leading-relaxed">
          Chez&nbsp;Hexagon Padel, nous sommes convaincus que ce sont les femmes et les hommes
          derrière nos raquettes qui font notre force. Même en l’absence d’offres d’emploi
          précises, nous restons constamment à la recherche de talents pour nous aider à grandir,
          innover et promouvoir le savoir‑faire Made in France.
        </p>
        <p className="mb-8 text-lg leading-relaxed">
          Que vous soyez expert·e du marketing, de la conception, de la fabrication, de la logistique
          ou simplement passionné·e par le sport et l’artisanat français, n’hésitez pas à nous faire
          part de votre intérêt.
        </p>
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-medium mb-3">Candidature spontanée</h2>
          <p className="mb-6 text-base leading-relaxed">
            Vous partagez nos valeurs et souhaitez contribuer à notre mission&nbsp;? Envoyez‑nous votre
            CV et une lettre de motivation en expliquant ce qui vous anime. Nous étudierons avec
            attention votre demande et reviendrons vers vous si votre profil correspond à nos
            besoins futurs.
          </p>
          {/* Utilisez un lien interne vers la page de contact de votre site pour rediriger les candidatures. */}
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </main>
    </div>
  );
}

