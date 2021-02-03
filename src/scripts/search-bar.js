const styles = `
:root {
  --background: #2F3136;
  --footer-background: #36393F;
  --footer-text: #8E9297;
  --link: #76CDEA;
  --text: #B9BBBE;
  --ghostery: #00AEF0;
  --width: 654px;
  --spacing: 38px;
  --margin: 112px;
}

#searchForm {
  display: flex;
  flex-direction: row;
  width: var(--width);
  height: 48px;
  border: 2px solid transparent;
  border-radius: 6px;
  position: relative;
  padding: 0;
  background-clip: padding-box;
  box-sizing: border-box;
}

#searchForm:before {
  content: ' ';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -1;
  margin: -2px; /* !importanté */
  border-radius: inherit; /* !importanté */
  z-index: -1;
}

#searchForm form {
  display: flex;
  flex: 1;
  align-items: center;
}

#searchForm .feather {
  height: 17px;
  width: 17px;
  flex-shrink: 0;
}

#searchForm .feather-search {
  display: none;
  margin-right: 14px;
}

#searchForm input:invalid ~ .feather-search {
  display: block;
}

#searchForm .feather-x {
  cursor: pointer;
  margin-right: 14px;
  display: block;
  color: #81858A;
}

#searchForm .feather-x:hover {
  color: white;
}

#searchForm input:invalid ~ .feather-x {
  display: none;
}

#searchForm input {
  font-size: 17px;
  background: transparent;
  border: 0px;
  width: 100%;
  align-self: center;
  font-weight: 500;
  padding: 10px 15px 10px 15px;
  margin: 0 auto;
}

#searchForm input:invalid {
  box-shadow: none;
  padding: 10px 15px 10px calc(31px + 15px);
}

#searchForm input::placeholder {
  text-align: center;
  background: linear-gradient(to right, #72b643, #00AEF0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 1;
}

#searchForm input:focus::placeholder {
  text-align: left;
  background: initial;
  background-clip: initial;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
}

#searchForm input:focus {
  outline: 0;
  padding: 10px 15px;
}

/* Query suggestions */

#searchForm #querySuggestions {
  display: none;
}

#searchForm:focus-within #querySuggestions {
  display: block;
}

#querySuggestions {
  width: calc(var(--width) - 2px);
  background-color: var(--background);
  position: absolute;
  left: -1px;
  right: 10px;
  top: calc(100% + 2px);
  height: auto;
  overflow: hidden;
  border: 1px solid #262626;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 0 0px;
  -webkit-box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.15);
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.15);
  z-index: 100;
}

#querySuggestions:empty {
  border-width: 0;
}

#querySuggestions li {
  list-style: none;
  margin: 0;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 17px;
  color: white;
}

#querySuggestions li.autoComplete_selected, #querySuggestions li:hover {
  background-color: #202225;
}

#querySuggestions li span.autoComplete_highlighted {
  color: var(--text);
  font-weight: 500;
}

@media (prefers-color-scheme: light) {
  #searchForm {
    background-color: white;
  }

  #searchForm:before {
    background: white;
  }

  #searchForm:focus-within:before {
    background: linear-gradient(to bottom right, #72b643, var(--ghostery));
  }

  #searchForm .feather-x:hover {
    color: black;
  }

  #searchForm input {
    color: #39444B;
  }

  #searchForm input:focus {
    color: black;
  }

  #searchForm input:focus::placeholder {
    color: #565b61;
    ;
  }
}

@media (prefers-color-scheme: dark) {
  #searchForm {
    background-color: #202225;
  }

  #searchForm:before {
    background: #36393F;
  }

  #searchForm:focus-within:before {
    background: linear-gradient(to bottom right, #72b643, var(--ghostery));
  }

  #searchForm input {
    color: #C0C1C4;
  }

  #searchForm input:focus {
    color: white;
  }

  #searchForm input:focus::placeholder {
    color: #565b61;
  }
}
`;

function clear(host) {
  host.query = '';
}

function updateQuery(host, event) {
  host.query = event.target.value;
}

const iconSearch = hybrids.html`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
`;

const iconX = hybrids.html`
<svg onclick=${clear} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
`;

const SearchBar = {
  query: '',
  render: ({ query }) => hybrids.html`
<div id="searchForm">
  <form  action="https://glowstery.com/search">
    <input
      id="search-input"
      name="q"
      tabindex="1"
      aria-label="Search input"
      placeholder="Search privately with Ghostery"
      size="30"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      aria-haspopup="false"
      maxlength="2048"
      type="text"
      aria-autocomplete="both"
      value="${query}"
      oninput="${updateQuery}"
      required
    />
    ${iconSearch}
    ${iconX}
  </form>
</div>
  `.style(styles),
};

hybrids.define('search-bar', SearchBar);