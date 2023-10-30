/** @type {import('tailwindcss').Config} */
const { join } = require("path");

module.exports = {
  presets: [require("../../tailwind-base.config.js")],
  content: [
    join(__dirname, "components/**/*.{html,js,jsx,tsx}"),
    join(__dirname, "pages/**/*.{html,js,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        modalTooltip: "var(--color-modal-tooltip)",
        modalTooltipLight: "var(--color-modal-tooltip-light)",
        modalTooltipLightHover: "var(--color-modal-tooltip-light-hover)",
      },
    },
  },
};
