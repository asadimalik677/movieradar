import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        paper: "#f7f2e8",
        ember: "#d95532",
        moss: "#316b5f",
        midnight: "#10151f"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(16, 21, 31, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
