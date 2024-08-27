const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const plugin = require("./plugin");

/**
 * Presets
 */
module.exports = {
  theme: {
    extend: require("./theme"),
  },
  plugins: [
    typography,
    forms({
      strategy: "base",
    }),
    plugin,
  ],
};
