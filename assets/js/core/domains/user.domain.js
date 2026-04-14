// ENTITY

class User extends Entity {
  /** @type {string} User email */
  #email;

  /** @type {string} User full name */
  #fullName;

  /** @type {string} User password */
  #password;

  /** @type {string} User avatar URL */
  #avatar;

  /** @type {string} User role*/
  #role;

  /** @type {string[]} Favorite recipe IDs */
  #favoriteRecipes = [];

  constructor({ id, email, fullName, password, avatar, role, favoriteRecipes = [] }) {
    super(id);
    this.email = email;
    this.fullName = fullName;
    this.password = password;
    this.role = role;
    this.favoriteRecipes = favoriteRecipes;

    if (avatar) this.avatar = avatar;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    const validation = Validator.email.valid(email);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Email: ${errors}`);
    }
    this.#email = email;
    return this;
  }

  get fullName() {
    return this.#fullName;
  }

  set fullName(fullName) {
    const validation = Validator.fullName.valid(fullName);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Full name: ${errors}`);
    }
    this.#fullName = fullName.trim();
    return this;
  }

  get password() {
    return this.#password;
  }

  set password(password) {
    const validation = Validator.password.valid(password);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Password: ${errors}`);
    }
    this.#password = password;
    return this;
  }

  get avatar() {
    return this.#avatar;
  }

  set avatar(avatar) {
    const validation = Validator.url.valid(avatar);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Avatar URL: ${errors}`);
    }
    this.#avatar = avatar;
    return this;
  }

  get role() {
    return this.#role;
  }

  set role(role) {
    const validation = Validator.string.valid(role, 2, 255);
    if (!validation.isValid) {
      const errors = Object.values(validation.errors).filter(Boolean).join(', ');
      throw new Error(`Role ID: ${errors}`);
    }
    this.#role = role.trim();
    return this;
  }

  get favoriteRecipes() {
    return structuredClone(this.#favoriteRecipes);
  }

  set favoriteRecipes(recipes) {
    if (!Array.isArray(recipes)) throw new Error('Favorite recipes must be an array');
    this.#favoriteRecipes = recipes;
    return this;
  }

  toggleFavorite(recipeId) {
    const index = this.#favoriteRecipes.indexOf(recipeId);
    if (index > -1) this.#favoriteRecipes.splice(index, 1);
    else this.#favoriteRecipes.push(recipeId);
    return this;
  }

  isFavorite(recipeId) {
    return this.#favoriteRecipes.includes(recipeId);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.#email,
      fullName: this.#fullName,
      password: this.#password,
      avatar: this.#avatar,
      role: this.#role,
      favoriteRecipes: structuredClone(this.#favoriteRecipes),
    };
  }

  static fromJSON(data) {
    return new User({
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      avatar: data.avatar,
      role: data.role,
      favoriteRecipes: data.favoriteRecipes || [],
    });
  }
}

// REPOSITORY

class UserRepository extends BaseRepository {
  static #instance = null;

  constructor() {
    if (UserRepository.#instance) {
      return UserRepository.#instance;
    }
    super('USERS');
    UserRepository.#instance = this;
  }

  /** @returns {UserRepository} */
  static getInstance() {
    if (!this.#instance) {
      new UserRepository();
    }
    return this.#instance;
  }

  /** @returns {User|null} */
  findByEmail(email) {
    const users = this.findAll();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  /** @returns {User[]} */
  findByRole(role) {
    const users = this.findAll();
    return users.filter((u) => u.role === role);
  }

  /** @returns {User|null} */
  findById(id) {
    const userData = super.findRawByID(id);
    return userData ? User.fromJSON(userData) : null;
  }

  /** @returns {User[]} */
  findAll() {
    const usersData = super.findAllRaw();
    return usersData.map((userData) => User.fromJSON(userData));
  }

  /** @returns {boolean} */
  emailExists(email) {
    return this.findByEmail(email) !== null;
  }

  /** @returns {number} */
  countByRole(role) {
    return this.findByRole(role).length;
  }

  /** @returns {User[]} */
  findByName(searchTerm) {
    const users = this.findAll();
    const term = searchTerm.toLowerCase();
    return users.filter((u) => u.fullName.toLowerCase().includes(term));
  }

  /** @returns {boolean} */
  exists(id) {
    return this.findById(id) !== null;
  }
}

// SERVICE

class UserService {
  static #instance = null;
  #userRepository;

  constructor() {
    if (UserService.#instance) {
      return UserService.#instance;
    }
    this.#userRepository = UserRepository.getInstance();
    UserService.#instance = this;
  }

  /** @returns {UserService} */
  static getInstance() {
    if (!this.#instance) {
      new UserService();
    }
    return this.#instance;
  }

  /**
   * Update user profile
   * @param {string} userId
   * @param {Object} updateData
   * @returns {{success: boolean, message?: string, user?: User}}
   */
  updateProfile(userId, { fullName, avatar, password }) {
    try {
      const user = this.#userRepository.findById(userId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      if (fullName !== undefined) user.fullName = fullName;
      if (avatar !== undefined) user.avatar = avatar || 'https://via.placeholder.com/150';
      if (password !== undefined && password.trim() !== '') user.password = password;

      const saved = this.#userRepository.save(user);

      if (saved) {
        console.log(`User profile updated: ${user.fullName}`);
        return { success: true, message: 'Profile updated successfully', user };
      } else {
        return { success: false, message: 'Failed to save user data' };
      }
    } catch (error) {
      console.error('Update profile error', error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Delete user account
   * @param {string} userId
   * @returns {{success: boolean, message?: string}}
   */
  deleteAccount(userId) {
    try {
      const deleted = this.#userRepository.delete(userId);
      if (deleted) {
        // Signout logic (AuthService is assumed to be globally available)
        if (typeof AuthService !== 'undefined') {
          AuthService.getInstance().signout();
        }
        console.log(`User account deleted: ${userId}`);
        return { success: true, message: 'Account deleted successfully' };
      }
      return { success: false, message: 'Failed to delete account' };
    } catch (error) {
      console.error('Delete account error', error);
      return { success: false, message: error.message };
    }
  }

  toggleFavorite(userId, recipeId) {
    try {
      const user = this.#userRepository.findById(userId);
      if (!user) return { success: false, message: 'User not found' };

      user.toggleFavorite(recipeId);
      if (this.#userRepository.save(user)) {
        const isFav = user.favoriteRecipes.includes(recipeId);
        return { success: true, isFavorite: isFav, message: isFav ? 'Added' : 'Removed' };
      }
      return { success: false, message: 'Failed' };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
}
