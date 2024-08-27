import classnames from "classnames/dedupe";
import config from "@/icons/icon.config.js";
import * as iconPaths from "@/icons";

/**
 * Icon: this class responsible to create svg icon from icon:build distribution
 * /icons/index.js
 */

class Icon {
  /**
   * Attributes definition & call initialization.
   *
   * @returns {void}
   */
  constructor(iconName, attrs = {}, path = null) {
    this._iconName = iconName;
    this._vendor = null;
    this._icon = null;
    this._attrs = attrs;
    this._path = path;

    this._init();
  }

  /**
   * Create inline SVG.
   *
   * @param {Object} attrs
   * @returns {string}
   */
  toSvg = (attrs = {}) => {
    const combinedAttrs = {
      ...{ xmlns: "http://www.w3.org/2000/svg" },
      ...config[this._vendor].attrs, // from icon.config.js
      ...this._attrs, // from constructor
      ...attrs, // from toSvg(attrs),
      ...{
        class: classnames(
          config[this._vendor].attrs.class, // from icon.config.js
          this._attrs.class, // from constructor
          `icon icon--${this._vendor}`,
          attrs.class, // from toSvg(attrs)
        ),
      },
    };

    return `<svg ${attrsToString(combinedAttrs)}>${this._path}</svg>`;
  };

  /**
   * Get vendor of the icon
   *
   * @returns {string}
   */
  getVendor = () => {
    return this._vendor;
  };

  /**
   * Resolve icon path and set more data to attributes.
   *
   * @returns {void}
   */
  _init = () => {
    // Set icon path
    if (this._path === null) {
      const path = iconPaths[this._iconName];

      if (!path) {
        throw new Error(
          `Icon not found: "${this._iconName}". Consider checking on the "icons/index.js" whether the icon is correctly imported`,
        );
      }

      this._path = path;
    }

    // Icon was found, let's set vendor and icon
    const [vendor, icon] = this._iconName.split("__");
    this._vendor = vendor;
    this._icon = icon;
  };
}

/**
 * Convert attributes object to string of HTML attributes.
 *
 * @param {Object} attrs
 * @returns {string}
 */
function attrsToString(attrs) {
  return Object.keys(attrs)
    .map((key) => `${key}="${attrs[key]}"`)
    .join(" ");
}

/**
 * Replace mounted temp element to svg icon
 *
 * @param {HTMLElement} wrapper
 * @returns {void}
 */
function replace(wrapper = document) {
  wrapper.querySelectorAll(`[data-icon]`).forEach((iconEl) => {
    try {
      // Get element attrs
      const attrs = iconEl.getAttributeNames().reduce((acc, name) => {
        if (name === "data-icon") return acc;
        return { ...acc, [name]: iconEl.getAttribute(name) };
      }, {});

      // Build svg element
      const instance = new Icon(iconEl.dataset.icon, attrs);
      const svgString = instance.toSvg(attrs);
      const svgDocument = new DOMParser().parseFromString(
        svgString,
        "image/svg+xml",
      );
      const svgElement = svgDocument.querySelector("svg");

      iconEl.parentNode.replaceChild(svgElement, iconEl);
    } catch (e) {
      console.error(iconEl, e);
    }
  });
}

/**
 * This is for creating icon programmatically
 *
 * @param {HTMLElement | string} elOrClassName
 * @param {object} attrs
 * @returns {Icon}
 */
const create = (iconName, attrs = {}, path) => {
  return new Icon(iconName, attrs, path);
};

/**
 * Data API implementation
 */

if (document.readyState && document.readyState !== "loading") {
  replace(document);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    replace(document);
  });
}

export default { replace, create };
