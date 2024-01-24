import { useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../../../../store/store';

import simSVG from '../../assets/media/icons/simSVG.svg';

import { Block } from '../../components/Block';
import { PutModal } from '../../modal/PutModal';
import { ChristSVG } from '@/components/SVG/ChristSVG/ChristSVG';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';
import { trigger } from '@/utils';
import { callProc } from '@/utils/callProc';
import { BankNotifyUtils } from '../../utils/bank.notify.utils';
import { API } from '@/api/api';

export const ATM = observer(() => {
    const store = useContext(StoreContext).bank;
    const [modal, setModal] = useState<TypesUI.Bank.ModalATM | null>(null);

    const init = async () => {
        const atmData = await callProc<Types.Bank.IATM>('CFBProc::bank.req.atmData');

        if (!atmData || !atmData.data || !atmData.ok) return;

        store.setATMData(atmData.data);
    };

    const convertMoney = (money: number) => {
        return money <= 9999 ? money.toString() : money.toLocaleString('ru-RU');
    };

    const onClickCloseBtn = () => {
        store.disable();
        store.dispose();

        trigger('CFB::bank.onClosed');
    };

    const onClickBlockAccept = () => {
        store.disable();
        store.dispose();

        trigger('CFB::bank.onClosed');
    };

    const onClickAsideModal = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.parentElement?.className === 'atm' && modal) {
                setModal(null);
            }
        },
        [modal]
    );

    const onActionPut = async (value: number) => {
        if (value <= 0) return;

        const result = await API.bank.actionPutMoney(value);

        if (!result) return BankNotifyUtils.pushServerError();
        if (!result.ok) return BankNotifyUtils.pushError(result.message);

        await API.bank.reqATMData();

        BankNotifyUtils.push('FILL', undefined, `${result.data?.fromValue || 0}|${result.data?.toValue || 0}`);
    };
    const onActionWithdraw = async (value: number) => {
        if (value <= 0) return;

        const result = await API.bank.actionWithdrawMoney(value);

        if (!result) return BankNotifyUtils.pushServerError();
        if (!result.ok) return BankNotifyUtils.pushError(result.message);

        API.bank.reqATMData();

        BankNotifyUtils.push('TAKE', undefined, `${result.data?.fromValue || 0}|${result.data?.toValue || 0}`);
    };
    const onActionSimcardPay = async (phoneNumber: number, val: number) => {
        if (val <= 0) return;

        const result = await API.bank.actionSimcardPay(phoneNumber, val);

        if (!result) return BankNotifyUtils.pushServerError();
        if (!result.ok) return BankNotifyUtils.pushError(result.message);

        API.bank.reqATMData();

        BankNotifyUtils.push('TAKE', undefined, `${result.data?.fromValue || 0}|${result.data?.toValue || 0}`);
    };

    const onClickAction = async (val: number, addictional?: string) => {
        if (modal === 'PUT') {
            onActionPut(val);
        } else if (modal === 'WITHDRAW') {
            onActionWithdraw(val);
        } else if (modal === 'SIM') {
            if (!addictional) {
                return;
            }

            const simNumber = parseInt(addictional);

            onActionSimcardPay(simNumber, val);
        }

        setModal(null);
    };

    useEffect(() => {
        document.addEventListener('mousedown', onClickAsideModal);

        return () => {
            document.removeEventListener('mousedown', onClickAsideModal);
        };
    }, [onClickAsideModal]);

    useEffect(() => {
        init();
    }, []);

    return (
        <section className="atm">
            <button className="atm__close" onClick={() => onClickCloseBtn()}>
                <ChristSVG color="#FFC952" />
            </button>

            <div className={`atm__container ${modal !== null ? 'blur' : ''}`}>
                <Block
                    title="Финансы"
                    accountId={store.ATMData?.accountID}
                    column={2}
                    btnList={[
                        {
                            title: numberSpacesFormatter(store.ATMData?.money || -1),
                            descr: 'На счету',
                            type: store.ATMData?.tariffType,
                            disable: false,
                        },
                        {
                            title: numberSpacesFormatter(store.ATMData?.cash || -1),
                            descr: 'Наличные',
                            img: 'cashSVG',
                            disable: false,
                        },
                    ]}
                />
                <Block
                    title="Операции"
                    column={2}
                    btnList={[
                        { title: 'Пополнить', img: 'putSVG', disable: false },
                        { title: 'Снять', img: 'putSVG', disable: false },
                    ]}
                    onClickItem={(idx: number) => setModal(idx === 0 ? 'PUT' : 'WITHDRAW')}
                />

                <button className="bank__btn" onClick={() => setModal('SIM')}>
                    <div>
                        <div>Пополнить баланс SIM-карты</div>
                    </div>
                    <img src={simSVG} alt="" />
                </button>
            </div>

            {modal !== null && (
                <PutModal
                    modal={modal}
                    headerImg={modal === 'PUT' ? 'cashSVG' : undefined}
                    type={modal === 'WITHDRAW' || modal === 'SIM' ? store.ATMData?.tariffType : undefined}
                    headerTitle={convertMoney(modal === 'PUT' ? store.ATMData?.cash || -1 : store.ATMData?.money || -1)}
                    phone={modal === 'SIM' ? '337 1 336' : undefined}
                    onClick={(val: number, addictional?: string) => onClickAction(val, addictional)}
                />
            )}
            {store.ATMData?.isBlocked === true && (
                <div className="atm__blocked-modal" onClick={() => onClickBlockAccept()}>
                    <div className="content">
                        <h1 className="content__title">Ваши счета заблокированы</h1>
                        <p className="content__desc">
                            Решение о блокировке ваших счетов было принято контролирующим органом
                        </p>
                        <p className="content__reason">
                            <span>Причина</span>
                            <span>{store.ATMData?.blockedReason || 'Неизвестно'}</span>
                        </p>
                        <button className="content__btn">Понятно</button>
                    </div>
                </div>
            )}
        </section>
    );
});
