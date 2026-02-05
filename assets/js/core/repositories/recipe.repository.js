import BaseRepository from './repository.js';
import Recipe from '../entities/recipe.entity.js';

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

  /**
   * @param {RecipeFilterCriteria} criteria
   * @returns {Recipe[]}
   */
  findWithCriteria(criteria = {}) {
    let recipes = this.findAll();

    if (criteria.stars && typeof criteria.stars === 'object') {
      const min = typeof criteria.stars.min === 'number' ? criteria.stars.min : 0;
      const max = typeof criteria.stars.max === 'number' ? criteria.stars.max : 5;
      recipes = recipes.filter((r) => r.stars >= min && r.stars <= max);
    }

    if (criteria.cookTime && typeof criteria.cookTime === 'object') {
      const min = typeof criteria.cookTime.min === 'number' ? criteria.cookTime.min : 0;
      const max =
        typeof criteria.cookTime.max === 'number' ? criteria.cookTime.max : Number.MAX_SAFE_INTEGER;
      recipes = recipes.filter((r) => r.cookTime >= min && r.cookTime <= max);
    }

    if (criteria.prepTime && typeof criteria.prepTime === 'object') {
      const min = typeof criteria.prepTime.min === 'number' ? criteria.prepTime.min : 0;
      const max =
        typeof criteria.prepTime.max === 'number' ? criteria.prepTime.max : Number.MAX_SAFE_INTEGER;
      recipes = recipes.filter((r) => r.prepTime >= min && r.prepTime <= max);
    }

    if (Array.isArray(criteria.categories) && criteria.categories.length > 0) {
      recipes = recipes.filter((r) => criteria.categories.includes(r.categoryId));
    }

    if (Array.isArray(criteria.authorIds) && criteria.authorIds.length > 0) {
      recipes = recipes.filter((r) => criteria.authorIds.includes(r.authorId));
    }

    if (criteria.text && typeof criteria.text === 'string') {
      const searchText = criteria.text.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(searchText)) ||
          (r.description && r.description.toLowerCase().includes(searchText)),
      );
    }

    const total = recipes.length;
    const skip = Number(criteria.skip) || 0;
    const limit = Number(criteria.limit) || 6;

    return {
      items: recipes.slice(skip, skip + limit),
      total,
    };
  }
}

export default RecipeRepository;
