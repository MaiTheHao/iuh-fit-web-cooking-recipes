import RecipeRepository from '../repositories/recipe.repository.js';

/**
 * @typedef {Object} RecipeFilterCriteria
 * @property {{min: number, max: number}|null} stars
 * @property {{min: number, max: number}|null} cookTime
 * @property {{min: number, max: number}|null} prepTime
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
   * @returns {{items: Recipe[], total: number}}
   */
  getWithCriteria(criteria = {}) {
    const finalCriteria = {
      stars: criteria.stars || null,
      cookTime: criteria.cookTime || null,
      prepTime: criteria.prepTime || null,
      categories: criteria.categories || null,
      authorIds: criteria.authorIds || null,
      text: criteria.text || null,
      skip: Number(criteria.skip) || 0,
      limit: Number(criteria.limit) || 6,
    };

    return this.recipeRepository.findWithCriteria(finalCriteria);
  }
}

export default RecipeService;
