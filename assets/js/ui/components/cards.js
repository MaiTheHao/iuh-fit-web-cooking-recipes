class InfoCard {
  /** @type {string} Image URL */
  #image;

  /** @type {string} Card title */
  #title;

  /** @type {string} Card description/excerpt */
  #description;

  /** @type {string} Link URL */
  #href;

  /** @type {string} Custom badge HTML */
  #badgeHtml = '';

  /** @type {string} Custom footer HTML */
  #footerHtml = '';

  /** @type {string} Image alt text */
  #imageAlt;

  /** @type {string} Fallback image URL */
  #fallbackImage;

  /** @type {string} Custom card class */
  #cardClass;

  constructor({
    image,
    title,
    description,
    href,
    badgeHtml = '',
    footerHtml = '',
    imageAlt = '',
    fallbackImage = '',
    cardClass = '',
  }) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.href = href;
    this.badgeHtml = badgeHtml;
    this.footerHtml = footerHtml;
    this.imageAlt = imageAlt || title;
    this.fallbackImage =
      fallbackImage ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    this.cardClass = cardClass || 'info-card';
  }

  get image() {
    return this.#image;
  }

  set image(image) {
    if (!image || typeof image !== 'string') {
      throw new Error('InfoCard image: must be a valid string');
    }
    this.#image = image.trim();
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (!title || typeof title !== 'string') {
      throw new Error('InfoCard title: must be a valid string');
    }
    this.#title = title.trim();
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    if (!description || typeof description !== 'string') {
      throw new Error('InfoCard description: must be a valid string');
    }
    this.#description = description.trim();
  }

  get href() {
    return this.#href;
  }

  set href(href) {
    if (!href || typeof href !== 'string') {
      throw new Error('InfoCard href: must be a valid string');
    }
    this.#href = href.trim();
  }

  get badgeHtml() {
    return this.#badgeHtml;
  }

  set badgeHtml(badgeHtml) {
    this.#badgeHtml = badgeHtml || '';
  }

  get footerHtml() {
    return this.#footerHtml;
  }

  set footerHtml(footerHtml) {
    this.#footerHtml = footerHtml || '';
  }

  get imageAlt() {
    return this.#imageAlt;
  }

  set imageAlt(imageAlt) {
    this.#imageAlt = imageAlt || this.#title || 'Image';
  }

  get fallbackImage() {
    return this.#fallbackImage;
  }

  set fallbackImage(fallbackImage) {
    this.#fallbackImage =
      fallbackImage || 'https://via.placeholder.com/400x300?text=Image+Not+Found';
  }

  get cardClass() {
    return this.#cardClass;
  }

  set cardClass(cardClass) {
    this.#cardClass = cardClass || 'info-card';
  }

  #generateImageId() {
    return `img-${Math.random().toString(36).substr(2, 9)}`;
  }

  toHTML() {
    const uniqueId = this.#generateImageId();

    return `
      <a href="${this.#href}" class="d-block h-100 text-decoration-none">
        <div class="card h-100 border-0 shadow-sm info-card ${this.#cardClass === 'info-card' ? '' : this.#cardClass}">
          <div class="position-relative">
            <img
              id="${uniqueId}"
              src="${this.#image}"
              class="card-img-top"
              alt="${this.#imageAlt}"
              onerror="this.onerror=null; this.src='${this.#fallbackImage}';"
            />
            ${this.#badgeHtml ? `<div class="position-absolute top-0 end-0 m-3">${this.#badgeHtml}</div>` : ''}
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-2 fw-bold text-dark info-card__title ${this.#cardClass === 'info-card' ? '' : this.#cardClass + '__title'}">${this.#title}</h5>
            <p class="card-text text-muted mb-3 grow info-card__desc ${this.#cardClass === 'info-card' ? '' : this.#cardClass + '__desc'}">
              ${this.#description}
            </p>
            ${this.#footerHtml ? `<div class="mt-auto">${this.#footerHtml}</div>` : ''}
          </div>
        </div>
      </a>
    `;
  }
}

class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  toHTML() {
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
      href: `recipe-detail.html?code=${this.recipe.code}`,
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
    }).toHTML();
  }
}

class RecipeList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  toHTML(recipes) {
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
        return `<div class="col">${card.toHTML()}</div>`;
      })
      .join('');
  }
}

class BlogCard {
  constructor(blog) {
    this.blog = blog;
  }

  toHTML() {
    const author = UserRepository.getInstance().findById(this.blog.authorId);
    const authorName = author ? author.fullName : 'Unknown Author';
    const fallbackAvatar =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    const authorAvatar = author?.avatar || fallbackAvatar;

    const publishDate = new Date(this.blog.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return new InfoCard({
      image: this.blog.image,
      title: this.blog.title,
      description: this.blog.excerpt,
      href: `blog-detail.html?id=${this.blog.id}`,
      imageAlt: this.blog.title,
      cardClass: 'blog-card',
      badgeHtml: `
        <div class="badge bg-accent bg-white shadow-sm blog-card__date" style="display: flex; align-items: center; gap: 0.5ch; font-size: 0.75rem; padding: 0.5em 1em;">
          <i data-lucide="calendar" style="width: 1rem; height: 1rem;"></i>
          <span>${publishDate}</span>
        </div>
      `,
      footerHtml: `
        <div class="d-flex align-items-center gap-2">
          <img
            src="${authorAvatar}"
            alt="${authorName}"
            class="rounded-circle info-card__author-img"
            onerror="this.onerror=null; this.src='${fallbackAvatar}';"
          />
          <span class="text-muted small">${authorName}</span>
        </div>
      `,
    }).toHTML();
  }
}

class BlogList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  toHTML(blogs) {
    if (!this.container) return;

    if (blogs.length === 0) {
      this.container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="mb-3">
            <i data-lucide="book-open" class="text-muted" style="width: 48px; height: 48px;"></i>
          </div>
          <h3 class="h5 text-muted">No blog posts found</h3>
          <p class="text-muted small">Try adjusting your filters or search criteria.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = blogs
      .map((blog) => {
        const card = new BlogCard(blog);
        return `<div class="col">${card.toHTML()}</div>`;
      })
      .join('');
  }
}

class FavoriteCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  toHTML() {
    return new InfoCard({
      image: this.recipe.image,
      title: this.recipe.name,
      description: this.recipe.description.substring(0, 80) + '...',
      href: `recipe-detail.html?code=${this.recipe.code}`,
      imageAlt: this.recipe.name,
      cardClass: 'favorite-card',
      footerHtml: `
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-warning d-flex align-items-center gap-1">
            <i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i>
            ${this.recipe.stars}
          </span>
          <button class="unfavorite-btn btn btn-sm btn-link text-danger px-2 py-1" data-id="${this.recipe.id}">
            <i data-lucide="heart-off" style="width: 14px; height: 14px;"></i> 
            Unfavorite
          </button>
        </div>
      `,
    }).toHTML();
  }
}
