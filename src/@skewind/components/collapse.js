import { manageInstances, optionsFromData } from '../utils/component';

/**
 * Default options
 */

const Default = {
  showClass: 'collapse--show',
  group: '',
  transitionDuration: 150,
};

/**
 * Class definition
 */

class Collapse {
  constructor(targetEl, options) {
    // Attributes definition
    this._targetEl = targetEl;
    this._options = { ...Default, ...options };
    this._expandState = targetEl.classList.contains(this._options.showClass);

    this._setTransitionDuration();
  }

  /**
   * Check whether the collapse element is expanded
   *
   * @returns {boolean}
   */
  isExpanded = () => {
    return this._expandState;
  };

  /**
   * Toggle show/hide depends on current state
   *
   * @returns {void}
   */
  toggle = () => {
    this._targetEl.dispatchEvent(new Event('collapse.toggle'));

    if (this._expandState) {
      return this.hide();
    }

    return this.show();
  };

  /**
   * Just show the collapse
   *
   * @returns {void}
   */
  show = () => {
    // Close others in the same groups
    if (this._options.group) {
      instances.forEach((instance) => {
        if (instance === this || !instance.inGroup(this._options.group)) return;
        instance.hide();
      });
    }

    this._expandState = true;
    this._targetEl.dispatchEvent(new Event('collapse.show'));

    setTimeout(() => {
      this._setHeight();
      this._targetEl.classList.add(this._options.showClass);
    }, 0);

    setTimeout(() => {
      this._unsetHeight();
      this._targetEl.dispatchEvent(new Event('collapse.shown'));
    }, this._options.transitionDuration);
  };

  /**
   * Just hide the collapse
   *
   * @returns {void}
   */
  hide = () => {
    if (!this._expandState) return;

    this._expandState = false;
    this._targetEl.dispatchEvent(new Event('collapse.hide'));
    this._setTransitionDuration();
    this._setHeight();

    // Close descendants collapses
    instances.forEach((instance) => {
      if (instance === this || !instance.isChildOf(this._targetEl)) return;
      instance.hide();
    });

    setTimeout(() => {
      this._targetEl.classList.remove(this._options.showClass);
      this._unsetHeight();
    }, 0);

    setTimeout(() => {
      this._targetEl.dispatchEvent(new Event('collapse.hidden'));
    }, this._options.transitionDuration);
  };

  /**
   * Check whether the collapse is in the specified group
   *
   * @param {string} group
   * @returns {boolean}
   */
  inGroup = (group) => {
    return this._options.group === group;
  };

  /**
   * Check wether the collapse is under specified element
   *
   * @param {Element} parentEl
   * @returns {boolean}
   */
  isChildOf = (parentEl) => {
    return parentEl.contains(this._targetEl);
  };

  /**
   * Clean listeners if any
   */
  dispose = () => {
    this._targetEl.dispatchEvent(new Event('collapse.dispose'));
  };

  /**
   * Set transition duration
   *
   * @returns {void}
   */
  _setTransitionDuration = () => {
    this._targetEl.style.setProperty('--collapse-duration', `${this._options.transitionDuration}ms`);
  };

  /**
   * Set collapse element height to its origin
   *
   * @returns {void}
   */
  _setHeight = () => {
    this._targetEl.style.setProperty('height', `${this._targetEl.scrollHeight}px`);
  };

  /**
   * Unset collapse element height, so it can adapt to its contents
   *
   * @returns {void}
   */
  _unsetHeight = () => {
    this._targetEl.style.removeProperty('height');
  };
}

/**
 * Instance manager
 */

const { instances, getInstance, createInstance, getOrCreateInstance, destroyInstance } = manageInstances({
  create: (targetEl, options) => new Collapse(targetEl, options),
  destroy: (instance) => instance.dispose(),
  iterable: true,
});

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll(`[data-collapse-toggle]`).forEach((toggleEl) => {
    let collapseEl;
    if (toggleEl.dataset.collapseToggle) {
      collapseEl = document.querySelector(toggleEl.dataset.collapseToggle);
    } else {
      collapseEl = toggleEl.nextElementSibling;
    }

    if (!collapseEl) return;

    const options = optionsFromData(collapseEl, 'collapse');
    const instance = getOrCreateInstance(collapseEl, options);

    // Toggle on toggle element click
    const handleToggleElClick = (e) => {
      e.preventDefault();
      instance.toggle();
    };
    toggleEl.addEventListener('click', handleToggleElClick);

    // Set expanded to true on collapse show
    const handleCollapseShow = () => {
      toggleEl.setAttribute('aria-expanded', true);
    };
    collapseEl.addEventListener('collapse.show', handleCollapseShow);

    // Set expanded to false on collapse hide
    const handleCollapseHide = () => {
      toggleEl.setAttribute('aria-expanded', false);
    };
    collapseEl.addEventListener('collapse.hide', handleCollapseHide);

    // Remove listeners on collapse dispose
    collapseEl.addEventListener('collapse.dispose', () => {
      toggleEl.removeEventlistener('click', handleToggleElClick);
      collapseEl.removeEventlistener('collapse.show', handleCollapseShow);
      collapseEl.removeEventlistener('collapse.hide', handleCollapseHide);
    });

    // Is shown by default?
    if (toggleEl.getAttribute('aria-expanded') === 'true') {
      instance.show();
    }
  });
};

if (document.readyState && document.readyState !== 'loading') {
  dataApi(document);
} else {
  document.addEventListener('DOMContentLoaded', () => {
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
