"use client";

import { useMemo } from "react";

/* === Données === */

/* Tableau 1 — Résumé */
const RESUME_ROWS = [
  { k: "Poids", v: "360–370 g" },
  { k: "Équilibre", v: "Neutre, 265 mm" },
  { k: "Épaisseur", v: "38 mm" },
  { k: "Forme", v: "Goutte d'eau" },
  { k: "Cadre", v: "100% Carbone forgé" },
  { k: "Tamis / faces", v: "100% fibres de carbone (ou carbone/lin)" },
];

/* Tableau 2 — Construction */
const CONSTRUCTION_ROWS = [
  { k: "Fabrication", v: "France (Clisson)" },
  { k: "Résine", v: "Résine époxy biosourcée" },
  { k: "Fibres carbone", v: "Recyclées (filière industrielle française)" },
  { k: "Fibres lin", v: "Naturelle et française" },
  { k: "Tamis", v: "Remplaçable" },
  { k: "Décoration", v: "Directement dans le moule (aucun sticker, aucune peinture)" },
];

/* Tableau 3 — Détails */
const DETAILS_ROWS = [
  { k: "Poids", v: "360–370 g", hint: "Le poids idéal selon nos testeurs" },
  { k: "Équilibre", v: "Neutre, 265 mm", hint: "Neutre à légèrement en tête" },
  { k: "Épaisseur", v: "38 mm" },
  { k: "Forme", v: "Goutte d'eau" },
  { k: "Cadre", v: "Carbone forgé", hint: "Fibres recyclées + résine bio-sourcée" },
  { k: "Tamis / faces", v: "Composite 100% fibres de carbone", hint: "Puissance / Équilibre / Contrôle" },
  { k: "Noyau", v: "EVA Soft bi-densité" },
  { k: "Finition", v: "Mat micro-texturée", hint: "Accroche lift modérée" },
  { k: "Rigidité cadre", v: "Moyenne +", hint: "Filtrage vibrations optimisé" },
  { k: "Sweet spot", v: "Centré élargi" },
  { k: "Maniabilité", v: "Excellente", hint: "Grâce au design ultra ajouré" },
  { k: "Fabrication", v: "France",  hint: "Clisson en Loire-Atlantique" },
];

/* === Composants === */
function SpecTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
      <div className="divide-y divide-slate-200/70 dark:divide-slate-700/60">
        {rows.map((r, i) => (
          <div
            key={r.k + i}
            className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 px-4 md:px-6 bg-transparent"
          >
            <div className="py-3 md:py-4 text-sm md:text-base font-medium text-slate-800 dark:text-slate-100">
              {r.k}
            </div>
            <div className="md:col-span-2 py-3 md:py-4">
              <div className="text-sm md:text-base text-slate-900 dark:text-slate-100">{r.v}</div>
              {r.hint ? (
                <div className="mt-0.5 text-[11px] md:text-xs text-slate-500 dark:text-slate-400">{r.hint}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechnicalSpecs({
  title = "Specifications techniques",
  subtitle = "Synthèse des caractéristiques clés",
  specs = DETAILS_ROWS, // garde possibilité de surcharger via props
  id = "specs",
}) {
  const grouped = useMemo(() => {
    const mid = Math.ceil(specs.length / 2);
    return [specs.slice(0, mid), specs.slice(mid)];
  }, [specs]);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-40 max-w-5xl " />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-6 md:mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 id={`${id}-title`} className="text-3xl font-bold mb-2">
              {title}
            </h2>
            <p className="text-gray-600 max-w-xl">{subtitle}</p>
          </div>
        </header>

        <div className="rounded-3xl border border-slate-200/70 dark:border-slate-700/60 bg-gradient-to-b from-white/80 to-white/60 dark:from-slate-900/70 dark:to-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_10px_30px_-10px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200/70 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex size-2.5 rounded-full bg-emerald-500/90" aria-hidden />
              <span>Datasheet</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Rev. 2025-Q4</div>
          </div>

          <div className="p-4 md:p-6">
            {/* Ligne du haut: Résumé + Construction (layout identique) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Résumé */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Résumé</h3>
                <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-4 bg-white/70 dark:bg-slate-900/60">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {RESUME_ROWS.map((r, i) => (
                      <div key={r.k + i} className="contents">
                        <dt className="text-slate-500 dark:text-slate-400">{r.k}</dt>
                        <dd className="text-right font-medium text-slate-900 dark:text-slate-100">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Construction */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Made in France éco-responsable</h3>
                <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-4 bg-white/70 dark:bg-slate-900/60">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {CONSTRUCTION_ROWS.map((r, i) => (
                      <div key={r.k + i} className="contents">
                        <dt className="text-slate-500 dark:text-slate-400">{r.k}</dt>
                        <dd className="text-right font-medium text-slate-900 dark:text-slate-100">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Détails en 2 colonnes, rendu inchangé */}
            <div className="mt-6 lg:mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Détails</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpecTable rows={grouped[0]} />
                <SpecTable rows={grouped[1]} />
              </div>

              <div className="flex items-center justify-end pt-4">
                <a href="#precommandeemail" className="text-sm font-semibold underline underline-offset-4 text-slate-900 dark:text-slate-100">
                  Être informé du lancement
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}