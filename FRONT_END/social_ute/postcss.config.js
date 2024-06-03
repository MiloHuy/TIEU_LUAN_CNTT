module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"), // add this line
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
