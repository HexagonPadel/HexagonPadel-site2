"use client";

import { useMemo, useState } from "react";

/* === Données === */

const RESUME_ROWS = [
  { k: "Poids", v: "360–370 g" },
  { k: "Équilibre", v: "Neutre, 265 mm" },
  { k: "Épaisseur", v: "38 mm" },
  { k: "Forme", v: "Goutte d'eau" },
  { k: "Cadre", v: "100% Carbone forgé" },
  { k: "Tamis / faces", v: "100% fibres de carbone (ou carbone/lin)" },
];

const CONSTRUCTION_ROWS = [
  { k: "Fabrication", v: "France (Clisson)" },
  { k: "Résine", v: "Résine époxy biosourcée" },
  { k: "Fibres carbone", v: "Recyclées (filière industrielle française)" },
  { k: "Fibres lin", v: "Naturelle et française" },
  { k: "Tamis", v: "Remplaçable" },
  { k: "Décoration", v: "Directement dans le moule (aucun sticker, aucune peinture)" },
];

const DETAILS_ROWS = [
  { k: "Poids", v: "360–370 g", hint: "Le poids idéal selon nos testeurs" },
  { k: "Équilibre", v: "Neutre, 265 mm", hint: "Neutre à légèrement en tête" },
  { k: "Épaisseur", v: "38 mm", hint: "Épaisseur réglementaire de la fédération internationale de padel" },
  { k: "Forme", v: "Goutte d'eau", hint: "Forme optimisée pour le contrôle et la puissance" },
  { k: "Cadre", v: "Carbone forgé", hint: "Fibres recyclées + résine bio-sourcée" },
  { k: "Tamis / faces", v: "Composite 100% fibres de carbone", hint: "Hybride carbone / lin pour la configuration 'Contrôle'" },
  { k: "Noyau", v: "EVA Soft bi-densité", hint: "Mousse bi-densité pour une meilleure absorption des vibrations" },
  { k: "Finition", v: "Mat micro-texturée", hint: "Pour de meilleurs effets" },
  { k: "Vibrations", v: "Limitées", hint: "Le cadre en carbone forgé monobloc limite les vibrations" },
  { k: "Sweet spot", v: "Centré élargi", hint: "Pour un meilleur contrôle" },
  { k: "Maniabilité", v: "Excellente", hint: "Design ultra ajouré" },
  { k: "Fabrication", v: "100% France", hint: "Clisson en Loire-Atlantique" },
];

/* === Tableau compact "Détails" === */

function SpecTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/70">
      <div className="divide-y divide-slate-200/70">
        {rows.map((r, i) => (
          <div
            key={r.k + i}
            className="grid grid-cols-1 md:grid-cols-[0.9fr_2.1fr] gap-x-3 gap-y-1 px-3 md:px-4 bg-transparent"
          >
            <div className="py-1.5 font-medium text-sm text-slate-800">
              {r.k}
            </div>
            <div className="py-1.5">
              <div className="text-sm text-slate-900">
                {r.v}
              </div>
              {r.hint && (
                <div className="mt-0.5 text-[11px] text-slate-500">
                  {r.hint}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === Composant Principal === */

export default function TechnicalSpecs({
  title = "Spécifications techniques",
  subtitle = "Synthèse des caractéristiques clés",
  specs = DETAILS_ROWS,
  id = "specs",
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const grouped = useMemo(() => {
    const mid = Math.ceil(specs.length / 2);
    return [specs.slice(0, mid), specs.slice(mid)];
  }, [specs]);

  return (
    <section id={id} className="section section-bright">
      <div className="section-inner">
        {/* Titre & sous-titre standard (gérés par le CSS global) */}
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle mb-8">{subtitle}</p>

        {/* Tout le reste en text-sm */}
        <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white/80 to-white/60 shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_10px_30px_-10px_rgba(0,0,0,0.25)] text-sm text-slate-800">
          {/* Header Datasheet */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200/70">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span
                className="inline-flex size-2.5 rounded-full bg-emerald-500/90"
                aria-hidden
              />
              <span>Datasheet</span>
            </div>
            <div className="text-sm text-slate-500">
              Rev. 2025-Q4
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Résumé + Construction */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
              {/* Résumé */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Résumé
                </h3>

                <div className="rounded-2xl border border-slate-200/70 p-3 md:p-4 bg-white/70">
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {RESUME_ROWS.map((r, i) => (
                      <div key={r.k + i} className="contents">
                        <dt className="text-slate-500">{r.k}</dt>
                        <dd className="text-right font-medium text-slate-900">
                          {r.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Construction */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Made in France éco-responsable
                </h3>

                <div className="rounded-2xl border border-slate-200/70 p-3 md:p-4 bg-white/70">
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {CONSTRUCTION_ROWS.map((r, i) => (
                      <div key={r.k + i} className="contents">
                        <dt className="text-slate-500">{r.k}</dt>
                        <dd className="text-right font-medium text-slate-900">
                          {r.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Détails (dépliable) */}
            <div className="mt-5 lg:mt-7">
              <div className="flex items-center mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Détails
                  </h3>

                  <button
                    type="button"
                    onClick={() => setDetailsOpen((o) => !o)}
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-slate-400 text-sm leading-none text-slate-700 bg-white hover:bg-slate-100 transition"
                    aria-expanded={detailsOpen}
                    aria-label={detailsOpen ? "Réduire les détails" : "Afficher les détails"}
                  >
                    {detailsOpen ? "−" : "+"}
                  </button>
                </div>
              </div>

              {detailsOpen && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                  <SpecTable rows={grouped[0]} />
                  <SpecTable rows={grouped[1]} />
                </div>
              )}

              {/* CTA bas de bloc */}
              <div className="mt-4">
                <a
                  href="#precommandeemail"
                  className="btn-action btn-action--flat"
                >
                  <span className="btn-action__text">
                    Être informé du lancement
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}