import { Layout } from './ui/components/layout.js';
import * as bootstrap from '../js/libs/bootstrap5/bootstrap.bundle.js';
import initData from './core/init.js';
import Router from './core/router/router.js';

document.addEventListener('DOMContentLoaded', () => {
	initData();
	new Layout().init();
	new Router().init();

	// Re-initialize lucide icons for new content
	if (window.lucide) {
		window.lucide.createIcons();
	}
});
