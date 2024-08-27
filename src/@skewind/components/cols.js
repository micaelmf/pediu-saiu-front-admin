import Backdrop from '../utils/backdrop';
import { manageInstances, optionsFromData } from '../utils/component';

/**
 * Default options
 */

const Default = {
  expandedClass: 'col--expanded',
  transitionDuration: 250,
};

/**
 * Class definition
 */

class Cols {
  constructor(targetEl, options) {
    this._targetEl = targetEl;
    this._shadowEl = this._createShadowEl();
    this._innerEl = targetEl.firstElementChild;
    this._options = {
      ...Default,
      ...options,
    };
    this._expanded = false;

    this._init();
  }

  show = (init = false) => {
    if (this._expanded) {
      return;
    }

    // Close others in the same groups
    if (this._options.group) {
      instances.forEach((instance) => {
        if (instance !== this && instance.inGroup(this._options.group)) {
          instance.hide(false);
        }
      });
    }

    if (!init) {
      this._preTransition();
    }

    // Expand
    this._expanded = true;
    this._targetEl.classList.add(this._options.expandedClass);
    this._options.backdrop.show();

    this._postTransition();
  };

  hide = (hideBackdrop = true) => {
    if (!this._expanded) {
      return;
    }

    this._preTransition();

    // Collapse
    this._expanded = false;
    this._targetEl.classList.remove(this._options.expandedClass);
    if (hideBackdrop) {
      this._options.backdrop.hide();
    }

    this._postTransition();
  };

  toggle = () => {
    this._expanded ? this.hide() : this.show();
  };

  _init = () => {
    if (getComputedStyle(this._targetEl).getPropertyValue('overflow') !== 'hidden') {
      this.show(true);
    }

    this._targetEl.classList.forEach((className) => {
      if (className !== this._options.expandedClass && className.includes(this._options.expandedClass)) {
        this._targetEl.classList.remove(className);
      }
    });

    this._options.backdrop.getBackdropEl().addEventListener('backdrop.click', this.hide);
  };

  _createShadowEl = () => {
    const el = document.createElement('div');
    el.classList.add('absolute', 'z-[-9999]', 'w-[var(--col-width)]', 'invisible', 'translate-x-[9999]');

    this._targetEl.parentNode.appendChild(el);

    return el;
  };

  _getExpandedWidth = () => {
    this._shadowEl.style.setProperty('--col-width', getComputedStyle(this._targetEl).getPropertyValue('--col-width'));
    return this._shadowEl.offsetWidth;
  };

  _preTransition = () => {
    this._targetEl.style.setProperty('--col-duration', `${this._options.transitionDuration}ms`);
    const width = this._getExpandedWidth();
    this._innerEl.style.width = `${width}px`;
  };

  _postTransition = () => {
    setTimeout(() => {
      this._targetEl.style.removeProperty('--col-duration', `${this._options.transitionDuration}ms`);
      this._innerEl.style.removeProperty('width');
    }, this._options.transitionDuration);
  };

  /**
   * Check whether the col is in the specified group
   *
   * @param {string} group
   * @returns {boolean}
   */
  inGroup = (group) => {
    return this._options.group === group;
  };
}

/**
 * Instance manager
 */

const { instances, getInstance, createInstance, getOrCreateInstance, destroyInstance } = manageInstances({
  create: (targetEl, options) => new Cols(targetEl, options),
  iterable: true,
});

/**
 * Data API implementation
 */

const setup = (wrapperEl = document) => {
  const backdrops = new WeakMap();

  wrapperEl.querySelectorAll('.cols').forEach((colsEl) => {
    backdrops.set(
      colsEl,
      new Backdrop(colsEl.firstElementChild, {
        class: 'cols__backdrop',
      }),
    );

    // Instances
    colsEl.querySelectorAll('.col').forEach((colEl) => {
      const colsEl = colEl.parentNode;
      const backdrop = backdrops.get(colsEl);

      const options = {
        ...optionsFromData(colEl, 'col'),
        ...{ backdrop },
      };

      getOrCreateInstance(colEl, options);
    });
  });

  // Togglers
  wrapperEl.querySelectorAll('[data-col-toggle]').forEach((toggleEl) => {
    toggleEl.addEventListener('click', (e) => {
      e.preventDefault();
      const colId = toggleEl.dataset.colToggle;
      const colEl = wrapperEl.getElementById(colId);
      getInstance(colEl).toggle();
    });
  });

  // Showers
  wrapperEl.querySelectorAll('[data-col-show], [data-col-open]').forEach((showEl) => {
    showEl.addEventListener('click', (e) => {
      e.preventDefault();
      const colId = showEl.dataset.colShow ?? showEl.dataset.colOpen;
      const colEl = wrapperEl.getElementById(colId);
      getInstance(colEl).show();
    });
  });

  // Hiders
  wrapperEl.querySelectorAll('[data-col-hide], [data-col-close]').forEach((hideEl) => {
    hideEl.addEventListener('click', (e) => {
      e.preventDefault();
      const colId = hideEl.dataset.colHide ?? hideEl.dataset.colClose;
      const colEl = wrapperEl.getElementById(colId);
      getInstance(colEl).hide();
    });
  });
};

if (document.readyState && document.readyState !== 'loading') {
  setup(document);
} else {
  document.addEventListener('load', () => {
    setup(document);
  });
}

export default {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
  setup,
};
