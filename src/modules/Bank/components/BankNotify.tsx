import { useContext, useEffect, useState } from 'react';

import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';

import { StoreContext } from '@/store/store';

import NotifyBadSVG from '../assets/media/icons/notify-bad.svg';
import NotifyFillSVG from '../assets/media/icons/notify-fill.svg';
import NotifyInfoSVG from '../assets/media/icons/notify-info.svg';
import NotifyOkSVG from '../assets/media/icons/notify-ok.svg';
import NotifyTakeSVG from '../assets/media/icons/notify-take.svg';
import TextArrowSVG from '../assets/media/icons/text-arrow.svg';

interface INotifyProps {
    type?: TypesUI.Bank.NotifyType;
    title?: string;
    text?: string;
}

export const BankNotify = ({ type, title, text }: INotifyProps) => {
    const store = useContext(StoreContext).bank;

    const [cachedType, setCachedType] = useState<TypesUI.Bank.NotifyType>('INFO');
    const [cachedTitle, setCachedTitle] = useState('');
    const [cachedText, setCachedText] = useState('');

    const getIconByType = (type: TypesUI.Bank.NotifyType) => {
        switch (type) {
            case 'ERROR':
                return NotifyBadSVG;
            case 'FILL':
                return NotifyFillSVG;
            case 'INFO':
                return NotifyInfoSVG;
            case 'OK':
            case 'TRANSACTION_OK':
                return NotifyOkSVG;
            case 'TAKE':
                return NotifyTakeSVG;
            default:
                return NotifyOkSVG;
        }
    };
    const getTitle = () => (title ? title : cachedTitle);
    const getText = () => (text ? text : cachedText);

    const getFormattedText = () => {
        if (type === 'FILL' || type === 'TAKE' || type === 'TRANSACTION_OK') {
            const [firstVal, secondVal] = getText().split('|');

            return (
                <p className="text">
                    <span>{numberSpacesFormatter(parseInt(firstVal))}</span>
                    <span>AED</span>
                    <img src={TextArrowSVG} alt="" />
                    <span>{numberSpacesFormatter(parseInt(secondVal))}</span>
                    <span>AED</span>
                </p>
            );
        }

        return <p className="text">{getText()}</p>;
    };

    useEffect(() => {
        type && setCachedType(type);
        title && setCachedTitle(title);
        text && setCachedText(text);
    }, [type, title, text]);

    return (
        <div className={`notify${store.notify ? ' notify_active' : ''}`}>
            <div className={`notify-icon${type === 'ERROR' ? ' notify-icon_red' : ' notify-icon_blue'}`}>
                <img src={type ? getIconByType(type) : getIconByType(cachedType)} alt="icon" />
            </div>
            <div className="notify-content">
                <h1 className="notify-content__title">{getTitle()}</h1>
                {getFormattedText()}
            </div>
        </div>
    );
};
