/**
 * @typedef {Object} BlogFilterCriteria
 * @property {string[]|null} tags
 * @property {string[]|null} authorIds
 * @property {string|null} text
 * @property {number} skip
 * @property {number} limit
 */

// ENTITY

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

// REPOSITORY

class BlogPostRepository extends BaseRepository {
  static #instance = null;

  constructor() {
    if (BlogPostRepository.#instance) {
      return BlogPostRepository.#instance;
    }
    super('BLOG_POSTS');
    BlogPostRepository.#instance = this;
  }

  /** @returns {BlogPostRepository} */
  static getInstance() {
    if (!this.#instance) {
      new BlogPostRepository();
    }
    return this.#instance;
  }

  /** @returns {BlogPost|null} */
  findById(id) {
    const postData = super.findRawByID(id);
    return postData ? BlogPost.fromJSON(postData) : null;
  }

  /** @returns {BlogPost[]} */
  findAll() {
    const postsData = super.findAllRaw();
    return postsData.map((postData) => BlogPost.fromJSON(postData));
  }

  /** @returns {BlogPost[]} */
  findByAuthor(authorId) {
    const posts = this.findAll();
    return posts.filter((p) => p.authorId === authorId);
  }

  /** @returns {BlogPost[]} */
  findByTag(tag) {
    const posts = this.findAll();
    const normalizedTag = tag.toLowerCase();
    return posts.filter((p) => p.tags.some((t) => t.toLowerCase() === normalizedTag));
  }

  /** @returns {BlogPost[]} */
  findByAuthorAndTag(authorId, tag) {
    return this.findByAuthor(authorId).filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }

  /** @returns {BlogPost[]} */
  findByTitle(searchTerm) {
    const posts = this.findAll();
    const term = searchTerm.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(term));
  }

  /** @returns {BlogPost[]} */
  findByExcerpt(searchTerm) {
    const posts = this.findAll();
    const term = searchTerm.toLowerCase();
    return posts.filter((p) => p.excerpt.toLowerCase().includes(term));
  }

  /** @returns {BlogPost[]} */
  findByDateRange(startDate, endDate) {
    const posts = this.findAll();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return posts.filter((p) => {
      const postDate = new Date(p.publishedAt);
      return postDate >= start && postDate <= end;
    });
  }

  /** @returns {BlogPost[]} */
  findLatest(limit = 10) {
    const posts = this.findAll();
    return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, limit);
  }

  /** @returns {BlogPost[]} */
  findOldest(limit = 10) {
    const posts = this.findAll();
    return posts.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)).slice(0, limit);
  }

  /** @returns {BlogPost[]} */
  findAllSorted() {
    const posts = this.findAll();
    return posts.sort((a, b) => a.title.localeCompare(b.title));
  }

  /** @returns {number} */
  countByAuthor(authorId) {
    return this.findByAuthor(authorId).length;
  }

  /** @returns {string[]} */
  findAllTags() {
    const posts = this.findAll();
    const tagsSet = new Set();
    posts.forEach((p) => {
      p.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }

  /** @returns {number} */
  countByTag(tag) {
    return this.findByTag(tag).length;
  }
}

// SERVICE

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
      results = results.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) || blog.excerpt.toLowerCase().includes(term),
      );
    }

    if (finalCriteria.tags && finalCriteria.tags.length > 0) {
      results = results.filter((blog) =>
        finalCriteria.tags.some((tag) =>
          blog.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
        ),
      );
    }

    if (finalCriteria.authorIds && finalCriteria.authorIds.length > 0) {
      results = results.filter((blog) => finalCriteria.authorIds.includes(blog.authorId));
    }

    const sorted = results.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const total = sorted.length;
    const items = sorted.slice(finalCriteria.skip, finalCriteria.skip + finalCriteria.limit);

    return { items, total };
  }
}
