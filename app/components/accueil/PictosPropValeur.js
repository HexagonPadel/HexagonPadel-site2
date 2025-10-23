"use client";

import { Wrench, ShieldCheck } from "lucide-react";

/* Icône drapeau FR minimal */
function FlagFr() {
  return (
    <span aria-hidden className="flex h-5 w-7 overflow-hidden rounded-sm border border-zinc-700">
      <span className="flex-1 bg-blue-600" />
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-red-600" />
    </span>
  );
}

/* Icône plante verte */
function LeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-green-500"
    >
      <path d="M5 21c8 0 14-6 14-14V3a12 12 0 0 0-12 12v6z" />
    </svg>
  );
}

export default function Advantages() {
  const items = [
    { icon: FlagFr, label: "Fabriquée en France" },
    { icon: ShieldCheck, label: "Cadre en carbone forgé", color: "text-blue-500" },
    { icon: LeafIcon, label: "Carbone recyclé et résine biosourcée" },
    { icon: Wrench, label: "Tamis remplaçable", color: "text-gray-200" },
  ];

  return (
    <section aria-label="Avantages">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {items.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="rounded-xl bg-zinc-900 p-2 flex items-center justify-center">
              <Icon className={`h-5 w-5 ${color || "text-inherit"}`} />
            </span>
            <span className="text-sm text-inherit">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}