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
  href: '',
  render: ({ href }) => html`
    <template layout="block">
      ${href
        ? html`<a href="${href}" layout="block size:full"><slot></slot></a>`
        : html`<button layout="block size:full"><slot></slot></button>`}
    </template>
  `.css`
    * {
      transition: opacity 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    *:focus:not(:focus-visible) {
      outline: none;
    }

    *:active {
      opacity: 0.6;
    }

    button {
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: inherit;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  `,
};
