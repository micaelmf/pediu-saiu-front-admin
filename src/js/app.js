// Layout script
import '@skewind/layouts/basic'

// Importing core components
import Icon from './components/icon'
import Collapse from '@skewind/components/collapse'
import Dropdown from '@skewind/components/dropdown'
import Scrollbar from '@skewind/components/scrollbar'
import Cols from '@skewind/components/cols'
import Dismissible from '@skewind/components/dismissible'
import RichSelect from '@skewind/components/richSelect'
import Tooltip from '@skewind/components/tooltip'

// Expose core components
window.Icon = Icon
window.Collapse = Collapse
window.Dropdown = Dropdown
window.Scrollbar = Scrollbar
window.Cols = Cols
window.Dismissible = Dismissible
window.RichSelect = RichSelect
window.Tooltip = Tooltip

// Common Features
import './features/drawer'
import './features/bookmark'
import './features/search'
import './features/scriptLoader'
import './features/svgLoader'

// FoUC
document.body.style.removeProperty('display')

// Replace icon on dropdown show
document.querySelectorAll('[data-dropdown-toggle]').forEach(dropdownToggleEl => {
  dropdownToggleEl.addEventListener('dropdown.show', () => {
    const instance = Dropdown.getInstance(dropdownToggleEl)
    Icon.replace(instance.getContentEl())
  }, { once: true })
})

// const selectEl = document.querySelector('#products')
// const settings = { maxItems: 2 }
// const instance = RichSelect.createInstance(selectEl, settings)

// import { getInstance, createInstance } from './src/@skewind/components/richSelect.js'

// const selectEl = document.querySelector('#products')
// const options = {  }

// let instance = getInstance(selectEl)

// if (!instance) {
//   instance = createInstance(selectEl, options)
// }

// console.log('vaivendo', instance)

// console.log('teste')

// const { getInstance, createInstance, destroyInstance } = window.RichSelect

// let selectEl = document.querySelector('#products')
// const options = { maxItems: 2 }

// let instance = getInstance(selectEl)

// if (instance) {
//     destroyInstance(instance)
//     // Cria um novo elemento select
//     let newSelectEl = document.createElement('select')
//     newSelectEl.id = 'products'
  
//     // Substitui o elemento select original pelo novo
//     selectEl.parentNode.replaceChild(newSelectEl, selectEl)
  
//     // Atualiza a referência para o elemento select
//     selectEl = newSelectEl
  
//     // Cria uma nova instância do TomSelect
//     instance = createInstance(selectEl, options)
//   }

// console.log('vaivendo', instance)