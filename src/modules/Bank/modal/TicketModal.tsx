import { Card } from "../components/Card"

export const TicketModal = () => {
    return (
        <div className="modal">
            <div className="modal__content ticket-modal">
                <div className="ticket-modal__card">
                    <Card type={'TARIFF_GOLD'} />
                    <div>120000</div>
                    <div>AED</div>
                </div>

                <div className="ticket-modal__info">
                    <div className="ticket-modal__info_header">
                        <div>
                            <div>
                                <span>Сумма штрафов</span>
                                AED
                            </div>
                            <div>750 000</div>
                        </div>
                        <img src="" alt="" />
                    </div>
                    <div className="ticket-modal__info_footer">
                        <div>Если сумма штрафов превысит 1 000 000 AED, то доступ к использованию<br />банковских счётов будет приостановлен</div>
                        <button>Оплатить все штрафы</button>
                    </div>
                </div>

                <div className="ticket-modal__list">
                    <div className="ticket-modal__list_header">
                        <div>Номер</div>
                        <div>Тип штрафа</div>
                        <div>Дата выдачи</div>
                        <div>Кем выдан</div>
                        <div>Размер штрафа&nbsp;<span>AED</span></div>
                    </div>
                    <div className="ticket-modal__list_items">
                        <div className="ticket-modal__list_item">
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                            <button>Оплатить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}