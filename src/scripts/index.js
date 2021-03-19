
(function () {

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

  async function loadTopSites() {
    const $topsites1 = document.querySelector('.top-sites-1');
    const $topsites2 = document.querySelector('.top-sites-2');
    const topSites = await getTopSites();
    const firstRow = topSites.slice(0, 5);
    if (firstRow.length === 0) {
      return;
    }
    while (firstRow.length < 5) {
      firstRow.push(null);
    }
    firstRow.slice(0, 5).forEach(site => {
      const $tile = document.createElement('speed-dial');
      $tile.setAttribute('url', site?.url);
      $tile.setAttribute('favicon', null);//site?.favicon);
      $tile.setAttribute('title', site?.title);

      $topsites1.appendChild($tile);
    });
    const secondRow = topSites.slice(5, 10);
    if (secondRow.length === 0) {
      return;
    }
    while (secondRow.length < 5) {
      secondRow.push(null);
    }
    secondRow.forEach(site => {
      const $tile = document.createElement('speed-dial');
      $tile.setAttribute('url', site?.url);
      $tile.setAttribute('favicon', site?.favicon);
      $tile.setAttribute('title', site?.title);
      $topsites2.appendChild($tile);
    });
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

  async function loadStats() {
    // Select random box
    const boxes = document.querySelectorAll('tab-item');
    const index = Math.floor(Math.random() * boxes.length);
    boxes[index].active = true;
    document.querySelector('tab-group').index = index;
  }

  function setup() {
    loadTopSites();
    setupSearchBar();
    loadStats();
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
}());
