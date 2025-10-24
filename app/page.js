"use client";

import { useRef } from "react";
import Hero from "./components/accueil/Hero";

import PhotoCarousel from "./components/accueil/PhotoCarousel";

import Configurateur from "./components/accueil/Configurateur";
import TechnicalSpecs from "./components/accueil/Configurateur/TechnicalSpecs";
import PictosPropValeur from "./components/accueil/PictosPropValeur";
import PrecommandeEmail from "./components/accueil/PrecommandeEmail";
import ModelesPhares from "./components/accueil/ModelesPhares";
import Reassurance from "./components/Reassurance";
import Video from "./components/Video";
import EcoResponsable from "./components/accueil/EcoResponsable";
import Communaute from "./components/accueil/Communaute";
import "../app/globals.css";
import RemplacementTamis from "./components/RemplacementTamis";
import Explications from "./components/Explications";
import HistoireRapide from "./components/accueil/HistoireRapide";


export default function Home() {
  const configurateurRef = useRef(null);
  const precommandeRef = useRef(null);

  const scrollToConfigurator = () => {
    configurateurRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="scroll-smooth">
      <Hero onScrollToConfigurator={scrollToConfigurator} />
     <PictosPropValeur />
      <PhotoCarousel />

      {/* Ancre du configurateur */}
      <div ref={configurateurRef}>
        <Configurateur />
      </div>
      <TechnicalSpecs />

      {/* Ancre de la section précommande */}
      <div id="precommandeemail" ref={precommandeRef}  className="scroll-mt-[100px]">
        <PrecommandeEmail />
      </div>

      {/* <ModelesPhares /> */}

{/* Vidéo + Réassurance */}
<section className="my-12 w-full px-4 md:px-8">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
    <div className="md:col-span-4 lg:col-span-3">
      <div className="aspect-[9/16] rounded-2xl overflow-hidden">
        <Video />
      </div>
    </div>
    <div className="md:col-span-8 lg:col-span-9">
      <Reassurance />
    </div>
  </div>
</section>

      <Explications />
      <EcoResponsable />
      <RemplacementTamis />
      <HistoireRapide />
      <Communaute />
    </main>
  );
}