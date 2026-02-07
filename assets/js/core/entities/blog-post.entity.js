import Validator from '../../utils/validator.js';
import Entity from './entity.js';

/**
 * @typedef {Object} BlogPostData
 * @property {string} title - Blog post title
 * @property {string} excerpt - Short excerpt for listing
 * @property {string} content - Full content (supports HTML/Markdown)
 * @property {string} image - Cover image URL
 * @property {string} authorId - Author user ID
 * @property {string} publishedAt - ISO date string
 * @property {string[]} tags - Array of tags
 */

class BlogPost extends Entity {
  /** @type {string} Post title */
  #title;

  /** @type {string} Excerpt for listing page */
  #excerpt;

  /** @type {string} Full content (Markdown) */
  #content;

  /** @type {string} Cover image URL */
  #image;

  /** @type {string} Author user ID */
  #authorId;

  /** @type {string} Published date*/
  #publishedAt;

  /** @type {string[]} Tags array */
  #tags = [];

  constructor({
    id,
    title,
    excerpt,
    content,
    image,
    authorId,
    publishedAt = new Date().toISOString(),
    tags = [],
  }) {
    super(id);
    this.title = title;
    this.excerpt = excerpt;
    this.content = content;
    this.image = image;
    this.authorId = authorId;
    this.publishedAt = publishedAt;
    this.tags = tags;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    const validation = Validator.string.valid(title, 10, 150);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog title: ${errors}`);
    }
    this.#title = title.trim();
  }

  get excerpt() {
    return this.#excerpt;
  }

  set excerpt(excerpt) {
    const validation = Validator.string.valid(excerpt, 50, 300);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog excerpt: ${errors}`);
    }
    this.#excerpt = excerpt.trim();
  }

  get content() {
    return this.#content;
  }

  set content(content) {
    const validation = Validator.string.valid(content, 100);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog content: ${errors}`);
    }
    this.#content = content;
  }

  get image() {
    return this.#image;
  }

  set image(image) {
    const validation = Validator.imageUrl.valid(image);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog image: ${errors}`);
    }
    this.#image = image;
  }

  get authorId() {
    return this.#authorId;
  }

  set authorId(authorId) {
    const validation = Validator.id.valid(authorId);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog author ID: ${errors}`);
    }
    this.#authorId = authorId.trim();
  }

  get publishedAt() {
    return this.#publishedAt;
  }

  set publishedAt(publishedAt) {
    const validation = Validator.dateString.valid(publishedAt);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog publishedAt: ${errors}`);
    }
    this.#publishedAt = publishedAt;
  }

  get tags() {
    return structuredClone(this.#tags);
  }

  set tags(tags) {
    const validation = Validator.tags.valid(tags);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Blog tags: ${errors}`);
    }
    this.#tags = tags;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.#title,
      excerpt: this.#excerpt,
      content: this.#content,
      image: this.#image,
      authorId: this.#authorId,
      publishedAt: this.#publishedAt,
      tags: structuredClone(this.#tags),
    };
  }

  static fromJSON(data) {
    return new BlogPost({
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      authorId: data.authorId,
      publishedAt: data.publishedAt,
      tags: data.tags || [],
    });
  }
}

export default BlogPost;
