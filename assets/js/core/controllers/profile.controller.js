import AuthService from '../services/auth.service.js';
import UserService from '../services/user.service.js';
import Notification from '../../ui/components/notification.js';
import Logger from '../../utils/logger.js';
import { ROUTES } from '../router/const.js';

class ProfileController {
  constructor() {
    this.authService = AuthService.getInstance();
    this.userService = UserService.getInstance();
    this.notification = new Notification();
    this.form = document.getElementById('profile-form');
    this.deleteBtn = document.getElementById('btn-confirm-delete');
  }

  init() {
    if (!this.checkAuth()) return;
    this.loadUserData();
    this.bindEvents();
    Logger.info('ProfileController initialized');
  }

  checkAuth() {
    if (!this.authService.isAuthenticated()) {
      window.location.href = './login.html';
      return false;
    }
    return true;
  }

  loadUserData() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const fields = {
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
    };

    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.value = value || '';
    });

    this.updateAvatarPreview(user.avatar);
  }

  updateAvatarPreview(src) {
    const img = document.getElementById('avatar-preview');
    const fallbackUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    if (img && src) {
      img.onerror = () => {
        if (img.src !== fallbackUrl) {
          img.src = fallbackUrl;
        }
      };
      img.src = src;
    }
  }

  bindEvents() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleUpdate);
      const avatarInput = document.getElementById('avatar');
      if (avatarInput) {
        avatarInput.addEventListener('input', (e) => {
          this.updateAvatarPreview(e.target.value);
        });
      }
    }

    if (this.deleteBtn) {
      this.deleteBtn.addEventListener('click', this.handleDelete);
    }
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const formData = new FormData(this.form);
    const updateData = {
      fullName: formData.get('fullName'),
      avatar: formData.get('avatar'),
      password: formData.get('password'),
    };

    const result = this.userService.updateProfile(user.id, updateData);

    if (result.success) {
      this.notification.success('Success', result.message);
      setTimeout(() => window.location.reload(), 1500);
    } else {
      this.notification.error('Error', result.message);
    }
  };

  handleDelete = () => {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const result = this.userService.deleteAccount(user.id);

    if (result.success) {
      window.location.href = ROUTES.HOME.redirectPath;
    } else {
      const modalEl = document.getElementById('confirm-delete-modal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      this.notification.error('Error', result.message);
    }
  };
}

export default ProfileController;
