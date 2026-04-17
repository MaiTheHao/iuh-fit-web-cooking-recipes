class AuthService {
  static #instance = null;
  #userRepository;

  constructor() {
    if (AuthService.#instance) {
      return AuthService.#instance;
    }
    AuthService.#instance = this;
    this.#userRepository = UserRepository.getInstance();
    this.#userService = UserService.getInstance();
    this.#loadCurrentUser();
  }

  #userService;

  /** @returns {AuthService} */
  static getInstance() {
    if (!this.#instance) {
      new AuthService();
    }
    return this.#instance;
  }

  /** @returns {User|null} */
  #loadCurrentUser() {
    const currentUserId = localStorage.getItem('CURRENT_USER_ID');
    if (currentUserId) {
      return this.#userRepository.findById(currentUserId);
    }
    return null;
  }

  /** @returns {{success: boolean, message?: string, errors?: Object, user?: User}} */
  register({ email, fullName, password, confirmPassword }) {
    try {
      const validation = this.#validateRegistration({ email, fullName, password, confirmPassword });

      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed. Please check your input.',
          errors: validation.errors,
        };
      }

      if (this.#userRepository.emailExists(email)) {
        return {
          success: false,
          message: 'Email already exists!',
          errors: { email: 'This email is already registered' },
        };
      }

      const user = this.#userService.createUser({
        email: email,
        fullName: fullName,
        password: password,
      });

      if (!user) {
        return {
          success: false,
          message: 'Failed to create user. Please try again.',
          errors: { system: 'Database save failed' },
        };
      }

      console.log(`New user registered: ${email}`);

      return {
        success: true,
        message: 'Registration successful! You can now sign in.',
        user: user,
      };
    } catch (error) {
      console.error('Registration error', error);
      return {
        success: false,
        message: 'Registration failed. Please check your input.',
        errors: { system: error.message },
      };
    }
  }

  /** @return {{ isValid: boolean, errors: Object }} */
  #validateRegistration({ email, fullName, password, confirmPassword }) {
    const errors = {};
    let isValid = true;

    const emailValidation = Validator.email.valid(email);
    if (!emailValidation.isValid) {
      isValid = false;
      errors.email = Object.values(emailValidation.errors).filter(Boolean).join(', ');
    }

    const fullNameValidation = Validator.fullName.valid(fullName);
    if (!fullNameValidation.isValid) {
      isValid = false;
      errors.fullName = Object.values(fullNameValidation.errors).filter(Boolean).join(', ');
    }

    const passwordValidation = Validator.password.valid(password);
    if (!passwordValidation.isValid) {
      isValid = false;
      errors.password = Object.values(passwordValidation.errors).filter(Boolean).join(', ');
    }

    if (password !== confirmPassword) {
      isValid = false;
      errors.confirmPassword = 'Passwords do not match!';
    }

    return { isValid, errors };
  }

  /** @returns {{success: boolean, message?: string, errors?: Object, user?: User}} */
  signin(email, password) {
    try {
      const validation = this.#validateSignin({ email, password });

      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed. Please check your input.',
          errors: validation.errors,
        };
      }

      const user = this.#userRepository.findByEmail(email.trim());

      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password.',
          errors: { auth: 'Invalid credentials' },
        };
      }

      if (user.password !== password) {
        return {
          success: false,
          message: 'Invalid email or password.',
          errors: { auth: 'Invalid credentials' },
        };
      }

      localStorage.setItem('CURRENT_USER_ID', user.id);

      console.log(`User signed in: ${email}`);

      return {
        success: true,
        message: 'Sign in successful!',
        user: user,
      };
    } catch (error) {
      console.error('Sign in error', error);
      return {
        success: false,
        message: 'Sign in failed. Please try again.',
        errors: { system: error.message },
      };
    }
  }

  /** @return {{ isValid: boolean, errors: Object }} */
  #validateSignin({ email, password }) {
    const errors = {};
    let isValid = true;

    const emailValidation = Validator.email.valid(email);
    if (!emailValidation.isValid) {
      isValid = false;
      errors.email = Object.values(emailValidation.errors).filter(Boolean).join(', ');
    }

    if (!password || password.length === 0) {
      isValid = false;
      errors.password = 'Password is required';
    }

    return { isValid, errors };
  }

  signout() {
    localStorage.removeItem('CURRENT_USER_ID');
    window.location.reload();
    window.location.href = ROUTES.HOME.redirectPath;
    console.log('User signed out');
  }

  /** @returns {User|null} */
  getCurrentUser() {
    return this.#loadCurrentUser();
  }

  /** @returns {boolean} */
  isAuthenticated() {
    return this.#loadCurrentUser() !== null;
  }

  /** @returns {boolean} */
  isAdmin() {
    const user = this.#loadCurrentUser();
    return user && user.role === 'admin';
  }


}
