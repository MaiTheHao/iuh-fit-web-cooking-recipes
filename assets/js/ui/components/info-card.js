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

  render() {
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

export default InfoCard;
