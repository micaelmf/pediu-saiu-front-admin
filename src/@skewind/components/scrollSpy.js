import { manageInstances, optionsFromData } from "../utils/component";
import { isDisabled, isVisible } from "../utils/element";

/**
 * Default options
 */

const Default = {
  rootMargin: "0px 0px -25%",
  activeClass: "active",
  smoothScroll: true,
};

/**
 * Class definition
 */

class ScrollSpy {
  constructor(el, options) {
    // Attributes definition
    this._el = el;
    this._rootEl = getComputedStyle(el).overflowY === "visible" ? null : el;
    this._targetEl = this._resolveTargetEl(options);
    this._options = { ...Default, ...options };

    this._targetLinks = new Map();
    this._observableSections = new Map();
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0,
    };

    this.refresh();

    setTimeout(() => {
      if (window.location.hash) {
        this._scrollTo(window.location.hash);
      }
    }, 100);
  }

  /**
   * Run initialization
   *
   * @returns {void}
   */
  refresh = () => {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();

    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }

    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  };

  _initializeTargetsAndObservables = () => {
    this._targetLinks = new Map();
    this._observableSections = new Map();

    this._targetEl.querySelectorAll("[href]").forEach((anchor) => {
      // ensure that the anchor has an id and is not disabled
      if (!anchor.hash || isDisabled(anchor)) {
        return;
      }

      const observableSection = this._el.querySelector(anchor.hash);

      // ensure that the observableSection exists & is visible
      if (isVisible(observableSection)) {
        this._targetLinks.set(anchor.hash, anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    });
  };

  _maybeEnableSmoothScroll = () => {
    if (!this._options.smoothScroll) {
      return;
    }

    const clickCallback = (event) => {
      event.preventDefault();
      this._scrollTo(event.target.hash);
    };

    this._targetEl.querySelectorAll("[href]").forEach((anchorEl) => {
      // unregister previous listener
      anchorEl.removeEventListener("click", clickCallback);
      anchorEl.addEventListener("click", clickCallback);
    });
  };

  _scrollTo = (selector) => {
    const observableSection = this._observableSections.get(selector);
    if (observableSection) {
      const root = this._rootEl || window;
      const height = observableSection.offsetTop - this._el.offsetTop;
      if (root.scrollTo) {
        root.scrollTo({ top: height, behavior: "smooth" });
        return;
      }

      // Chrome 60 doesn't support `scrollTo`
      root.scrollTop = height;
    }
  };

  _getNewObserver = () => {
    const options = {
      root: this._rootEl,
      threshold: [0.1, 0.5, 1],
      rootMargin: this._options.rootMargin,
    };

    return new IntersectionObserver(
      (entries) => this._observerCallback(entries),
      options,
    );
  };

  // The logic of selection
  _observerCallback = (entries) => {
    const targetElement = (entry) =>
      this._targetLinks.get(`#${entry.target.id}`);
    const activate = (entry) => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };

    const parentScrollTop = (this._rootEl || document.documentElement)
      .scrollTop;
    const userScrollsDown =
      parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;

    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));

        continue;
      }

      const entryIsLowerThanPrevious =
        entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      // if we are scrolling down, pick the bigger offsetTop
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
        if (!parentScrollTop) {
          return;
        }

        continue;
      }

      // if we are scrolling up, pick the smallest offsetTop
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  };

  _process = (target) => {
    if (this._activeTarget === target) {
      return;
    }

    this._clearActiveClass(this._targetEl);
    this._activeTarget = target;
    target.classList.add("active");
  };

  _clearActiveClass = (parent) => {
    parent.querySelectorAll(`${"[href]"}.${"active"}`).forEach((node) => {
      node.classList.remove("active");
    });
  };

  /**
   * Make target element flexible
   *
   * @param {object} options
   * @returns {string | Element}
   */
  _resolveTargetEl = (options) => {
    const { target } = options;

    if (typeof target === "string") {
      return document.querySelector(target);
    }

    if (target instanceof Element) {
      return target;
    }

    return this._rootEl.nextElementSibling;
  };
}

/**
 * Instance manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } =
  manageInstances({
    create: (targetEl, options) => new ScrollSpy(targetEl, options),
    destroy: (instance) => instance.dispose(),
  });

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll(`[data-spy="scroll"]`).forEach((eachEl) => {
    const options = optionsFromData(eachEl, "spy");
    getOrCreateInstance(eachEl, options);
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
