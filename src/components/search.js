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
  render: () => html`
    <template layout="relative row center height:6 padding:0:2">
      <span layout="grow ::font:label-l" layout@776px="block:center">
        <slot></slot>
      </span>
      <gh-icon name="search" layout@776px="absolute top:12px right:2"></gh-icon>
    </template>
  `.css`
    :host {
      background: var(--color-white);
      border-radius: 8px;
      border: 1px solid var(--color-black-alpha-10);
    }

    span {
      background: var(--background-gradient-search);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,
};
