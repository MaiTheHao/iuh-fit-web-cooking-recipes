import HomeController from '../controllers/home.controller.js';
import RecipeController from '../controllers/recipe.controller.js';

export const ROUTES = {
	HOME: {
		label: 'Home',
		redirectPath: '/pages',
		controllers: [HomeController],
	},
	RECIPES: {
		label: 'Recipes',
		redirectPath: '/pages/recipes',
		controllers: [RecipeController],
	},
	RECIPES_DETAIL: {
		label: 'Recipe Detail',
		redirectPath(id) {
			return `/pages/recipes/${id}`;
		},
		controllers: [RecipeController],
	},
	BLOG: {
		label: 'Blog',
		redirectPath: '/pages/blog',
	},
	ABOUT: {
		label: 'About',
		redirectPath: '/pages/about',
	},
	CONTACT: {
		label: 'Contact',
		redirectPath: '/pages/contact',
	},
};
