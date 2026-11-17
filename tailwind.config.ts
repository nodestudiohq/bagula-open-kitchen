import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: "#e23744", "brand-dark": "#c42a37", "brand-soft": "#fff1f2", ink: "#1a1a1a", mute: "#6b6b6b", surface: "#f6f5f3", veg: "#267e3e", gold: "#d4a24c" },
      fontFamily: { sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;