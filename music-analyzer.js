const Songle = require("songle-api");

const player = new Songle.SyncPlayer({
	accessToken: "YOUR-ACCESS-TOKEN-HERE", // please edit your access token
});

function print(msg) {
	let _printable = null;
	let printable = _printable ??= document.querySelector(".print");
	printable.innerHTML = "<span class=\"print\">" + msg + "</span>";
}

const chordParse = chord_string => {
	const str = chord_string;
	const root = (str[1] === "b" || str[1] === "#") ? str.slice(0, 2) : str[0];
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

/*
self.onSongleAPIReady = Songle => {
	const player = new Songle.Player({ mediaElement: "#songle-yt" });
*/
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
});

// 盛り上がり部分に入った
player.on("repeatSectionEnter", ev => {
	const id = ev.data.section.index;
	if (id !== 0 && id !== 2) { return; }

	document.body.style.backgroundColor = "#000000";
	document.body.style.color = "#f3f5f6";

	document.querySelectorAll("[class*=songle-api-plugin] a").forEach(e => { e.style.color = "#eee"; });
});

player.on("repeatSectionLeave", ev => {
	const id = ev.data.section.index;
	if (id !== 0 && id !== 2) { return; }

	document.body.style.backgroundColor = "#f3f5f6";
	document.body.style.color = "#000000";

	document.querySelectorAll("[class*=songle-api-plugin] a").forEach(e => { e.style.color = "#e17"; });
});
/*
};
*/