import { manageInstances, optionsFromData } from "../utils/component";
import Backdrop from "../utils/backdrop";

/**
 * Default options
 */

const Default = {
  //
};

/**
 * Class definition
 */

class Modal {
  constructor(targetEl = null, options = {}) {
    this._targetEl = targetEl;
    this._isHidden = true;

    this._backdrop = new Backdrop(document.body, {
      position: "fixed",
      class: "modal-backdrop",
      onClick: this.hide,
    });

    this._options = {
      ...Default,
      ...options,
    };

    this._teleported = false;

    this._init();
  }

  /**
   * Run initialization
   *
   * @returns {void}
   */
  _init = () => {
    this._setDefaultAttributes();
    this._setHiddenAttributes();

    if (this._targetEl.getAttribute("aria-modal")) {
      this.show();
    }
  };

  /**
   * Toggle the modal
   *
   * @returns {void}
   */
  toggle = () => {
    if (this._isHidden) {
      this.show();
    } else {
      this.hide();
    }

    // dispatch on toggle event
    this._targetEl.dispatchEvent(new Event("modal.toggle"));
  };

  /**
   * Show the modal
   *
   * @returns {void}
   */
  show = () => {
    if (!this._teleported) {
      this._backdrop.getBackdropEl().appendChild(this._targetEl);
    }

    this._backdrop.show();

    setTimeout(() => {
      this._setShownAttributes();
      this._isHidden = false;

      // dispatch on show event
      this._targetEl.dispatchEvent(new Event("modal.show"));
    }, 0);
  };

  /**
   * Hide the modal
   *
   * @returns {void}
   */
  hide = () => {
    this._backdrop.hide();

    this._setHiddenAttributes();
    this._isHidden = true;

    // dispatch on hide event
    this._targetEl.dispatchEvent(new Event("modal.hide"));
  };

  /**
   * Set required attribute of the modal
   *
   * @returns {void}
   */
  _setDefaultAttributes = () => {
    this._targetEl.setAttribute("role", "dialog");
    this._targetEl.setAttribute("tabindex", "-1");
  };

  /**
   * Set attributes when the modal is shown
   *
   * @returns {void}
   */
  _setShownAttributes = () => {
    this._targetEl.setAttribute("aria-modal", "true");
    this._targetEl.removeAttribute("aria-hidden");
  };

  /**
   * Set attributes when the modal is hidden
   *
   * @returns {void}
   */
  _setHiddenAttributes = () => {
    this._targetEl.removeAttribute("aria-modal");
    this._targetEl.setAttribute("aria-hidden", "true");
  };
}

/**
 * Instance manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } =
  manageInstances({
    create: (targetEl, options) => new Modal(targetEl, options),
  });

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll("[data-modal-toggle]").forEach((toggleEl) => {
    const modalId = toggleEl.getAttribute("data-modal-toggle");
    const modalEl = document.getElementById(modalId);
    const options = optionsFromData(modalEl, "modal");

    const instance = getOrCreateInstance(modalEl, options);

    toggleEl.addEventListener("click", (e) => {
      e.preventDefault();
      instance.toggle();
    });
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
