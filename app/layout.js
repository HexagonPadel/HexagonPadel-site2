"use client";

import { useState, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import Popup from "./components/accueil/Popup"; // ← ajout



export default function RootLayout({ children }) {
  const [pushContent, setPushContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);

  const handleMenuStateChange = (push, open) => {
    setPushContent(push);
    setMenuOpen(open);

  };

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") setCookieAccepted(true);
  }, []);

  useEffect(() => {
    if (!cookieAccepted) return;
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TFKW959J');
    `;
    document.head.appendChild(script);
  }, [cookieAccepted]);

  const menuHeight = 50;

  return (
    <html lang="fr">
      <head />
      <body
        style={{
          paddingTop: pushContent && menuOpen ? `${menuHeight}px` : undefined,
          transition: "padding-top 0.5s ease",
        }}
      >
        {cookieAccepted && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TFKW959J"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <Header onMenuStateChange={handleMenuStateChange} />
        {children}

        {/* Popup global, autonome (timer 30 s + affichage unique) */}
        <Popup />

        <Footer />
        <CookieConsent setCookieAccepted={setCookieAccepted} />
      </body>
    </html>
  );
}