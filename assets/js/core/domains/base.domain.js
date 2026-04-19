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

class BaseRepository {
  #collectionName;
  #prefix = '';

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
      console.error(`Error reading from ${this.#collectionName}`, error);
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
      if (!entity || !(entity instanceof Entity)) {
        console.error(`Invalid entity provided to save in ${this.#collectionName}`);
        return false;
      }
      const items = this.findAllRaw();
      const plainData = entity.toJSON();

      const index = items.findIndex((item) => item.id === entity.id);
      if (index > -1) {
        items[index] = plainData;
      } else {
        items.push(plainData);
      }

      localStorage.setItem(this.#storageKey, JSON.stringify(items));
      console.log(`Saved to ${this.#collectionName}`);
      return true;
    } catch (error) {
      console.error(`Error saving to ${this.#collectionName}`, error);
      return false;
    }
  }

  /** @return { {total: number, success: number, failed: number, percent: number} } */
  saveBatch(entities) {
    if (!Array.isArray(entities)) throw new Error('Entities must be an array');
    let total = entities.length;
    let successCount = 0;

    entities.forEach((entity) => {
      if (this.save(entity)) successCount++;
    });

    return {
      total: total,
      success: successCount,
      failed: total - successCount,
      percent: total === 0 ? 0 : Math.round((successCount / total) * 100),
    };
  }

  /** @returns {boolean} */
  delete(id) {
    const items = this.findAllRaw();
    const newItems = items.filter((item) => item.id !== id);

    if (items.length === newItems.length) {
      console.warn(`Item with id ${id} not found in ${this.#collectionName}`);
      return false;
    }

    localStorage.setItem(this.#storageKey, JSON.stringify(newItems));
    console.log(`Deleted from ${this.#collectionName}`);
    return true;
  }
}
