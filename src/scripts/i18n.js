for (const node of document.querySelectorAll('[data-i18n]')) {
  const key = node.dataset.i18n;
  const translation = browser.i18n.getMessage(key);
  node.appendChild(document.createTextNode(translation));
}