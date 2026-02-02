import BaseRepository from './repository.js';
import BlogPost from '../entities/blog-post.entity.js';

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
		return this.findByAuthor(authorId).filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
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

export default BlogPostRepository;
