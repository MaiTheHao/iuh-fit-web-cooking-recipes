import AuthService from '../services/auth.service.js';
import Notification from '../../ui/components/notification.js';
import Logger from '../../utils/logger.js';
import { ROUTES } from '../router/const.js';

class LoginController {
  static #instance = null;

  constructor() {
    if (LoginController.#instance) {
      return LoginController.#instance;
    }
    LoginController.#instance = this;

    this.auth = AuthService.getInstance();
    this.notification = new Notification();
    if (this.auth.isAuthenticated()) window.location.href = ROUTES.HOME.redirectPath;
  }

  init() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      const result = this.auth.signin(email, password);

      if (result.success) {
        this.notification.success('Welcome back!', 'Login successful.');
        setTimeout(() => (window.location.href = ROUTES.HOME.redirectPath), 1000);
      } else {
        const error = result.errors ? Object.values(result.errors)[0] : result.message;
        this.notification.error('Login Failed', error);
      }
    };
    Logger.info('LoginController initialized');
  }
}

export default LoginController;
