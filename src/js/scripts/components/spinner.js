import '../demo';

document.querySelectorAll('#spinnerList > a').forEach((spinnerEl) => {
  const titleEl = spinnerEl.firstElementChild;
  spinnerEl.addEventListener('click', async () => {
    const copied = `<i class="loader ${spinnerEl.innerText}"></i>`;
    await navigator.clipboard.writeText(copied);
    const innerHTML = titleEl.innerHTML;
    titleEl.innerHTML = 'Copied!';
    setTimeout(() => {
      titleEl.innerHTML = innerHTML;
    }, 1000);
  });
});
