import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { Bank } from './modules/Bank/Bank';

import { StoreContext } from './store/store';

import { API } from './api/api';

import { trigger } from './utils';

import './assets/styles/App.scss';
import Customization from './modules/Customization/Customization';

function isElementDescendant(childElement: Element, parentElement: Element) {
    if (childElement === parentElement) {
        return false;
    }

    if (parentElement.contains(childElement)) {
        return true;
    }

    for (let i = 0; i < parentElement.children.length; i++) {
        const child = parentElement.children[i];
        if (isElementDescendant(childElement, child)) {
            return true;
        }
    }

    return false;
}

export const App = observer(() => {
    const store = useContext(StoreContext);

    const globalStore = store.global;

    const appRef = useRef<HTMLDivElement | null>(null);

    // global state sending for input focus\unfocus
    const onInputFocusIn = (ev: FocusEvent) => {
        const target = ev.target as HTMLElement;

        if (
            target.tagName === 'INPUT' &&
            (target.getAttribute('type') === 'text' ||
                target.getAttribute('type') === 'password' ||
                target.getAttribute('type') === 'email' ||
                target.getAttribute('type') === 'textarea')
        ) {
            // console.log('Input focused');
            trigger('CFB::input.focus.toggle', true);
        }
    };
    const onInputFocusOut = (ev: FocusEvent) => {
        const target = ev.target as HTMLElement;

        if (
            target.tagName === 'INPUT' &&
            (target.getAttribute('type') === 'text' ||
                target.getAttribute('type') === 'password' ||
                target.getAttribute('type') === 'email' ||
                target.getAttribute('type') === 'textarea')
        ) {
            // console.log('Input unfocused');
            trigger('CFB::input.focus.toggle', false);
        }
    };
    /////

    // global state sending for input focus\unfocus
    const [hoveredState, setHoveredState] = useState<boolean>(false);

    const onMouseOver = (ev: MouseEvent) => {
        const el = ev.target as Element;
        const appEl = document.querySelector('.App');

        if (!appEl || !el) {
            console.log(appEl);
            console.log(el);
            return;
        }

        setHoveredState(isElementDescendant(el, appEl as Element));
    };
    useEffect(() => {
        trigger('CFB::element.hovered', hoveredState);
    }, [hoveredState]);

    /////

    useEffect(() => {
        window.api = API;

        const onResize = () => {
            const [baseWidth, baseHeight] = [1920, 1080];

            const [curWidth, curHeight] = [window.innerWidth, window.innerHeight];
            const [ratioWidth, ratioHeight] = [curWidth / baseWidth, curHeight / baseHeight];

            const zoom = Math.min(ratioWidth, ratioHeight) * 100;

            appRef.current?.setAttribute('style', `zoom: ${zoom}%`);

            console.log(`zoom: ${zoom}%`);
        };

        const onKeyDown = (ev: KeyboardEvent) => {
            const capsLockState = ev.getModifierState('CapsLock');

            globalStore.setCapsLockState(capsLockState);
        };
        const onInputChanged = (ev: Event) => {
            const element = ev.target as HTMLInputElement;

            const lastChar = element.value[element.value.length - 1];

            if (!lastChar) {
                return globalStore.setKeyboardLanguage(null);
            }

            const isRus = /[А-Яа-яёЁйЙ]+/gim.test(lastChar);

            if (isRus) {
                globalStore.setKeyboardLanguage('RU');
            } else {
                globalStore.setKeyboardLanguage('ENG');
            }
        };

        onResize();

        document.addEventListener('input', onInputChanged);
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('focusin', onInputFocusIn);
        document.addEventListener('focusout', onInputFocusOut);
        document.addEventListener('mouseover', onMouseOver);
        window.addEventListener('resize', onResize);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('input', onInputChanged);
            document.removeEventListener('focusin', onInputFocusIn);
            document.removeEventListener('focusout', onInputFocusOut);
            document.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('resize', onResize);

            globalStore.setKeyboardLanguage(null);
            globalStore.setCapsLockState(false);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App" ref={appRef}>
            <Customization></Customization>
            {/* {store.bank.active && <Bank />} */}
        </div>
    );
});

export default App;
