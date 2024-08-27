/**
 * Data API implementation
 */

const svgs = import.meta.glob('../../svg/**/*.svg');

export const setup = (wrapperEl = document) => {
  wrapperEl.querySelectorAll(`svg[data-src]`).forEach(async (eachEl) => {
    try {
      const svgModule = await svgs[`../../svg/${eachEl.dataset.src}.svg`]();
      const response = await fetch(svgModule.default);
      const svg = await response.text();
      const svgDoc = new DOMParser().parseFromString(svg, 'image/svg+xml');
      const svgEl = svgDoc.firstElementChild;

      [].slice.call(eachEl.attributes).forEach((attr) => {
        if (attr.name === 'data-src') return;
        svgEl.setAttribute(attr.name, attr.value);
      });

      eachEl.parentNode.replaceChild(svgEl, eachEl);
    } catch (e) {
      console.error(`${eachEl.dataset.script}.svg not found.`);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setup(document);
});
