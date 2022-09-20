//import TreeModel from "../../tree-model-js/types";
if (window.TreeModel === undefined) {
    throw ReferenceError('tree-model-js を HTML からインポートする必要があります. HTML ファイル内に, "<script src="../tree-model-js/dist/TreeModel-min.js"></script>" と記述してください.');
}
export const TreeModel = globalThis.TreeModel; // eslint-disable-line no-undef
//*/
//# sourceMappingURL=Tree.js.map