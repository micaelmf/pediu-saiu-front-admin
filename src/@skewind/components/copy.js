/**
 * Setup copy features through Data API
 *
 * @param {Element} wrapper
 */
function setup(wrapperEl = document) {
  wrapperEl.querySelectorAll(`[data-copy-target]`).forEach((copyEl) => {
    copyEl.addEventListener("click", async () => {
      const targetEl = document.querySelector(copyEl.dataset.copyTarget);
      if (targetEl) {
        await navigator.clipboard.writeText(targetEl.textContent);
        const html = copyEl.innerHTML;
        copyEl.innerHTML = "Copied!";
        setTimeout(() => {
          copyEl.innerHTML = html;
        }, 1000);
      }
    });
  });
}

/**
 * Data API implementation
 */

if (document.readyState && document.readyState !== "loading") {
  setup(document);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setup(document);
  });
}
