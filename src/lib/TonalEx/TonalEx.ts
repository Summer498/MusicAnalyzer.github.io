import { Chord, Chord_default, Interval, Note, NoteLiteral, Scale, Scale_default } from "../adapters/Tonal.js";
import { dynamicLogViterbi } from "../Graph/Graph.js";
import { Math } from "../Math/Math.js";
import { Assertion, assertNonNullable, castToNumber, IdDictionary } from "../StdLib/stdlib.js";
import { getDistance, getKeysIncludeTheChord } from "../TPS/TPS.js";

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

export const getIntervalDegree = (src: NoteLiteral, dst: NoteLiteral) => {
    return castToNumber(Interval.distance(src, dst).slice(0, 1));
};

export const getNonNullableChroma = (note: NoteLiteral) => {
    return assertNonNullable(Note.chroma(note));
};

const getBodyAndRoot = (chord_string: string) => {
    chord_string = chord_string.replace(
        "minor/major", 
        "XXXXXXXXXXX"
    );
    let separator = "/";
    let before_separator = chord_string.indexOf(separator);
    if (before_separator < 0) {
        separator = " on ";
        before_separator = chord_string.indexOf(separator);
    }
    chord_string = chord_string.replace(
        "XXXXXXXXXXX",
        "minor/major" 
    );

    const body_length = before_separator >= 0 ? before_separator : chord_string.length;
    const body = chord_string.slice(0, body_length);
    const root = chord_string.slice(body_length + separator.length);
    return { body, root };
};

// ルート付きコードが入力されてもコードを得られるようにする.
export const getChord = (chord_string: string): Chord => {
    const body_and_root = getBodyAndRoot(chord_string);
    const root = body_and_root.root;
    const chord = Chord_default.get(body_and_root.body);
    if (chord_string === "") { return chord; }
    new Assertion(chord.tonic != null)
        .onFailed(() => {
            console.log("received:");
            console.log(chord);
            throw new TypeError("tonic must not be null");
        });
    new Assertion(!chord.empty)
        .onFailed(() => {
            console.log("received chord:");
            console.log(chord);
            throw Error('Illegal chord symbol "' + chord_string + '" received');
        });
    if (root != '' && !chord.notes.includes(root)) {
        // TODO: 現在はベース音をプッシュすると同じ(に見える)コードに対して候補が変化するように見えてしまう
        // ベース音を含むといろいろなコードが想定できるので, 候補スケールとして任意のスケールを使えるようにする
        chord.name += ` on ${root}`;
        chord.notes.push(root);
        chord.symbol += `/${root}`;
    }
    chord.root = root;
    chord.rootDegree = getIntervalDegree(chord.tonic, chord.root);
    return chord;
};

class RomanChordIdDictionary {
    #log_chord_id_max = 8;
    #chord_id_max = (1 << this.#log_chord_id_max) - 1;
    #scale_dictionary = new IdDictionary<string>();
    #chord_dictionary = new IdDictionary<string>();
    #composeToId(scale_id: number, chord_id: number) {
        return (scale_id << this.#log_chord_id_max) + chord_id;
    }
    #decomposeFromId(id: number) {
        return {
            scale_id: id >> this.#log_chord_id_max,
            chord_id: id & this.#chord_id_max
        };
    }
    register(chord: Chord, scale: Scale) {
        if (this.#chord_dictionary.length >= this.#chord_id_max) {
            throw new RangeError(`The number of chords are expected at most ${this.#chord_id_max}`);
        }
        return this.#composeToId(
            this.#scale_dictionary.register(scale.name),
            this.#chord_dictionary.register(chord.name)
        );
    }
    getRomanId(chord: Chord, scale: Scale) {
        return this.#composeToId(
            this.#scale_dictionary.getId(scale.name),
            this.#chord_dictionary.getId(chord.name)
        );
    }
    getChordId(chord: Chord) {
        return this.#chord_dictionary.getId(chord.name);
    }
    getItemFromRomanId(id: number) {
        const decomposed = this.#decomposeFromId(id);
        return new RomanChord(
            Scale_default.get(this.#scale_dictionary.getItem(decomposed.scale_id)),
            getChord(this.#chord_dictionary.getItem(decomposed.chord_id))
        );
    }
    showAll() {
        return {
            id2scale: this.#scale_dictionary.showAll(),
            id2chord: this.#chord_dictionary.showAll()
        };
    }
}

export class ChordProgression {
    lead_sheet_chords: string[];
    #dict = new RomanChordIdDictionary();
    #setDictionary(lead_sheet_chords: string[]) {
        for (const chord_str of lead_sheet_chords) {
            const chord = getChord(chord_str);
            const candidate_scales = getKeysIncludeTheChord(chord);
            for (const scale of candidate_scales) {
                this.#dict.register(chord, scale);
            }
            if (candidate_scales.length === 0) {
                this.#dict.register(chord, Scale_default.get(""));  // empty スケールをとりあえず登録する TODO: getKeysIncludeTheChord が完成次第, こんなことはやめる
            }
        }
    }
    // returns all field
    debug() {
        return {
            lead_sheet_chords: this.lead_sheet_chords,
            dict: this.#dict,
        };
    }
    constructor(lead_sheet_chords: string[]) {
        this.lead_sheet_chords = lead_sheet_chords;
        this.#setDictionary(lead_sheet_chords);
    }
    getStatesAtTheTime(t: number) {
        const chord = getChord(this.lead_sheet_chords[t]);
        const candidate_scales = getKeysIncludeTheChord(chord);  // 候補がない時, ここが空配列になる
        if (candidate_scales.length === 0) {
            return [this.#dict.getRomanId(chord, Scale_default.get(""))];    // とりあえず登録してある empty スケールを取り出す TODO: getKeysIncludeTheChord が完成次第, こんなことはやめる
        }
        return candidate_scales.map(scale => this.#dict.getRomanId(chord, scale));
    }
    getChordIdSequence() { return this.lead_sheet_chords.map(chord => this.#dict.getChordId(getChord(chord))); }

    getDistanceOfStates(s1: number, s2: number) {
        const roman1 = this.#dict.getItemFromRomanId(s1);  // ここで tonic === null のコードが返ってきている
        const roman2 = this.#dict.getItemFromRomanId(s2);  // ここで tonic === null のコードが返ってきている
        if (roman1.scale.empty) { console.warn("empty scale received"); return 0; }
        if (roman2.scale.empty) { console.warn("empty scale received"); return 0; }
        if (roman1.chord.empty) { console.warn("empty chord received"); return 0; }
        if (roman2.chord.empty) { console.warn("empty chord received"); return 0; }
        return getDistance(
            new RomanChord(roman1.scale, roman1.chord),
            new RomanChord(roman2.scale, roman2.chord)
        );  // TPS.getDistance と書いた方が分かりやすいか.
    }

    getMinimumPath() {
        const trace = dynamicLogViterbi(
            Math.getZeros(this.lead_sheet_chords.length),
            this.getStatesAtTheTime.bind(this),
            this.getDistanceOfStates.bind(this),
            () => 0,
            this.getChordIdSequence(),
            true
        ).trace;
        return trace.map(id => this.#dict.getItemFromRomanId(id));
    }
}

