"use client";
import Link from 'next/link';

export default function PaymentFail() {

  return (
      <div className="flex justify-center items-center min-h-screen bg-red-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Paiement annulé</h1>
          <p className="text-lg mb-8">Votre paiement a été annulé. Si vous avez des questions, contactez notre support.</p>

            <Link href="/path" className="bg-red-500 text-white rounded-lg py-2 px-6 hover:bg-red-600 transition">Retour à la page d&apos;accueil</Link>

        </div>
      </div>
    );
  


}