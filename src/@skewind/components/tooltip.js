import tippy from 'tippy.js'
import { manageInstances } from '../utils/component'
import { schemePlugin } from '../utils/tippy'

tippy.setDefaultProps({
  plugins: [schemePlugin],
})

/**
 * Default options
 */
const Default = {
  text: '',
  theme: 'tooltip',
  animation: 'shift-toward',
  scheme: 'scheme-gray',
}

/**
 * Class definition
 */

class Tooltip {

  constructor(targetEl = null, options = {}) {
    this._targetEl = targetEl
    this._contentEl = this._resolveContentEl(options)
    this._options = { ...Default, ...options }

    this.tippy = tippy(this._targetEl, {
      ...this._forwardableOptions(),
      ...{
        content: this._contentEl,
      },
    })
  }

  /**
   * Get tooltip content element
   *
   * @returns {Element}
   */
   getContentEl = () => this._contentEl

  /**
   * Destory tippy instance
   *
   * @returns {void}
   */
   dispose = () => {
    this.tippy.destroy()
    this._targetEl.dispatchEvent(new Event('tooltip.dispose'))
  }

  /**
   * Make tooltip content element flexible
   *
   * @param {object} options
   * @returns {string | Element}
   */
  _resolveContentEl = (options) => {
    const { text, content } = options

    if (text) {
      return text
    }

    if (typeof content === 'string') {
      return document.querySelector(content)
    }

    if (content instanceof Element) {
      return content
    }

    return this._targetEl.nextElementSibling
  }

  /**
   * Forwardable options to be passed to tippy
   *
   * @returns {object}
   */
  _forwardableOptions = () => {
    const options = { ...this._options }
    delete options.text
    delete options.content
    return options
  }

}

/**
 * Instance Manager
 */

const {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
} = manageInstances({
  create: (targetEl, options) => new Tooltip(targetEl, options),
  destroy: (instance) => instance.dispose(),
})

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll('[data-tooltip]').forEach(el => {
    const options = {
      text: el.getAttribute('data-tooltip')
    }

    getOrCreateInstance(el, options)
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
}
