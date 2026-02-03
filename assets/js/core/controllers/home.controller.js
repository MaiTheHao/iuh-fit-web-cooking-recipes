import Logger from '../../utils/logger.js';
import RecipeService from '../services/recipe.service.js';
import AuthService from '../services/auth.service.js';
import { RecipeList } from '../../ui/components/recipe-card.js';
import Notification from '../../ui/components/notification.js';
import { ROUTES } from '../router/const.js';

class HomeController {
	static #instance = null;
	#authService;
	#recipeService;
	#notification;

	constructor() {
		if (HomeController.#instance) {
			return HomeController.#instance;
		}
		HomeController.#instance = this;
		this.#authService = AuthService.getInstance();
		this.#recipeService = RecipeService.getInstance();
		this.#notification = new Notification();
	}

	init() {
		this.initCarousel();
		this.initRecipeList();
		this.initRegisterForm();
	}

	initCarousel() {
		const recipes = this.#recipeService.getWithCriteria({
			categories: ['c1', 'c5'],
			limit: 10,
		});

		if (recipes.length === 0) {
			Logger.warn('No recipes found to populate carousel');
			return;
		}

		const carousel = document.getElementById('carouselId');
		const indicators = carousel.querySelector('.carousel-indicators');
		const carouselInner = carousel.querySelector('.carousel-inner');

		recipes.forEach((recipe, index) => {
			const indicator = document.createElement('button');
			indicator.setAttribute('type', 'button');
			indicator.setAttribute('data-bs-target', '#carouselId');
			indicator.setAttribute('data-bs-slide-to', index);
			indicator.setAttribute('aria-label', recipe.name);
			if (index === 0) {
				indicator.classList.add('active');
				indicator.setAttribute('aria-current', 'true');
			}
			indicators.appendChild(indicator);

			const item = document.createElement('div');
			item.classList.add('carousel-item');
			if (index === 0) {
				item.classList.add('active');
			}

			item.innerHTML = `
				<div class="carousel-item__content">
					<div class="carousel-item__left">
						<h3 class="carousel-item__title">${recipe.name}</h3>
						<div class="recipe-meta">
							<span class="badge bg-light">${recipe.cookTime} min</span>
							<span class="badge bg-light">${recipe.nutrition.calories} kcal</span>
						</div>
						<p class="carousel-item__description">${recipe.description}</p>
						
						<a class="recipe-meta__link btn btn-primary" href="${ROUTES.RECIPES_DETAIL.redirectPath(recipe.code)}">View Detail</a>
					</div>
					<div class="carousel-item__right">
						<img src="${recipe.image}" class="carousel-item__image" alt="${recipe.name}" />
					</div>
				</div>
			`;

			carouselInner.appendChild(item);
		});

		Logger.info(`Carousel initialized with ${recipes.length} recipes`);
	}

	initRecipeList() {
		const recipes = this.#recipeService.getWithCriteria({
			limit: 6,
			stars: {
				min: 5,
				max: 5,
			},
		});
		const recipeList = new RecipeList('recipe-grid');

		recipeList.render(recipes);

		Logger.info(`Recipe grid initialized with ${recipes.length} recipes`);
	}

	initRegisterForm() {
		const registerForm = document.getElementById('register-form');
		if (!registerForm) return;

		registerForm.addEventListener('submit', (e) => {
			e.preventDefault();

			const formData = {
				fullName: document.getElementById('fullName').value.trim(),
				email: document.getElementById('email').value.trim(),
				password: document.getElementById('password').value,
				confirmPassword: document.getElementById('confirmPassword').value,
			};

			const result = this.#authService.register(formData);

			if (result.success) {
				this.#notification.success('Registration Successful!', result.message);
				registerForm.reset();
			} else {
				const errorMessage = result.errors ? Object.values(result.errors)[0] : result.message;

				this.#notification.error('Registration Failed', errorMessage);
			}
		});
	}
}

export default HomeController;
