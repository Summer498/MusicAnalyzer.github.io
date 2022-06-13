self.onSongleAPIReady =
  function(Songle) {
    var player =
      new Songle.Player({
        mediaElement: "#songle-yt"
      });

    player.addPlugin(new Songle.Plugin.Beat());
    player.addPlugin(new Songle.Plugin.Chord());
    player.addPlugin(new Songle.Plugin.Chorus());
    player.addPlugin(new Songle.Plugin.SongleWidget({ element: "#songle-sw" }));
    player.useMedia("https://www.youtube.com/watch?v=zweVJrnE1uY");

    player.on("beatPlay",
      function(ev) {
        var beatElement =
          document.querySelector(".beat");

        var beatInfo1Element =
          document.querySelector(".beat .info1");

        var beatInfo2Element =
          document.querySelector(".beat .info2");

        beatElement.className = "beat beat-" + ev.data.beat.position;
        beatInfo1Element.textContent = ev.data.beat.position;
        beatInfo2Element.textContent = ev.data.beat.count;
      });

    player.on("chordEnter",
      function(ev) {
        var chordNameElement =
          document.querySelector(".chord .name");

        chordNameElement.textContent = ev.data.chord.name;
      });

    player.on("repeatSectionEnter",
      function(ev) {
        if(ev.data.section.index != 0 &&
           ev.data.section.index != 2) {
           return;
        }
        
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#f3f5f6";
        
        document.querySelectorAll("[class*=songle-api-plugin] a").forEach((e) => { e.style.color = "#eee"; })
      });

    player.on("repeatSectionLeave",
      function(ev) {
        if(ev.data.section.index != 0 &&
           ev.data.section.index != 2) {
           return;
        }

        document.body.style.backgroundColor = "#f3f5f6";
        document.body.style.color = "#000000";
        
        document.querySelectorAll("[class*=songle-api-plugin] a").forEach((e) => { e.style.color = "#e17"; })
      });
  }