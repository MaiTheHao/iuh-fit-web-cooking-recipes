import BaseRepository from './repository.js';
import Category from '../entities/category.entity.js';

/**
 * @typedef {Object} CategoryFilterCriteria
 * @property {string[]|null} ids
 * @property {string[]|null} codes
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

class CategoryRepository extends BaseRepository {
  static #instance = null;

  constructor() {
    if (CategoryRepository.#instance) {
      return CategoryRepository.#instance;
    }
    super('CATEGORIES');
    CategoryRepository.#instance = this;
  }

  /** @returns {CategoryRepository} */
  static getInstance() {
    if (!this.#instance) {
      new CategoryRepository();
    }
    return this.#instance;
  }

  /** @returns {Category|null} */
  findByCode(code) {
    const categories = this.findAll();
    return categories.find((c) => c.code === code) || null;
  }

  /** @returns {Category|null} */
  findById(id) {
    const catData = super.findRawByID(id);
    return catData ? Category.fromJSON(catData) : null;
  }

  /** @returns {Category[]} */
  findAll() {
    const catsData = super.findAllRaw();
    return catsData.map((catData) => Category.fromJSON(catData));
  }

  /** @returns {boolean} */
  codeExists(code) {
    return this.findByCode(code) !== null;
  }

  /** @returns {boolean} */
  exists(id) {
    return this.findById(id) !== null;
  }

  /** @returns {Category[]} */
  findByName(searchTerm) {
    const categories = this.findAll();
    const term = searchTerm.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(term));
  }

  /** @returns {Category[]} */
  findAllSorted() {
    const categories = this.findAll();
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * @param {CategoryFilterCriteria} criteria
   * @returns {Category[]}
   */
  findWithCriteria(criteria = {}) {
    let categories = this.findAll();

    if (Array.isArray(criteria.ids) && criteria.ids.length > 0) {
      categories = categories.filter((c) => criteria.ids.includes(c.id));
    }

    if (Array.isArray(criteria.codes) && criteria.codes.length > 0) {
      categories = categories.filter((c) => criteria.codes.includes(c.code));
    }

    if (criteria.text && typeof criteria.text === 'string') {
      const searchText = criteria.text.toLowerCase();
      categories = categories.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(searchText)) ||
          (c.description && c.description.toLowerCase().includes(searchText)),
      );
    }

    const total = categories.length;
    const skip = Number(criteria.skip) || 0;
    const limit = Number(criteria.limit) || 6;

    return {
      items: categories.slice(skip, skip + limit),
      total,
    };
  }
}

export default CategoryRepository;
