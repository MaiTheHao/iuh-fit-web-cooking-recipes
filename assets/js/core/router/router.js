import Logger from '../../utils/logger.js';
import { ROUTES } from './const.js';

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
		return window.location.pathname;
	}

	get #currentRoute() {
		const routeEntries = Object.entries(ROUTES);
		for (const [key, route] of routeEntries) {
			if (route.redirectPath.match(new RegExp(`^${this.#currentPath}$`, 'i'))) {
				return { key, ...route };
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
