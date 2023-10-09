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
  article: undefined,
  render: ({ article }) => html`
    <template layout="column gap:0.5">
      <div
        id="img"
        style="${{ backgroundImage: `url("${article.image_url}")` }}"
        layout="block ratio:16/9"
      ></div>
      <div layout="column padding:0.5" layout@776px="padding:1.5 gap">
        <span
          layout="::font:label-s ::color:white-alpha-70"
          layout@776px="::font:label-m"
        >
          ${article.hostname}
        </span>
        <span layout="::font:label-m" layout@776px="::font:label-xl">
          ${article.title}
        </span>
      </div>
    </template>
  `.css`
    #img {
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-color: var(--color-white);
      border-radius: 8px;
    }

    div {
      border-radius: 6px;
      transition: background-color 0.2s;
    }

    @media screen and (min-width: 776px) {
      #img, div { border-radius: 12px }
      div { border-radius: 8px }
    }

    @media screen and (min-width: 776px) {
      #img { border-radius: 16px }
      div { border-radius: 12px }
    }


    :host(:hover) div {
      background: var(--color-white-alpha-20);
    }
  `,
};
