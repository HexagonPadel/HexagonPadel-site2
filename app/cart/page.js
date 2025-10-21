"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const [panier, setPanier] = useState([]);
  const router = useRouter(); //Ds NextJS Elle te permet de naviguer dynamiquement dans l’application ou de lire/modifier des informations d’URL.

  useEffect(() => {
    const panierStocke = localStorage.getItem("panier"); //👉 On lit dans le localStorage du navigateur la clé "panier" : C’est là que tu as stocké les produits ajoutés au panier.
    if (panierStocke) { //👉 Si un panier est bien trouvé dans le localStorage (non null), on passe à l’étape suivante.
      setPanier(JSON.parse(panierStocke));//👉 On convertit la chaîne JSON du localStorage en tableau d’objets JavaScript avec JSON.parse(...), puis on la stocke dans l’état local panier via setPanier(...).
    }
  }, []);

  const calculerTotal = () => {
    return panier.reduce((total, produit) => total + produit.prix_total, 0);
    //👉 On parcourt le tableau panier, et on additionne les prix_total de chaque produit.
  };

  const supprimerProduit = (indexASupprimer) => {
    const nouveauPanier = panier.filter((_, index) => index !== indexASupprimer);
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    window.dispatchEvent(new Event("panierModifie"));
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>

      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="space-y-6">
          {panier.map((produit, index) => (
            <div key={index} className="p-4 bg-slate-50">
              <div className="md:flex gap-4">
                {produit.photo_principale && (
                  <Image
                    src={produit.photo_principale}
                    alt={produit.nom}
                    width={96}
                    height={96}
                    className="object-cover rounded mb-2 md:mb-0"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {produit.type_produit === "tamis"
                      ? `Remplacement de Tamis - ${produit.nom}`
                      : produit.type_produit === "complete"
                      ? `Raquette ${produit.nom}`
                      : produit.nom}
                  </h2>

                  {/* Badge précommande */}
                  {/*
                  {produit.precommande && (
                    <p className="text-xs text-blue-600 font-semibold mt-1">
                      Produit en précommande
                    </p>
                  )}*/}

                  <p className="text-sm mt-1">
                    Prix de base :{" "}
                    {produit.type_produit === "tamis"
                      ? `${produit.prix_tamis_seul || "?"} €`
                      : `${produit.tarif_base} €`}
                  </p>

                  {produit.options_selectionnees?.length > 0 && (
                    <div className="mt-2">
                      <h3 className="font-semibold text-md mb-1">Options :</h3>
                      <ul className="space-y-1">
                        {produit.options_selectionnees.map((option, i) => (
                          <li key={i} className="flex justify-between text-sm text-gray-700">
                            <span>{option.nom}</span>
                            <span>+ {option.prix} €</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {produit.couleurs_selectionnees && (
                    <div className="mt-2">
                      <h3 className="font-semibold text-md mb-1">Couleurs : + {produit.prix_personnalisation_couleur} €</h3>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>Logo : <span className="font-semibold">{produit.couleurs_selectionnees.logo || "Tricolore"}</span></li>
                        <li>Fibres : <span className="font-semibold">{produit.couleurs_selectionnees.fibres || "Aucune"}</span></li>
                        <li>Paillettes : <span className="font-semibold">{produit.couleurs_selectionnees.paillettes || "Aucune"}</span></li>
                      </ul>
                    </div>
                  )}

                  {produit.texte_gravure && (
                    <div className="mt-2">
                      <h3 className="font-semibold text-md mb-1">Gravure : + {produit.prix_gravure} €</h3>
                      <p className="text-sm text-gray-700">&quot;{produit.texte_gravure}&quot;</p>
                    </div>
                  )}

                  <p className="mt-2 text-right font-semibold">
                    Total produit : {produit.prix_total} €
                  </p>

                  <div className="text-right mt-2">
                    <button
                      onClick={() => supprimerProduit(index)}
                      className="text-red-900 hover:text-red-800 text-sm"
                    >
                      Supprimer cet article
                    </button>
                  </div>
                </div>
              </div>

              {/* Ligne de séparation entre les produits */}
              {index < panier.length - 1 && (
                <div className="border-t border-gray-200 mt-4" />
              )}
            </div>
          ))}

          {/* Ligne de séparation */}
          <div className="border-t border-gray-200 -mt-4" />

          {/* Sous-total */}
          <div className="flex justify-between text-sm font-semibold text-graphite -mt-4">
            <span>Sous-total</span>
            <span>{calculerTotal()} €</span>
          </div>

          {/* Livraison */}
          <div className="flex justify-between text-sm -mt-2">
            <span className="text-graphite-light">Livraison</span>
            <span className="text-graphite-light">Offerte</span>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 mt-4" />
          <div className="flex justify-between text-sm font-semibold text-graphite mt-2 text-lg">
            <span>Total</span>
            <span>{calculerTotal()} €</span>
          </div>

          {/* Bouton commander */}
          <div className="mt-6 text-center">
            <button
              className="btn-hero"
              onClick={() => {
                const contientPrecommande = panier.some((produit) => produit.precommande === true); //renvoie vers precommande si un produit est en precommande
                if (contientPrecommande) {
                  router.push("/precommande");
                } else {
                  router.push("/checkout");
                }
              }}
            >
              Commander
            </button>
          </div>
        </div>
      )}
    </main>
  );
}