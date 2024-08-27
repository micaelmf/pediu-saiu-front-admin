import '../demo';
import Toast from '@skewind/components/toast';

// Simple Toast
document.querySelector('#simpleToastButton').addEventListener('click', () => {
  Toast('Simple toast!').showToast();
});

document.querySelector('#simpleToastCloseButton').addEventListener('click', () => {
  Toast('This is a toast with close button', {
    close: true,
  }).showToast();
});

// Permanent Toast
document.querySelector('#permanentToastButton').addEventListener('click', () => {
  Toast('This is a permanent toast', {
    duration: -1,
    close: true,
  }).showToast();
});

// Toast Destination
document.querySelector('#toastDestinationButton').addEventListener('click', () => {
  Toast('Click to go to destination', {
    destination: '/components-toast.html',
  }).showToast();
});

// Success Toast
document.querySelector('#successToastTextButton').addEventListener('click', () => {
  Toast.success('Hooray!').showToast();
});

document.querySelector('#successToastHTMLButton').addEventListener('click', () => {
  Toast.success(
    `
      <div class="flex flex-col gap-1">
        <strong>Success</strong>
        <p class="text-gray-400">Product created!</p>
      </div>
    `,
  ).showToast();
});

// Success Toast
document.querySelector('#errorToastTextButton').addEventListener('click', () => {
  Toast.error('Something went wrong').showToast();
});

document.querySelector('#errorToastHTMLButton').addEventListener('click', () => {
  Toast.error(
    `
      <div class="flex flex-col gap-1">
        <strong>Error</strong>
        <p class="text-gray-400">Something went wrong</p>
      </div>
    `,
  ).showToast();
});

// Warning Toast
document.querySelector('#warningToastTextButton').addEventListener('click', () => {
  Toast.warn('Your data will be lost').showToast();
});

document.querySelector('#warningToastHTMLButton').addEventListener('click', () => {
  Toast.warn(
    `
      <div class="flex flex-col gap-1">
        <strong>Warning</strong>
        <p class="text-gray-400">Your data will be lost</p>
      </div>
    `,
  ).showToast();
});
