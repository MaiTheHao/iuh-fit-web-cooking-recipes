import UserRepository from '../../core/repositories/user.repository.js';
import { ROUTES } from '../../core/router/const.js';
import InfoCard from './info-card.js';

export class BlogCard {
  constructor(blog) {
    this.blog = blog;
  }

  render() {
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
      href: ROUTES.BLOG_DETAIL.redirectPath(this.blog.id),
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
    }).render();
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
