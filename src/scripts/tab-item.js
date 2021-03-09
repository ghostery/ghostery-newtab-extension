const { html } = hybrids;

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
