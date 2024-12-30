const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xs: ["12px", { lineHeight: "16px" }],
      sm: ["14px", { lineHeight: "20px" }],
      base: ["16px", { lineHeight: "24px" }],
      lg: ["18px", { lineHeight: "28px" }],
      xl: ["20px", { lineHeight: "28px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
      "3xl": ["30px", { lineHeight: "36px" }],
      "4xl": ["36px", { lineHeight: "36px" }],
      "5xl": ["48px", { lineHeight: "1" }],
      "6xl": ["60px", { lineHeight: "1" }],
      "7xl": ["72px", { lineHeight: "1" }],
      "8xl": ["96px", { lineHeight: "1" }],
      "9xl": ["144px", { lineHeight: "1" }],
    },
    extend: {
      colors: {
        background: "#1A2730",
        foreground: "#B0CEE2",

        surface: {
          primary: {
            default: {
              text: "#ffffff",
              border: "#E95D2C",
              bg: "#E95D2C",
            },
            hover: {
              text: "#ffffff",
              border: "#136877",
              bg: "#136877",
            },
          },
          primaryLight: {
            default: {
              text: "#ffffff",
              border: "#45586C",
              bg: "#45586C",
            },
            hover: {
              text: "#ffffff",
              border: "#145665",
              bg: "#145665",
            },
          },
        },
      },
    },
  },
  plugins: [animate],
};
