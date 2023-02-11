/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      colors: {
        rdark: "#000000",
        rblue: {
          100: "#E8F2FF", // Light Blue
          200: "#B3D4FF", // Blue Lagoon
          300: "#5AA6ED", // Open Blue <--
          400: "#0076FF", // Blue
          500: "#0767BF", // Electric Blue <--
          600: "#0A4C8C", // Blue Jeans
          700: "#08315C", // Blue Sapphire
          800: "#02203B", // Oxford Blue <--
          900: "#010B1F",
        },
        rpink: {
          100: "#F9E8F5",
          200: "#F4B8E3",
          300: "#F28AD1",
          400: "#E85ABF",
          500: "#EF50B9",
          600: "#D43E9F",
          700: "#B32C85",
          800: "#91196B",
          900: "#700750",
        },
        rgreen: {
          100: "#E1F9E8",
          200: "#B8F4B8",
          300: "#8DF28A",
          400: "#5BE85A",
          500: "#59FF30",
          600: "#3FD43E",
          700: "#35B32C",
          800: "#2B9119",
          900: "#216007",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
  ],
};
