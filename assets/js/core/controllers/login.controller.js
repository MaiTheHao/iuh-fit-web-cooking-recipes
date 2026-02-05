import AuthService from '../services/auth.service.js';
import Notification from '../../ui/components/notification.js';
import Logger from '../../utils/logger.js';
import { ROUTES } from '../router/const.js';

class LoginController {
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
    this.#initLoginForm();
    Logger.info('LoginController initialized');
  }

  #initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      const result = this.#authService.signin(email, password);

      if (result.success) {
        Logger.info('Login successful', result);
        this.#notification.success('Welcome back!', 'Login successful. Redirecting...');

        setTimeout(() => {
          window.location.href = ROUTES.HOME.redirectPath;
        }, 1500);
      } else {
        Logger.error('Login failed', result);
        const errorMessage = result.errors ? Object.values(result.errors)[0] : result.message;
        this.#notification.error('Login Failed', errorMessage);
      }
    });
  }
}

export default LoginController;
