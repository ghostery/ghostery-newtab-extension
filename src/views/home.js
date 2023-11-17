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

import Article from '../stores/article.js';
import Settings from '../stores/settings.js';
import Site from '../stores/site.js';
import Stats from '../stores/stats.js';
import User from '../stores/user.js';

import Sidebar from './sidebar.js';

export default {
  [router.connect]: { stack: [Sidebar] },
  articles: store([Article]),
  settings: store(Settings),
  stats: store(Stats),
  user: store(User),
  topSites: () => store.get([Site], 'top'),
  content: ({ articles, settings, stats, topSites, user }) =>
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
            ${settings.privacyDigest &&
            store.ready(topSites, articles) &&
            html`
              <section
                layout="column gap:1.5 width:full::1200px margin:0:auto"
                layout@768px="gap:3 padding:0:3"
              >
                <div layout="column gap:0.5 width:::700px">
                  <h2
                    layout="::font:label-m"
                    layout@768px="::color:white-alpha-70"
                  >
                    Privacy Digest
                  </h2>
                  <p layout="hidden ::font:label-2xl" layout@768px="block">
                    Feel secure online and empowered to take action in
                    protecting your digital identity with news curated by the
                    Ghostery team.
                  </p>
                </div>
                <div
                  layout="grid:2 gap:2"
                  layout@776px="gap:3"
                  layout@992px="grid:3"
                >
                  ${articles.map(
                    (article) => html`
                      <gh-action href="${article.url}">
                        <gh-article article="${article}"></gh-article>
                      </gh-action>
                    `,
                  )}
                </div>
                <div layout="row center">
                  <gh-action
                    href="https://www.ghostery.com/privacy-digest/editions"
                    layout="grow"
                    layout@768px="grow:0"
                  >
                    <gh-button>Show previous editions</gh-button>
                  </gh-action>
                </div>
                ${store.error(user) &&
                html`
                  <gh-box layout="column gap:2" layout@768px="row items:center">
                    <div layout="column gap:0.5 grow">
                      <h3 layout="::font:display-l ::text-transform:uppercase">
                        Join Ghostery's Privacy Digest
                      </h3>
                      <p layout="::font:body-xl">
                        Receive the latest privacy news & tips, straight to your
                        inbox. Every two weeks.
                      </p>
                    </div>
                    <gh-action href="https://www.ghostery.com/privacy-digest">
                      <gh-button>Subscribe</gh-button>
                    </gh-action>
                  </gh-box>
                `}
              </section>
            `}
          </template>
        `
      : () => {},
};
