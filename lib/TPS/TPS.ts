import * as Math from "../Math/Math.js";
import { RomanChord } from "../TonalEx/TonalEx.js";
import { Note, Interval, Scale_default, Pcset_default, Chord_default, Chord, Scale } from "../adapters/Tonal.js";
import { castToNumber, excludeNull, excludeUndefined } from "../StdLib/stdlib.js";
import { chroma } from "../../sandbox/temporaryLib.js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

/**
 * @brief distance of region in chord distance function
 * @param {number} src pitch class of source region's tonic 
 * @param {number} dst pitch class of destination region's tonic 
 * @return {number} difference between src and dst in chromatic circle of fifth
 */
export const regionDistance_in_chroma_number = (src: number, dst: number) => {
	return Math.abs(((dst - src) * 7 + 6).mod(12) - 6);
};

export const regionDistance = (src: Scale, dst: Scale) => {
	const src_chroma = chroma(
		excludeUndefined(
			excludeNull(src.tonic)
		));
	const dst_chroma = chroma(
		excludeUndefined(
			excludeNull(dst.tonic)
		));

	const region_dist = regionDistance_in_chroma_number(src_chroma, dst_chroma);
	return region_dist;
};

/**
 * @brief distance of root in chord distance function
 * @param {number} src pitch class of source chord's root 
 * @param {number} dst pitch class of destination chord's root 
 * @return {number} difference between src and dst in diatonic circle of fifth
 */
export const rootDistance_in_chroma_number = (src: number, dst: number) => {
	return Math.abs(Math.mod((dst - src) * 3 + 3, 7) - 3);
};

export const rootDistance = (src: Chord, dst: Chord) => {
	const interval = castToNumber(
		Interval.distance(
			excludeNull(src.tonic),
			excludeNull(dst.tonic)
		).slice(0, 1));
	if (interval < 1 || 7 < interval) {
		throw new TypeError("interval must be in range [1,7]");
	}
	return Math.abs(Math.mod((interval - 1) * 3 + 3, 7) - 3);
};

const basicSpaceDistance = (src_chord: RomanChord, dst_chord: RomanChord) => {
	// TODO:
	return 0;
};


const get_basic_space = (chord: RomanChord) => {
	const level_a = Math.Zeros(12);
	const level_b = Math.Zeros(12);
	const level_c = Math.Zeros(12);
	const level_d = Math.Zeros(12);
	const root = chord.chord.root;


	const basic_space = Math.v_sum(level_a, level_b, level_c, level_d);
	return basic_space;
};

export const getDistance = (src_chord_string: RomanChord, dst_chord_string: RomanChord): number => {
	const src = src_chord_string;
	const dst = dst_chord_string;
	console.log(src, dst);
	const region_dist = regionDistance(src.scale, dst.scale);
	console.log("region_dist", region_dist);
	const root_dist = rootDistance(src.chord, dst.chord);
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

export const getScaleIncludesTheChord = (chord_string: string) => {
	const chord_notes = Chord_default.get(chord_string).notes;
	const keys_includes_the_chord = keys.filter(key => Math.forAll(chord_notes, (note) => Pcset_default.isNoteIncludedIn(key.notes)(note)));
	return keys_includes_the_chord.map(key => {
		return { name: key.name.replace('aeolian', 'minor'), tonic: key.tonic, notes: key.notes };
	});
};

const getMostLikelyChordProgression = (chord_progression: string[]) => {
	const possible_keys = chord_progression.forEach(chord => getScaleIncludesTheChord(chord));
	return undefined;
};




























// BEGIN: 古いやつ

export const Key_quality = {
	major: [0, 2, 4, 5, 7, 9, 11],
	minor: [0, 2, 3, 5, 7, 8, 10]
};

/*
export const Chroma = {
	Cflat: 11, C: 0, Csharp: 1,
	Dflat: 1, D: 2, Dsharp: 3,
	Eflat: 3, E: 4, Esharp: 5,
	Fflat: 4, F: 5, Fsharp: 6,
	Gflat: 6, G: 7, Gsharp: 8,
	Aflat: 8, A: 9, Asharp: 10,
	Bflat: 10, B: 11, Bsharp: 0,
};
*/

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
export const getBasicSpace = (
	key: number,
	key_quality: number[],
	degree: number,
	chord_index: { rmv: (number | never)[], add: (number | never)[] } = Chord_index.none,
	alt5 = 0
) => {
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
export const basicSpaceDist = (src: number[], dst: number[]) => {
	let sum = 0;
	dst.v_sub(src).map(e => { sum += Math.max(0, e); return sum; });
	return sum;
};

export const chordDist = (
	src: {
		key: number,
		quality: number[],
		degree: number,
		indexes: { rmv: (number | never)[], add: (number | never)[] }
		alt5: number
	},
	dst: {
		key: number,
		quality: number[],
		degree: number,
		indexes: { rmv: (number | never)[], add: (number | never)[] }
		alt5: number
	}
) => {
	// TODO: 遠隔調の例外処理
	return regionDistance_in_chroma_number(src.key, dst.key)
		+ rootDistance_in_chroma_number(src.degree, dst.degree)
		+ basicSpaceDist(
			getBasicSpace(src.key, src.quality, src.degree, src.indexes, src.alt5),
			getBasicSpace(dst.key, dst.quality, dst.degree, dst.indexes, dst.alt5)
		);
};
// TODO: もう少し Tonaljs friendly に書く


// END: 古いやつ

