/* eslint-disable */
declare namespace TypesUI {
    namespace Notifys {
        interface INotify extends Types.Notifys.INotify {
            timeLeft: number;
        }
    }

    namespace Validators {
        interface IValidator {
            regex: RegExp;
            min: number;
            max: number;
        }
    }

    interface ISVGProps {
        opacity?: number;
        fillColor?: string;
        className?: string;
    }
    namespace Accounting {
        type Pages = 'AUTHORIZATION_PAGE' | 'REGISTRATION_PAGE' | 'RESTORE_PASSWORD_PAGE' | 'CHARACTER_SELECTOR_PAGE';

        interface IAuthorizeFields {
            login: string;
            password: string;
            repeatPassword: string;
            email: string;
            codeRestorePassword: string;
        }
    }

    namespace Inventory {
        interface IDraggableData {
            currentDraggableSlot: (Types.InventoryUI.ISlot | Types.InventoryUI.IClothesSlot) | null;
            currentHoveredSlot: (Types.InventoryUI.ISlot | Types.InventoryUI.IClothesSlot) | null;
            currentDraggableParentElement: HTMLDivElement | null;
            currentDraggableElement: HTMLDivElement | null;
            currentHoveredElement: HTMLDivElement | null;
        }
    }

    namespace RealEstateAgency {
        type Modal = 'MODAL_BUY' | 'MODAL_SALE';

        interface IEstateType {
            type: Types.RealEstateAgency.EstateType | null;
            text: string;
        }

        interface HouseClass {
            type: Types.RealEstateAgency.HouseClass | null;
            text: string;
        }

        interface ApartClass {
            type: Types.RealEstateAgency.ApartClass | null;
            text: string;
        }
    }

    namespace PlayerMenu {
        namespace Pages {
            type Main =
                | 'STAT'
                | 'QUEST'
                | 'ACHIVE'
                | 'ORG'
                | 'GROUP'
                | 'SHOP'
                | 'HELP'
                | 'PROMO'
                | 'REPORT'
                | 'SETTING';
            type Stat = 'MAIN' | 'DOC' | 'ESTATE' | 'BUSINESS' | 'VEHICLE';

            type Setting = 'MAIN' | 'CHAT' | 'BLACKLIST' | 'KEYBIND';

            interface List {
                title: string;
                page: Stat | Setting;
            }
        }

        namespace Setting {
            type MainPages = 'SAFETY' | 'INTERFACE' | 'AIM' | 'PERFORMANCE';
            type ChatPages = 'CHAT' | 'VOICE';
            type KeyBindPages = 'MAIN' | 'VEHICLE';

            interface List {
                title: string;
                page: MainPages | ChatPages | KeyBindPages;
            }

            type ModalEmailPages = 'MAIN' | 'CODE' | 'NEW';

            type OptionType = 'TOGGLE' | 'CHANGE' | 'VOICE' | 'INPUT' | 'RANGE' | 'AIM';
        }

        type Modal = 'ESTATE_GARAGE' | 'ESTATE_PLAYERS' | 'SETTING_PASSWORD' | 'SETTING_EMAIL' | 'SETTING_KEYBIND';
    }

    namespace Bank {
        type ModalATM = 'PUT' | 'WITHDRAW' | 'SIM';
        type ModalMAIN = 'PUT' | 'WITHDRAW' | 'TRANSFER' | 'TAX' | 'TICKET' | 'PAY' | 'DEPOSIT' | 'TARRIF';
        type AccountPages = 'MAIN' | 'TARIFF' | 'NOTARIFF';

        interface BtnList {
            title: string;
            descr?: string;
            img?: string;
            disable: boolean;
            cashback?: boolean;
            type?: Types.Bank.TariffType;
        }

        type NotifyType = 'ERROR' | 'INFO' | 'FILL' | 'TAKE' | 'OK' | 'TRANSACTION_OK';

        interface INotifyData {
            type: NotifyType;
            title: string;
            text: string;
        }
        interface INotify extends INotifyData {
            timeout?: NodeJS.Timeout;
        }
    }
}
