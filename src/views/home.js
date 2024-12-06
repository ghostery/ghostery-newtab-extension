/**
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import { html, router, store } from 'hybrids';

import Settings from '../stores/settings.js';
import Site from '../stores/site.js';
import Stats from '../stores/stats.js';
import User from '../stores/user.js';

import Sidebar from './sidebar.js';

export default {
  [router.connect]: { stack: [Sidebar] },
  settings: store(Settings),
  stats: store(Stats),
  user: store(User),
  topSites: () => store.get([Site], 'top'),
  content: ({ settings, stats, topSites }) =>
    store.ready(settings)
      ? html`
          <template layout="column gap:4" layout@768px="gap:5">
            <header
              layout="relative grid:1|max gap:4 height::6"
              layout@768px="row center gap:5"
            >
              <gh-icon
                name="logo"
                layout="width:132px"
                layout@768px="width:inherit"
                layout@992px="absolute top:0 left:0"
              ></gh-icon>
              ${settings.searchbar &&
              html`
                <gh-action
                  href="https://ghosterysearch.com"
                  layout="area:1/3:2 grow"
                  layout@992px="width:::480px"
                >
                  <gh-search>Search privately</gh-search>
                </gh-action>
              `}
              <gh-action
                href="${router.url(Sidebar)}"
                layout="area:2/2:1/1"
                layout@992px="absolute top:0.5 right:0"
              >
                <gh-icon-button type="menu" icon="list"></gh-icon-button>
              </gh-action>
            </header>

            <gh-box
              layout="self:center block:center column center gap:2 width:::60"
            >
              <gh-icon name="warning" layout="width:8"></gh-icon>
              <h1 layout="::font:display-m">
                Ghostery Private Browser will be discontinued
              </h1>
              <p layout="::font:body-l">
                <a
                  href="https://www.ghostery.com/blog/ghostery-private-browser-discontinued"
                  target="_blank"
                  layout="::color:white"
                >
                  Click here
                </a>
                for more information and recommendations.
              </p>
              <div layout="::font:body-s">
                <p>Thank you!</p>
                <p>Ghostery Team</p>
              </div>
            </gh-box>

            ${settings.stats &&
            store.ready(stats) &&
            !!stats.categories.length &&
            html`<gh-stats stats="${stats}" layout="self:center"></gh-stats>`}
            ${settings.sites &&
            html`
              <div
                layout="row gap:0.5 overflow:x:auto basis:auto margin:-1:-2:-2 padding:1:1.5:2 ::scrollbar-width:none"
                layout@768px="gap:3 padding:1:4.5:2"
              >
                <div layout="grow shrink"></div>
                ${store.ready(topSites) &&
                topSites.map(
                  (site) => html`
                    <gh-action href="${site.url}">
                      <gh-site layout="shrink:0" site="${site}"></gh-site>
                    </gh-action>
                  `,
                )}
                <div layout="grow shrink"></div>
              </div>
            `}
          </template>
        `
      : () => {},
};
