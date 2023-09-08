/**
 * Create a backdrop anytime, anywhere
 */

import classnames from 'classnames/dedupe'
import crel from 'crel'


/**
 * Default options
 */

const Default = {
  position: 'absolute',
  transitionDuration: 300,
  class: '',
  onClick: () => {},
}

/**
 * Class definition
 */

class Backdrop {

  constructor(targetEl, options) {
    this._targetEl = targetEl
    this._targetIsBody = targetEl === document.body
    this._backdropEl = null
    this._parentNode = null
    this._parentNodePosition = null
    this._options = {
      ...Default,
      ...options,
    }

    this._init()
  }

  _init = () => {
    // Create backdrop element
    this._backdropEl = crel('div', {
      class: classnames('backdrop', this._options.position, this._options.class),
      style: 'top: 0; left: 0; height: 100%; width: 100%',
    })

    // Backdrop parent
    this._parentNode = document.body === this._targetEl
      ? document.body
      : this._targetEl.parentNode

    // Flag current parent node inline style position
    this._parentNodePosition = this._parentNode.style.position
  }

  /**
   * Create element and mount to specified targetEl
   *
   * @returns {void}
   */
  create = () => {
    const { _parentNode } = this

    // Set relative if backdrop parent position is static
    if (getComputedStyle(_parentNode).getPropertyValue('position') === 'static') {
      _parentNode.style.position = 'relative'
    }

    // Mount the backdrop element
    _parentNode.append(this._backdropEl)

    // Register click listener
    this._backdropEl.addEventListener('click', this._handleBackdropElClick, true)

    // Set transition duration
    this._backdropEl.style.setProperty('--backdrop-duration', `${this._options.transitionDuration}ms`)
  }

  /**
   * Create and show backdrop element by specified targetEl
   *
   * @returns {void}
   */
  show = () => {
    // Create backdrop element
    this.create()

    // Disable body scroll if target element is the body itself
    if (this._targetIsBody) {
      document.body.dataset.modalCount = Number(document.body.dataset.modalCount ?? 0) + 1
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'
      document.body.style.overflow = 'hidden'
    }

    // Start transition
    setTimeout(() => {
      this._backdropEl.classList.add('backdrop--show')
    }, 0)
  }

  /**
   * Hide and remove backdrop element by specified targetEl
   *
   * @returns {void}
   */
  hide = () => {
    // Remove backdrop listener so no follow up click on hide
    this._backdropEl.removeEventListener('click', this._handleBackdropElClick, true)

    // Start transition
    this._backdropEl.classList.remove('backdrop--show')

    // Simulate transition end
    setTimeout(() => {
      this._backdropEl.remove()

      if (!!this._parentNodePosition) {
        this._parentNodePosition.style.removeProperty('position')
      }

      // Reset body scroll
      if (this._targetIsBody) {
        document.body.dataset.modalCount -= 1
        if (Number(document.body.dataset.modalCount) === 0) {
          document.body.removeAttribute('data-modal-count')
          document.body.style.removeProperty('padding-right')
          document.body.style.removeProperty('overflow')
        }
      }
    }, this._options.transitionDuration)
  }

  getBackdropEl = () => {
    return this._backdropEl
  }

  /**
   * Handle backdrop click
   *
   * @returns {void}
   */
  _handleBackdropElClick = (e) => {
    if (this._backdropEl !== e.target) return;
    this._options.onClick()
    this._backdropEl.dispatchEvent(new Event('backdrop.click'))
  }

}

export default Backdrop
