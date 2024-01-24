import { useState } from 'react';

import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';

import TempApartIMG from '../../../../../assets/media/images/estate/APART_COMFORT.png';

import './TaxItem.scss';

export interface ITaxItemProps {
    type: Types.Bank.TaxType;
    name: string;
    id: number;
    value: number;
    handleClick?: () => any;
}

export const TaxItem = ({ type, name, id, value, handleClick }: ITaxItemProps) => {
    return (
        <div className="item" onClick={handleClick}>
            <img src={TempApartIMG} alt="prew" className="item__preview" />
            <div className="item-info">
                <p className="item-info__name">{name}</p>
                <p className="item-info__number">
                    <span>Номер дома</span>
                    <span>{id}</span>
                </p>
                <p className="item-info__tax">
                    <span>Налог</span>
                    <span>{numberSpacesFormatter(value)}</span>
                    <span>AED</span>
                </p>
            </div>
            <button className="item__btn">Оплатить</button>
        </div>
    );
};
