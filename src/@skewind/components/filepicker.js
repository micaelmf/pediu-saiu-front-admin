import Dropzone from 'dropzone';
import { manageInstances, optionsFromData } from '../utils/component';

/**
 * Instance manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } = manageInstances({
  create: (targetEl, options) => {
    return new Dropzone(targetEl, {
      ...options,
    });
  },
  destroy: (instance) => instance.destroy(),
});

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll('[data-filepicker]').forEach((targetEl) => {
    createInstance(targetEl, optionsFromData(targetEl, 'filepicker'));
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
