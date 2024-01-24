interface IBankEvents_BFC {
	'BFC::bank.enable': () => any;
	'BFC::bank.disable': () => any;
	'BFC::bank.setPage': (page: Types.Bank.Windows) => any;

	/**
	 * @param data - stringifyed Types.Bank.IGeneralInfo
	 */
	'BFC::bank.send.generalInfo': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.ITariff[]
	 */
	'BFC::bank.send.tariffs': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.IDepositInfo
	 */
	'BFC::bank.send.depositInfo': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.ITaxes
	 */
	'BFC::bank.send.taxesData': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.IDisbursementsData
	 */
	'BFC::bank.send.disbursementsData': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.IAccount
	 */
	'BFC::bank.send.accountData': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.IOtherInfo
	 */
	'BFC::bank.send.otherInfo': (data: string) => any;

	/**
	 * @param data - stringifyed Types.Bank.IATM
	 */
	'BFC::bank.send.atmData': (data: string) => any;
}
