import { action, makeAutoObservable, observable } from 'mobx';

export class Bank {
    private _active: boolean = false;
    get active() {
        return this._active;
    }

    private _pages: Types.Bank.Windows = 'WINDOW_BANK';
    get pages() {
        return this._pages;
    }

    private _ATMData: Types.Bank.IATM | null = null;
    // private _ATMData: Types.Bank.IATM = {
    //     accountID: -1,
    //     tariffType: 'TARIFF_NONE',
    //     money: 0,
    //     cash: 0,
    //     isBlocked: false,
    //     blockedReason: '',
    // };
    get ATMData() {
        return this._ATMData;
    }

    private _generalInfo: Types.Bank.IGeneralInfo | null = null;
    // private _generalInfo: Types.Bank.IGeneralInfo = {
    //     mostPopularWithdrawValues: [0],
    //     mostPopularTransferValues: [0],
    //     maxPenaltiesValue: 100,
    // };
    get generalInfo() {
        return this._generalInfo;
    }

    private _tariffs: Types.Bank.ITariff[] = [];
    // private _tariffs: Types.Bank.ITariff[] = [
    //     {
    //         type: 'TARIFF_CLASSIC',
    //         name: 'Classic',
    //         minLvl: 1,
    //         price: 0,
    //         isPopular: false,
    //         limits: {
    //             storageLimit: 50000,
    //             withdrawPerOneOp: 2000,
    //             withdrawPerDay: 30000,
    //             transPerOneOp: 5000,
    //             transPerDay: 20000,
    //             feePerDay: 1000,
    //             transPercent: 5,
    //             withdrawPercent: 5,
    //             isCashbackAvailable: false,
    //         },
    //     },
    //     {
    //         type: 'TARIFF_GOLD',
    //         name: 'Gold',
    //         minLvl: 5,
    //         price: 5000,
    //         isPopular: false,
    //         limits: {
    //             storageLimit: 50000,
    //             withdrawPerOneOp: 2000,
    //             withdrawPerDay: 30000,
    //             transPerOneOp: 5000,
    //             transPerDay: 20000,
    //             feePerDay: 1000,
    //             transPercent: 5,
    //             withdrawPercent: 5,
    //             isCashbackAvailable: true,
    //         },
    //     },
    //     {
    //         type: 'TARIFF_PLATINUM',
    //         name: 'Platinum',
    //         minLvl: 7,
    //         price: 20000,
    //         isPopular: false,
    //         limits: {
    //             storageLimit: 50000,
    //             withdrawPerOneOp: 2000,
    //             withdrawPerDay: 30000,
    //             transPerOneOp: 5000,
    //             transPerDay: 20000,
    //             feePerDay: 1000,
    //             transPercent: 5,
    //             withdrawPercent: 5,
    //             isCashbackAvailable: true,
    //         },
    //     },
    //     {
    //         type: 'TARIFF_PREMIUM',
    //         name: 'Premium',
    //         minLvl: 1,
    //         price: 1500,
    //         isPopular: true,
    //         limits: {
    //             storageLimit: 9999999999,
    //             withdrawPerOneOp: 2000,
    //             withdrawPerDay: 30000,
    //             transPerOneOp: 5000,
    //             transPerDay: 20000,
    //             feePerDay: 1000,
    //             transPercent: 5,
    //             withdrawPercent: 5,
    //             isCashbackAvailable: true,
    //         },
    //     },
    // ];
    get tariffs() {
        return this._tariffs;
    }

    private _depositInfo: Types.Bank.IDepositInfo | null = null;
    // private _depositInfo: Types.Bank.IDepositInfo | null = {
    //     maxValue: 300000,
    //     periodWeaks: [1, 2, 3, 4],
    //     percentOfDeposit: 2.5,
    //     vipMultiplier: 2,
    //     earlyClosePenaltyPercent: 2.5,
    // };
    get depositInfo() {
        return this._depositInfo;
    }

    @observable.deep
    private _taxesData: Types.Bank.ITaxes | null = null;
    // private _taxesData: Types.Bank.ITaxes | null = {
    //     list: [
    //         {
    //             id: 10,
    //             name: 'Holiday Home',
    //             estateType: 'HOUSE',
    //             estateClass: 'HOUSE_VILLA',
    //             type: 'TAX_HOUSES',
    //             value: 100000,
    //         },
    //         {
    //             id: 12,
    //             name: 'Holiday APART',
    //             estateType: 'APART',
    //             estateClass: 'HOUSE_ECO',
    //             type: 'TAX_APARTS',
    //             value: 124124,
    //         },
    //         {
    //             id: 22,
    //             uuid: '05c9c574-1e14-5ba0-a422-be7f53d1614a',
    //             name: 'Elegy',
    //             type: 'TAX_CARS',
    //             value: 30000,
    //         },
    //         {
    //             id: 2228,
    //             name: 'Шоколадница',
    //             type: 'TAX_BUSINESSES',
    //             value: 299999,
    //         },
    //     ],
    // };
    get taxesData() {
        return this._taxesData;
    }

    @observable.deep
    private _disbursementsData: Types.Bank.IDisbursementsData | null = null;
    // private _disbursementsData: Types.Bank.IDisbursementsData = {
    //     list: [
    //         {
    //             characterUUID: '0f9e8f27-2f21-5936-bed7-4ea163612cb7',
    //             uuid: '9a4dfea3-b471-5baf-8ed3-7c6dd4db5f64',
    //             type: 'DISBURSEMENT_CAR',
    //             value: 10000,
    //             dateUnix: 1698472290446,
    //             title: 'Audi RS 7',
    //             desc: 'x777xx77',
    //         },
    //         {
    //             characterUUID: '36e04468-00f7-5f5a-9142-a35e23532253',
    //             uuid: 'b556f096-4ab0-5f53-97f1-0e4aad55aee1',
    //             type: 'DISBURSEMENT_ESTATE_APART',
    //             value: 10000,
    //             dateUnix: 1698472290446,
    //             title: 'Домик',
    //             desc: 'Хуемик',
    //         },
    //     ],
    // };
    get disbursementsData() {
        return this._disbursementsData;
    }

    @observable.deep
    private _penaltiesData: Types.Bank.IPenaltiesData | null = null;
    // private _penaltiesData: Types.Bank.IPenaltiesData | null = {
    //     list: [
    //         {
    //             id: 12,
    //             issuedCID: 'ABCDEF',
    //             issuedNickname: 'Ramses Flipsize',
    //             value: 30000,
    //             dateUnix: 0,
    //             characterUUID: 'random',
    //             type: 'PENALTY_AC',
    //             isPaid: false,
    //         },
    //     ],
    // };
    get penaltiesData() {
        return this._penaltiesData;
    }

    private _accountData: Types.Bank.IAccount | null = null;
    // private _accountData: Types.Bank.IAccount = {
    //     accountID: 4276540023598687,
    //     money: 1270000,
    //     tariffType: 'TARIFF_GOLD',
    //     deposit: null,
    //     // deposit: {
    //     //     value: 144444,
    //     //     income: 166666,
    //     //     rate: 2.5,
    //     //     periodDays: 3,
    //     //     totalDays: 28,
    //     //     percentOfEarlyWithdraw: 5,
    //     // },
    //     cashback: {
    //         value: 200,
    //         accrualTime: 1698472290446,
    //     },
    //     isBlocked: false,
    //     blockedReason: 'Неизвестно',
    //     autopaymentActive: false,
    // };
    get accountData() {
        return this._accountData;
    }

    private _otherInfo: Types.Bank.IOtherInfo = {
        cash: 0,
    };
    get otherInfo() {
        return this._otherInfo;
    }

    @observable.deep
    private _notify: TypesUI.Bank.INotify | null = null;
    get notify() {
        return this._notify;
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

    dispose() {}

    @action
    setNotify(notifyData: TypesUI.Bank.INotifyData | null, timeMS: number = 5000) {
        if (this._notify) {
            this.clearNotify();
        }

        this._notify = notifyData;

        if (notifyData) {
            this._notify!.timeout = setTimeout(() => {
                this.clearNotify();
            }, timeMS);
        }
    }
    clearNotify() {
        if (!this._notify) return;

        this._notify.timeout && clearTimeout(this._notify.timeout);
        this._notify = null;
    }

    setPage(page: Types.Bank.Windows) {
        this._pages = page;
    }

    setAccountData(data: Types.Bank.IAccount) {
        this._accountData = data;
    }

    setGeneralInfo(data: Types.Bank.IGeneralInfo | null) {
        this._generalInfo = data;
    }

    setTariffsData(data: Types.Bank.ITariff[]) {
        this._tariffs = data;
    }

    setOtherInfo(data: Types.Bank.IOtherInfo) {
        this._otherInfo = data;
    }

    setDepositInfo(data: Types.Bank.IDepositInfo) {
        this._depositInfo = data;
    }

    setATMData(data: Types.Bank.IATM | null) {
        this._ATMData = data;
    }

    setDisbursementsData(data: Types.Bank.IDisbursementsData) {
        this._disbursementsData = data;
    }
    removeDisbursement(uuid: string) {
        if (!this._disbursementsData) return;

        const target = this._disbursementsData.list.find((x) => x.uuid);

        if (!target) return;

        const idxOf = this._disbursementsData.list.indexOf(target);

        if (idxOf === -1) return;

        this._disbursementsData.list.splice(idxOf);
    }
    setPenaltiesData(data: Types.Bank.IPenaltiesData | null) {
        this._penaltiesData = data;
    }
    removePenalty(id: number) {
        if (!this._penaltiesData) return;

        const target = this._penaltiesData.list.find((x) => x.id === id);

        if (!target) return;

        const indexOf = this._penaltiesData.list.indexOf(target);

        if (indexOf === -1) return;

        this._penaltiesData?.list.splice(indexOf, 1);
    }
    removeAllPenalties() {
        if (!this._penaltiesData) return;

        this._penaltiesData.list = [];
    }
    setTaxesData(data: Types.Bank.ITaxes | null) {
        this._taxesData = data;
    }
    removeTaxesItem(type: Types.Bank.TaxType, id: number | string) {
        if (!this._taxesData) return;

        const target = this._taxesData.list.find((x) => x.type === type && x.id === id);

        if (!target) return;

        const idxOf = this._taxesData.list.indexOf(target);

        if (idxOf === -1) return;

        this._taxesData?.list.splice(idxOf, 1);
    }
}
