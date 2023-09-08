import Cols from '@skewind/components/cols'

const fileInformationCol = Cols.getInstance(document.getElementById('fileInformation'))

document.querySelectorAll('[data-info]').forEach((each) => {
  each.addEventListener('click', (e) => {
    e.preventDefault()
    fileInformationCol.show()
  })
})
