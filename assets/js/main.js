import { Layout } from './ui/components/layout.js';

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('root');

	// Layout
	new Layout(root).init();
});
