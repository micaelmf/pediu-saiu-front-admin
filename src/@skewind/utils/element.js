/**
 * Get the attributes of an HTML element.
 *
 * @param {Element} element
 * @returns {Object}
 */
export const getAttrs = (element) => {
  return Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value
    return attrs
  }, {})
}

/**
 * Wrap first element with second element.
 *
 * @param {Element} element
 * @param {Element} wrapperEl
 * @returns {void}
 */
export const wrap = (element, wrapperEl) => {
  wrapperEl = wrapperEl || document.createElement('div')
  element.replaceWith(wrapperEl)
  wrapperEl.appendChild(element)
}

/**
 * Unwrap element
 *
 * @param {Element} element
 */
export const unwrap = (element) => {
  element.replaceWith(...element.childNodes)
}

const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false
  }

  if (typeof object.jquery !== 'undefined') {
    object = object[0]
  }

  return typeof object.nodeType !== 'undefined'
}

export const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true
  }

  if (element.classList.contains('disabled')) {
    return true
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
}

export const isVisible = element => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false
  }

  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'
  // Handle `details` element as its content may falsie appear visible when it is closed
  const closedDetails = element.closest('details:not([open])')

  if (!closedDetails) {
    return elementIsVisible
  }

  if (closedDetails !== element) {
    const summary = element.closest('summary')
    if (summary && summary.parentNode !== closedDetails) {
      return false
    }

    if (summary === null) {
      return false
    }
  }

  return elementIsVisible
}
