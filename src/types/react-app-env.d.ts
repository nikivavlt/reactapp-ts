/// <reference types="react-scripts" />

import { ChatAPI } from '@/api/hud.api';
import { API } from '../api/api';

export declare global {
    interface Window {
        api: API;
        chatAPI: ChatAPI;
    }
}
