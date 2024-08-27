import Backdrop from "@skewind/utils/backdrop";

/**
 * Default options
 */

const Default = {
  showClass: "sidebar--drawer",
};

/**
 * Class definition
 */

class Drawer {
  constructor(sidebarEl, options) {
    this._sidebarEl = sidebarEl;
    this._shown = false;

    this._backdrop = new Backdrop(document.body, {
      onClick: this.hide,
      class: "drawer-backdrop",
    });

    this._options = {
      ...Default,
      ...options,
    };
  }

  /**
   * Toggle the drawer visibility
   * by calling show / hide method
   *
   * @returns {void}
   */
  toggle = () => {
    this._shown ? this.hide() : this.show();
  };

  /**
   * Hide the drawer by removing class
   * specified in the options
   *
   * @returns {void}
   */
  hide = () => {
    this._shown = false;
    this._sidebarEl.classList.remove(this._options.showClass);
    this._backdrop.hide();
  };

  /**
   * Hide the drawer by adding class
   * specified in the options
   *
   * @returns {void}
   */
  show = () => {
    this._shown = true;
    this._sidebarEl.classList.add(this._options.showClass);
    this._backdrop.show();
  };
}

/**
 * Single instance
 */
let instance;

const init = () => {
  // Creating instance
  const sidebarEl = document.querySelector(".sidebar");
  if (!sidebarEl) return;

  instance = new Drawer(sidebarEl);

  // Toggle implementation through Data API
  document.querySelectorAll(`[data-drawer-toggle]`).forEach((toggleEl) => {
    toggleEl.addEventListener("click", (e) => {
      e.preventDefault();
      instance.toggle();
    });
  });
};

if (document.readyState && document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
}

export default instance;
