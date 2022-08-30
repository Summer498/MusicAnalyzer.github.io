if (window.Tonal === undefined) { throw ReferenceError('Tonal.js を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://cdn.jsdelivr.net/npm/@tonaljs/tonal/browser/tonal.min.js"></script>" と記述してください.'); }

// globalThis は定義済み
export const Tonal = globalThis.Tonal;  // eslint-disable-line no-undef
