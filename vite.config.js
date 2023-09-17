import { defineConfig } from 'vite'
const path = require('path')
const fg = require('fast-glob')
const { ViteEjsPlugin } = require('vite-plugin-ejs');

const srcPath = path.resolve(__dirname, './src')

// Building input
const input = {}
fg.sync(['src/*.html']).forEach(entry => {
  const fileName = entry.split('/').pop()
  input[fileName.replace('.html', '')] = path.join(srcPath, fileName)
})

export default defineConfig({
  root: srcPath,
  publicDir: '../public',
  resolve: {
    alias: {
      '@skewind': path.join(srcPath, '@skewind'),
      '@': srcPath,
    },
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input,
    },
  },
  plugins: [
    ViteEjsPlugin()
  ]
})
