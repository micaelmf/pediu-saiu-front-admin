import { manageInstances, optionsFromData } from '../utils/component';

/**
 * Default options
 */

const Default = {
  triggerSelector: '[data-dismiss-trigger]',
};

/**
 * Class definition
 */

class Dismissible {
  constructor(targetEl, options) {
    // Attributes definition
    this._targetEl = targetEl;
    this._options = { ...Default, ...options };
    this._triggerElems = this._resolveTriggerElems();

    this._init();
  }

  dismiss = () => {
    this.dispose();
    this._targetEl.dispatchEvent(new Event('dismissible.dismiss'));
    this._targetEl.remove();
  };

  dispose = () => {
    this._triggerElems.forEach((triggerEl) => {
      triggerEl.removeEventListener('click', this.dismiss);
    });
  };

  _init = () => {
    this._triggerElems.forEach((triggerEl) => {
      triggerEl.addEventListener('click', this.dismiss);
    });
  };

  _resolveTriggerElems = () => {
    return this._targetEl.querySelectorAll(this._options.triggerSelector);
  };
}

/**
 * Instance manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } = manageInstances({
  create: (targetEl, options) => new Dismissible(targetEl, options),
  destroy: (instance) => instance.dispose(),
});

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll(`[data-dismissible]`).forEach((targetEl) => {
    const options = optionsFromData(targetEl, 'dismissible');
    getOrCreateInstance(targetEl, options);
    targetEl.addEventListener(
      'dismissible.dismiss',
      () => {
        destroyInstance(targetEl);
      },
      { once: true },
    );
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
