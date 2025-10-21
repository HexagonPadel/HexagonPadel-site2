import { useEffect, useState } from "react";

export default function NotificationBanner({ show }) {
  const [shouldRender, setShouldRender] = useState(show);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setFade(false);
    } else {
      setFade(true);
      setTimeout(() => setShouldRender(false), 1000); // attend l'animation de 1s
    }
  }, [show]);

  return shouldRender ? (
    <div
      className={`fixed top-20 right-6 px-6 py-4 rounded-xl border border-gray-300 shadow-lg z-50 flex items-center gap-3 font-sans text-sm font-medium transition-opacity duration-1000 ${
        fade ? "opacity-0" : "opacity-100"
      } bg-[#e8f0ff] text-gray-900`}
    >
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Produit ajouté au panier
    </div>
  ) : null;
}