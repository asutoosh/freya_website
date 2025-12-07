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
        background: "#1E1E1E",
        bubble: "#2A2A2A",
        sidebar: "#1A1A1A",
        accent: "#FFD700",
        // Freya Quinn Brand Colors
        navy: "#1E1E1E",
        steel: "#2A2A2A",
        cyan: "#00BFA6",
        green: "#FFD700",
        purple: "#00BFA6",
        telegram: "#24A3E5",
        light: "#F5F5F5",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "blur-in": "blurIn 0.4s ease-in-out",
        "glow": "glow 2s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-in": "slideIn 0.5s ease-out",
        "slide-in-delay": "slideIn 0.5s ease-out 0.2s both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blurIn: {
          "0%": { backdropFilter: "blur(0px)", opacity: "0" },
          "100%": { backdropFilter: "blur(16px)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)" },
        },
        pulseGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
            transform: "scale(1)",
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.9)",
            transform: "scale(1.02)",
          },
        },
        slideIn: {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
