import { onEvent } from '@/core/decorators/defineEvent.decorator';
import { StoreShared } from '@/store/store';
import { callProc } from '@/utils/callProc';

const store = StoreShared.bank;

export class BankAPI {
    @onEvent('BFC::bank.enable')
    static enable() {
        store.enable();
    }

    @onEvent('BFC::bank.disable')
    static disable() {
        store.disable();
    }

    @onEvent('BFC::bank.setPage')
    static onSetPage(page: Types.Bank.Windows) {
        store.setPage(page);
    }

    @onEvent('BFC::bank.send.accountData')
    static onSendAccountData(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.IAccount;

        store.setAccountData(parsed);
    }

    @onEvent('BFC::bank.send.atmData')
    static onSendATMData(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.IATM;

        store.setATMData(parsed);
    }

    @onEvent('BFC::bank.send.depositInfo')
    static onSendDepositInfo(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.IDepositInfo;

        store.setDepositInfo(parsed);
    }

    @onEvent('BFC::bank.send.disbursementsData')
    static onSendDisbursementsData(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.IDisbursementsData;

        store.setDisbursementsData(parsed);
    }

    @onEvent('BFC::bank.send.generalInfo')
    static onSendGeneralInfo(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.IGeneralInfo;

        store.setGeneralInfo(parsed);
    }

    @onEvent('BFC::bank.send.otherInfo')
    static onSendOtherInfo(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.IOtherInfo;

        store.setOtherInfo(parsed);
    }

    @onEvent('BFC::bank.send.tariffs')
    static onSendTariffs(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.ITariff[];

        store.setTariffsData(parsed);
    }

    @onEvent('BFC::bank.send.taxesData')
    static onSendTaxesData(data: string) {
        const parsed = JSON.parse(data) as Types.Bank.ITaxes;

        store.setTaxesData(parsed);
    }

    //
    static async actionPutMoney(value: number) {
        const result = await callProc<Types.Bank.ISuccessTransfer>('CFBProc::bank.action.topUp', value);

        if (result && result.ok && result.data) {
            store.accountData && store.setAccountData({ ...store.accountData, money: result.data.toValue });
        }

        return result;
    }
    static async actionWithdrawMoney(value: number) {
        const result = await callProc<Types.Bank.ISuccessTransfer>('CFBProc::bank.action.withdraw', value);

        if (result && result.ok && result.data) {
            store.accountData && store.setAccountData({ ...store.accountData, money: result.data.toValue });
        }

        return result;
    }
    static async actionTransferMoney(toAccountID: number, value: number) {
        const result = await callProc<Types.Bank.ISuccessTransfer>(
            'CFBProc::bank.action.transfer',
            String(toAccountID),
            String(value)
        );

        if (!result || !result.data) return;

        store.accountData && store.setAccountData({ ...store.accountData, money: result.data.toValue });

        return result;
    }
    static async actionOpenTariff(tariffType: Types.Bank.TariffType) {
        const res = await callProc<Types.Bank.TariffType>('CFBProc::bank.action.openTariff', tariffType);

        if (!res || !res.data) return res;

        store.accountData && store.setAccountData({ ...store.accountData, tariffType: res.data });

        return res;
    }

    // reqs
    static async reqAccountData() {
        const res = await callProc<Types.Bank.IAccount>('CFBProc::bank.req.accountData');

        if (!res) return;

        if (!res.data) {
            store.setAccountData({
                accountID: -1,
                money: 0,
                tariffType: 'TARIFF_NONE',
                deposit: null,
                cashback: {
                    value: 0,
                    accrualTime: -1,
                },
                isBlocked: false,
                autopaymentActive: false,
            });

            return;
        }

        store.setAccountData(res.data);

        return res;
    }
    static async reqGeneralInfo() {
        const res = await callProc<Types.Bank.IGeneralInfo>('CFBProc::bank.req.generalInfo');

        if (!res || !res.data) return;

        store.setGeneralInfo(res.data);

        return res;
    }
    static async reqTariffs() {
        const res = await callProc<Types.Bank.ITariff[]>('CFBProc::bank.req.tariffs');

        if (!res || !res.data) return;

        store.setTariffsData(res.data);

        return res;
    }
    static async reqDepositInfo() {
        const res = await callProc<Types.Bank.IDepositInfo>('CFBProc::bank.req.depositInfo');

        if (!res || !res.data) return;

        store.setDepositInfo(res.data);

        return res;
    }
    static async reqTaxesData() {
        const res = await callProc<Types.Bank.ITaxes>('CFBProc::bank.req.taxesData');

        if (!res || !res.data) return;

        store.setTaxesData(res.data);

        return res;
    }
    static async reqDisburesmentsData() {
        const res = await callProc<Types.Bank.IDisbursementsData>('CFBProc::bank.req.disbursementsData');

        if (!res || !res.data) return;

        store.setDisbursementsData(res.data);

        return res;
    }
    static async reqOtherInfo() {
        const res = await callProc<Types.Bank.IOtherInfo>('CFBProc::bank.req.otherInfo');

        if (res && res.ok && res.data) {
            store.setOtherInfo(res.data);
        }

        return res;
    }
    static async reqATMData() {
        const res = await callProc<Types.Bank.IATM>('CFBProc::bank.req.atmData');

        if (res && res.ok && res.data) {
            store.setATMData(res.data);
        }

        return res;
    }
    static async reqPenalties() {
        const res = await callProc<Types.Bank.IPenaltiesData>('CFBProc::bank.req.penalties');

        if (res && res.ok && res.data) {
            store.setPenaltiesData(res.data);
        }

        return res;
    }

    static async actionTaxesPay(taxType: Types.Bank.TaxType, id: number | string) {
        const result = await callProc<Types.Bank.ISuccessTransfer>('CFBProc::bank.action.taxes.pay', taxType, id);

        return result;
    }

    static async actionTaxesToggleAutopayment(state: boolean) {
        const res = await callProc<boolean>('CFBProc::bank.action.toggleAutopayment', state);

        return res;
    }

    static async actionDisbursementsTake(uuid: string, type: Types.Disbursement.DisbursementTypes) {
        return await callProc<boolean>('CFBProc::bank.action.disbursements.take', uuid, type);
    }

    static async actionDisbursementsTakeAll() {
        return await callProc<boolean>('CFBProc::bank.action.disbursements.takeAll');
    }

    static async actionDepositOpen(weeks: number, value: number) {
        return await callProc<boolean>('CFBProc::bank.action.deposit.open', weeks, value);
    }

    static async actionDepositClose() {
        return await callProc<boolean>('CFBProc::bank.action.deposit.close');
    }

    static async actionPenaltiesPay(id: number) {
        return await callProc<Types.Bank.ISuccessTransfer>('CFBProc::bank.action.penalties.pay', id);
    }
    static async actionPenaltiesPayAll() {
        return await callProc<Types.Bank.ISuccessTransfer>('CFBProc::bank.action.penalties.payAll');
    }

    static async actionSimcardPay(simNuber: number, value: number) {
        return await callProc<Types.Bank.ISuccessTransfer>('CFBProc::bank.action.simcard.pay', simNuber, value);
    }
}
