"use client";

import React, { useState } from "react";
import {
  styleLabel,
  surfaceLabel,
  colorName,
  FINISH_TABS,
  LOGO_CHOICES,
} from "./ConfigurateurLogic";

/* Helpers récap */
const cap = (s="") => (s ? s[0].toUpperCase() + s.slice(1) : "");
const finishBase = (id="") => (
  { fibres:"Fibres", flocons:"Flocons", paillettes:"Paillettes", brut:"Brut" }[id] ||
  FINISH_TABS.find(f=>f.id===id)?.label?.split(" ")[0] || cap(id)
);
const logoLabel = (logoId="") =>
  LOGO_CHOICES.find(l=>l.id===logoId)?.label || cap(String(logoId).replace(/^logo-/, "") || "—");
const accordCouleur = (c="", plural=false) =>
  plural ? ({Doré:"Dorés", Rouge:"Rouges", Vert:"Verts", Bleu:"Bleus"}[c]||c) : c;

function finishSummary({ finish, accentColor }) {
  const base = finishBase(finish);
  if (finish === "brut") return "Brut";
  if (!accentColor) return base;
  const isPlural = finish === "fibres" || finish === "flocons" || finish === "paillettes";
  const c = accordCouleur(colorName(accentColor), isPlural);
  return `${base} ${c}`;
}

export default function ConfigurateurInterest({ config }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const recapFinish = finishSummary({ finish: config.finish, accentColor: config.accentColor });
  const recapLogo = logoLabel(config.logoColor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("Email invalide"); return; }

    setIsSubmitting(true);
    try {
      const payload = {
        name: "ContactConfigurateur",
        email,
        subject: "Intérêt configurateur Hexagon Padel",
        message:
`Nouvelle intention depuis le configurateur:

Type de jeu : ${styleLabel(config.styleJeu)}
Surface     : ${surfaceLabel(config.surface)}
Finition    : ${recapFinish}
Logo        : ${recapLogo}
Gravure     : ${config.engraving || "Aucune"}
Couleur     : ${config.accentColor ? colorName(config.accentColor) : "—"}`,
      };

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) throw new Error();
      setOk("Merci, votre configuration a bien été enregistrée et nous vous recontacterons.");
      setEmail("");
    } catch {
      setErr("Impossible d'envoyer votre demande pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-6 border border-neutral-200 rounded-xl p-4 bg-white">
      <h3 className="text-lg font-semibold mb-3">Votre configuration</h3>

      <ul className="text-sm text-neutral-700 space-y-1 mb-4">
        <li><span className="text-neutral-500">Type de jeu :</span> {styleLabel(config.styleJeu)}</li>
        <li><span className="text-neutral-500">Surface :</span> {surfaceLabel(config.surface)}</li>
        <li><span className="text-neutral-500">Finition :</span> {recapFinish}</li>
        <li><span className="text-neutral-500">Logo :</span> {recapLogo}</li>
        <li><span className="text-neutral-500">Gravure :</span> {config.engraving || "Aucune"}</li>
      </ul>

      {ok && <p className="mb-3 text-green-600 text-sm">{ok}</p>}
      {err && <p className="mb-3 text-red-600 text-sm">{err}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 sm:flex sm:space-y-0 sm:items-center">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:border-black w-full sm:w-auto"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="sm:ml-3 w-full sm:w-auto rounded-md bg-copper-light text-white px-4 py-2 font-medium hover:bg-neutral-800 disabled:opacity-60"
        >
          {isSubmitting ? "Envoi…" : "Je veux cette raquette"}
        </button>
      </form>

      <p className="mt-2 text-xs text-neutral-500 text-center sm:text-left">
        Vous serez recontacté en avant-première et bénéficierez d&#39;une offre exclusive de lancement.
      </p>
    </section>
  );
}