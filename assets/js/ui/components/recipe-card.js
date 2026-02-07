import UserRepository from '../../core/repositories/user.repository.js';
import { ROUTES } from '../../core/router/const.js';
import InfoCard from './info-card.js';

export class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  #createAuthorHtml(avatarUrl, name) {
    const fallbackAvatar =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    const avatar = avatarUrl || fallbackAvatar;

    return `
      <div class="d-flex align-items-center gap-2">
        <img
          src="${avatar}"
          alt="${name}"
          class="rounded-circle info-card__author-img"
          onerror="this.onerror=null; this.src='${fallbackAvatar}';"
        />
        <span class="text-muted small">${name}</span>
      </div>
    `;
  }

  #createStarsHtml(rating = 0) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const color = i <= rating ? 'var(--color-accent)' : 'var(--color-bg-alt)';
      starsHtml += `<i data-lucide="star" class="fill-current" style="width: 1rem; color: ${color}"></i>`;
    }
    return `<div class="d-flex text-warning small">${starsHtml}</div>`;
  }

  #createBadgeHtml(icon, text, customClass = '') {
    return `
      <div class="badge bg-accent bg-white shadow-sm ${customClass}" style="display: flex; align-items: center; gap: 0.5ch; font-size: 0.75rem; padding: 0.5em 1em;">
        <i data-lucide="${icon}" style="width: 1rem; height: 1rem;"></i>
        <span>${text}</span>
      </div>
    `;
  }

  render() {
    const author = UserRepository.getInstance().findById(this.recipe.authorId);
    const authorName = author ? author.fullName : 'Unknown Author';
    const authorAvatar = author?.avatar;

    const badgeHtml = this.#createBadgeHtml(
      'clock',
      `${this.recipe.cookTime} min`,
      'recipe-card__time',
    );

    const footerHtml = `
      <div class="d-flex justify-content-between align-items-center">
        ${this.#createAuthorHtml(authorAvatar, authorName)}
        ${this.#createStarsHtml(this.recipe.stars || 0)}
      </div>
    `;

    const card = new InfoCard({
      image: this.recipe.image,
      title: this.recipe.name,
      description: this.recipe.description,
      href: ROUTES.RECIPES_DETAIL.redirectPath(this.recipe.code),
      badgeHtml,
      footerHtml,
      imageAlt: this.recipe.name,
      cardClass: 'recipe-card',
    });

    return card.render();
  }
}

export class RecipeList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(recipes) {
    if (!this.container) return;

    if (recipes.length === 0) {
      this.container.innerHTML = `
				<div class="col-12 text-center py-5">
					<div class="mb-3">
						<i data-lucide="utensils-crossed" class="text-muted" style="width: 48px; height: 48px;"></i>
					</div>
					<h3 class="h5 text-muted">No recipes found</h3>
					<p class="text-muted small">Try adjusting your filters or search criteria.</p>
				</div>
			`;
      return;
    }

    this.container.innerHTML = recipes
      .map((recipe) => {
        const card = new RecipeCard(recipe);
        return `<div class="col">${card.render()}</div>`;
      })
      .join('');
  }
}
