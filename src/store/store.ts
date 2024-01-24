import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

import { Bank } from './bank.store';
import { GlobalStore } from './global.store';

class Store {
    private _active: boolean = true;
    get active() {
        return this._active;
    }

    private _bank = new Bank();
    get bank() {
        return this._bank;
    }

    private _globalStore = new GlobalStore();
    get global() {
        return this._globalStore;
    }

    constructor() {
        makeAutoObservable(this);
    }

    enable() {
        this._active = true;
    }
    disable() {
        this._active = false;
    }
}

export const StoreShared = new Store();
export const StoreContext = createContext(StoreShared);
