import Validator from '../utils/validator.js';
import Entity from './entity.js';

/**
 * @typedef {Object} NutritionInfo
 * @property {number|null} calories - Calories in kcal
 * @property {number|null} protein - Protein in grams
 * @property {number|null} fat - Fat in grams
 * @property {number|null} carbs - Carbohydrates in grams
 * @property {number|null} cholesterol - Cholesterol in mg
 */

/**
 * @typedef {Object} IngredientInfo
 * @property {string} name - Name of the ingredient
 * @property {string} quantity - Quantity of the ingredient
 * @property {string} [notes] - Optional notes
 */

/**
 * @typedef {Object} IngredientSection
 * @property {string} section - Section name
 * @property {IngredientInfo[]} items - Ingredients in section
 */

class Recipe extends Entity {
	/** @type {string} Recipe code */
	#code;

	/** @type {string} Recipe name */
	#name;

	/** @type {string} Recipe description */
	#description;

	/** @type {string} Recipe image URL */
	#image;

	/** @type {number} Prep time in minutes */
	#prepTime;

	/** @type {number} Cook time in minutes */
	#cookTime;

	/** @type {string} Category ID */
	#categoryId;

	/** @type {string} Author user ID */
	#authorId;

	/** @type {NutritionInfo} Nutrition info */
	#nutrition = {
		calories: null,
		protein: null,
		fat: null,
		carbs: null,
		cholesterol: null,
	};

	/** @type {IngredientSection[]} Ingredient sections */
	#ingredients = [];

	/** @type {string} Cooking directions */
	#directions;

	constructor(id, code, name, description, image, prepTime, cookTime, categoryId, authorId, nutrition, ingredients, directions) {
		super(id);
		this.code = code;
		this.name = name;
		this.description = description;
		this.image = image;
		this.prepTime = prepTime;
		this.cookTime = cookTime;
		this.categoryId = categoryId;
		this.authorId = authorId;
		this.nutrition = nutrition;
		this.ingredients = ingredients;
		this.directions = directions;
	}

	get code() {
		return this.#code;
	}

	set code(code) {
		const [err, isValid] = Validator.recipeCode.valid(code);
		if (!isValid) throw new Error(`Recipe code: ${err}`);
		this.#code = code;
	}

	get name() {
		return this.#name;
	}

	set name(name) {
		const validation = Validator.string.valid(name, 3, 100);
		if (!validation.isValid) throw new Error(`Recipe name: ${validation.errors.length}`);
		this.#name = name.trim();
	}

	get description() {
		return this.#description;
	}

	set description(description) {
		const validation = Validator.string.valid(description, 10, 500);
		if (!validation.isValid) throw new Error(`Recipe description: ${validation.errors.length}`);
		this.#description = description.trim();
	}

	get image() {
		return this.#image;
	}

	set image(image) {
		const validation = Validator.imageUrl.valid(image);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Recipe image: ${errors}`);
		}
		this.#image = image;
	}

	get prepTime() {
		return this.#prepTime;
	}

	set prepTime(prepTime) {
		const [err, isValid] = Validator.positiveInteger.valid(prepTime);
		if (!isValid) throw new Error(`Prep time: ${err}`);
		this.#prepTime = prepTime;
	}

	get cookTime() {
		return this.#cookTime;
	}

	set cookTime(cookTime) {
		const [err, isValid] = Validator.positiveInteger.valid(cookTime);
		if (!isValid) throw new Error(`Cook time: ${err}`);
		this.#cookTime = cookTime;
	}

	get categoryId() {
		return this.#categoryId;
	}

	set categoryId(categoryId) {
		const validation = Validator.id.valid(categoryId);
		if (!validation[1]) throw new Error(`Category ID: ${validation[0]}`);
		this.#categoryId = categoryId.trim();
	}

	get authorId() {
		return this.#authorId;
	}

	set authorId(authorId) {
		const [err, isValid] = Validator.id.valid(authorId);
		if (!isValid) throw new Error(`Author ID: ${err}`);
		this.#authorId = authorId.trim();
	}

	get nutrition() {
		return structuredClone(this.#nutrition);
	}

	set nutrition(nutrition) {
		if (typeof nutrition !== 'object' || nutrition === null) {
			throw new Error('Nutrition must be an object');
		}
		this.#nutrition = { ...this.#nutrition, ...nutrition };
	}

	get ingredients() {
		return structuredClone(this.#ingredients);
	}

	set ingredients(ingredients) {
		if (!Array.isArray(ingredients)) throw new Error('Ingredients must be an array');
		this.#ingredients = ingredients;
	}

	get directions() {
		return this.#directions;
	}

	set directions(directions) {
		const validation = Validator.string.valid(directions, 10);
		if (!validation.isValid) throw new Error(`Directions: ${validation.errors.length}`);
		this.#directions = directions.trim();
	}

	getTotalTime() {
		return this.#prepTime + this.#cookTime;
	}

	toJSON() {
		return {
			id: this.id,
			code: this.#code,
			name: this.#name,
			description: this.#description,
			image: this.#image,
			prepTime: this.#prepTime,
			cookTime: this.#cookTime,
			totalTime: this.getTotalTime(),
			categoryId: this.#categoryId,
			authorId: this.#authorId,
			nutrition: structuredClone(this.#nutrition),
			ingredients: structuredClone(this.#ingredients),
			directions: this.#directions,
		};
	}

	static fromJSON(data) {
		return new Recipe(
			data.id,
			data.code,
			data.name,
			data.description,
			data.image,
			data.prepTime,
			data.cookTime,
			data.categoryId,
			data.authorId,
			data.nutrition || {},
			data.ingredients || [],
			data.directions,
		);
	}
}

export default Recipe;
