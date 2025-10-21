// Objectif de cette page :
//Ce fichier-là, ne le lis surtout pas côté serveur (là où il n’y a pas de tiroirs localStorage) !Attends que le navigateur du visiteur ouvre le site. Là, tu pourras l’utiliser. 
//	•	CheckoutClient.js 👉 C’est une boîte spéciale que tu dis clairement : ➜ “C’est un fichier client uniquement” ("use client" en haut).

"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutClient() {
  const [panier, setPanier] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  const [clientInfo, setClientInfo] = useState({
    email: "",
    prenom: "",
    nom: "",
    adresse: "",
    codePostal: "",
    ville: "",
    pays: "",
  });

  const [billingInfo, setBillingInfo] = useState({ ...clientInfo });
  const [useBillingSameAsShipping, setUseBillingSameAsShipping] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") { // Assure-toi que le code s'exécute seulement dans le navigateur
      const panierStocke = localStorage.getItem("panier"); // Récupère la chaîne de texte (de type JSON) qui a été enregistrée dans localStorage sous la clé "panier".
      if (panierStocke) {
        setPanier(JSON.parse(panierStocke)); // Convertit la chaîne JSON en vrai tableau d'objets JavaScript grâce à JSON.parse(), puis stocke ce tableau dans le state panier.
      }
    }
  }, []);

  useEffect(() => {
    if (useBillingSameAsShipping) {
      setBillingInfo({ ...clientInfo });
    }
  }, [clientInfo, useBillingSameAsShipping]);

  const handleInputChange = (e) => setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  const handleBillingChange = (e) => setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });

  const calculerTotal = () => panier.reduce((total, produit) => total + produit.prix_total, 0);
  const calculerTVA = () => (calculerTotal() * 0.20).toFixed(2);

  const redirigerPanier = () => window.location.href = "/cart";
  const inputBase = "border border-gray-300 p-3 rounded-lg text-sm placeholder:text-sm placeholder:text-gray-400";

  return (

       <main className="bg-slate-50 min-h-screen pt-4 pb-6 px-6 md:pt-8 md:pb-12 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finalisation de votre commande</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
              <input
                type="email"
                name="email"
                value={clientInfo.email}
                onChange={handleInputChange}
                placeholder="Adresse email"
                className={`w-full ${inputBase}`}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="prenom" value={clientInfo.prenom} onChange={handleInputChange} placeholder="Prénom" className={inputBase} />
                <input type="text" name="nom" value={clientInfo.nom} onChange={handleInputChange} placeholder="Nom" className={inputBase} />
                <input type="text" name="adresse" value={clientInfo.adresse} onChange={handleInputChange} placeholder="Adresse" className={`col-span-2 ${inputBase}`} />
                <input type="text" name="codePostal" value={clientInfo.codePostal} onChange={handleInputChange} placeholder="Code postal" className={inputBase} />
                <input type="text" name="ville" value={clientInfo.ville} onChange={handleInputChange} placeholder="Ville" className={inputBase} />
                <input type="text" name="pays" value={clientInfo.pays} onChange={handleInputChange} placeholder="Pays" className={`col-span-2 ${inputBase}`} />
              </div>
            </div>

            {/* ✅ Section Facturation */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Adresse de facturation</h2>

              <label className="flex items-center mb-4 text-sm">
                <input
                  type="checkbox"
                  checked={useBillingSameAsShipping}
                  onChange={(e) => setUseBillingSameAsShipping(e.target.checked)}
                  className="form-checkbox mr-2 h-4 w-4 text-blue-600 rounded focus:ring-0"
                />
                Utiliser les mêmes informations que pour la livraison
              </label>

              {!useBillingSameAsShipping && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="prenom" value={billingInfo.prenom} onChange={handleBillingChange} placeholder="Prénom" className={inputBase} />
                  <input type="text" name="nom" value={billingInfo.nom} onChange={handleBillingChange} placeholder="Nom" className={inputBase} />
                  <input type="text" name="adresse" value={billingInfo.adresse} onChange={handleBillingChange} placeholder="Adresse" className={`col-span-2 ${inputBase}`} />
                  <input type="text" name="codePostal" value={billingInfo.codePostal} onChange={handleBillingChange} placeholder="Code postal" className={inputBase} />
                  <input type="text" name="ville" value={billingInfo.ville} onChange={handleBillingChange} placeholder="Ville" className={inputBase} />
                  <input type="text" name="pays" value={billingInfo.pays} onChange={handleBillingChange} placeholder="Pays" className={`col-span-2 ${inputBase}`} />
                </div>
              )}
            </div>
          </div>

          {/* Récapitulatif + Paiement */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Récapitulatif de la commande</h2>
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={redirigerPanier}
                >
                  Modifier
                </button>
              </div>

              <ul className="mb-4 text-sm text-gray-700">
                {panier.map((produit, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{produit.nom}</span>
                    <span>{produit.prix_total} €</span>
                  </li>
                ))}
              </ul>

              <hr className="border-t border-gray-300 mb-2" />

              <div className="flex justify-between text-sm mb-2">
                <span>Sous-total</span>
                <span>{calculerTotal()} €</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Livraison</span>
                <span>Offerte</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>TVA incl. (20%)</span>
                <span>{calculerTVA()} €</span>
              </div>

              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total final</span>
                <span>{calculerTotal()} €</span>
              </div>

              <input
                type="text"
                placeholder="Code promo"
                className={`w-full ${inputBase} p-2 mb-2`}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Informations de paiement</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm clientInfo={clientInfo} />
              </Elements>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}