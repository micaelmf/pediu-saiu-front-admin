import { manageInstances } from '../utils/component'

/**
 * Default options
 */

const Default = {
  activeClasses: 'tab--active',
  onShow: () => {},
}

/**
 * Class definition
 */

class Tabs {
  constructor(triggerEl, options = {}) {
    this._triggerEl = triggerEl
    this._items = options.items
    this._activeTab = null
    this._options = { ...Default, ...options }
    this._init()
  }

  /**
   * Run initialization
   *
   * @returns {void}
   */
  _init = () => {
    if (this._items.length) {
      // default active tab
      this.show(this._items.find(item => item.triggerEl.getAttribute('aria-selected') === 'true') ?? this._items[0])

      // show tab content based on click
      this._items.map(tab => {
        tab.triggerEl.addEventListener('click', this._handleTriggerClick)
      })
    }
  }

  /**
   * Clean listeners if any
   */
  dispose = () => {
    // show tab content based on click
    this._items.map(tab => {
      tab.triggerEl.removeEventListener('click', this._handleTriggerClick)
    })
  }

  /**
   * Tab click handler
   *
   * @param {Event} e
   */
  _handleTriggerClick = (e) => {
    const tab = this._items.find(item => item.triggerEl === e.target)
    this.show(tab)
  }

  /**
   * Get current active tab item
   *
   * @returns Object item
   */
  getActiveTab = () => {
    return this._activeTab
  }

  /**
   * Set as flag
   *
   * @param {Object} tab item
   */
  _setActiveTab = (tab) => {
    this._activeTab = tab
  }

  /**
   * Public method to show tab programmatically
   *
   * @param {Object} tabItem
   * @returns {void}
   */
  show = (tab) => {
    // don't do anything if already active
    if (tab === this._activeTab) {
      return
    }

    // hide other tabs
    this._items.map(t => {
      if (t !== tab) {
        t.triggerEl.classList.remove(...this._options.activeClasses.split(' '))
        if (t.targetEl) {
          t.targetEl.classList.add('hidden')
        }
        t.triggerEl.setAttribute('aria-selected', false)
      }
    })

    // show active tab
    tab.triggerEl.classList.add(...this._options.activeClasses.split(' '))
    tab.triggerEl.setAttribute('aria-selected', true)
    if (tab.targetEl) {
      tab.targetEl.classList.remove('hidden')
    }

    this._setActiveTab(tab)

    // callback function
    this._options.onShow(this, tab)
    this._triggerEl.dispatchEvent(new CustomEvent('tabs.show', {
      detail: { tab }
    }))
  }

}

/**
 * Instance manager
 */

const {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
} = manageInstances({
  create: (triggerEl, options) => new Tabs(triggerEl, options),
  destroy: (instance) => instance.dispose(),
})

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll('[data-tabs-toggle]').forEach(triggerEl => {
    const items = [...triggerEl.querySelectorAll('[role="tab"')].map(el => ({
      triggerEl: el,
      targetEl: document.querySelector(el.getAttribute('data-tabs-target'))
    }))

    getOrCreateInstance(triggerEl, { items })
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
