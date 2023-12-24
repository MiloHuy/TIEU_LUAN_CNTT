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
        noto: ["Noto Sans", "serif"],
        open_sans: ["Open Sans", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
        maven: ["Maven Pro", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },

      backgroundImage: {
        bg_hcmute: "url('./assets/images/bg-hcmute-02.jpg')",
      },
      rotate: {
        28: "28deg",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        layout: "200px minmax(900px, 1fr) 100px",
      },
      colors: {
        bg_popup_primary: "#333333",
        bg_popup_secondary: "#ccc",
        bg_popup_third: "#4A5859",
        bg_popup_fourth: "#7C8989",

        bg_dropdown_primary: "#323232",

        bg_button_delete: "#2F2F2F",

        table_background: "#A3A3A3",
        focus: "#9BAE96",
      },
      keyframes: {
        loader: {
          "15%": {
            transform: "translateX(0)",
          },
          "45%": {
            transform: " translateX(230px)",
          },
          "65%": {
            transform: " translateX(230px)",
          },
          "95%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        loading: "loader infinite 2s",
      },
      transitionDelay: {
        400: "400ms",
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
            background: "#0A0A0A",
            dropdown_background: "#121212",
            foreground: "#ECEDEE",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#121212",
            },
            secondary: {
              DEFAULT: "#2c2c2c",
            },
            focus: "#9BAE96",
          },
        },
      },
    }),
    require("./tailwind-animate"),
  ],
};
