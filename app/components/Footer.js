
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Composant pour le pied de page mobile
function MobileFooter() {
  return (
    <>
      <div className="px-4 md:hidden">
        {/* Bloc principal Hexagon Padel + Réseaux */}
        <div className="mb-6">
          <h2 className="font-bold uppercase mb-3 text-sm">HEXAGON PADEL</h2>
          <p className="text-gray-400 mb-2 leading-tight text-[13px]">
            Les seules raquettes de padel fabriquées en France. 
            <br /> En fibres de carbone recyclées.
          </p>
          <div className="flex space-x-3 mt-3">
            <a href="https://www.facebook.com/profile.php?id=61571314103709" aria-label="Facebook" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.8C10.6 0 9 1.6 9 4.6V8z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/hexagonpadel.eu/" aria-label="Instagram" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8 0-3.2 0-3.6.1-4.8.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/>
              </svg>
            </a>
            <a href="mailto:contact@hexagonpadel.eu" aria-label="Email" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/105774036" aria-label="LinkedIn" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8 19h-3v-10h3v10zM6.5 7.6c-1 0-1.7-.7-1.7-1.6s.7-1.6 1.7-1.6 1.7.7 1.7 1.6c0 .9-.7 1.6-1.7 1.6zM20 19h-3v-5.4c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.7v5.5h-3s.1-9 0-10h3v1.4c.4-.7 1.2-1.8 3-1.8 2.2 0 3.8 1.4 3.8 4.4v6z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Les 3 colonnes côte à côte */}
        <div className="flex flex-row justify-between gap-4">
          {/* Produits */}
          <div className="w-1/3">
            <h3 className="font-semibold uppercase mb-2 text-xs font-playfair-display">NOS PRODUITS</h3>
            <ul className="text-gray-400 space-y-1 text-[13px]">
              <li><Link href="/products" className="hover:text-white">Toutes les raquettes</Link></li>
              <li><Link href="/products" className="hover:text-white">Gamme Power</Link></li>
              <li><Link href="/products" className="hover:text-white">Gamme Balance</Link></li>
              <li><Link href="/products" className="hover:text-white">Gamme Control</Link></li>
              <li><Link href="/accessoires" className="hover:text-white">Accessoires</Link></li>
            </ul>
          </div>

          {/* Marque */}
          <div className="w-1/3">
            <h3 className="font-semibold uppercase mb-2 text-xs font-playfair-display">NOTRE MARQUE</h3>
            <ul className="text-gray-400 space-y-1 text-[13px]">
              <li><Link href="/histoire" className="hover:text-white">Notre Histoire</Link></li>
              <li><Link href="/technologies" className="hover:text-white">Technologies</Link></li>
              <li><Link href="/engagements" className="hover:text-white">Notre Engagement</Link></li>
              <li><Link href="/contact" className="hover:text-white">Nous Contacter</Link></li>
              <li><Link href="/carrieres" className="hover:text-white">Carrières</Link></li>
            </ul>
          </div>

          {/* Infos */}
          <div className="w-1/3">
            <h3 className="font-semibold uppercase mb-2 text-xs font-playfair-display">INFORMATIONS</h3>
            <ul className="text-gray-400 space-y-1 text-[13px]">
              <li><Link href="/livraisons-retours" className="hover:text-white">Livraison</Link></li>
              <li><Link href="/livraisons-retours" className="hover:text-white">Retours</Link></li>
              <li><Link href="/garanties" className="hover:text-white">Garantie</Link></li>
              <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright mobile */}
      <div className="md:hidden mt-6 pt-4 border-t border-gray-800 text-gray-500 text-xs flex flex-col items-center gap-3">
        <p>© 2025 • Hexagon Padel. Tous droits réservés. </p>
        <div className="flex flex-row items-center gap-4">
          <Link href="/mentions-legales" className="hover:text-white">
            Conditions de vente
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Politique de confidentialité
          </Link>
          <Link href="/sitemap.xml" className="hover:text-white">
            Plan du site
          </Link>
        </div>
      </div>
    </>
  );
}

// Composant pour le pied de page desktop
function DesktopFooter() {
  return (
    <>
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {/* Colonne gauche */}
        <div>
          <h2 className="font-bold uppercase mb-3 text-sm">HEXAGON PADEL</h2>
          <p className="text-gray-400 mb-2 leading-tight">
            Les seules raquettes de padel
            <br />
            fabriquées en France.
            <br />
            En fibres de carbone recyclées.
          </p>
          <div className="flex space-x-3 mt-3">
            <a href="https://www.facebook.com/profile.php?id=61571314103709" aria-label="Facebook" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.8C10.6 0 9 1.6 9 4.6V8z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/hexagonpadel.eu/" aria-label="Instagram" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8 0-3.2 0-3.6.1-4.8.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/>
              </svg>
            </a>
            <a href="mailto:contact@hexagonpadel.eu" aria-label="Email" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/105774036" aria-label="LinkedIn" className="text-white hover:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8 19h-3v-10h3v10zM6.5 7.6c-1 0-1.7-.7-1.7-1.6s.7-1.6 1.7-1.6 1.7.7 1.7 1.6c0 .9-.7 1.6-1.7 1.6zM20 19h-3v-5.4c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.7v5.5h-3s.1-9 0-10h3v1.4c.4-.7 1.2-1.8 3-1.8 2.2 0 3.8 1.4 3.8 4.4v6z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Produits */}
        <div>
          <h3 className="font-semibold uppercase mb-2 text-xs font-playfair-display">NOS PRODUITS</h3>
          <ul className="text-gray-400 space-y-1">
            <li><Link href="/products" className="hover:text-white">Toutes les raquettes</Link></li>
            <li><Link href="/products" className="hover:text-white">Gamme Power</Link></li>
            <li><Link href="/products" className="hover:text-white">Gamme Balance</Link></li>
            <li><Link href="/products" className="hover:text-white">Gamme Control</Link></li>
            <li><Link href="/accessoires" className="hover:text-white">Accessoires</Link></li>
          </ul>
        </div>
        
        {/* Marque */}
        <div>
          <h3 className="font-semibold uppercase mb-2 text-xs font-playfair-display">NOTRE MARQUE</h3>
          <ul className="text-gray-400 space-y-1">
            <li><Link href="/histoire" className="hover:text-white">Notre Histoire</Link></li>
            <li><Link href="/technologies" className="hover:text-white">Technologies</Link></li>
            <li><Link href="/engagements" className="hover:text-white">Notre Engagement</Link></li>
            <li><Link href="/contact" className="hover:text-white">Nous Contacter</Link></li>
            <li><Link href="/carrieres" className="hover:text-white">Carrières</Link></li>
          </ul>
        </div>
        
        {/* Infos */}
        <div>
          <h3 className="font-semibold uppercase mb-2 text-xs font-playfair-display">INFORMATIONS</h3>
          <ul className="text-gray-400 space-y-1">
            <li><Link href="/livraisons-retours" className="hover:text-white">Livraison</Link></li>
            <li><Link href="/livraisons-retours" className="hover:text-white">Retours</Link></li>
            <li><Link href="/garanties" className="hover:text-white">Garantie</Link></li>
            <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Copyright desktop */}
      <div className="hidden md:flex md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-800 text-gray-500 text-xs gap-3">
        <p>© 2025 • Hexagon Padel. Tous droits réservés.</p>
        <div className="flex gap-4">
          <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          <Link href="/privacy" className="hover:text-white">Politique de confidentialité</Link>
          <Link href="/sitemap.xml" className="hover:text-white">Plan du site</Link>
        </div>
      </div>
    </>
  );
}

// Composant principal Footer
export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fonction pour détecter la largeur d'écran
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md = 768px dans Tailwind
    };

    checkMobile(); // appel initial
    window.addEventListener('resize', checkMobile); // écoute les changements

    return () => window.removeEventListener('resize', checkMobile); // nettoyage
  }, []);

  return (
    <footer className="bg-black text-white py-6 px-4 text-xs">
      <div className="max-w-6xl mx-auto">
        {isMobile ? <MobileFooter /> : <DesktopFooter />}
      </div>
    </footer>
  );
}