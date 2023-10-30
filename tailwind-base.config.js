/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["IBM Plex Mono", "monospace"]
    },
    extend: {
      backgroundImage: {
        earth: "url('../public/earth.jpg')",
        earthMobile: "url('../public/earth-mobile.jpg')",
      },
      colors: {
        textPrimary: "var(--color-textPrimary)",
        textSecondary: "var(--color-textSecondary)",
        textTertiary: "var(--color-textTertiary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        surfaceDark: "var(--color-surfaceDark)",
        surfaceModal: "var(--color-surfaceModal)",
        primary: "var(--color-primary)",
        gradientStart: "var(--color-gradientStart)",
        gradientStop: "var(--color-gradientStop)",
      },
      height: {
        "screen-3/1": "300vh",
        "screen-3/2": "250vh",
        "screen-2/1": "200vh",
        "screen-3/4": "75vh",
        "screen-3/5": "60vh",
        "screen-2/5": "40vh",
        "screen-2/3": "66vh",
        "screen-1/2": "50vh",
        "screen-1/3": "33vh",
        "screen-1/4": "25vh",
        "screen-1/6": "16vh",
      },
      width: {
        "9/10": "90%",
        "screen-2/1": "200vw",
      },
      minWidth: {
        "2/1": "200%",
        "3/1": "300%",
        "128": "35rem",
        "24": "6rem",
        "32": "8rem",
        "48": "12rem"
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            10: "10deg",
            15: "15deg",
            20: "20deg",
            25: "25deg",
            30: "30deg",
            45: "45deg",
            60: "60deg",
            90: "90deg",
            120: "120deg",
            135: "135deg",
          }),
        }
      );
    }),
  ],
};
