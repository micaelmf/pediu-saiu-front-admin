const fs = require("fs");
const path = require("path");
const camelCase = require("lodash/camelCase");
const minimist = require("minimist");
const requireModule = require("esm")(module);
const buildIconsObject = require("./utils/build-icons-object.js");

const args = minimist(process.argv.slice(2));

if (!args.path && !args.p) {
  throw new Error(
    "Please specify path to icons directory with `--path` or `-p` argument.",
  );
}

const iconPath = path.resolve(
  path.join.apply(null, (args.p ? args.p : args.path).split("/")),
);
if (!fs.existsSync(iconPath)) {
  throw new Error(`${iconPath} doesn\'t exist.`);
}

const configPath = path.join(iconPath, "icon.config.js");
if (!fs.existsSync(configPath)) {
  throw new Error(`${configPath} doesn\'t exist.`);
}

const config = requireModule(configPath).default;

const buildPath = path.join(iconPath, "icons.js");
if (fs.existsSync(buildPath)) {
  console.log(`Cleaning old js build ${buildPath}`);
  fs.unlinkSync(buildPath);
}

const jsonBuildPath = path.join(iconPath, "icons.json");
if (fs.existsSync(jsonBuildPath)) {
  console.log(`Cleaning old json build ${jsonBuildPath}`);
  fs.unlinkSync(jsonBuildPath);
}

const examplePath = path.join(iconPath, "index.js.example");
if (fs.existsSync(examplePath)) {
  console.log(`Cleaning icon registrar example file: ${examplePath}`);
  fs.unlinkSync(examplePath);
}

fs.appendFileSync(examplePath, `export {\n`);

const combinedIcons = {};
Object.keys(config).forEach((vendor) => {
  console.log(`Building ${vendor}`);
  const inDir = path.resolve(
    path.join.apply(null, config[vendor].src.split("/")),
  );

  const svgFiles = fs
    .readdirSync(inDir)
    .filter((file) => path.extname(file) === ".svg");

  const getSvg = (svgFile) => fs.readFileSync(path.join(inDir, svgFile));

  const icons = buildIconsObject(svgFiles, getSvg);

  Object.keys(icons).forEach((icon) => {
    fs.appendFileSync(
      examplePath,
      `  // ${camelCase(vendor)}__${camelCase(icon)},\n`,
    );
    fs.appendFileSync(
      buildPath,
      `export const ${camelCase(vendor)}__${camelCase(icon)} = \`${icons[icon]}\`;\n`,
    );
    combinedIcons[`${camelCase(vendor)}__${camelCase(icon)}`] = icons[icon];
  });
});

fs.writeFileSync(
  path.join(iconPath, "icons.json"),
  JSON.stringify(combinedIcons),
);

fs.appendFileSync(examplePath, `} from './icons.js'\n`);
