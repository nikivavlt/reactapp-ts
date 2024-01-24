import { StoreShared } from '@/store/store';

const store = StoreShared.bank;

export class BankNotifyUtils {
    private static readonly DEFAULT_DISPLAY_TIME_MS = 3000;

    static push(
        type: TypesUI.Bank.NotifyType,
        title: string = 'Операция прошла успешно',
        text: string,
        timeMS: number = this.DEFAULT_DISPLAY_TIME_MS
    ) {
        store.setNotify(
            {
                type: type,
                title: title,
                text: text,
            },
            timeMS
        );
    }

    static pushError(text: string, timeMS: number = this.DEFAULT_DISPLAY_TIME_MS) {
        this.push('ERROR', 'Операция не выполнена', text, timeMS);
    }

    static pushServerError(timeMS: number = this.DEFAULT_DISPLAY_TIME_MS) {
        this.pushError('Ошибка сервера', timeMS);
    }
}
