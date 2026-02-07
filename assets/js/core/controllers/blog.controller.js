import BlogService from '../services/blog.service.js';
import UserRepository from '../repositories/user.repository.js';
import { BlogList } from '../../ui/components/blog-card.js';
import Logger from '../../utils/logger.js';

class BlogController {
  static #instance = null;

  constructor() {
    if (BlogController.#instance) {
      return BlogController.#instance;
    }
    BlogController.#instance = this;

    this.blogService = BlogService.getInstance();
    this.userRepository = UserRepository.getInstance();
    this.blogListRaw = new BlogList('blog-list');

    this.state = {
      criteria: {
        text: '',
        tags: [],
        skip: 0,
        limit: 9,
      },
      currentPage: 1,
      sortBy: 'newest',
    };
  }

  init() {
    Logger.info('BlogController initialized');
    this.#renderFilters();
    this.#loadFromUrlParams();
    this.#attachEventListeners();
    this.#fetchBlogs();
  }

  #loadFromUrlParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('q')) {
      this.state.criteria.text = params.get('q');
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = this.state.criteria.text;
    }

    if (params.has('tag')) {
      const tag = params.get('tag');
      this.state.criteria.tags = [tag];
    }

    if (params.has('page')) {
      const page = parseInt(params.get('page')) || 1;
      this.state.currentPage = page;
      this.state.criteria.skip = (page - 1) * this.state.criteria.limit;
    }

    if (params.has('sort')) {
      this.state.sortBy = params.get('sort');
      const sortSelect = document.getElementById('sortSelect');
      if (sortSelect) sortSelect.value = this.state.sortBy;
    }
  }

  #renderFilters() {
    const desktopContainer = document.getElementById('desktopFilterContainer');
    if (!desktopContainer) return;

    const allTags = this.blogService.getAllTags();

    const html = `
      <div class="filter-group">
        <h5 class="filter-title">Filter by Tags</h5>
        <div class="d-flex flex-column gap-2">
          ${allTags
            .map(
              (tag) => `
            <div class="form-check">
              <input class="form-check-input filter-tag" type="checkbox" value="${tag}" id="tag-${tag}" 
                ${this.state.criteria.tags?.includes(tag) ? 'checked' : ''}>
              <label class="form-check-label" for="tag-${tag}">
                ${tag}
              </label>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    desktopContainer.innerHTML = html;
    const mobileContainer = document.getElementById('mobileFilterContainer');
    if (mobileContainer) {
      mobileContainer.innerHTML = html
        .replace(/id="([^"]+)"/g, 'id="mobile-$1"')
        .replace(/for="([^"]+)"/g, 'for="mobile-$1"')
        .replace(/name="([^"]+)"/g, 'name="mobile-$1"');
    }
  }

  #attachEventListeners() {
    // Tag Filters (Delegate)
    const handleFilterChange = (e) => {
       if (e.target.classList.contains('filter-tag')) {
         this.#handleTagFilter(e.target);
       }
    };

    ['desktopFilterContainer', 'mobileFilterContainer'].forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.addEventListener('change', handleFilterChange);
      }
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      let debounceTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          this.state.criteria.text = e.target.value;
          this.state.currentPage = 1;
          this.state.criteria.skip = 0;
          this.#fetchBlogs();
        }, 300);
      });
    }

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.#handleSortFilter(e.target);
      });
    }

    // Pagination
    const paginationContainer = document.getElementById('pagination');
    if (paginationContainer) {
      paginationContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target.closest('.page-link');
        if (link && !link.parentElement.classList.contains('disabled')) {
          const page = parseInt(link.dataset.page);
          if (page) {
            this.state.currentPage = page;
            this.state.criteria.skip = (page - 1) * this.state.criteria.limit;
            this.#fetchBlogs();
            document.getElementById('blog-list-container')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }

  #handleTagFilter(element) {
    const tag = element.value;
    if (element.checked) {
      if (!this.state.criteria.tags.includes(tag)) {
        this.state.criteria.tags.push(tag);
      }
    } else {
      this.state.criteria.tags = this.state.criteria.tags.filter((t) => t !== tag);
    }
    this.state.currentPage = 1;
    this.state.criteria.skip = 0;
    this.#fetchBlogs();
  }

  #handleSortFilter(element) {
    this.state.sortBy = element.value;
    this.#fetchBlogs();
  }

  #fetchBlogs() {
    const result = this.blogService.getWithCriteria(this.state.criteria);
    let blogs = result.items;
    
    // Client-side sorting if needed (service does date sort by default, but we have other options)
    blogs = this.#sortBlogs(blogs, this.state.sortBy);

    this.blogListRaw.render(blogs);
    this.#renderPagination(result.total);
    this.#updateUrl();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  #sortBlogs(blogs, sortBy) {
    return [...blogs].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case 'oldest':
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }

  #renderPagination(total) {
    const container = document.getElementById('pagination');
    if (!container) return;

    const totalPages = Math.ceil(total / this.state.criteria.limit);

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = '';
    const current = this.state.currentPage;

    // Previous Button
    html += `
            <li class="page-item ${current === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current - 1}" aria-label="Previous">
                    <i data-lucide="chevron-left" style="width:16px;"></i>
                </a>
            </li>
        `;

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
       if (
        i === 1 ||
        i === totalPages ||
        (i >= current - 1 && i <= current + 1)
      ) {
         html += `
                <li class="page-item ${current === i ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
      } else if (
        (i === 2 && current > 3) ||
        (i === totalPages - 1 && current < totalPages - 2)
      ) {
        html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    // Next Button
    html += `
            <li class="page-item ${current === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current + 1}" aria-label="Next">
                    <i data-lucide="chevron-right" style="width:16px;"></i>
                </a>
            </li>
        `;

    container.innerHTML = html;
  }

  #updateUrl() {
    const url = new URL(window.location);

    if (this.state.criteria.text) {
      url.searchParams.set('q', this.state.criteria.text);
    } else {
      url.searchParams.delete('q');
    }

    if (this.state.sortBy !== 'newest') {
      url.searchParams.set('sort', this.state.sortBy);
    } else {
      url.searchParams.delete('sort');
    }

    if (this.state.currentPage > 1) {
      url.searchParams.set('page', this.state.currentPage);
    } else {
      url.searchParams.delete('page');
    }
    
    // Handle tags in URL (only one supported in URL for simplicity, or multi?)
    // Recipe controller didn't seem to support array updateUrl fully for categories, but let's stick to simple
    if (this.state.criteria.tags.length > 0) {
        url.searchParams.set('tag', this.state.criteria.tags[0]);
    } else {
        url.searchParams.delete('tag');
    }

    window.history.replaceState({}, '', url);
  }
}

export default BlogController;
