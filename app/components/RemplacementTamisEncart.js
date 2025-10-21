import React from 'react';

export default function RemplacementTamisEncart() {
  return (
    <section className="bg-blue-light rounded-lg px-6 py-3 space-y-3 border border-gray-200">
      <h2 className="max-w-3xl font-semibold">
        Service de remplacement du tamis
      </h2>

      {/* ÉTAPE 1 */}
      <div className="flex items-start gap-4">
      <div className="w-8 aspect-square min-w-8 flex items-center justify-center bg-slate-50 rounded-md mt-1">
          <svg className="w-4 h-4 text-blue-electric" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <div>
          <h3 className="text-graphite text-sm font-semibold">Commandez votre tamis</h3>
          <p className="text-gray-600 text-xs">Vous recevez un bon de livraison prépayé</p>
        </div>
      </div>
     
      {/* ÉTAPE 2 */}
      <div className="flex items-start gap-4">
      <div className="w-8 aspect-square min-w-8 flex items-center justify-center bg-slate-50 rounded-md mt-1">
          <svg className="w-4 h-4 text-blue-electric" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
            <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <div>
          <h3 className="text-graphite text-sm font-semibold">Renvoyez votre raquette</h3>
          <p className="text-gray-600 text-xs">Utilisez le bon de livraison pour un envoi gratuit</p>
        </div>
      </div>

      {/* ÉTAPE 3 */}
      <div className="flex items-start gap-4">
      <div className="w-8 aspect-square min-w-8 flex items-center justify-center bg-slate-50 rounded-md mt-1">
          <svg className="w-4 h-4 text-blue-electric" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 10.3a6.5 6.5 0 0 0-9.4-8.6l3.2 3.2-2 2-3.2-3.2a6.5 6.5 0 0 0 8.6 9.4l5.3 5.3a2 2 0 1 0 2.8-2.8l-5.3-5.3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-graphite text-sm font-semibold">Remplacement en atelier</h3>
          <p className="text-gray-600 text-xs">Nos experts s&apos;occupent de remplacer votre ancien tamis par le nouveau</p>
        </div>
      </div>

      {/* ÉTAPE 4 */}
      <div className="flex items-start gap-4">
      <div className="w-8 aspect-square min-w-8 flex items-center justify-center bg-slate-50 rounded-md mt-1">
          <svg className="w-4 h-4 text-blue-electric" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
            <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <div>
          <h3 className="text-graphite text-sm font-semibold">Retour gratuit</h3>
          <p className="text-gray-600 text-xs">Votre raquette vous est renvoyée sans frais</p>
        </div>
      </div>

      {/* Texte de conclusion */}
      <p className="text-xs text-graphite mt-6 text-blue-electric bg-blue-less-light rounded-lg px-4 py-2 ">
        Ce service exclusif est inclus dans le prix du tamis. Il reflète notre engagement pour la durabilité
        et la réparabilité de nos produits.
      </p>
    </section>
  );
}