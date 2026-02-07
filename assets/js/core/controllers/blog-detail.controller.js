import Logger from '../../utils/logger.js';
import BlogService from '../services/blog.service.js';
import UserRepository from '../repositories/user.repository.js';
import { BlogCard } from '../../ui/components/blog-card.js';
import { marked } from '../../libs/marked/marked.esm.js';

class BlogDetailController {
  static #instance = null;

  constructor() {
    if (BlogDetailController.#instance) {
      return BlogDetailController.#instance;
    }
    BlogDetailController.#instance = this;

    this.blogService = BlogService.getInstance();
    this.userRepository = UserRepository.getInstance();
    this.blog = null;
  }

  init() {
    Logger.info('BlogDetailController initialized');
    const blogId = this.#getBlogIdFromUrl();

    if (!blogId) {
      this.#showError('No blog ID found in URL');
      return;
    }

    this.blog = this.blogService.getById(blogId);

    if (!this.blog) {
      this.#showError('Blog post not found');
      return;
    }

    this.#render();
  }

  #getBlogIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  #render() {
    this.#renderHero();
    this.#renderContent();
    this.#renderTags();
    this.#renderRelatedBlogs();

    if (window.lucide) window.lucide.createIcons();
  }

  #renderHero() {
    document.title = `${this.blog.title} - Recipe4f`;
    document.getElementById('blog-title').textContent = this.blog.title;
    document.getElementById('blog-excerpt').textContent = this.blog.excerpt;

    const imgEl = document.getElementById('blog-image');
    if (imgEl) {
      imgEl.src = this.blog.image;
      imgEl.alt = this.blog.title;
    }

    const author = this.userRepository.findById(this.blog.authorId);
    const authorName = author ? author.fullName : 'Author';
    const authorAvatar = author
      ? author.avatar
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';

    const publishDate = new Date(this.blog.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const readTime = this.#estimateReadingTime();
    const readTimeEl = document.getElementById('blog-read-time');
    if (readTimeEl) {
      readTimeEl.innerHTML = `
            <i data-lucide="clock" width="14"></i>
            <span>${readTime} min read</span>
        `;
    }

    const authorWrapper = document.getElementById('blog-author');
    if (authorWrapper) {
      authorWrapper.innerHTML = `
        <img src="${authorAvatar}" class="rounded-circle" width="40" height="40" alt="${authorName}" style="object-fit: cover;">
        <div class="d-flex flex-column" style="line-height:1.2;">
          <span class="small text-muted text-uppercase" style="font-size:0.7rem;">Written by</span>
          <span class="fw-bold text-dark">${authorName}</span>
        </div>
      `;
    }

    const metaDataEl = document.getElementById('blog-meta-data');
    if (metaDataEl) {
      metaDataEl.innerHTML = `
        <div class="d-flex align-items-center gap-2" title="Published Date">
          <i data-lucide="calendar" width="18"></i>
          <span>${publishDate}</span>
        </div>
      `;
    }
  }

  #estimateReadingTime() {
    const wordsPerMinute = 200;
    const words = this.blog.content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  #renderContent() {
    const container = document.getElementById('blog-content');
    if (!container || !this.blog.content) return;

    container.innerHTML = marked.parse(this.blog.content);
  }

  #renderTags() {
    const tagsEl = document.getElementById('blog-tags');
    if (tagsEl) {
      const tagsHtml = this.blog.tags
        .map(
          (tag) => `
        <span class="badge bg-light text-dark border p-2 fw-normal">${tag}</span>
      `,
        )
        .join('');
      tagsEl.innerHTML = tagsHtml;
    }
  }

  #renderRelatedBlogs() {
    const container = document.getElementById('related-blogs');
    if (!container) return;

    const allBlogs = this.blogService.getAll();
    const relatedBlogs = allBlogs
      .filter((b) => b.id !== this.blog.id && this.#hasCommonTag(b))
      .slice(0, 3);

    if (relatedBlogs.length === 0) {
      container.innerHTML =
        '<div class="col-12 text-center text-muted">No related posts found.</div>';
      return;
    }

    const blogCardsHtml = relatedBlogs
      .map((blog) => {
        const card = new BlogCard(blog);
        return `<div class="col">${card.render()}</div>`;
      })
      .join('');

    container.innerHTML = blogCardsHtml;

    if (window.lucide) window.lucide.createIcons();
  }

  #hasCommonTag(otherBlog) {
    return this.blog.tags.some((tag) =>
      otherBlog.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }

  #showError(message) {
    const appBody = document.getElementById('app-body');
    if (appBody) {
      appBody.innerHTML = `
        <div class="container py-5">
          <div class="text-center">
            <h1 class="display-4">Oops!</h1>
            <p class="lead">${message}</p>
            <a href="/pages/blogs.html" class="btn btn-primary mt-3">Back to Blogs</a>
          </div>
        </div>
      `;
    }
  }
}

export default BlogDetailController;
