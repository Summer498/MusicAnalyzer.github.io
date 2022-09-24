if (globalThis.Songle === undefined) {
    throw ReferenceError('Songle API を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://api.songle.jp/v2/api.js"></script>" と記述してください.');
}
export const Songle = globalThis.Songle; // eslint-disable-line no-undef
export const songle_window = globalThis;
//# sourceMappingURL=Songle.js.map