/**
 * @typedef {Object} CategoryFilterCriteria
 * @property {string[]|null} ids
 * @property {string[]|null} codes
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

// ENTITY

class Category extends Entity {
  /** @type {string} Category code */
  #code;

  /** @type {string} Category name */
  #name;

  /** @type {string} Category description */
  #description;

  constructor({ id, code, name, description }) {
    super(id);
    this.code = code;
    this.name = name;
    this.description = description;
  }

  get code() {
    return this.#code;
  }

  set code(code) {
    const validation = Validator.categoryCode.valid(code);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Category code: ${errors}`);
    }
    this.#code = code.trim();
    return this;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    const validation = Validator.string.valid(name, 3, 30);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Category name: ${errors}`);
    }
    this.#name = name.trim();
    return this;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    const validation = Validator.string.valid(description, 10, 300);
    if (!validation.isValid) {
      throw new Error(`Category description: ${validation.errors.length}`);
    }
    this.#description = description.trim();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.#code,
      name: this.#name,
      description: this.#description,
    };
  }

  static fromJSON(data) {
    return new Category({
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description,
    });
  }
}

// REPOSITORY

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

// SERVICE

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

  /** @returns {Category|null} */
  getById(id) {
    return this.categoryRepository.findById(id);
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
