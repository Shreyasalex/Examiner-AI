import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige: {
          50: "#FAF6EE",
          200: "#F2EBE0",
          400: "#E3D5BC",
        },
        lavender: {
          200: "#E3D9F7",
          400: "#C9B8EC",
          600: "#9C7FDB",
        },
        blue: {
          300: "#A9BFF2",
          500: "#7B93E8",
          700: "#4A63C9",
        },
        ink: {
          600: "#5C5868",
          900: "#1E1B24",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.55)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
