import CategoryRepository from '../repositories/category.repository.js';

/**
 * @typedef {Object} CategoryFilterCriteria
 * @property {string[]|null} ids
 * @property {string[]|null} codes
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

class CategoryService {
  static #instance = null;

  constructor() {
    if (CategoryService.#instance) {
      return CategoryService.#instance;
    }
    this.categoryRepository = CategoryRepository.getInstance();
    CategoryService.#instance = this;
  }

  /** @returns {CategoryService} */
  static getInstance() {
    if (!this.#instance) {
      new CategoryService();
    }
    return this.#instance;
  }

  /** @returns {Category[]} */
  getList(limit = 6) {
    return this.categoryRepository.findAll().slice(0, limit);
  }

  /** @returns {Category[]} */
  getAll() {
    return this.categoryRepository.findAll();
  }

  /** @returns {Category|null} */
  getByCode(code) {
    return this.categoryRepository.findByCode(code);
  }

  /**
   * @param {CategoryFilterCriteria} criteria
   * @returns {{items: Category[], total: number}}
   */
  getWithCriteria(criteria = {}) {
    const finalCriteria = {
      ids: criteria.ids || null,
      codes: criteria.codes || null,
      text: criteria.text || null,
      skip: Number(criteria.skip) || 0,
      limit: Number(criteria.limit) || 6,
    };

    return this.categoryRepository.findWithCriteria(finalCriteria);
  }
}

export default CategoryService;
