import { useContext, useState } from 'react';
import { Card } from '../components/Card';

import SimSVG from '../assets/media/icons/simSVG.svg';
import BaseCardSVG from '../assets/media/icons/baseCard.svg';
import { observer } from 'mobx-react';
import { StoreContext } from '@/store/store';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';

interface IProps {
    headerImg?: string;
    headerTitle: string;
    phone?: string;
    type?: Types.Bank.TariffType;
    modal: TypesUI.Bank.ModalATM | TypesUI.Bank.ModalMAIN;
    onClick?: (value: number, addictional?: string) => any;
}

export const PutModal = observer(({ headerImg, modal, type, headerTitle, phone, onClick = () => {} }: IProps) => {
    const store = useContext(StoreContext).bank;

    const [sum, setSum] = useState<string>('');
    const [addict, setAddict] = useState<string>('');

    const changeSum = (val: string) => {
        const current = parseInt(val.replace(/\D/g, ''));

        setSum(
            current <= 0 || Number.isNaN(current)
                ? ''
                : current <= 9999
                ? current.toString()
                : current.toLocaleString('ru-RU').toString()
        );
    };

    return (
        <div className="modal">
            <div className="modal__content put-modal">
                <div className="put-modal__header">
                    {headerImg && <img src={require(`../assets/media/icons/${headerImg}.svg`)} alt="" />}
                    {type && <Card type={type} />}
                    <div>
                        {headerTitle}
                        <span>AED</span>
                    </div>
                </div>
                <div className="put-modal__inputs">
                    {(modal === 'SIM' || modal === 'TRANSFER') && (
                        <div className="put-modal__phone">
                            <input
                                value={addict.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ')}
                                type="text"
                                placeholder={modal === 'SIM' ? 'Введите номер' : 'Введите карту'}
                                onChange={(ev) => {
                                    const val = ev.target.value;

                                    const correctVal = val.replace(/[^0-9]/g, '');

                                    setAddict(correctVal);
                                }}
                            />
                            <img src={modal === 'SIM' ? SimSVG : modal === 'TRANSFER' ? BaseCardSVG : ''} alt="" />
                        </div>
                    )}

                    <div className="put-modal__input">
                        <input
                            type="text"
                            placeholder="Введите сумму"
                            value={sum}
                            onChange={(e) => changeSum(e.target.value)}
                        />
                        <div>AED</div>
                    </div>

                    {modal === 'PUT' && (
                        <div className="put-modal__popular">
                            {(store.generalInfo?.mostPopularTransferValues || [500, 1000, 5000]).map((elem, idx) => (
                                <button key={idx} onClick={() => changeSum(elem.toString())}>
                                    {elem <= 9999 ? elem : elem.toLocaleString('ru-RU')}&nbsp;<span>AED</span>
                                </button>
                            ))}
                        </div>
                    )}
                    {modal === 'WITHDRAW' && (
                        <div className="put-modal__popular">
                            {(store.generalInfo?.mostPopularWithdrawValues || [500, 1000, 5000]).map((elem, idx) => (
                                <button key={idx} onClick={() => changeSum(elem.toString())}>
                                    {elem <= 9999 ? elem : elem.toLocaleString('ru-RU')}&nbsp;<span>AED</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="put-modal__btn">
                    <button
                        disabled={sum.length === 0 || parseInt(sum) <= 0}
                        onClick={() => {
                            const val = parseInt(sum.replace(/\s/g, ''));

                            if (modal === 'WITHDRAW' || modal === 'PUT') {
                                onClick(val);
                            }

                            if (modal === 'SIM' || modal === 'TRANSFER') {
                                onClick(val, addict);
                            }
                        }}
                    >
                        {modal === 'WITHDRAW' ? 'Снять' : modal === 'TRANSFER' ? 'Перевести' : 'Пополнить'}
                    </button>
                </div>
            </div>
        </div>
    );
});
