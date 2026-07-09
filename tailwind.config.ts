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
        midnight: "#10151f",
        "netflix-red": "#E50914",
        "netflix-dark": "#141414",
        "netflix-black": "#000000",
        "netflix-gray": "#333333",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(16, 21, 31, 0.10)",
        "red-glow": "0 0 20px rgba(229, 9, 20, 0.5), 0 0 40px rgba(229, 9, 20, 0.2)",
        "card-hover": "0 25px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(229,9,20,0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 20px rgba(229,9,20,0.2)" },
          "50%": { textShadow: "0 0 20px rgba(229,9,20,0.8), 0 0 40px rgba(229,9,20,0.4), 0 0 60px rgba(229,9,20,0.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "netflix-gradient": "linear-gradient(135deg, #E50914 0%, #B8070F 100%)",
        "hero-gradient": "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.1) 100%)",
        "card-gradient": "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    }
  },
  plugins: []
};

export default config;
