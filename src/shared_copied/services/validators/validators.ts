import { _email } from './email.validator';
import { _login } from './login.validator';
import { _nickname } from './nickname.validator';
import { _password } from './password.validator';
import { _restoreCode } from './restoreCode.validator';

export const _validators = {
	login: _login,
	password: _password,
	email: _email,
	restoreCode: _restoreCode,
	nickname: _nickname
};
