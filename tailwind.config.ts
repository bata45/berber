import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm near-black base — never pure #000
        bg: "#0c0b0e",
        bg2: "#121016",
        surface: "#17141c",
        surface2: "#1e1a24",
        line: "#2a2530",
        // Antique brass accent
        brass: {
          DEFAULT: "#c9a24b",
          light: "#e3c373",
          deep: "#8c6a2f",
        },
        ink: "#ece7df",
        muted: "#a39c92",
        muted2: "#6f6a63",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      maxWidth: {
        shell: "76rem",
      },
      boxShadow: {
        // Layered, tinted — not the generic single soft drop shadow
        lift: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 18px 40px -24px rgba(0,0,0,0.9)",
        brass: "0 10px 30px -12px rgba(201,162,75,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pole: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 -28px" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        pole: "pole 1.1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
