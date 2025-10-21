"use client";

import { useState, useEffect } from "react";
import { useConfigurateur } from "./Configurateur/ConfigurateurLogic";
import ConfigurateurDesktop from "./Configurateur/ConfigurateurDesktop";
import ConfigurateurMobile from "./Configurateur/ConfigurateurMobile";
import "../../globals.css";

export default function Configurateur() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection de la taille d'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // breakpoint lg de Tailwind
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Récupération de toute la logique via le hook personnalisé
  const configurateurProps = useConfigurateur();

  // Rendu conditionnel selon la taille d'écran
  return isMobile ? (
    <ConfigurateurMobile {...configurateurProps} />
  ) : (
    <ConfigurateurDesktop {...configurateurProps} />
  );
}