import * as Math from "./lib/math.js";
import { HTML } from "./lib/HTML.js";
import { SVG } from "./lib/HTML.js";

//TODO: もっとスマートに書く
function print(msg) {
	let _printable = null;
	let printable = _printable ??= document.querySelector(".print");
	printable.innerHTML = "<span class=\"print\">" + msg + "</span>";
}

// TODO: Obsolete:
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

// TODO: Obsolete:
const isChordQualityLegal = (chord) => {
	const legal_qualities = ["", "6", "7", "M7", "m7", "m", "sus2", "sus4", "add9", "aug"];
	if (!legal_qualities.includes(chord.quality)) { throw Error('illegal chord quality "' + chord.quality + '" received'); }
};

const getChordTone = (chord_string) => {
	if (chord_string == "N") { return []; }
	const before_slash = chord_string.indexOf("/");
	const body_length = (before_slash >= 0) ? before_slash : chord_string.length;
	const body = chord_string.slice(0, body_length);
	const base = chord_string.slice(body_length + 1);
	const notes = Tonal.Chord.get(body).notes;
	if (notes.length == 0) { throw Error('illegal chord symbol "' + chord_string + '" received'); }
	if (base == '' || notes.includes(base)) { return notes; }
	notes.push(base);
	return notes;
};






/* HTML の描画 */
const body = HTML.body;
const octave_height = 75,
	white_key_width = 40,
	white_key_height = octave_height / 7,
	black_key_width = white_key_width / 2,
	black_key_height = octave_height / 12;

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
					Math.Range(0, 7).map(e2 => SVG.rect({ class: "white-key", x: 0, y: e2 * white_key_height, width: white_key_width, height: white_key_height })),
					Math.Range(0, 5).map(e2 => SVG.rect({ class: "black-key", x: 0, y: (2 * e2 + (e2 > 2 ? 2 : 1)) * black_key_height, width: black_key_width, height: black_key_height })),
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



class moveObject {
	update() { }
}

class note extends moveObject {
	constructor(x, y, width, height) {
		super();
		this.rect = SVG.rect({ class: "note", x: x, y: y, width: width, height: height });
		melody_timeline.appendChild(this.rect);
	}
	update() {
		this.rect.x -= 1;
		console.log(this.rect.x)
	}
}


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

		// 自作関数によるパース
		chordNameElement.textContent = ev.data.chord.name;
		const chord = ev.data.chord.name;
		const parsed = chordParse(chord);
		console.log(chord, parsed);
		isChordQualityLegal(parsed);

		// Tonal.js に渡してパース
		const chord_tone = getChordTone(chord);
		const chord_tone_number = chord_tone.map(e => Tonal.Midi.toMidi(e + "4"));
		console.log(chord_tone);
		console.log(chord_tone_number);
		chord_tone_number.forEach(e => {
			melody_timeline.appendChild(
				SVG.rect({ class: "note", x: 0, y: black_key_height * (e - 36), width: 100, height: black_key_height })
			);
			movableObjectsQueue.push(new note(500, black_key_height * (e - 36), 100, black_key_height));
		});
		console.log(movableObjectsQueue)
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


const movableObjectsQueue = [];
movableObjectsQueue.forEach(e => e.update());