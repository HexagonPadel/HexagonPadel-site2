"use client";

/**
 * app/onepage/page.js
 * Landing page e-commerce mono-produit “Hexagon Padel”
 * Stack: Next 15.3.1 (App Router), React 19, Tailwind 4.1.4, JS only.
 * Page principale. Le configurateur est maintenant externalisé dans components/Configurateur.js
 */

import Image from "next/image";
import { Flag, Recycle, Wrench, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Configurateur from '../components/accueil/Configurateur';

/* ---------- Utilities ---------- */

function carbonBgDataUrl({ shade = "#0b0d10", accent = "#111418" } = {}) {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${shade}"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
        <pattern id="p" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="url(#g)"/>
          <rect x="0" y="0" width="4" height="4" fill="${accent}" opacity="0.28"/>
          <rect x="4" y="4" width="4" height="4" fill="${accent}" opacity="0.28"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#p)"/>
    </svg>
  `);
  return `url("data:image/svg+xml;charset=utf-8,${svg}")`;
}

/* ---------- Sections ---------- */

function Hero({ onPrimaryCta }) {
  const bgUrl = useMemo(() => carbonBgDataUrl({}), []);
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden"
      style={{ backgroundImage: bgUrl, backgroundSize: "64px 64px", backgroundAttachment: "fixed" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:pb-24 lg:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-left">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl text-inherit">
              La raquette de padel française
              qui change les règles
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-inherit">
              Made in France, tamis remplaçable, matériaux recyclés
            </p>
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onPrimaryCta}
                className="rounded-xl px-5 py-3 text-sm font-medium text-black focus:outline-none focus-visible:ring bg-[var(--btn-bg,theme(colors.amber.500))] hover:bg-[var(--btn-hover-bg,theme(colors.amber.400))] focus-visible:ring-[var(--btn-ring,theme(colors.amber.500))]"
                aria-label="Aller au configurateur"
              >
                Configurer ma raquette
              </button>
              <a
                href="#specs"
                className="text-sm text-inherit underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring focus-visible:ring-[var(--link-ring,theme(colors.amber.500))]"
              >
                Voir les spécifications
              </a>
            </div>
          </div>

          {/* Visuel hero */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-zinc-900/60 to-black/80 shadow-[0_0_120px_rgba(16,24,40,0.6)] backdrop-blur-sm" />
            <div className="absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-3xl bg-[linear-gradient(120deg,_rgba(255,255,255,0.12)_0%,_rgba(255,255,255,0.02)_60%)] p-[1px]">
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black">
                <Image
                  src="/hero-section/hero-pic.png"
                  alt="Hexagon Padel — hero"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 480px"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute inset-0 animate-shine bg-[linear-gradient(60deg,transparent_0%,rgba(255,255,255,0.06)_35%,transparent_65%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const items = [
    {
      icon: () => (
        <div className="flex h-5 w-7 overflow-hidden rounded-sm border border-zinc-700">
          <div className="flex-1 bg-blue-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-600" />
        </div>
      ),
      label: "Fabriquée en France"
    },
    { icon: Recycle, label: "Carbone recyclé et résine biosourcée", color: "text-green-500" },
    { icon: Wrench, label: "Tamis remplaçable", color: "text-gray-200" },
    { icon: ShieldCheck, label: "Cadre garanti 2 ans", color: "text-blue-500" },
  ];

  return (
    <section aria-label="Avantages" className="border-y border-[var(--section-border,#0b0b0b)] bg-inherit">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {items.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-3">
            <span aria-hidden className="rounded-xl bg-zinc-900 p-2 flex items-center justify-center">
              <Icon className={`h-5 w-5 ${color || "text-inherit"}`} />
            </span>
            <span className="text-sm text-inherit">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StoryProduct() {
  return (
    <section aria-label="Innovation" className="bg-inherit">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <Image
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
                <rect width='100%' height='100%' fill='#0f1216'/>
                <g stroke='#2a3038' stroke-width='3' fill='none' opacity='0.9'>
                  <ellipse cx='300' cy='420' rx='160' ry='220'/>
                  <ellipse cx='900' cy='420' rx='160' ry='220'/>
                  <rect x='560' y='650' width='80' height='160' rx='12'/>
                </g>
                <g fill='#0b0d10' stroke='#39414b' stroke-width='2'>
                  <circle cx='600' cy='300' r='70'/>
                  <circle cx='600' cy='420' r='50'/>
                  <circle cx='600' cy='540' r='35'/>
                </g>
              </svg>`
            )}`}
            alt="Vue éclatée du produit — placeholder"
            fill
            sizes="(max-width: 1024px) 90vw, 640px"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-inherit">Une innovation brevetée qui change les règles</h2>
          <ul className="mt-6 space-y-4 text-inherit">
            <li>
              <span className="font-medium text-inherit">Modular performance</span> — adaptez le tamis à votre jeu en
              quelques secondes.
            </li>
            <li>
              <span className="font-medium text-inherit">Eco & cost efficiency</span> — remplacez le tamis, pas la
              raquette.
            </li>
            <li>
              <span className="font-medium text-inherit">Forged carbon durability</span> — structure robuste, poids
              optimisé.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const spec = [
    ["Poids", "360 g"],
    ["Équilibre", "260 mm"],
    ["Forme", "Hybride hexagonale"],
    ["Noyau", "EVA soft bi-densité"],
    ["Matériau", "Carbone forgé recyclé + résine biosourcée"],
  ];
  return (
    <section id="specs" aria-label="Spécifications" className="bg-inherit">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-inherit">Spécifications techniques</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800">
          <dl className="divide-y divide-zinc-800">
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-2 bg-zinc-950 px-4 py-4 sm:grid-cols-3">
                <dt className="text-sm text-inherit">{k}</dt>
                <dd className="col-span-2 text-sm text-inherit">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4 rounded-xl border border-[var(--card-border,#27272a)] bg-inherit px-4 py-3 text-sm text-inherit">
          Convient aux joueurs intermédiaires et avancés.
        </div>
      </div>
    </section>
  );
}

function InstagramFeedPlaceholder() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-inherit p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-inherit">Instagram</h3>
        <span className="text-xs text-inherit/70">3 derniers posts</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='100%' height='100%' fill='#0f1216'/><text x='50%' y='50%' fill='#2a3038' font-size='28' text-anchor='middle' dominant-baseline='middle'>Post ${i +
                  1}</text></svg>`
              )}`}
              alt={`Instagram placeholder ${i + 1}`}
              width={600}
              height={600}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* TODO: intégrer via Supabase Edge Function + cache */}
    </div>
  );
}

function SocialProof() {
  const testimonials = [
    {
      quote:
        "Prise en main immédiate. La modularité du tamis change tout pour ajuster le contrôle et la puissance.",
      author: "Alex, classé Padel",
    },
    {
      quote:
        "Finition premium et sensations nettes à l’impact. Le carbone forgé apporte une vraie rigidité utile.",
      author: "Sophie, coach",
    },
    {
      quote: "Excellent rapport perfs / durabilité. Je ne change que le tamis après 6 mois intensifs.",
      author: "Nicolas, joueur confirmé",
    },
  ];
  const logos = ["Partner A", "Partner B", "Partner C", "Partner D", "Partner E"];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <section aria-label="Preuve sociale et communauté" className="bg-inherit">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-inherit">Ils jouent Hexagon</h2>
          <div className="flex items-center gap-2">
            <button
              aria-label="Précédent"
              onClick={prev}
              className="rounded-lg border border-zinc-800 p-2 text-inherit hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Suivant"
              onClick={next}
              className="rounded-lg border border-zinc-800 p-2 text-inherit hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          <figure className="p-6">
            <blockquote className="text-balance text-lg text-inherit">“{testimonials[idx].quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-inherit/70">— {testimonials[idx].author}</figcaption>
          </figure>
        </div>

        <div className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-5">
          {logos.map((name) => (
            <div
              key={name}
              className="flex h-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-xs text-inherit"
              aria-label={`Logo ${name}`}
            >
              {name}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <InstagramFeedPlaceholder />
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section aria-label="Histoire et engagements" className="bg-inherit">
      <div className="mx-auto max-w-7xl grid items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <Image
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
                <rect width='100%' height='100%' fill='#0f1216'/>
                <g stroke='#2a3038' fill='none'>
                  <rect x='140' y='220' width='320' height='220' rx='16' stroke-width='4'/>
                  <rect x='520' y='180' width='540' height='300' rx='16' stroke-width='4'/>
                  <rect x='220' y='520' width='760' height='200' rx='16' stroke-width='4'/>
                </g>
              </svg>`
            )}`}
            alt="Atelier — placeholder"
            fill
            sizes="(max-width: 1024px) 90vw, 640px"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-inherit">Conçue ici. Pensée pour durer.</h2>
          <p className="mt-4 text-inherit">
            Fabrication locale, chaîne d’approvisionnement courte, matériaux recyclés et biosourcés. Nous optimisons
            chaque étape pour réduire l’empreinte tout en maximisant la performance.
          </p>
          <p className="mt-3 text-inherit/80">
            Le cadre en carbone forgé est compressé puis fini en atelier. Le tamis interchangeable prolonge la vie du
            produit tout en réduisant les coûts d’usage.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onPrimaryCta }) {
  return (
    <section aria-label="Appel à l'action final" className="relative overflow-hidden bg-inherit">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.06),_transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-inherit">Rejoignez la révolution Hexagon.</h2>
            <p className="mt-3 max-w-xl text-inherit">
              Une plateforme de performance modulaire, pensée pour évoluer avec votre jeu.
            </p>
            <div className="mt-6">
              <button
                onClick={onPrimaryCta}
                className="rounded-xl px-5 py-3 text-sm font-medium text-black focus:outline-none focus-visible:ring bg-[var(--btn-bg,theme(colors.amber.500))] hover:bg-[var(--btn-hover-bg,theme(colors.amber.400))] focus-visible:ring-[var(--btn-ring,theme(colors.amber.500))]"
              >
                Configurer ma raquette maintenant
              </button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[21/9] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black">
            <Image
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2100 900'>
                  <defs>
                    <linearGradient id='lg' x1='0' y1='0' x2='1' y2='1'>
                      <stop offset='0' stop-color='#0b0d10'/>
                      <stop offset='1' stop-color='#111418'/>
                    </linearGradient>
                  </defs>
                  <rect width='100%' height='100%' fill='url(#lg)'/>
                  <ellipse cx='1050' cy='450' rx='480' ry='260' fill='none' stroke='#2a3038' stroke-width='6'/>
                </svg>`
              )}`}
              alt="Raquette dramatique — placeholder"
              fill
              sizes="(max-width: 1024px) 90vw, 900px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    ["#technologies", "Technologies"],
    ["#engagements", "Engagements"],
    ["#histoire", "Histoire"],
    ["#contact", "Contact"],
    ["#cgv", "CGV"],
    ["#mentions", "Mentions légales"],
  ];
  return (
    <footer aria-label="Pied de page" className="border-t border-[var(--footer-border,#0b0b0b)] bg-inherit">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav aria-label="Liens de footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-inherit">
          {links.map(([href, label]) => (
            <a key={label} href={href} className="hover:text-zinc-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500">
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--card-border,#27272a)] bg-inherit p-3 text-center text-xs text-inherit">🚚 Livraison offerte</div>
          <div className="rounded-xl border border-[var(--card-border,#27272a)] bg-inherit p-3 text-center text-xs text-inherit">🔒 Paiement sécurisé</div>
          <div className="rounded-xl border border-[var(--card-border,#27272a)] bg-inherit p-3 text-center text-xs text-inherit">↩️ Retours 7 jours</div>
        </div>

        <form
          className="mt-6 flex max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Inscription newsletter (démo).");
          }}
          aria-label="Inscription newsletter"
        >
          <input
            type="email"
            required
            placeholder="Recevez les nouveautés Hexagon"
            className="w-full rounded-xl border border-[var(--input-border,#27272a)] bg-inherit px-3 py-2 text-sm text-inherit placeholder-[color:inherit] focus:outline-none focus:ring-2 focus:ring-[var(--input-ring,theme(colors.sky.500))]"
          />
          <button
            type="submit"
            className="rounded-xl px-4 py-2 text-sm font-medium text-black bg-[var(--btn-secondary-bg,theme(colors.sky.500))] hover:bg-[var(--btn-secondary-hover,theme(colors.sky.400))] focus-visible:outline-none focus-visible:ring focus-visible:ring-[var(--btn-secondary-ring,theme(colors.sky.500))]"
          >
            S’inscrire
          </button>
        </form>

        <p className="mt-6 text-xs text-inherit/70">© {new Date().getFullYear()} Hexagon Padel. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

/* ---------- Page assembly ---------- */

export default function Page() {
  const goToConfigurator = () => {
    const el = document.getElementById("configurator");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <main className="min-h-dvh antialiased bg-inherit text-inherit">
      <a href="#configurator" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded focus:bg-amber-500 focus:px-3 focus:py-1 focus:text-black">
        Aller au configurateur
      </a>

      <Hero onPrimaryCta={goToConfigurator} />
      <Advantages />
      <Configurateur /> {/* section importée */}
      <StoryProduct />
      <Specs />
      <SocialProof />
      <Story />
      <FinalCta onPrimaryCta={goToConfigurator} />
      <Footer />

      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-120%) translateY(-20%); }
          100% { transform: translateX(120%) translateY(20%); }
        }
        .animate-shine {
          animation: ${reduceMotion ? "none" : "shine 3.4s linear infinite"};
          will-change: transform;
        }
      `}</style>

      {/* TODO: remplacer placeholders par assets réels (Next/Image).
               TODO: brancher panier Supabase côté Configurateur.
               TODO: intégrer flux Instagram via Supabase Edge + revalidation. */}
    </main>
  );
}