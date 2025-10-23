"use client";

import { useState, useEffect } from "react";
import ConfigurateurInterest from "./ConfigurateurInterest";
import {
  STYLES,
  SURFACES,
  PALETTE,
  LOGO_CHOICES,
  FINISH_TABS,
  COMPAT,
  SURFACE_IMAGE,
  COLOR_IMAGE,
} from "./ConfigurateurLogic";

/* ==========================================
   COMPOSANTS UI MOBILE
   ========================================== */

function ThumbItemMobile({ item, active, onClick }) {
  const borderClass = active
    ? "border-amber-500 ring-1 ring-amber-500"
    : "border-slate-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`aspect-square overflow-hidden rounded-lg border ${borderClass} bg-white`}
      aria-label={item.alt}
      title={item.alt}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-contain object-center bg-white"
          loading="lazy"
        />
      ) : (
        <video
          className="h-full w-full object-contain object-center bg-black"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={item.src} type="video/mp4" />
        </video>
      )}
    </button>
  );
}

function PreviewGalleryMobile({ items = [] }) {
  const [idx, setIdx] = useState(0);
  const len = Array.isArray(items) ? items.length : 0;
  const safeIdx = Math.min(idx, Math.max(0, len - 1));
  const current = len ? items[safeIdx] : null;
  useEffect(() => {
    setIdx(0);
  }, [len]);

  const prev = () => setIdx((i) => (len ? (i + len - 1) % len : 0));
  const next = () => setIdx((i) => (len ? (i + 1) % len : 0));
  

  if (!len) {
    return (
      <div className="flex flex-col w-full">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
          <span className="text-xs text-slate-500">Aucun média disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Image principale carrée */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-white border border-slate-200">
        {current?.type === "image" ? (
          <img
            src={current?.src}
            alt={current?.alt}
            className="h-full w-full object-contain object-center bg-white"
            loading="eager"
          />
        ) : (
          <video
            key={current?.src}
            className="h-full w-full object-contain object-center bg-black"
            muted
            loop
            playsInline
            autoPlay
          >
            <source src={current?.src} type="video/mp4" />
          </video>
        )}

        {/* flèches navigation */}
        <button
          type="button"
          onClick={prev}
          aria-label="Précédent"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-2 py-1 shadow border text-slate-700 text-sm"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Suivant"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-2 py-1 shadow border text-slate-700 text-sm"
        >
          ›
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] rounded-full bg-white/80 px-2 py-0.5 border text-slate-700">
          {idx + 1} / {items.length}
        </div>
      </div>

      {/* Miniatures */}
      <div
        className="mt-2 grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${Math.min(len, 4)}, minmax(0, 1fr))`,
        }}
      >
{items.slice(0, 4).map((it, i) => (
  <ThumbItemMobile
    key={`${it?.type || "media"}-${it?.src || i}`}
    item={it}
    active={i === safeIdx}
    onClick={() => setIdx(i)}
  />
))}
      </div>
    </div>
  );
}

/* ==========================================
   COMPOSANT PRINCIPAL MOBILE
   ========================================== */

export default function ConfigurateurMobile({
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
    <section className="py-8 bg-slate-50 px-4">
      {/* En-tête */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Configurez votre raquette</h2>
        <p className="text-sm text-gray-600">
          Personnalisez votre raquette selon votre style
        </p>
      </div>

      {/* PRÉVISUALISATION */}
      <div className="mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
        <PreviewGalleryMobile items={previewItems || []} />
        </div>

        <p className="mt-2 text-[10px] italic text-slate-500">
        En raison de la diversité des combinaisons, certains rendus affichés sont à titre illustratif. 
        Chaque raquette fabriquée reprend les mêmes nuances, reflets et textures que celles présentées.
        </p>
      </div>

      {/* CONFIGURATION */}
      <div className="flex flex-col space-y-4">
        {/* PERFORMANCE */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-3 py-2.5 border-b border-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Performance
            </h3>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-600">
              Choisissez votre type de jeu
            </p>
          </div>

          <div className="px-3">
            <section className="py-3 border-t border-slate-200 first:border-t-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 mb-2">
                Type de jeu
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {STYLES.map((s) => {
                  const selected = styleJeu === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStyleJeu(s.id)}
                      aria-pressed={selected}
                      className={`w-full text-left rounded-lg border p-2 flex flex-col gap-0.5 transition ${
                        selected
                          ? "bg-amber-50 border-amber-300"
                          : "bg-white border-slate-300"
                      }`}
                    >
                      <span
                        className={`text-xs leading-tight ${
                          selected
                            ? "font-semibold text-slate-900"
                            : "text-slate-800"
                        }`}
                      >
                        {s.label}
                      </span>
                      <span className="text-[10px] leading-snug text-slate-600">
                        {s.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Surface de frappe */}
            <section className="py-3 border-t border-slate-200">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 mb-2">
                Surface de frappe
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {SURFACES.map((s) => {
                  const allowed = (COMPAT[styleJeu] || []).includes(s.id);
                  const selected = surface === s.id;

                  const baseClass =
                    "transition-all duration-150 rounded-xl border p-2 text-left flex flex-col cursor-pointer";
                  const stateClass = selected
                    ? "border-amber-500 ring-1 ring-amber-400 bg-amber-50 shadow"
                    : "border-slate-200 bg-white";
                  const greyClass = allowed ? "" : "opacity-40 grayscale";

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSurfaceClick(s.id, allowed)}
                      aria-pressed={selected}
                      className={`${baseClass} ${stateClass} ${greyClass}`}
                    >
                      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                        <img
                          src={SURFACE_IMAGE(s.id)}
                          alt={s.label}
                          className="absolute inset-0 h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      <span
                        className={`mt-1.5 text-[10px] leading-tight ${
                          selected ? "font-semibold" : ""
                        } ${allowed ? "text-slate-700" : "text-slate-400"}`}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {/* ESTHÉTIQUE */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-3 py-2.5 border-b border-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Esthétique
            </h3>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-600">
              Personnalisez l&#39;apparence
            </p>
          </div>

          <div className="px-3">
            {/* Couleur de la surface */}
            <section className="py-3 border-t border-slate-200">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 mb-2">
                Couleur surface de frappe
              </h3>

              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                {FINISH_TABS.map((tab) => {
                  const isDisabled = tab.id !== "brut" && !isDecorationAllowed;
                  const isSelected = finish === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => isDecorationAllowed && setFinish(tab.id)}
                      className={`shrink-0 inline-flex items-center justify-center rounded-full border px-2 py-1 text-[10px] leading-tight ${
                        isSelected
                          ? "bg-amber-100 border-amber-300 font-semibold"
                          : isDisabled
                          ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50"
                          : "border-slate-300 hover:bg-slate-100 cursor-pointer"
                      }`}
                      aria-pressed={isSelected}
                      disabled={isDisabled}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {finish !== "brut" && (
                <div className="grid grid-cols-4 gap-2">
                  {PALETTE.map((c) => {
                    const selected = accentColor === c.id;
                    const imgSrc = COLOR_IMAGE(finish, c.id);
                    const isDisabled = !isDecorationAllowed;

                    return (
                      <button
                        key={`${finish}-${c.id}`}
                        onClick={() =>
                          isDecorationAllowed && setAccentColor(c.id)
                        }
                        className={`flex flex-col items-center gap-1 text-[10px] ${
                          isDisabled
                            ? "cursor-not-allowed opacity-40 grayscale"
                            : "cursor-pointer"
                        }`}
                        aria-pressed={selected}
                        disabled={isDisabled}
                      >
                        <div
                          className={`relative w-full aspect-square overflow-hidden rounded-md ${
                            selected ? "ring-2 ring-amber-500" : ""
                          }`}
                        >
                          <img
                            src={imgSrc}
                            alt={`${finish} ${c.name}`}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <span
                          className={`w-full text-center truncate ${
                            selected ? "font-semibold" : ""
                          } ${
                            isDisabled ? "text-slate-400" : "text-slate-700"
                          }`}
                        >
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Couleur du logo */}
            <section className="py-3 border-t border-slate-200">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 mb-2">
                Couleur du logo
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {LOGO_CHOICES.map((l) => {
                  const selected = logoColor === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLogoColor(l.id)}
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] cursor-pointer ${
                        selected
                          ? "bg-amber-100 border-amber-300 font-semibold"
                          : "border-slate-300 bg-white"
                      }`}
                      aria-pressed={selected}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Gravure */}
            <section className="py-3 border-t border-slate-200">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 mb-2">
                Gravure personnalisée
              </h3>
              <div className="flex items-center gap-2">
                <input
                  value={engraving}
                  onChange={(e) =>
                    e.target.value.length <= 20 &&
                    setEngraving(e.target.value)
                  }
                  placeholder="Texte (max. 20)"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label="Texte de gravure"
                />
                <span className="shrink-0 text-[9px] text-slate-500">
                  {engraving.length}/20
                </span>
              </div>
            </section>
          </div>
        </div>

        <p className="text-[10px] italic text-slate-500">
          Pour une décoration personnalisée,&nbsp;
          <a
            href="/contact"
            className="font-semibold italic border-b border-slate-500 pb-[1px] hover:text-sky-600 hover:border-sky-600 transition-colors"
          >
            contactez-nous
          </a>
          &nbsp;!
        </p>
        {/* === Section d’intérêt configurateur (mobile) === */}
<div className="mt-4">
  <ConfigurateurInterest
    config={{
      styleJeu,
      surface,
      accentColor,
      finish,
      logoColor,
      engraving,
    }}
  />
</div>
      </div>
    </section>
  );
}