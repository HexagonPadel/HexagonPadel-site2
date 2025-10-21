'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { supabase } from '../../lib/supabase';
import Reassurance from "../components/Reassurance";
import RemplacementTamis from "../components/RemplacementTamis";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../globals.css';
import Explications from '../components/Explications';
import Video from '../components/Video';

export default function Catalogue() {
  const [produitsPowerRaquettes, setProduitsPowerRaquettes] = useState([]);
  const [produitsBalanceRaquettes, setProduitsBalanceRaquettes] = useState([]);
  const [produitsControlRaquettes, setProduitsControlRaquettes] = useState([]);
  const [produitsTamis, setProduitsTamis] = useState([]);
  const [produitsAccessoires, setProduitsAccessoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProduits = async () => {
      const types = [
        { setter: setProduitsPowerRaquettes, gamme: 'Power' },
        { setter: setProduitsBalanceRaquettes, gamme: 'Balance' },
        { setter: setProduitsControlRaquettes, gamme: 'Control' },
      ];

      for (const { setter, gamme } of types) {
        const { data, error } = await supabase
          .from('input_catalogue_produits')
          .select('*')
          .eq('gamme', gamme)
          .eq('type', 'Raquette')
          .order('tarif_base', { ascending: false }); // tri décroissant
      
        if (error) console.error(`Erreur récupération ${gamme} Raquettes:`, error);
        else setter(data);
      }

      const { data: tamis, error: errorTamis } = await supabase
        .from('input_catalogue_produits')
        .select('*')
        .eq('type', 'Tamis');
      if (errorTamis) console.error('Erreur récupération Tamis:', errorTamis);
      else setProduitsTamis(tamis);

      const { data: accessoires, error: errorAccessoires } = await supabase
        .from('input_catalogue_produits')
        .select('*')
        .eq('type', 'Accessoire');
      if (errorAccessoires) console.error('Erreur récupération Accessoires:', errorAccessoires);
      else setProduitsAccessoires(accessoires);

      setLoading(false);
    };

    fetchProduits();
  }, []);

  // Détection simple du mode mobile / desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check au chargement

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 bg-slate-50 z-40" />
      </>
    );
  }

  // JSX mobile : cartes produits par 2 par ligne (grid-cols-2)
  const renderMobile = () => (
    <div className="p-4">
      <section className="text-center mb-8">
        {/* Badge + Titre + Texte de présentation (comme desktop) */}
        <span className="badge blue-badge mb-4 mt-4 py-1.5 px-4 inline-block">Raquettes complètes</span>
        <h1 className="text-2xl font-bold mb-4">Trouvez votre raquette idéale</h1>
        <p className="text-graphite max-w-full mx-auto mb-6 text-center text-sm">
          Chaque raquette Hexagon Padel est entièrement fabriquée de manière artisanale en France.
          <br />
          Chaque tamis est assemblé sur le cadre signature en carbone forgé et recyclé.
        </p>
  
        <div className="grid grid-cols-2 gap-4">
          {[...produitsPowerRaquettes, ...produitsBalanceRaquettes, ...produitsControlRaquettes].map((produit) => (
            <div key={produit.id} className="bg-white rounded shadow p-3 relative">
  {/* Badge gamme */}
  <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded
    ${produit.gamme === 'Power' ? 'badge power-range' : ''}
    ${produit.gamme === 'Balance' ? 'badge balance-range' : ''}
    ${produit.gamme === 'Control' ? 'badge control-range' : ''}`}>
    {produit.gamme}
  </span>

  <Link href={`/products/${produit.id}`}>
    <img
      src={`https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${produit.dossier_photos}/1.webp`}
      alt={produit.nom}
      className="w-full h-40 object-cover rounded mb-2"
    />
  </Link>
  <h4 className="font-semibold">{produit.nom}</h4>
  <p className="text-sm text-gray-600">{produit.description_courte}</p>
  <p className="font-bold mt-1">{produit.tarif_base} €</p>
  <Link href={`/products/${produit.id}`} className="text-blue-electric text-sm mt-1 inline-block">
    Voir →
  </Link>
</div>
          ))}
        </div>
      </section>
  
      <div className="mb-6">
        <RemplacementTamis />
      </div>
  
      <Explications />   
      <Video />
      <Reassurance />
    </div>
  );

  // JSX desktop (inchangé)
  const renderDesktop = () => (
    <div className="p-10">
      <section className="text-center">
        <span className="badge blue-badge mb-6 py-1.5 px-4 inline-block">Raquettes complètes</span>
        <h1 className="text-4xl font-bold mb-6">Trouvez votre raquette idéale</h1>
        <p className="text-graphite max-w-3xl mx-auto mb-10 text-center">
          Chaque raquette Hexagon Padel est entièrement fabriquée de manière artisanale en France.
          <br />
          Chaque tamis est assemblé sur le cadre signature en carbone forgé et recyclé.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-2">
          {[...produitsPowerRaquettes, ...produitsBalanceRaquettes, ...produitsControlRaquettes].map((produit) => (
            <div
              key={produit.id}
              className="min-w-[250px] max-w-[280px] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-4 relative"
            >
              <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded
                ${produit.gamme === 'Power' ? 'badge power-range' : ''}
                ${produit.gamme === 'Balance' ? 'badge balance-range' : ''}
                ${produit.gamme === 'Control' ? 'badge control-range' : ''}`}>
                {produit.gamme}
              </span>

              {produit.dossier_photos && (
                <Link href={`/products/${produit.id}`}>
                  <img
                    src={`https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${produit.dossier_photos}/1.webp`}
                    alt={produit.nom}
                    className="w-full h-[18rem] object-cover mb-4 rounded"
                  />
                </Link>
              )}
              <h4 className="text-lg font-semibold">{produit.nom}</h4>
              <p className="text-sm text-gray-600">{produit.description_courte}</p>
              <p className="font-bold mt-2">{produit.tarif_base} €</p>

              <div className="mt-4 text-right text-blue-electric">
                <Link
                  href={`/products/${produit.id}`}
                  className="text-blue-electric text-sm font-medium hover:underline"
                >
                  Voir →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-2 mb-8">
        <RemplacementTamis />
      </div>
      <Explications />    
      <Reassurance />
    </div>
  );

  // Retourne le rendu adapté
  return isMobile ? renderMobile() : renderDesktop();
}