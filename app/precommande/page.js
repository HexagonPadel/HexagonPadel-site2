"use client";
import { useRouter } from "next/navigation"; // ✅ Import du router
import { useState } from "react";
import { supabase } from '../../lib/supabase';

export default function Precommande() {
  const [email, setEmail] = useState("");
  const [veutTester, setVeutTester] = useState(false);
  const [nomPrenom, setNomPrenom] = useState("");
  const [departement, setDepartement] = useState("");
  const [showMerci, setShowMerci] = useState(false); //notification
  const router = useRouter();


// 🔁 Récupération des produits du panier localStorage
const getPanier = () => {
    if (typeof window === "undefined") return [];
    try {
      const panier = localStorage.getItem("panier");
      return panier ? JSON.parse(panier) : [];
    } catch (err) {
      console.error("Erreur lecture panier:", err);
      return [];
    }
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        console.log("Email:", email);
        console.log("Souhaite tester :", veutTester);
        if (veutTester) {
          console.log("Nom et prénom :", nomPrenom);
          console.log("Département :", departement);
        }
      
            // 🧠 Récupération et formatage du panier
            const panier = getPanier();
            const formatProduits = panier.map((item) => {
            const type = item.type_produit;
            const nom = item.nom || "Produit inconnu";
            const logo = item.couleurs_selectionnees.logo;
            const fibres = item.couleurs_selectionnees.fibres;
            const paillettes = item.couleurs_selectionnees.paillettes;
            const gravure = item.texte_gravure;
            const prix = item.prix_total ? `${item.prix_total.toFixed(2)}€` : "0.00€";
            return `${type};${nom}; ${logo};${fibres};${paillettes};${gravure}; ${prix}`;
            }).join(" | "); // ou "\n" pour retour ligne

            // 💾 Insertion dans Supabase

                // 🕓 Date à l'heure de Paris (format ISO)
              const dateParisISO = new Date().toLocaleString("sv-SE", {
                timeZone: "Europe/Paris",
                hour12: false,
              }).replace(' ', 'T'); // format 'YYYY-MM-DDTHH:mm:ss'

            const { error } = await supabase.from('output_precommandes').insert([
            {
                email: email,
                testeur: veutTester,
                nom: nomPrenom || null,
                departement: departement || null,
                produits: formatProduits || null,
                date_precommande: dateParisISO, // ← champ à ajouter dans Supabase
            }
            ]);
      
        if (error) {
          console.error("Erreur lors de l'insertion Supabase :", error.message);
          return;
        }
      
        // 📧 Calcul du total et envoi d’email à toi-même
            const montantTotal = panier.reduce((acc, item) => acc + (item.prix_total || 0), 0);

            try {
            await fetch('/api/send-email-notif-precommande', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                produits: panier.map(p => p.nom).join(', '),
                montantTotal,
                email,
                nomPrenom
                }),
            });
            } catch (e) {
            console.error("Erreur lors de l'envoi d'email :", e);
            }

                // ✅ Redirection vers la page thankyou après succès
                localStorage.setItem("email", email);//garde en memoire l'email pour la page thankyou
                router.push("/thankyou");

        setShowMerci(true);
        setTimeout(() => setShowMerci(false), 6000);
      
        setEmail("");
        setVeutTester(false);
        setNomPrenom("");
        setDepartement("");
      };

  const departements = [
    "01 - Ain", "02 - Aisne", "03 - Allier", "04 - Alpes-de-Haute-Provence", "05 - Hautes-Alpes",
    "06 - Alpes-Maritimes", "07 - Ardèche", "08 - Ardennes", "09 - Ariège", "10 - Aube",
    "11 - Aude", "12 - Aveyron", "13 - Bouches-du-Rhône", "14 - Calvados", "15 - Cantal",
    "16 - Charente", "17 - Charente-Maritime", "18 - Cher", "19 - Corrèze", "2A - Corse-du-Sud",
    "2B - Haute-Corse", "21 - Côte-d'Or", "22 - Côtes-d'Armor", "23 - Creuse", "24 - Dordogne",
    "25 - Doubs", "26 - Drôme", "27 - Eure", "28 - Eure-et-Loir", "29 - Finistère",
    "30 - Gard", "31 - Haute-Garonne", "32 - Gers", "33 - Gironde", "34 - Hérault",
    "35 - Ille-et-Vilaine", "36 - Indre", "37 - Indre-et-Loire", "38 - Isère", "39 - Jura",
    "40 - Landes", "41 - Loir-et-Cher", "42 - Loire", "43 - Haute-Loire", "44 - Loire-Atlantique",
    "45 - Loiret", "46 - Lot", "47 - Lot-et-Garonne", "48 - Lozère", "49 - Maine-et-Loire",
    "50 - Manche", "51 - Marne", "52 - Haute-Marne", "53 - Mayenne", "54 - Meurthe-et-Moselle",
    "55 - Meuse", "56 - Morbihan", "57 - Moselle", "58 - Nièvre", "59 - Nord",
    "60 - Oise", "61 - Orne", "62 - Pas-de-Calais", "63 - Puy-de-Dôme", "64 - Pyrénées-Atlantiques",
    "65 - Hautes-Pyrénées", "66 - Pyrénées-Orientales", "67 - Bas-Rhin", "68 - Haut-Rhin", "69 - Rhône",
    "70 - Haute-Saône", "71 - Saône-et-Loire", "72 - Sarthe", "73 - Savoie", "74 - Haute-Savoie",
    "75 - Paris", "76 - Seine-Maritime", "77 - Seine-et-Marne", "78 - Yvelines", "79 - Deux-Sèvres",
    "80 - Somme", "81 - Tarn", "82 - Tarn-et-Garonne", "83 - Var", "84 - Vaucluse",
    "85 - Vendée", "86 - Vienne", "87 - Haute-Vienne", "88 - Vosges", "89 - Yonne",
    "90 - Territoire de Belfort", "91 - Essonne", "92 - Hauts-de-Seine", "93 - Seine-Saint-Denis",
    "94 - Val-de-Marne", "95 - Val-d'Oise", "971 - Guadeloupe", "972 - Martinique", "973 - Guyane",
    "974 - La Réunion", "976 - Mayotte"
  ];

  return (
    <>
      {/* Notification "Merci" */}
      {showMerci && (
        <div className="fixed top-20 right-6 bg-[#e8f0ff] text-gray-900 border border-gray-300 rounded-xl shadow-lg px-6 py-4 z-50 flex items-center gap-3 font-sans animate-fade-in-out">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">
            Merci ! Vous serez informé en avant-première du lancement.
          </span>
        </div>
      )}

      {/* Formulaire */}
      <main className="max-w-xl mx-auto p-6 text-center">
        
      <span className="badge blue-badge mb-6 py-1.5 px-4 inline-block">
          Precommandes
        </span>

        <p className="text-lg mb-6">
          Nos raquettes sont actuellement en dernière phase de test.
          Leur commercialisation débutera prochainement.
        </p>

        <p className="mb-4 font-medium">
          Laissez votre adresse e-mail pour profiter d’une <strong>remise exclusive de -15%</strong> lors du lancement officiel.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <label className="block">
            <span className="text-sm font-medium">Adresse e-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={veutTester}
              onChange={(e) => setVeutTester(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">
              Je souhaite participer aux sessions de test des raquettes
            </span>
          </label>

          {veutTester && (
            <>
              <label className="block">
                <span className="text-sm font-medium">Nom et prénom</span>
                <input
                  type="text"
                  required
                  value={nomPrenom}
                  onChange={(e) => setNomPrenom(e.target.value)}
                  placeholder="Jean Dupont"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Département</span>
                <select
                  required
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Sélectionnez un département</option>
                  {departements.map((dep) => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          <button type="submit" className="btn-hero w-full mt-4">
            M’inscrire à la liste d’attente
          </button>
        </form>
      </main>
    </>
  );
}