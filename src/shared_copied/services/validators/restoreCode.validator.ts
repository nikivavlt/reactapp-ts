import validator from 'validator';

const _isValid = (value: string) => {
	const isLength = validator.isLength(value, {
		min: 6,
		max: 6
	});
	const isNumeric = validator.isNumeric(value);

	return isLength && isNumeric;
};

export const _restoreCode = {
	isValid: _isValid
};
