import Logger from '../../utils/logger.js';
import RecipeService from '../services/recipe.service.js';
import CategoryService from '../services/category.service.js';
import UserRepository from '../repositories/user.repository.js';
import { RecipeCard, RecipeList } from '../../ui/components/recipe-card.js';
import { marked } from '../../libs/marked/marked.esm.js';

class RecipeDetailController {
  static #instance = null;

  constructor() {
    if (RecipeDetailController.#instance) {
      return RecipeDetailController.#instance;
    }
    RecipeDetailController.#instance = this;

    this.recipeService = RecipeService.getInstance();
    this.categoryService = CategoryService.getInstance();
    this.userRepository = UserRepository.getInstance();
    this.recipe = null;
  }

  init() {
    Logger.info('RecipeDetailController initialized');
    const recipeCode = this.#getRecipeCodeFromUrl();

    if (!recipeCode) {
      this.#showError('No recipe code found in URL');
      return;
    }

    this.recipe = this.recipeService.getByCode(recipeCode);

    if (!this.recipe) {
      this.#showError('Recipe not found');
      return;
    }

    this.#render();
  }

  #getRecipeCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  #render() {
    this.#renderHero();
    this.#renderIngredients();
    this.#renderDirections();
    this.#renderNutrition();
    this.#renderRelatedRecipes();

    if (window.lucide) window.lucide.createIcons();

    this.#bindEvents();
  }

  #renderHero() {
    document.title = `${this.recipe.name} - Recipe4f`;
    document.getElementById('recipe-title').textContent = this.recipe.name;
    document.getElementById('recipe-description').textContent = this.recipe.description;

    const imgEl = document.getElementById('recipe-image');
    if (imgEl) {
      imgEl.src = this.recipe.image;
      imgEl.alt = this.recipe.name;
    }

    const catEl = document.getElementById('recipe-category');
    const category = this.categoryService.getById(this.recipe.categoryId);
    if (catEl) catEl.textContent = category ? category.name : 'Web Recipe';

    this.#renderStars(this.recipe.stars);

    const author = this.userRepository.findById(this.recipe.authorId);
    const authorName = author ? author.fullName : 'Chef';
    const authorAvatar = author ? author.avatar : '../assets/img/default-avatar.jpg';

    const authorWrapper = document.getElementById('recipe-author');
    if (authorWrapper) {
      authorWrapper.innerHTML = `
            <img src="${authorAvatar}" class="rounded-circle" width="40" height="40" alt="${authorName}" style="object-fit: cover;">
            <div class="d-flex flex-column" style="line-height:1.2;">
                <span class="small text-muted text-uppercase" style="font-size:0.7rem;">Created by</span>
                <span class="fw-bold text-dark">${authorName}</span>
            </div>
        `;
    }

    const metaDataEl = document.getElementById('recipe-meta-data');
    if (metaDataEl) {
      metaDataEl.innerHTML = `
            <div class="d-flex align-items-center gap-2" title="Preparation Time">
                <i data-lucide="clock" width="18"></i>
                <span>${this.recipe.prepTime} min</span>
            </div>
            <div class="d-flex align-items-center gap-2" title="Cooking Time">
                <i data-lucide="flame" width="18"></i>
                <span>${this.recipe.cookTime} min</span>
            </div>
        `;
    }
  }

  #renderIngredients() {
    const container = document.getElementById('recipe-ingredients');
    if (!container || !this.recipe.ingredients) return;

    let html = '';

    let idx = 0;

    this.recipe.ingredients.forEach((group) => {
      if (group.section) {
        html += `<h5 class="ingredient-group-title">${group.section}</h5>`;
      }

      group.items.forEach((item) => {
        idx++;
        const id = `ing-${idx}`;
        html += `
                <label class="ingredient-label" for="${id}">
                    <input type="checkbox" id="${id}" class="ingredient-checkbox">
                    <span class="ingredient-text">
                        <strong class="text-dark">${item.quantity}</strong> 
                        <span class="text-secondary">${item.name}</span>
                    </span>
                </label>
            `;
      });
    });

    container.innerHTML = html;
  }

  #renderDirections() {
    const container = document.getElementById('recipe-directions');
    if (!container || !this.recipe.directions) return;

    const rawDirections = this.recipe.directions;

    if (!rawDirections.includes('###')) {
      container.innerHTML = marked.parse(rawDirections);
      return;
    }

    const chunks = rawDirections
      .split('###')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    let html = '';

    chunks.forEach((chunk, index) => {
      const lines = chunk.split('\n');
      const title = lines.shift().trim();
      const bodyMarkdown = lines.join('\n').trim();

      const bodyContent = marked.parse(bodyMarkdown);

      html += `
            <div class="step-card">
                <div class="step-header">
                    <div class="step-number">${index + 1}</div>
                    <h3 class="step-title">${title}</h3>
                </div>
                <div class="step-content">
                    ${bodyContent}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
  }

  #renderNutrition() {
    const container = document.getElementById('recipe-nutrition');
    if (!container || !this.recipe.nutrition) return;

    const { calories, protein, fat, carbs } = this.recipe.nutrition;
    const items = [
      { label: 'Calories', val: calories, unit: 'kcal', icon: 'flame' },
      { label: 'Protein', val: protein, unit: 'g', icon: 'drumstick' },
      { label: 'Fat', val: fat, unit: 'g', icon: 'droplet' },
      { label: 'Carbs', val: carbs, unit: 'g', icon: 'wheat' },
    ];

    container.innerHTML = items
      .map(
        (i) => `
        <div class="nutrition-item">
            <div class="d-flex align-items-center">
                <i data-lucide="${i.icon}" class="nutrition-icon" width="18" height="18"></i>
                <span class="nutrition-label">${i.label}</span>
            </div>
            <span class="nutrition-value">${i.val}<small>${i.unit}</small></span>
        </div>
    `,
      )
      .join('');
  }

  #renderRelatedRecipes() {
    const container = document.getElementById('related-recipes');
    if (!container) return;
    const related = this.recipeService
      .getAll()
      .filter((r) => r.categoryId === this.recipe.categoryId && r.id !== this.recipe.id)
      .slice(0, 3);

    if (related.length > 0) {
      new RecipeList('related-recipes').render(related);
    } else {
      container.innerHTML =
        '<p class="text-center text-muted col-12">No related recipes found.</p>';
    }
  }

  #renderStars(count = 0) {
    const el = document.getElementById('recipe-stars');
    if (!el) return;
    let html = '';
    for (let i = 0; i < 5; i++) {
      const fill = i < count ? 'fill-current' : 'text-muted opacity-25';
      html += `<i data-lucide="star" class="${fill}" width="16" height="16"></i>`;
    }
    html += `<span class="text-muted ms-1">(${count}/5)</span>`;
    el.innerHTML = html;
  }

  #bindEvents() {
    const checkboxes = document.querySelectorAll('.ingredient-checkbox');
    checkboxes.forEach((cb) => {
      cb.addEventListener('change', (e) => {
        const label = e.target.closest('.ingredient-label');
        if (e.target.checked) {
          label.classList.add('checked');
        } else {
          label.classList.remove('checked');
        }
      });
    });
  }

  #showError(msg) {
    const appBody = document.getElementById('app-body');
    if (appBody) {
      appBody.innerHTML = `
            <div class="container text-center py-5" style="min-height: 60vh; display: grid; place-content: center;">
                <h2 class="text-muted">${msg}</h2>
                <a href="/pages/recipes" class="btn btn-primary mt-3">Back to Recipes</a>
            </div>
        `;
    }
  }
}

export default RecipeDetailController;
