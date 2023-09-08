import SimpleBar from 'simplebar'
import { manageInstances, optionsFromData } from '../utils/component'

/**
 * Instance manager
 */

const {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
} = manageInstances({
  create: (targetEl, options) => new SimpleBar(targetEl, options),
  destroy: (instance) => instance.unMount(),
})

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl
    .querySelectorAll('[data-scrollbar]')
    .forEach((targetEl) => {
      createInstance(targetEl, optionsFromData(targetEl, 'scrollbar'))
      targetEl.dispatchEvent(new Event('scrollbar.init'))
    })
}

if (document.readyState && document.readyState !== 'loading') {
  dataApi(document)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    dataApi(document)
  })
}

export default {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
  dataApi,
}
