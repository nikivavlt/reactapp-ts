import { makeAutoObservable } from 'mobx';

export class GlobalStore {
	private _capsLockState: boolean = false;
	private _keyboardLanguage: string | null = null;

	get capsLockState() {
		return this._capsLockState;
	}
	get keyboardLanguage() {
		return this._keyboardLanguage;
	}

	constructor() {
		makeAutoObservable(this);
	}

	setCapsLockState(state: boolean) {
		this._capsLockState = state;
	}
	setKeyboardLanguage(value: null | 'RU' | 'ENG') {
		this._keyboardLanguage = value;
	}
}
