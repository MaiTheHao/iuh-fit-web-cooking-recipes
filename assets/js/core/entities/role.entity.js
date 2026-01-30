import Validator from '../../utils/validator.js';
import Entity from './entity.js';

class Role extends Entity {
	/** @type {string} Role code (e.g., ROLE_ADMIN, ROLE_USER) */
	#code;

	/** @type {string} Role display name */
	#name;

	/** @type {string} Role description */
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
		const [err, isValid] = Validator.roleCode.valid(code);
		if (!isValid) throw new Error(`Role code: ${err}`);
		this.#code = code;
	}

	get name() {
		return this.#name;
	}

	set name(name) {
		const validation = Validator.string.valid(name, 3, 50);
		if (!validation.isValid) throw new Error(`Role name: ${validation.errors.length}`);
		this.#name = name.trim();
	}

	get description() {
		return this.#description;
	}

	set description(description) {
		const validation = Validator.string.valid(description, 10, 200);
		if (!validation.isValid) throw new Error(`Role description: ${validation.errors.length}`);
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
		return new Role(data.id, data.code, data.name, data.description);
	}
}

export default Role;
