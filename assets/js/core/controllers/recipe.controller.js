class RecipeController {
	static #instance = null;

	constructor() {
		if (RecipeController.#instance) {
			return RecipeController.#instance;
		}
		RecipeController.#instance = this;
	}

	init() {}
}

export default RecipeController;
