import AuthService from '../services/auth.service.js';
import BlogPostRepository from '../repositories/blog-post.repository.js';
import UserRepository from '../repositories/user.repository.js';
import BlogPost from '../entities/blog-post.entity.js';
import Notification from '../../ui/components/notification.js';

class AdminBlogController {
  #blogRepo;
  #userRepo;
  #usersMap = {};
  #noti;

  init() {
    if (!AuthService.getInstance().isAdmin()) {
      window.location.href = '/pages/login.html';
      return;
    }

    this.#blogRepo = BlogPostRepository.getInstance();
    this.#userRepo = UserRepository.getInstance();
    this.#noti = new Notification();

    this.#loadUsers();
    this.#bindEvents();
    this.#renderTable();
  }

  #loadUsers() {
    const users = this.#userRepo.findAll();
    const selectEl = document.getElementById('blogAuthorId');
    if (selectEl) {
      selectEl.innerHTML = '';
      users.forEach((u) => {
        this.#usersMap[u.id] = u;
        const option = document.createElement('option');
        option.value = u.id;
        option.textContent = u.fullName;
        selectEl.appendChild(option);
      });
    }
  }

  #renderTable() {
    const tbody = document.getElementById('blogsTableBody');
    if (!tbody) return;
    const blogs = this.#blogRepo.findAll();

    if (blogs.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="text-center text-muted">No blogs found.</td></tr>';
      return;
    }

    tbody.innerHTML = blogs
      .map((b) => {
        const author = this.#usersMap[b.authorId];
        const authorHtml = author
          ? `<div class="d-flex align-items-center"><img src="${author.avatar}" class="table-avatar" alt="Avatar"><span>${author.fullName}</span></div>`
          : '<span class="text-muted">Unknown</span>';

        const dateStr = new Date(b.publishedAt).toLocaleDateString();

        return `
        <tr>
          <td><small class="text-muted">${b.id.substring(0, 8)}</small></td>
          <td><img src="${b.image}" class="table-cover" alt="Cover"></td>
          <td><div class="fw-bold">${b.title}</div></td>
          <td>${dateStr}</td>
          <td>${authorHtml}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary me-2 btn-edit" data-id="${b.id}"><i data-lucide="edit"></i> Edit</button>
            <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${b.id}"><i data-lucide="trash"></i> Del</button>
          </td>
        </tr>
      `;
      })
      .join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  #bindEvents() {
    const btnCreate = document.getElementById('btnCreateBlog');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => this.#openModal());
    }

    const btnSave = document.getElementById('btnSaveBlog');
    if (btnSave) {
      btnSave.addEventListener('click', () => this.#saveBlog());
    }

    const tbody = document.getElementById('blogsTableBody');
    if (tbody) {
      tbody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit');
        const delBtn = e.target.closest('.btn-delete');

        if (editBtn) this.#openModal(editBtn.getAttribute('data-id'));
        if (delBtn) this.#deleteBlog(delBtn.getAttribute('data-id'));
      });
    }
  }

  #openModal(id = null) {
    const form = document.getElementById('blogForm');
    form.reset();
    document.getElementById('blogId').value = id || '';

    if (id) {
      const blog = this.#blogRepo.findById(id);
      if (blog) {
        document.getElementById('blogModalTitle').textContent = 'Edit Blog';
        document.getElementById('blogTitle').value = blog.title;
        document.getElementById('blogExcerpt').value = blog.excerpt;
        document.getElementById('blogImage').value = blog.image;
        document.getElementById('blogAuthorId').value = blog.authorId;
        document.getElementById('blogTags').value = (blog.tags || []).join(', ');
        document.getElementById('blogContent').value = blog.content;
      }
    } else {
      document.getElementById('blogModalTitle').textContent = 'Create Blog';
      const currentUser = AuthService.getInstance().getCurrentUser();
      if (currentUser) {
        document.getElementById('blogAuthorId').value = currentUser.id;
      }
    }

    const modal = new bootstrap.Modal(document.getElementById('blogModal'));
    modal.show();
  }

  #saveBlog() {
    const form = document.getElementById('blogForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const idInput = document.getElementById('blogId').value;
      const isUpdate = !!idInput;
      const id = idInput || crypto.randomUUID();
      const title = document.getElementById('blogTitle').value;
      const excerpt = document.getElementById('blogExcerpt').value;
      const image = document.getElementById('blogImage').value;
      const authorId = document.getElementById('blogAuthorId').value;
      const rawTags = document.getElementById('blogTags').value;
      const tags = rawTags
        ? rawTags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
      const content = document.getElementById('blogContent').value;

      const existing = this.#blogRepo.findById(id);
      const publishedAt = existing ? existing.publishedAt : new Date().toISOString();

      const blog = new BlogPost({
        id,
        title,
        excerpt,
        content,
        image,
        authorId,
        publishedAt,
        tags,
      });

      if (this.#blogRepo.save(blog)) {
        bootstrap.Modal.getInstance(document.getElementById('blogModal')).hide();
        this.#renderTable();
        if (isUpdate) {
          this.#noti.success('Success', 'Update successfully');
        } else {
          this.#noti.success('Success', 'Create successfully');
        }
      } else {
        this.#noti.error('Error', 'Failed to save blog');
      }
    } catch (e) {
      this.#noti.error('Error', `Error: ${e.message}`);
    }
  }

  #deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
      if (this.#blogRepo.delete(id)) {
        this.#renderTable();
        this.#noti.success('Success', 'Delete successfully');
      } else {
        this.#noti.error('Error', 'Failed to delete blog');
      }
    }
  }
}

export default AdminBlogController;
