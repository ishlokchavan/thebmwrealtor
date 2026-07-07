import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f3ec",
        ink: "#2b2a26",
        // Warm charcoal / taupe neutrals for dark sections & text
        carbon: {
          50: "#f4f2ec",
          100: "#e6e2d8",
          200: "#cbc6b9",
          300: "#a8a294",
          400: "#837e72",
          500: "#625e54",
          600: "#4c4941",
          700: "#3a3833",
          800: "#2b2a26",
          900: "#232220",
          950: "#1a1917",
        },
        // Emerald — the single accent colour
        emerald: {
          50: "#e9f6ef",
          100: "#c9e9d7",
          200: "#98d3b3",
          300: "#63b98c",
          400: "#329e69",
          500: "#157a4d",
          600: "#10633f",
          700: "#0e5034",
          800: "#0d402b",
          900: "#0b3524",
          950: "#052015",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(43, 42, 38, 0.08)",
        card: "0 18px 45px -20px rgba(26, 25, 23, 0.35)",
        glow: "0 18px 50px -16px rgba(21, 122, 77, 0.4)",
        float: "0 30px 70px -28px rgba(26, 25, 23, 0.55)",
      },
      backgroundImage: {
        "carbon-mesh":
          "radial-gradient(110% 90% at 12% 0%, rgba(21,122,77,0.16) 0%, transparent 55%), radial-gradient(120% 110% at 92% 8%, rgba(21,122,77,0.09) 0%, transparent 52%), linear-gradient(180deg, #232220 0%, #1a1917 100%)",
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
