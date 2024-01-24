import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../../../../store/store';

import logoSVG from '../../assets/media/logoSVG.svg';

import { Main } from './components/Main';
import { Tariff } from './components/Tariff';

import { PutModal } from '../../modal/PutModal';
import { PaymentsModal } from '../../modal/PaymentsModal';
import { DepositModal } from '../../modal/DepositModal';
import { PenaltiesModal } from '../../modal/PenaltiesModal';
import { TaxesModal } from '../../modal/TaxesModal/TaxesModal';
import { BankNotifyUtils } from '../../utils/bank.notify.utils';
import { API } from '@/api/api';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';
import { trigger } from '@/utils';

export const Account = observer(() => {
    const store = useContext(StoreContext).bank;
    const [modal, setModal] = useState<TypesUI.Bank.ModalMAIN | null>('TARRIF');
    const [page, setPage] = useState<TypesUI.Bank.AccountPages>('NOTARIFF');
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    const modalText: TypesUI.Bank.ModalMAIN[] = ['PUT', 'WITHDRAW', 'TRANSFER', 'TAX', 'TICKET', 'PAY', 'DEPOSIT'];

    const clickItem = async (idx: number) => {
        const target = modalText[idx];

        if (target !== undefined) {
            if (target === 'TAX') {
                await API.bank.reqTaxesData();

                if (!store.taxesData?.list.length) {
                    return BankNotifyUtils.push('INFO', 'Уведомление', 'У Вас нет неоплаченных налогов');
                }
            }
            if (target === 'TICKET') {
                await API.bank.reqPenalties();

                if (!store.penaltiesData?.list.length) {
                    return BankNotifyUtils.push('INFO', 'Уведомление', 'У Вас нет неоплаченных штрафов');
                }
            }
            if (target === 'PAY') {
                await API.bank.reqDisburesmentsData();

                if (!store.disbursementsData?.list.length) {
                    return BankNotifyUtils.push('INFO', 'Уведомление', 'У Вас нет доступных выплат');
                }
            }
        }

        idx !== modalText.length ? setModal(modalText[idx]) : setPage('TARIFF');
    };

    const onActionPut = async (value: number) => {
        if (value <= 0) return;

        const result = await API.bank.actionPutMoney(value);

        if (!result) return BankNotifyUtils.pushServerError();
        if (!result.ok) return BankNotifyUtils.pushError(result.message);

        API.bank.reqAccountData();

        BankNotifyUtils.push('FILL', undefined, `${result.data?.fromValue || 0}|${result.data?.toValue || 0}`);
    };
    const onActionWithdraw = async (value: number) => {
        if (value <= 0) return;

        const result = await API.bank.actionWithdrawMoney(value);

        if (!result) return BankNotifyUtils.pushServerError();
        if (!result.ok) return BankNotifyUtils.pushError(result.message);

        API.bank.reqAccountData();

        BankNotifyUtils.push('TAKE', undefined, `${result.data?.fromValue || 0}|${result.data?.toValue || 0}`);
    };
    const onActionTransfer = async (value: number, targetAccountID: number) => {
        if (value <= 0) return;
        if (targetAccountID < 1000000000000000 || targetAccountID > 9999999999999999) return;

        const result = await API.bank.actionTransferMoney(targetAccountID, value);

        if (!result) return BankNotifyUtils.pushServerError();
        if (!result.ok) return BankNotifyUtils.pushError(result.message);

        API.bank.reqAccountData();

        BankNotifyUtils.push(
            'TRANSACTION_OK',
            undefined,
            `${result.data?.fromValue || 0}|${result.data?.toValue || 0}`
        );
    };

    const onClickAsideModal = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.parentElement?.className === 'account__container' && modal) {
                setModal(null);
            }
        },
        [modal]
    );

    const onClickCreateAccount = () => {
        setPage('TARIFF');
    };

    const noTariffModal = () => {
        return (
            <div className="no-tariff-modal">
                <div className="content">
                    <div className="info">
                        <h1>Сейчас у Вас нет активных счетов</h1>
                        <h2>Откройте счет и начните пользоваться услугами банка</h2>
                    </div>
                    <button onClick={() => onClickCreateAccount()}>Открыть счет</button>
                </div>
            </div>
        );
    };

    const onClickClose = () => {
        store.disable();
        store.dispose();

        trigger('CFB::bank.onClosed');
    };

    useEffect(() => {
        document.addEventListener('mousedown', onClickAsideModal);

        return () => {
            document.removeEventListener('mousedown', onClickAsideModal);
        };
    }, [onClickAsideModal]);

    useEffect(() => {
        if (store.accountData?.tariffType === 'TARIFF_NONE') {
            setPage('NOTARIFF');
        } else {
            setPage('MAIN');
        }
    }, [store.accountData?.tariffType]);

    return (
        <section className="account">
            <div className="account__container">
                <div className="account__header">
                    <div className="account__header_logo">
                        <img src={logoSVG} alt="" />
                        <div>
                            Emirates&nbsp;
                            <div>NDB</div>
                        </div>
                    </div>
                    <button className="account__header_close" ref={closeBtnRef} onClick={() => onClickClose()}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                className="account__header_close__btn"
                                d="M0.337954 0.337954C0.788559 -0.112651 1.51913 -0.112651 1.96974 0.337954L5.00002 3.36823L8.03026 0.337985C8.48087 -0.11262 9.21144 -0.11262 9.66205 0.337985C10.1127 0.78859 10.1127 1.51917 9.66205 1.96977L6.6318 5.00002L9.66201 8.03023C10.1126 8.48084 10.1126 9.21141 9.66201 9.66202C9.21141 10.1126 8.48083 10.1126 8.03023 9.66202L5.00002 6.6318L1.96977 9.66205C1.51917 10.1127 0.788592 10.1127 0.337987 9.66205C-0.112618 9.21144 -0.112618 8.48087 0.337987 8.03026L3.36823 5.00002L0.337954 1.96974C-0.112651 1.51913 -0.112651 0.788559 0.337954 0.337954Z"
                                fill={closeBtnRef.current?.onmouseover ? '#fff' : '#3984F4'}
                            />
                        </svg>
                    </button>
                </div>

                {page === 'NOTARIFF' && noTariffModal()}
                {page === 'MAIN' && <Main onClickItem={(idx: number) => clickItem(idx)} />}
                {page === 'TARIFF' && (
                    <Tariff
                        onClickBack={() =>
                            store.accountData?.tariffType === 'TARIFF_NONE' ? setPage('NOTARIFF') : setPage('MAIN')
                        }
                    />
                )}

                {(modal === 'PUT' || modal === 'WITHDRAW' || modal === 'TRANSFER') /*  || modal === 'DEPOSIT' */ && (
                    <PutModal
                        modal={modal}
                        headerImg={undefined}
                        type={
                            modal === 'WITHDRAW' || modal === 'TRANSFER' || modal === 'PUT'
                                ? store.accountData?.tariffType
                                : undefined
                        }
                        headerTitle={numberSpacesFormatter(
                            store.pages === 'WINDOW_BANK' ? store.accountData?.money || 0 : store.ATMData?.money || 0
                        )}
                        onClick={(value: number, addictional?: string) => {
                            if (modal === 'PUT') {
                                return onActionPut(value);
                            }

                            if (modal === 'WITHDRAW') {
                                return onActionWithdraw(value);
                            }

                            if (modal === 'TRANSFER') {
                                return onActionTransfer(value, parseInt(addictional || '-1'));
                            }
                        }}
                    />
                )}
                {modal === 'PAY' && <PaymentsModal />}
                {modal === 'DEPOSIT' && <DepositModal />}
                {modal === 'TICKET' && <PenaltiesModal />}
                {modal === 'TAX' && <TaxesModal />}

                <div className="account__footer">
                    <div>© 2007—{new Date().getFullYear()}, АО «Emirates NDB»</div>
                </div>
            </div>
        </section>
    );
});
