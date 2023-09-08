const fs = require('fs')
const path = require('path')
const resolveConfig = require('tailwindcss/resolveConfig')

const args = require('minimist')(process.argv.slice(2));

if (!args.input) {
  throw new Error('Please specify the path to tailwind.config.js by using `--input` argument.')
}

if (!args.output) {
  throw new Error('Please specify `--output` argument.')
}

const inputPath = path.resolve(args.input)
const outputPath = path.resolve(args.output)

if (!fs.existsSync(inputPath)) {
  throw new Error(`${inputPath} doesn't exist.`)
}

if (!fs.existsSync(outputPath)) {
  throw new Error(`${outputPath} doesn\'t exist.`)
}

const userConfig = require(inputPath)
const resolvedConfig = resolveConfig(userConfig)

const BUILD_PATH = path.join(outputPath, 'theme.json')

fs.writeFileSync(BUILD_PATH, JSON.stringify(resolvedConfig.theme))
