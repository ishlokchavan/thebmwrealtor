import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f5f7",
        ink: "#0a0c10",
        // Carbon — cool near-black used for dark sections
        carbon: {
          50: "#eceef2",
          100: "#d5d9e1",
          200: "#aab2c1",
          300: "#7d879c",
          400: "#525d73",
          500: "#333c4d",
          600: "#232a37",
          700: "#181d27",
          800: "#12161f",
          900: "#0d1017",
          950: "#0a0c10",
        },
        // BMW blue — primary brand + CTA
        bmw: {
          50: "#e9f2fd",
          100: "#cee0fa",
          200: "#9dc2f4",
          300: "#6ba2ee",
          400: "#3f85e6",
          500: "#1c69d4",
          600: "#0f57c0",
          700: "#0b459b",
          800: "#0c3a7d",
          900: "#0c2f61",
          950: "#071c3d",
        },
        // BMW M motorsport tricolor
        m: {
          light: "#4ea3e0",
          blue: "#16588e",
          red: "#e4002b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(10, 12, 16, 0.08)",
        card: "0 18px 45px -20px rgba(7, 28, 61, 0.35)",
        glow: "0 18px 50px -16px rgba(28, 105, 212, 0.55)",
        float: "0 30px 70px -28px rgba(7, 20, 45, 0.65)",
      },
      backgroundImage: {
        "carbon-mesh":
          "radial-gradient(115% 90% at 12% 0%, #123566 0%, transparent 55%), radial-gradient(120% 110% at 92% 8%, #0d2f63 0%, transparent 52%), linear-gradient(180deg, #0d1017 0%, #0a0c10 100%)",
        "m-stripe":
          "linear-gradient(90deg, #4ea3e0 0 33.33%, #16588e 33.33% 66.66%, #e4002b 66.66% 100%)",
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
