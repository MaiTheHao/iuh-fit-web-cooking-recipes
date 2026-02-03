import Logger from '../../utils/logger.js';
import Validator from '../../utils/validator.js';
import UserRepository from '../repositories/user.repository.js';
import User from '../entities/user.entity.js';

class AuthService {
	static #instance = null;
	#userRepository;
	#currentUser = null;

	constructor() {
		if (AuthService.#instance) {
			return AuthService.#instance;
		}
		AuthService.#instance = this;
		this.#userRepository = UserRepository.getInstance();
		this.#loadCurrentUser();
	}

	/** @returns {AuthService} */
	static getInstance() {
		if (!this.#instance) {
			new AuthService();
		}
		return this.#instance;
	}

	#loadCurrentUser() {
		const currentUserId = localStorage.getItem('CURRENT_USER_ID');
		if (currentUserId) {
			this.#currentUser = this.#userRepository.findById(currentUserId);
		}
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

			const user = new User({
				id: crypto.randomUUID(),
				email: email.trim(),
				fullName: fullName.trim(),
				password: password,
				avatar: this.#generateDefaultAvatar(fullName),
				role: 'user',
				favoriteRecipes: [],
			});

			const saved = this.#userRepository.save(user);

			if (!saved) {
				return {
					success: false,
					message: 'Failed to save user. Please try again.',
					errors: { system: 'Database save failed' },
				};
			}

			Logger.info(`New user registered: ${email}`);

			return {
				success: true,
				message: 'Registration successful! You can now sign in.',
				user: user,
			};
		} catch (error) {
			Logger.error('Registration error', error);
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

		// Validate email
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

			this.#currentUser = user;
			localStorage.setItem('CURRENT_USER_ID', user.id);

			Logger.info(`User signed in: ${email}`);

			return {
				success: true,
				message: 'Sign in successful!',
				user: user,
			};
		} catch (error) {
			Logger.error('Sign in error', error);
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
		this.#currentUser = null;
		localStorage.removeItem('CURRENT_USER_ID');
		Logger.info('User signed out');
	}

	/** @returns {User|null} */
	getCurrentUser() {
		return this.#currentUser;
	}

	/** @returns {boolean} */
	isAuthenticated() {
		return this.#currentUser !== null;
	}

	/** @returns {string} */
	#generateDefaultAvatar(fullName) {
		return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=256`;
	}
}

export default AuthService;
