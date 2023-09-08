import TomSelect from 'tom-select'
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
  create: (selectEl, options) => new TomSelect(selectEl, options),
  destroy: (instance) => instance.destroy(),
})

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl
    .querySelectorAll('[data-select]')
    .forEach((targetEl) => {
      getOrCreateInstance(targetEl, optionsFromData(targetEl, 'select'))
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
