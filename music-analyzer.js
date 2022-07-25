function print(msg) {
	let _printable = null;
	printable = _printable ??= document.querySelector(".print");
	printable.innerHTML = "<span class=\"print\">" + msg + "</span>";
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
		chordNameElement.textContent = ev.data.chord.name;
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