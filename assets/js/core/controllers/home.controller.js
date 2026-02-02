import Logger from '../../utils/logger.js';
import CategoryRepository from '../repositories/category.repository.js';
import RecipeRepository from '../repositories/repcipe.repository.js';
import UserRepository from '../repositories/user.repository.js';
import { ROUTES } from '../router/const.js';

class HomeController {
	static #instance = null;

	constructor() {
		if (HomeController.#instance) {
			return HomeController.#instance;
		}
		HomeController.#instance = this;
	}

	init() {
		this.initCarousel();
		this.initRecipeList();
	}

	initCarousel() {
		const recipes = RecipeRepository.getInstance().findAllSorted();

		if (recipes.length === 0) {
			Logger.warn('No recipes found to populate carousel');
			return;
		}

		const carousel = document.getElementById('carouselId');
		const indicators = carousel.querySelector('.carousel-indicators');
		const carouselInner = carousel.querySelector('.carousel-inner');

		recipes.slice(0, 10).forEach((recipe, index) => {
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
		const recipes = RecipeRepository.getInstance().findAll();
		const recipeGrid = document.getElementById('recipe-grid');

		if (!recipeGrid) {
			Logger.warn('Recipe grid container not found');
			return;
		}

		if (recipes.length === 0) {
			recipeGrid.innerHTML = '<div class="col-12 text-center"><p>No recipes found.</p></div>';
			return;
		}

		recipeGrid.innerHTML = '';

		recipes.slice(0, 6).forEach((recipe) => {
			const author = UserRepository.getInstance().findById(recipe.authorId);
			const authorName = author ? author.fullName : 'Unknown Author';
			const authorAvatar = author
				? author.avatar
				: 'https://static.vecteezy.com/system/resources/previews/025/738/217/original/anime-black-and-white-isolated-icon-illustration-vector.jpg';

			const recipeCol = document.createElement('div');
			recipeCol.classList.add('col');
			recipeCol.innerHTML = `
                <a href="${ROUTES.RECIPES_DETAIL.redirectPath(recipe.code)}" class="d-block h-100 text-decoration-none">
                    <div class="card h-100 border-0 shadow-sm recipe-card">
                        <div class="position-relative">
                            <img
                                src="${recipe.image}"
                                class="card-img-top"
                                alt="${recipe.name}"
                            />
                            <div class="badge bg-accent position-absolute top-0 end-0 m-3 bg-white recipe-card__time">
                                <i data-lucide="clock"></i> <span>${recipe.cookTime} min</span>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-2 fw-bold text-dark recipe-card__title">${recipe.name}</h5>
                            <p class="card-text text-muted mb-3 grow recipe-card__desc">
                                ${recipe.description}
                            </p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <div class="d-flex align-items-center gap-2">
                                    <img
                                        src="${authorAvatar}"
                                        alt="${authorName}"
                                        class="rounded-circle recipe-card__author-img"
                                    />
                                    <span class="text-muted small">${authorName}</span>
                                </div>
                                <div class="d-flex text-warning small">
                                    ${this.#renderStars(recipe.stars || 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
			recipeGrid.appendChild(recipeCol);
		});

		Logger.info(`Recipe grid initialized with ${recipes.length} recipes`);
	}

	#renderStars(rating) {
		let starsHtml = '';
		for (let i = 1; i <= 5; i++) {
			const color = i <= rating ? 'var(--color-accent)' : 'var(--color-bg-alt)';
			starsHtml += `<i data-lucide="star" class="fill-current" style="width: 1rem; color: ${color}"></i>`;
		}
		return starsHtml;
	}
}

export default HomeController;
