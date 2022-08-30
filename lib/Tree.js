if (window.TreeModel === undefined) { throw ReferenceError('tree-model-js を HTML からインポートする必要があります. HTML ファイル内に, "<script src="../tree-model-js/dist/TreeModel-min.js"></script>" と記述してください.'); }

// globalThis は定義済み
export const TreeModel = globalThis.TreeModel;  // eslint-disable-line no-undef
