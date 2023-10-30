/** @type {import('tailwindcss').Config} */
const { join } = require("path");

module.exports = {
  presets: [require("../../tailwind-base.config.js")],
  content: [
    join(__dirname, "components/**/*.{html,js,jsx,tsx}"),
    join(__dirname, "pages/**/*.{html,js,jsx,tsx}"),
  ],
};
