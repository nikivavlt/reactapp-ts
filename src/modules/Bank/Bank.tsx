import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { ATM } from './pages/ATM/ATM';
import { Account } from './pages/Account/Acoount';

import { BlockModal } from './modal/BlockModal';
import { BankNotify } from './components/BankNotify';

import { BankNotifyUtils } from './utils/bank.notify.utils';

import { StoreContext } from '../../store/store';

import { API } from '@/api/api';

import './assets/styles/Bank.scss';

export const Bank = observer(() => {
    const store = useContext(StoreContext).bank;
    const [blockedOk, setBlockedOk] = useState(false);

    useEffect(() => {
        if (store.active) {
            API.bank.reqAccountData();
            API.bank.reqATMData();
            API.bank.reqGeneralInfo();
            API.bank.reqOtherInfo();
            API.bank.reqTariffs();
            API.bank.reqPenalties();
        }
    }, [store.active]);

    return (
        <section className="bank">
            <BankNotify type={store.notify?.type} title={store.notify?.title} text={store.notify?.text} />
            {store.pages === 'WINDOW_BANK' && <Account />}
            {store.pages === 'WINDOW_ATM' && <ATM />}
            {store.accountData?.isBlocked && !blockedOk && (
                <BlockModal
                    reason={store.accountData?.blockedReason || 'Неизвестно'}
                    onClickOk={() => setBlockedOk(true)}
                />
            )}
        </section>
    );
});
