import { HTML } from "../lib/HTML.js";
import { SVG } from "../lib/HTML.js";
import * as Math from "../lib/math.js";

const major = [0, 2, 4, 5, 7, 9, 11];
const minor = [0, 2, 3, 5, 7, 8, 10];

"use strict";

function accidental_num(accidental_symbol) {
    console.assert(typeof (accidental_symbol) == "string");
    const accidental_index = "b♮#".indexOf(accidental_symbol);
    console.assert(accidental_index >= 0);
    return accidental_index - 1;
}

function chroma(note) {
    console.assert(typeof (note) == "string");
    const len = note.length;
    console.assert((1 <= len) && (len < 3));
    const char_num = "C1D3EF6G8A0B".indexOf(note[0]);
    console.assert(char_num >= 0);

    return (len != 2) ? char_num : (char_num + accidental_num(note[1])).mod(12);
}

function key_signature(key) {
    console.assert(typeof (key) == "string" || isNaN(key) == false);
    const len = key.length;
    console.assert((1 <= len) && (len < 3));
    if (isNaN(key) == false) { return (key * 7 + 5).mod(12) - 5; }
    else {
        const capital_key = key[0].toUpperCase() + ((len >= 2) ? key[1] : "");  // 先頭を大文字に変換

        // minor なら 3 半音下げる
        const base = ("abcdefg".indexOf(key[0]) >= 0) ? -3 : 0;
        const accidental_cnt = ((chroma(capital_key)) * 7 + base + 5).mod(12) - 5;
        const input_accidental = (len == 2) ? accidental_num(key[1]) : 0;

        // 調号が 5 つより多い場合, 入力されたキーの調号に合わせて#,bを付ける. e.g.)#5 -> b7
        if (Math.abs(accidental_cnt) >= 5) {
            if (input_accidental != Math.sign(accidental_cnt)) { return accidental_cnt + input_accidental * 12; }
        }
        return accidental_cnt;
    }
}

function str_key_signature(key_signature) {
    console.assert(isNaN(key_signature) == false);
    return "b♮#"[Math.sign(key_signature) + 1] + String(Math.abs(key_signature));
}

// ノートナンバーとキーからシンボルを得る
function note_symbol(note, key_signature = 0) {
    console.assert(isNaN(note) == false);
    console.assert(isNaN(key_signature) == false);
    const symbol = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][note.mod(12)];

    if (key_signature < 0) {
        const translate = {
            "C#": "Db",
            "D#": "Eb",
            "F#": "Gb",
            "G#": "Ab",
            "A#": "Bb"
        };
        if (symbol in translate) { return translate[symbol]; }
    }

    if (key_signature >= 6) {
        if (symbol == "F") { return "E#"; }
        if (symbol == "C") { return "B#"; }
    }
    if (key_signature <= -6) {
        if (symbol == "E") { return "Fb"; }
        if (symbol == "B") { return "Cb"; }
    }

    return symbol;
}

// シンボルから音程を取る
function interval(note_symbol0, note_symbol1) {
    console.assert(typeof (note_symbol0) == "string");
    console.assert(typeof (note_symbol1) == "string");
    const deg = [
        "ABCDEFG".indexOf(note_symbol0[0]),
        "ABCDEFG".indexOf(note_symbol1[0])
    ];
    console.assert((deg[0] >= 0) && (deg[1] >= 0));

    const deg_diff = (deg[1] - deg[0]).mod(7);
    const acc_symbol = (chroma(note_symbol1) - chroma(note_symbol0) - [0, 1, 3, 5, 7, 8, 10][deg_diff] + 6).mod(12) - 6;
    //    console.log(note_symbol0,note_symbol1,chroma(note_symbol1))

    if ((deg_diff == 0) && (acc_symbol < 0)) { return [acc_symbol, 8]; }
    return [acc_symbol, deg_diff + 1];
}

function inv_interval(interval) {
    console.assert(typeof (interval) == "object");
    console.assert(isNaN(interval[0]) == false);
    console.assert(isNaN(interval[1]) == false);
    if (interval[1] in [2, 3, 6, 7]) { return [1 - interval[0], 9 - interval[1]]; };
    return [-interval[0], 9 - interval[1]];
}

function str_interval(interval) {
    console.assert(isNaN(interval[0]) == false);
    // UF: Under Flow, OF: Over Flow
    const table = ([1, 4, 5, 8].indexOf(interval[1]) >= 0) ?
        ["ddd", "dd", "d", "P", "A", "AA", "AAA"] :
        ["ddd", "dd", "d", "m", "M", "A", "AA", "AAA"];
    return table[interval[0] + 3] + String(interval[1]);
}

const chromas_in_octave = 12;

class BasicSpace {
    constructor() {
        const n = null;
        this.levels = [n, n, n, n, n, n, n, n, n, n, n, n];
    }
    get root_note() { return this.levels.indexOf(4); }
    get fifth_note() { return this.levels.indexOf(3); }
    get third_note() {
        return this.levels.indexOf(2);
    }
    //TODO: implement 7th note which is in third note
    get diatonic() {
        var diatonic_ = [];
        for (var i = 0; i < 7; i++) {
            if (this.levels[i] != 0) { diatonic_.push(i); }
        }
        console.assert(diatonic_.length == 7);
        return diatonic_;
    }
    get chromatic() { return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; }

    region_distance(k0, k1) {
        console.assert(k0 instanceof BasicSpace);
        console.assert(k1 instanceof BasicSpace);
        const x = k0.diatonic;
        const y = k1.diatonic;
        return Math.abs((y * 7).mod(12) - (x * 7).mod(12));  // 7 = 7^{-1} mod 12
    } //TODO:
    chord_distance(x, y) { return 0; } //TODO:
    basicspace_distance(x, y) { return 0; } //TODO:

    distance(x, y) {
        console.assert(x instanceof BasicSpace);
        console.assert(y instanceof BasicSpace);
        return this.region(x, y) + this.chord_distance(x, y) + this.basicspace_distance(x, y);
    }
}

const bs = new BasicSpace();
bs.levels[2] = 2;
console.log(bs.root_note);



// TEST
for (const abc1 of "cdefgab") {
    for (const accidental1 of ["b", "", "#"]) {
        const note1 = abc1.toUpperCase() + accidental1;

        var msg = note1 + ": ";
        for (const abc2 of "cdefgab") {
            for (const accidental2 of ["b", "", "#"]) {
                const note2 = abc2.toUpperCase() + accidental2;
                msg += note2 + str_interval(interval(note1, note2)) + " ";
            }
        }
        console.log(msg);
    }
}

// TEST
(() => {
    const correct = {
        'F': -1, 'C': 0, 'G': 1, 'Fb': 4, 'Cb': -7, 'B': 5, 'F#': 6, 'Gb': -6, 'Db': -5, 'C#': 7, 'G#': -4, 'E': 4,
        'd': -1, 'a': 0, 'e': 1, 'db': 4, 'ab': -7, 'g#': 5, 'd#': 6, 'eb': -6, 'bb': -5, 'a#': 7, 'e#': -4, 'f': -4,
    };
    const correct2 = { 5: -1, 0: 0, 7: 1, 1: -5, 2: 2, 11: 5, 10: -2, 6: 6 };

    for (const key in correct) {
        console.log(key);
        if (key_signature(key) != correct[key]) { console.log(key, str_key_signature(correct[key]), str_key_signature(key_signature(key)), String(false)); }
    }
    for (const key in correct2) {
        if (key_signature(key) != correct2[key]) { console.log(key, str_key_signature(correct2[key]), str_key_signature(key_signature(key)), String(false)); }
    }
})();

// TEST
for (const abc of "abcdefg") {
    for (const accidental of ["b", "", "#"]) {
        const key = abc.toUpperCase() + accidental;
        var msg = String(key_signature(key)) + " ";
        for (const note of major) {
            msg += note_symbol((note + chroma(key[0].toUpperCase() + ((key.length == 2) ? key[1] : ""))).mod(12), key_signature(key)) + " ";
        }

        for (const c of "ABCDEFG") {
            if (msg.indexOf(c) < 0) {
                msg += " " + String(false);
                break;
            }
        }

        if ((msg.indexOf('#') >= 0) && (msg.indexOf('b') >= 0)) { msg += " " + String(false); }

        console.log(msg);
    }
}

console.log(major);
console.log(major[2]); // E: M3
console.log(minor);
console.log(minor[[4]]);  // P5


/* キーボードを描画する練習 */
const insert_here = document.getElementById("insert_here");

const octave_height = 75,
    whitekey_width = 40,
    whitekey_height = octave_height / 7,
    blackkey_width = whitekey_width / 2,
    blackkey_height = octave_height / 12;

const background =
    SVG.svg({ x: -150.86931316534526 + "%", width: 649.2850333651097 + "%" }, "",
        SVG.g({ class: "melody-background" }, "", [
            Math.Range(3, 7).map(e =>
                SVG.svg({ y: (6 - e) * 75 }, "",
                    SVG.g({}, "", [
                        Math.Range(0, 12).map(e2 => [
                            SVG.rect({ x: 0 + "%", y: e2 * 6.25, fill: "#eeeeee", width: 100 + "%", height: 6.25, opacity: 1 - 0.5 * (e2 + (e2 < 7 ? 1 : 0)).mod(2) }),
                            SVG.line({ x1: 0 + "%", y1: (e2 + 1) * 6.25, x2: 100 + "%", y2: (e2 + 1) * 6.25, "stroke-width": e2 == 11 ? 2 : 1 }),
                            SVG.line({ x1: 0 + "%", y1: e2 * 6.25, x2: 100 + "%", y2: e2 * 6.25, "stroke-width": 1 }),
                        ]),
                    ])
                )
            ),
            // たくさんの line
        ])
    );

const piano_roll =
    SVG.g({ class: "piano-roll" }, "", [
        SVG.rect({ class: "shadow", x: 40, y: 0, width: 3, height: 300 }),
        Math.Range(3, 7).map(e =>
            SVG.svg({ y: (6 - e) * 75 }, "",
                SVG.g({ id: "octave" }, "", [
                    Math.Range(0, 7).map(e2 => SVG.rect({ class: "white-key", x: 0, y: e2 * whitekey_height, width: whitekey_width, height: whitekey_height })),
                    Math.Range(0, 5).map(e2 => SVG.rect({ class: "black-key", x: 0, y: (2 * e2 + (e2 > 2 ? 2 : 1)) * blackkey_height, width: blackkey_width, height: blackkey_height })),
                    SVG.text({ class: "label", x: 25, y: 72 }, "C" + String(e))
                ])
            )
        )
    ]);

const melody_timeline =
    SVG.svg({ width: 100 + "%", height: 300 }, "", [
        background,
        piano_roll
    ]);

console.log(melody_timeline);
//document.insertBefore(white_key, insert_here);
insert_here.appendChild(melody_timeline);
