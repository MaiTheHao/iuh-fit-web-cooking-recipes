import BaseRepository from './repository.js';
import Role from '../entities/role.entity.js';

class RoleRepository extends BaseRepository {
	static #instance = null;

	constructor() {
		if (RoleRepository.#instance) {
			return RoleRepository.#instance;
		}
		RoleRepository.#instance = this;
		super('USER_ROLES');
	}

	/** @returns {RoleRepository} */
	static getInstance() {
		if (!this.#instance) {
			new RoleRepository();
		}
		return this.#instance;
	}

	/** @returns {Role|null} */
	findByCode(code) {
		const roles = this.findAll();
		return roles.find((r) => r.code === code) || null;
	}

	/** @returns {Role|null} */
	findById(id) {
		const roleData = super.findRawByID(id);
		return roleData ? Role.fromJSON(roleData) : null;
	}

	/** @returns {Role[]} */
	findAll() {
		const rolesData = super.findAllRaw();
		return rolesData.map((roleData) => Role.fromJSON(roleData));
	}

	/** @returns {boolean} */
	codeExists(code) {
		return this.findByCode(code) !== null;
	}

	/** @returns {boolean} */
	exists(id) {
		return this.findById(id) !== null;
	}
}

export default RoleRepository;
