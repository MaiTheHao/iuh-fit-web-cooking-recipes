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

	ratingStars: {
		valid(stars) {
			const isValid = Number.isInteger(stars) && stars >= 0 && stars <= 5;
			return { isValid: isValid, errors: { format: isValid ? null : 'Stars must be an integer between 0 and 5' } };
		},
		isValid(stars) {
			return Validator.ratingStars.valid(stars).isValid;
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
			let isValidUrl = false;
			try {
				new URL(url);
				isValidUrl = true;
			} catch {
				isValidUrl = false;
				return { isValid: false, errors: { format: 'Invalid URL format' } };
			} finally {
				return { isValid: isValidUrl, errors: { format: isValidUrl ? null : 'Invalid URL format' } };
			}
		},
		isValid(url) {
			return Validator.url.valid(url).isValid;
		},
	},

	image: {
		valid(imagePath) {
			if (!imagePath) return { isValid: false, errors: { format: 'Image path is required' } };

			const commonExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
			const bingPattern = /\/th\/id\/OIP\.[\w-]+/i;
			const isValid = commonExtensions.test(imagePath) || bingPattern.test(imagePath);

			return {
				isValid,
				errors: { format: isValid ? null : 'Invalid image format' },
			};
		},

		isValid(imagePath) {
			return this.valid(imagePath).isValid;
		},
	},

	imageUrl: {
		valid(imageUrl) {
			const { errors: urlErr, isValid: urlOk } = Validator.url.valid(imageUrl);
			const { errors: imgErr, isValid: imgOk } = Validator.image.valid(imageUrl);
			return { isValid: urlOk && imgOk, errors: { urlFormat: urlErr.format, imageFormat: imgErr.format } };
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
			return { isValid: isValid, errors: { format: isValid ? null : 'Invalid date format' } };
		},
		isValid(dateString) {
			return Validator.date.valid(dateString).isValid;
		},
	},

	categoryCode: {
		valid(code) {
			const isValid = /^CATE_[A-Z0-9_]+$/.test(code);
			return { isValid: isValid, errors: { format: isValid ? null : 'Invalid category code format' } };
		},
		isValid(code) {
			return Validator.categoryCode.valid(code).isValid;
		},
	},

	recipeCode: {
		valid(code) {
			const isValid = /^REC_[A-Z0-9_]+$/.test(code);
			return { isValid: isValid, errors: { format: isValid ? null : 'Invalid recipe code format' } };
		},
		isValid(code) {
			return Validator.recipeCode.valid(code).isValid;
		},
	},

	recipeNutrition: {
		valid(nutrition) {
			if (typeof nutrition !== 'object' || nutrition === null) {
				return { isValid: false, errors: { type: 'Nutrition must be an object' } };
			}
			const errors = {};
			let isValid = true;

			if (nutrition.calories !== undefined && nutrition.calories !== null) {
				if (typeof nutrition.calories !== 'number' || nutrition.calories < 0 || nutrition.calories > 10000) {
					isValid = false;
					errors.calories = 'calories must be a number between 0 and 10000';
				} else {
					errors.calories = null;
				}
			} else {
				errors.calories = null;
			}

			if (nutrition.protein !== undefined && nutrition.protein !== null) {
				if (typeof nutrition.protein !== 'number' || nutrition.protein < 0 || nutrition.protein > 1000) {
					isValid = false;
					errors.protein = 'protein must be a number between 0 and 1000';
				} else {
					errors.protein = null;
				}
			} else {
				errors.protein = null;
			}

			if (nutrition.fat !== undefined && nutrition.fat !== null) {
				if (typeof nutrition.fat !== 'number' || nutrition.fat < 0 || nutrition.fat > 1000) {
					isValid = false;
					errors.fat = 'fat must be a number between 0 and 1000';
				} else {
					errors.fat = null;
				}
			} else {
				errors.fat = null;
			}

			if (nutrition.carbs !== undefined && nutrition.carbs !== null) {
				if (typeof nutrition.carbs !== 'number' || nutrition.carbs < 0 || nutrition.carbs > 1000) {
					isValid = false;
					errors.carbs = 'carbs must be a number between 0 and 1000';
				} else {
					errors.carbs = null;
				}
			} else {
				errors.carbs = null;
			}

			if (nutrition.cholesterol !== undefined && nutrition.cholesterol !== null) {
				if (typeof nutrition.cholesterol !== 'number' || nutrition.cholesterol < 0 || nutrition.cholesterol > 5000) {
					isValid = false;
					errors.cholesterol = 'cholesterol must be a number between 0 and 5000';
				} else {
					errors.cholesterol = null;
				}
			} else {
				errors.cholesterol = null;
			}

			return { isValid, errors };
		},
		isValid(nutrition) {
			return Validator.recipeNutrition.valid(nutrition).isValid;
		},
	},

	id: {
		valid(id) {
			if (!id) return { isValid: false, errors: { required: 'ID is required' } };
			const isValid = typeof id === 'string' && id.trim().length > 0;
			return { isValid: isValid, errors: { format: isValid ? null : 'ID must be a non-empty string' } };
		},
		isValid(id) {
			return Validator.id.valid(id).isValid;
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
			return { isValid: isValid, errors: { format: isValid ? null : 'Must be a positive integer' } };
		},
		isValid(num) {
			return Validator.positiveInteger.valid(num).isValid;
		},
	},

	nonNegativeInteger: {
		valid(num) {
			const isValid = Number.isInteger(num) && num >= 0;
			return { isValid: isValid, errors: { format: isValid ? null : 'Must be a non-negative integer' } };
		},
		isValid(num) {
			return Validator.nonNegativeInteger.valid(num).isValid;
		},
	},

	roleCode: {
		valid(code) {
			const isValid = /^ROLE_[A-Z_]+$/.test(code);
			return { isValid: isValid, errors: { format: isValid ? null : 'Invalid role code format, must be ROLE_*' } };
		},
		isValid(code) {
			return Validator.roleCode.valid(code).isValid;
		},
	},

	dateString: {
		valid(dateString) {
			const date = new Date(dateString);
			const isValid = !isNaN(date.getTime());
			return { isValid: isValid, errors: { format: isValid ? null : 'Invalid date format' } };
		},
		isValid(dateString) {
			return Validator.dateString.valid(dateString).isValid;
		},
	},

	dateObject: {
		valid(dateObj) {
			const isValid = dateObj instanceof Date && !isNaN(dateObj.getTime());
			return { isValid: isValid, errors: { format: isValid ? null : 'Invalid Date object' } };
		},
		isValid(dateObj) {
			return Validator.dateObject.valid(dateObj).isValid;
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
