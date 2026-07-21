/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0F766E",
        secondary: "#14B8A6",
        accent: "#F59E0B",

        background: "#0F172A",
        surface: "#1E293B",

        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8",
        },

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.15)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      transitionDuration: {
        250: "250ms",
      },
    },
  },

  plugins: [],
};