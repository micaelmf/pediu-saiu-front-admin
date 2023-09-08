import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/rainbow.css'
import beautify from 'js-beautify'
import { encode, decode } from 'html-entities'
import Scrollbar from './scrollbar'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)

/**
 * Setup highlighter inside element wrapper through Data API
 *
 * @param {Element} wrapper
 */
function setup(wrapperEl = document) {
  wrapperEl.querySelectorAll(`[data-highlight]`).forEach((codeEl) => {
    const highlight = () => {
      hljs.highlightElement(codeEl)
      Scrollbar.getOrCreateInstance(codeEl)
    }

    const targetEl = document.querySelector(codeEl.dataset.highlightTarget)
    if (targetEl) {
      const handleTargetElChange = () => {
        Scrollbar.destroyInstance(codeEl)

        const lang = targetEl.getAttribute('data-lang') ?? 'html'
        const code = decode(targetEl.innerHTML).trim()
        codeEl.classList.add(`language-${lang}`)
        codeEl.innerHTML = encode(
          lang === 'html' ? beautify.html(code) : beautify.js(code)
        )
        highlight()
        codeEl.dispatchEvent(new CustomEvent('highlight.change', {
          detail: { code }
        }))
      }

      if (codeEl.hasAttribute('data-highlight-observe')) {
        const observer = new MutationObserver(handleTargetElChange)
        observer.observe(targetEl, { attributes: true, childList: true, subtree: true })
      }

      handleTargetElChange()
    } else {
      highlight()
    }
  })
}

/**
 * Data API implementation
 */

 if (document.readyState && document.readyState !== 'loading') {
  setup(document)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    setup(document)
  })
}
