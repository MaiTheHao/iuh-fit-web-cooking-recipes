import BaseRepository from './repository.js';
import User from '../entities/user.entity.js';

class UserRepository extends BaseRepository {
	static #instance = null;

	constructor() {
		if (UserRepository.#instance) {
			return UserRepository.#instance;
		}
		super('USERS');
		UserRepository.#instance = this;
	}

	/** @returns {UserRepository} */
	static getInstance() {
		if (!this.#instance) {
			new UserRepository();
		}
		return this.#instance;
	}

	/** @returns {User|null} */
	findByEmail(email) {
		const users = this.findAll();
		return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
	}

	/** @returns {User[]} */
	findByRole(role) {
		const users = this.findAll();
		return users.filter((u) => u.role === role);
	}

	/** @returns {User|null} */
	findById(id) {
		const userData = super.findRawByID(id);
		return userData ? User.fromJSON(userData) : null;
	}

	/** @returns {User[]} */
	findAll() {
		const usersData = super.findAllRaw();
		return usersData.map((userData) => User.fromJSON(userData));
	}

	/** @returns {boolean} */
	emailExists(email) {
		return this.findByEmail(email) !== null;
	}

	/** @returns {number} */
	countByRole(role) {
		return this.findByRole(role).length;
	}

	/** @returns {User[]} */
	findByName(searchTerm) {
		const users = this.findAll();
		const term = searchTerm.toLowerCase();
		return users.filter((u) => u.fullName.toLowerCase().includes(term));
	}

	/** @returns {boolean} */
	exists(id) {
		return this.findById(id) !== null;
	}
}

export default UserRepository;
