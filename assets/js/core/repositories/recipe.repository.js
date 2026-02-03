import BaseRepository from './repository.js';
import Recipe from '../entities/recipe.entity.js';

class RecipeRepository extends BaseRepository {
	static #instance = null;

	constructor() {
		if (RecipeRepository.#instance) {
			return RecipeRepository.#instance;
		}
		super('RECIPES');
		RecipeRepository.#instance = this;
	}

	/** @returns {RecipeRepository} */
	static getInstance() {
		if (!this.#instance) {
			new RecipeRepository();
		}
		return this.#instance;
	}

	/** @returns {Recipe|null} */
	findByCode(code) {
		const recipes = this.findAll();
		return recipes.find((r) => r.code === code) || null;
	}

	/** @returns {Recipe|null} */
	findById(id) {
		const recipeData = super.findRawByID(id);
		return recipeData ? Recipe.fromJSON(recipeData) : null;
	}

	/** @returns {Recipe[]} */
	findAll() {
		const recipesData = super.findAllRaw();
		return recipesData.map((recipeData) => Recipe.fromJSON(recipeData));
	}

	/** @returns {Recipe[]} */
	findByCategory(categoryId) {
		const recipes = this.findAll();
		return recipes.filter((r) => r.categoryId === categoryId);
	}

	/** @returns {Recipe[]} */
	findByAuthor(authorId) {
		const recipes = this.findAll();
		return recipes.filter((r) => r.authorId === authorId);
	}

	/** @returns {Recipe[]} */
	findQuickRecipes(minutes) {
		const recipes = this.findAll();
		return recipes.filter((r) => r.prepTime <= minutes);
	}

	/** @returns {Recipe[]} */
	findByTotalTime(minutes) {
		const recipes = this.findAll();
		return recipes.filter((r) => r.prepTime + r.cookTime <= minutes);
	}

	/** @returns {Recipe[]} */
	findByName(searchTerm) {
		const recipes = this.findAll();
		const term = searchTerm.toLowerCase();
		return recipes.filter((r) => r.name.toLowerCase().includes(term));
	}

	/** @returns {Recipe[]} */
	findByDescription(searchTerm) {
		const recipes = this.findAll();
		const term = searchTerm.toLowerCase();
		return recipes.filter((r) => r.description.toLowerCase().includes(term));
	}

	/** @returns {number} */
	countByCategory(categoryId) {
		return this.findByCategory(categoryId).length;
	}

	/** @returns {number} */
	countByAuthor(authorId) {
		return this.findByAuthor(authorId).length;
	}
}

export default RecipeRepository;
