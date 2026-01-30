import Logger from '../../utils/logger.js';

class BaseRepository {
	#collectionName;
	#prefix = 'RECIPE4F_';

	constructor(collectionName) {
		if (!collectionName) throw new Error('Collection name is required');
		this.#collectionName = collectionName;
	}

	get #storageKey() {
		return this.#prefix + this.#collectionName;
	}

	/** @returns {object[]} */
	findAllRaw() {
		try {
			const data = localStorage.getItem(this.#storageKey);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			Logger.error(`Error reading from ${this.#collectionName}`, error);
			return [];
		}
	}

	/** @returns {object|null} */
	findRawByID(id) {
		const items = this.findAllRaw();
		return items.find((item) => item.id === id) || null;
	}

	/** @returns {boolean} */
	save(entity) {
		try {
			const items = this.findAllRaw();
			const plainData = entity.toJSON();

			const index = items.findIndex((item) => item.id === entity.id);
			if (index > -1) {
				items[index] = plainData;
			} else {
				items.push(plainData);
			}

			localStorage.setItem(this.#storageKey, JSON.stringify(items));
			Logger.success(`Saved to ${this.#collectionName}`);
			return true;
		} catch (error) {
			Logger.error(`Error saving to ${this.#collectionName}`, error);
			return false;
		}
	}

	/** @returns {boolean} */
	delete(id) {
		const items = this.findAllRaw();
		const newItems = items.filter((item) => item.id !== id);

		if (items.length === newItems.length) {
			Logger.warning(`Item with id ${id} not found in ${this.#collectionName}`);
			return false;
		}

		localStorage.setItem(this.#storageKey, JSON.stringify(newItems));
		Logger.success(`Deleted from ${this.#collectionName}`);
		return true;
	}
}

export default BaseRepository;
