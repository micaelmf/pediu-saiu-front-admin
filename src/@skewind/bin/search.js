const path = require("path");
const fs = require("fs");
const minimist = require("minimist");
const crawlAllUrls = require("./utils/crawlAllUrls");

const args = minimist(process.argv.slice(2));

if (!args.output && !args.o) {
  throw new Error(
    "Please specify the output path by using `--output` or `-o` argument.",
  );
}

const host = args.host ?? args.h ?? "http://localhost:5173";

const outputPath = path.resolve(
  path.join.apply(null, (args.output ? args.output : args.o).split("/")),
);
if (!fs.existsSync(outputPath)) {
  throw new Error(`${outputPath} doesn't exists.`);
}

const searchJsonPath = path.join(outputPath, "search.json");
if (!fs.existsSync(searchJsonPath)) {
  console.log(`Cleaning old ${searchJsonPath}`);
  fs.unlinkSync(searchJsonPath);
}

console.log(`Indexing to ${searchJsonPath}`);

const pages = [];
crawlAllUrls(host, async ({ $, request }) => {
  if (!$) return;

  const name = $("meta[name=title]").attr("content") ?? "Untitled";
  const icon = $("meta[name=icon]").attr("content") ?? "feather__bookmark";
  const url = request.href.replace(host, "");

  pages.push({
    type: "page",
    name,
    icon,
    url,
  });

  fs.writeFileSync(searchJsonPath, JSON.stringify(pages));
});
