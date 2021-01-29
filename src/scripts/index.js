"use strict";

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
    const $tileTemplate = document.querySelector('#tile-template');
    const topSites = await getTopSites();
    const firstRow = topSites.slice(0, 5);
    if (firstRow.length === 0) {
      return;
    }
    while (firstRow.length < 5) {
      firstRow.push(null);
    }
    firstRow.slice(0, 5).forEach(site => {
      const $tile = $tileTemplate.content.cloneNode(true);
      if (site) {
        $tile.querySelector('a').setAttribute('href', site.url);
        $tile.querySelector('img').setAttribute('src', site.favicon);
        $tile.querySelector('span').innerText = site.title;
      } else {
        $tile.querySelector('a').style.visibility = 'hidden';
      }
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
      const $tile = $tileTemplate.content.cloneNode(true);
      if (site) {
        $tile.querySelector('a').setAttribute('href', site.url);
        $tile.querySelector('img').setAttribute('src', site.favicon);
        $tile.querySelector('span').innerText = site.title;
      } else {
        $tile.querySelector('a').style.visibility = 'hidden';
      }
      $topsites2.appendChild($tile);
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    cleanup();
    loadTopSites();
  } else {
    document.addEventListener('DOMContentLoaded', function onLoad() {
      document.removeEventListener('DOMContentLoaded', onLoad);
      cleanup();
      loadTopSites();
    });
  }
}());
