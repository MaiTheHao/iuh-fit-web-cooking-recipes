import { routes } from './routes.js';

export const Router = {
	init: () => {
		const path = window.location.pathname;
		const controller = routes[path];

		if (controller && typeof controller.init === 'function') {
			console.log(`[Router] Đang điều hướng tới: ${path}`);
			controller.init();
		} else {
			console.warn(`[Router] 404 - Không tìm thấy logic cho trang: ${path}`);
		}
	},
};
