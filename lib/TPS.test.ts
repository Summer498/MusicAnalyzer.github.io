import { getBasicSpace, Chroma, Key_quality, Chord_index, basicSpaceDist, newGetDistance } from "./TPS.js";

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

console.log(newGetDistance("C", "G"));
console.log(newGetDistance("Dm", "Am"));
console.log(newGetDistance("C", "E"));
console.log(newGetDistance("Dm", "Fm"));
