import { Chord, Chord_default, Scale } from "../adapters/Tonal.js";

export class RomanChord {
    readonly scale: Scale;
    readonly chord: Chord;
    constructor(
        scale: Scale,
        chord: Chord
    ) {
        this.scale = scale;
        this.chord = chord;
    }
}

const getBodyAndRoot = (chord_string: string) => {
    const before_slash = chord_string.indexOf("/");
    const body_length = before_slash >= 0 ? before_slash : chord_string.length;
    const body = chord_string.slice(0, body_length);
    const root = chord_string.slice(body_length + 1);

    return { body, root };
};

// ルート付きコードが入力されてもコードを得られるようにする.
export const getChord = (chord_string: string): Chord => {
    const body_and_root = getBodyAndRoot(chord_string);
    const root = body_and_root.root;
    const chord = Chord_default.get(body_and_root.body);
    if (chord.tonic == null) { throw new TypeError("tonic must not be null"); }

    if (chord_string === "") { return chord; }
    if (chord.empty) { throw Error('Illegal chord symbol "' + chord_string + '" received'); }
    if (root != '' && !chord.notes.includes(root)) { chord.notes.push(root); }

    return chord;
};
