declare let Tonal: any;

type ChordObj = {
    tonic: string;
    notes: string[];
    root: string;
    symbol: string;
}

export const noneChordObj = { tonic: '', notes: [], root: '', symbol: '' };

const getBodyAndRoot = (chord_string: string) => {
    const before_slash = chord_string.indexOf("/");
    const body_length = before_slash >= 0 ? before_slash : chord_string.length;
    const body = chord_string.slice(0, body_length);
    const root = chord_string.slice(body_length + 1);

    return { body, root };
};

export const getChordInfo = (chord_string: string): ChordObj => {
    const body_and_root = getBodyAndRoot(chord_string);
    const root = body_and_root.root;
    const chord = Tonal.Chord.get(body_and_root.body);
    const notes = chord.notes;
    const tonic = chord.tonic;
    const chord_object = { tonic, notes, root: root == '' ? tonic : root, symbol: chord_string };
    if (chord_string === "") { return noneChordObj; }
    if (chord.empty) { throw Error('illegal chord symbol "' + chord_string + '" received'); }
    if (root == '' || notes.includes(root)) { }
    else { notes.push(root); }

    return chord_object;
};
