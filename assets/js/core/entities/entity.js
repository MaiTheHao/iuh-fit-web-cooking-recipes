import Validator from '../../utils/validator.js';

class Entity {
	/** @type {string} Unique identifier */
	#id;

	constructor(id) {
		if (new.target === Entity) throw new Error('Cannot instantiate abstract class Entity directly');

		const validation = Validator.id.valid(id);
		if (!validation[1]) throw new Error(`Entity ID: ${validation[0]}`);
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
