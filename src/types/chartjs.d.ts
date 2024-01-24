import { Chart, TooltipPositioner, TooltipPositionerContext } from 'chart.js';

declare module 'chart.js' {
    interface TooltipPositionerMap {
        cursor: TooltipPositioner;
    }
}