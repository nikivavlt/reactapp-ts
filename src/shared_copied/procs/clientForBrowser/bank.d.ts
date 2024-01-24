/**
 *
 */

// Types.Bank.

interface IBankProcs_CFB {
	/**
	 * @returns Types.Bank.IGeneralInfo
	 */
	'CFBProc::bank.req.generalInfo': () => Promise<string>;
	/**
	 * @returns Types.Bank.ITariff[]
	 */
	'CFBProc::bank.req.tariffs': () => Promise<string>;
	/**
	 * @returns Types.Bank.IDepositInfo
	 */
	'CFBProc::bank.req.depositInfo': () => Promise<string>;
	/**
	 * @returns Types.Bank.ITaxes
	 */
	'CFBProc::bank.req.taxesData': () => Promise<string>;
	/**
	 * @returns Types.Bank.IDisbursementsData
	 */
	'CFBProc::bank.req.disbursementsData': () => Promise<string>;
	/**
	 * @returns Types.Bank.IAccount
	 */
	'CFBProc::bank.req.accountData': () => Promise<string>;
	/**
	 * @returns Types.Bank.IOtherInfo
	 */
	'CFBProc::bank.req.otherInfo': () => Promise<string>;
	/**
	 * @returns Types.Bank.IATM
	 */
	'CFBProc::bank.req.atmData': () => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.req.penalties': () => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.withdraw': (value: number) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.topUp': (value: number) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.transfer': (targetAccountID: number, value: number) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 * @abstract "id" can be is UUID or numeric ID
	 */
	'CFBProc::bank.action.taxes.pay': (taxType: Types.Bank.TaxType, id: number | string) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<boolean | undefined>
	 */
	'CFBProc::bank.action.disbursements.take': (uuid: string, type: Types.Disbursement.DisbursementTypes) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<boolean | undefined>
	 */
	'CFBProc::bank.action.disbursements.takeAll': () => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.deposit.open': (weeks: number, value: number) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.deposit.close': () => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.penalties.pay': (id: number) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.penalties.payAll': () => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.ISuccessTransfer | undefined>
	 */
	'CFBProc::bank.action.simcard.pay': (simNuber: number, value: number) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<Types.Bank.TariffType | undefined>
	 */
	'CFBProc::bank.action.openTariff': (tariffType: Types.Bank.TariffType) => Promise<string>;
	/**
	 * @returns Types.Global.IResponse<boolean | undefined>
	 */
	'CFBProc::bank.action.toggleAutopayment': (state: boolean) => Promise<string>;
}
