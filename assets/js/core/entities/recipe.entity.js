import Validator from '../../utils/validator.js';
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

	/** @type {number} Star rating */
	#stars;

	/** @type {IngredientSection[]} Ingredient sections */
	#ingredients = [];

	/** @type {string} Cooking directions */
	#directions;

	constructor({ id, code, name, description, image, prepTime, cookTime, categoryId, authorId, nutrition, ingredients, directions, stars }) {
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
		this.stars = stars;
	}

	get code() {
		return this.#code;
	}

	set code(code) {
		const validation = Validator.recipeCode.valid(code);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Recipe code: ${errors}`);
		}
		this.#code = code;
		return this;
	}

	get name() {
		return this.#name;
	}

	set name(name) {
		const validation = Validator.string.valid(name, 3, 100);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Recipe name: ${errors}`);
		}
		this.#name = name.trim();
		return this;
	}

	get description() {
		return this.#description;
	}

	set description(description) {
		const validation = Validator.string.valid(description, 10, 500);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Recipe description: ${errors}`);
		}
		this.#description = description.trim();
		return this;
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
		return this;
	}

	get prepTime() {
		return this.#prepTime;
	}

	set prepTime(prepTime) {
		const validation = Validator.positiveInteger.valid(prepTime);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Prep time: ${errors}`);
		}
		this.#prepTime = prepTime;
		return this;
	}

	get cookTime() {
		return this.#cookTime;
	}

	set cookTime(cookTime) {
		const validation = Validator.positiveInteger.valid(cookTime);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Cook time: ${errors}`);
		}
		this.#cookTime = cookTime;
		return this;
	}

	get categoryId() {
		return this.#categoryId;
	}

	set categoryId(categoryId) {
		const validation = Validator.id.valid(categoryId);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Category ID: ${errors}`);
		}
		this.#categoryId = categoryId.trim();
		return this;
	}

	get authorId() {
		return this.#authorId;
	}

	set authorId(authorId) {
		const validation = Validator.id.valid(authorId);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Author ID: ${errors}`);
		}
		this.#authorId = authorId.trim();
		return this;
	}

	get nutrition() {
		return structuredClone(this.#nutrition);
	}

	/**
	 * @param {NutritionInfo} nutrition
	 * @returns {Recipe}
	 */
	set nutrition(nutrition) {
		const validation = Validator.recipeNutrition.valid(nutrition);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Nutrition: ${errors}`);
		}
		this.#nutrition = { ...this.#nutrition, ...nutrition };
		return this;
	}

	get ingredients() {
		return structuredClone(this.#ingredients);
	}

	set ingredients(ingredients) {
		if (!Array.isArray(ingredients)) throw new Error('Ingredients must be an array');
		this.#ingredients = ingredients;
		return this;
	}

	get directions() {
		return this.#directions;
	}

	set directions(directions) {
		const validation = Validator.string.valid(directions, 10);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Directions: ${errors}`);
		}
		this.#directions = directions.trim();
		return this;
	}

	get stars() {
		return this.#stars;
	}

	set stars(stars) {
		const validation = Validator.ratingStars.valid(stars);
		if (!validation.isValid) {
			const errors = Object.values(validation.errors).filter(Boolean).join(', ');
			throw new Error(`Stars: ${errors}`);
		}
		this.#stars = stars;
		return this;
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
			stars: this.#stars,
		};
	}

	static fromJSON(data) {
		return new Recipe({
			id: data.id,
			code: data.code,
			name: data.name,
			description: data.description,
			image: data.image,
			prepTime: data.prepTime,
			cookTime: data.cookTime,
			categoryId: data.categoryId,
			authorId: data.authorId,
			nutrition: data.nutrition || {},
			ingredients: data.ingredients || [],
			directions: data.directions,
			stars: data.stars || 0,
		});
	}
}

export default Recipe;
