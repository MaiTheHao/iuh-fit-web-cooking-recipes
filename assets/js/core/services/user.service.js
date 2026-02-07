import UserRepository from '../repositories/user.repository.js';
import AuthService from './auth.service.js';
import Logger from '../../utils/logger.js';
import User from '../entities/user.entity.js';

class UserService {
  static #instance = null;
  #userRepository;
  #authService;

  constructor() {
    if (UserService.#instance) {
      return UserService.#instance;
    }
    this.#userRepository = UserRepository.getInstance();
    this.#authService = AuthService.getInstance();
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
   * @param {string} [updateData.fullName]
   * @param {string} [updateData.avatar]
   * @param {string} [updateData.password]
   * @returns {{success: boolean, message?: string, user?: User}}
   */
  updateProfile(userId, { fullName, avatar, password }) {
    try {
      const user = this.#userRepository.findById(userId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      // Update fields if provided
      if (fullName !== undefined) user.fullName = fullName;
      if (avatar !== undefined) user.avatar = avatar || 'https://via.placeholder.com/150';
      if (password !== undefined && password.trim() !== '') user.password = password;

      const saved = this.#userRepository.save(user);

      if (saved) {
        Logger.info(`User profile updated: ${user.fullName}`);
        return { success: true, message: 'Profile updated successfully', user };
      } else {
        return { success: false, message: 'Failed to save user data' };
      }
    } catch (error) {
      Logger.error('Update profile error', error);
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
        this.#authService.signout();
        Logger.info(`User account deleted: ${userId}`);
        return { success: true, message: 'Account deleted successfully' };
      }
      return { success: false, message: 'Failed to delete account' };
    } catch (error) {
      Logger.error('Delete account error', error);
      return { success: false, message: error.message };
    }
  }
}

export default UserService;
