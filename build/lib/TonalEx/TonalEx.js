var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RomanChordIdDictionary_instances, _RomanChordIdDictionary_log_chord_id_max, _RomanChordIdDictionary_chord_id_max, _RomanChordIdDictionary_scale_dictionary, _RomanChordIdDictionary_chord_dictionary, _RomanChordIdDictionary_composeToId, _RomanChordIdDictionary_decomposeFromId, _ChordProgression_instances, _ChordProgression_dict, _ChordProgression_setDictionary;
import { Chord_default, Interval, Note, Scale_default } from "../adapters/Tonal.js";
import { dynamicLogViterbi } from "../Graph/Graph.js";
import { Math } from "../Math/Math.js";
import { Assertion, assertNonNullable, castToNumber, IdDictionary } from "../StdLib/stdlib.js";
import { getDistance, getKeysIncludeTheChord } from "../TPS/TPS.js";
export class RomanChord {
    constructor(scale, chord) {
        this.scale = scale;
        this.chord = chord;
    }
}
export const getIntervalDegree = (src, dst) => {
    return castToNumber(Interval.distance(src, dst).slice(0, 1));
};
export const getNonNullableChroma = (note) => {
    return assertNonNullable(Note.chroma(note));
};
const getBodyAndRoot = (chord_string) => {
    chord_string = chord_string.replace("minor/major", "XXXXXXXXXXX");
    let separator = "/";
    let before_separator = chord_string.indexOf(separator);
    if (before_separator < 0) {
        separator = " on ";
        before_separator = chord_string.indexOf(separator);
    }
    chord_string = chord_string.replace("XXXXXXXXXXX", "minor/major");
    const body_length = before_separator >= 0 ? before_separator : chord_string.length;
    const body = chord_string.slice(0, body_length);
    const root = chord_string.slice(body_length + separator.length);
    return { body, root };
};
// ルート付きコードが入力されてもコードを得られるようにする.
export const getChord = (chord_string) => {
    const body_and_root = getBodyAndRoot(chord_string);
    const root = body_and_root.root;
    const chord = Chord_default.get(body_and_root.body);
    if (chord_string === "") {
        return chord;
    }
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
    constructor() {
        _RomanChordIdDictionary_instances.add(this);
        _RomanChordIdDictionary_log_chord_id_max.set(this, 8);
        _RomanChordIdDictionary_chord_id_max.set(this, (1 << __classPrivateFieldGet(this, _RomanChordIdDictionary_log_chord_id_max, "f")) - 1);
        _RomanChordIdDictionary_scale_dictionary.set(this, new IdDictionary());
        _RomanChordIdDictionary_chord_dictionary.set(this, new IdDictionary());
    }
    register(chord, scale) {
        if (__classPrivateFieldGet(this, _RomanChordIdDictionary_chord_dictionary, "f").length >= __classPrivateFieldGet(this, _RomanChordIdDictionary_chord_id_max, "f")) {
            throw new RangeError(`The number of chords are expected at most ${__classPrivateFieldGet(this, _RomanChordIdDictionary_chord_id_max, "f")}`);
        }
        return __classPrivateFieldGet(this, _RomanChordIdDictionary_instances, "m", _RomanChordIdDictionary_composeToId).call(this, __classPrivateFieldGet(this, _RomanChordIdDictionary_scale_dictionary, "f").register(scale.name), __classPrivateFieldGet(this, _RomanChordIdDictionary_chord_dictionary, "f").register(chord.name));
    }
    getRomanId(chord, scale) {
        return __classPrivateFieldGet(this, _RomanChordIdDictionary_instances, "m", _RomanChordIdDictionary_composeToId).call(this, __classPrivateFieldGet(this, _RomanChordIdDictionary_scale_dictionary, "f").getId(scale.name), __classPrivateFieldGet(this, _RomanChordIdDictionary_chord_dictionary, "f").getId(chord.name));
    }
    getChordId(chord) {
        return __classPrivateFieldGet(this, _RomanChordIdDictionary_chord_dictionary, "f").getId(chord.name);
    }
    getItemFromRomanId(id) {
        const decomposed = __classPrivateFieldGet(this, _RomanChordIdDictionary_instances, "m", _RomanChordIdDictionary_decomposeFromId).call(this, id);
        return new RomanChord(Scale_default.get(__classPrivateFieldGet(this, _RomanChordIdDictionary_scale_dictionary, "f").getItem(decomposed.scale_id)), getChord(__classPrivateFieldGet(this, _RomanChordIdDictionary_chord_dictionary, "f").getItem(decomposed.chord_id)));
    }
    showAll() {
        return {
            id2scale: __classPrivateFieldGet(this, _RomanChordIdDictionary_scale_dictionary, "f").showAll(),
            id2chord: __classPrivateFieldGet(this, _RomanChordIdDictionary_chord_dictionary, "f").showAll()
        };
    }
}
_RomanChordIdDictionary_log_chord_id_max = new WeakMap(), _RomanChordIdDictionary_chord_id_max = new WeakMap(), _RomanChordIdDictionary_scale_dictionary = new WeakMap(), _RomanChordIdDictionary_chord_dictionary = new WeakMap(), _RomanChordIdDictionary_instances = new WeakSet(), _RomanChordIdDictionary_composeToId = function _RomanChordIdDictionary_composeToId(scale_id, chord_id) {
    return (scale_id << __classPrivateFieldGet(this, _RomanChordIdDictionary_log_chord_id_max, "f")) + chord_id;
}, _RomanChordIdDictionary_decomposeFromId = function _RomanChordIdDictionary_decomposeFromId(id) {
    return {
        scale_id: id >> __classPrivateFieldGet(this, _RomanChordIdDictionary_log_chord_id_max, "f"),
        chord_id: id & __classPrivateFieldGet(this, _RomanChordIdDictionary_chord_id_max, "f")
    };
};
export class ChordProgression {
    constructor(lead_sheet_chords) {
        _ChordProgression_instances.add(this);
        _ChordProgression_dict.set(this, new RomanChordIdDictionary());
        this.lead_sheet_chords = lead_sheet_chords;
        __classPrivateFieldGet(this, _ChordProgression_instances, "m", _ChordProgression_setDictionary).call(this, lead_sheet_chords);
    }
    // returns all field
    debug() {
        return {
            lead_sheet_chords: this.lead_sheet_chords,
            dict: __classPrivateFieldGet(this, _ChordProgression_dict, "f"),
        };
    }
    getStatesAtTheTime(t) {
        const chord = getChord(this.lead_sheet_chords[t]);
        const candidate_scales = getKeysIncludeTheChord(chord); // 候補がない時, ここが空配列になる
        if (candidate_scales.length === 0) {
            return [__classPrivateFieldGet(this, _ChordProgression_dict, "f").getRomanId(chord, Scale_default.get(""))]; // とりあえず登録してある empty スケールを取り出す TODO: getKeysIncludeTheChord が完成次第, こんなことはやめる
        }
        return candidate_scales.map(scale => __classPrivateFieldGet(this, _ChordProgression_dict, "f").getRomanId(chord, scale));
    }
    getChordIdSequence() { return this.lead_sheet_chords.map(chord => __classPrivateFieldGet(this, _ChordProgression_dict, "f").getChordId(getChord(chord))); }
    getDistanceOfStates(s1, s2) {
        const roman1 = __classPrivateFieldGet(this, _ChordProgression_dict, "f").getItemFromRomanId(s1); // ここで tonic === null のコードが返ってきている
        const roman2 = __classPrivateFieldGet(this, _ChordProgression_dict, "f").getItemFromRomanId(s2); // ここで tonic === null のコードが返ってきている
        if (roman1.scale.empty) {
            console.warn("empty scale received");
            return 0;
        }
        if (roman2.scale.empty) {
            console.warn("empty scale received");
            return 0;
        }
        if (roman1.chord.empty) {
            console.warn("empty chord received");
            return 0;
        }
        if (roman2.chord.empty) {
            console.warn("empty chord received");
            return 0;
        }
        return getDistance(new RomanChord(roman1.scale, roman1.chord), new RomanChord(roman2.scale, roman2.chord)); // TPS.getDistance と書いた方が分かりやすいか.
    }
    getMinimumPath() {
        const trace = dynamicLogViterbi(Math.getZeros(this.lead_sheet_chords.length), this.getStatesAtTheTime.bind(this), this.getDistanceOfStates.bind(this), () => 0, this.getChordIdSequence(), true).trace;
        return trace.map(id => __classPrivateFieldGet(this, _ChordProgression_dict, "f").getItemFromRomanId(id));
    }
}
_ChordProgression_dict = new WeakMap(), _ChordProgression_instances = new WeakSet(), _ChordProgression_setDictionary = function _ChordProgression_setDictionary(lead_sheet_chords) {
    for (const chord_str of lead_sheet_chords) {
        const chord = getChord(chord_str);
        const candidate_scales = getKeysIncludeTheChord(chord);
        for (const scale of candidate_scales) {
            __classPrivateFieldGet(this, _ChordProgression_dict, "f").register(chord, scale);
        }
        if (candidate_scales.length === 0) {
            __classPrivateFieldGet(this, _ChordProgression_dict, "f").register(chord, Scale_default.get("")); // empty スケールをとりあえず登録する TODO: getKeysIncludeTheChord が完成次第, こんなことはやめる
        }
    }
};
//# sourceMappingURL=TonalEx.js.map