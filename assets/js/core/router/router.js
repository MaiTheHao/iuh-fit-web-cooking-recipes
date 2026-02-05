import Logger from '../../utils/logger.js';
import { ROUTES_ENTRIES } from './const.js';

class Router {
  static #instance = null;

  constructor() {
    if (Router.#instance) {
      return Router.#instance;
    }
    Router.#instance = this;
  }

  init() {
    this.handleRouting();
  }

  get #currentPath() {
    if (window === undefined || window.location === undefined) {
      Logger.error('Router: window or window.location is undefined');
      return '/';
    }
    return window.location.pathname;
  }

  get #currentRoute() {
    for (const [key, route] of ROUTES_ENTRIES) {
      const pattern =
        route.path || (typeof route.redirectPath === 'string' ? route.redirectPath : null);

      if (!pattern) continue;
      const regex = new RegExp(`^${pattern.replace(/:[^\s/]+/g, '([^/]+)')}(?:\\.html)?$`, 'i');
      const match = this.#currentPath.match(regex);

      if (match) {
        Logger.info(`Matched route: ${key} for path: ${this.#currentPath}`);
        return { key, ...route, params: match.slice(1) };
      }
    }
  }

  handleRouting() {
    const controllers = this.#currentRoute?.controllers || [];
    controllers.forEach((ControllerClass) => {
      Logger.info(`Applying controller: ${ControllerClass.name}`);
      const controller = new ControllerClass();
      if (typeof controller.init === 'function') {
        controller.init();
      }
    });
  }
}

export default Router;
