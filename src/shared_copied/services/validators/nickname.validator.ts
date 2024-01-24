import validator from 'validator';

const _isValid = (value: string) => {
	const config = {
		min: 2,
		max: 36,
		regexp: /^[a-zA-Z_]+$/
	};

	const isRegexValid = validator.matches(value, config.regexp);
	const isLengthValid = validator.isLength(value, {
		min: config.min,
		max: config.max
	});

	return isRegexValid && isLengthValid;
};

export const _nickname = {
	isValid: _isValid
};
