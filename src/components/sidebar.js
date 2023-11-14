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
  render: () => html`<template layout="fixed row inset layer:100">
    <div layout="grid grow"><slot name="backdrop"></slot></div>
    <aside
      layout="width:full::360px overflow:y:auto"
      layout@768px="width:::400px"
    >
      <slot></slot>
    </aside>
  </template>`.css`
    :host {
      background: rgba(18, 19, 23, 0.10);
      backdrop-filter: blur(2px);
    }

    aside {
      background: var(--color-gray-700);
      box-shadow: 0px 0px 160px 0px rgba(0, 0, 0, 0.50);
    }

    ::slotted(hr) {
      background: var(--color-gray-600);
      border: none;
      height: 1px;
      margin: 0;
    }
  `,
};
