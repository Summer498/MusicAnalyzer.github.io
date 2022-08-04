import * as Math from "./lib/math.js";
import { HTML } from "./lib/HTML.js";
import { SVG } from "./lib/HTML.js";

function print(msg) {
	let _printable = null;
	let printable = _printable ??= document.querySelector(".print");
	printable.innerHTML = "<span class=\"print\">" + msg + "</span>";
}

const chordParse = chord_string => {
	const str = chord_string;
	const root = (str[1] == "b" || str[1] == "#") ? str.slice(0, 2) : str[0];
	const slash = (str.indexOf("/") + 1 || str.length + 1) - 1;  // str に "/" があればその位置を返す. 無ければ str の長さを返す
	return {
		root: root,
		quality: str.slice(root.length, slash),
		base: (slash < str.length) ? str.slice(slash + 1) : root
	};
};

const is_chord_quality_legal = (chord) => {
	const legal_qualities = ["", "6", "7", "M7", "m7", "m", "sus2", "sus4", "add9", "aug"];
	if (!legal_qualities.includes(chord.quality)) { console.error('illegal chord quality "' + chord.quality + '" received'); }
};

const body = HTML.body;

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
							SVG.rect({ x: 0 + "%", y: e2 * 6.25, fill: "#ffffff", width: 100 + "%", height: 6.25, opacity: (e2 * 7).mod(12) < 7 ? 0 : 1 }),
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
body.appendChild(melody_timeline);

console.log(Tonal.transpose("A4", "P5"));

self.onSongleAPIReady = Songle => {
	const player = new Songle.Player({ mediaElement: "#songle-yt" });

	player.addPlugin(new Songle.Plugin.Beat());
	player.addPlugin(new Songle.Plugin.Chord());
	player.addPlugin(new Songle.Plugin.Chorus());
	player.addPlugin(new Songle.Plugin.SongleWidget({ element: "#songle-sw" }));
	player.useMedia("https://www.youtube.com/watch?v=zweVJrnE1uY");

	player.on("beatPlay", ev => {
		const beatElement = document.querySelector(".beat");
		const beatInfo1Element = document.querySelector(".beat .info1");
		const beatInfo2Element = document.querySelector(".beat .info2");

		print(ev.data.beat.number);
		beatElement.className = "beat beat-" + ev.data.beat.number;
		beatInfo1Element.textContent = ev.data.beat.number;
		beatInfo2Element.textContent = ev.data.beat.numberOfBeatsPerBar;
	});

	player.on("chordEnter", ev => {
		const chordNameElement = document.querySelector(".chord .name");
		chordNameElement.textContent = ev.data.chord.name;
		const chord = ev.data.chord.name;
		const parsed = chordParse(chord);
		console.log(chord, parsed);
		is_chord_quality_legal(parsed);
		console.log(Tonal.Chord.get(chord).notes)
		// TODO: on コードの構成音を取得できるようにする
	});

	// 盛り上がり部分に入った
	player.on("repeatSectionEnter", ev => {
		const id = ev.data.section.index;
		if (id != 0 && id != 2) { return; }

		document.body.style.backgroundColor = "#000000";
		document.body.style.color = "#f3f5f6";

		document.querySelectorAll("[class*=songle-api-plugin] a").forEach(e => { e.style.color = "#eee"; });
	});

	player.on("repeatSectionLeave", ev => {
		const id = ev.data.section.index;
		if (id != 0 && id != 2) { return; }

		document.body.style.backgroundColor = "#f3f5f6";
		document.body.style.color = "#000000";

		document.querySelectorAll("[class*=songle-api-plugin] a").forEach(e => { e.style.color = "#e17"; });
	});
};