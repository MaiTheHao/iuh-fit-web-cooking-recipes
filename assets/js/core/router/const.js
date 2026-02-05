import HomeController from '../controllers/home.controller.js';
import RecipeController from '../controllers/recipes.controller.js';
import RecipeDetailController from '../controllers/recipe-detail.controller.js';
import LoginController from '../controllers/login.controller.js';
import RegisterController from '../controllers/register.controller.js';
import AboutController from '../controllers/about.controller.js';
import ContactController from '../controllers/contact.controller.js';

export const ROUTES = {
  HOME: {
    label: 'Home',
    path: '/pages',
    redirectPath: '/pages',
    controllers: [HomeController],
  },
  RECIPES: {
    label: 'Recipes',
    path: '/pages/recipes',
    redirectPath: '/pages/recipes',
    controllers: [RecipeController],
  },
  RECIPES_DETAIL: {
    label: 'Recipe Detail',
    path: '/pages/recipe-detail',
    redirectPath(id) {
      return `/pages/recipe-detail?id=${id}`;
    },
    controllers: [RecipeDetailController],
  },
  BLOG: {
    label: 'Blog',
    path: '/pages/blog',
    redirectPath: '/pages/blog',
  },
  ABOUT: {
    label: 'About',
    path: '/pages/about',
    redirectPath: '/pages/about',
    controllers: [AboutController],
  },
  CONTACT: {
    label: 'Contact',
    path: '/pages/contact',
    redirectPath: '/pages/contact',
    controllers: [ContactController],
  },
  LOGIN: {
    label: 'Login',
    path: '/pages/login',
    redirectPath: '/pages/login',
    controllers: [LoginController],
  },
  REGISTER: {
    label: 'Register',
    redirectPath: '/pages/register',
    path: '/pages/register',
    controllers: [RegisterController],
  },
};

export const ROUTES_ENTRIES = Object.entries(ROUTES);
