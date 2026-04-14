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

/**
 * @typedef {Object} RecipeFilterCriteria
 * @property {{min: number, max: number}|null} stars
 * @property {{min: number, max: number}|null} totalTime
 * @property {string[]|null} categories
 * @property {string[]|null} authorIds
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

// ENTITY

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

  constructor({
    id,
    code,
    name,
    description,
    image,
    prepTime,
    cookTime,
    categoryId,
    authorId,
    nutrition,
    ingredients,
    directions,
    stars,
  }) {
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

  get totalTime() {
    return this.getTotalTime();
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

// REPOSITORY

class RecipeRepository extends BaseRepository {
  static #instance = null;

  constructor() {
    if (RecipeRepository.#instance) {
      return RecipeRepository.#instance;
    }
    super('RECIPES');
    RecipeRepository.#instance = this;
  }

  /** @returns {RecipeRepository} */
  static getInstance() {
    if (!this.#instance) {
      new RecipeRepository();
    }
    return this.#instance;
  }

  /** @returns {Recipe|null} */
  findByCode(code) {
    const recipes = this.findAll();
    return recipes.find((r) => r.code === code) || null;
  }

  /** @returns {Recipe|null} */
  findById(id) {
    const recipeData = super.findRawByID(id);
    return recipeData ? Recipe.fromJSON(recipeData) : null;
  }

  /** @returns {Recipe[]} */
  findAll() {
    const recipesData = super.findAllRaw();
    return recipesData.map((recipeData) => Recipe.fromJSON(recipeData));
  }

  /** @returns {Recipe[]} */
  findByCategory(categoryId) {
    const recipes = this.findAll();
    return recipes.filter((r) => r.categoryId === categoryId);
  }

  /** @returns {Recipe[]} */
  findByAuthor(authorId) {
    const recipes = this.findAll();
    return recipes.filter((r) => r.authorId === authorId);
  }

  /** @returns {Recipe[]} */
  findQuickRecipes(minutes) {
    const recipes = this.findAll();
    return recipes.filter((r) => r.prepTime <= minutes);
  }

  /** @returns {Recipe[]} */
  findByTotalTime(minutes) {
    const recipes = this.findAll();
    return recipes.filter((r) => r.prepTime + r.cookTime <= minutes);
  }

  /** @returns {Recipe[]} */
  findByName(searchTerm) {
    const recipes = this.findAll();
    const term = searchTerm.toLowerCase();
    return recipes.filter((r) => r.name.toLowerCase().includes(term));
  }

  /** @returns {Recipe[]} */
  findByDescription(searchTerm) {
    const recipes = this.findAll();
    const term = searchTerm.toLowerCase();
    return recipes.filter((r) => r.description.toLowerCase().includes(term));
  }

  /** @returns {number} */
  countByCategory(categoryId) {
    return this.findByCategory(categoryId).length;
  }

  /** @returns {number} */
  countByAuthor(authorId) {
    return this.findByAuthor(authorId).length;
  }

  /**
   * @param {RecipeFilterCriteria} criteria
   * @returns {Recipe[]}
   */
  findWithCriteria(criteria = {}) {
    let recipes = this.findAll();

    if (criteria.stars && typeof criteria.stars === 'object') {
      const min = typeof criteria.stars.min === 'number' ? criteria.stars.min : 0;
      const max = typeof criteria.stars.max === 'number' ? criteria.stars.max : 5;
      recipes = recipes.filter((r) => r.stars >= min && r.stars <= max);
    }

    if (criteria.totalTime && typeof criteria.totalTime === 'object') {
      const min = typeof criteria.totalTime.min === 'number' ? criteria.totalTime.min : 0;
      const max =
        typeof criteria.totalTime.max === 'number'
          ? criteria.totalTime.max
          : Number.MAX_SAFE_INTEGER;
      recipes = recipes.filter((r) => r.totalTime >= min && r.totalTime <= max);
    }

    if (Array.isArray(criteria.categories) && criteria.categories.length > 0) {
      recipes = recipes.filter((r) => criteria.categories.includes(r.categoryId));
    }

    if (Array.isArray(criteria.authorIds) && criteria.authorIds.length > 0) {
      recipes = recipes.filter((r) => criteria.authorIds.includes(r.authorId));
    }

    if (criteria.text && typeof criteria.text === 'string') {
      const searchText = criteria.text.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(searchText)) ||
          (r.description && r.description.toLowerCase().includes(searchText)),
      );
    }

    const total = recipes.length;
    const skip = Number(criteria.skip) || 0;
    const limit = Number(criteria.limit) || 6;

    return {
      items: recipes.slice(skip, skip + limit),
      total,
    };
  }
}

// SERVICE

class RecipeService {
  static #instance = null;

  constructor() {
    if (RecipeService.#instance) {
      return RecipeService.#instance;
    }
    this.recipeRepository = RecipeRepository.getInstance();
    RecipeService.#instance = this;
  }

  /** @returns {RecipeService} */
  static getInstance() {
    if (!this.#instance) {
      new RecipeService();
    }
    return this.#instance;
  }

  /** @returns {Recipe[]} */
  getList(limit = 6) {
    return this.recipeRepository.findAll().slice(0, limit);
  }

  /** @returns {Recipe[]} */
  getHighestRated(limit = 6) {
    const allRecipes = this.recipeRepository.findAll();
    const sortedByRating = allRecipes.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    return sortedByRating.slice(0, limit);
  }

  /** @returns {Recipe[]} */
  getAll() {
    return this.recipeRepository.findAll();
  }

  /** @returns {Recipe|null} */
  getByCode(code) {
    return this.recipeRepository.findByCode(code);
  }

  /**
   * @param {RecipeFilterCriteria} criteria
   * @returns {{items: Recipe[], total: number}}
   */
  getWithCriteria(criteria = {}) {
    const finalCriteria = {
      stars: criteria.stars || null,
      totalTime: criteria.totalTime || null,
      categories: criteria.categories || null,
      authorIds: criteria.authorIds || null,
      text: criteria.text || null,
      skip: Number(criteria.skip) || 0,
      limit: Number(criteria.limit) || 6,
    };

    return this.recipeRepository.findWithCriteria(finalCriteria);
  }

  /**
   * Get favorite recipes by IDs
   * @param {string[]} ids
   * @returns {Recipe[]}
   */
  getFavorites(ids = []) {
    return this.recipeRepository.findAll().filter((r) => ids.includes(r.id));
  }
}
