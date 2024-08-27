import '@skewind/components/datepicker';
import Cols from '@skewind/components/cols';

const contactFormCol = Cols.getInstance(document.getElementById('contactForm'));
const contactDetailsCol = Cols.getInstance(document.getElementById('contactDetails'));

document.querySelectorAll('#contactList > a').forEach((contactLink) => {
  contactLink.addEventListener('click', () => {
    contactDetailsCol.show();
  });
});

document.getElementById('editContactButton').addEventListener('click', () => {
  contactFormCol.show();
});
