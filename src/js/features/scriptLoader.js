/**
 * Script loader: Only load when needed.
 */

const scripts = import.meta.glob('../scripts/**/*.js');

export const setup = (wrapperEl = document) => {
  wrapperEl.querySelectorAll(`[data-script]`).forEach(async (eachEl) => {
    try {
      await scripts[`../scripts/${eachEl.dataset.script}.js`]();
    } catch (e) {
      console.error(e);
      console.error(`${eachEl.dataset.script}.js script cannot be loaded.`);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setup(document);
});
