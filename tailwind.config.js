const skewind = require('./src/@skewind/tailwind')

module.exports = {
  presets: [skewind],
  content: [
    './src/**/*.js',
    './src/*.html',
  ],
  theme: {
    extend: {
      // Extend your theme here
    },
  },
}
