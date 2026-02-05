import AuthService from '../services/auth.service.js';
import Notification from '../../ui/components/notification.js';
import Logger from '../../utils/logger.js';
import { ROUTES } from '../router/const.js';

class RegisterController {
  #authService;
  #notification;

  constructor() {
    this.#authService = AuthService.getInstance();
    this.#notification = new Notification();
    if (this.#authService.isAuthenticated()) {
      window.location.href = ROUTES.HOME.redirectPath;
    }
  }

  init() {
    this.#initRegisterForm();
    Logger.info('RegisterController initialized');
  }

  #initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
      };

      const result = this.#authService.register(formData);

      if (result.success) {
        Logger.info('Registration successful', result);
        this.#notification.success('Account Created!', 'Registration successful. Please sign in.');
        form.reset();

        setTimeout(() => {
          window.location.href = '/pages/login.html';
        }, 2000);
      } else {
        Logger.error('Registration failed', result);
        const errorMessage = result.errors ? Object.values(result.errors)[0] : result.message;
        this.#notification.error('Registration Failed', errorMessage);
      }
    });
  }
}

export default RegisterController;
