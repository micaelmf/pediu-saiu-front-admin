import Cols from '@skewind/components/cols';
import TextEditor from '@skewind/components/textEditor';
import '@skewind/components/modal';

const emailDetailCol = Cols.getInstance(document.querySelector('#emailDetail'));

document.querySelectorAll('#messageList a').forEach((eachEl) => {
  eachEl.querySelectorAll('input, button, label').forEach((actionEl) => {
    actionEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  eachEl.addEventListener('click', (e) => {
    e.preventDefault();
    emailDetailCol.show();
  });
});

TextEditor.getOrCreateInstance(document.querySelector('#contentEditor'));
