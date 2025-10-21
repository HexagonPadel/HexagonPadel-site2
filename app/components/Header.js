"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "../globals.css";

export default function Header({ onMenuStateChange }) {
  const pathname = usePathname();
  const [panierCount, setPanierCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const isHome = pathname === "/";
  const isDark = isHome && !scrolled;

  const [pushContent, setPushContent] = useState(() => !isDark);

  useEffect(() => {
    if (menuOpen && navRef.current) {
      const height = navRef.current.scrollHeight;
      setMenuHeight(height);
      onMenuStateChange?.(pushContent, menuOpen, height);
    } else {
      setMenuHeight(0);
      onMenuStateChange?.(pushContent, menuOpen, 0);
    }
  }, [menuOpen, pushContent, onMenuStateChange]);

  const updatePanierCount = useCallback(() => {
    const panier = JSON.parse(localStorage.getItem("panier") || "[]");
    setPanierCount(panier.length);
  }, []);

  useEffect(() => {
    updatePanierCount();
    window.addEventListener("panierModifie", updatePanierCount);
    return () =>
      window.removeEventListener("panierModifie", updatePanierCount);
  }, [updatePanierCount]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const logoSrc = isDark
    ? "/logos-icons/blanc-sans-fond.svg"
    : "/logos-icons/noir-sans-fond.svg";

  const headerClass = isDark
    ? "bg-black text-white"
    : "bg-white text-black shadow";

  useEffect(() => {
    setPushContent(!isDark);
  }, [isDark]);

  useEffect(() => {
    onMenuStateChange?.(pushContent, menuOpen);
  }, [pushContent, menuOpen, onMenuStateChange]);

  const overlayNavClass = `
    transition-all duration-500 ease-in-out 
    overflow-hidden 
    ${isDark ? "text-white bg-transparent" : "text-graphite bg-white"}
    ${menuOpen ? "max-h-[300px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
    ${!pushContent ? "fixed top-16 left-0 w-full z-40" : "relative"}
  `;

  const handleLinkClick = useCallback(() => setMenuOpen(false), []);

  const Logo = () => (
    <Link href="/" className="flex items-center">
      <Image
        src={logoSrc}
        alt="Hexagon Padel"
        width={30}
        height={30}
        className="w-auto h-10"
      />
    </Link>
  );

  const Panier = () => {
    const color = isDark ? "#FFFFFF" : "#000000";
    return (
      <Link href="/cart" className="relative" aria-label="Panier">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          className="block"
        >
          <path d="M6 6h15l-1.5 9h-13z" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
          <path d="M6 6L4 2H1" />
        </svg>
        {panierCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-copper-light text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
            {panierCount}
          </span>
        )}
      </Link>
    );
  };

  const NavLinks = () => (
    <>
      {!isHome && (
        <Link href="/" onClick={handleLinkClick}>
          Accueil
        </Link>
      )}
      <Link href="/technologies" onClick={handleLinkClick}>
        Technologies
      </Link>
      <Link href="/engagements" onClick={handleLinkClick}>
        Engagements
      </Link>
      <Link href="/histoire" onClick={handleLinkClick}>
        Histoire
      </Link>
      <Link
        href="/remplacement-tamis"
        className="badge blue-badge py-1.5 px-4 inline-block"
        onClick={handleLinkClick}
      >
        Remplacer mon tamis
      </Link>
    </>
  );

// Bandeau défilant
const LaunchBanner = () => (
  <div
    role="region"
    aria-label="Information lancement produit"
    className="w-full bg-black text-white"
  >
    <div className="relative overflow-hidden py-2">
      <div className="marquee flex whitespace-nowrap will-change-transform">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center mx-3">
            <span className="mr-2">
              Raquettes en cours d&apos;industrialisation, commercialisation début 2026.
            </span>
            
            <Link
          href="/#precommandeemail"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("precommandeemail");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
          className="font-semibold underline underline-offset-2 mr-2"
        >
          Être informé du lancement
        </Link>
            <span aria-hidden="true" className="text-gray-400 mx-1">•</span>
          </div>
        ))}
      </div>
    </div>

    <style jsx>{`
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .marquee {
        display: flex;
        width: max-content;
        animation: marquee 60s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .marquee {
          animation: none;
          transform: none;
          justify-content: center;
        }
      }
    `}</style>
  </div>
);

  return (
    <>
      {/* Mobile Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-700 ease-in-out lg:hidden ${headerClass}`}>
        <LaunchBanner />

        <div className="flex items-center justify-between px-4 py-3 relative">
          <button
            className="relative w-6 h-6 flex flex-col justify-between items-center group"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`w-6 h-0.5 ${isDark ? "bg-white" : "bg-black"} rounded transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 ${isDark ? "bg-white" : "bg-black"} rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 ${isDark ? "bg-white" : "bg-black"} rounded transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
          <div className="absolute left-[calc(50%+15px)] transform -translate-x-1/2">
            <Logo />
          </div>
          <Panier />
        </div>

        {/* Animated Mobile Nav */}
        <nav ref={navRef} className={overlayNavClass}>
          <div className="flex flex-col items-center space-y-4">
            <NavLinks />
          </div>
        </nav>
      </header>

      {/* Desktop Header */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-700 ease-in-out hidden lg:block ${headerClass}`}
      >
        <LaunchBanner />

        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Logo />
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6 font-medium">
            <NavLinks />
          </nav>
          <Panier />
        </div>
      </header>
    </>
  );
}