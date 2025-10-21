'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../../lib/supabase';

export default function ModelesPhares() {
  const [produits, setProduits] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Détection largeur d'écran (mobile < 768px)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Récupération des produits
  useEffect(() => {
    const fetchModelesPhares = async () => {
      const { data, error } = await supabase
        .from('input_catalogue_produits')
        .select('*')
        .in('nom', ['HexaPro', 'HexaCore']);

      if (error) {
        console.error('Erreur récupération modèles phares:', error);
      } else {
        setProduits(data);
      }
    };
    fetchModelesPhares();
  }, []);

  if (!produits.length) return null;

  // Rendu mobile
  const renderMobile = () => (
    <section className="py-20 bg-slate-50 mx-4">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex flex-col justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2p">Nos modèles phares</h2>
            <p className="text-gray-600 max-w-full">
              Découvrez notre collection de raquettes de padel haute performance, conçues pour les joueurs exigeants à la recherche d&apos;excellence.
            </p>
          </div>
          <Link
            href="/products"
            className="group mt-4 border border-blue-electric text-blue-electric px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-electric transition flex items-center gap-1 max-w-max"
          >
            Voir tous les produits
            <span className="transition-transform duration-200 group-hover:translate-x-1">{'>'}</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {produits.map(produit => (
            <div
              key={produit.id}
              className="w-[48%] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-3 relative"
            >
              <Link href={`/products/${produit.id}`}>
                <div className="relative w-full h-72 mb-3 rounded overflow-hidden">
                  <span
                    className={`absolute top-2 right-2 text-xs px-2 py-1 rounded z-10
                      ${produit.gamme === 'Power' ? 'badge power-range' : ''}
                      ${produit.gamme === 'Balance' ? 'badge balance-range' : ''}
                      ${produit.gamme === 'Control' ? 'badge control-range' : ''}`}
                  >
                    {produit.gamme}
                  </span>

                  <Image
                    src={`https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${produit.dossier_photos}/1.webp`}
                    alt={produit.nom}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              </Link>

              <h4 className="text-lg font-semibold">{produit.nom}</h4>
              <p className="font-bold mt-1">{produit.tarif_base} €</p>

              <div className="mt-3 text-right text-blue-electric">
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
      </div>
    </section>
  );

  // Rendu desktop
  const renderDesktop = () => (
    <section className="py-20 bg-slate-50 mx-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2p">Nos modèles phares</h2>
            <p className="text-gray-600 max-w-xl">
              Découvrez notre collection de raquettes de padel haute performance, conçues pour les joueurs exigeants à la recherche d&apos;excellence.
            </p>
          </div>
          <Link
            href="/products"
            className="group border border-blue-electric text-blue-electric px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-electric transition flex items-center gap-1 max-w-none"
          >
            Voir tous les produits
            <span className="transition-transform duration-200 group-hover:translate-x-1">{'>'}</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-start gap-6 pl-2">
          {produits.map(produit => (
            <div
              key={produit.id}
              className="md:min-w-[250px] md:max-w-[280px] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-4 relative"
            >
              <Link href={`/products/${produit.id}`}>
                <div className="relative w-full h-72 mb-4 rounded overflow-hidden">
                  <span
                    className={`absolute top-2 right-2 text-xs px-2 py-1 rounded z-10
                      ${produit.gamme === 'Power' ? 'badge power-range' : ''}
                      ${produit.gamme === 'Balance' ? 'badge balance-range' : ''}
                      ${produit.gamme === 'Control' ? 'badge control-range' : ''}`}
                  >
                    {produit.gamme}
                  </span>

                  <Image
                    src={`https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-produits/${produit.dossier_photos}/1.webp`}
                    alt={produit.nom}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              </Link>

              <h4 className="text-lg font-semibold">{produit.nom}</h4>
              <p className="font-bold mt-1">{produit.tarif_base} €</p>

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
      </div>
    </section>
  );

  return isMobile ? renderMobile() : renderDesktop();
}