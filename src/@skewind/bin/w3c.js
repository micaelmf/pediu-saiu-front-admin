const minimist = require("minimist");
const crawlAllUrls = require("./utils/crawlAllUrls");

const args = minimist(process.argv.slice(2));
const host = args.host ?? args.h ?? "http://localhost:5173";

crawlAllUrls(host, async (response) => {
  if (!response.body) return;

  const { w3cHtmlValidator } = await import("w3c-html-validator");

  const options = { html: response.body };
  const result = await w3cHtmlValidator.validate(options);

  if (!result.validates) {
    console.log(`Invalid: ${response.request.href}`);
    w3cHtmlValidator.reporter(result);
    throw new Error();
  }
});
