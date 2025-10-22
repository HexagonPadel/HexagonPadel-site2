import { useState, useEffect } from "react";

/* ==========================================
   CONFIGURATION & DONNÉES
   ========================================== */

export const STYLES = [
  { id: "equilibre", label: "Équilibre", desc: "Un compromis idéal entre contrôle et puissance, pour un jeu polyvalent." },
  { id: "offensif",  label: "Puissance",  desc: "Plus rigide et explosive, pour les joueurs offensifs qui aiment finir les points." },
  { id: "controle",  label: "Contrôle",   desc: "Plus tolérante et stable, pour les joueurs précis qui cherchent la maîtrise avant tout." },
];

export const SURFACES = [
  { id: "mc",  label: "Tamis 100% fibres de carbone recyclées non tissées" },
  { id: "cc",  label: "Tamis fibres de carbone recyclées non tissées, renforcé de fins torons de carbone 12K" },
  { id: "fc",  label: "Tamis fibres de carbone recyclées non tissées, renforcé de larges lames de carbone 12K. Le modèle le plus puissant." },
  { id: "lin", label: "Tamis hybride fibre de carbone / fibre de lin naturel. La fibre de lin est plus souple que la fibre de carbone" },
];

export const PALETTE = [
  { id: "gold",  name: "Doré"  },
  { id: "red",   name: "Rouge" },
  { id: "green", name: "Vert"  },
  { id: "blue",  name: "Bleu"  },
];

export const LOGO_CHOICES = [
  { id: "logo-tricolore", label: "Tricolore" },
  { id: "logo-gold",      label: "Doré"      },
  { id: "logo-red",       label: "Rouge"     },
  { id: "logo-green",     label: "Vert"      },
  { id: "logo-blue",      label: "Bleu"      },
];

export const FINISH_TABS = [
  { id: "brut",       label: "Brut" },
  { id: "fibres",     label: "Fibres métalliques" },
  { id: "flocons",    label: "Flocons métalliques" },
  { id: "paillettes", label: "Paillettes" },
];

export const COMPAT = {
  offensif:  ["cc", "fc"],
  equilibre: ["mc"],
  controle:  ["lin"],
};

export const SURFACE_TO_STYLE = { 
  mc: "equilibre", 
  cc: "offensif", 
  fc: "offensif", 
  lin: "controle" 
};

export const SURFACES_BRUT_ONLY = ["fc", "lin"];

/* ==========================================
   HELPERS & UTILITAIRES
   ========================================== */

export const surfaceLabel = (id) => SURFACES.find(s => s.id === id)?.label ?? id;
export const colorName = (id) => PALETTE.find(c => c.id === id)?.name ?? id;
export const styleLabel = (id) => STYLES.find(s => s.id === id)?.label ?? id;

export const SURFACE_IMAGE = (id) => `/configurateur/options/${id}.png`;
export const COLOR_IMAGE = (group, colorId) => `/configurateur/options/${group}_${colorId}.png`;

export const tabBtnTightClass = (id) =>
  id === "brut" || id === "paillettes"
    ? "px-[6px] py-[5px] min-w-[64px]"
    : "px-2.5 py-[6px] min-w-[90px]";

/* ==========================================
   GESTION DES MÉDIAS SIMPLIFIÉE
   ========================================== */

/**
 * 3 images fixes + 1 vidéo "debo.mov" toujours présente.
 */
export async function fetchGallery(surface, finish, accentColor) {
  const base =
    finish === "brut" || !accentColor
      ? `/configurateur/tamis/${surface}/`
      : `/configurateur/tamis/${surface}/${finish}/${accentColor}/`;

  const images = [1, 2, 3].map((n, i) => ({
    type: "image",
    src: `${base}${n}.png`,
    alt: `Image ${i + 1} – ${surface} – ${finish}`,
  }));

  const video = {
    type: "video",
    src: `${base}demo.mov`,
    mime: "video/quicktime",
    alt: `Vidéo démonstration – ${surface} – ${finish}`,
  };

  return [...images, video];
}

/* ==========================================
   HOOK PRINCIPAL
   ========================================== */

export function useConfigurateur() {
  const [styleJeu, setStyleJeu] = useState("equilibre");
  const [surface, setSurface] = useState("mc");
  const [accentColor, setAccentColor] = useState("");
  const [finish, setFinish] = useState("brut");
  const [logoColor, setLogoColor] = useState("logo-tricolore");
  const [engraving, setEngraving] = useState("");
  const [previewItems, setPreviewItems] = useState([]);

  useEffect(() => {
    setSurface(prev => {
      const allowed = COMPAT[styleJeu] || [];
      if (!prev || !allowed.includes(prev)) return allowed[0] || prev;
      return prev;
    });
  }, [styleJeu]);

  useEffect(() => {
    if (surface && SURFACES_BRUT_ONLY.includes(surface)) {
      setFinish("brut");
      setAccentColor("");
    }
  }, [surface]);

// Charger les médias selon surface / finition / couleur
useEffect(() => {
  const effSurface = surface || "mc";
  const effFinish = finish === "brut" || !accentColor ? "brut" : finish;

  // 🔍 Ajoute ici le log pour vérifier le chemin et les fichiers trouvés
  fetchGallery(effSurface, effFinish, accentColor).then((arr) => {
    console.log({
      effSurface,
      effFinish,
      accentColor,
      arr, // ← tu verras la liste complète des images/vidéos dans la console navigateur
    });
    setPreviewItems(arr);
  });
}, [surface, finish, accentColor]);

  const isDecorationAllowed = !surface || !SURFACES_BRUT_ONLY.includes(surface);

  const handleSurfaceClick = (sId, allowed) => {
    if (!allowed) {
      const newStyle = SURFACE_TO_STYLE[sId] || styleJeu;
      setStyleJeu(newStyle);
    }
    setSurface(sId);
  };

  return {
    styleJeu,
    surface,
    accentColor,
    finish,
    logoColor,
    engraving,
    previewItems,
    setStyleJeu,
    setSurface,
    setAccentColor,
    setFinish,
    setLogoColor,
    setEngraving,
    isDecorationAllowed,
    handleSurfaceClick,
  };
}