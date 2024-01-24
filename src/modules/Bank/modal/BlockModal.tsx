interface IProps {
    reason: string;
    onClickOk?: () => any;
}

export const BlockModal = ({ reason, onClickOk }: IProps) => {
    return (
        <div className="modal">
            <div className="modal__content block-modal">
                <div className="block-modal__main">
                    <div className="block-modal__title">Ваши счета заблокированы</div>
                    <div className="block-modal__descr">
                        Решение о блокировке ваших счетов было принято контролирующим органом
                    </div>
                    <div className="block-modal__reason">
                        <span>Причина</span>&nbsp;{reason}
                    </div>
                </div>
                <button className="block-modal__btn" disabled={false} onClick={() => onClickOk && onClickOk()}>
                    Понятно
                </button>
            </div>
        </div>
    );
};
