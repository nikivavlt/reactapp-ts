import validator from 'validator';

const _isValid = (value: string) => {
	const isEmailValid = validator.isEmail(value);

	return isEmailValid;
};

export const _email = {
	isValid: _isValid
};
