import * as Math from "../lib/Math/Math.js";
import { chroma, interval, keySignature, note_symbol, str_interval, str_key_signature } from "./temporaryLib";
const major = [0, 2, 4, 5, 7, 9, 11];
const minor = [0, 2, 3, 5, 7, 8, 10];
if (!Math.sameArray(major, [0, 2, 4, 5, 7, 9, 11])) {
    throw new Error("major scale is wrong");
}
if (!Math.sameArray(minor, [0, 2, 3, 5, 7, 8, 10])) {
    throw new Error("minor scale is wrong");
}
// TEST
(() => {
    for (const abc1 of "cdefgab") {
        for (const accidental1 of ["b", "", "#"]) {
            const note1 = abc1.toUpperCase() + accidental1;
            let msg = note1 + ": ";
            for (const abc2 of "cdefgab") {
                for (const accidental2 of ["b", "", "#"]) {
                    const note2 = abc2.toUpperCase() + accidental2;
                    msg += note2 + str_interval(interval(note1, note2)) + " ";
                }
            }
            // console.log(msg);
        }
    }
})();
// TEST
(() => {
    const correct = {
        'F': -1, 'C': 0, 'G': 1, 'Fb': 4, 'Cb': -7, 'B': 5, 'F#': 6, 'Gb': -6, 'Db': -5, 'C#': 7, 'G#': -4, 'E': 4,
        'd': -1, 'a': 0, 'e': 1, 'db': 4, 'ab': -7, 'g#': 5, 'd#': 6, 'eb': -6, 'bb': -5, 'a#': 7, 'e#': -4, 'f': -4,
    };
    const correct2 = { 5: -1, 0: 0, 7: 1, 1: -5, 2: 2, 11: 5, 10: -2, 6: 6 };
    for (const key in correct) {
        if (keySignature(key) != correct[key]) {
            throw new Error("On key " + key + " received value: " + str_key_signature(keySignature(key)) + " but correct is: " + str_key_signature(correct[key]));
        }
    }
    for (const key in correct2) {
        if (keySignature(key) != correct2[key]) {
            throw new Error("On key " + key + " received value: " + str_key_signature(keySignature(key)) + " but correct is: " + str_key_signature(correct2[key]));
        }
    }
})();
// TEST
(() => {
    for (const abc of "abcdefg") {
        for (const accidental of ["b", "", "#"]) {
            for (const is_minor of [false, true]) {
                const scale = is_minor ? minor : major;
                const key = (is_minor ? abc : abc.toUpperCase()) + accidental;
                let msg = "";
                for (const note of scale) {
                    msg += note_symbol(Math.mod(note + chroma(key[0].toUpperCase() + (key.length == 2 ? key[1] : "")), 12), keySignature(key)) + " ";
                }
                if (!Math.forAll(["A", "B", "C", "D", "E", "F", "G"], c => msg.includes(c))) {
                    throw new Error("Generated scale must include all letter of A to G");
                }
                if (msg.includes('#') && msg.includes('b')) {
                    throw new Error("Generated scale must not include both of # and b");
                }
            }
        }
    }
})();
