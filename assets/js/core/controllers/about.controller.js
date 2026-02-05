import Logger from '../../utils/logger.js';

class AboutController {
  static #instance = null;

  constructor() {
    if (AboutController.#instance) {
      return AboutController.#instance;
    }
    AboutController.#instance = this;
  }

  init() {
    Logger.info('AboutController initialized');
  }
}

export default AboutController;
