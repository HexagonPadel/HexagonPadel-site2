import { useState, useEffect, useMemo } from "react";

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
  { id: "lin", label: "Tamis hybride fibre de carbone / fibre de lin naturel" },
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

export const SURFACE_VIDEO = (id) => `/configurateur/options/${id}.mov`;
export const COLOR_VIDEO = (group, colorId) => `/configurateur/options/${group}_${colorId}.mov`;
export const RAW_VIDEO = () => `/configurateur/options/fibres_brute.mov`;
export const SURFACE_IMAGE = (id) => `/configurateur/options/${id}.png`;
export const COLOR_IMAGE = (group, colorId) => `/configurateur/options/${group}_${colorId}.png`;

export const GALLERY_IMAGES = ({ surface, finish, accentColor }) => {
  if (finish === "brut" || !accentColor) {
    return [1, 2, 3].map(n => `/configurateur/tamis/${surface}/${n}.png`);
  }
  return [1, 2, 3].map(n => `/configurateur/tamis/${surface}/${finish}/${accentColor}/${n}.png`);
};

export const tabBtnTightClass = (id) =>
  id === "brut" || id === "paillettes" 
    ? "px-[6px] py-[5px] min-w-[64px]" 
    : "px-2.5 py-[6px] min-w-[90px]";

/* ==========================================
   HOOK PERSONNALISÉ POUR LA LOGIQUE
   ========================================== */

export function useConfigurateur() {
  const [styleJeu, setStyleJeu] = useState("equilibre");
  const [surface, setSurface] = useState("mc");
  const [accentColor, setAccentColor] = useState("");
  const [finish, setFinish] = useState("brut");
  const [logoColor, setLogoColor] = useState("logo-tricolore");
  const [engraving, setEngraving] = useState("");

  // Synchronisation style -> surface compatible
  useEffect(() => {
    setSurface(prev => {
      if (styleJeu === "offensif") {
        const allowed = new Set(COMPAT.offensif);
        return allowed.has(prev) ? prev : "";
      }
      
      const allowed = COMPAT[styleJeu] || [];
      if (!prev || !allowed.includes(prev)) {
        return allowed[0] || prev;
      }
      return prev;
    });
  }, [styleJeu]);

  // Force finition brute pour surfaces fc/lin
  useEffect(() => {
    if (surface && SURFACES_BRUT_ONLY.includes(surface)) {
      setFinish("brut");
      setAccentColor("");
    }
  }, [surface]);

  // Reset couleur lors du changement de finition
  useEffect(() => {
    if (finish !== "brut") setAccentColor("");
  }, [finish]);

  // Handler : clic sur une surface (même grisée)
  const handleSurfaceClick = (sId, allowed) => {
    if (!allowed) {
      const newStyle = SURFACE_TO_STYLE[sId] || styleJeu;
      setStyleJeu(newStyle);
    }
    setSurface(sId);
  };

  // Construction des items de prévisualisation
  const effectiveSurface = surface || "mc";
  const effectiveFinishForPreview = finish === "brut" || !accentColor ? "brut" : finish;

  const previewItems = useMemo(() => {
    const photos = GALLERY_IMAGES({
      surface: effectiveSurface,
      finish: effectiveFinishForPreview,
      accentColor,
    }).map((src, i) => ({
      type: "image",
      src,
      alt: `Aperçu ${effectiveSurface} – ${effectiveFinishForPreview}${
        effectiveFinishForPreview === "brut" ? "" : ` – ${accentColor}`
      } – ${i + 1}`,
    }));

    const surfaceItem = { 
      type: "video", 
      src: SURFACE_VIDEO(effectiveSurface), 
      alt: `Vidéo surface — ${surfaceLabel(effectiveSurface)}` 
    };

    const aestheticItem = effectiveFinishForPreview === "brut"
      ? { type: "video", src: RAW_VIDEO(), alt: "Vidéo — Brut" }
      : { type: "video", src: COLOR_VIDEO(finish, accentColor), alt: `Vidéo ${finish} — ${colorName(accentColor)}` };

    return [...photos, surfaceItem, aestheticItem];
  }, [effectiveSurface, effectiveFinishForPreview, finish, accentColor]);

  const isDecorationAllowed = !surface || !SURFACES_BRUT_ONLY.includes(surface);

  return {
    // États
    styleJeu,
    surface,
    accentColor,
    finish,
    logoColor,
    engraving,
    // Setters
    setStyleJeu,
    setSurface,
    setAccentColor,
    setFinish,
    setLogoColor,
    setEngraving,
    // Computed
    previewItems,
    isDecorationAllowed,
    // Handlers
    handleSurfaceClick,
  };
}