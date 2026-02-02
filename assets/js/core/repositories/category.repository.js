import BaseRepository from './repository.js';
import Category from '../entities/category.entity.js';

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
}

export default CategoryRepository;
