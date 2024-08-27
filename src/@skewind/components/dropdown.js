import tippy from "tippy.js";
// import Icon from '../../js/components/icon'
import { manageInstances, optionsFromData } from "../utils/component";

/**
 * Default options
 */

const Default = {
  trigger: "click",
  interactive: true,
  animation: "shift-toward",
  placement: "bottom-start",
};

/**
 * Class definition
 */

class Dropdown {
  constructor(toggleEl, options) {
    // Attributes definition
    this._toggleEl = toggleEl;
    this._contentEl = options.content
      ? options.content
      : toggleEl.nextElementSibling;
    this.Scrollbar = null;
    this._options = {
      ...Default,
      ...options,
    };

    // Tippy instance
    this.tippy = tippy(this._toggleEl, {
      theme: "dropdown",
      ...this._options,
      ...{
        content: this._contentEl,
        onHide: this._handleHide,
        onShow: this._handleShow,
      },
    });

    // Icon.replace(this._contentEl)
    this._toggleEl.dispatchEvent(new Event("dropdown.init"));
  }

  /**
   * Get dropdown content element
   *
   * @returns {Element}
   */
  getContentEl = () => this._contentEl;

  /**
   * To enable custom scrollbar on the dropdown content
   *
   * @param {Scrollbar} Scrollbar
   * @returns {void}
   */
  has = (Scrollbar) => {
    this.Scrollbar = Scrollbar;
  };

  /**
   * Destroy tippy instance
   *
   * @returns {void}
   */
  dispose = () => {
    this.tippy.destroy();
    this._toggleEl.dispatchEvent(new Event("dropdown.dispose"));
  };

  /**
   * Handle on hide events of the dropdown
   *
   * @returns {void}
   */
  _handleHide = () => {
    this._toggleEl.dispatchEvent(new Event("dropdown.hide"));

    const { onHide } = this._options;
    if (onHide) {
      onHide(this.tippy);
    }
  };

  /**
   * Handle on show events of the dropdown
   *
   * @returns {void}
   */
  _handleShow = () => {
    if (this.Scrollbar) {
      this.Scrollbar.dataApi(this._contentEl);
    }

    this._toggleEl.dispatchEvent(new Event("dropdown.show"));

    const { onShow } = this._options;
    if (onShow) {
      onShow(this.tippy);
    }
  };
}

/**
 * Instance manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } =
  manageInstances({
    create: (toggleEl, options = {}) => new Dropdown(toggleEl, options),
    destroy: (instance) => instance.dispose(),
  });

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  // Dropdowns
  wrapperEl.querySelectorAll(`[data-dropdown-toggle]`).forEach((toggleEl) => {
    const options = optionsFromData(toggleEl, "dropdown");
    if (options.toggle) {
      options.content = document.querySelector(options.toggle);
    }

    if ("toggle" in options) {
      delete options.toggle;
    }

    if (options.appendTo && options.appendTo !== "parent") {
      options.appendTo = document.querySelector(options.appendTo);
    }

    getOrCreateInstance(toggleEl, options);
  });

  // Popovers
  wrapperEl.querySelectorAll(`[data-popover-toggle]`).forEach((toggleEl) => {
    const options = optionsFromData(toggleEl, "popover");
    options.theme = "popover";

    if (options.toggle) {
      options.content = document.querySelector(options.toggle);
    }

    if (options.appendTo && options.appendTo !== "parent") {
      options.appendTo = document.querySelector(options.appendTo);
    }

    if ("toggle" in options) {
      delete options.toggle;
    }

    getOrCreateInstance(toggleEl, options);
  });
};

if (document.readyState && document.readyState !== "loading") {
  dataApi(document);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    dataApi(document);
  });
}

export default {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
  dataApi,
};
