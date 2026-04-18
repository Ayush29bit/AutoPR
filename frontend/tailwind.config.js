/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   "#0a0c0f",
          secondary: "#111318",
          tertiary:  "#181c23",
        },
        border: {
          dim:    "#1e2530",
          base:   "#252d3a",
          bright: "#2e3a4a",
        },
        accent: "#00e5a0",
        ink: {
          primary:   "#e8edf5",
          secondary: "#8a95a3",
          muted:     "#4a5568",
          ghost:     "#2a3240",
        },
        status: {
          success: "#00e5a0",
          warning: "#f59e0b",
          error:   "#ff6b6b",
          info:    "#4d9fff",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "blink":        "blink 1s step-end infinite",
        "pulse-accent": "pulse-accent 2s ease-in-out infinite",
        "slide-in":     "slide-in 0.3s ease forwards",
        "fade-in":      "fade-in 0.4s ease forwards",
        "flash":        "flash 0.3s ease forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "pulse-accent": {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        flash: {
          "0%":   { opacity: "0" },
          "30%":  { opacity: "0.08" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}