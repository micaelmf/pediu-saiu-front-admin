/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl
    .querySelectorAll('[data-textarea-grow]')
    .forEach((element) => {
      const textarea = element.querySelector('textarea')
      textarea.addEventListener('input', () => {
        element.dataset.replicatedValue = textarea.value
      })

      if (element.dataset.textareaGrow === 'enter-to-submit') {
        textarea.addEventListener('keypress', (e) => {
          if (e.which === 13 && !event.shiftKey) {
            e.target.form.dispatchEvent(new Event('submit', { cancelable: true }))
            e.preventDefault()
          }
        })
      }
    })
}


if (document.readyState && document.readyState !== 'loading') {
  dataApi(document)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    dataApi(document)
  })
}

export default { dataApi }
