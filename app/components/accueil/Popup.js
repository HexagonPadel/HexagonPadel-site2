"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "../../globals.css";

export default function Popup() {
  const dialogRef = useRef(null);
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [wantsPreorder, setWantsPreorder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // --- Configuration persistante ---
  const SHOWN_KEY = "hp_popup_shown";    // "1" si déjà affiché
  const START_KEY = "hp_popup_start_ms"; // timestamp de début de navigation
  const DELAY_MS = 30_000;               // 30 secondes

  // --- Apparition auto après 30s (même si changement de page) ---
  useEffect(() => {
    // Si déjà vu => ne plus rien faire
    if (localStorage.getItem(SHOWN_KEY) === "1") return;

    // Initialise le moment du premier chargement de site
    const existingStart = localStorage.getItem(START_KEY);
    if (!existingStart) {
      localStorage.setItem(START_KEY, String(Date.now()));
    }

    const interval = setInterval(() => {
      const shown = localStorage.getItem(SHOWN_KEY) === "1";
      if (shown || isOpen) return;

      const start = Number(localStorage.getItem(START_KEY) || Date.now());
      const elapsed = Date.now() - start;

      if (elapsed >= DELAY_MS) {
        setIsOpen(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const closeAndMarkShown = () => {
    localStorage.setItem(SHOWN_KEY, "1");
    setIsOpen(false);
  };

  // --- Accessibilité : ESC + tabulation ---
  useEffect(() => {
    if (!isOpen) return;
    emailRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") closeAndMarkShown();
      if (e.key === "Tab") {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  // --- Envoi email ---
  const send = async () => {
    setIsSubmitting(true);
    setOkMsg("");
    setErrMsg("");

    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email invalide");

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Lead Pop-up",
          email,
          subject: "Notification lancement 2026 — Pop-up",
          message: `Souhaite tester avant commercialisation : ${wantsPreorder ? "Oui" : "Non"}`,
        }),
      });

      if (!res.ok) throw new Error("Échec d’envoi");
      setOkMsg("Merci. Nous vous recontactons.");
      setTimeout(closeAndMarkShown, 1500);
    } catch (e) {
      setErrMsg(e.message || "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitNotify = (e) => {
    e.preventDefault();
    send();
  };

  const bg =
    "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]";

  // --- UI ---
  return (
    <div
      aria-labelledby="popup-title"
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] grid place-items-center"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#0B0F14]/70 backdrop-blur-[2px]"
        onClick={closeAndMarkShown}
      />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url(/images/forged-carbon-dark.jpg), radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06), transparent 60%)",
          backgroundSize: "cover, 100% 100%",
          backgroundPosition: "center",
        }}
      />

      {/* Fenêtre */}
      <div
        ref={dialogRef}
        className={`relative mx-4 w-full max-w-[860px] min-h-[520px] ${bg}
        rounded-3xl border border-[#2A2F36] shadow-[0_24px_80px_rgba(0,0,0,0.45)]
        p-8 md:p-10 bg-[rgba(15,19,26,0.6)] backdrop-blur-xl
        flex flex-col items-center justify-center gap-8`}
      >
        <button
          aria-label="Fermer"
          onClick={closeAndMarkShown}
          className="absolute right-6 top-6 h-11 w-11 rounded-full text-[#A6AFBD] hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-sky-500/30"
        >
          <svg
            viewBox="0 0 24 24"
            className="mx-auto h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-5 text-center">
          <Image
            src="/logos-icons/blanc-sans-fond.svg"
            alt="Hexagon Padel"
            width={200}
            height={66}
            priority
          />
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2">
            <span className="text-base font-extrabold tracking-wide text-[#0B0F14]">
              BIENTÔT DISPONIBLE
            </span>
          </div>
          <p className="max-w-3xl text-center text-[#E5EAF2] text-xl md:text-2xl leading-snug">
            Nos raquettes sont en phase finale de test et d’industrialisation.
          </p>
          <div className="mt-1 flex items-center justify-center gap-3 text-[#A6AFBD] text-base">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
              <path d="M8 2v4M16 2v4M4 10h16M7 14h1m4 0h1m4 0h1M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
            <span>Lancement officiel : début 2026</span>
          </div>
        </div>

        {okMsg && (
          <div className="mx-auto w-full max-w-2xl rounded-md bg-green-100 p-3 text-center text-green-800">
            {okMsg}
          </div>
        )}
        {errMsg && (
          <div className="mx-auto w-full max-w-2xl rounded-md bg-red-100 p-3 text-center text-red-800">
            {errMsg}
          </div>
        )}

        <form
          className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-4"
          onSubmit={submitNotify}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <input
                ref={emailRef}
                type="email"
                required
                autoComplete="email"
                placeholder="Votre e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#2F3844] bg-[#11161C] px-4 py-3 text-[#E7ECF2] outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15"
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A6AFBD]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                  <path d="M4 6l8 6 8-6M4 6v12h16V6" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#1E90FF] px-6 py-3 font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-sky-500/30 disabled:opacity-60"
            >
              {isSubmitting ? "Envoi..." : "Je veux être notifié"}
            </button>
          </div>

          <label className="mt-1 flex items-start justify-center gap-3 text-sm text-[#A6AFBD]">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 rounded border-[#2F3844] bg-[#11161C] text-[#1E90FF] focus:ring-4 focus:ring-sky-500/20"
              checked={wantsPreorder}
              onChange={(e) => setWantsPreorder(e.target.checked)}
            />
            <span className="max-w-3xl">
              Je souhaite tester les raquettes en avant-première gratuitement avant leur commercialisation
            </span>
          </label>
        </form>
      </div>
    </div>
  );
}