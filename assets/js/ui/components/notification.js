import Logger from '../../utils/logger.js';

class Notification {
	#modal = null;
	#modalElement = null;

	constructor(modalId = 'noti-modal') {
		this.#init(modalId);
	}

	#init(modalId) {
		this.#modalElement = document.getElementById(modalId);

		if (!this.#modalElement) {
			Logger.warn(`Notification modal element #${modalId} not found.`);
			return;
		}

		if (typeof bootstrap !== 'undefined') {
			this.#modal = new bootstrap.Modal(this.#modalElement);
		} else {
			Logger.error('Bootstrap is not loaded. Notification modal cannot be initialized.');
		}
	}

	/**
	 * Show success notification
	 * @param {string} title
	 * @param {string} message
	 */
	success(title, message) {
		this.#show('success', title, message);
	}

	/**
	 * Show error notification
	 * @param {string} title
	 * @param {string} message
	 */
	error(title, message) {
		this.#show('error', title, message);
	}

	/**
	 * Show warning notification
	 * @param {string} title
	 * @param {string} message
	 */
	warn(title, message) {
		this.#show('warning', title, message);
	}

	/**
	 * Show info notification
	 * @param {string} title
	 * @param {string} message
	 */
	info(title, message) {
		this.#show('info', title, message);
	}

	/**
	 * Show question notification
	 * @param {string} title
	 * @param {string} message
	 */
	quest(title, message) {
		this.#show('question', title, message);
	}

	/**
	 * Internal method to show a notification
	 * @param {'success'|'error'|'warning'|'info'|'question'} type
	 * @param {string} title
	 * @param {string} message
	 */
	#show(type, title, message) {
		if (!this.#modal || !this.#modalElement) {
			Logger.warn('Notification modal is not ready.');
			return;
		}

		const modalTitle = this.#modalElement.querySelector('.modal-title');
		const modalMessage = this.#modalElement.querySelector('.modal-message');

		if (modalTitle) {
			let iconHTML = '';

			switch (type) {
				case 'success':
					iconHTML = '<i data-lucide="check-circle"></i>';
					break;
				case 'error':
					iconHTML = '<i data-lucide="x-circle"></i>';
					break;
				case 'warning':
					iconHTML = '<i data-lucide="alert-triangle"></i>';
					break;
				case 'info':
					iconHTML = '<i data-lucide="info"></i>';
					break;
				case 'question':
					iconHTML = '<i data-lucide="help-circle"></i>';
					break;
				default:
					iconHTML = '<i data-lucide="info"></i>';
			}

			modalTitle.innerHTML = `<div class="modal-icon ${type}">${iconHTML}</div> ${title}`;
		}

		if (modalMessage) modalMessage.textContent = message;

		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}

		this.#modal.show();
	}
}

export default Notification;
