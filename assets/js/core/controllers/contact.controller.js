import Logger from '../../utils/logger.js';
import Notification from '../../ui/components/notification.js';
import Validator from '../../utils/validator.js';

class ContactController {
  static #instance = null;
  #notification;

  constructor() {
    if (ContactController.#instance) {
      return ContactController.#instance;
    }
    ContactController.#instance = this;
    this.#notification = new Notification();
  }

  init() {
    this.initContactForm();
  }

  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
      Logger.warn('Contact form not found');
      return;
    }

    contactForm.addEventListener('submit', (e) => this.#handleFormSubmit(e));
  }

  #handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      subject: form.querySelector('#subject').value.trim(),
      message: form.querySelector('#message').value.trim(),
    };

    if (!this.#validateForm(formData)) {
      return;
    }

    Logger.info('Contact form submitted', formData);
    this.#notification.success(
      'Message Sent',
      'Thank you for contacting us! We will get back to you soon.',
    );
    form.reset();
  }

  #validateForm(data) {
    if (!Validator.fullName.isValid(data.name)) {
      this.#notification.error(
        'Invalid Input',
        'Please enter a valid full name (3-100 characters).',
      );
      return false;
    }

    if (!Validator.email.isValid(data.email)) {
      this.#notification.error('Invalid Input', 'Please enter a valid email address.');
      return false;
    }

    if (data.subject.length < 3) {
      this.#notification.error('Invalid Input', 'Subject must be at least 3 characters long.');
      return false;
    }

    if (data.message.length < 10) {
      this.#notification.error('Invalid Input', 'Message must be at least 10 characters long.');
      return false;
    }

    return true;
  }
}

export default ContactController;
