/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "100",
        1000: "1000",
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
      },
      backgroundImage: {
        bg_hcmute: "url('./assets/images/bg-hcmute-02.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {
            background: "#000000", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
          },
        },
      },
    }),
    require("./tailwind-animate"),
  ],
};
