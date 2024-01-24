import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../../../../../store/store';

import putSVG from '../../../assets/media/icons/putSVG.svg';
import cashSVG from '../../../assets/media/icons/cashSVG.svg';
import activeSVG from '../../../assets/media/icons/activeSVG.svg';
import disableSVG from '../../../assets/media/icons/disableSVG.svg';
import premSVG from '../../../assets/media/icons/prem.svg';

import { Card } from '../../../components/Card';
import { API } from '@/api/api';
import { BankNotifyUtils } from '@/modules/Bank/utils/bank.notify.utils';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';

interface IProps {
    onClickBack: Function;
}

interface Feature {
    title: string;
    postfixTitle?: boolean;
    postfixValue?: string;
    activeImg?: boolean;
}

export const Tariff = observer(({ onClickBack }: IProps) => {
    const store = useContext(StoreContext).bank;

    const featureText: Feature[] = [
        {
            title: 'Лимит по хранению',
            postfixTitle: true,
        },
        {
            title: 'Лимит на снятие за 1 раз',
            postfixTitle: true,
        },
        {
            title: 'Лимит на снятие в сутки',
            postfixTitle: true,
        },
        {
            title: 'Лимит за 1 перевод',
            postfixTitle: true,
        },
        {
            title: 'Лимит перевода в сутки',
            postfixTitle: true,
        },
        {
            title: 'Стоимость обслуживания в день',
            postfixTitle: true,
        },
        {
            title: 'Процент за перевод',
            postfixValue: '%',
        },
        {
            title: 'Процент за снятие наличных',
            postfixValue: '%',
        },
        {
            title: 'Доступ к кешбеку',
            activeImg: true,
        },
    ];

    const onSelectTariff = async (tariff: Types.Bank.TariffType) => {
        if (tariff === store.accountData?.tariffType) {
            return BankNotifyUtils.pushError('У Вас уже имеется выбранный тариф');
        }

        const res = await API.bank.actionOpenTariff(tariff);

        if (!res) {
            return BankNotifyUtils.pushServerError();
        }

        if (!res.ok) {
            return BankNotifyUtils.pushError(res.message);
        }
    };

    useEffect(() => {
        API.bank.reqTariffs();
    }, []);

    return (
        <div className="tariff">
            <div className="tariff__header">
                <button className="btn-back" onClick={() => onClickBack()}>
                    <img src={putSVG} alt="" />
                    <div>Вернуться назад</div>
                </button>

                <div>
                    <img src={cashSVG} alt="" />
                    <div>{numberSpacesFormatter(store.accountData?.money || 0)}</div>
                    <div>AED</div>
                </div>
            </div>

            <div className="tariff__content">
                <div className="tariff__name">
                    <div className="tariff__name_info">
                        <div>Тарифы</div>
                        <div>Изучите и выберите себе наиболее подходящий тариф</div>
                    </div>
                    <div className="tariff__name_items">
                        {store.tariffs.map((elem, idx) => (
                            <div className="tariff__name_item" key={idx}>
                                {idx === 3 && <img src={premSVG} className="tariff__name_item-prem" alt="" />}
                                <div className="tariff__name_item_img">
                                    <Card type={elem.type} />
                                </div>
                                <div className="tariff__name_item_price">
                                    {numberSpacesFormatter(elem.price)}&nbsp;<span>{idx === 3 ? 'DP' : 'AED'}</span>
                                </div>
                                <div className="tariff__name_item_descr">
                                    <div>{elem.name}</div>
                                    <div></div>
                                    <div>{elem.minLvl} LVL</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tariff__table">
                    {featureText.map((elem, idx) => (
                        <div className="tariff__table_row" key={idx}>
                            <div className="tariff__table_row_text">
                                {elem.title}
                                {elem.postfixTitle && <span>&nbsp;AED</span>}
                            </div>
                            <div>
                                {store.tariffs.map((element, index) => (
                                    <div className="tariff__table_row_value" key={'0' + index}>
                                        {!elem.activeImg && Object.values(element.limits)[idx] >= 999999999
                                            ? '♾️'
                                            : Object.values(element.limits)[idx]}
                                        {!elem.activeImg && elem.postfixValue && elem.postfixValue}

                                        {elem.activeImg && (
                                            <img
                                                src={element.limits.isCashbackAvailable ? activeSVG : disableSVG}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="tariff__action">
                    <div className="tariff__action_info">
                        <div>Тариф оплачивается ежемесячно</div>
                    </div>
                    <div>
                        {store.tariffs.map((elem, idx) => (
                            <div className="tariff__action_btn" key={idx}>
                                <button
                                    disabled={store.accountData?.tariffType === elem.type}
                                    onClick={() => onSelectTariff(elem.type)}
                                >
                                    {store.accountData?.tariffType === elem.type ? 'Это ваш тариф' : 'Выбрать'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
