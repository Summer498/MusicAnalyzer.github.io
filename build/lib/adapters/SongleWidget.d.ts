export declare type SongleWidgetConstructor = any;
declare type ISongleWidgetAPI = any;
interface SongleWidgetWindow extends Window {
    SongleWidgetAPI: ISongleWidgetAPI;
    onSongleWidgetReady: any;
}
export declare const SongleWidgetAPI: any;
export declare const songle_widget_window: SongleWidgetWindow;
export {};
