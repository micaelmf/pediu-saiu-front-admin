import '../demo'
import Dismissible from '@skewind/components/dismissible'
import Icon from '@/js/components/icon'

/**
 * BEGIN: Alert Overview
 */
 (() => {
  const codeContent = document.getElementById('alertCodeContent')
  const form = document.getElementById('alertForm')

  const updateCodeContent = () => {
    const soft = form.soft.checked
    const dismissible = form.dismissible.checked
    const withIcon = form.model.value === 'withIcon'
    const extraContent = form.model.value === 'extraContent'

    const classes = [form.variant.value]

    if (soft) {
      classes.push('alert--soft')
    }

    const joinedClasses = classes.join(' ')

    const renderAlert = (schemeClass, text, icon = '') => {
      const iconTag = `<i data-icon="${icon}"></i>`
      const textTag = `<span class="flex-1 mt-1">${text}</span>`
      const closeTag = `<button data-dismiss-trigger aria-label="Close">
        <i data-icon="feather__x"></i>
      </button>`

      let alert = `<div${dismissible ? ' data-dismissible' : ''} class="alert ${joinedClasses} ${schemeClass}" role="alert">`

      if (withIcon || extraContent) {
        alert += `<div class="flex gap-5">
          ${iconTag}
          ${textTag}${dismissible ? `
          ${closeTag}` : ''}
        </div>`
      } else {
        alert += dismissible ? `<div class="flex gap-5 items-center">
          <span class="flex-1">${text}</span>
          ${closeTag}
        </div>` : text
      }

      if (extraContent) {
        alert += `
          <p class="py-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a purus in velit ultrices maximus ut sit amet nulla. Donec bibendum massa non eros sollicitudin, ut interdum est auctor. Nunc tincidunt, felis a ultrices cursus, neque est pulvinar felis, a iaculis felis massa nec lorem. Vestibulum congue lorem ac ultricies scelerisque.</p>
          <a href="#" class="button button--sm ${schemeClass}">See details</a>
        `
      }

      alert += '</div>'

      return alert
    }

    const code = `
      ${renderAlert('scheme-primary', '<strong>Need help?</strong> Our team will happy to help you.', 'feather__alertTriangle')}
      ${renderAlert('scheme-success', '<strong>Changes saved!</strong> What a changes!.', 'feather__alertTriangle')}
      ${renderAlert('scheme-warning', '<strong>Maintenance Info.</strong> We are scheduling maintenance on tomorrow', 'feather__alertTriangle')}
      ${renderAlert('scheme-danger', '<strong>Error.</strong> Invalid credentials.', 'feather__alertTriangle')}
      ${renderAlert('scheme-info', '<strong>Whats new?</strong> You have 3 unread notifications.', 'feather__alertTriangle')}
    `

    codeContent.innerHTML = code
  }

  form.querySelectorAll('input').forEach((inputEl) => {
    inputEl.addEventListener('change', updateCodeContent)
  })

  updateCodeContent()

  const alertPreview = document.querySelector('#alertPreview')
  const alertCode = document.querySelector('#alertCode')
  alertCode.addEventListener('highlight.change', (e) => {
    // Destroy previous dismissible
    alertPreview.querySelectorAll('[data-dismissible]').forEach((alertEl) => {
      Dismissible.destroyInstance(alertEl)
    })

    alertPreview.innerHTML = e.detail.code
    Dismissible.dataApi(alertPreview)
    Icon.replace(alertPreview)
  })
})()
