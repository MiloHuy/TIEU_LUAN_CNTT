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
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
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
        lato_off: ["Lato", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
        roboto_slap: ["Roboto Slab", "sans-serif"],
        young_serif: ["Young Serif", "sans-serif"],
        libre: ["Libre Baskerville", "serif"],
        questrial: ["Questrial", "sans-serif"],
      },

      backgroundImage: {
        bg_hcmute_01: "url('./assets/images/bg-hcmute-01.jpg')",
        bg_hcmute_02: "url('./assets/images/bg-hcmute-02.jpg')",
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

        bg_main: "#000000",
        text_color_gray: "#973737",

        bg_date_picker_primary: "#3F89E3",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        custom_shadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",
      },
      brightness: {
        25: ".25",
        175: "1.75",
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
        swipe: {
          "0%": {
            margin: 0,
            transform: "rotate(0deg)",
          },

          "100%": {
            "margin-right": "20px",
            transform: "rotate(-5deg)",
          },
        },
        updown: {
          "0%": {
            transform: "translateX(-10%)",
          },
          "50%": {
            transform: "translateX(10%)",
          },
          "100%": {
            transform: "translateX(-10%)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        loading: "loader infinite 2s",
        handswipe: "swipe 0.8s alternate infinite",
        UpAndDown: "updown infinite 1.2s",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
    require("tailwindcss-animate"),
  ],
};
