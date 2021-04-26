import { html } from '../../libs/hybrids/index.js';

export default {
  title: '',
  url: '',
  favicon: '',
  hasUrl: ({ url }) => url && url !== 'undefined',
  hostname: ({ url, hasUrl}) => {
    if (!hasUrl) {
      return '';
    }
    const uri = new URL(url);
    let host = uri.hostname;
    if (host.startsWith('www')) {
      host = host.slice(4);
    }
    return host;
  },
  fullTitle: ({ title, hostname, favicon }) => {
    if (title) {
      return title;
    }
    return hostname;
  },
  render: ({ fullTitle, favicon, url, hostname, hasUrl }) => html`
    <a class="tile" href="${url}" style=${{ visibility: hasUrl ? 'visible' : 'hidden' }}>
      <div class="image-wrapper">
        ${favicon && favicon !== "null"
          ? html`<img src="${favicon}" />`
          : html`<span>${hostname[0]}</span>`}
      </div>
      <span>${fullTitle}</span>
    </a>
    <style>
      .tile {
        cursor: pointer;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: white;
        outline: none;
        background-color: transparent;
        border: 2px solid transparent;
        padding: 0px 10px;
        border-radius: 5px;
        width: 100px;
        height: 115px;
      }

      .tile:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: white;
      }

      .tile .image-wrapper {
        background-color: white;
        padding: 13px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tile .image-wrapper img {
        height: 30px;
        width: 30px;
        transition: box-shadow 150ms ease 0s;
        border-radius: 5px;
        border: 0;
        outline: none;
      }

      .tile .image-wrapper span {
        height: 30px;
        width: 30px;
        display: flex;color: black;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 300;
        color: var(--dawn);
        text-transform: capitalize;
      }

      .tile > span {
        margin-top: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        font-weight: 500;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    </style>
  `,
};
