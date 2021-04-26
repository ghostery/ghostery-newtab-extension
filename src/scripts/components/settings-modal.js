import { iconX } from '../templates/icons.js';

const { html } = hybrids;

function hide(host) {
  host.hidden = true;
}

export default {
  hidden: true,
  render: ({ hidden }) => html`
    <style>
      .wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0,0,0,0.5);
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
        z-index: 1;
      }
      .visible {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
      }
      .modal {
        padding: 0;
        background: rgb(227,243,253);
        background: linear-gradient(66deg, rgba(227,243,253,1) 0%, rgba(254,239,239,1) 100%);
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 20px 20px 40px 20px;
        box-sizing: border-box;
        transform: translate(-50%,-50%);
        width: var(--width);
        border-radius: 6px;
      }

      header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 34px;
        align-items: center;
      }

      header h1 {
        margin: 0;
        margin-left: 14px;
        font-size: 19px;
        font-weight:bold;
        display: inline-block;
        background: linear-gradient(to right, #0B4B76, #8E576C);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      header svg {
        color: #81858A;
        margin-right: -3px;
        cursor: pointer;
      }

      header svg:hover {
        color: #111;
      }

      main {
        display: grid;
        grid-template-columns: 35% 65%;
      }

      main nav {
        padding-right: 34px;
      }

      main nav a {
        background: white;
        font-size: 13px;
        font-weight: 500;
        color: #111;
        padding: 9px 15px;
        border-radius: 5px;
      }

      main section {
        font-size: 11.5px;
        color: #111;
        margin-left: 34px;
        margin-right: 34px;
        line-height: 17px;
      }

      main section a {
        background: #2C9CE2;
        border-radius: 3px;
        padding: 6px;
        border-width: 0px;
        color: white;
        text-decoration: none;
      }

      main section a::visited {
        color: white;
      }
    </style>
    <div class='wrapper ${hidden ? '' : 'visible'}' onclick=${hide}>
      <div class='modal'>
        <header>
          <h1>Private Sponsored Links</h1>
          ${iconX({ onclick: hide })}
        </header>

        <main>
          <nav>
            <a>Why am I seeing this?</a>
          </nav>

          <section>
            You are seeing these Private Sponsored Links because they allow Ghostery to pay our bills while still preserving your privacy.  This feature helps us provide Ghostery Dawn as a free product and it is designed to operate with zero user data.
            <br/><br/>
            If you would like all the great benefits of Ghostery without seeing Private Sponsored Links, you can subscribe to one of our plans to remove private ads and unlock all of our advanced products and features.
            <br/><br/>
            <a href="https://account.ghostery.com/en/subscription/">Subscribe</a>
          </section>
        </main>

      </div>
    </div>
  `,
}
