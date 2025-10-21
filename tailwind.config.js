//Étendre tailwind.config.js avec mes couleurs, polices, radius

// Importation des polices par défaut de Tailwind (utile si on veut les étendre)
const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin');
const animate = require("tailwindcss-animate");

module.exports = {
  //1. CONTENT: Définit les fichiers à analyser pour les classes
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/globals.css"
  ],

  //2. THEME: Définit les valeurs par défaut de Tailwind
  theme: {
    // Configuration du container Tailwind (centré + padding + largeur max)
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px", // Largeur max du container à 2xl
      },
    },

    // Extension des valeurs de thème par défaut
    extend: {
      // Polices personnalisées
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        heading: ["Playfair Display", "sans-serif"],
      },

  
      
      borderRadius: {
        medium: '0.5rem',
        small: '0.25rem',
        large: '1rem',
      },

      // Définition des animations (keyframes)
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },

      // Attribution des noms aux animations définies plus haut
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
      },
    },
  },
  
};