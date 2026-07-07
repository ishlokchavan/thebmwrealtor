import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f4ef",
        ink: "#14120d",
        // Obsidian — warm near-black used for premium dark sections
        carbon: {
          50: "#f3f1ea",
          100: "#ded9cc",
          200: "#c1b9a4",
          300: "#9a8f78",
          400: "#6f6552",
          500: "#4e4738",
          600: "#3a352a",
          700: "#29251d",
          800: "#1b1813",
          900: "#12100c",
          950: "#0b0a07",
        },
        // Gold — wealth accent + CTA
        gold: {
          50: "#fbf7ec",
          100: "#f6edcf",
          200: "#eeda9f",
          300: "#e4c66d",
          400: "#d4af37",
          500: "#bd982f",
          600: "#9c7826",
          700: "#7c5d20",
          800: "#634a1e",
          900: "#523d1c",
          950: "#2f210c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(20, 18, 13, 0.08)",
        card: "0 18px 45px -20px rgba(20, 18, 13, 0.4)",
        glow: "0 18px 50px -16px rgba(212, 175, 55, 0.5)",
        float: "0 30px 70px -28px rgba(11, 10, 7, 0.7)",
      },
      backgroundImage: {
        "carbon-mesh":
          "radial-gradient(110% 90% at 12% 0%, rgba(212,175,55,0.14) 0%, transparent 55%), radial-gradient(120% 110% at 92% 8%, rgba(212,175,55,0.08) 0%, transparent 52%), linear-gradient(180deg, #12100c 0%, #0b0a07 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
