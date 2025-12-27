import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FDFCFA",
        canvas: "#F7F5F2",
        stone: "#E8E5E0",
        silk: "#D4CFC7",
        copper: "#B87333",
        rose: "#E8B4B8",
        sage: "#95A893",
        ocean: "#7C9CAE",
        plum: "#8B5A8C",
        gold: "#D4A76A",
      },
      fontFamily: {
        italiana: ["Italiana", "serif"],
        editorial: ["Editorial New", "serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
