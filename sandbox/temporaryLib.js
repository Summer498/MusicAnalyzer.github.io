import { HTML } from "../lib/HTML/HTML.js";
import * as Math from "../lib/Math/Math.js";
"use strict";

export function accidental_num(accidental_symbol) {
    console.assert(typeof accidental_symbol == "string");
    const accidental_index = "b♮#".indexOf(accidental_symbol);
    console.assert(accidental_index >= 0);
    return accidental_index - 1;
}

export function chroma(note) {
    console.assert(typeof note == "string");
    const len = note.length;
    console.assert(len >= 1 && len < 3);
    const char_num = "C1D3EF6G8A0B".indexOf(note[0]);
    console.assert(char_num >= 0);

    return len != 2 ? char_num : (char_num + accidental_num(note[1])).mod(12);
}

export function keySignature(key) {
    console.assert(typeof key == "string" || isNaN(key) == false);
    const len = key.length;
    console.assert(len >= 1 && len < 3);
    if (isNaN(key) == false) { return (key * 7 + 5).mod(12) - 5; }
    else {
        const capital_key = key[0].toUpperCase() + (len >= 2 ? key[1] : "");  // 先頭を大文字に変換

        // minor なら 3 半音下げる
        const base = "abcdefg".indexOf(key[0]) >= 0 ? -3 : 0;
        const accidental_cnt = (chroma(capital_key) * 7 + base + 5).mod(12) - 5;
        const input_accidental = len == 2 ? accidental_num(key[1]) : 0;

        // 調号が 5 つより多い場合, 入力されたキーの調号に合わせて#,bを付ける. e.g.)#5 -> b7
        if (Math.abs(accidental_cnt) >= 5) {
            if (input_accidental != Math.sign(accidental_cnt)) { return accidental_cnt + input_accidental * 12; }
        }
        return accidental_cnt;
    }
}

export function str_key_signature(key_signature) {
    console.assert(isNaN(key_signature) == false);
    return "b♮#"[Math.sign(key_signature) + 1] + String(Math.abs(key_signature));
}

// ノートナンバーとキーからシンボルを得る
export function note_symbol(note, key_signature = 0) {
    if (isNaN(note) == true) {throw new TypeError("note must be number");}
    if (isNaN(key_signature) == true) {throw new TypeError("note must be number");}
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
export function interval(note_symbol0, note_symbol1) {
    console.assert(typeof note_symbol0 == "string");
    console.assert(typeof note_symbol1 == "string");
    const deg = [
        "ABCDEFG".indexOf(note_symbol0[0]),
        "ABCDEFG".indexOf(note_symbol1[0])
    ];
    console.assert(deg[0] >= 0 && deg[1] >= 0);

    const deg_diff = (deg[1] - deg[0]).mod(7);
    const acc_symbol = (chroma(note_symbol1) - chroma(note_symbol0) - [0, 1, 3, 5, 7, 8, 10][deg_diff] + 6).mod(12) - 6;

    if (deg_diff == 0 && acc_symbol < 0) { return [acc_symbol, 8]; }
    return [acc_symbol, deg_diff + 1];
}

export function inv_interval(interval) {
    console.assert(typeof interval == "object");
    console.assert(isNaN(interval[0]) == false);
    console.assert(isNaN(interval[1]) == false);
    if (interval[1] in [2, 3, 6, 7]) { return [1 - interval[0], 9 - interval[1]]; }
    return [-interval[0], 9 - interval[1]];
}

export function str_interval(interval) {
    console.assert(isNaN(interval[0]) == false);
    const table = [1, 4, 5, 8].indexOf(interval[1]) >= 0 ?["ddd", "dd", "d", "P", "A", "AA", "AAA"] :["ddd", "dd", "d", "m", "M", "A", "AA", "AAA"];
    return table[interval[0] + 3] + String(interval[1]);
}
