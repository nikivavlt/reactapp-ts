import { useContext } from 'react';
import accountSVG from '../assets/media/icons/accountSVG.svg';
import cashbackSVG from '../assets/media/icons/cashbackSVG.svg';
import { Card } from './Card';
import { StoreContext } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { BankNotifyUtils } from '../utils/bank.notify.utils';

interface IProps {
    title: string;
    isBlocked?: boolean;
    accountId?: number;
    column?: number;
    btnList: TypesUI.Bank.BtnList[];
    onClickItem?: Function;
}

export const Block = observer(({ title, isBlocked, accountId, column = 3, btnList, onClickItem }: IProps) => {
    const store = useContext(StoreContext).bank;

    const onCopyToClipboard = () => {
        BankNotifyUtils.push('INFO', 'Копия', 'Номер карты успешно скопирован', 2000);

        accountId && copyToClipboard(accountId.toString());
    };

    return (
        <div className="block">
            <div className="block__header">
                <div className="block__header_title">{title}</div>
                <div className="block__header_line"></div>
                {accountId && (
                    <div className="block__header_account">
                        <div>Счет</div>
                        <div>{accountId.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ')}</div>
                        <button onClick={() => accountId && onCopyToClipboard()}>
                            <img src={accountSVG} alt="" />
                        </button>
                    </div>
                )}

                {isBlocked && <div className="block__header_blocked">Имеются неоплаченные штрафы</div>}
            </div>

            <div className="block__btns" style={{ gridTemplateColumns: `repeat(${column}, 1fr)` }}>
                {btnList.map((elem, idx) => (
                    <button
                        className={`bank__btn${elem.disable ? ' bank__btn_unactive' : ''}`}
                        key={idx}
                        onClick={() => !elem.disable && onClickItem && onClickItem(idx)}
                    >
                        <div>
                            {'descr' in elem && (
                                <div>
                                    <span>{elem.descr}</span>
                                    <span>AED</span>
                                </div>
                            )}
                            <div>{elem.title}</div>
                        </div>
                        {'cashback' in elem && store.accountData?.cashback && store.accountData.cashback.value !== 0 && (
                            <div className="cashback">
                                <div>{store.accountData.cashback.value}</div>
                                <img src={cashbackSVG} alt="" />
                            </div>
                        )}
                        {elem.img && <img src={require(`../assets/media/icons/${elem.img}.svg`)} alt="" />}
                        {elem.type && <Card type={elem.type} />}
                    </button>
                ))}
            </div>
        </div>
    );
});
