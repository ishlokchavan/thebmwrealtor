import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#fbfaf7",
        ink: "#141b2e",
        night: {
          50: "#eef1f9",
          100: "#d4dbef",
          200: "#a7b4dd",
          300: "#7285c4",
          400: "#465ba3",
          500: "#2c3f80",
          600: "#1f2e63",
          700: "#182450",
          800: "#111b3d",
          900: "#0d1531",
          950: "#0a1330",
        },
        gold: {
          100: "#f8eccf",
          200: "#f0d79a",
          300: "#e7c065",
          400: "#dca93a",
          500: "#c8912a",
          600: "#a67420",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(20, 27, 46, 0.08)",
        card: "0 18px 45px -20px rgba(13, 21, 49, 0.35)",
        glow: "0 20px 60px -18px rgba(220, 169, 58, 0.45)",
        float: "0 30px 70px -28px rgba(10, 19, 48, 0.6)",
      },
      backgroundImage: {
        "night-mesh":
          "radial-gradient(115% 90% at 15% 0%, #1f2e63 0%, transparent 55%), radial-gradient(120% 110% at 90% 10%, #26346e 0%, transparent 50%), linear-gradient(180deg, #0d1531 0%, #0a1330 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, rgba(220,169,58,0.6), transparent)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.9s ease both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
