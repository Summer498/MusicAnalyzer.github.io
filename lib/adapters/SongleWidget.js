if (window.SongleWidgetAPI === undefined) {
    throw ReferenceError('Songle Widget API を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://widget.songle.jp/v1/api.js"></script>" と記述してください.');
}
export const SongleWidgetAPI = globalThis.SongleWidgetAPI; // eslint-disable-line no-undef
//*/
