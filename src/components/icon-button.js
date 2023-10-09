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

export default {
  icon: '',
  type: '', // menu, settings, stats
  render: ({ icon }) => html`
    <template layout="row center size:5">
      <gh-icon name="${icon}"></gh-icon>
    </template>
  `.css`
    :host {
      transition: border 0.2s, background-color 0.2s;
      border-radius: 50%;
      color: white;
    }

    :host([type="menu"]) {
      background: var(--color-white-alpha-20);
    }

    :host([type="settings"]) {
      border: 1px solid var(--color-gray-600);
      background: var(--color-gray-700);
    }

    :host([type="stats"]) {
      width: 32px;
      height: 32px;
      background: var(--color-white);
      color: var(--color-gray-700);
      border-radius: 8px;
      border: 1px solid var(--color-gray-200, #DFE3EB);
      box-shadow: 0px 2px 6px 0px rgba(32, 44, 68, 0.08);
    }

    @media (hover: hover) {
      :host([type="menu"]:hover) {
        border-radius: 100px;
        background: var(--color-white-alpha-40);
      }

      :host([type="settings"]:hover) {
        border-color: var(--color-gray-400);
        background: var(--color-gray-800);
      }

      :host([type="stats"]:hover) {
        border-color: var(--color-gray-400);
      }
    }
  `,
};
