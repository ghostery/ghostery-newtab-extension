// Ghostery browser extension public API

export function getUser() {
  return browser.runtime.sendMessage('firefox@ghostery.com', { name: 'getUser' });
}

export function getDashboardStats() {
  return browser.runtime.sendMessage('firefox@ghostery.com', { name: 'getDashboardStats' });
}
