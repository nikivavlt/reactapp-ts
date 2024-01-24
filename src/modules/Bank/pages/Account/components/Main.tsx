import { useContext } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../../../../../store/store';

import { Block } from '@/modules/Bank/components/Block';
import { numberSpacesFormatter } from '@/utils/numberSpacesFormatter';

interface IProps {
    onClickItem: Function;
}

export const Main = observer(({ onClickItem }: IProps) => {
    const store = useContext(StoreContext).bank;

    return (
        <div className="account__content">
            <Block
                title="Финансы"
                accountId={store.ATMData?.accountID || store.accountData?.accountID}
                btnList={[
                    {
                        title:
                            store.pages === 'WINDOW_BANK'
                                ? numberSpacesFormatter(store.accountData?.money || 0)
                                : numberSpacesFormatter(store.ATMData?.money || 0) || '0',
                        descr: 'На счету',
                        type: store.accountData?.tariffType || store.ATMData?.tariffType,
                        disable: false,
                        cashback: true,
                    },
                    {
                        title:
                            store.pages === 'WINDOW_BANK'
                                ? numberSpacesFormatter(store.otherInfo.cash)
                                : numberSpacesFormatter(store.ATMData?.cash || 0) || '-1',
                        descr: 'Наличные',
                        img: 'cashSVG',
                        disable: false,
                    },
                    {
                        title: store.accountData?.deposit?.value.toString() || '0',
                        descr: 'Вклад',
                        img: 'depositSVG',
                        disable: false,
                    },
                ]}
            />
            <Block
                isBlocked={!!store.penaltiesData?.list.length}
                title="Операции"
                btnList={[
                    { title: 'Пополнить', img: 'putSVG', disable: !!store.accountData?.isBlocked },
                    { title: 'Снять', img: 'putSVG', disable: !!store.accountData?.isBlocked },
                    { title: 'Перевод игроку', img: 'transferSVG', disable: !!store.accountData?.isBlocked },
                    { title: 'Оплата налогов', img: 'taxSVG', disable: false },
                    { title: 'Оплата штрафов', img: 'ticketSVG', disable: false },
                    { title: 'Выплаты', img: 'paySVG', disable: !!store.accountData?.isBlocked },
                    { title: 'Вклад', img: 'depositSVG', disable: !!store.accountData?.isBlocked },
                    { title: 'Сменить тариф', img: 'tariffSVG', disable: !!store.accountData?.isBlocked },
                ]}
                onClickItem={(idx: number) => onClickItem(idx)}
            />
        </div>
    );
});
