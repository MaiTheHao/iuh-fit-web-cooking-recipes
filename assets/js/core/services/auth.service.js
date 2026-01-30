import Validator from '../../utils/validator';

class AuthService {
	static #instance = null;

	constructor() {
		if (AuthService.#instance) {
			return AuthService.#instance;
		}
		AuthService.#instance = this;
	}

	/** @returns {AuthService} */
	static getInstance() {
		if (!this.#instance) {
			new AuthService();
		}
		return this.#instance;
	}

	signin(email, password) {}
}
