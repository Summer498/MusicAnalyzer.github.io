import { Math } from "./lib/Math/Math.js";
import { HTML } from "./lib/HTML/HTML.js";
import { SVG } from "./lib/HTML/HTML.js";
import { Chord_default, Midi } from "./lib/adapters/Tonal.js";
import { BeatEvent, ISongle, ChordEvent, SectionEvent, songle_window } from "./lib/adapters/Songle.js";
import { assertNonNullable } from "./lib/StdLib/stdlib.js";


//TODO: もっとスマートに書く
function print(msg: string) {
	let _printable: HTMLElement | null = null;
	const getPrintable = () => {
		_printable ??= document.querySelector(".print");
		return assertNonNullable(_printable);
	};
	getPrintable().innerHTML = "<span class=\"print\">" + msg + "</span>";
}

const getChordTone = (chord: string) => {
	if (chord == "N") { return Chord_default.get(""); }
	return Chord_default.get(chord);
};





/* HTML の描画 */
const body = HTML.body;
const octave_height = 75;
const white_key_width = 40;
const white_key_height = octave_height / 7;
const black_key_width = white_key_width / 2;
const black_key_height = octave_height / 12;

const background =
	SVG.svg({ x: -150.86931316534526 + "%", width: 649.2850333651097 + "%" }, "",
		SVG.g({ class: "melody-background" }, "", [
			Math.getRange(3, 7).map(e =>
				SVG.svg({ y: (6 - e) * 75 }, "",
					SVG.g({}, "", [
						Math.getRange(0, 12).map(e2 => [
							SVG.rect({
								x: 0 + "%", y: e2 * 6.25, fill: "#ffffff", width: 100 + "%", height: 6.25, opacity: Math.mod(e2 * 7, 12) < 7 ? 0 : 1
							}),
							SVG.line({
								x1: 0 + "%", y1: (e2 + 1) * 6.25, x2: 100 + "%", y2: (e2 + 1) * 6.25, "stroke-width": e2 == 11 ? 2 : 1
							}),
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
		Math.getRange(3, 7).map(e =>
			SVG.svg({ y: (6 - e) * 75 }, "",
				SVG.g({ id: "octave" }, "", [
					Math.getRange(0, 7).map(e2 => SVG.rect({ class: "white-key", x: 0, y: e2 * white_key_height, width: white_key_width, height: white_key_height })),
					Math.getRange(0, 5).map(e2 => SVG.rect({
						class: "black-key", x: 0, y: (2 * e2 + (e2 > 2 ? 2 : 1)) * black_key_height, width: black_key_width, height: black_key_height
					})),
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




class MoveObject {
	//update() { }
}

interface Note extends MoveObject {
	rect: SVGRectElement;
}

const movableObjectsQueue: Note[] = [];

class Note extends MoveObject {
	get speed() { return 10; }
	get x() { return this.rect.x.baseVal.value; }
	constructor(
		x: string | number,
		y: string | number,
		width: string | number,
		height: string | number
	) {
		super();
		this.rect = SVG.rect({ class: "note", x: x, y: y, width: width, height: height });
		melody_timeline.appendChild(this.rect);
	}
	update() {
		this.rect.setAttribute("x", String(this.x - this.speed));
	}
	//TODO:
	noticeToRemove() {
		movableObjectsQueue;
	}
}

songle_window.onSongleAPIReady = (Songle: ISongle) => {
	const player = new Songle.Player({ mediaElement: "#songle-yt" });

	player.addPlugin(new Songle.Plugin.Beat());
	player.addPlugin(new Songle.Plugin.Chord());
	player.addPlugin(new Songle.Plugin.Chorus());
	player.addPlugin(new Songle.Plugin.SongleWidget({ element: "#songle-sw" }));
	player.useMedia("https://www.youtube.com/watch?v=zweVJrnE1uY");




	player.on("beatPlay", (ev: BeatEvent) => {
		const beatElement = document.querySelector(".beat");
		const beatInfo1Element = document.querySelector(".beat .info1");
		const beatInfo2Element = document.querySelector(".beat .info2");

		print(ev.data.beat.number);
		if (beatElement) { beatElement.className = "beat beat-" + ev.data.beat.number; }
		if (beatInfo1Element) { beatInfo1Element.textContent = ev.data.beat.number; }
		if (beatInfo2Element) { beatInfo2Element.textContent = ev.data.beat.numberOfBeatsPerBar; }
	});




	player.on("chordEnter", (ev: ChordEvent) => {
		const chordNameElement = document.querySelector(".chord .name");

		// 自作関数によるパース
		if (chordNameElement) { chordNameElement.textContent = ev.data.chord.name; }
		const chord = ev.data.chord.name;
		/*
		const parsed = chordParse(chord);
		console.log(chord, parsed);
		isChordQualityLegal(parsed);
		*/
		// Tonal.js に渡してパース
		const chord_tone = getChordTone(chord).notes;
		const chord_tone_number = chord_tone.map((e: string) => Midi.toMidi(e + "4"));  // eslint-disable-line no-undef
		console.log(chord_tone);
		console.log(chord_tone_number);
		chord_tone_number.forEach((e: number) => {
			/*
			melody_timeline.appendChild(
				SVG.rect({ class: "note", x: 0, y: black_key_height * (e - 36), width: 100, height: black_key_height })
			);
			*/
			if (e) {
				movableObjectsQueue.push(new Note(500, black_key_height * (e - 36), 100, black_key_height));
			}
		});
		console.log(movableObjectsQueue);
	});




	// 盛り上がり部分に入った
	player.on("repeatSectionEnter", (ev: SectionEvent) => {
		const id = ev.data.section.index;
		if (id != 0 && id != 2) { return; }

		document.body.style.backgroundColor = "#000000";
		document.body.style.color = "#f3f5f6";

		document.querySelectorAll("[class*=songle-api-plugin] a")
			.forEach((e: any) => { e.style.color = "#eee"; });
	});




	player.on("repeatSectionLeave", (ev: SectionEvent) => {
		const id = ev.data.section.index;
		if (id != 0 && id != 2) { return; }

		document.body.style.backgroundColor = "#f3f5f6";
		document.body.style.color = "#000000";

		document.querySelectorAll("[class*=songle-api-plugin] a")
			.forEach((e: any) => { e.style.color = "#e17"; });
	});
};


(function mainRoutine() {
	movableObjectsQueue.forEach(e => e.update());
	setTimeout(mainRoutine, 1000 / 60);
})();

