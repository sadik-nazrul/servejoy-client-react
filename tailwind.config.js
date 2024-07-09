/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  presets: [keepPreset],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Inter', sans-serif",
        secondary: "'League Spartan', sans-serif"
      },
      colors: {
        primary: "#21BCF8",
        secondary: "#67D407",
      },
      fontSize: {
        maintitledex: "50px",
        maintitlemob: "40px",
        titledex: "32px",
        titlemob: "26px",
        subtitledex: "22px",
        subtitlemob: "18px",
        paragraphdex: "16px", 
        paragraphmob: "14px" 
      },
      fontWeight: {
        title: 700,
        subtitle: 600,
        medium: 500,
        paragraph: 400
      }
    },
  },
  plugins: [],
}