import { Layout } from './ui/components/layout.js';
import * as bootstrap from '../js/libs/bootstrap5/bootstrap.bundle.js';

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('root');

	// Layout
	new Layout(root).init();
});
