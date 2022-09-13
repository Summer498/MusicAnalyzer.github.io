import { Chord, Pcset } from "../adapters/Tonal.js";

export class ChordObject {
    readonly #tonic: string;
    readonly #notes: string[];
    readonly #root: string;
    readonly #symbol: string;
    constructor(
        tonic: string,
        notes: string[],
        root: string,
        symbol: string
    ) {
        this.#tonic = tonic;
        this.#notes = notes;
        this.#root = root;
        this.#symbol = symbol;
    }
    static get none() {
        return new ChordObject('', [], '', '');
    }
    get tonic() { return this.#tonic; }
    get notes() { return this.#notes; }
    get notes_pcset() {
        return Pcset.get(this.notes);
    }
    get root() { return this.#root; }
    get root_pcset() {
        return Pcset.get([this.root]);
    }
    get symbol() { return this.#symbol; }
}

const getBodyAndRoot = (chord_string: string) => {
    const before_slash = chord_string.indexOf("/");
    const body_length = before_slash >= 0 ? before_slash : chord_string.length;
    const body = chord_string.slice(0, body_length);
    const root = chord_string.slice(body_length + 1);

    return { body, root };
};

export const getChordInfo = (chord_string: string): ChordObject => {
    const body_and_root = getBodyAndRoot(chord_string);
    const root = body_and_root.root;
    const chord = Chord.get(body_and_root.body);
    if (chord.tonic == null) { throw new TypeError("tonic must not be null"); }
    const notes: string[] = chord.notes;
    const tonic: string = chord.tonic;
    const chord_object
        = new ChordObject(
            tonic,
            notes,
            root == '' ? tonic : root,
            chord_string
        );
    if (chord_string === "") { return ChordObject.none; }
    if (chord.empty) { throw Error('illegal chord symbol "' + chord_string + '" received'); }
    if (root != '' && !notes.includes(root)) { notes.push(root); }

    return chord_object;
};
