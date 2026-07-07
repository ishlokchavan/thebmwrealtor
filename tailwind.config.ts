import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#82adff",
          400: "#4d84ff",
          500: "#215eff",
          600: "#1443db",
          700: "#1234ad",
          800: "#142e85",
          900: "#152a68",
          950: "#0b1740",
        },
        accent: {
          400: "#facc15",
          500: "#eab308",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(20, 30, 80, 0.25)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(120% 120% at 50% 0%, #1b3a8a 0%, #0b1740 55%, #060c24 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
