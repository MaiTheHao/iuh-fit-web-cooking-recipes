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
				<h5 class="filter-title">Rating</h5>
				<div class="d-flex flex-column gap-2">
					${[5, 4, 3]
            .map(
              (stars) => `
						<div class="form-check">
							<input class="form-check-input filter-rating" type="radio" name="rating" value="${stars}" id="rate-${stars}">
							<label class="form-check-label d-flex align-items-center gap-1" for="rate-${stars}">
								${this.#renderStars(stars)} <span class="small text-muted">& up</span>
							</label>
						</div>
					`,
            )
            .join('')}
					<div class="form-check">
						<input class="form-check-input filter-rating" type="radio" name="rating" value="all" id="rate-all" checked>
						<label class="form-check-label" for="rate-all">Any rating</label>
					</div>
				</div>
			</div>
		`;

    desktopContainer.innerHTML = html;
    const mobileContainer = document.getElementById('mobileFilterContainer');
    if (mobileContainer) {
      mobileContainer.innerHTML = html
        .replace(/id="([^"]+)"/g, 'id="mobile-$1"')
        .replace(/for="([^"]+)"/g, 'for="mobile-$1"');
    }
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

    const rateVal = document.querySelector('input[name="rating"]:checked')?.value;
    if (rateVal && rateVal !== 'all') {
      this.state.criteria.stars = { min: parseInt(rateVal), max: 5 };
    } else {
      this.state.criteria.stars = null;
    }
  }

  #fetchRecipes() {
    const result = this.recipeService.getWithCriteria(this.state.criteria);
    this.#renderRecipeList(result.items);
    this.#renderPagination(result.total);
    this.#updateUrl();
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

    if (this.state.currentPage > 1) url.searchParams.set('page', this.state.currentPage);
    else url.searchParams.delete('page');

    window.history.replaceState({}, '', url);
  }
}

export default RecipeController;
