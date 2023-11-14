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

import { html } from 'hybrids';

import * as trackers from '../utils/trackers.js';

export default {
  stats: undefined,
  popover: false,
  render: ({ stats, popover }) => html`
    <template layout="relative row width:full::375px">
      <gh-box
        layout="row items:center gap:2 padding:1.5 grow"
        layout@768px="padding:1.5:2"
      >
        <gh-action onclick="${html.set('popover', !popover)}">
          <div id="wheel" layout="row center size:10">
            <gh-wheel
              categories="${stats.categories}"
              layout="size:8"
            ></gh-wheel>
          </div>
        </gh-action>
        <div layout="grow column gap:0.5 ::font:label-m">
          <div layout="row gap:0.5">
            <div>Individual Trackers Seen</div>
            <div layout="row grow">
              <gh-info>
                Not all entities listed are trackers, meaning they do not
                collect your personal data.
              </gh-info>
            </div>
            <div>${stats.categories.length}</div>
          </div>
          <hr />
          <div layout="row gap:0.5">
            <div>All Trackers Blocked</div>
            <div layout="row grow">
              <gh-info>
                Number of trackers with blocked network requests.
              </gh-info>
            </div>
            <div>${stats.trackersBlocked}</div>
          </div>
          <hr />
          <div layout="row gap:0.5">
            <div>All Trackers Modified</div>
            <div layout="row grow">
              <gh-info>
                Number of trackers with removed cookies or fingerprints.
              </gh-info>
            </div>
            <div>${stats.trackersModified}</div>
          </div>
        </div>
      </gh-box>
      <div
        id="popover"
        layout="absolute top:full left right column gap:2 padding:2 margin:top:0.5"
        layout[hidden]="hidden"
        hidden="${!popover}"
      >
        <div layout="row items:center gap">
          <div layout="row gap:0.5 grow ::font:label-l ::color:gray-900">
            All trackers seen
            <gh-info layout="::color:gray-600">
              Not all entities listed are trackers, meaning they do not collect
              your personal data.
            </gh-info>
          </div>
          <gh-action onclick="${html.set('popover', !popover)}">
            <gh-icon-button type="stats" icon="close"></gh-icon-button>
          </gh-action>
        </div>
        <div layout="row gap:3">
          <gh-wheel
            categories="${stats.categories}"
            layout="size:10"
          ></gh-wheel>
          <div layout="column grow">
            ${stats.groupedCategories.map(
              ([key, value]) => html`
                <div
                  class="category"
                  layout="row items:center gap padding:0.75:0"
                >
                  <div
                    class="badge"
                    style="${{ background: trackers.colors[key] }}"
                  ></div>
                  <div layout="grow ::font:body-s ::color:gray-600">
                    ${trackers.labels[key]}
                  </div>
                  <div layout="::font:label-s ::color:gray-900">${value}</div>
                </div>
              `,
            )}
          </div>
        </div>
      </div>
    </template>
  `.css`
    #wheel {
      border-radius: 50%;
      background: var(--color-white);
    }

    hr {
      display: block;
      height: 1px;
      background: var(--color-white-alpha-20);
      border: none;
      margin: 0;
      padding: 0;
    }

    #popover {
      background: var(--color-white);
      border-radius: 16px;
      box-shadow: 30px 60px 160px 0px rgba(32, 44, 68, 0.40);
    }

    .category {
      border-bottom: 1px solid var(--color-gray-200);
    }

    .category:last-child {
      border-bottom: none;
    }

    .badge {
      width: 12px;
      height: 6px;
      border-radius: 3px;
    }
  `,
};
