"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import "../../globals.css";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetail({ params }) {
  const [produit, setProduit] = useState(null);
  const { id } = use(params);
  const [photoPrincipale, setPhotoPrincipale] = useState(null);
  const [photoSecondaires, setPhotoSecondaires] = useState([]);
  const [photosChargees, setPhotosChargees] = useState(false);

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

  useEffect(() => {
    if (produit && !photoPrincipale && photoSecondaires.length === 0) {
      async function fetchPhotos() {
        if (!produit || !produit.dossier_photos) return;

        const dossier = produit.dossier_photos;
        const maxPhotos = 10;
        let photos = [];

        const fileExists = async (url) => {
          try {
            const response = await fetch(url, { method: "HEAD" });
            return response.ok;
          } catch (error) {
            console.error("Erreur lors de la vérification du fichier:", error);
            return false;
          }
        };

        const firstPhotoUrl = `https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${dossier}/1.webp`;
        const existsFirstPhoto = await fileExists(firstPhotoUrl);

        if (existsFirstPhoto) {
          photos.push(firstPhotoUrl);
        } else {
          console.error("La photo 1.webp n'existe pas");
        }

        for (let i = 2; i <= maxPhotos; i++) {
          const photoUrl = `https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${dossier}/${i}.webp`;
          const existsPhoto = await fileExists(photoUrl);

          if (existsPhoto) {
            photos.push(photoUrl);
          } else {
            break;
          }
        }

        if (photos.length > 0) {
          setPhotoPrincipale(photos[0]);
          setPhotoSecondaires(photos.slice(1));
        }
      }

      fetchPhotos();
    }
  }, [produit, photoPrincipale, photoSecondaires]);

  return (
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

                  setPhotoPrincipale(nouvellePrincipale);

                  const indexClicked = photoSecondaires.indexOf(url);

                  if (indexClicked !== -1) {
                    const nouvellesSecondaires = [...photoSecondaires];
                    nouvellesSecondaires[indexClicked] = anciennePrincipale;
                    setPhotoSecondaires(nouvellesSecondaires);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          {/* Tu peux ici continuer avec la section informations produit, personnalisations, etc. */}
        </div>
      </div>
    </main>
  );
}