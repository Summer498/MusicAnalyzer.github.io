var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChordObject_tonic, _ChordObject_notes, _ChordObject_root, _ChordObject_symbol;
import { Chord, Pcset } from "../adapters/Tonal.js";
export class ChordObject {
    constructor(tonic, notes, root, symbol) {
        _ChordObject_tonic.set(this, void 0);
        _ChordObject_notes.set(this, void 0);
        _ChordObject_root.set(this, void 0);
        _ChordObject_symbol.set(this, void 0);
        __classPrivateFieldSet(this, _ChordObject_tonic, tonic, "f");
        __classPrivateFieldSet(this, _ChordObject_notes, notes, "f");
        __classPrivateFieldSet(this, _ChordObject_root, root, "f");
        __classPrivateFieldSet(this, _ChordObject_symbol, symbol, "f");
    }
    static get none() {
        return new ChordObject('', [], '', '');
    }
    get tonic() { return __classPrivateFieldGet(this, _ChordObject_tonic, "f"); }
    get notes() { return __classPrivateFieldGet(this, _ChordObject_notes, "f"); }
    get notes_pcset() {
        return Pcset.get(this.notes);
    }
    get root() { return __classPrivateFieldGet(this, _ChordObject_root, "f"); }
    get root_pcset() {
        return Pcset.get([this.root]);
    }
    get symbol() { return __classPrivateFieldGet(this, _ChordObject_symbol, "f"); }
}
_ChordObject_tonic = new WeakMap(), _ChordObject_notes = new WeakMap(), _ChordObject_root = new WeakMap(), _ChordObject_symbol = new WeakMap();
const getBodyAndRoot = (chord_string) => {
    const before_slash = chord_string.indexOf("/");
    const body_length = before_slash >= 0 ? before_slash : chord_string.length;
    const body = chord_string.slice(0, body_length);
    const root = chord_string.slice(body_length + 1);
    return { body, root };
};
export const getChordInfo = (chord_string) => {
    const body_and_root = getBodyAndRoot(chord_string);
    const root = body_and_root.root;
    const chord = Chord.get(body_and_root.body);
    if (chord.tonic == null) {
        throw new TypeError("tonic must not be null");
    }
    const notes = chord.notes;
    const tonic = chord.tonic;
    const chord_object = new ChordObject(tonic, notes, root == '' ? tonic : root, chord_string);
    if (chord_string === "") {
        return ChordObject.none;
    }
    if (chord.empty) {
        throw Error('illegal chord symbol "' + chord_string + '" received');
    }
    if (root != '' && !notes.includes(root)) {
        notes.push(root);
    }
    return chord_object;
};
