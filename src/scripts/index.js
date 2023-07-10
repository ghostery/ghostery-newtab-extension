import CurrentUser from './models/current-user.js';
import { loadPrivateSponsoredLinks } from './utils/highlights.js';

const currentUser = new CurrentUser();

window.currentUser = currentUser;

async function getTopSites() {
  let sites = await browser.topSites.get({
    includeFavicon: true,
  });
  if (sites.length === 0) {
    sites = await browser.topSites.get({
      includeFavicon: true,
      newtab: true,
    });
  }
  return sites.filter(site => site.type === 'url');
}

function cleanup() {
  const $topsites = document.querySelector('.top-sites');
  while ($topsites.firstChild) {
    $topsites.removeChild(topsites.firstChild);
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function populateRow(row, dials) {
  if (dials.length === 0) {
    return;
  }
  while (dials.length < 5) {
    dials.push(null);
  }
  dials.slice(0, 5).forEach(dial => {
    const $tile = document.createElement('speed-dial');
    $tile.setAttribute('url', dial?.url);
    $tile.setAttribute('favicon', dial?.favicon);
    $tile.setAttribute('title', dial?.title);

    if (dial?.clickUrl) {
      $tile.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = dial.clickUrl;
        return false;
      });
    }

    row.appendChild($tile);
  });
}

async function updateAccountButton() {
  try {
    await currentUser.load();
  } catch (e) {
    console.warn('Could not load account info', e);
  }
  if (currentUser.isLoggedIn) {
    document.querySelector('#account-button-in').style.visibility = 'visible';
  } else {
    document.querySelector('#account-button-out').style.visibility = 'visible';
  }
}

async function loadTopSites() {
  const $topsites1 = document.querySelector('.top-sites-1');
  const $topsites2 = document.querySelector('.top-sites-2');
  const topSites = await getTopSites();
  const firstRow = topSites.slice(0, 5);

  populateRow($topsites1, firstRow);

  let secondRow;
  if (currentUser.shouldSeePrivateSponsoredLinks) {
    secondRow = await loadPrivateSponsoredLinks()
    shuffle(secondRow);
    if (secondRow.length > 0) {
      document.querySelector('#second-row-header').style.visibility = 'visible';
    }
  } else {
    secondRow = topSites.slice(5, 10);
  }

  populateRow($topsites2, secondRow);
}

async function setupSearchBar() {
  const searchEngines = await browser.search.get();
  const glow = searchEngines.find(e => e.name === 'Ghostery Glow');

  if (glow && glow.isDefault) {
    const $searchBar = document.createElement('search-bar');
    const $searchBarWrapper = document.querySelector('.search-bar-wrapper');
    $searchBarWrapper.appendChild($searchBar);
  }
}
function setup() {
  document.querySelector('#second-row-header').addEventListener('click', () => {
    document.querySelector('#private-sponsored-links-modal').hidden = false;
  });
  updateAccountButton();
  loadTopSites();
  setupSearchBar();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  cleanup();
  setup();
} else {
  document.addEventListener('DOMContentLoaded', function onLoad() {
    document.removeEventListener('DOMContentLoaded', onLoad);
    cleanup();
    setup();
  });
}
