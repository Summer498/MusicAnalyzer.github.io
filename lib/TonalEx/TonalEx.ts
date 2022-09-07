// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Tonal: any;  // txt/script タイプの JavaScript から外部定義されている.

export class ChordObject {
    readonly _tonic: string;
    readonly _notes: string[];
    readonly _root: string;
    readonly _symbol: string;
    constructor(
        tonic: string,
        notes: string[],
        root: string,
        symbol: string
    ) {
        this._tonic = tonic;
        this._notes = notes;
        this._root = root;
        this._symbol = symbol;
    }
    static get none(){
        return new ChordObject('', [], '', '');
    }
    get tonic() { return this._tonic; }
    get notes() { return this._notes; }
    get root() { return this._root; }
    get symbol() { return this._symbol; }
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
    const chord = Tonal.Chord.get(body_and_root.body);
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
