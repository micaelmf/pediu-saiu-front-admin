import Toastify from 'toastify-js';
import crel from 'crel';

const generatePreset =
  (presetContent, presetOptions) =>
  (text, options = {}) => {
    const computedOptions = {
      text: text ?? presetContent,
      ...presetOptions,
      ...options,
    };

    const node = crel('div', { class: 'flex items-start gap-5' });

    if (computedOptions.icon) {
      const icon = crel('span', { class: 'text-scheme-500' });
      icon.innerHTML = computedOptions.icon;
      delete computedOptions.icon;

      node.appendChild(icon);
    }

    const content = crel('div', { class: 'flex-1 py-1' });
    content.innerHTML = computedOptions.text;
    node.appendChild(content);

    return Toastify({
      node,
      ...computedOptions,
    });
  };

const Toast = generatePreset('Hi there!', {
  className: 'scheme-primary',
});

// Success presets
Toast.success = generatePreset('Success!', {
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon icon--feather"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
  className: 'scheme-success',
  close: true,
});

// Error presets
Toast.error = generatePreset('Error!', {
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon icon--feather"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  className: 'scheme-danger',
  close: true,
});

// Warning presets
Toast.warn = generatePreset('Warning!', {
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="icon icon--feather"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
  className: 'scheme-warning',
  close: true,
});

export default Toast;
