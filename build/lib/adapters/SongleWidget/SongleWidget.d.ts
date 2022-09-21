import { ISongleWidgetAPI } from "./ISongleWidgetAPI";
import { ISongleWidget } from "./ISongleWidget.js";
interface SongleWidgetWindow extends Window {
    SongleWidgetAPI: ISongleWidgetAPI;
    onSongleWidgetCreate: (apiKey: string, songleWidget: ISongleWidget) => void;
    onSongleWidgetError: (apiKey: string, songleWidget: ISongleWidget) => void;
    onSongleWidgetReady: (apiKey: string, songleWidget: ISongleWidget) => void;
    onSongleWidgetReload: (apiKey: string, songleWidget: ISongleWidget) => void;
    onSongleWidgetRemove: (apiKey: string, songleWidget: ISongleWidget) => void;
}
export declare const SongleWidgetAPI: ISongleWidgetAPI;
export declare const songle_widget_window: SongleWidgetWindow;
export {};
