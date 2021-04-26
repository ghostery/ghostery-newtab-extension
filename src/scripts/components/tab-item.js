import { html } from '../../libs/hybrids/index.js';

export default {
  active: false,
  // Renders children (<slot/>) if active is set to true
  render: ({ active }) =>
    html`
      ${active &&
        html`
          <slot></slot>
        `}
    `
};
