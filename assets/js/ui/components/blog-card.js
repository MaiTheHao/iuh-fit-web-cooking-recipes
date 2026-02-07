import UserRepository from '../../core/repositories/user.repository.js';
import { ROUTES } from '../../core/router/const.js';
import InfoCard from './info-card.js';

export class BlogCard {
  constructor(blog) {
    this.blog = blog;
  }

  #createAuthorHtml(avatarUrl, name) {
    const fallbackAvatar =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    const avatar = avatarUrl || fallbackAvatar;

    return `
      <div class="d-flex align-items-center gap-2">
        <img
          src="${avatar}"
          alt="${name}"
          class="rounded-circle info-card__author-img"
          onerror="this.onerror=null; this.src='${fallbackAvatar}';"
        />
        <span class="text-muted small">${name}</span>
      </div>
    `;
  }

  #createBadgeHtml(icon, text, customClass = '') {
    return `
      <div class="badge bg-accent bg-white shadow-sm ${customClass}" style="display: flex; align-items: center; gap: 0.5ch; font-size: 0.75rem; padding: 0.5em 1em;">
        <i data-lucide="${icon}" style="width: 1rem; height: 1rem;"></i>
        <span>${text}</span>
      </div>
    `;
  }

  render() {
    const author = UserRepository.getInstance().findById(this.blog.authorId);
    const authorName = author ? author.fullName : 'Unknown Author';
    const authorAvatar = author?.avatar;

    const publishDate = new Date(this.blog.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const badgeHtml = this.#createBadgeHtml('calendar', publishDate, 'blog-card__date');
    const footerHtml = this.#createAuthorHtml(authorAvatar, authorName);

    const card = new InfoCard({
      image: this.blog.image,
      title: this.blog.title,
      description: this.blog.excerpt,
      href: ROUTES.BLOG_DETAIL.redirectPath(this.blog.id),
      badgeHtml,
      footerHtml,
      imageAlt: this.blog.title,
      cardClass: 'blog-card',
    });

    return card.render();
  }
}

export class BlogList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(blogs) {
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
        return `<div class="col">${card.render()}</div>`;
      })
      .join('');
  }
}
