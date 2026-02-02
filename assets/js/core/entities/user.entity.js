import Validator from '../../utils/validator.js';
import Entity from './entity.js';

class User extends Entity {
	/** @type {string} User email */
	#email;

	/** @type {string} User full name */
	#fullName;

	/** @type {string} User password */
	#password;

	/** @type {string} User avatar URL */
	#avatar;

	/** @type {string} User role*/
	#role;

	/** @type {string[]} Favorite recipe IDs */
	#favoriteRecipes = [];

	constructor({ id, email, fullName, password, avatar, roleId, favoriteRecipes = [] }) {
		super(id);
		this.email = email;
		this.fullName = fullName;
		this.password = password;
		this.avatar = avatar;
		this.roleId = roleId;
		this.favoriteRecipes = favoriteRecipes;
	}

	get email() {
		return this.#email;
	}

	set email(email) {
		const validation = Validator.email.valid(email);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Email: ${errors}`);
		}
		this.#email = email;
	}

	get fullName() {
		return this.#fullName;
	}

	set fullName(fullName) {
		const validation = Validator.fullName.valid(fullName);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Full name: ${errors}`);
		}
		this.#fullName = fullName.trim();
	}

	get password() {
		return this.#password;
	}

	set password(password) {
		const validation = Validator.password.valid(password);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Password: ${errors}`);
		}
		this.#password = password;
	}

	get avatar() {
		return this.#avatar;
	}

	set avatar(avatar) {
		const validation = Validator.imageUrl.valid(avatar);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Avatar URL: ${errors}`);
		}
		this.#avatar = avatar;
	}

	get role() {
		return this.#role;
	}

	set role(role) {
		const [err, isValid] = Validator.id.valid(role);
		if (!isValid) throw new Error(`Role ID: ${err}`);
		this.#role = role.trim();
	}

	get favoriteRecipes() {
		return structuredClone(this.#favoriteRecipes);
	}

	set favoriteRecipes(recipes) {
		if (!Array.isArray(recipes)) throw new Error('Favorite recipes must be an array');
		this.#favoriteRecipes = recipes;
	}

	toJSON() {
		return {
			id: this.id,
			email: this.#email,
			fullName: this.#fullName,
			password: this.#password,
			avatar: this.#avatar,
			role: this.#role,
			favoriteRecipes: structuredClone(this.#favoriteRecipes),
		};
	}

	static fromJSON(data) {
		return new User({
			id: data.id,
			email: data.email,
			fullName: data.fullName,
			password: data.password,
			avatar: data.avatar,
			roleId: data.roleId,
			favoriteRecipes: data.favoriteRecipes || [],
		});
	}
}

export default User;
