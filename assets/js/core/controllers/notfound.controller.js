import Logger from '../../utils/logger.js';

class NotFoundController {
  static #instance = null;

  constructor() {
    if (NotFoundController.#instance) {
      return NotFoundController.#instance;
    }
    NotFoundController.#instance = this;
  }

  init() {
    const appBody = document.getElementById('app-body');
    if (!appBody) return Logger.error('NotFoundController: #app-body not found');

    appBody.innerHTML = `
      <div class="notfound-wrapper">
        <div class="container text-center py-5">
          <div class="notfound-code display-1 fw-bold">404</div>
          <h1 class="h2 mb-4">Page Not Found</h1>
          <p class="text-muted mb-5">Sorry, the page you're looking for doesn't exist or has been moved.</p>
          <div class="d-flex justify-content-center gap-3">
            <a href="/pages" class="btn btn-primary d-flex align-items-center gap-2">
              <i data-lucide="home" style="width: 1rem;"></i> Back to Home
            </a>
            <a href="/pages/recipes" class="btn btn-outline-secondary d-flex align-items-center gap-2">
              <i data-lucide="utensils" style="width: 1rem;"></i> View Recipes
            </a>
          </div>
        </div>
      </div>
    `;
    Logger.info('NotFoundController initialized');
  }
}

export default NotFoundController;
