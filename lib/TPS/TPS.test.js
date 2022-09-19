import { Chord_default, Key_default, Scale_default } from "../adapters/Tonal.js";
import { mod, getZeros, sameArray } from "../Math/Math.js";
import { Assertion, assertNonNullable } from "../StdLib/stdlib.js";
import { getIntervalDegree, getNonNullableChroma, RomanChord, } from "../TonalEx/TonalEx.js";
import { getDistance, tonicDistance, regionDistance, getBasicSpace, } from "./TPS.js";
/*
const Cmaj = getBasicSpace(Chroma.C, Key_quality.major, 1);
const Gmaj = getBasicSpace(Chroma.C, Key_quality.major, 5);
const G7 = getBasicSpace(Chroma.C, Key_quality.major, 5, Chord_index.seventh);
const F46 = getBasicSpace(Chroma.C, Key_quality.major, 4, Chord_index.added46);
console.log(Cmaj, Gmaj, G7, F46);
console.log(basicSpaceDist(Cmaj, Gmaj));
console.log(basicSpaceDist(Gmaj, Cmaj));
console.log(basicSpaceDist(Cmaj, G7));
console.log(basicSpaceDist(G7, Cmaj));
*/
const all_note_symbols = [
    "Ab", "A", "A#",
    "Bb", "B", "B#",
    "Cb", "C", "C#",
    "Db", "D", "D#",
    "Eb", "E", "E#",
    "Fb", "F", "F#",
    "Gb", "G", "G#",
];
// Range test for regionDistance
for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        const distance = regionDistance(Scale_default.get(`${all_note_symbols[i]} major`), Scale_default.get(`${all_note_symbols[j]} major`));
        if (distance < -6 || 6 < distance) {
            throw new Error(`regionDistance must be in range [0, 6]. received is regionDistance(${i}, ${j}) = ${distance}`);
        }
    }
}
// Range tes for root Distances
const AtoG = ["A", "B", "C", "D", "E", "F", "G"];
for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        const distance = tonicDistance(Chord_default.get(all_note_symbols[i]), Chord_default.get(all_note_symbols[j]));
        if (distance < -3 || 3 < distance) {
            throw new Error(`rootDistance must be in range [0, 3] received is rootDistance(${i}, ${j}) = ${distance}`);
        }
        const diff = AtoG.indexOf(all_note_symbols[i].slice(0, 1))
            - AtoG.indexOf(all_note_symbols[j].slice(0, 1));
        const correctDistance = ((diff) => {
            const dist_in_circle_of_3rd = mod(diff * 3, 7);
            return Math.min(dist_in_circle_of_3rd, 7 - dist_in_circle_of_3rd);
        })(diff);
        if (distance !== correctDistance) {
            console.log(`i: ${all_note_symbols[i]}, j: ${all_note_symbols[j]}, ${distance} !== ${correctDistance}`);
            throw new Error("distance value is wrong");
        }
    }
}
// Basic Space Test (No Transpose)
for (const note_symbol of all_note_symbols) {
    const key = Key_default.majorKey(note_symbol); // TODO: minor key も
    new Assertion(key.chords.length != 0)
        .onFailed(() => {
        console.log(`received: ${key}`);
        throw new TypeError("empty key received.");
    });
    const scale = Scale_default.get(key.chordScales[0]);
    const chords = key.chords
        .map((chord_str) => Chord_default.get(chord_str));
    for (const chord of chords) {
        const tonic = assertNonNullable(chord.tonic);
        const fifths = chord.notes
            .filter((note) => getIntervalDegree(tonic, note) == 5);
        new Assertion(fifths.length == 1)
            .onFailed(() => {
            console.log(`received: ${fifths}`);
            throw new Error(`Expected just one "fifth note"`);
        });
        const expected_BS = getZeros(12)
            .map((_, i) => {
            // tonic
            if (getNonNullableChroma(tonic) == i) {
                return 4;
            }
            // fifth
            if (getNonNullableChroma(fifths[0]) == i) {
                return 3;
            }
            // chord notes
            if (chord.notes
                .map((note) => getNonNullableChroma(note))
                .includes(i)) {
                return 2;
            }
            // scale notes
            if (key.scale
                .map((note) => getNonNullableChroma(note))
                .includes(i)) {
                return 1;
            }
            // non scale notes
            return 0;
        });
        const received_BS = getBasicSpace(new RomanChord(scale, chord));
        new Assertion(sameArray(received_BS, expected_BS))
            .onFailed(() => {
            console.log(`received: ${received_BS}`);
            console.log(`expected: ${expected_BS}`);
            throw new Error(`basic space is wrong`);
        });
    }
    console.log(`done`);
}
//TODO: create test of getBasicSpace
//TODO: create test of basicSpaceDistance
//TODO: delete below
console.log(getDistance(new RomanChord(Scale_default.get("C major"), Chord_default.get("C")), new RomanChord(Scale_default.get("C major"), Chord_default.get("G"))));
console.log(getDistance(new RomanChord(Scale_default.get("C major"), Chord_default.get("Dm")), new RomanChord(Scale_default.get("C major"), Chord_default.get("Am"))));
console.log(getDistance(new RomanChord(Scale_default.get("C major"), Chord_default.get("C")), new RomanChord(Scale_default.get("C major"), Chord_default.get("Em"))));
console.log(getDistance(new RomanChord(Scale_default.get("C major"), Chord_default.get("Dm")), new RomanChord(Scale_default.get("C major"), Chord_default.get("F"))));
//# sourceMappingURL=TPS.test.js.map