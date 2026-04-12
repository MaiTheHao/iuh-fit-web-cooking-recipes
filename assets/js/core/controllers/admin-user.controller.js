import AuthService from '../services/auth.service.js';
import UserRepository from '../repositories/user.repository.js';
import User from '../entities/user.entity.js';
import Notification from '../../ui/components/notification.js';

class AdminUserController {
  #userRepo;
  #noti;

  init() {
    if (!AuthService.getInstance().isAdmin()) {
      window.location.href = '/pages/login.html';
      return;
    }

    this.#userRepo = UserRepository.getInstance();
    this.#noti = new Notification();

    this.#bindEvents();
    this.#renderTable();
  }

  #renderTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    const users = this.#userRepo.findAll();

    if (users.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="text-center text-muted">No users found.</td></tr>';
      return;
    }

    tbody.innerHTML = users
      .map((u) => {
        const avatarHtml = `<img src="${u.avatar || 'https://via.placeholder.com/40'}" class="table-avatar me-2" alt="Avatar">`;
        const roleStr =
          u.role === 'admin'
            ? '<span class="badge bg-danger">Admin</span>'
            : '<span class="badge bg-secondary">User</span>';

        return `
        <tr>
          <td>
            <div class="d-flex align-items-center">
              ${avatarHtml}
              <small class="text-muted">${u.id.substring(0, 8)}</small>
            </div>
          </td>
          <td class="fw-bold">${u.fullName}</td>
          <td>${u.email}</td>
          <td>${roleStr}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-warning me-1 btn-repass" data-id="${u.id}" title="Reset Password"><i data-lucide="key"></i></button>
            <button class="btn btn-sm btn-outline-primary me-1 btn-edit" data-id="${u.id}" title="Edit"><i data-lucide="edit"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${u.id}" title="Delete"><i data-lucide="trash"></i></button>
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
    const btnCreate = document.getElementById('btnCreateUser');
    if (btnCreate) btnCreate.addEventListener('click', () => this.#openModal());

    const btnSave = document.getElementById('btnSaveUser');
    if (btnSave) btnSave.addEventListener('click', () => this.#saveUser());

    const btnSavePass = document.getElementById('btnSavePassword');
    if (btnSavePass) btnSavePass.addEventListener('click', () => this.#savePassword());

    const tbody = document.getElementById('usersTableBody');
    if (tbody) {
      tbody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit');
        const delBtn = e.target.closest('.btn-delete');
        const repassBtn = e.target.closest('.btn-repass');

        if (editBtn) this.#openModal(editBtn.getAttribute('data-id'));
        if (delBtn) this.#deleteUser(delBtn.getAttribute('data-id'));
        if (repassBtn) this.#openResetPassModal(repassBtn.getAttribute('data-id'));
      });
    }
  }

  #openModal(id = null) {
    const form = document.getElementById('userForm');
    form.reset();
    document.getElementById('userId').value = id || '';

    if (id) {
      const user = this.#userRepo.findById(id);
      if (user) {
        document.getElementById('userModalTitle').textContent = 'Edit User';
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userEmail').disabled = true;
        document.getElementById('userFullName').value = user.fullName;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userAvatar').value = user.avatar;
        document.getElementById('passwordGroup').style.display = 'none';
      }
    } else {
      document.getElementById('userModalTitle').textContent = 'Create User';
      document.getElementById('userEmail').disabled = false;
      document.getElementById('passwordGroup').style.display = 'block';
      document.getElementById('userPassword').required = true;
    }

    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
  }

  #saveUser() {
    const form = document.getElementById('userForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const idInput = document.getElementById('userId').value;
      const isUpdate = !!idInput;
      const id = idInput || crypto.randomUUID();
      const email = document.getElementById('userEmail').value.trim();
      const fullName = document.getElementById('userFullName').value.trim();
      const role = document.getElementById('userRole').value;
      const avatar =
        document.getElementById('userAvatar').value ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=256`;

      let password = null;
      let favoriteRecipes = [];

      if (!isUpdate) {
        if (this.#userRepo.emailExists(email)) {
          this.#noti.error('Error', 'Email already exists!');
          return;
        }
        password = document.getElementById('userPassword').value;
      } else {
        const existing = this.#userRepo.findById(id);
        if (!existing) {
          this.#noti.error('Error', 'User not found!');
          return;
        }
        password = existing.password;
        favoriteRecipes = existing.favoriteRecipes;
      }

      const user = new User({
        id,
        email,
        fullName,
        password,
        avatar,
        role,
        favoriteRecipes,
      });

      if (this.#userRepo.save(user)) {
        bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
        this.#renderTable();
        this.#noti.success('Success', isUpdate ? 'Update successfully' : 'Create successfully');
      } else {
        this.#noti.error('Error', 'Failed to save user');
      }
    } catch (e) {
      this.#noti.error('Error', `Error: ${e.message}`);
    }
  }

  #openResetPassModal(id) {
    document.getElementById('resetPassForm').reset();
    document.getElementById('resetPassUserId').value = id;

    const modal = new bootstrap.Modal(document.getElementById('resetPassModal'));
    modal.show();
  }

  #savePassword() {
    const form = document.getElementById('resetPassForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const id = document.getElementById('resetPassUserId').value;
      const newPassword = document.getElementById('newPassword').value;
      const user = this.#userRepo.findById(id);

      if (!user) {
        this.#noti.error('Error', 'User not found');
        return;
      }

      user.password = newPassword;

      if (this.#userRepo.save(user)) {
        bootstrap.Modal.getInstance(document.getElementById('resetPassModal')).hide();
        this.#noti.success('Success', 'Update successfully');
      } else {
        this.#noti.error('Error', 'Failed to reset password');
      }
    } catch (e) {
      this.#noti.error('Error', `Error: ${e.message}`);
    }
  }

  #deleteUser(id) {
    const currentUser = AuthService.getInstance().getCurrentUser();
    if (currentUser && currentUser.id === id) {
      this.#noti.error('Error', 'You cannot delete yourself!');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      if (this.#userRepo.delete(id)) {
        this.#renderTable();
        this.#noti.success('Success', 'Delete successfully');
      } else {
        this.#noti.error('Error', 'Failed to delete user');
      }
    }
  }
}

export default AdminUserController;
