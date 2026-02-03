import RecipeRepository from '../repositories/recipe.repository.js';

/**
 * @typedef {Object} RecipeFilterCriteria
 * @property {{min: number, max: number}|null} stars
 * @property {{min: number, max: number}|null} cookTime
 * @property {string[]|null} categories
 * @property {string[]|null} authorIds
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

class RecipeService {
	static #instance = null;

	constructor() {
		if (RecipeService.#instance) {
			return RecipeService.#instance;
		}
		this.recipeRepository = RecipeRepository.getInstance();
		RecipeService.#instance = this;
	}

	/** @returns {RecipeService} */
	static getInstance() {
		if (!this.#instance) {
			new RecipeService();
		}
		return this.#instance;
	}

	/** @returns {Recipe[]} */
	getList(limit = 6) {
		return this.recipeRepository.findAll().slice(0, limit);
	}

	/** @returns {Recipe[]} */
	getHighestRated(limit = 6) {
		const allRecipes = this.recipeRepository.findAll();
		const sortedByRating = allRecipes.sort((a, b) => (b.stars || 0) - (a.stars || 0));
		return sortedByRating.slice(0, limit);
	}

	/** @returns {Recipe[]} */
	getAll() {
		return this.recipeRepository.findAll();
	}

	/** @returns {Recipe|null} */
	getByCode(code) {
		return this.recipeRepository.findByCode(code);
	}

	/**
	 * @param {RecipeFilterCriteria} criteria
	 * @returns {Recipe[]}
	 */
	getWithCriteria(criteria = {}) {
		const settings = {
			stars: null,
			cookTime: null,
			categories: null,
			authorIds: null,
			text: null,
			skip: 0,
			limit: 6,
			...criteria,
		};

		let recipes = this.recipeRepository.findAll();

		if (settings.stars && typeof settings.stars === 'object') {
			const min = typeof settings.stars.min === 'number' ? settings.stars.min : 0;
			const max = typeof settings.stars.max === 'number' ? settings.stars.max : 5;
			recipes = recipes.filter((r) => r.stars >= min && r.stars <= max);
		}

		if (settings.cookTime && typeof settings.cookTime === 'object') {
			const min = typeof settings.cookTime.min === 'number' ? settings.cookTime.min : 0;
			const max = typeof settings.cookTime.max === 'number' ? settings.cookTime.max : Number.MAX_SAFE_INTEGER;
			recipes = recipes.filter((r) => r.cookTime >= min && r.cookTime <= max);
		}

		if (Array.isArray(settings.categories) && settings.categories.length > 0) {
			recipes = recipes.filter((r) => settings.categories.includes(r.categoryId));
		}

		if (Array.isArray(settings.authorIds) && settings.authorIds.length > 0) {
			recipes = recipes.filter((r) => settings.authorIds.includes(r.authorId));
		}

		if (settings.text && typeof settings.text === 'string') {
			const searchText = settings.text.toLowerCase();
			recipes = recipes.filter((r) => (r.name && r.name.toLowerCase().includes(searchText)) || (r.description && r.description.toLowerCase().includes(searchText)));
		}

		const skip = Number(settings.skip) || 0;
		const limit = Number(settings.limit) || 6;
		return recipes.slice(skip, skip + limit);
	}
}

export default RecipeService;
