import { observer } from 'mobx-react';

import Switch from 'react-switch';

import VIPIconSVG from '../../assets/media/icons/vipSVG.svg';
import { useContext, useEffect, useState } from 'react';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';
import { Card } from '../../components/Card';
import { StoreContext } from '@/store/store';
import { TaxItem } from './components/TaxItem';
import { API } from '@/api/api';
import { BankNotifyUtils } from '../../utils/bank.notify.utils';

type Tab = 'TAB_ALL' | 'TAB_HOUSES' | 'TAB_APARTS' | 'TAB_CARS' | 'TAB_BUSINESSES';
const TABS = ['TAB_ALL', 'TAB_HOUSES', 'TAB_APARTS', 'TAB_CARS', 'TAB_BUSINESSES'];

const TabNamesMap = new Map<Tab, string>([
    ['TAB_ALL', 'Все'],
    ['TAB_HOUSES', 'Дома'],
    ['TAB_APARTS', 'Апартаменты'],
    ['TAB_CARS', 'Транспорт'],
    ['TAB_BUSINESSES', 'Бизнесы'],
]);

export const TaxesModal = observer(() => {
    const store = useContext(StoreContext).bank;

    const [tab, setTab] = useState<Tab>('TAB_ALL');

    const onClickTabItem = (tabType: Tab) => {
        if (tabType === tab) return;

        setTab(tabType);
    };

    const onClickItem = async (id: number, type: Types.Bank.TaxType) => {
        const target = store.taxesData?.list.find((x) => x.id === id && x.type === type);

        if (!target) return;

        let correctID = type === 'TAX_CARS' ? (target as Types.Bank.ITaxCar).uuid : target.id;

        const res = await API.bank.actionTaxesPay(target.type, correctID);

        if (!res) {
            BankNotifyUtils.pushServerError();
        }

        if (res && !res.ok) {
            BankNotifyUtils.pushError(res.message);
        }

        if (res && res.ok) {
            store.removeTaxesItem(type, correctID);

            BankNotifyUtils.push('OK', 'Оплата налога', res.message);
        }
    };

    const onToggleAutopayment = async (val: boolean) => {
        const res = await API.bank.actionTaxesToggleAutopayment(val);

        if (res && res.ok) {
            API.bank.reqAccountData();
        }
    };

    const getFiltredItems = () => {
        if (tab === 'TAB_ALL') return store.taxesData?.list;

        return store.taxesData?.list.filter((x) => {
            if (tab === 'TAB_HOUSES' && x.type === 'TAX_HOUSES') return true;
            if (tab === 'TAB_APARTS' && x.type === 'TAX_APARTS') return true;
            if (tab === 'TAB_CARS' && x.type === 'TAX_CARS') return true;
            if (tab === 'TAB_BUSINESSES' && x.type === 'TAX_BUSINESSES') return true;
            return false;
        });
    };

    useEffect(() => {
        API.bank.reqTaxesData();
    }, []);

    return (
        <div className="modal">
            <div className="taxes-modal">
                <div className="taxes-modal__header modal__content">
                    <div className="content">
                        <img src={VIPIconSVG} alt="VIP" className="content__icon" />
                        <div className="content__info">
                            <p>
                                <span>Автоплатеж налогов </span>
                                <span>Только для VIP</span>
                            </p>
                            <p>Оплата будет происходить с дебетового счета</p>
                        </div>
                    </div>
                    <Switch
                        className="switch"
                        checked={store.accountData?.autopaymentActive || false}
                        onChange={(val: boolean) => onToggleAutopayment(val)}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#3984F4"
                        offColor="#EEEEEE"
                        activeBoxShadow={undefined}
                    />
                </div>
                <div className="taxes-modal__body modal__content">
                    <div className="header">
                        <div className="header-buttons">
                            {TABS.map((x) => (
                                <div
                                    key={x}
                                    className={`btn${tab === x ? ' btn_active' : ''}`}
                                    onClick={() => onClickTabItem(x as Tab)}
                                >
                                    {TabNamesMap.get(x as Tab)}
                                </div>
                            ))}
                        </div>
                        <div className="header-info">
                            <Card type={store.accountData?.tariffType || 'TARIFF_NONE'} />
                            <p className="header-info__value">
                                {numberSpacesFormatter(store.accountData?.money || 0)}
                                <span> AED</span>
                            </p>
                        </div>
                    </div>
                    <div className="content">
                        {getFiltredItems()?.map((x) => (
                            <TaxItem
                                key={String(x.type + x.id)}
                                type={x.type}
                                name={x.name}
                                id={x.id}
                                value={x.value}
                                handleClick={() => onClickItem(x.id, x.type)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
