import Validator from '../utils/validator.js';
import Entity from './entity.js';

class Category extends Entity {
	/** @type {string} Category code */
	#code;

	/** @type {string} Category name */
	#name;

	/** @type {string} Category description */
	#description;

	constructor(id, code, name, description) {
		super(id);
		this.code = code;
		this.name = name;
		this.description = description;
	}

	get code() {
		return this.#code;
	}

	set code(code) {
		const [err, isValid] = Validator.categoryCode.valid(code);
		if (!isValid) throw new Error(`Category code: ${err}`);
		this.#code = code;
	}

	get name() {
		return this.#name;
	}

	set name(name) {
		const validation = Validator.string.valid(name, 3, 30);
		if (!validation.isValid) {
			throw new Error(`Category name: ${validation.errors.length}`);
		}
		this.#name = name.trim();
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
		return new Category(data.id, data.code, data.name, data.description);
	}
}

export default Category;
