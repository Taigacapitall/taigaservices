// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // toutes tes pages et composants React
  ],
  darkMode: "class", // optionnel, utile si tu veux basculer entre light/dark
  theme: {
    extend: {
      colors: {
        // palette custom (utilisée dans le JSX que je t’ai donné)
        brand: {
          blue: "#2563eb",   // équivalent "blue-600"
          indigo: "#4f46e5", // équivalent "indigo-600"
          dark: "#020204",   // fond principal
        },
      },
      backgroundImage: {
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
