import { define, html } from '../../libs/hybrids/index.js';

export default define({
  tag: 'tab-item',
  active: false,
  render: () => html`<slot></slot>`.css`
    :host { display: none }
    :host([active]) { display: block }
  `,
});
