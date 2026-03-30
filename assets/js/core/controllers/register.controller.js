import AuthService from '../services/auth.service.js';
import Notification from '../../ui/components/notification.js';
import Logger from '../../utils/logger.js';
import { ROUTES } from '../router/const.js';

class RegisterController {
  static #instance = null;

  constructor() {
    if (RegisterController.#instance) return RegisterController.#instance;
    RegisterController.#instance = this;

    this.auth = AuthService.getInstance();
    this.notification = new Notification();
    if (this.auth.isAuthenticated()) window.location.href = ROUTES.HOME.redirectPath;
  }

  init() {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
      };

      const result = this.auth.register(formData);

      if (result.success) {
        this.notification.success('Account Created!', 'Registration successful.');
        setTimeout(() => (window.location.href = '/pages/login.html'), 1000);
      } else {
        const error = result.errors ? Object.values(result.errors)[0] : result.message;
        this.notification.error('Registration Failed', error);
      }
    };
    Logger.info('RegisterController initialized');
  }
}

export default RegisterController;
