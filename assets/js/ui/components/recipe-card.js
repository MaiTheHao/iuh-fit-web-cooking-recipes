import UserRepository from '../../core/repositories/user.repository.js';
import AuthService from '../../core/services/auth.service.js';
import { ROUTES } from '../../core/router/const.js';
import InfoCard from './info-card.js';

export class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  render() {
    const author = UserRepository.getInstance().findById(this.recipe.authorId);
    const authorName = author ? author.fullName : 'Unknown Author';
    const fallbackAvatar =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    const authorAvatar = author?.avatar || fallbackAvatar;

    const currentUser = AuthService.getInstance().getCurrentUser();
    const isFavorite = currentUser?.favoriteRecipes?.includes(this.recipe.id);

    return new InfoCard({
      image: this.recipe.image,
      title: this.recipe.name,
      description: this.recipe.description,
      href: ROUTES.RECIPES_DETAIL.redirectPath(this.recipe.code),
      imageAlt: this.recipe.name,
      cardClass: 'recipe-card',
      badgeHtml: `
        <div class="d-flex align-items-center gap-2 position-absolute top-0 end-0 z-10">
          <div class="badge bg-accent bg-white shadow-sm recipe-card__time" style="display: flex; align-items: center; gap: 0.5ch; font-size: 0.75rem; padding: 0.5em 1em;">
            <i data-lucide="clock" style="width: 1rem; height: 1rem;"></i>
            <span>${this.recipe.cookTime} min</span>
          </div>
        <button class="btn btn-white favorite-btn"
          data-id="${this.recipe.id}" 
          style="width: 32px; height: 32px; display: grid; place-content: center; border-radius: 50%; outline: none;  border: none">
          <i data-lucide="heart" 
            style="width: 1.2rem; height: 1.2rem; fill: ${isFavorite ? 'red' : 'white'}; color: ${isFavorite ? 'red' : 'white'};">
          </i>
        </button>
        </div>
      `,
      footerHtml: `
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <img
              src="${authorAvatar}"
              alt="${authorName}"
              class="rounded-circle info-card__author-img"
              onerror="this.onerror=null; this.src='${fallbackAvatar}';"
            />
            <span class="text-muted small">${authorName}</span>
          </div>
          <div class="d-flex text-warning small">
            ${Array.from({ length: 5 }, (_, i) => i + 1)
              .map(
                (i) => `
              <i data-lucide="star" class="fill-current" style="width: 1rem; color: ${
                i <= (this.recipe.stars || 0) ? 'var(--color-accent)' : 'var(--color-bg-alt)'
              }"></i>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
    }).render();
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
