import { Chord_default, Scale_default } from "../adapters/Tonal.js";
import { mod } from "../Math/Math.js";
import { RomanChord, } from "../TonalEx/TonalEx.js";
import {
    getDistance,
    tonicDistance,
    regionDistance,
} from "./TPS.js";

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

const chromaToScale = [
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
        const distance = regionDistance(
            Scale_default.get(`${chromaToScale[i]} major`),
            Scale_default.get(chromaToScale[j] + " major")
        );
        if (distance < -6 || 6 < distance) {
            throw new Error("regionDistance must be in range [0, 6]. received is regionDistance(" + i + "," + j + ") = " + distance);
        }
    }
}

// Range tes for root Distances
const AtoG = ["A", "B", "C", "D", "E", "F", "G"];
for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        const distance = tonicDistance(
            Chord_default.get(chromaToScale[i]),
            Chord_default.get(chromaToScale[j])
        );
        if (distance < -3 || 3 < distance) {
            throw new Error("rootDistance must be in range [0, 3] received is rootDistance(" + i + "," + j + ") = " + distance);
        }
        const diff
            = AtoG.indexOf(chromaToScale[i].slice(0, 1))
            - AtoG.indexOf(chromaToScale[j].slice(0, 1));
        const correctDistance = ((diff) => {
            const dist_in_circle_of_3rd = mod(diff * 3, 7);
            return Math.min(dist_in_circle_of_3rd, 7 - dist_in_circle_of_3rd);
        })(diff);
        if (distance !== correctDistance) {
            console.log(`i: ${chromaToScale[i]}, j: ${chromaToScale[j]}, ${distance} !== ${correctDistance}`);
            throw new Error("distance value is wrong");
        }
    }
}

//TODO: create test of getBasicSpace
//TODO: create test of basicSpaceDistance

console.log(getDistance(
    new RomanChord(Scale_default.get("C major"), Chord_default.get("C")),
    new RomanChord(Scale_default.get("C major"), Chord_default.get("G"))
));
console.log(getDistance(
    new RomanChord(Scale_default.get("C major"), Chord_default.get("Dm")),
    new RomanChord(Scale_default.get("C major"), Chord_default.get("Am"))
));
console.log(getDistance(
    new RomanChord(Scale_default.get("C major"), Chord_default.get("C")),
    new RomanChord(Scale_default.get("C major"), Chord_default.get("Em"))
));
console.log(getDistance(
    new RomanChord(Scale_default.get("C major"), Chord_default.get("Dm")),
    new RomanChord(Scale_default.get("C major"), Chord_default.get("F"))
));
