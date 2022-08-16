import * as Math from "./math.js";
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
 * @param {{rmv:(number|never)[],add:(number|never)[]}} indexes indexes of chord: one of {0, 6, 7, 9} (default:0)
 * @param {number} alt5 of chord in the key: one of {-1, 0, 1} (default:0)
 * @return {number[]} Basic Space of chord
 */
export const get_BS = (key, key_quality, degree, indexes = Chord_index.none, alt5 = 0) => {
    //TODO:
    console.assert(degree !== undefined);
    const d = degree;
    console.log(key_quality);
    console.log(key_quality.v_add(key));
    console.log(key_quality.v_add(key).v_mod(12));
    const s = key_quality.v_add(key).v_mod(12);
    s[4] += alt5;
    const code_tone = Math.genArr(3, i => 2 * i + 1).remove(indexes.rmv).concat(indexes.add);
    const c = s.v_get(code_tone.v_add(d - 2).v_mod(7));
    const leveld = s.onehot(12);
    const levelc = c.onehot(12);
    const levelb = [c[0], c[2]].onehot(12);
    const levela = [c[0]].onehot(12);
    return Math.v_sum(leveld, levelc, levelb, levela);
};
/**
 * @brief distance of region in chord distance function
 * @param {number} src pitch class of source region's tonic
 * @param {number} dst pitch class of destination region's tonic
 * @return {number} difference between src and dst in chromatic circle of fifth
 */
export const region_dist = (src, dst) => ((dst - src) * 7).mod(12);
/**
 * @brief distance of root in chord distance function
 * @param {number} src pitch class of source chord's root
 * @param {number} dst pitch class of destination chord's root
 * @return {number} difference between src and dst in diatonic circle of fifth
 */
export const root_dist = (src, dst) => ((dst - src) * 3).mod(7);
/**
 * @brief distance of BS in chord distance function
 * @param {number[]} src pitch class of source chord's BS
 * @param {number[]} dst pitch class of destination chord's BS
 * @return {number} count of additional pitch class in dst from src
 */
export const BS_dist = (src, dst) => {
    let sum = 0;
    dst.v_sub(src).map(e => sum += Math.max(0, e));
    return sum;
};
export const chord_dist = (src, dst) => {
    // TODO: 遠隔調の例外処理
    return region_dist(src.key, dst.key)
        + root_dist(src.degree, dst.degree)
        + BS_dist(get_BS(src.key, src.quality, src.degree, src.indexes, src.alt5), get_BS(dst.key, dst.quality, dst.degree, dst.indexes, dst.alt5));
};
// TODO: もう少し Tonaljs friendly に書く
// TODO: テストは分離する
const Cmaj = get_BS(Chroma.C, Key_quality.major, 1);
const Gmaj = get_BS(Chroma.C, Key_quality.major, 5);
const G7 = get_BS(Chroma.C, Key_quality.major, 5, Chord_index.seventh);
const F46 = get_BS(Chroma.C, Key_quality.major, 4, Chord_index.added46);
console.log(Cmaj, Gmaj, G7, F46);
console.log(BS_dist(Cmaj, Gmaj));
console.log(BS_dist(Gmaj, Cmaj));
console.log(BS_dist(Cmaj, G7));
console.log(BS_dist(G7, Cmaj));
