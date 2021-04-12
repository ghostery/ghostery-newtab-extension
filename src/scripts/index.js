
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

  function shouldShowPrivateSonsoredLinks() {
    return Promise.race([
      new Promise(resolve => setTimeout(() => resolve(true), 100)),
      new Promise(async (resolve) => {
        const user = await browser.runtime.sendMessage('firefox@ghostery.com', { name: 'getUser' });
        if (!user) {
          return true;
        }
        return false;
      }),
    ]);
  }

  async function loadPrivateSponsoredLinks() {
    const response = await fetch('https://api.ghosteryhighlights.com/v1/tiles', { cache: 'no-cache' });
    const links = await response.json();

    return links.map(link => ({
      url: link.advertiserUrl,
      clickUrl: link.clickUrl,
      favicon: link.imageUrl,
      title: link.name,
    }));
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

  async function loadTopSites() {
    const $topsites1 = document.querySelector('.top-sites-1');
    const $topsites2 = document.querySelector('.top-sites-2');
    const topSites = await getTopSites();
    const firstRow = topSites.slice(0, 5);

    populateRow($topsites1, firstRow);

    let secondRow;
    if (await shouldShowPrivateSonsoredLinks()) {
      document.querySelector('#account-button-out').style.visibility = 'visible';
      secondRow = await loadPrivateSponsoredLinks()
      document.querySelector('#second-row-header').style.visibility = 'visible';
    } else {
      document.querySelector('#account-button-in').style.visibility = 'visible';
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
