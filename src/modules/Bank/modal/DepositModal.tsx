import { useContext, useEffect, useState } from 'react';

import { StoreContext } from '@/store/store';

import DepositSVG from '../assets/media/icons/depositSVG.svg';
import { Card } from '../components/Card';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';
import { observer } from 'mobx-react';
import { API } from '@/api/api';

export const DepositModal = observer(() => {
    const store = useContext(StoreContext).bank;

    const [weaks, setWeaks] = useState(1);
    const [val, setVal] = useState(0);

    const init = () => {
        API.bank.reqDepositInfo();
    };

    const onOpen = async () => {
        if (val === 0) return;

        const res = await API.bank.actionDepositOpen(weaks, val);

        if (res && res.ok) {
            API.bank.reqAccountData();
        }
    };
    const onCloseEarly = async () => {
        const res = await API.bank.actionDepositClose();

        if (res && res.ok) {
            API.bank.reqAccountData();
        }
    };

    useEffect(() => {
        init();
    }, []);

    const depositDoModal = () => {
        return (
            <div className="deposit-do-modal modal__content">
                <section className="header">
                    <Card type={store.accountData?.tariffType || 'TARIFF_NONE'} witdh={33} height={32} />
                    <p className="header__value">
                        <span>
                            {numberSpacesFormatter(
                                store.accountData?.money !== undefined ? store.accountData.money : -1
                            )}
                        </span>
                        <span>AED</span>
                    </p>
                </section>
                <section className="body">
                    <div className="input-field">
                        <input
                            type="text"
                            name=""
                            id=""
                            value={numberSpacesFormatter(val)}
                            placeholder="Введите сумму вклада"
                            onChange={(ev) => {
                                const val = parseInt(ev.target.value.replaceAll(' ', ''));

                                if (!val) {
                                    return setVal(0);
                                }

                                if (val > 999_999_999) {
                                    return setVal(999_999_999);
                                }

                                setVal(val);
                            }}
                        />
                        <p className="input-field__lable">AED</p>
                    </div>
                    <div className="selector">
                        <div className="selector__title">
                            <span>Срок вклада в неделях</span>
                            <span>До {numberSpacesFormatter(store.depositInfo?.maxValue || -1)} AED</span>
                        </div>
                        <div className="buttons">
                            {store.depositInfo?.periodWeaks.map((x) => (
                                <button
                                    className={`buttons__btn${x === weaks ? ' buttons__btn_active' : ''}`}
                                    onClick={() => setWeaks(x)}
                                >
                                    {x}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="stake">
                        <div className="stake-info">
                            <p className="stake-info__title">Базовая процентная ставка</p>
                            <p className="stake-info__bottom">
                                <span>Множитель ставки для VIP</span>
                                <span>X{store.depositInfo?.vipMultiplier}</span>
                            </p>
                        </div>
                        <p className="stake__preview">{store.depositInfo?.percentOfDeposit}%</p>
                    </div>
                </section>
                <section className="footer">
                    <button className={`btn${val <= 0 ? ' btn_locked' : ''}`} onClick={() => onOpen()}>
                        Открыть вклад
                    </button>
                </section>
            </div>
        );
    };

    const depositHaveModal = () => {
        return (
            <div className="modal__content deposit-modal">
                <div className="deposit-modal__header">
                    <div className="deposit-modal__header_item">
                        <div>
                            <span>На счету вклада</span>
                            <span>AED</span>
                        </div>
                        <div>{store.accountData?.deposit?.value}</div>
                    </div>
                    <div className="deposit-modal__header_item">
                        <div>
                            <span>Доход</span>
                            <span>AED</span>
                        </div>
                        <div>{store.accountData?.deposit?.income}</div>
                    </div>
                    <div className="deposit-modal__header_item">
                        <div>
                            <span>Ставка</span>
                            <span>%</span>
                        </div>
                        <div>{store.accountData?.deposit?.rate}</div>
                    </div>
                    <div className="deposit-modal__header_item">
                        <div>
                            <span>Срок</span>
                            <span>Дни</span>
                        </div>
                        <div>
                            {store.accountData?.deposit?.periodDays} 
                            <span>/ {store.accountData?.deposit?.totalDays}</span>
                        </div>
                    </div>
                </div>
                <div className="deposit-modal__info">
                    <div>
                        <img src={DepositSVG} alt="" />
                        <div>
                            <div>Досрочное снятие денег</div>
                            <div>
                                В случае досрочного снятия банк взимает комиссию{' '}
                                {store.depositInfo?.earlyClosePenaltyPercent}% с общей суммы вклада
                            </div>
                        </div>
                    </div>

                    <button onClick={() => onCloseEarly()}>Закрыть досрочно</button>
                </div>
            </div>
        );
    };

    return <div className="modal">{store.accountData?.deposit ? depositHaveModal() : depositDoModal()}</div>;
});
