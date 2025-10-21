"use client";

import { useState, useEffect } from "react";
import {
  STYLES,
  SURFACES,
  PALETTE,
  LOGO_CHOICES,
  FINISH_TABS,
  COMPAT,
  surfaceLabel,
  colorName,
  styleLabel,
  SURFACE_IMAGE,
  COLOR_IMAGE,
  tabBtnTightClass,
} from "./ConfigurateurLogic";

/* ==========================================
   COMPOSANTS UI
   ========================================== */

function ThumbItem({ item, active, onClick }) {
  const borderClass = active 
    ? "border-amber-500 ring-1 ring-amber-500" 
    : "border-slate-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`aspect-[4/3] overflow-hidden rounded-xl border ${borderClass} bg-white`}
      aria-label={item.alt}
      title={item.alt}
    >
      {item.type === "image" ? (
        <img 
          src={item.src} 
          alt={item.alt} 
          className="h-full w-full object-cover" 
          loading="lazy" 
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => { 
            try { 
              e.currentTarget.pause(); 
              e.currentTarget.currentTime = 0; 
            } catch {} 
          }}
        >
          <source src={item.src} type="video/mp4" />
        </video>
      )}
    </button>
  );
}

function PreviewGallery({ items }) {
  const [idx, setIdx] = useState(0);
  
  useEffect(() => { setIdx(0); }, [items]);
  
  const prev = () => setIdx((i) => (i + items.length - 1) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);
  const current = items[idx];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-slate-50 border border-slate-200">
        {current.type === "image" ? (
          <img 
            src={current.src} 
            alt={current.alt} 
            className="h-full w-full object-cover" 
            loading="eager" 
          />
        ) : (
          <video 
            key={current.src} 
            className="h-full w-full object-cover" 
            muted 
            loop 
            playsInline 
            autoPlay
          >
            <source src={current.src} type="video/mp4" />
          </video>
        )}
        
        <button 
          type="button" 
          onClick={prev} 
          aria-label="Précédent" 
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow border text-slate-700"
        >
          ‹
        </button>
        <button 
          type="button" 
          onClick={next} 
          aria-label="Suivant" 
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow border text-slate-700"
        >
          ›
        </button>
        
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] rounded-full bg-white/80 px-2 py-0.5 border text-slate-700">
          {idx + 1} / {items.length}
        </div>
      </div>

      <div 
        className="mt-3 grid gap-2" 
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((it, i) => (
          <ThumbItem 
            key={`${it.type}-${it.src}`} 
            item={it} 
            active={i === idx} 
            onClick={() => setIdx(i)} 
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   COMPOSANT PRINCIPAL DESKTOP
   ========================================== */

export default function ConfigurateurDesktop({
  styleJeu,
  surface,
  accentColor,
  finish,
  logoColor,
  engraving,
  setStyleJeu,
  setSurface,
  setAccentColor,
  setFinish,
  setLogoColor,
  setEngraving,
  previewItems,
  isDecorationAllowed,
  handleSurfaceClick,
}) {
  return (
    <section className="py-10 bg-slate-50 mx-8">
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <h2 className="text-3xl font-bold mb-2">Configurez votre propre raquette</h2>
        <p className="text-gray-600 max-w-xl">
          Personnalisez votre raquette en fonction de votre type de jeu et votre style
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* COLONNE GAUCHE : PRÉVISUALISATION */}
          <aside
            className="col-span-1 sticky"
            style={{
              top: "100px",
              height: "85vh",
            }}
          >
            <div className="h-full w-full rounded-3xl border border-slate-200 bg-white shadow-sm p-4 ">
              <PreviewGallery items={previewItems} />
            </div>
            
            <p className="mb-2 text-xs italic text-slate-500">
              En raison de la diversité des combinaisons, les rendus affichés sont à titre illustratif. 
              Chaque raquette fabriquée reprend les mêmes nuances, reflets et textures que celles présentées.
            </p>
          </aside>

          {/* COLONNE DROITE : OPTIONS */}
          <div className="col-span-1">
            <div className="flex flex-col space-y-6">
              
              {/* SECTION PERFORMANCE */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="px-4 py-3 border-b border-slate-200">
                  <h3 className="text-m font-semibold uppercase tracking-wide text-slate-700">
                    Performance
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-slate-600">
                    Choisissez votre type de jeu : nous fabriquons votre raquette avec les meilleurs matériaux pour s&#39;y adapter naturellement. 
                  </p>
                </div>

                <div className="px-4">
                  {/* Type de jeu */}
                  <section className="py-4 border-t border-slate-200 first:border-t-0">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-2">
                      Type de jeu
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
                      {STYLES.map((s) => {
                        const selected = styleJeu === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setStyleJeu(s.id)}
                            aria-pressed={selected}
                            className={[
                              "w-full text-left rounded-xl border p-2 sm:p-2.5",
                              "flex flex-col items-start justify-start gap-1",
                              "transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400",
                              selected
                                ? "bg-amber-50 border-amber-300"
                                : "bg-white border-slate-300 hover:border-slate-400",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "text-[13px] leading-tight",
                                selected ? "font-semibold text-slate-900" : "text-slate-800",
                              ].join(" ")}
                            >
                              {s.label}
                            </span>
                            <span className="text-[11px] leading-snug text-slate-600">
                              {s.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Surface de frappe */}
                  <section className="py-4 first:border-t-0">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-2">
                      Surface de frappe
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr w-full">
                      {SURFACES.map((s) => {
                        const allowed = (COMPAT[styleJeu] || []).includes(s.id);
                        const selected = surface === s.id;

                        const baseClass =
                          "h-full transition-all duration-150 rounded-2xl border p-2 text-left flex flex-col cursor-pointer";
                        const stateClass = selected
                          ? "border-amber-500 ring-1 ring-amber-400 bg-amber-50 -translate-y-0.5 shadow-md"
                          : "border-slate-200 bg-white";
                        const hoverClass = selected ? "" : "hover:-translate-y-0.5 hover:shadow-md";
                        const greyClass = allowed ? "" : "opacity-40 grayscale";

                        return (
                          <div key={s.id} className="relative group">
                            <button
                              type="button"
                              onClick={() => handleSurfaceClick(s.id, allowed)}
                              aria-pressed={selected}
                              className={`${baseClass} ${stateClass} ${hoverClass} ${greyClass}`}
                            >
                              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                                <img
                                  src={SURFACE_IMAGE(s.id)}
                                  alt={s.label}
                                  className="absolute inset-0 h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <span
                                className={`mt-2 text-[11px] leading-tight min-h-[2.5rem] ${
                                  selected ? "font-semibold" : ""
                                } ${allowed ? "text-slate-700" : "text-slate-400"}`}
                              >
                                {s.label}
                              </span>
                            </button>

                            {!allowed && (
                              <div className="pointer-events-none absolute left-1/2 top-full z-10 hidden -translate-x-1/2 translate-y-1 group-hover:block">
                                <div className="mt-2 max-w-[240px] rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 shadow">
                                  Surface de frappe non compatible avec « {styleLabel(styleJeu)} ».
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>

              {/* SECTION ESTHÉTIQUE */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="px-4 py-2 ">
                  <h3 className="text-m font-semibold uppercase tracking-wide text-slate-700">
                    Esthétique
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-slate-600">
                    Personnalisez l&#39;apparence de votre raquette en choisissant les couleurs et finitions qui vous ressemblent
                  </p>
                </div>

                <div className="px-4">
                  {/* Couleur de la surface de frappe */}
                  <section className="py-3 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700 whitespace-normal leading-snug">
                        <span className="block">Couleur de la</span>
                        <span className="block">surface de frappe</span>
                      </h3>
                      
                      <div className="flex-1 flex items-center justify-end gap-2 flex-nowrap">
                        {FINISH_TABS.map(tab => {
                          const isDisabled = tab.id !== "brut" && !isDecorationAllowed;
                          const isSelected = finish === tab.id;
                          
                          return (
                            <div key={tab.id} className="relative group">
                              <button
                                onClick={() => isDecorationAllowed && setFinish(tab.id)}
                                className={`shrink-0 inline-flex items-center justify-center rounded-full border ${tabBtnTightClass(tab.id)} text-[10px] leading-tight text-center ${
                                  isSelected
                                    ? "bg-amber-100 border-amber-300 font-semibold" 
                                    : isDisabled
                                    ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50"
                                    : "border-slate-300 hover:bg-slate-100 cursor-pointer"
                                }`}
                                aria-pressed={isSelected}
                              >
                                <span className="leading-tight">{tab.label}</span>
                              </button>
                              
                              {isDisabled && (
                                <div className="pointer-events-none absolute left-1/2 top-full z-10 hidden -translate-x-1/2 translate-y-1 group-hover:block">
                                  <div className="mt-2 max-w-[240px] rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 shadow whitespace-nowrap">
                                    Décoration non compatible avec cette surface de frappe
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {finish !== "brut" && (
                      <div className="mt-3 flex items-center gap-3 justify-end overflow-x-auto">
                        {PALETTE.map((c) => {
                          const selected = accentColor === c.id;
                          const imgSrc = COLOR_IMAGE(finish, c.id);
                          const isDisabled = !isDecorationAllowed;
                          
                          return (
                            <div key={`${finish}-${c.id}`} className="relative group">
                              <button
                                onClick={() => isDecorationAllowed && setAccentColor(c.id)}
                                className={`shrink-0 flex flex-col items-center gap-1 text-[11px] ${
                                  isDisabled ? "cursor-not-allowed opacity-40 grayscale" : "cursor-pointer"
                                }`}
                                aria-pressed={selected}
                              >
                                <div className={`relative w-24 aspect-square overflow-hidden rounded-md ${
                                  selected ? "ring-2 ring-amber-500" : ""
                                }`}>
                                  <img 
                                    src={imgSrc} 
                                    alt={`Aperçu ${finish} — ${c.name}`} 
                                    className="absolute inset-0 h-full w-full object-cover" 
                                  />
                                </div>
                                <span className={`w-24 text-center truncate ${
                                  selected ? "font-semibold" : ""
                                } ${isDisabled ? "text-slate-400" : "text-slate-700"}`}>
                                  {c.name}
                                </span>
                              </button>

                              {isDisabled && (
                                <div className="pointer-events-none absolute left-1/2 top-full z-10 hidden -translate-x-1/2 translate-y-1 group-hover:block">
                                  <div className="mt-2 max-w-[240px] rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 shadow">
                                    La décoration de couleur n&#39;est pas compatible avec cette surface de frappe
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>

                  {/* Couleur du logo */}
                  <section className="py-3 border-t border-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700 whitespace-nowrap">
                        Couleur du logo
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 whitespace-nowrap">
                        {LOGO_CHOICES.map((l) => {
                          const selected = logoColor === l.id;
                          return (
                            <button
                              key={l.id}
                              onClick={() => setLogoColor(l.id)}
                              className={`shrink-0 rounded-full border px-3 py-1 text-[11px] cursor-pointer ${
                                selected 
                                  ? "bg-amber-100 border-amber-300 font-semibold" 
                                  : "border-slate-300 bg-white hover:border-slate-400"
                              }`}
                              aria-pressed={selected}
                            >
                              {l.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Gravure personnalisée */}
                  <section className="py-3 border-t border-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700 whitespace-nowrap">
                        Gravure personnalisée du cadre
                      </h3>
                      <div className="flex items-center gap-3">
                        <input
                          value={engraving}
                          onChange={(e) => e.target.value.length <= 20 && setEngraving(e.target.value)}
                          placeholder="Texte (max. 20)"
                          className="w-56 rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          aria-label="Texte de gravure"
                        />
                        <span className="shrink-0 text-[10px] text-slate-500">
                          {engraving.length}/20
                        </span>
                      </div>
                    </div>
                  </section>

                </div>
              </div>

              <p className="text-xs italic text-slate-500">
                Si vous souhaitez une décoration non disponible dans le configurateur,&nbsp;
                <a
                  href="/contact"
                  className="font-semibold italic border-b border-slate-500 pb-[1px] hover:text-sky-600 hover:border-sky-600 transition-colors"
                >
                  ici
                </a>
                &nbsp;!
              </p>

              <div className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}