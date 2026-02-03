import RecipeRepository from '../repositories/recipe.repository.js';

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
}

export default RecipeService;
