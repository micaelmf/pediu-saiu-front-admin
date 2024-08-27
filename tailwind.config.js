const skewind = require("./src/@skewind/tailwind");

module.exports = {
  presets: [skewind],
  content: ["./src/**/*.js", "./src/*.html", "./src/views/*.ejs"],
  theme: {
    extend: {
      // Extend your theme here
    },
  },
};
