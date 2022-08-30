import { 
    rootDistance, 
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

// Range test for regionDistance
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
        if (regionDistance(i, j) > 6) { throw new Error("regionDistance must be in range [0, 6]. received is regionDistance(" + i + "," + j + ") = " + regionDistance(i, j)); }
    }
}

// Range tes for root Distances
for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
        if (rootDistance(i, j) > 3) { throw new Error("rootDistance must be in range [0, 3] received is rootDistance(" + i + "," + j + ") = " + rootDistance(i, j)); }
    }
}

