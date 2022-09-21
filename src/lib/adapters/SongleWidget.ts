export type SongleWidgetConstructor = any;

type ISongleWidgetAPI = any;

interface SongleWidgetWindow extends Window {
    SongleWidgetAPI: ISongleWidgetAPI;
    onSongleWidgetReady: any;
}
declare const globalThis: SongleWidgetWindow;
if (globalThis.SongleWidgetAPI === undefined) { throw ReferenceError('Songle Widget API を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://widget.songle.jp/v1/api.js"></script>" と記述してください.'); }
export const SongleWidgetAPI = globalThis.SongleWidgetAPI;  // eslint-disable-line no-undef

export const songle_widget_window = globalThis;
