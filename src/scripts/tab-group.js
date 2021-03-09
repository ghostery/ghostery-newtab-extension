import TabItem from './tab-item.js';

const { children, html } = hybrids;

function updateActiveItem(host) {
  host.items.forEach((item, index) => {
    item.active = index === host.index;
  });
}

function next(host) {
    host.index = host.index + 1;
    if (host.index === host.items.length) {
      host.index = 0;
    }
    updateActiveItem(host);
}

function previous(host) {
    host.index = host.index - 1;
    if (host.index < 0) {
      host.index = host.items.length - 1;
    }
    updateActiveItem(host);
}

export default {
  index: 0,
  items: children(TabItem),

  render: ({ items }) => html`
    <style>
      :host { display: block }
      :host[hidden] { display: none }

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
        opacity: 0.8;
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
    </style>

    <div class="wrapper">
      <button class="nav next" onclick="${next}"></button>
      <button class="nav previous" onclick="${previous}"></button>

      <slot></slot>
    </div>
  `
};
