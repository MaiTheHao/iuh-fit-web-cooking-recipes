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
    Logger.info('NotFoundController initialized');
    this.#renderNotFound();
  }

  #renderNotFound() {
    const appBody = document.getElementById('app-body');
    if (!appBody) {
      Logger.error('NotFoundController: #app-body element not found');
      return;
    }

    appBody.innerHTML = this.#getNotFoundHTML();
  }

  #getNotFoundHTML() {
    return `
      <div class="notfound-wrapper">
        <div class="container">
          <div class="notfound-content">
            <div class="notfound-code">404</div>
            <h1 class="notfound-title">Page Not Found</h1>
            <p class="notfound-description">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <div class="notfound-actions">
              <a href="/pages" class="btn btn-primary notfound-btn">
                <i data-lucide="home" style="width: 1em; height: 1em;"></i>
                <span>Back to Home</span>
              </a>
              <a href="/pages/recipes" class="btn btn-secondary notfound-btn">
                <i data-lucide="utensils" style="width: 1em; height: 1em;"></i>
                <span>View Recipes</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default NotFoundController;
