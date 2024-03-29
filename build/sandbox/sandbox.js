import { songle_window } from "../lib/adapters/Songle/Songle.js"; // Songle のインポートを外部ファイルに任せる
import { SongleWidgetAPI, songle_widget_window } from "../lib/adapters/SongleWidget/SongleWidget.js"; // SongleWidget のインポートを外部ファイルに任せる
import { HTML, SVG } from "../lib/HTML/HTML.js";
import { Math } from "../lib/Math/Math.js";
import { ChordProgression } from "../lib/TonalEx/TonalEx.js";
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
const background = SVG.svg({ x: -150.86931316534526 + "%", width: 649.2850333651097 + "%" }, "", SVG.g({ class: "melody-background" }, "", [
    Math.getRange(3, 7).map(e => SVG.svg({ y: (6 - e) * 75 }, "", SVG.g({}, "", [
        Math.getRange(0, 12).map(e2 => [
            SVG.rect({ x: 0 + "%", y: e2 * 6.25, fill: "#eeeeee", width: 100 + "%", height: 6.25, opacity: 1 - 0.5 * Math.mod(e2 + (e2 < 7 ? 1 : 0), 2) }),
            SVG.line({ x1: 0 + "%", y1: (e2 + 1) * 6.25, x2: 100 + "%", y2: (e2 + 1) * 6.25, "stroke-width": e2 == 11 ? 2 : 1 }),
            SVG.line({ x1: 0 + "%", y1: e2 * 6.25, x2: 100 + "%", y2: e2 * 6.25, "stroke-width": 1 }),
        ]),
    ]))),
    // たくさんの line
]));
const piano_roll = SVG.g({ class: "piano-roll" }, "", [
    SVG.rect({ class: "shadow", x: 40, y: 0, width: 3, height: 300 }),
    Math.getRange(3, 7).map(e => SVG.svg({ y: (6 - e) * 75 }, "", SVG.g({ id: "octave" }, "", [
        Math.getRange(0, 7).map(e2 => SVG.rect({ class: "white-key", x: 0, y: e2 * whitekey_height, width: whitekey_width, height: whitekey_height })),
        Math.getRange(0, 5).map(e2 => SVG.rect({ class: "black-key", x: 0, y: (2 * e2 + (e2 > 2 ? 2 : 1)) * blackkey_height, width: blackkey_width, height: blackkey_height })),
        SVG.text({ class: "label", x: 25, y: 72 }, "C" + String(e))
    ])))
]);
const melody_timeline = SVG.svg({ width: 100 + "%", height: 300 }, "", [
    background,
    piano_roll
]);
insert_here.appendChild(melody_timeline);
/* キーボードを描画する練習 */
/* Songle を使う */
songle_window.onSongleAPIReady =
    function (Songle) {
        console.log(`Songle`);
        console.log(Songle);
    };
/* SongleWidget を使う練習 */
songle_widget_window.onload =
    function () {
        const songleWidgetElement = SongleWidgetAPI.createSongleWidgetElement({
            api: "songle-widget-api-example",
            url: "www.youtube.com/watch?v=PqJNc9KVIZE"
        });
        document.body.appendChild(songleWidgetElement);
    };
songle_widget_window.onSongleWidgetCreate =
    function (apiKey, songleWidget) {
        console.log(`onSongleWidgetCreated, songleWidget is:`);
        console.log(songleWidget);
    };
songle_widget_window.onSongleWidgetError =
    function (apiKey, songleWidget) {
        console.log(`onSongleWidgetError, songleWidget is:`);
        console.log(songleWidget);
    };
songle_widget_window.onSongleWidgetReload =
    function (apiKey, songleWidget) {
        console.log(`onSongleWidgetReload, songleWidget is:`);
        console.log(songleWidget);
    };
songle_widget_window.onSongleWidgetRemove =
    function (apiKey, songleWidget) {
        console.log(`onSongleWidgetRemove, songleWidget is:`);
        console.log(songleWidget);
    };
songle_widget_window.onSongleWidgetReady =
    function (apiKey, songleWidget) {
        console.log(songleWidget);
        songleWidget.volume = SongleWidgetAPI.MIN_VOLUME; // Min volume.
        songleWidget.volume = SongleWidgetAPI.MAX_VOLUME; // Max volume.
        const chords = songleWidget.song.scene.chords.map(e => e.name); // コードをすべて取り出す
        console.log(chords);
        const progression = new ChordProgression(chords.map(e => e === "N" ? "" : e));
        console.log(progression.debug().dict.showAll());
        // TODO: mM7 に対応する
        // TODO: ダイアトニックスケール外のコードに対する距離関数を作成
        const min_path = progression.getMinimumPath();
        console.log(min_path.map(roman => roman.scale.name));
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
//# sourceMappingURL=sandbox.js.map