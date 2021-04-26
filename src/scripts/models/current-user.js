import { getUser } from '../utils/gbe.js';

export default class CurrentUser {
  _user = undefined

  get isLoaded() {
    return this._user !== undefined;
  }

  get isLoggedIn() {
    return Boolean(this._user);
  }

  get shouldSeePrivateSponsoredLinks() {
    // This will evenetually become available to user via settings
    if (localStorage.highlights === "on") {
      return true;
    }

    if (localStorage.highlights === "off") {
      return false;
    }

    this.load().then(() => {
      const user = this._user;
      if (user && (user.scopes.includes('subscriptions:plus') || user.scopes.includes('subscriptions:premium'))) {
        localStorage.shouldSeePrivateSponsoredLinks = false;
        return;
      }

      localStorage.shouldSeePrivateSponsoredLinks = true;
    });

    try {
      return JSON.parse(localStorage.shouldSeePrivateSponsoredLinks);
    } catch (e) {
      return false;
    }
  }

  async load() {
    // ask for user once per new tab page load
    if (!this._userLoadingPromise) {
      this._userLoadingPromise = getUser().then(user => {
        this._user = user;
      });
    }
    return this._userLoadingPromise;
  }
}
