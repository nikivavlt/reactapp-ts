import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';

import { StoreContext } from '@/store/store';

import BankIconSVG from '../assets/media/icons/ticketSVG.svg';
import { callProc } from '@/utils/callProc';
import { API } from '@/api/api';
import { BankNotifyUtils } from '../utils/bank.notify.utils';

const penaltyNameMap = new Map<Types.Penalties.PenaltyType, string>([
    ['PENALTY_AC', 'АК'],
    ['PENALTY_CC', 'УК'],
    ['PENALTY_OTHER', 'Другое'],
    ['PENALTY_TRAFFIC_RULES', 'ПДД'],
]);

const penaltyItem = (penalty: Types.Penalties.IPenalty, onClick: (id: number) => any, index: number = -1) => {
    const date = new Date(parseInt(String(penalty.dateUnix)));
    const penaltyName = penaltyNameMap.get(penalty.type);

    return (
        <tr key={penalty.id} onClick={() => onClick(penalty.id)}>
            <th>{numberSpacesFormatter(index)}</th>
            <th>{penaltyName || 'undefined'}</th>
            <th>
                <p>
                    {date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.
                    {date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}.{date.getFullYear()}
                    <span>
                        {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:
                        {date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}
                    </span>
                </p>
            </th>
            <th>
                <p>
                    <span>{penalty.issuedNickname}</span>
                    <span>{penalty.issuedCID}</span>
                </p>
            </th>
            <th>{numberSpacesFormatter(penalty.value)}</th>
            <th>
                <button>Оплатить</button>
            </th>
        </tr>
    );
};

export const PenaltiesModal = observer(() => {
    const store = useContext(StoreContext).bank;

    const [lockAction, setLockAction] = useState(false);
    const [totalPenaltiesValue, setTotalPenaltiesValue] = useState(0);

    const init = async () => {
        // store.setPenaltiesData(null);

        API.bank.reqPenalties();
    };

    const onClickPenaltyItem = async (id: number) => {
        if (lockAction) return;

        setLockAction(true);

        const res = await API.bank.actionPenaltiesPay(id);

        if (!res) {
            BankNotifyUtils.pushServerError();
        }

        if (res && res.ok) {
            store.removePenalty(id);

            API.bank.reqAccountData();

            BankNotifyUtils.push('OK', 'Оплата штрафа', res.message);
        }

        if (res && !res.ok) {
            BankNotifyUtils.pushError(res.message);
        }

        setLockAction(false);
    };

    const onClickPayAll = async () => {
        if (lockAction) return;

        setLockAction(true);

        const res = await API.bank.actionPenaltiesPayAll();

        if (!res) {
            BankNotifyUtils.pushServerError();
        }

        if (res && res.ok) {
            // API.bank.reqPenalties();
            store.removeAllPenalties();

            API.bank.reqAccountData();

            BankNotifyUtils.push('OK', 'Оплата штрафа', res.message);
        }

        if (res && !res.ok) {
            BankNotifyUtils.pushError(res.message);
        }
        setLockAction(false);
    };

    useEffect(() => {
        if (!store.penaltiesData) return;

        let val = 0;

        for (const i of store.penaltiesData.list) {
            val += i.value;
        }

        console.log(val);

        setTotalPenaltiesValue(val);
    }, [store.penaltiesData, store.penaltiesData?.list.length]);

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="modal">
            <div className="penalties-modal">
                <div className="penalties-modal__header modal__content">
                    <div className="top">
                        <div className="top-info">
                            <p className="top-info__title">
                                <span>Сумма штрафов</span>
                                <span>AED</span>
                            </p>
                            <p className="top-info__value">{numberSpacesFormatter(totalPenaltiesValue)}</p>
                        </div>
                        <img src={BankIconSVG} alt="" className="top-icon" />
                    </div>
                    <div className="bottom">
                        <p className="bottom__desc">
                            Если сумма штрафов превысит{' '}
                            {numberSpacesFormatter(store.generalInfo?.maxPenaltiesValue || -1)} AED, то доступ к
                            использованию банковских счётов будет приостановлен
                        </p>
                        <button className="bottom__btn" onClick={() => onClickPayAll()}>
                            Оплатить все штрафы
                        </button>
                    </div>
                </div>
                <div className="penalties-modal__body modal__content">
                    <table>
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Тип штрафа</th>
                                <th>Дата выдачи</th>
                                <th>Кем выдан</th>
                                <th>
                                    Штраф <span>AED</span>
                                </th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {store.penaltiesData?.list.map((x, i) =>
                                penaltyItem(x, () => onClickPenaltyItem(x.id), i + 1)
                            )}
                            {/* <tr>
                                <th>{numberSpacesFormatter(999999999999)}</th>
                                <th>ПДД</th>
                                <th>
                                    18.09.2023 <span>20:36</span>
                                </th>
                                <th>
                                    Waka <span>17UAAA</span>
                                </th>
                                <th>{numberSpacesFormatter(10000000)}</th>
                                <th>
                                    <button>Оплатить</button>
                                </th>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});
