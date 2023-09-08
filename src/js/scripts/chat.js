import '@skewind/components/textareaGrow'
import Cols from '@skewind/components/cols'

const chatMessages = document.getElementById('chatMessages')
const chatSidebarCol = Cols.getInstance(document.getElementById('chatSidebar'))
const newChatSidebarCol = Cols.getInstance(document.getElementById('newChatSidebar'))

scrollToBottom()

document.querySelectorAll('#chatList a').forEach(eachEl => {
  eachEl.addEventListener('click', (e) => {
    e.preventDefault()
    chatSidebarCol.hide()
  })
})

document.querySelectorAll('#contactList a').forEach(eachEl => {
  eachEl.addEventListener('click', (e) => {
    e.preventDefault()
    newChatSidebarCol.hide()
  })
})

chatMessages.querySelectorAll('[data-dropdown-toggle]').forEach(toggleEl => {
  const left = toggleEl.parentNode.classList.contains('left-full')

  Dropdown.getInstance(toggleEl).tippy.setProps({
    appendTo: () => document.body,
    placement: left ? 'right-start' : 'left-start',
  })
})

function scrollToBottom() {
  const wrapper = chatMessages.querySelector('.simplebar-content-wrapper')
  wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' })
}
