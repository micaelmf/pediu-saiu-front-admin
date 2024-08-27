/**
 * Convert value to string type
 *
 * @param {any} input
 * @returns {string}
 */
export const toString = (input) => {
  if (input) {
    if (typeof input === "string") {
      return input;
    }
    return String(input);
  }
  return "";
};

/**
 * Turn any string to camelCase format
 *
 * @param {string} input
 * @returns {string}
 */
export const camelize = (input) => {
  const words = _toWords(input);
  return _toCamelCase(words);
};

/**
 * Turn any string to kebab-case
 *
 * @param {string} str
 * @returns {string}
 */
export const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

function _toWords(input) {
  input = toString(input);
  const regex =
    /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
  return input.match(regex);
}

function _toCamelCase(inputArray) {
  let result = "";

  for (let i = 0, len = inputArray.length; i < len; i++) {
    let currentStr = inputArray[i];
    let tempStr = currentStr.toLowerCase();

    if (i != 0) {
      // convert first letter to upper case (the word is in lowercase)
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
    }

    result += tempStr;
  }

  return result;
}
