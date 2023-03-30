import { define, html, children } from '../../libs/hybrids/index.js';

import TabItem from './tab-item.js';

function next(host) {
    host.index = host.index + 1;
    if (host.index === host.items.length) {
      host.index = 0;
    }
}

function previous(host) {
    host.index = host.index - 1;
    if (host.index < 0) {
      host.index = host.items.length - 1;
    }
}

export default define({
  tag: 'tab-group',
  items: {
    ...children(TabItem),
    observe(host, items) {
      if (items.length === 0) {
        host.hidden = true;
      } else {
        host.hidden = false;
        const index = Math.floor(Math.random() * items.length);
        host.index = index;
      }
    },
  },
  index: {
    value: 0,
    observe(host, value) {
      host.items.forEach((item, index) => {
        item.active = index === value;
      });
    },
  },
  render: ({ items }) => html`
    <div class="wrapper">
      ${items.length > 1 && html`
        <button class="nav next" onclick="${next}"></button>
        <button class="nav previous" onclick="${previous}"></button>
      `}

      <slot></slot>
    </div>
  `.css`
    :host { display: block }
    :host([hidden]) { display: none }

    .wrapper {
      position: relative;
    }

    button.nav {
      height: 30px;
      width: 30px;
      font-size: 20px;
      line-height: 0;
      border: none;
      outline: none;
      position: absolute;
      top: calc(100% / 2 - 15px);
      background-size: 24px 24px;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
      cursor: pointer;
      opacity: 0.5;
    }
    button.nav:hover {
      opacity: 1;
    }
    .next {
      background-image: url("/images/chevron-right.svg");
      right: 10px;
    }
    .previous {
      background-image: url("/images/chevron-left.svg");
      left: 10px;
    }
  `
});
