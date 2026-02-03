import UserRepository from '../../core/repositories/user.repository.js';
import { ROUTES } from '../../core/router/const.js';

export class RecipeCard {
	constructor(recipe) {
		this.recipe = recipe;
	}

	render() {
		const author = UserRepository.getInstance().findById(this.recipe.authorId);
		const authorName = author ? author.fullName : 'Unknown Author';
		const authorAvatar = author
			? author.avatar
			: 'https://static.vecteezy.com/system/resources/previews/025/738/217/original/anime-black-and-white-isolated-icon-illustration-vector.jpg';

		return `
                <a href="${ROUTES.RECIPES_DETAIL.redirectPath(this.recipe.code)}" class="d-block h-100 text-decoration-none">
                    <div class="card h-100 border-0 shadow-sm recipe-card">
                        <div class="position-relative">
                            <img
                                src="${this.recipe.image}"
                                class="card-img-top"
                                alt="${this.recipe.name}"
                            />
                            <div class="badge bg-accent position-absolute top-0 end-0 m-3 bg-white recipe-card__time">
                                <i data-lucide="clock"></i> <span>${this.recipe.cookTime} min</span>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-2 fw-bold text-dark recipe-card__title">${this.recipe.name}</h5>
                            <p class="card-text text-muted mb-3 grow recipe-card__desc">
                                ${this.recipe.description}
                            </p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <div class="d-flex align-items-center gap-2">
                                    <img
                                        src="${authorAvatar}"
                                        alt="${authorName}"
                                        class="rounded-circle recipe-card__author-img"
                                    />
                                    <span class="text-muted small">${authorName}</span>
                                </div>
                                <div class="d-flex text-warning small">
                                    ${this.#renderStars(this.recipe.stars || 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
	}

	#renderStars(rating) {
		let starsHtml = '';
		for (let i = 1; i <= 5; i++) {
			const color = i <= rating ? 'var(--color-accent)' : 'var(--color-bg-alt)';
			starsHtml += `<i data-lucide="star" class="fill-current" style="width: 1rem; color: ${color}"></i>`;
		}
		return starsHtml;
	}
}

export class RecipeList {
	constructor(containerId) {
		this.container = document.getElementById(containerId);
	}

	render(recipes) {
		if (!this.container) return;

		if (recipes.length === 0) {
			this.container.innerHTML = '<div class="col-12 text-center"><p>No recipes found.</p></div>';
			return;
		}

		this.container.innerHTML = recipes
			.map((recipe) => {
				const card = new RecipeCard(recipe);
				return `<div class="col">${card.render()}</div>`;
			})
			.join('');

		if (window.lucide) {
			window.lucide.createIcons();
		}
	}
}
