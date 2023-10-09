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
    <template layout="block">
      <gh-tooltip wrap>
        <gh-icon name="info"></gh-icon>
        <span slot="content" layout="block width::180px">
          <slot></slot>
        </span>
      </gh-tooltip>
    </template>
  `.css`
    :host {
      cursor: pointer;
      color: var(--color-white);
    }

    gh-icon {
      opacity: 0.4;
    }

    @media (hover: hover) {
      :host(:hover) gh-icon {
        opacity: 1;
      }
    }
  `,
};
