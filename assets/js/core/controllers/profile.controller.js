import AuthService from '../services/auth.service.js';
import UserService from '../services/user.service.js';
import RecipeService from '../services/recipe.service.js';
import Notification from '../../ui/components/notification.js';
import InfoCard from '../../ui/components/info-card.js';
import Logger from '../../utils/logger.js';
import { ROUTES } from '../router/const.js';

class ProfileController {
  constructor() {
    this.authService = AuthService.getInstance();
    this.userService = UserService.getInstance();
    this.recipeService = RecipeService.getInstance();

    this.notification = new Notification();
    this.form = document.getElementById('profile-form');
    this.deleteBtn = document.getElementById('btn-confirm-delete');

    this.favoriteListContainer = document.getElementById('favorite-list');
    this.favoriteCountBadge = document.getElementById('favorite-count');
  }

  init() {
    if (!this.checkAuth()) return;
    this.loadUserData();
    this.loadFavorites();
    this.bindEvents();
    Logger.info('ProfileController initialized');
  }

  checkAuth() {
    if (!this.authService.isAuthenticated()) {
      window.location.href = './login.html';
      return false;
    }
    return true;
  }

  loadUserData() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const fields = {
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
    };

    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.value = value || '';
    });

    this.updateAvatarPreview(user.avatar);
  }

  updateAvatarPreview(src) {
    const img = document.getElementById('avatar-preview');
    const fallbackUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    if (img && src) {
      img.onerror = () => {
        if (img.src !== fallbackUrl) {
          img.src = fallbackUrl;
        }
      };
      img.src = src;
    }
  }

  loadFavorites() {
    if (!this.favoriteListContainer) return;

    const user = this.authService.getCurrentUser();
    if (!user || !user.favoriteRecipes) {
      this.renderEmptyState();
      return;
    }

    const favoriteIds = user.favoriteRecipes;
    const favorites = this.recipeService.getFavorites(favoriteIds);

    if (this.favoriteCountBadge) {
      this.favoriteCountBadge.textContent = `${favorites.length} items`;
    }

    if (favorites.length === 0) {
      this.renderEmptyState();
      return;
    }

    this.renderFavoriteList(favorites);
  }

  renderFavoriteList(favorites) {
    this.favoriteListContainer.innerHTML = favorites
      .map((recipe) => {
        const card = new InfoCard({
          image: recipe.image,
          title: recipe.name,
          description: recipe.description.substring(0, 80) + '...',
          href: `recipe-detail.html?id=${recipe.code}`,
          imageAlt: recipe.name,
          footerHtml: `
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-warning d-flex align-items-center gap-1">
                <i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i>
                ${recipe.stars}
              </span>
              <button class="unfavorite-btn" data-id="${recipe.id}">
                <i data-lucide="heart-off" style="width: 14px; height: 14px;"></i> Unfavorite
              </button>
            </div>
          `,
        });
        return `<div class="col-md-6 col-lg-4">${card.render()}</div>`;
      })
      .join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderEmptyState() {
    if (this.favoriteCountBadge) {
      this.favoriteCountBadge.textContent = '0 items';
    }
    this.favoriteListContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="text-muted">
          <i data-lucide="heart" class="mb-2" style="width: 48px; height: 48px; opacity: 0.2;"></i>
          <p>You haven't saved any recipes yet.</p>
          <a href="recipes.html" class="btn btn-outline-primary btn-sm mt-2">Explore Now</a>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  bindEvents() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleUpdate);
      const avatarInput = document.getElementById('avatar');
      if (avatarInput) {
        avatarInput.addEventListener('input', (e) => {
          this.updateAvatarPreview(e.target.value);
        });
      }
    }

    if (this.deleteBtn) {
      this.deleteBtn.addEventListener('click', this.handleDelete);
    }

    if (this.favoriteListContainer) {
      this.favoriteListContainer.addEventListener('click', (e) => {
        const unfavoriteBtn = e.target.closest('.unfavorite-btn');
        if (unfavoriteBtn) {
          e.preventDefault();
          e.stopPropagation();
          const recipeId = unfavoriteBtn.dataset.id;
          this.handleRemoveFavorite(recipeId);
        }
      });
    }
  }

  handleRemoveFavorite = (recipeId) => {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const result = this.userService.toggleFavorite(user.id, recipeId);

    if (result.success) {
      this.notification.success('Success', 'Removed from favorites');
      this.loadFavorites();
    } else {
      this.notification.error('Error', result.message);
    }
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const formData = new FormData(this.form);
    const updateData = {
      fullName: formData.get('fullName'),
      avatar: formData.get('avatar'),
      password: formData.get('password'),
    };

    const result = this.userService.updateProfile(user.id, updateData);

    if (result.success) {
      this.notification.success('Success', result.message);
      setTimeout(() => window.location.reload(), 1500);
    } else {
      this.notification.error('Error', result.message);
    }
  };

  handleDelete = () => {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const result = this.userService.deleteAccount(user.id);

    if (result.success) {
      window.location.href = ROUTES.HOME.redirectPath;
    } else {
      const modalEl = document.getElementById('confirm-delete-modal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      this.notification.error('Error', result.message);
    }
  };
}

export default ProfileController;
