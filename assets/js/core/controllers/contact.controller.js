import Logger from '../../utils/logger.js';
import Notification from '../../ui/components/notification.js';
import Validator from '../../utils/validator.js';

class ContactController {
  static #instance = null;

  constructor() {
    if (ContactController.#instance) return ContactController.#instance;
    ContactController.#instance = this;
    this.notif = new Notification();
  }

  init() {
    const form = document.getElementById('contact-form');
    if (!form) return Logger.warn('Contact form not found');

    form.onsubmit = (e) => {
      e.preventDefault();
      const data = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        subject: form.querySelector('#subject').value.trim(),
        message: form.querySelector('#message').value.trim(),
      };

      if (!Validator.fullName.isValid(data.name))
        return this.notif.error('Invalid Input', 'Invalid full name (3-100 characters).');
      if (!Validator.email.isValid(data.email))
        return this.notif.error('Invalid Input', 'Invalid email address.');
      if (data.subject.length < 3)
        return this.notif.error('Invalid Input', 'Subject must be >= 3 chars.');
      if (data.message.length < 10)
        return this.notif.error('Invalid Input', 'Message must be >= 10 chars.');

      Logger.info('Contact form submitted', data);
      this.notif.success('Message Sent', 'Thank you! We will get back to you soon.');
      form.reset();
    };
  }
}

export default ContactController;
