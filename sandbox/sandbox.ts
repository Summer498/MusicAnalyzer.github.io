// テスト関数をまとめておくところ
import { TreeModel } from "../lib/adapters/Tree.js";  // Tree のインポートを外部ファイルに任せる
import { Progression, Tonal } from "../lib/adapters/Tonal.js";  // Tonal のインポートを外部ファイルに任せる
import { Songle } from "../lib/adapters/Songle.js";  // Songle のインポートを外部ファイルに任せる
import { SongleWidgetAPI, SongleWidgetConstructor } from "../lib/adapters/SongleWidget.js";  // SongleWidget のインポートを外部ファイルに任せる

import { HTML, SVG } from "../lib/HTML/HTML.js";
import * as Math from "../lib/Math/Math.js";
import { str_interval, interval, keySignature, note_symbol, chroma, str_key_signature } from "./temporaryLib.js";
interface SongleWidgetWindow extends Window {
    onSongleWidgetReady: any;
}
export declare const window: SongleWidgetWindow;

// TODO: デバッグモードに応じて動的に読み込む目的は達成できないので消しておいてもよい
// import stylesheets
HTML.head.appendChildren([
    /*
    HTML.link({rel:"stylesheet",href:"css0.css",type:"text/css"}),
    HTML.link({rel:"stylesheet",href:"css1.css",type:"text/css"}),
    HTML.link({rel:"stylesheet",href:"css2.css",type:"text/css"}),
    */
    HTML.link({ rel: "stylesheet", href: "css3.css", type: "text/css" }),
    /*
    HTML.link({rel:"stylesheet",href:"css4.css",type:"text/css"}),
    */
]);

/*
// import scripts
HTML.head.appendChildren([
]);
*/
// === END import ===

const major = [0, 2, 4, 5, 7, 9, 11];
const minor = [0, 2, 3, 5, 7, 8, 10];

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
    const correct: { [key: string]: number }
        = {
        'F': -1, 'C': 0, 'G': 1, 'Fb': 4, 'Cb': -7, 'B': 5, 'F#': 6, 'Gb': -6, 'Db': -5, 'C#': 7, 'G#': -4, 'E': 4,
        'd': -1, 'a': 0, 'e': 1, 'db': 4, 'ab': -7, 'g#': 5, 'd#': 6, 'eb': -6, 'bb': -5, 'a#': 7, 'e#': -4, 'f': -4,
    };
    const correct2: { [key: number]: number }
        = { 5: -1, 0: 0, 7: 1, 1: -5, 2: 2, 11: 5, 10: -2, 6: 6 };

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
                    msg += note_symbol((note + chroma(key[0].toUpperCase() + (key.length == 2 ? key[1] : ""))).mod(12), keySignature(key)) + " ";
                }
                if (!Math.forAll(["A", "B", "C", "D", "E", "F", "G"],
                    c => msg.includes(c))) {
                    throw new Error("Generated scale must include all letter of A to G");
                }
                if (msg.includes('#') && msg.includes('b')) {
                    throw new Error("Generated scale must not include both of # and b");
                }
            }
        }
    }
})();

if (!Math.sameArray(major, [0, 2, 4, 5, 7, 9, 11])) { throw new Error("major scale is wrong"); }
if (!Math.sameArray(minor, [0, 2, 3, 5, 7, 8, 10])) { throw new Error("minor scale is wrong"); }





/* キーボードを描画する練習 */
const insert_here = document.getElementById("insert_here");
if (insert_here == null) {
    throw new TypeError('insert_here must not be null (There must be a tag which id is "insert_here"');
}

const octave_height = 75;
const whitekey_width = 40;
const whitekey_height = octave_height / 7;
const blackkey_width = whitekey_width / 2;
const blackkey_height = octave_height / 12;

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
insert_here.appendChild(melody_timeline);
/* キーボードを描画する練習 */



/* SongleWidget を使う練習 */
window.onload =
    function () {
        const songleWidgetElement =
            SongleWidgetAPI.createSongleWidgetElement({
                api: "songle-widget-api-example",
                url: "www.youtube.com/watch?v=PqJNc9KVIZE"
            });

        document.body.appendChild(songleWidgetElement);
    };

window.onSongleWidgetReady =
    function (apiKey: any, songleWidget: SongleWidgetConstructor) {
        songleWidget.volume = SongleWidgetAPI.MIN_VOLUME; // Min volume.
        songleWidget.volume = SongleWidgetAPI.MAX_VOLUME; // Max volume.
        const chords = songleWidget.song.scene.chords.map((e: any) => e.name); // コードをすべて取り出す
        /*
        console.log(chords);
        console.log(chord2roman(chords));  // Cキーを基準としたローマ数字を呼び出すだけのダミー関数
        console.log("Tonal.Chord.get(chords):", chords.map(e => {
            if (e === "N") { return ChordObject.none; }
            return getChordInfo(e);
        }));
        // console.log(e.song.scene.notes.map(e => e.pitch), "ドキュメントには書いてあるが実際は取れない"); // ドキュメントには書いてあるが実際は取れない
        // console.log(e.song.scene.notes.map(e => e.number), "ドキュメントには書いてあるが実際は取れない"); // ドキュメントには書いてあるが実際は取れない
        console.log(e);
        //*/
    };






/* コードからローマ数字表記を求める */

const chord2roman = (chords: string[]) => {
    const key = "C";  // TODO: キーを求める
    const codes2 = ["CMaj7", "Dm7", "G7"];
    // TODO: キーを求める = TPS の出番
    return Progression.toRomanNumerals(key, chords);
};