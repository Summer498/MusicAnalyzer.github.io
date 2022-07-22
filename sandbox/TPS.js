import * as Math from "./math.js"
import * as StdLib from "./stdlib.js"

const Key_quality = {
	major: [0, 2, 4, 5, 7, 9, 11],
	minor: [0, 2, 3, 5, 7, 8, 10]
};

const Chroma = {
	Cflat: 11, C: 0, Csharp: 1,
	Dflat: 1, D: 2, Dsharp: 3,
	Eflat: 3, E: 4, Esharp: 5,
	Fflat: 4, F: 5, Fsharp: 6,
	Gflat: 6, G: 7, Gsharp: 8,
	Aflat: 8, A: 9, Asharp: 10,
	Bflat: 10, B: 11, Bsharp: 0,
};

const Chord_index = {
	none: { rmv: [], add: [] },
	seventh: { rmv: [], add: [7] },
	ninth: { rmv: [], add: [7, 9] },
	added6: { rmv: [5], add: [6] },
	added46: { rmv: [3, 5], add: [4, 6] },
};

const Alt5 = {
	dim5: -1,
	none: 0,
	aug5: 1
};

//TODO: +46, +6 要る?
/**
 * @brief get Basic Space of chord
 * @param key key in which chord is (key is like Chroma.Fsharp)
 * @param key_quality key in which chord is (key_quality is like Key_quality.major)
 * @param degree degree of chord in the key (degree is in {1,2,...,7})
 * @param indexes indexes of chord: one of {0, 6, 7, 9} (default:0)
 * @param alt5 of chord in the key: one of {-1, 0, 1} (default:0)
 * @return Basic Space of chord
 */
const get_BS = (key, key_quality, degree, indexes = Chord_index.none, alt5 = 0) => {
	//TODO:
	console.assert(degree);
	const d = degree;
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
 * @param src: pitch class of source region's tonic 
 * @param dst: pitch class of destination region's tonic 
 * @return difference between src and dst in chromatic circle of fifth
 */
const region_dist = (src, dst) => ((dst - src) * 7).mod(12);

/**
 * @brief distance of root in chord distance function
 * @param src: pitch class of source chord's root 
 * @param dst: pitch class of destination chord's root 
 * @return difference between src and dst in diatonic circle of fifth
 */
const root_dist = (src, dst) => ((dst - src) * 3).mod(7);

/**
 * @brief distance of BS in chord distance function
 * @param src: pitch class of source chord's BS
 * @param dst: pitch class of destination chord's BS 
 * @return count of additional pitch class in dst from src
 */
const BS_dist = (src, dst) => {
	let sum = 0;
	dst.v_sub(src).map(e => sum += Math.max(0, e));
	return sum;
};

const Cmaj = get_BS(Chroma.C, Key_quality.major, 1);
const Gmaj = get_BS(Chroma.C, Key_quality.major, 5);
const G7 = get_BS(Chroma.C, Key_quality.major, 5, Chord_index.seventh);
const F46 = get_BS(Chroma.C, Key_quality.major, 4, Chord_index.added46);
console.log(Cmaj, Gmaj, G7, F46);
console.log(BS_dist(Cmaj, Gmaj));
console.log(BS_dist(Gmaj, Cmaj));
console.log(BS_dist(Cmaj, G7));
console.log(BS_dist(G7, Cmaj));


/*
class _ThirteenthChord {
	constructor(root, degrees, tones) {
		this.root = root;
		this.degrees = degrees;
		this.tones = tones;
	}
	change(i, v) {
		this.degrees.change(i, v);
	}
}

class _EleventhChord extends _ThirteenthChord {
	constructor(root, degrees, tones) { super(root, degrees, tones); }
	get flat13() { return this.tones.change(6, 8); }
	get thirteenth() { return (new _ThirteenthChord(this.root, this.degrees, this.tones)).change(6, 9); }
	add(...tensions) {
		const numbers = tensions.filter(e => e.isTheType(Number));
		const degrees = numbers.map(e => Math.ceil((e < 7 ? e : e + 1) / 2));
		//		return this.tones[numbers[i]] = degrees[i].v_mult(7).mod(12);
	}
}

class _NinthChord extends _EleventhChord {
	constructor(root, degrees, tones) { super(root, degrees, tones); }
	get eleventh() { return (new _EleventhChord()).change(5, 5); }
	get sharp11() { return (new _EleventhChord()).change(5, 6); }
}

class _AlteredSeventhChord extends _NinthChord {
	constructor(root, degrees, tones) { super(root, degrees, tones); }
	get flat9() { return (new _NinthChord()).change(4, 1); }
	get ninth() { return (new _NinthChord()).change(4, 2); }
}

class _SeventhChord extends _AlteredSeventhChord {
	constructor(root, degrees, tones) { super(root, degrees, tones); }
	get flat5() { return (new _AlteredSeventhChord()).change(2, 6); }
	get sharp5() { return (new _AlteredSeventhChord()).change(2, 8); }
}

class _TiradChord extends _SeventhChord {
	constructor(root, degrees, tones) { super(root, degrees, tones); }
	get seventh() { return (new _SeventhChord()).change(3, 10); }
	get M() { return (new _SeventhChord()).change(3, 11); }
	get M7() { return (new _SeventhChord()).change(3, 11); }
}

class Chord extends _TiradChord {
	constructor(root) { super(root, [1, 3, 5], [root + 0, root + 4, root + 7]); }
	get m() { return (new _TiradChord(this.root, this.degrees, this.tones)).change(1, 3); }
}

const Cchord = (new Chord(0,)).m.seventh;
console.log(Cchord);
*/
