import Validator from '../../utils/validator.js';

class Entity {
	/** @type {string} Unique identifier */
	#id;

	constructor(id) {
		if (new.target === Entity) throw new Error('Cannot instantiate abstract class Entity directly');

		const validation = Validator.id.valid(id);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Entity ID: ${errors}`);
		}
		this.#id = id.trim();
	}

	get id() {
		return this.#id;
	}

	toJSON() {
		throw new Error('toJSON() must be implemented by subclass');
	}

	toString() {
		return JSON.stringify(this.toJSON());
	}

	clone() {
		return structuredClone(this.toJSON());
	}

	static fromJSON(data) {
		throw new Error('fromJSON() must be implemented by subclass');
	}
}

export default Entity;
