import { Layout } from './ui/components/layout.js';
import * as bootstrap from '../js/libs/bootstrap5/bootstrap.bundle.js';
import initData from './core/init.js';

document.addEventListener('DOMContentLoaded', () => {
	initData();

	const root = document.getElementById('root');

	// Layout
	new Layout(root).init();
});
