import RecipeService from '../services/recipe.service.js';
import CategoryService from '../services/category.service.js';
import { RecipeList } from '../../ui/components/recipe-card.js';
import Logger from '../../utils/logger.js';

class RecipeController {
  static #instance = null;

  constructor() {
    if (RecipeController.#instance) {
      return RecipeController.#instance;
    }
    RecipeController.#instance = this;

    this.recipeService = RecipeService.getInstance();
    this.categoryService = CategoryService.getInstance();
    this.recipeListRaw = new RecipeList('recipe-list');

    this.state = {
      criteria: {
        text: '',
        categories: [],
        stars: null,
        cookTime: null,
        limit: 9,
        skip: 0,
      },
      currentPage: 1,
      sortBy: 'name_asc',
    };
  }

  init() {
    Logger.info('RecipeController initialized');
    this.#renderFilters();
    this.#loadFromUrlParams();
    this.#attachEventListeners();
    this.#fetchRecipes();
  }

  #loadFromUrlParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('q')) {
      this.state.criteria.text = params.get('q');
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = this.state.criteria.text;
    }

    if (params.has('category')) {
      const catCode = params.get('category');
      const category = this.categoryService.getByCode(catCode);
      if (category) {
        this.state.criteria.categories = [category.id];
      }
    }

    if (params.has('page')) {
      const page = parseInt(params.get('page')) || 1;
      this.state.currentPage = page;
      this.state.criteria.skip = (page - 1) * this.state.criteria.limit;
    }

    if (params.has('sort')) {
      this.state.sortBy = params.get('sort');
      const sortSelect = document.getElementById('sortSelect');
      if (sortSelect) sortSelect.value = this.state.sortBy;
    }
  }

  #renderFilters() {
    const desktopContainer = document.getElementById('desktopFilterContainer');
    if (!desktopContainer) return;

    const categories = this.categoryService.getAll();

    const html = `
    <div class="filter-group">
      <h5 class="filter-title">Categories</h5>
      <div class="d-flex flex-column gap-2">
        ${categories
          .map(
            (cat) => `
          <div class="form-check">
            <input class="form-check-input filter-category" type="checkbox" value="${cat.id}" id="cat-${cat.id}" 
              ${this.state.criteria.categories?.includes(cat.id) ? 'checked' : ''}>
            <label class="form-check-label" for="cat-${cat.id}">
              ${cat.name}
            </label>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="filter-group">
      <h5 class="filter-title">Cooking Time</h5>
      <div class="d-flex flex-column gap-2">
        <div class="form-check">
          <input class="form-check-input filter-time" type="radio" name="cookTime" value="under_30" id="time-1">
          <label class="form-check-label" for="time-1">Under 30 min</label>
        </div>
        <div class="form-check">
          <input class="form-check-input filter-time" type="radio" name="cookTime" value="30_60" id="time-2">
          <label class="form-check-label" for="time-2">30 - 60 min</label>
        </div>
        <div class="form-check">
          <input class="form-check-input filter-time" type="radio" name="cookTime" value="over_60" id="time-3">
          <label class="form-check-label" for="time-3">Over 60 min</label>
        </div>
        <div class="form-check">
          <input class="form-check-input filter-time" type="radio" name="cookTime" value="all" id="time-all" checked>
          <label class="form-check-label" for="time-all">Any time</label>
        </div>
      </div>
    </div>

    <div class="filter-group">
      <h5 class="filter-title mb-3">Minimum Rating</h5>
      <div class="d-flex align-items-center gap-2 mb-2">
        <span class="text-muted small">0</span>
        <input 
          type="range" 
          class="form-range filter-rating-range" 
          min="0" 
          max="5" 
          step="1" 
          value="${this.state.criteria.stars?.min || 0}" 
          id="ratingRange"
        >
        <span class="text-muted small">5</span>
      </div>
      <div class="d-flex align-items-center justify-content-center gap-1" id="ratingDisplay">
        ${this.#renderStars(this.state.criteria.stars?.min || 0)}
        <span class="small text-muted ms-1">${this.state.criteria.stars?.min || 0}+ stars</span>
      </div>
    </div>
  `;

    desktopContainer.innerHTML = html;
    const mobileContainer = document.getElementById('mobileFilterContainer');
    if (mobileContainer) {
      mobileContainer.innerHTML = html
        .replace(/id="([^"]+)"/g, 'id="mobile-$1"')
        .replace(/for="([^"]+)"/g, 'for="mobile-$1"')
        .replace(/name="([^"]+)"/g, 'name="mobile-$1"');
    }
    this.#attachRangeSliderListeners();
  }

  #renderStars(count) {
    let stars = '';
    for (let i = 0; i < count; i++) {
      stars += `<i data-lucide="star" class="fill-current text-warning" style="width:14px; height:14px;"></i>`;
    }
    return `<div class="d-flex align-items-center">${stars}</div>`;
  }

  #attachEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.state.criteria.text = e.target.value.trim();
          this.state.currentPage = 1;
          this.state.criteria.skip = 0;
          this.#fetchRecipes();
        }, 500);
      });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.state.currentPage = 1;
        this.state.criteria.skip = 0;
        this.#fetchRecipes();
      });
    }

    const handleFilterChange = (e) => {
      this.#updateCriteriaFromUI();
      this.state.currentPage = 1;
      this.state.criteria.skip = 0;
      this.#fetchRecipes();
    };

    ['desktopFilterContainer', 'mobileFilterContainer'].forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.addEventListener('change', handleFilterChange);
      }
    });
  }

  #attachRangeSliderListeners() {
    ['ratingRange', 'mobile-ratingRange'].forEach((id) => {
      const slider = document.getElementById(id);
      if (!slider) return;

      slider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        const displayId = id.replace('ratingRange', 'ratingDisplay');
        const display = document.getElementById(displayId);

        if (display) {
          display.innerHTML = `
          ${this.#renderStars(value)}
          <span class="small text-muted ms-1">${value}+ stars</span>
        `;
        }

        this.state.criteria.stars = value > 0 ? { min: value, max: 5 } : null;
        this.state.currentPage = 1;
        this.state.criteria.skip = 0;

        clearTimeout(this._rangeDebounce);
        this._rangeDebounce = setTimeout(() => {
          this.#fetchRecipes();
        }, 300);
      });
    });
  }

  #updateCriteriaFromUI() {
    const checkedCats = Array.from(document.querySelectorAll('.filter-category:checked')).map(
      (cb) => cb.value,
    );
    this.state.criteria.categories = [...new Set(checkedCats)];

    const timeVal = document.querySelector('input[name="cookTime"]:checked')?.value;
    if (timeVal === 'under_30') this.state.criteria.cookTime = { min: 0, max: 30 };
    else if (timeVal === '30_60') this.state.criteria.cookTime = { min: 30, max: 60 };
    else if (timeVal === 'over_60') this.state.criteria.cookTime = { min: 60, max: 9999 };
    else this.state.criteria.cookTime = null;
  }

  #fetchRecipes() {
    const result = this.recipeService.getWithCriteria(this.state.criteria);

    const sortedItems = this.#sortRecipes(result.items, this.state.sortBy);

    this.#renderRecipeList(sortedItems);
    this.#renderPagination(result.total);
    this.#updateUrl();
  }

  #sortRecipes(recipes, sortBy) {
    const [field, order] = sortBy.split('_');

    return [...recipes].sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      if (field === 'name') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (order === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });
  }

  #renderRecipeList(recipes) {
    this.recipeListRaw.render(recipes);
  }

  #renderPagination(total) {
    const container = document.getElementById('pagination');
    const topContainer = document.getElementById('recipe-list-container');
    if (!container) return;

    const totalPages = Math.ceil(total / this.state.criteria.limit);
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = '';
    const current = this.state.currentPage;

    html += `
			<li class="page-item ${current === 1 ? 'disabled' : ''}">
				<a class="page-link" href="#" data-page="${current - 1}" aria-label="Previous">
					<i data-lucide="chevron-left" style="width:16px;"></i>
				</a>
			</li>
		`;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - 1 && i <= current + 1)) {
        html += `
					<li class="page-item ${current === i ? 'active' : ''}">
						<a class="page-link" href="#" data-page="${i}">${i}</a>
					</li>
				`;
      } else if (i === current - 2 || i === current + 2) {
        html += `<li class="page-item disabled"><span class="page-link border-0">...</span></li>`;
      }
    }

    html += `
			<li class="page-item ${current === totalPages ? 'disabled' : ''}">
				<a class="page-link" href="#" data-page="${current + 1}" aria-label="Next">
					<i data-lucide="chevron-right" style="width:16px;"></i>
				</a>
			</li>
		`;

    container.innerHTML = html;

    container.querySelectorAll('.page-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(e.currentTarget.dataset.page);
        if (page && page !== current && page > 0 && page <= totalPages) {
          this.state.currentPage = page;
          this.state.criteria.skip = (page - 1) * this.state.criteria.limit;
          this.#fetchRecipes();
          window.scrollTo({ top: topContainer.offsetTop, behavior: 'smooth' });
        }
      });
    });
  }

  #updateUrl() {
    const url = new URL(window.location);

    if (this.state.criteria.text) url.searchParams.set('q', this.state.criteria.text);
    else url.searchParams.delete('q');

    if (this.state.sortBy !== 'name_asc') url.searchParams.set('sort', this.state.sortBy);
    else url.searchParams.delete('sort');

    if (this.state.currentPage > 1) url.searchParams.set('page', this.state.currentPage);
    else url.searchParams.delete('page');

    window.history.replaceState({}, '', url);
  }
}

export default RecipeController;
