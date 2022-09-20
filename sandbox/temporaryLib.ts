import { Math } from "../lib/Math/Math.js";
"use strict";

/* eslint-disable deprecation/deprecation */
/** @deprecated */
export const accidental_num = (accidental_symbol: string) => {
    const accidental_index = "b♮#".indexOf(accidental_symbol);
    console.assert(accidental_index >= 0);
    return accidental_index - 1;
};

/** @deprecated */
export const chroma = (note: string) => {
    const len = note.length;
    console.assert(len >= 1 && len < 3);
    const char_num = "C1D3EF6G8A0B".indexOf(note[0]);
    console.assert(char_num >= 0);

    return len != 2 ? char_num : Math.mod(char_num + accidental_num(note[1]), 12);
};

/** @deprecated */
export const keySignature = (key: string | number) => {
    const key_num = Number(key);
    if (isNaN(key_num) == false) { return Math.mod(key_num * 7 + 5, 12) - 5; }
    if (typeof key == "number") { throw new Error("Unexpected code executed"); }

    const len = key.length;
    console.assert(len >= 1 && len < 3);
    const capital_key = key[0].toUpperCase() + (len >= 2 ? key[1] : "");  // 先頭を大文字に変換

    // minor なら 3 半音下げる
    const base = "abcdefg".indexOf(key[0]) >= 0 ? -3 : 0;
    const accidental_cnt = Math.mod(chroma(capital_key) * 7 + base + 5, 12) - 5;
    const input_accidental = len == 2 ? accidental_num(key[1]) : 0;

    // 調号が 5 つより多い場合, 入力されたキーの調号に合わせて#,bを付ける. e.g.)#5 -> b7
    if (Math.abs(accidental_cnt) >= 5) {
        if (input_accidental != Math.sign(accidental_cnt)) { return accidental_cnt + input_accidental * 12; }
    }
    return accidental_cnt;
};

/** @deprecated */
export const str_key_signature = (key_signature: number) =>
    "b♮#"[Math.sign(key_signature) + 1] + String(Math.abs(key_signature));

// ノートナンバーとキーからシンボルを得る
/** @deprecated */
export const note_symbol = (note: number, key_signature = 0) => {
    const symbol = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][Math.mod(note, 12)];

    if (key_signature < 0) {
        const translate: { [key: string]: string }
            = {
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
};

// シンボルから音程を取る
/** @deprecated */
export const interval = (note_symbol0: string, note_symbol1: string) => {
    const deg = [
        "ABCDEFG".indexOf(note_symbol0[0]),
        "ABCDEFG".indexOf(note_symbol1[0])
    ];
    console.assert(deg[0] >= 0 && deg[1] >= 0);

    const deg_diff = Math.mod(deg[1] - deg[0], 7);
    const acc_symbol = Math.mod(chroma(note_symbol1) - chroma(note_symbol0) - [0, 1, 3, 5, 7, 8, 10][deg_diff] + 6, 12) - 6;

    if (deg_diff == 0 && acc_symbol < 0) { return [acc_symbol, 8]; }
    return [acc_symbol, deg_diff + 1];
};

/** @deprecated */
export const inv_interval = (interval: number[]) => {
    if (interval[1] in [2, 3, 6, 7]) { return [1 - interval[0], 9 - interval[1]]; }
    return [-interval[0], 9 - interval[1]];
};

/** @deprecated */
export const str_interval = (interval: number[]) => {
    const table = [1, 4, 5, 8].indexOf(interval[1]) >= 0 ? ["ddd", "dd", "d", "P", "A", "AA", "AAA"] : ["ddd", "dd", "d", "m", "M", "A", "AA", "AAA"];
    return table[interval[0] + 3] + String(interval[1]);
};
