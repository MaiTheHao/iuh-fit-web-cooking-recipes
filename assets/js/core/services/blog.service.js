import BlogPostRepository from '../repositories/blog-post.repository.js';

/**
 * @typedef {Object} BlogFilterCriteria
 * @property {string[]|null} tags
 * @property {string[]|null} authorIds
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

class BlogService {
  static #instance = null;

  constructor() {
    if (BlogService.#instance) {
      return BlogService.#instance;
    }
    this.blogRepository = BlogPostRepository.getInstance();
    BlogService.#instance = this;
  }

  /** @returns {BlogService} */
  static getInstance() {
    if (!this.#instance) {
      new BlogService();
    }
    return this.#instance;
  }

  /** @returns {BlogPost[]} */
  getList(limit = 6) {
    return this.blogRepository.findLatest(limit);
  }

  /** @returns {BlogPost[]} */
  getAll() {
    return this.blogRepository.findAll();
  }

  /** @returns {BlogPost|null} */
  getById(id) {
    return this.blogRepository.findById(id);
  }

  /** @returns {BlogPost[]} */
  getByTag(tag) {
    return this.blogRepository.findByTag(tag);
  }

  /** @returns {BlogPost[]} */
  getByAuthor(authorId) {
    return this.blogRepository.findByAuthor(authorId);
  }

  /** @returns {string[]} */
  getAllTags() {
    return this.blogRepository.findAllTags();
  }

  /**
   * @param {BlogFilterCriteria} criteria
   * @returns {{items: BlogPost[], total: number}}
   */
  getWithCriteria(criteria = {}) {
    const finalCriteria = {
      tags: criteria.tags || null,
      authorIds: criteria.authorIds || null,
      text: criteria.text || null,
      skip: Number(criteria.skip) || 0,
      limit: Number(criteria.limit) || 9,
    };

    let results = this.blogRepository.findAll();

    if (finalCriteria.text) {
      const term = finalCriteria.text.toLowerCase();
      results = results.filter((blog) =>
        blog.title.toLowerCase().includes(term) || blog.excerpt.toLowerCase().includes(term)
      );
    }

    if (finalCriteria.tags && finalCriteria.tags.length > 0) {
      results = results.filter((blog) =>
        finalCriteria.tags.some((tag) =>
          blog.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    if (finalCriteria.authorIds && finalCriteria.authorIds.length > 0) {
      results = results.filter((blog) => finalCriteria.authorIds.includes(blog.authorId));
    }

    const sorted = results.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    const total = sorted.length;
    const items = sorted.slice(finalCriteria.skip, finalCriteria.skip + finalCriteria.limit);

    return { items, total };
  }
}

export default BlogService;
