declare namespace Types {
	namespace Bank {
		type Windows = 'WINDOW_BANK' | 'WINDOW_ATM';

		interface IATM {
			accountID: number;
			tariffType: TariffType;
			money: number;
			cash: number;
			isBlocked: boolean;
			blockedReason?: string;
		}

		interface IGeneralInfo {
			mostPopularWithdrawValues: number[];
			mostPopularTransferValues: number[];
			maxPenaltiesValue: number;
		}

		type TariffType = 'TARIFF_NONE' | 'TARIFF_CLASSIC' | 'TARIFF_GOLD' | 'TARIFF_PLATINUM' | 'TARIFF_PREMIUM';

		interface ITariff {
			type: TariffType;
			name: string;
			minLvl: number;
			price: number;
			isPopular: boolean;
			limits: ITariffLimits;
		}
		interface ITariffLimits {
			storageLimit: number;
			withdrawPerOneOp: number;
			withdrawPerDay: number;
			transPerOneOp: number;
			transPerDay: number;
			feePerDay: number;
			transPercent: number;
			withdrawPercent: number;
			isCashbackAvailable: boolean;
		}

		interface ICashback {
			value: number;
			accrualTime: number;
		}

		interface IDepositInfo {
			maxValue: number;
			periodWeaks: number[];
			percentOfDeposit: number;
			vipMultiplier: number;
			earlyClosePenaltyPercent: number;
		}

		interface IDeposit {
			value: number;
			income: number;
			rate: number;
			periodDays: number;
			totalDays: number;
			percentOfEarlyWithdraw: number;
		}

		type TaxType = 'TAX_HOUSES' | 'TAX_APARTS' | 'TAX_CARS' | 'TAX_BUSINESSES';
		interface ITaxItem {
			type: TaxType;
			value: number;
		}
		interface ITaxItemEstate extends ITaxItem {
			id: number;
			name: string;
			estateType: Types.Estate.EstateType;
		}
		interface ITaxItemHouse extends ITaxItemEstate {
			estateClass: Types.Estate.HouseClass;
		}
		interface ITaxItemApart extends ITaxItemEstate {
			estateClass: Types.Estate.ApartClass;
		}

		interface ITaxCar extends ITaxItem {
			id: number;
			uuid: string;
			name: string;
		}
		interface ITaxBusiness extends ITaxItem {
			id: number;
			name: string;
		}

		interface ITaxes {
			list: (ITaxItemHouse | ITaxItemApart | ITaxCar | ITaxBusiness)[];
		}

		interface IDisbursementsData {
			list: Types.Disbursement.IDisbursement[];
		}

		interface IPenaltiesData {
			list: Types.Penalties.IPenalty[];
		}

		interface IAccount {
			accountID: number;
			money: number;
			tariffType: TariffType;
			deposit: IDeposit | null;
			cashback: ICashback;
			isBlocked: boolean;
			blockedReason?: string;
			autopaymentActive: boolean;
		}

		interface IOtherInfo {
			cash: number;
		}

		interface ISuccessTransfer {
			fromValue: number;
			toValue: number;
		}
	}
}
