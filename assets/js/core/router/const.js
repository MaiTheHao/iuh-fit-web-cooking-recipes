import HomeController from '../controllers/home.controller.js';
import RecipeController from '../controllers/recipes.controller.js';
import RecipeDetailController from '../controllers/recipe-detail.controller.js';
import BlogController from '../controllers/blog.controller.js';
import BlogDetailController from '../controllers/blog-detail.controller.js';
import LoginController from '../controllers/login.controller.js';
import RegisterController from '../controllers/register.controller.js';
import AboutController from '../controllers/about.controller.js';
import ContactController from '../controllers/contact.controller.js';
import ProfileController from '../controllers/profile.controller.js';
// Admin
import AdminRecipeController from '../../admin/controllers/admin-recipe.controller.js';
import AdminBlogController from '../../admin/controllers/admin-blog.controller.js';
import AdminUserController from '../../admin/controllers/admin-user.controller.js';

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
    redirectPath: '/pages/recipes.html',
    controllers: [RecipeController],
  },
  RECIPES_DETAIL: {
    label: 'Recipe Detail',
    path: '/pages/recipe-detail',
    redirectPath(id) {
      return `/pages/recipe-detail.html?id=${id}`;
    },
    controllers: [RecipeDetailController],
  },
  BLOG: {
    label: 'Blog',
    path: '/pages/blogs',
    redirectPath: '/pages/blogs.html',
    controllers: [BlogController],
  },
  BLOG_DETAIL: {
    label: 'Blog Detail',
    path: '/pages/blog-detail',
    redirectPath(id) {
      return `/pages/blog-detail.html?id=${id}`;
    },
    controllers: [BlogDetailController],
  },
  ABOUT: {
    label: 'About',
    path: '/pages/about',
    redirectPath: '/pages/about.html',
    controllers: [AboutController],
  },
  CONTACT: {
    label: 'Contact',
    path: '/pages/contact',
    redirectPath: '/pages/contact.html',
    controllers: [ContactController],
  },
  LOGIN: {
    label: 'Login',
    path: '/pages/login',
    redirectPath: '/pages/login.html',
    controllers: [LoginController],
  },
  REGISTER: {
    label: 'Register',
    redirectPath: '/pages/register.html',
    path: '/pages/register',
    controllers: [RegisterController],
  },
  PROFILE: {
    label: 'Profile',
    redirectPath: '/pages/profile.html',
    path: '/pages/profile',
    controllers: [ProfileController],
  },
  ADMIN_RECIPES: {
    label: 'Admin Recipes',
    path: '/pages/admin/recipes',
    redirectPath: '/pages/admin/recipes.html',
    controllers: [AdminRecipeController],
  },
  ADMIN_BLOGS: {
    label: 'Admin Blogs',
    path: '/pages/admin/blogs',
    redirectPath: '/pages/admin/blogs.html',
    controllers: [AdminBlogController],
  },
  ADMIN_USERS: {
    label: 'Admin Users',
    path: '/pages/admin/users',
    redirectPath: '/pages/admin/users.html',
    controllers: [AdminUserController],
  },
};

export const ROUTES_ENTRIES = Object.entries(ROUTES);
