import validator from 'validator';

const isValid = (value: string) => {
	const cfg = {
		min: 8,
		max: 64
	};

	const isValidLength = validator.isLength(value, {
		min: cfg.min,
		max: cfg.max
	});

	return isValidLength;
};

export const _password = {
	isValid
};
