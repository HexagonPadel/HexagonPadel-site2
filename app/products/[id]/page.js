"use client";
import { use, useEffect, useState } from "react"; // Importation du hook useState
import { supabase } from "../../../lib/supabase"; // Importation de la configuration de Supabase
import Reassurance from "../../components/Reassurance"; // Composant Reassurance
import RemplacementTamisEncart from "../../components/RemplacementTamisEncart"; // Composant RemplacementTamisEncart
import Header from "../../components/Header"; // Composant Header
import Footer from "../../components/Footer"; // Composant Footer
import '../../globals.css' // Importation du fichier CSS
import Link from "next/link";
import Image from "next/image";


// Utilisation de l'URL du fichier "tricolore.svg" dans le dossier logos-icons sur Supabase
const tricoloreLogoUrl = `https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/logos-icons/tricolore.svg`;
const noneUrl = `https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/logos-icons/none.svg`;

export default function ProductDetail({ params }) {
  
  const [produit, setProduit] = useState(null);//récupérer le produit  
  const [showNotif, setShowNotif] = useState(false);// Notification pour l'ajout au panier
  const { id } = use(params);// Récupération de l'id de la page
  const [photoPrincipale, setPhotoPrincipale] = useState(null); // Récupération de la photo principale
  const [photoSecondaires, setPhotoSecondaires] = useState([]); // Nouvel état pour les photos secondaires
  const [tarifsOptions, setTarifsOptions] = useState({});//prix des options
  const [typeProduit, setTypeProduit] = useState("");
  const [erreurTypeProduit, setErreurTypeProduit] = useState(false);
  const [photosChargees, setPhotosChargees] = useState(false);// N'affiche pas les photos si elles ne sont pas chargées
  
  //couleurs disponibles pour les options
  const [couleursDisponibles, setCouleursDisponibles] = useState({
    logo: [],
    fibres: [],
    paillettes: [],
  });

  // Initialisation de l'état avec un logo par défaut "Tricolore" et fibres et paillettes par défaut "Aucune"
  const [selectionCouleurs, setSelectionCouleurs] = useState({
    logo: "Tricolore", // Valeur par défaut pour la couleur du logo
    fibres: "Aucune",
    paillettes: "Aucune",
  });

  // Nouvel état pour le texte de la gravure
  const [gravureTexte, setGravureTexte] = useState("");


// Étape 1 : Récupérer le produit depuis Supabase
useEffect(() => {
  async function fetchProductDetails() {
    const { data, error } = await supabase
      .from("input_catalogue_produits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur de récupération du produit", error);
    } else {
      setProduit(data);
    }
  }

  fetchProductDetails();
}, [id]);

//charger le tarif des options
useEffect(() => {
  async function fetchTarifsOptions() {
    const { data, error } = await supabase.from("input_prix_options").select("*");

    if (error) {
      console.error("Erreur récupération prix options :", error);
      return;
    }

    // Créer un objet avec les tarifs des options
    const prix = data.reduce((acc, { nom_option, prix_option }) => {
      acc[nom_option] = prix_option;
      return acc;
    }, {});

    setTarifsOptions(prix); // Met à jour l'état avec les tarifs récupérés
  }

  fetchTarifsOptions();
}, []);

// Étape 2 : Une fois que le produit est chargé, charger les couleurs
useEffect(() => {
  if (!produit) return;



  const fetchCouleursDisponibles = async () => {
    const { data, error } = await supabase.from("input_couleurs").select("*");
  
    if (error) {
      console.error("Erreur Supabase :", error.message);
      return;
    }
  
    console.log("Toutes les couleurs de Supabase :", data);
  
    const couleursParType = {
      logo: data
      .filter((c) => c.option_couleur_logo)
      .sort((a) => (a.couleur === "Tricolore" ? -1 : 1)),//met le tricolore en premier
      fibres: data
      .filter((c) => c.option_couleur_fibres)
      .sort((a) => (a.couleur === "Aucune" ? -1 : 1)),//met le aucune en premier
      paillettes: data
      .filter((c) => c.option_couleur_paillettes)
      .sort((a) => (a.couleur === "Aucune" ? -1 : 1)),//met le aucune en premier
    };
  
    console.log("Couleurs disponibles :", couleursParType);
    setCouleursDisponibles(couleursParType);
  };

  fetchCouleursDisponibles();
}, [produit]);

// Définition des URL des photos
useEffect(() => {
  if (produit && !photoPrincipale && photoSecondaires.length === 0) {
    async function fetchPhotos() {
      if (!produit || !produit.dossier_photos) return;

      const dossier = produit.dossier_photos;
      const maxPhotos = 10;
      let photos = [];

      // Fonction pour vérifier l'existence d'un fichier
      const fileExists = async (url) => {
        try {
          const response = await fetch(url, { method: "HEAD" });
          return response.ok;  // Si la réponse est OK (status 200)
        } catch (error) {
          console.error("Erreur lors de la vérification du fichier:", error);
          return false;  // Si l'appel échoue, considérer que le fichier n'existe pas
        }
      };

      // Précharge la première photo pour photoPrincipale
      const firstPhotoUrl = `https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${dossier}/1.webp`;
      const existsFirstPhoto = await fileExists(firstPhotoUrl);

      if (existsFirstPhoto) {
        photos.push(firstPhotoUrl); // Ajouter la première photo
      } else {
        console.error("La photo 1.webp n'existe pas");
      }

      // Ensuite, précharge jusqu'à 9 autres photos en arrière-plan
      for (let i = 2; i <= maxPhotos; i++) {
        const photoUrl = `https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${dossier}/${i}.webp`;
        const existsPhoto = await fileExists(photoUrl);

        if (existsPhoto) {
          photos.push(photoUrl); // Ajouter cette photo à la liste
        } else {
          break; // Sortir de la boucle si on trouve un fichier inexistant
        }
      }

      // Mettre à jour les photos dans les états
      if (photos.length > 0) {
        setPhotoPrincipale(photos[0]); // La première photo est la photo principale
        setPhotoSecondaires(photos.slice(1)); // Le reste des photos comme secondaires
      }
      
    }

    fetchPhotos();
  }
}, [produit, photoPrincipale, photoSecondaires]);

//chargement du produit
if (!produit) {
  return (
    <>
      {/* Fond de chargement en arrière-plan */}
      <div className="fixed inset-0 bg-slate-50 z-40" />
    </>
  );
}
  console.log("Produit chargé :", produit);//affiche le produit dans la console

  // Fonction pour ajouter au panier
  function ajouterAuPanier(produit) {
    if (!typeProduit) {
      setErreurTypeProduit(true);
      return;
    } else {
      setErreurTypeProduit(false);
    }    
    const panier = JSON.parse(localStorage.getItem("panier")) || [];  //Ce code récupère le panier stocké, le transforme en tableau JS, ou crée un tableau vide s’il n’existe pas encore.
    // Récupération des options sélectionnées dans le DOM
    const optionsSelectionnees = [];
    document.querySelectorAll(".option-checkbox:checked").forEach((el) => {
      const nom = el.getAttribute("data-name");
      const prix = parseFloat(el.getAttribute("data-price"));
      optionsSelectionnees.push({ nom: nom, prix: prix });
    });

    // Récupération des couleurs sélectionnées
    const couleurs = {
      logo: selectionCouleurs.logo,
      fibres: selectionCouleurs.fibres,
      paillettes: selectionCouleurs.paillettes,
    };

    // Calcul du prix des options de couleur personnalisées
    let prixOptionsCouleur = 0;
    if (couleurs.logo !== "Tricolore" || couleurs.fibres !== "Aucune" || couleurs.paillettes !== "Aucune") {
      prixOptionsCouleur = tarifsOptions.personnalisation_couleur || 0;
    }

    // Calcul du prix de la gravure
    const prixGravure = gravureTexte.trim() !== "" ? (tarifsOptions.gravure_laser || 0) : 0;

    // Calcul du prix total
    const base =
    typeProduit === "tamis"
    ? produit.prix_tamis_seul || 0
    : produit.tarif_base || 0;

const prixTotal = base + prixOptionsCouleur + prixGravure;

    const produitAjoute = {
      id: produit.id,
      nom: produit.nom,
      description_courte: produit.description_courte,
      tarif_base: produit.tarif_base,
      options_selectionnees: optionsSelectionnees, // Inclut les options cochées
      couleurs_selectionnees: couleurs, // Inclut les couleurs sélectionnées
      texte_gravure: gravureTexte, // Inclut le texte de la gravure
      prix_personnalisation_couleur: prixOptionsCouleur,
      prix_gravure: prixGravure,
      prix_total: prixTotal,
      photo_principale: photoPrincipale, // Inclut la photo principale
      type_produit: typeProduit, //Tamis ou Raquette
      prix_tamis_seul: produit.prix_tamis_seul, // Inclut le prix du tamis seul
      precommande: produit.precommande, // est ce que le produit est en statut précommande
    };

    panier.push(produitAjoute); //J'ajoute un nouvel objet JavaScript dans le tableau panier.
    localStorage.setItem("panier", JSON.stringify(panier)); //enregistre le panier dans le localStorage du navigateur, sous forme de texte.
    //C’est une chaîne de caractères (string) qui ressemble à du JavaScript, mais tout est du texte (même les crochets, accolades, etc.).
    window.dispatchEvent(new Event("panierModifie"));
    // Affiche la notification pendant 2 secondes
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
  }


  // Nouvelle fonction pour calculer le montant total dynamique
  const calculerMontantTotal = () => {
    if (!produit) return 0;
  
    // Choisir le bon tarif de base selon le type de produit
    const base =
      typeProduit === "tamis"
        ? produit.prix_tamis_seul || 0
        : produit.tarif_base || 0;
  
    // Vérifie si une couleur personnalisée est sélectionnée
    const couleurPersonnalisee =
      selectionCouleurs.logo !== "Tricolore" ||
      selectionCouleurs.fibres !== "Aucune" ||
      selectionCouleurs.paillettes !== "Aucune";
  
    // Prix des options
    const prixCouleurs = couleurPersonnalisee
      ? tarifsOptions.personnalisation_couleur || 0
      : 0;
  
    const prixGravure = gravureTexte.trim() !== ""
      ? tarifsOptions.gravure_laser || 0
      : 0;
  
    return base + prixCouleurs + prixGravure;
  };


  return (
    <>
    {/* Notification de "produit ajouté au panier" */}
    {showNotif && (
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
    <span className="text-sm font-medium">Produit ajouté au panier</span>
    </div>
    )}

{/* Fil d'Ariane */}
<nav className="text-sm text-gray-500 px-10 pt-4">
  <ol className="list-reset flex">
    <li>
      <Link href="/" className="text-blue-600 hover:underline">Accueil</Link>
      <span className="mx-2">/</span>
    </li>
    <li>
      <Link href="/products" className="text-blue-600 hover:underline">Catalogue</Link>
      <span className="mx-2">/</span>
    </li>
    <li className="text-gray-900 font-medium">
      {produit?.nom}
    </li>
  </ol>
</nav>


{/* 📷 Section Images */}
<main className="p-10">
  <div className="flex flex-col md:flex-row gap-8">
    <div className="w-full md:w-1/2">
      {photoPrincipale && (
        <img
          src={photoPrincipale}
          alt={produit?.nom}
          className="w-full h-auto object-cover rounded-xl mb-4 border border-gray-200"
        />
      )}
<div className="grid grid-cols-4 gap-2">
        {photoSecondaires.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Photo secondaire ${idx + 2}`}
            className="w-full h-20 object-cover rounded border border-gray-200 cursor-pointer"
            onClick={() => {
              const nouvellePrincipale = url;
              const anciennePrincipale = photoPrincipale;
            
              // Mettre à jour la photo principale
              setPhotoPrincipale(nouvellePrincipale);
            
              // Trouver l'index de la photo cliquée dans photoSecondaires
              const indexClicked = photoSecondaires.indexOf(url);
            
              if (indexClicked !== -1) {
                // Créer une copie de photoSecondaires
                const nouvellesSecondaires = [...photoSecondaires];
                // Remplacer la photo cliquée par l'ancienne principale
                nouvellesSecondaires[indexClicked] = anciennePrincipale;
                // Mettre à jour l'état photoSecondaires
                setPhotoSecondaires(nouvellesSecondaires);
              }
            }}
          />
        ))}
      </div>
    </div>

        {/* Colonne droite (infos) */}
        <div className="w-full md:w-2/3 space-y-4">
        <div className="flex items-center gap-3">
          {produit.type === "Raquette" && (
            <span className={`text-xs px-2 py-1 rounded font-medium
              ${produit.gamme === 'Power' ? 'badge power-range' : ''}
              ${produit.gamme === 'Balance' ? 'badge balance-range' : ''}
              ${produit.gamme === 'Control' ? 'badge control-range' : ''}`}>
              {produit.gamme}
            </span>
          )}
          <h1 className="text-3xl font-bold">{produit.nom}</h1>
        </div>
          
          <p className="text-gray-700">{produit.description_courte}</p>
          
{/* Type de produits */}
{produit.type !== "Accessoire" && (
<div className="mt-4 py-2 ">
  <h3 className="font-semibold text-lg mb-2"> Type de produit</h3>
  <div className="flex flex-col gap-4">
    {/* Option 1 : Raquette complète */}
    <label className="w-full cursor-pointer">
    <div className="w-full border border-gray-200 rounded-xl p-3 bg-transparent hover:bg-gray-100 transition-colors">
        <div className="flex justify-between items-start w-full">
          {/* Groupe radio + texte */}
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="typeProduit"
              value="complete"
              checked={typeProduit === "complete"}
              onChange={() => setTypeProduit("complete")}
              required
              className="mt-4 accent-black"
            />
            <div>
              <span className="font-medium">Je souhaite acheter la raquette complète</span>
              <p className="text-gray-600 text-sm">Cadre + tamis, prête à jouer</p>
            </div>
          </div>
          {/* Prix */}
          <span className="ml-3 font-bold text-black whitespace-nowrap">
  {produit.tarif_base}&nbsp;€
</span>
        </div>
      </div>
    </label>

    {/* Option 2 : Remplacement tamis */}
    <label className="w-full cursor-pointer">
    <div className="w-full border border-gray-200 rounded-xl p-3 mb-2 bg-transparent hover:bg-gray-100 transition-colors">
        <div className="flex justify-between items-start w-full">
          {/* Groupe radio + texte */}
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="typeProduit"
              value="tamis"
              checked={typeProduit === "tamis"}
              onChange={() => setTypeProduit("tamis")}
              required
              className="mt-4 accent-black"
            />
            <div>
              <span className="font-medium mr-2 ">Je possède déjà une raquette et souhaite remplacer uniquement le tamis</span>
              <p className="text-gray-600 text-sm">Service exclusif Hexagon Padel</p>
            </div>
          </div>
          {/* Prix */}
          <span className="ml-3 font-bold text-black whitespace-nowrap">
  {produit.prix_tamis_seul}&nbsp;€
</span>
          
        </div>
      </div>
    </label>
  </div>

  {erreurTypeProduit && (
    <p className="text-red-500 text-sm mt-2">Veuillez sélectionner une option.</p>
  )}
</div>
)}
{typeProduit === "tamis" && <RemplacementTamisEncart />}


{/* Ligne de séparation */}
<div className="border-t border-gray-200 mb-3"></div>  {/* Cette ligne crée la séparation fine */}


          {/* Spécifications */}
          {produit.type !== "Accessoire" && (
            <>
          <h3 className="font-semibold text-lg mb-0"> Caractéristiques</h3>
          <div className="text-sm space-y-1 mt-2 ml-2">

          <p><span className="tick"></span> Style de jeu : {produit.type_de_jeu}</p>
            <p><span className="tick"></span> Poids : {produit.poids}</p>
            <p><span className="tick"></span> Taille : {produit.taille}</p>
            <p><span className="tick"></span> Équilibre : {produit.equilibre}</p>
            <p><span className="tick"></span> Cadre : {produit.composition_du_cadre}</p>
            <p><span className="tick"></span> Surface de frappe : {produit.composition_surface_frappe}</p>
            <p><span className="tick"></span> Matériaux du noyau du tamis : {produit.composition_du_noyau}</p>
          </div>
          </>
)}

          {/*selection des options*/}
          
          {produit.type !== "Accessoire" && (
          <>
          <h3 className="font-semibold text-lg mb-2">Personnalisation du tamis (Option) </h3>
          <div className="border border-gray-300 rounded-sm px-6 bg-gray-100">
   {/* Section Customisation couleur */}
   {(produit.option_couleur_logo || produit.option_couleur_fibres || produit.option_couleur_paillettes) && (
              <div className="mt-2">
                
                <p className="font-serif mb-2">
                  Personnalisation couleur : +
                 
                      <span className="font-bold">
                        {(selectionCouleurs.logo !== "Tricolore" ||
                          selectionCouleurs.fibres !== "Aucune" ||
                          selectionCouleurs.paillettes !== "Aucune")
                          ? `${tarifsOptions.personnalisation_couleur || 0} €`
                          : "0 €"}
                      </span>
                      </p>

                {/* Option couleur logo */}
                {produit.option_couleur_logo && (
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1 mx-6">
                      Couleur du logo :
                      {selectionCouleurs.logo && <span className="ml-2 font-semibold text-black">{selectionCouleurs.logo}</span>}
                    </p>
                    <div className="flex gap-2 flex-wrap mx-6">
                      {couleursDisponibles.logo.map((c, i) => (
                        <label
                          key={i}
                          className={`relative group cursor-pointer w-6 h-6 rounded-full border block ${
                            selectionCouleurs.logo === c.couleur ? "ring-2 ring-[#3b82f6]" : "border-gray-300"
                          }`}
                          style={c.couleur === "Tricolore" ? {} : { backgroundColor: c.hex }}
                        >
                          {c.couleur === "Tricolore" && (
                            <img
                              src={tricoloreLogoUrl}
                              alt="Tricolore"
                              className="w-full h-full object-cover rounded-full"
                            />
                          )}
                          <input
                            type="radio"
                            name="logo"
                            value={c.couleur}
                            checked={selectionCouleurs.logo === c.couleur}
                            onChange={() => setSelectionCouleurs((prev) => ({ ...prev, logo: c.couleur }))}
                            className="hidden"
                          />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded shadow z-50 opacity-0 group-hover:opacity-100 transition">
                            {c.couleur}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Option couleur fibres */}
                {produit.option_couleur_fibres && (
                  <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1 mx-6">
                    Couleur des fibres :
                    {selectionCouleurs.fibres && <span className="ml-2 font-semibold text-black">{selectionCouleurs.fibres}</span>}
                  </p>
                  <div className="flex gap-2 flex-wrap mx-6">
                    {couleursDisponibles.fibres.map((c, i) => (
                      <label
                        key={i}
                        className={`relative group cursor-pointer w-6 h-6 rounded-full border block ${
                          selectionCouleurs.fibres === c.couleur ? "ring-2 ring-[#3b82f6]" : "border-gray-300"
                        }`}
                        style={c.couleur === "Aucune" ? {} : { backgroundColor: c.hex }}
                      >
                        {c.couleur === "Aucune" && (
                          <img
                            src={noneUrl}
                            alt="Aucune"
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                        <input
                          type="radio"
                          name="fibres"
                          value={c.couleur}
                          checked={selectionCouleurs.fibres === c.couleur}
                          onChange={() => setSelectionCouleurs((prev) => ({ ...prev, fibres: c.couleur }))}
                          className="hidden"
                        />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded shadow z-50 opacity-0 group-hover:opacity-100 transition">
                          {c.couleur}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                )}

                {/* Option couleur paillettes */}
                {produit.option_couleur_paillettes && (
                  <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1 mx-6">
                    Couleur des paillettes :
                    {selectionCouleurs.paillettes && <span className="ml-2 font-semibold text-black">{selectionCouleurs.paillettes}</span>}
                  </p>
                  <div className="flex gap-2 flex-wrap mx-6">
                    {couleursDisponibles.paillettes.map((c, i) => (
                      <label
                        key={i}
                        className={`relative group cursor-pointer w-6 h-6 rounded-full border block ${
                          selectionCouleurs.paillettes === c.couleur ? "ring-2 ring-[#3b82f6]" : "border-gray-300"
                        }`}
                        style={c.couleur === "Aucune" ? {} : { backgroundColor: c.hex }}
                      >
                        {c.couleur === "Aucune" && (
                          <img
                            src={noneUrl}
                            alt="Aucune"
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                        <input
                          type="radio"
                          name="paillettes"
                          value={c.couleur}
                          checked={selectionCouleurs.paillettes === c.couleur}
                          onChange={() => setSelectionCouleurs((prev) => ({ ...prev, paillettes: c.couleur }))}
                          className="hidden"
                        />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded shadow z-50 opacity-0 group-hover:opacity-100 transition">
                          {c.couleur}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                )}
              </div>
            )}

{/* 🔤 Section Gravure laser */}
{produit.option_gravure && (
  <div className="mt-6">
      <p className="mb-2 font-serif">
        Gravure laser personnalisée : +<span className="font-bold">
          {gravureTexte.trim() !== "" 
            ? `${tarifsOptions.gravure_laser || 0} €`
            : "0 €"}
        </span>
      </p>
    <label className="block text-sm font-medium mb-1 mx-6 ">Texte à graver :</label>
    <div className="mr-6 ml-6">
      <input
        type="text"
        className="border border-gray-300 rounded  mb-4  w-full text-sm"
        placeholder="  Ex : Prénom, surnom..."
        value={gravureTexte} // Assurez-vous que l'état est lié au champ de texte
        onChange={(e) => {
          const newText = e.target.value;
          console.log("Texte de gravure mis à jour : ", newText); // Affiche la valeur à chaque changement
          setGravureTexte(newText);
        }}
       />
    </div>
  </div>
)}
</div>
</>
)}

            {/* Ajout du montant total */}
            <div className="mt-4">
              <p className="text-xl font-semibold">Prix total : {calculerMontantTotal()} €</p>
            </div>


          {/* Ajout du bouton pour ajouter au panier */}
          <button
          className="btn-hero"
          onClick={() => ajouterAuPanier(produit)}>
          Ajouter au panier
         </button>

        </div>
      </div>
      

      <Reassurance />
      


    </main>
    </>
  );
}