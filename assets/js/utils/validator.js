const Validator = {
	email: {
		validLength(email) {
			const isValid = email.length >= 5 && email.length <= 254;
			return [isValid ? null : 'Email length must be between 5 and 254 characters', isValid];
		},
		validFormat(email) {
			const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			return [isValid ? null : 'Email format is invalid', isValid];
		},
		valid(email) {
			const [lenErr, lenOk] = Validator.email.validLength(email);
			const [fmtErr, fmtOk] = Validator.email.validFormat(email);
			return {
				isValid: lenOk && fmtOk,
				errors: { length: lenErr, format: fmtErr },
			};
		},
		isValid(email) {
			if (!Validator.email.validLength(email)[1]) return false;
			return Validator.email.validFormat(email)[1];
		},
	},

	fullName: {
		validLength(fullName) {
			const trimmed = fullName.trim();
			const isValid = trimmed.length >= 3 && trimmed.length <= 100;
			return [isValid ? null : 'Full name length must be between 3 and 100 characters', isValid];
		},
		validChars(fullName) {
			const isValid = /^[\p{L}\s'-]+$/u.test(fullName.trim());
			return [isValid ? null : 'Full name contains invalid characters', isValid];
		},
		valid(fullName) {
			const [lenErr, lenOk] = Validator.fullName.validLength(fullName);
			const [chrErr, chrOk] = Validator.fullName.validChars(fullName);
			return { isValid: lenOk && chrOk, errors: { length: lenErr, chars: chrErr } };
		},
		isValid(fullName) {
			if (!Validator.fullName.validLength(fullName)[1]) return false;
			return Validator.fullName.validChars(fullName)[1];
		},
	},

	password: {
		validLength(password) {
			const isValid = password.length >= 8;
			return [isValid ? null : 'Password must be at least 8 characters', isValid];
		},
		validLetter(password) {
			const isValid = /[a-zA-Z]/.test(password);
			return [isValid ? null : 'Password must contain at least one letter', isValid];
		},
		validNumber(password) {
			const isValid = /\d/.test(password);
			return [isValid ? null : 'Password must contain at least one number', isValid];
		},
		valid(password) {
			const [lenErr, lenOk] = Validator.password.validLength(password);
			const [ltErr, ltOk] = Validator.password.validLetter(password);
			const [numErr, numOk] = Validator.password.validNumber(password);
			return { isValid: lenOk && ltOk && numOk, errors: { length: lenErr, letter: ltErr, number: numErr } };
		},
		isValid(password) {
			if (!Validator.password.validLength(password)[1]) return false;
			if (!Validator.password.validLetter(password)[1]) return false;
			return Validator.password.validNumber(password)[1];
		},
	},

	url: {
		valid(url) {
			try {
				new URL(url);
				return [null, true];
			} catch {
				return ['Invalid URL format', false];
			}
		},
		isValid(url) {
			return Validator.url.valid(url)[1];
		},
	},

	image: {
		valid(imagePath) {
			if (!imagePath) return ['Image path is required', false];
			const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
			const isValid = imageExtensions.test(imagePath);
			return [isValid ? null : 'Invalid image format', isValid];
		},
		isValid(imagePath) {
			return Validator.image.valid(imagePath)[1];
		},
	},

	imageUrl: {
		valid(imageUrl) {
			const [urlErr, urlOk] = Validator.url.valid(imageUrl);
			const [imgErr, imgOk] = Validator.image.valid(imageUrl);
			return { isValid: urlOk && imgOk, errors: { url: urlErr, image: imgErr } };
		},
		isValid(imageUrl) {
			if (!Validator.url.isValid(imageUrl)) return false;
			return Validator.image.isValid(imageUrl);
		},
	},

	date: {
		valid(dateString) {
			const date = new Date(dateString);
			const isValid = !isNaN(date.getTime());
			return [isValid ? null : 'Invalid date format', isValid];
		},
		isValid(dateString) {
			return Validator.date.valid(dateString)[1];
		},
	},

	categoryCode: {
		valid(code) {
			const isValid = /^CATE_[A-Z0-9_]+$/.test(code);
			return [isValid ? null : 'Invalid category code format', isValid];
		},
		isValid(code) {
			return Validator.categoryCode.valid(code)[1];
		},
	},

	recipeCode: {
		valid(code) {
			const isValid = /^REC_[A-Z0-9_]+$/.test(code);
			return [isValid ? null : 'Invalid recipe code format', isValid];
		},
		isValid(code) {
			return Validator.recipeCode.valid(code)[1];
		},
	},

	id: {
		valid(id) {
			if (!id) return ['ID is required', false];
			const isValid = typeof id === 'string' && id.trim().length > 0;
			return [isValid ? null : 'ID must be a non-empty string', isValid];
		},
		isValid(id) {
			return Validator.id.valid(id)[1];
		},
	},

	string: {
		validLength(str, minLength = 1, maxLength = Infinity) {
			const trimmed = str.trim();
			const isValid = trimmed.length >= minLength && trimmed.length <= maxLength;
			return [isValid ? null : `String length must be between ${minLength} and ${maxLength} characters`, isValid];
		},
		valid(str, minLength = 1, maxLength = Infinity) {
			const [lenErr, lenOk] = Validator.string.validLength(str, minLength, maxLength);
			return { isValid: lenOk, errors: { length: lenErr } };
		},
		isValid(str, minLength = 1, maxLength = Infinity) {
			return Validator.string.validLength(str, minLength, maxLength)[1];
		},
	},

	positiveInteger: {
		valid(num) {
			const isValid = Number.isInteger(num) && num > 0;
			return [isValid ? null : 'Must be a positive integer', isValid];
		},
		isValid(num) {
			return Validator.positiveInteger.valid(num)[1];
		},
	},

	nonNegativeInteger: {
		valid(num) {
			const isValid = Number.isInteger(num) && num >= 0;
			return [isValid ? null : 'Must be a non-negative integer', isValid];
		},
		isValid(num) {
			return Validator.nonNegativeInteger.valid(num)[1];
		},
	},

	roleCode: {
		valid(code) {
			const isValid = /^ROLE_[A-Z_]+$/.test(code);
			return [isValid ? null : 'Invalid role code format, must be ROLE_*', isValid];
		},
		isValid(code) {
			return Validator.roleCode.valid(code)[1];
		},
	},

	dateString: {
		valid(dateString) {
			const date = new Date(dateString);
			const isValid = !isNaN(date.getTime());
			return [isValid ? null : 'Invalid date format', isValid];
		},
		isValid(dateString) {
			return Validator.dateString.valid(dateString)[1];
		},
	},

	dateObject: {
		valid(dateObj) {
			const isValid = dateObj instanceof Date && !isNaN(dateObj.getTime());
			return [isValid ? null : 'Invalid Date object', isValid];
		},
		isValid(dateObj) {
			return Validator.dateObject.valid(dateObj)[1];
		},
	},

	tags: {
		valid(tagsArray) {
			if (!Array.isArray(tagsArray)) return { isValid: false, errors: { type: 'Tags must be an array' } };
			for (const tag of tagsArray) {
				if (typeof tag !== 'string' || tag.trim().length === 0 || tag.trim().length > 20) {
					return { isValid: false, errors: { length: 'Each tag must be 1-20 characters' } };
				}
			}
			return { isValid: true, errors: { length: null } };
		},
		isValid(tagsArray) {
			const result = Validator.tags.valid(tagsArray);
			return result.isValid;
		},
	},
};

export default Validator;
