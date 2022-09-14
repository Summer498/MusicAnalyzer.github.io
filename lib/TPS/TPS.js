import * as Math from "../Math/Math.js";
import { Note, Interval, Scale_default, Pcset_default, Chord_default } from "../adapters/Tonal.js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * @brief distance of region in chord distance function
 * @param {number} src pitch class of source region's tonic
 * @param {number} dst pitch class of destination region's tonic
 * @return {number} difference between src and dst in chromatic circle of fifth
 */
export const regionDistance_in_chroma_number = (src, dst) => {
    return Math.abs(((dst - src) * 7 + 6).mod(12) - 6);
};
export const regionDistance = (src, dst) => {
    const src_tonic = src.scale.tonic;
    const dst_tonic = dst.scale.tonic;
    if (src_tonic == null) {
        throw new TypeError("src_chroma must not be null");
    }
    if (dst_tonic == null) {
        throw new TypeError("src_chroma must not be null");
    }
    const src_chroma = Note.chroma(src_tonic);
    const dst_chroma = Note.chroma(dst_tonic);
    if (src_chroma == undefined) {
        console.log(src.scale);
        throw new TypeError("src_chroma must not be undefined");
    }
    if (dst_chroma == undefined) {
        console.log(dst.scale);
        throw new TypeError("dst_chroma must not be undefined");
    }
    const region_dist = regionDistance_in_chroma_number(src_chroma, dst_chroma);
    return region_dist;
};
/**
 * @brief distance of root in chord distance function
 * @param {number} src pitch class of source chord's root
 * @param {number} dst pitch class of destination chord's root
 * @return {number} difference between src and dst in diatonic circle of fifth
 */
export const rootDistance_in_chroma_number = (src, dst) => {
    return Math.abs(Math.mod((dst - src) * 3 + 3, 7) - 3);
};
export const rootDistance = (src, dst) => {
    const src_tonic = src.chord.tonic;
    const dst_tonic = dst.chord.tonic;
    if (src_tonic == null) {
        throw TypeError("src_tonic must not be null");
    }
    if (dst_tonic == null) {
        throw TypeError("src_tonic must not be null");
    }
    const src_degree = Number(Interval.distance(src.scale, src_tonic)[0]);
    const dst_degree = Number(Interval.distance(dst.scale, dst_tonic)[0]);
    if (src_degree < 1 || 7 < src_degree
        || dst_degree < 1 || 7 < dst_degree) {
        throw new Error("Unexpected Value received");
    }
    const root_dist = rootDistance_in_chroma_number(src_degree, dst_degree);
    return root_dist;
};
const basicSpaceDistance = (src_chord, dst_chord) => {
    // TODO:
    return 0;
};
const get_basic_space = (chord) => {
    const level_a = Math.Zeros(12);
    const level_b = Math.Zeros(12);
    const level_c = Math.Zeros(12);
    const level_d = Math.Zeros(12);
    const root = chord.chord.root;
    const basic_space = Math.v_sum(level_a, level_b, level_c, level_d);
    return basic_space;
};
export const getDistance = (src_chord_string, dst_chord_string) => {
    const src = src_chord_string;
    const dst = dst_chord_string;
    console.log(src, dst);
    const region_dist = regionDistance(src, dst);
    console.log("region_dist", region_dist);
    const root_dist = rootDistance(src, dst);
    console.log("root_dist", root_dist);
    const basic_space_dist = basicSpaceDistance(src, dst);
    console.log("basic_space_dist", basic_space_dist);
    // TODO: ベーシックスペース間の距離を求める
    // TODO: ベーシックスペースを求める
    return -99; //dummy
};
// 最も尤もらしいコード進行を見つける
const major_keys = ['Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B',].map(key => Scale_default.get(key + " major"));
const minor_keys = ['Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#',].map(key => Scale_default.get(key + " minor"));
const keys = major_keys.concat(minor_keys);
export const getScaleIncludesTheChord = (chord_string) => {
    const chord_notes = Chord_default.get(chord_string).notes;
    const keys_includes_the_chord = keys.filter(key => Math.forAll(chord_notes, (note) => Pcset_default.isNoteIncludedIn(key.notes)(note)));
    return keys_includes_the_chord.map(key => {
        return { name: key.name.replace('aeolian', 'minor'), tonic: key.tonic, notes: key.notes };
    });
};
const getMostLikelyChordProgression = (chord_progression) => {
    const possible_keys = chord_progression.forEach(chord => getScaleIncludesTheChord(chord));
    return undefined;
};
// BEGIN: 古いやつ
export const Key_quality = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10]
};
export const Chroma = {
    Cflat: 11, C: 0, Csharp: 1,
    Dflat: 1, D: 2, Dsharp: 3,
    Eflat: 3, E: 4, Esharp: 5,
    Fflat: 4, F: 5, Fsharp: 6,
    Gflat: 6, G: 7, Gsharp: 8,
    Aflat: 8, A: 9, Asharp: 10,
    Bflat: 10, B: 11, Bsharp: 0,
};
export const Chord_index = {
    none: { rmv: [], add: [] },
    seventh: { rmv: [], add: [7] },
    ninth: { rmv: [], add: [7, 9] },
    added6: { rmv: [5], add: [6] },
    added46: { rmv: [3, 5], add: [4, 6] },
};
export const Alt5 = {
    dim5: -1,
    none: 0,
    aug5: 1
};
//TODO: +46, +6 要る?
/**
 * @brief get Basic Space of chord
 * @param {number} key key in which chord is (key is like Chroma.Fsharp)
 * @param {number[]} key_quality key in which chord is (key_quality is like Key_quality.major)
 * @param {number} degree degree of chord in the key (degree is in {1,2,...,7})
 * @param {{rmv:(number|never)[],add:(number|never)[]}} chord_index indexes of chord: one of {0, 6, 7, 9} (default:0)
 * @param {number} alt5 of chord in the key: one of {-1, 0, 1} (default:0)
 * @return {number[]} Basic Space of chord
 */
export const getBasicSpace = (key, key_quality, degree, chord_index = Chord_index.none, alt5 = 0) => {
    //TODO:
    console.assert(degree !== undefined);
    const d = degree;
    console.log(key_quality);
    console.log(key_quality.v_add(key));
    console.log(key_quality.v_add(key).v_mod(12));
    const s = key_quality.v_add(key).v_mod(12);
    s[4] += alt5;
    const code_tone = Math.genArr(3, i => 2 * i + 1).remove(chord_index.rmv).concat(chord_index.add);
    const c = s.v_get(code_tone.v_add(d - 2).v_mod(7));
    const leveld = s.onehot(12);
    const levelc = c.onehot(12);
    const levelb = [c[0], c[2]].onehot(12);
    const levela = [c[0]].onehot(12);
    return Math.v_sum(leveld, levelc, levelb, levela);
};
/**
 * @brief distance of BS in chord distance function
 * @param {number[]} src pitch class of source chord's BS
 * @param {number[]} dst pitch class of destination chord's BS
 * @return {number} count of additional pitch class in dst from src
 */
export const basicSpaceDist = (src, dst) => {
    let sum = 0;
    dst.v_sub(src).map(e => { sum += Math.max(0, e); return sum; });
    return sum;
};
export const chordDist = (src, dst) => {
    // TODO: 遠隔調の例外処理
    return regionDistance_in_chroma_number(src.key, dst.key)
        + rootDistance_in_chroma_number(src.degree, dst.degree)
        + basicSpaceDist(getBasicSpace(src.key, src.quality, src.degree, src.indexes, src.alt5), getBasicSpace(dst.key, dst.quality, dst.degree, dst.indexes, dst.alt5));
};
// TODO: もう少し Tonaljs friendly に書く
// END: 古いやつ
