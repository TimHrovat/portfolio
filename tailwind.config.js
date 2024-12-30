const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  theme: {
    fontFamily: {
      sans: ['"Poppins"', "serif"],
    },
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
        foreground: {
          DEFAULT: "#ffffff",
          muted: "#a3a3a3",
          primary: "#01cdd9",
        },

        surface: {
          primary: {
            default: {
              text: "#0a0a0a",
              border: "#01cdd9",
              bg: "#01cdd9",
            },
            hover: {
              text: "#ffffff",
              border: "#04a4b6",
              bg: "#04a4b6",
            },
          },
          primaryLight: {
            default: {
              text: "#ffffff",
              border: "#262626",
              bg: "#262626",
            },
          },
        },
      },
    },
  },
  plugins: [animate],
};
