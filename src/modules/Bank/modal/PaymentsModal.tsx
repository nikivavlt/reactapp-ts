import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../../../store/store';

import { Card } from '../components/Card';
import { callProc } from '@/utils/callProc';

import BusinesSVG from '../assets/media/icons/disb_business.svg';
import HouseSVG from '../assets/media/icons/disb_house.svg';
import ApartSVG from '../assets/media/icons/disb_apart.svg';
import CarSVG from '../assets/media/icons/disb_car.svg';
import CardSVG from '../assets/media/icons/baseCard.svg';
import { API } from '@/api/api';

// car house biz apart

const getIconByType = (type: Types.Disbursement.DisbursementTypes) => {
    switch (type) {
        case 'DISBURSEMENT_BUSINESS':
            return BusinesSVG;
        case 'DISBURSEMENT_CAR':
            return CarSVG;
        case 'DISBURSEMENT_ESTATE_APART':
            return ApartSVG;
        case 'DISBURSEMENT_ESTATE_HOUSE':
            return HouseSVG;
    }
};

export const PaymentsModal = observer(() => {
    const store = useContext(StoreContext).bank;

    const [reqBlock, setReqBlock] = useState<boolean>(false);

    const load = async () => {
        const result = await callProc<Types.Bank.IDisbursementsData>('CFBProc::bank.req.disbursementsData');

        if (result && result.ok && result.data) {
            store.setDisbursementsData(result.data);
        }
    };

    const onClickItem = async (uuid: string, type: Types.Disbursement.DisbursementTypes) => {
        if (reqBlock) return;

        setReqBlock(true);

        const res = await API.bank.actionDisbursementsTake(uuid, type);

        if (res && res.ok) {
            store.removeDisbursement(uuid);

            API.bank.reqAccountData();
        }

        setReqBlock(false);
    };

    const onClickTakeAll = async () => {
        if (reqBlock) return;

        setReqBlock(true);

        const res = await API.bank.actionDisbursementsTakeAll();

        if (res && res.ok) {
            store.setDisbursementsData({ list: [] });

            API.bank.reqAccountData();
        }

        setReqBlock(false);
    };

    const getFormattedDate = (unix: number) => {
        const date = new Date(Number(unix));

        const [d, m, y] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];

        return `${d < 10 ? '0' + d : d}.${m < 10 ? '0' + m : m}.${y}`;
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="modal">
            <div className="modal__content payments-modal">
                <div className="payments-modal__items">
                    {store.disbursementsData?.list.map((elem) => (
                        <div
                            className="payments-modal__item"
                            key={elem.uuid}
                            onClick={() => onClickItem(elem.uuid, elem.type)}
                        >
                            <div className="payments-modal__item_header">
                                <div>
                                    {/* <Card type={store.accountData?.tariffType || 'TARIFF_NONE'} /> */}
                                    <img src={CardSVG} alt="" />
                                    <div>{elem.value <= 9999 ? elem.value : elem.value.toLocaleString('ru-RU')}</div>
                                    <div>AED</div>
                                </div>
                                <div>{getFormattedDate(elem.dateUnix)}</div>
                            </div>
                            <div className="payments-modal__item_main">
                                <div>
                                    <div>{elem.desc}</div>
                                    <div>{elem.title}</div>
                                </div>
                                <img src={getIconByType(elem.type)} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
                <button className="payments-modal__btn" onClick={() => onClickTakeAll()}>
                    Забрать все выплаты
                </button>
            </div>
        </div>
    );
});
