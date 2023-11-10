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
  plugins: [nextui(), require("./tailwind-animate")],
};
