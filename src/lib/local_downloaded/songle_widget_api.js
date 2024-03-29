(function () {
  const e =
    [].indexOf ||
    function (e) {
      for (let t = 0, i = this.length; t < i; t++)
        {if (t in this && this[t] === e) {return t;}}
      return -1;
    };
  !(function (t) {
    "use strict";
    let i; let n; let o; let s; let r;
    return (
      i = t.__songle__ || {},
      i.ajax = function (e, t) {
        let n;
        return (
          t == null && (t = {}),
          t.method == null && (t.method = "GET"),
          n = new XMLHttpRequest(),
          i.useDebugMode &&
            (console.groupCollapsed("[Songle Widget] XHR requested loading:"),
            console.dir(t.method + " " + e),
            console.groupEnd()),
          n.addEventListener(
            "abort",
            function (e) {
              return t.onAbort && t.onAbort(e, n);
            },
            !1
          ),
          n.addEventListener(
            "error",
            function (e) {
              return t.onError && t.onError(e, n);
            },
            !1
          ),
          n.addEventListener(
            "load",
            function (e) {
              switch (!1) {
                case 200 !== n.status:
                  return t.onComplete && t.onComplete(e, n);
                case 304 !== n.status:
                  return t.onComplete && t.onComplete(e, n);
                case !(n.status >= 400):
                  return t.onError && t.onError(e, n);
                case !(n.status >= 500):
                  return t.onError && t.onError(e, n);
              }
            },
            !1
          ),
          n.addEventListener(
            "progress",
            function (e) {
              return t.onProgress && t.onProgress(e, n);
            },
            !1
          ),
          n.open(t.method, e, !0),
          n.responseType = "text",
          n.send()
        );
      },
      i.getJSON = function (e, t) {
        return (
          t == null && (t = {}),
          o(e, {
            onMiss: function (o) {
              return i.ajax(e, {
                onAbort: function () {
                  return t.onAbort && t.onAbort();
                },
                onError: function (e) {
                  return (
                    o = n(e.target.response || e.target.responseText),
                    t.onError && t.onError(o)
                  );
                },
                onComplete: function (i) {
                  return (
                    o = n(i.target.response || i.target.responseText),
                    t.onComplete && t.onComplete(o),
                    r(e, JSON.stringify(o))
                  );
                },
                onProgress: t.onProgress,
              });
            },
            onPass: function (e) {
              return e = n(e), t.onComplete && t.onComplete(e);
            },
          })
        );
      },
      n = function (e) {
        switch (typeof e) {
          case "object":
            return e;
          case "number":
            return JSON.parse(e);
          case "string":
            return JSON.parse(e);
        }
      },
      o = function (e, t) {
        let n;
        return (
          t == null && (t = {}),
          n = s(e),
          setTimeout(function () {
            return i.useCacheMode && n? t.onPass && t.onPass(n): t.onMiss && t.onMiss(n);
          })
        );
      },
      s = function (e) {
        try {
          return localStorage.getItem(e);
        } catch (e) {
          return null;
        }
      },
      r = function (e, t) {
        try {
          return localStorage.setItem(e, t);
        } catch (e) {
          return null;
        }
      },
      e.call(t, "process") >= 0 && (module.exports = i),
      t.__songle__ = i
    );
  })((this || 0).self || global);
}.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n; let o; let s;
      return (
        i = t.__songle__ || {},
        Object.defineProperties(i, {
          cookies: {
            configurable: !0,
            get: function () {
              let e; let t; let i; let n; let o; let s; let r; let a;
              for (
                e = {}, s = document.cookie.split("; "), t = 0, n = s.length;
                t < n;
                t++
              )
                {r = s[t],
                  o = r.match(/(.+?)=(.+)/),
                  o && (i = o[1], a = o[2], e[i] = a);}
              return e;
            },
          },
          protocol: {
            configurable: !0,
            get: function () {
              switch (location.protocol) {
                case "chrome-extension:":
                  return "https:";
                case "file:":
                  return i.useSSLMode ? "https:" : "http:";
                case "http:":
                  return i.useSSLMode ? "https:" : "http:";
                case "https:":
                  return "https:";
              }
            },
          },
          host: {
            configurable: !0,
            get: function () {
              return i.searchQueries.host || n();
            },
          },
          port: {
            configurable: !0,
            get: function () {
              return i.searchQueries.port || o();
            },
          },
          searchQueries: {
            configurable: !0,
            get: function () {
              let e; let t; let i; let n; let o; let s; let r; let a;
              if (o = {}, location.search)
                {for (
                  s = location.search
                    .slice(location.search.indexOf("?") + 1)
                    .split("&"),
                    e = 0,
                    i = s.length;
                  e < i;
                  e++
                )
                  {r = s[e],
                    n = r.match(/(.+?)=(.+)/),
                    n &&
                      (t = n[1],
                      a = n[2],
                      o[t] = a ? decodeURIComponent(a) : a);}}
              return o;
            },
          },
          msie: {
            configurable: !0,
            get: function () {
              return (
                i.msie6 || i.msie7 || i.msie8 || i.msie9 || i.msie10 || i.msie11
              );
            },
          },
          msie6: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("MSIE 6") >= 0;
            },
          },
          msie7: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("MSIE 7") >= 0;
            },
          },
          msie8: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("MSIE 8") >= 0;
            },
          },
          msie9: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("MSIE 9") >= 0;
            },
          },
          msie10: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("MSIE 10") >= 0;
            },
          },
          msie11: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("Trident/7") >= 0;
            },
          },
          firefox: {
            configurable: !0,
            get: function () {
              return navigator.appVersion.indexOf("Firefox") >= 0;
            },
          },
          chrome: {
            configurable: !0,
            get: function () {
              let e; let t;
              return (
                e = navigator.appVersion.indexOf("Chrome") >= 0,
                t = navigator.appVersion.indexOf("Safari") >= 0,
                e && t
              );
            },
          },
          safari: {
            configurable: !0,
            get: function () {
              let e; let t;
              return (
                e = navigator.appVersion.indexOf("Chrome") >= 0,
                t = navigator.appVersion.indexOf("Safari") >= 0,
                !e && t
              );
            },
          },
        }),
        i.createSearchQueries = function (e, t) {
          let n; let o;
          e == null && (e = {}), t == null && (t = i.searchQueries);
          for (n in e) {o = e[n], t[n] = o;}
          return t;
        },
        i.createSearchQueriesWithJoin = function (e, t) {
          return e == null && (e = {}), s(i.createSearchQueries(e, t));
        },
        i.updateSearchQueries = function (e, t) {
          let n; let o; let s; let r;
          e == null && (e = {}), t == null && (t = i.searchQueries);
          for (n in e) {
            s = e[n];
            for (o in t) {r = t[o], n === o && (t[n] = s);}
          }
          return t;
        },
        i.updateSearchQueriesWithJoin = function (e, t) {
          return e == null && (e = {}), s(i.updateSearchQueries(e, t));
        },
        n = function () {
          switch (i.rails.env) {
            case "development":
              return "127.0.0.1";
            case "staging":
              return "dev-widget.songle.jp";
            case "production":
              return "widget.songle.jp";
          }
          return "";
        },
        o = function () {
          switch (i.rails.env) {
            case "development":
              return ":3000";
            case "staging":
              return "";
            case "production":
              return "";
          }
          return "";
        },
        s = function (e) {
          let t; let i; let n;
          i = [];
          for (t in e) {n = e[t], i.push(t + "=" + n);}
          return i.join("&");
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.computeAverageVolume = function (e) {
          return 100 * (1 - Math.SQRT2 * e.song.rmsAmplitude);
        },
        i.computeOffsetFromRepeatSegmentBy = function (e, t) {
          let i; let n; let o; let s; let r; let a; let l; let u; let c; let d; let h;
          if (
            t == null && (t = {}),
            t.beatCount == null && (t.beatCount = 0),
            t.repeatSegmentIndex == null && (t.repeatSegmentIndex = 0),
            s = e.song.scene.beats,
            h = e.song.scene.repeatSegments[t.repeatSegmentIndex]
          )
            {for (c = h.repeats, r = 0, l = c.length; r < l; r++)
              {for (d = c[r], a = 0, u = s.length; a < u; a++)
                {if (
                  i = s[a],
                  i.start >= d.start &&
                    (n = s[i.index], o = s[i.index + t.beatCount], n && o)
                )
                  {return o.start - n.start;}}}}
          return 0;
        },
        i.findPrevRepeatSegmentRepeatBy = function (e, t) {
          let n; let o; let s; let r;
          for (
            t == null && (t = {}),
              t.position == null && (t.position = e.position.milliseconds),
              t.repeatSegmentIndexA == null && (t.repeatSegmentIndexA = 0),
              t.repeatSegmentIndexB == null && (t.repeatSegmentIndexB = 5),
              t.segmentMargin == null && (t.segmentMargin = 500),
              r = i.mergeRepeatSegments(e, t).reverse(),
              n = 0,
              o = r.length;
            n < o;
            n++
          )
            {if (s = r[n], t.position > s.start + t.segmentMargin) {return s;}}
          return r[0];
        },
        i.findNextRepeatSegmentRepeatBy = function (e, t) {
          let n; let o; let s; let r;
          for (
            t == null && (t = {}),
              t.position == null && (t.position = e.position.milliseconds),
              t.repeatSegmentIndexA == null && (t.repeatSegmentIndexA = 0),
              t.repeatSegmentIndexB == null && (t.repeatSegmentIndexB = 5),
              t.segmentMargin == null && (t.segmentMargin = 500),
              r = i.mergeRepeatSegments(e, t),
              n = 0,
              o = r.length;
            n < o;
            n++
          )
            {if (s = r[n], t.position < s.start - t.segmentMargin) {return s;}}
          return r[0];
        },
        i.mergeRepeatSegments = function (e, t) {
          let i; let n; let o; let s; let r;
          for (
            t == null && (t = {}),
              t.repeatSegmentIndexA == null && (t.repeatSegmentIndexA = 0),
              t.repeatSegmentIndexB == null && (t.repeatSegmentIndexB = 5),
              r = [],
              n = i = o = t.repeatSegmentIndexA,
              s = t.repeatSegmentIndexB;
            o <= s ? i <= s : i >= s;
            n = o <= s ? ++i : --i
          )
            {e.song.scene.repeatSegments[n] &&
              (r = r
                .concat(e.song.scene.repeatSegments[n].repeats)
                .sort(function (e, t) {
                  return e.start - t.start;
                }));}
          return r;
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.DEFAULT_SONGLE_WIDGET_SIZE_W = 275,
        i.DEFAULT_SONGLE_WIDGET_SIZE_H = 100,
        i.DEFAULT_VIDEO_PLAYER_SIZE_W = 275,
        i.DEFAULT_VIDEO_PLAYER_SIZE_H = 155,
        i.DEFAULT_VOLUME = "auto",
        i.MIN_SONGLE_WIDGET_SIZE_W = 200,
        i.MIN_SONGLE_WIDGET_SIZE_H = 80,
        i.MIN_VIDEO_PLAYER_SIZE_W = 200,
        i.MIN_VIDEO_PLAYER_SIZE_H = 112,
        i.MIN_VOLUME = 0,
        i.MAX_VOLUME = 100,
        i.MP3_MODE = "mp3",
        i.NN_VIDEO_MODE = "nn-video",
        i.YT_VIDEO_MODE = "yt-video",
        i.SONGLE_WIDGET_PLAYING_STATUS = "playing",
        i.SONGLE_WIDGET_PAUSED_STATUS = "paused",
        i.SONGLE_WIDGET_STOPPED_STATUS = "stopped",
        i.SONGLE_WIDGET_SEEKING_STATUS = "seeking",
        i.SONGLE_WIDGET_FINISHED_STATUS = "finished",
        i.SOURCE_SONGLE_WIDGET = "songle-widget",
        i.SOURCE_MP3 = i.MP3_MODE,
        i.SOURCE_NN_VIDEO = i.NN_VIDEO_MODE,
        i.SOURCE_YT_VIDEO = i.YT_VIDEO_MODE,
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.SongSceneDetector = (function () {
          function e(e) {
            this.widget = e, this.reset();
          }
          let t; let i;
          return (
            e.prototype.forEach = function (e, n) {
              let o;
              return (
                n == null && (n = {}),
                n.offset == null && (n.offset = 0),
                n.positionA == null && (n.positionA = 0),
                n.positionB == null && (n.positionB = 0),
                n.searchRange == null && (n.searchRange = 200),
                o = n.offset * -1,
                t(this, o, e, n),
                i(this, o, e, n)
              );
            },
            t = function (e, t, i, n) {
              let o; let s;
              if (
                o =
                  void 0 === n.positionA? e.widget.position.milliseconds: n.positionA,
                s =
                  void 0 === n.positionB? e.widget.position.milliseconds: n.positionB,
                o = o,
                s += t,
                o < s
              )
                {return e.detect(o, s, i);}
            },
            i = function (e, t, i, n) {
              let o; let s;
              if (
                o =
                  void 0 === n.positionA? e.widget.position.milliseconds: n.positionA,
                s =
                  void 0 === n.positionB? e.widget.position.milliseconds: n.positionB,
                o = o + t - n.searchRange,
                s += t,
                o < s
              )
                {return e.detect(o, s, i);}
            },
            e
          );
        })(),
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e = function (e, i) {
        function n() {
          this.constructor = e;
        }
        for (const o in i) {t.call(i, o) && (e[o] = i[o]);}
        return (
          n.prototype = i.prototype,
          e.prototype = new n(),
          e.__super__ = i.prototype,
          e
        );
      };
      var t = {}.hasOwnProperty;
      const i =
        [].indexOf ||
        function (e) {
          for (let t = 0, i = this.length; t < i; t++)
            {if (t in this && this[t] === e) {return t;}}
          return -1;
        };
    !(function (t) {
      "use strict";
      let n;
      return (
        n = t.__songle__ || {},
        n.BeatDetector = (function (t) {
          function i() {
            return i.__super__.constructor.apply(this, arguments);
          }
          return (
            e(i, t),
            i.prototype.detect = function (e, t, i) {
              let n; let o; let s; let r; let a; let l; let u; let c; let d; let h; let p; let f; let g; let m; let v;
              for (
                m = this.widget.song.scene.bars || [],
                  v = [],
                  u = 0,
                  c = m.length;
                u < c;
                u++
              )
                {n = m[u],
                  f = this.widget.song.scene.bars[n.index - 1],
                  d = this.widget.song.scene.bars[n.index + 1],
                  n.prev = f,
                  n.next = d,
                  o = n ? n.start : void 0,
                  h = d ? d.start : this.widget.duration,
                  e <= o + (h - o) && t > o? v.push(
                        function () {
                          let o; let u; let c; let h;
                          for (
                            c = n.beats, h = [], r = o = 0, u = c.length;
                            o < u;
                            r = ++o
                          )
                            {s = c[r],
                              g = n.beats[r - 1],
                              p = n.beats[r + 1],
                              void 0 === g &&
                                (g =
                                  void 0 === f? { start: 0 }: f.beats[f.beats.length - 1]),
                              void 0 === p &&
                                (p =
                                  void 0 === d? { start: this.widget.duration }: d.beats[0]),
                              s.duration = p.start - s.start,
                              s.bpm = isFinite(6e4 / s.duration)? 6e4 / s.duration: 0,
                              s.prev = g,
                              s.next = p,
                              l = s.start,
                              e <= l + s.duration / 2 &&
                                t > l &&
                                (this.enterStates[s.index] ||
                                  (this.enterStates[s.index] = !0,
                                  i.enter && i.enter({ bar: n, beat: s }))),
                              a = s.start + s.duration / 2,
                              e <= a + s.duration / 2 && t > a? this.leaveStates[s.index]? h.push(void 0): (this.leaveStates[s.index] = !0,
                                    h.push(
                                      i.leave && i.leave({ bar: n, beat: s })
                                    )): h.push(void 0);}
                          return h;
                        }.call(this)
                      ): v.push(void 0);}
              return v;
            },
            i.prototype.reset = function () {
              return this.enterStates = [], this.leaveStates = [];
            },
            i
          );
        })(n.SongSceneDetector),
        i.call(t, "process") >= 0 && (module.exports = n),
        t.__songle__ = n
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e = function (e, i) {
        function n() {
          this.constructor = e;
        }
        for (const o in i) {t.call(i, o) && (e[o] = i[o]);}
        return (
          n.prototype = i.prototype,
          e.prototype = new n(),
          e.__super__ = i.prototype,
          e
        );
      };
      var t = {}.hasOwnProperty;
      const i =
        [].indexOf ||
        function (e) {
          for (let t = 0, i = this.length; t < i; t++)
            {if (t in this && this[t] === e) {return t;}}
          return -1;
        };
    !(function (t) {
      "use strict";
      let n;
      return (
        n = t.__songle__ || {},
        n.ChordDetector = (function (t) {
          function i() {
            return i.__super__.constructor.apply(this, arguments);
          }
          return (
            e(i, t),
            i.prototype.detect = function (e, t, i) {
              let n; let o; let s; let r; let a;
              for (
                r = this.widget.song.scene.chords || [],
                  a = [],
                  o = 0,
                  s = r.length;
                o < s;
                o++
              )
                {n = r[o],
                  n.prev = this.widget.song.scene.chords[n.index - 1],
                  n.next = this.widget.song.scene.chords[n.index + 1],
                  n.prev &&
                    (n.prev.prev = this.widget.song.scene.chords[n.index - 2],
                    n.prev.next = this.widget.song.scene.chords[n.index]),
                  n.next &&
                    (n.next.prev = this.widget.song.scene.chords[n.index],
                    n.next.next = this.widget.song.scene.chords[n.index + 2]),
                  e < n.start + n.duration && t >= n.start? this.states[n.index]? a.push(void 0): (this.states[n.index] = !0,
                        n.prev && i.leave && i.leave({ chord: n.prev }),
                        n? a.push(i.enter && i.enter({ chord: n })): a.push(void 0)): a.push(void 0);}
              return a;
            },
            i.prototype.reset = function (e) {
              let t; let i; let n; let o; let s; let r;
              if (e == null && (e = {}), this.states)
                {for (
                  r = this.widget.song.scene.chords || [], i = 0, n = r.length;
                  i < n;
                  i++
                )
                  {t = r[i],
                    this.states[t.index] &&
                      (s = this.widget.song.scene.chords[t.index - 1],
                      o = this.widget.song.scene.chords[t.index + 1],
                      s && e.leave && e.leave({ chord: s }));}}
              return this.states = [];
            },
            i
          );
        })(n.SongSceneDetector),
        i.call(t, "process") >= 0 && (module.exports = n),
        t.__songle__ = n
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e = function (e, i) {
        function n() {
          this.constructor = e;
        }
        for (const o in i) {t.call(i, o) && (e[o] = i[o]);}
        return (
          n.prototype = i.prototype,
          e.prototype = new n(),
          e.__super__ = i.prototype,
          e
        );
      };
      var t = {}.hasOwnProperty;
      const i =
        [].indexOf ||
        function (e) {
          for (let t = 0, i = this.length; t < i; t++)
            {if (t in this && this[t] === e) {return t;}}
          return -1;
        };
    !(function (t) {
      "use strict";
      let n;
      return (
        n = t.__songle__ || {},
        n.ChorusSegmentDetector = (function (t) {
          function i() {
            return i.__super__.constructor.apply(this, arguments);
          }
          let n; let o; let s; let r;
          return (
            e(i, t),
            i.prototype.detect = function (e, t, i) {
              let n; let o; let a; let l; let u; let c; let d;
              for (
                u = this.widget.song.scene.chorusSegments || [],
                  d = [],
                  o = 0,
                  l = u.length;
                o < l;
                o++
              )
                {n = u[o],
                  d.push(
                    function () {
                      let o; let l; let u; let d;
                      for (
                        u = n.repeats, d = [], o = 0, l = u.length;
                        o < l;
                        o++
                      )
                        {c = u[o],
                          e < c.start + c.duration && t >= c.start? (a = r(n, c),
                              this.states[a]? d.push(void 0): (s(this, n, i),
                                  i.enter && i.enter({ repeat: c, segment: n }),
                                  d.push(this.states[a] = 1))): (a = r(n, c),
                              this.states[a] === 1? (i.leave &&
                                    i.leave({ repeat: c, segment: n }),
                                  d.push(this.states[a] = -1)): d.push(void 0));}
                      return d;
                    }.call(this)
                  );}
              return d;
            },
            i.prototype.reset = function (e) {
              let t; let i; let n; let o;
              if (e == null && (e = {}), this.states)
                {for (
                  o = this.widget.song.scene.chorusSegments || [],
                    i = 0,
                    n = o.length;
                  i < n;
                  i++
                )
                  {t = o[i], s(this, t, e);}}
              return this.states = [];
            },
            o = 0,
            n = 32,
            s = function (e, t, i) {
              let n; let o; let s; let a; let l; let u;
              for (a = t.repeats, u = [], n = 0, s = a.length; n < s; n++)
                {l = a[n],
                  o = r(t, l),
                  e.states[o] === 1? (e.states[o] = -1,
                      u.push(i.leave && i.leave({ repeat: l, segment: t }))): u.push(void 0);}
              return u;
            },
            r = function (e, t) {
              return e.index * n + t.index;
            },
            i
          );
        })(n.SongSceneDetector),
        i.call(t, "process") >= 0 && (module.exports = n),
        t.__songle__ = n
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e = function (e, i) {
        function n() {
          this.constructor = e;
        }
        for (const o in i) {t.call(i, o) && (e[o] = i[o]);}
        return (
          n.prototype = i.prototype,
          e.prototype = new n(),
          e.__super__ = i.prototype,
          e
        );
      };
      var t = {}.hasOwnProperty;
      const i =
        [].indexOf ||
        function (e) {
          for (let t = 0, i = this.length; t < i; t++)
            {if (t in this && this[t] === e) {return t;}}
          return -1;
        };
    !(function (t) {
      "use strict";
      let n;
      return (
        n = t.__songle__ || {},
        n.NoteDetector = (function (t) {
          function i() {
            return i.__super__.constructor.apply(this, arguments);
          }
          return (
            e(i, t),
            i.prototype.detect = function (e, t, i) {
              let n; let o; let s; let r; let a;
              for (
                r = this.widget.song.scene.notes || [],
                  a = [],
                  n = 0,
                  o = r.length;
                n < o;
                n++
              )
                {s = r[n],
                  s.prev = this.widget.song.scene.notes[s.index - 1],
                  s.next = this.widget.song.scene.notes[s.index + 1],
                  s.prev &&
                    (s.prev.prev = this.widget.song.scene.notes[s.index - 2],
                    s.prev.next = this.widget.song.scene.notes[s.index]),
                  s.next &&
                    (s.next.prev = this.widget.song.scene.notes[s.index],
                    s.next.next = this.widget.song.scene.notes[s.index + 2]),
                  e < s.start + s.duration && t >= s.start? this.states[s.index]? a.push(void 0): (this.states[s.index] = !0,
                        s.prev && i.leave && i.leave({ note: s.prev }),
                        s? a.push(i.enter && i.enter({ note: s })): a.push(void 0)): a.push(void 0);}
              return a;
            },
            i.prototype.reset = function (e) {
              let t; let i; let n; let o; let s; let r;
              if (e == null && (e = {}), this.states)
                {for (
                  r = this.widget.song.scene.notes || [], t = 0, i = r.length;
                  t < i;
                  t++
                )
                  {o = r[t],
                    this.states[o.index] &&
                      (s = this.widget.song.scene.notes[o.index - 1],
                      n = this.widget.song.scene.notes[o.index + 1],
                      s && e.leave && e.leave({ note: s }));}}
              return this.states = [];
            },
            i
          );
        })(n.SongSceneDetector),
        i.call(t, "process") >= 0 && (module.exports = n),
        t.__songle__ = n
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e = function (e, i) {
        function n() {
          this.constructor = e;
        }
        for (const o in i) {t.call(i, o) && (e[o] = i[o]);}
        return (
          n.prototype = i.prototype,
          e.prototype = new n(),
          e.__super__ = i.prototype,
          e
        );
      };
      var t = {}.hasOwnProperty;
      const i =
        [].indexOf ||
        function (e) {
          for (let t = 0, i = this.length; t < i; t++)
            {if (t in this && this[t] === e) {return t;}}
          return -1;
        };
    !(function (t) {
      "use strict";
      let n;
      return (
        n = t.__songle__ || {},
        n.RepeatSegmentDetector = (function (t) {
          function i() {
            return i.__super__.constructor.apply(this, arguments);
          }
          let n; let o; let s; let r;
          return (
            e(i, t),
            i.prototype.detect = function (e, t, i) {
              let n; let o; let a; let l; let u; let c; let d;
              for (
                l = this.widget.song.scene.repeatSegments || [],
                  d = [],
                  n = 0,
                  a = l.length;
                n < a;
                n++
              )
                {c = l[n],
                  d.push(
                    function () {
                      let n; let a; let l; let d;
                      for (
                        l = c.repeats, d = [], n = 0, a = l.length;
                        n < a;
                        n++
                      )
                        {u = l[n],
                          e < u.start + u.duration && t >= u.start? (o = r(c, u),
                              this.states[o]? d.push(void 0): (s(this, c, i),
                                  i.enter && i.enter({ repeat: u, segment: c }),
                                  d.push(this.states[o] = 1))): (o = r(c, u),
                              this.states[o] === 1? (i.leave &&
                                    i.leave({ repeat: u, segment: c }),
                                  d.push(this.states[o] = -1)): d.push(void 0));}
                      return d;
                    }.call(this)
                  );}
              return d;
            },
            i.prototype.reset = function (e) {
              let t; let i; let n; let o;
              if (e == null && (e = {}), this.states)
                {for (
                  n = this.widget.song.scene.repeatSegments || [],
                    t = 0,
                    i = n.length;
                  t < i;
                  t++
                )
                  {o = n[t], s(this, o, e);}}
              return this.states = [];
            },
            o = 0,
            n = 32,
            s = function (e, t, i) {
              let n; let o; let s; let a; let l; let u;
              for (a = t.repeats, u = [], n = 0, s = a.length; n < s; n++)
                {l = a[n],
                  o = r(t, l),
                  e.states[o] === 1? (e.states[o] = -1,
                      u.push(i.leave && i.leave({ repeat: l, segment: t }))): u.push(void 0);}
              return u;
            },
            r = function (e, t) {
              return e.index * n + t.index;
            },
            i
          );
        })(n.SongSceneDetector),
        i.call(t, "process") >= 0 && (module.exports = n),
        t.__songle__ = n
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n;
      return (
        i = t.__songle__ || {},
        i.debug = function (e, t) {
          if (
            t == null && (t = {}),
            t.style == null && (t.style = ""),
            !(i.msie6 || i.msie7 || i.msie8 || i.msie9) && i.useDebugMode
          )
            {switch (!1) {
              case !i.firefox:
                console.debug("%c" + n(e, t), t.style);
                break;
              case !i.chrome:
                console.debug("%c" + n(e, t), t.style);
                break;
              case !i.safari:
                console.debug("%c" + n(e, t), t.style);
                break;
              default:
                console.debug(n(e, t));
            }}
          return e;
        },
        i.debugSwAPI = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix = t.prefix + "[API] ",
            i.debug(e, t)
          );
        },
        i.debugSwAudioPlayer = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix = t.prefix + "[AudioPlayer] ",
            i.debug(e, t)
          );
        },
        i.debugSwVideoPlayer = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix = t.prefix + "[VideoPlayer] ",
            i.debug(e, t)
          );
        },
        i.error = function (e, t) {
          if (
            t == null && (t = {}),
            t.style == null && (t.style = ""),
            !(i.msie6 || i.msie7 || i.msie8 || i.msie9) && i.useErrorMode
          )
            {switch (!1) {
              case !i.firefox:
                console.error("%c" + n(e, t), t.style);
                break;
              case !i.chrome:
                console.error("%c" + n(e, t), t.style);
                break;
              case !i.safari:
                console.error("%c" + n(e, t), t.style);
                break;
              default:
                console.error(n(e, t));
            }}
          return e;
        },
        i.errorSwAPI = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix = t.prefix + "[API] ",
            i.error(e, t)
          );
        },
        i.errorSwAudioPlayer = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix = t.prefix + "[AudioPlayer] ",
            i.error(e, t)
          );
        },
        i.errorSwVideoPlayer = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix = t.prefix + "[VideoPlayer] ",
            i.error(e, t)
          );
        },
        n = function (e, t) {
          return (
            t == null && (t = {}),
            t.prefix == null && (t.prefix = " "),
            t.suffix == null && (t.suffix = " "),
            "[Songle Widget]" + t.prefix + e + t.suffix
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.random = function (e, t) {
          return (
            void 0 !== t && void 0 !== e || (t = e || 2147483647, e = 0),
            Math.floor(Math.random() * (t - e + 1) + e)
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.requireNnAPI = function (e, n) {
          return (
            n == null && (n = {}),
            t.NicoPlayerFactory? setTimeout(function () {
                  return n.onComplete && n.onComplete();
                }, 1): (t.onNicoPlayerFactoryReady = function (e) {
                  return t.NicoPlayerFactory = e, i.readyNnAPI = !0;
                },
                e.appendChild(
                  i.createScriptElement(
                    "https://secure-dcdn.cdn.nimg.jp/extplayerv/embed/js/api.js",
                    {
                      onComplete: function () {
                        let e;
                        return e = setInterval(function () {
                          if (i.readyNnAPI)
                            {return (
                              clearInterval(e), n.onComplete && n.onComplete()
                            );}
                        }, 1);
                      },
                    }
                  )
                ))
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.sanitizeCSS = function (e) {
          return i.stringIsCSS(e)? e.trim(): (null !== e && i.error("sanitized '" + e + "'."), null);
        },
        i.sanitizeNumber = function (e) {
          return i.stringIsNumber(e)? e.trim(): (null !== e && i.error("sanitized '" + e + "'."), null);
        },
        i.sanitizeNumberOrString = function (e) {
          return i.stringIsNumber(e)? i.sanitizeNumber(e): i.stringIsString(e)? i.sanitizeString(e): (null !== e && i.error("sanitized '" + e + "'."), null);
        },
        i.sanitizeString = function (e) {
          return i.stringIsString(e)? e.trim(): (null !== e && i.error("sanitized '" + e + "'."), null);
        },
        i.sanitizeURL = function (e) {
          return i.sanitizeCSS(e);
        },
        i.sanitizeURI = function (e) {
          return i.sanitizeCSS(e);
        },
        i.sanitizeToggle = function (e) {
          switch (!1) {
            case !i.stringIs0(e):
              return "0";
            case !i.stringIs1(e):
              return "1";
            case !i.stringIsF(e):
              return "0";
            case !i.stringIsT(e):
              return "1";
          }
          return null !== e && i.error("sanitized '" + e + "'."), null;
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n;
      return (
        i = t.__songle__ || {},
        i.createScriptElement = function (e, t) {
          let i;
          return (
            t == null && (t = {}),
            t.async == null && (t.async = !1),
            t.defer == null && (t.defer = !1),
            t.type == null && (t.type = "text/javascript"),
            i = document.createElement("script"),
            i.async = t.async ? "async" : "",
            i.defer = t.defer ? "defer" : "",
            i.src = e,
            i.type = t.type,
            i.addEventListener("load", t.onComplete, !1),
            i
          );
        },
        i.requireSongleWidgetAPIv1 = function (e, t) {
          return (
            t == null && (t = {}), t.version == null && (t.version = 1), n(e, t)
          );
        },
        i.requireSongleWidgetAPIv2 = function (e, t) {
          return (
            t == null && (t = {}), t.version == null && (t.version = 2), n(e, t)
          );
        },
        i.requireSongleWidgetAPIv3 = function (e, t) {
          return (
            t == null && (t = {}), t.version == null && (t.version = 3), n(e, t)
          );
        },
        n = function (e, t) {
          return (
            t == null && (t = {}),
            t.skip? t.onComplete && t.onComplete(): e.appendChild(
                  i.createScriptElement(
                    i.protocol +
                      "//" +
                      i.host +
                      i.port +
                      "/v" +
                      t.version +
                      "/api.js",
                    t
                  )
                )
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.__widgets__ == null &&
          (i.__widgets__ = { created: [], errored: [], readied: [] }),
        JSON.decode = JSON.parse,
        JSON.encode = JSON.stringify,
        i.createAPIMessage = function (e, t) {
          return (
            t.api == null && (t.api = e.dataset.api),
            t.url == null && (t.url = e.dataset.url),
            t.widgetMode == null &&
              (t.widgetMode = e.dataset.widgetMode || e.mode),
            t.widgetUUID == null &&
              (t.widgetUUID = e.dataset.widgetUUID || e.uuid),
            t.videoID == null && (t.videoID = e.dataset.videoID || e.videoID),
            t.originTarget == null && (t.originTarget = location.origin),
            t
          );
        },
        i.decodePostMessage = function (e) {
          return e = i.msie9 ? JSON.decode(e) : e, e || {};
        },
        i.encodePostMessage = function (e) {
          return e = i.msie9 ? JSON.encode(e) : e, e || {};
        },
        i.findSongleWidgets = function () {
          let e; let t; let n; let o; let s;
          for (
            s = [], o = i.__widgets__.readied, e = 0, n = o.length;
            e < n;
            e++
          )
            {t = o[e], t && s.push(t);}
          return s.sort(function (e, t) {
            return e.dataset.api > t.dataset.api;
          });
        },
        i.findSongleWidgetsByAPI = function (e) {
          let t; let n; let o; let s; let r;
          for (
            r = [], o = i.findSongleWidgets(), t = 0, n = o.length;
            t < n;
            t++
          )
            {s = o[t], s.dataset.api === e && r.push(s);}
          return r;
        },
        i.findSongleWidgetsByURL = function (e) {
          let t; let n; let o; let s; let r;
          for (
            r = [], o = i.findSongleWidgets(), t = 0, n = o.length;
            t < n;
            t++
          )
            {s = o[t], s.dataset.url === e && r.push(s);}
          return r;
        },
        i.findSongleWidgetsByMode = function (e) {
          let t; let n; let o; let s; let r;
          for (
            r = [], o = i.findSongleWidgets(), t = 0, n = o.length;
            t < n;
            t++
          )
            {s = o[t], s.mode === e && r.push(s);}
          return r;
        },
        i.findSongleWidgetsByUUID = function (e) {
          let t; let n; let o; let s; let r;
          for (
            r = [], o = i.findSongleWidgets(), t = 0, n = o.length;
            t < n;
            t++
          )
            {s = o[t], s.uuid === e && r.push(s);}
          return r;
        },
        i.findSongleWidgetsByVideoID = function (e) {
          let t; let n; let o; let s; let r;
          for (
            r = [], o = i.findSongleWidgets(), t = 0, n = o.length;
            t < n;
            t++
          )
            {s = o[t], s.videoID === e && r.push(s);}
          return r;
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n;
      return (
        i = t.__songle__ || {},
        i.getSakuraComments = function (e) {
          return (
            e == null && (e = {}),
            e.lang == null && (e.lang = i.lang),
            i.getJSON(
              n("/api/v1/sakura/comments.json", e) + "lang=" + e.lang,
              e
            )
          );
        },
        i.getSong = function (e, t) {
          return (
            t == null && (t = {}),
            t.endpoint == null && (t.endpoint = "songle.jp"),
            t.songAutoRegistration == null && (t.songAutoRegistration = 0),
            i.getJSON(
              n("/api/v1/song.json", t) +
                "endpoint=" +
                t.endpoint +
                "&song-auto-registration=" +
                t.songAutoRegistration +
                "&url=" +
                e,
              t
            )
          );
        },
        i.getSongBeat = function (e, t) {
          return (
            t.endpoint == null && (t.endpoint = "songle.jp"),
            t.revision == null && (t.revision = 0),
            i.getJSON(
              n("/api/v1/song/beat.json", t) +
                "endpoint=" +
                t.endpoint +
                "&revision_id=" +
                t.revision +
                "&with_bars=1&url=" +
                e,
              t
            )
          );
        },
        i.getSongBeatRevisions = function (e, t) {
          return i.getJSON(
            n("/api/v1/song/beat_revisions.json", t) + "url=" + e,
            t
          );
        },
        i.getSongChord = function (e, t) {
          return (
            t.endpoint == null && (t.endpoint = "songle.jp"),
            t.revision == null && (t.revision = 0),
            i.getJSON(
              n("/api/v1/song/chord.json", t) +
                "endpoint=" +
                t.endpoint +
                "&revision_id=" +
                t.revision +
                "&url=" +
                e,
              t
            )
          );
        },
        i.getSongChordRevisions = function (e, t) {
          return i.getJSON(
            n("/api/v1/song/chord_revisions.json", t) + "url=" + e,
            t
          );
        },
        i.getSongMelody = function (e, t) {
          return (
            t.endpoint == null && (t.endpoint = "songle.jp"),
            t.revision == null && (t.revision = 0),
            i.getJSON(
              n("/api/v1/song/melody.json", t) +
                "endpoint=" +
                t.endpoint +
                "&revision_id=" +
                t.revision +
                "&url=" +
                e,
              t
            )
          );
        },
        i.getSongMelodyRevisions = function (e, t) {
          return i.getJSON(
            n("/api/v1/song/melody_revisions.json", t) + "url=" + e,
            t
          );
        },
        i.getSongChorus = function (e, t) {
          return (
            t.endpoint == null && (t.endpoint = "songle.jp"),
            t.revision == null && (t.revision = 0),
            i.getJSON(
              n("/api/v1/song/chorus.json", t) +
                "endpoint=" +
                t.endpoint +
                "&revision_id=" +
                t.revision +
                "&url=" +
                e,
              t
            )
          );
        },
        i.getSongChorusRevisions = function (e, t) {
          return i.getJSON(
            n("/api/v1/song/chorus_revisions.json", t) + "url=" + e,
            t
          );
        },
        n = function (e, t) {
          return (
            t == null && (t = {}), i.protocol + "//" + i.host + i.port + e + "?"
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n; let o; let s; let r; let a;
      return (
        a = t.__songle__ || {},
        a.parseSongleSongURI = function (e) {
          if (e.match(o)) {return { host: e.match(o)[1], path: e.match(o)[4] };}
        },
        a.parseNnVideoID = function (e) {
          return e.match(i) ? e.match(i)[3] : e.match(n)[2];
        },
        a.parseYtVideoID = function (e) {
          return e.match(s) ? e.match(s)[3] : e.match(r)[3];
        },
        a.stringIsMp3 = function (e) {
          return !a.stringIsNnVideo(e) && !a.stringIsYtVideo(e);
        },
        a.stringIsNnVideo = function (e) {
          return !!e.match(i) || !!e.match(n);
        },
        a.stringIsYtVideo = function (e) {
          return !!e.match(s) || !!e.match(r);
        },
        o = /^songle:\/\/(|(|[a-z]+\.)songle\.jp)(|\/)(\d+)$/,
        i = /^nn:\/\/(|(|[a-z]+\.)songle\.jp\/)([\w-]+)$/,
        n = /(www\.n.+watch\/)(.{2}(.+))/,
        s = /^yt:\/\/(|(|[a-z]+\.)songle\.jp\/)([\w-]+)$/,
        r = /(www\.y.+watch\?)(.{2}(.+))/,
        e.call(t, "process") >= 0 && (module.exports = a),
        t.__songle__ = a
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.stringIs0 = function (e) {
          return typeof e == "string" && 0 !== e.length && e === "0";
        },
        i.stringIs1 = function (e) {
          return typeof e == "string" && 0 !== e.length && e === "1";
        },
        i.stringIsF = function (e) {
          return (
            typeof e == "string" &&
            0 !== e.length &&
            e[0].toLocaleLowerCase() === "f"
          );
        },
        i.stringIsT = function (e) {
          return (
            typeof e == "string" &&
            0 !== e.length &&
            e[0].toLocaleLowerCase() === "t"
          );
        },
        i.stringIsBlank = function (e) {
          return typeof e == "string" && e.length === 0;
        },
        i.stringIsCSS = function (e) {
          return typeof e == "string" && !!e.match(/^[#(),-.\/:;\w\s]+$/);
        },
        i.stringIsNumber = function (e) {
          return typeof e == "string" && !!e.match(/^[+-.\d]+$/);
        },
        i.stringIsString = function (e) {
          return typeof e == "string" && !!e.match(/^[+-.\w]+$/);
        },
        i.trimProtocol = function (e) {
          let t;
          return "string" != typeof e? e: (t = e.match(/^\w+:\/\/(.+)$/) || [], t ? t[1] : t[0]);
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        Object.defineProperties(i, {
          lang: {
            configurable: !0,
            get: function () {
              return i.searchQueries.lang || i.cookies.lang || "ja";
            },
          },
          rails: {
            configurable: !0,
            get: function () {
              return { env: "production", version: "5.0.7.2" };
            },
          },
          useCacheMode: {
            configurable: !0,
            get: function () {
              return i.searchQueries.cache === "1";
            },
          },
          useDebugMode: {
            configurable: !0,
            get: function () {
              return void 0 === i.searchQueries.dm? i.rails.env === "development": i.searchQueries.dm === "1";
            },
          },
          useErrorMode: {
            configurable: !0,
            get: function () {
              return void 0 === i.searchQueries.em? i.rails.env === "development": i.searchQueries.em === "1";
            },
          },
          useSSLMode: {
            configurable: !0,
            get: function () {
              return (
                void 0 === i.searchQueries.ssl || i.searchQueries.ssl === "1"
              );
            },
          },
          version: {
            configurable: !0,
            get: function () {
              return "development";
            },
          },
        }),
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        Object.defineProperties(i, {
          now: {
            configurable: !0,
            get: function () {
              return t.performance && t.performance.now? parseInt(t.performance.now()): Date.now();
            },
          },
        }),
        i.millisecondsToSeconds = function (e) {
          return e = parseFloat(e), e / 1e3 / 1;
        },
        i.millisecondsToMinutes = function (e) {
          return e = parseFloat(e), e / 1e3 / 60;
        },
        i.secondsToMilliseconds = function (e) {
          return e = parseFloat(e), 1e3 * e * 1;
        },
        i.minutesToMilliseconds = function (e) {
          return e = parseFloat(e), 1e3 * e * 60;
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.__songle__ || {},
        i.requireYtAPI = function (e, n) {
          return (
            n == null && (n = {}),
            t.onYouTubeIframeAPIReady = function () {
              return t.YT = YT, i.readyYtAPI = !0;
            },
            e.appendChild(
              i.createScriptElement("https://www.youtube.com/iframe_api", {
                onComplete: function () {
                  let e;
                  return e = setInterval(function () {
                    if (i.readyYtAPI)
                      {return clearInterval(e), n.onComplete && n.onComplete();}
                  }, 1);
                },
              })
            )
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.__songle__ = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n; let o; let s; let r;
      return (
        n = t.SongleWidgetAPI || {},
        i = (function () {
          function e(e) {
            let t;
            t = {
              configuration: {
                eventPollingInterval: 100,
                beatEventPriority: 3,
                beatEventTimingOffset: 0,
                chordEventPriority: 2,
                chordEventTimingOffset: 0,
                noteEventPriority: 1,
                noteEventTimingOffset: 0,
                chorusSegmentEventPriority: 5,
                chorusSegmentEventTimingOffset: 0,
                repeatSegmentEventPriority: 4,
                repeatSegmentEventTimingOffset: 0,
              },
              dataset: e,
              source: {
                duration: 0,
                position: 0,
                loadedRatio: 0,
                playedRatio: 0,
                bpm: 0,
                currentBeat: null,
                currentChord: null,
                currentNote: null,
                currentChorusSegment: null,
                currentChorusSegmentEventInvokedCount: 0,
                currentRepeatSegment: null,
                currentRepeatSegmentEventInvokedCount: 0,
                physicalTimeStamp: 0,
                physicalTimeStampJitter: 0,
                serializedSong: null,
              },
              traps: {
                beatEnter: [],
                beatLeave: [],
                chordEnter: [],
                chordLeave: [],
                noteEnter: [],
                noteLeave: [],
                chorusSegmentEnter: [],
                chorusSegmentLeave: [],
                repeatSegmentEnter: [],
                repeatSegmentLeave: [],
                reload: [],
                remove: [],
                autoPlayAbort: [],
                autoPlayDo: [],
                autoLoopAbort: [],
                autoLoopDo: [],
                startAtAbort: [],
                startAtDo: [],
                play: [],
                pause: [],
                stop: [],
                seek: [],
                loadingProgress: [],
                playingProgress: [],
                finish: [],
              },
            },
              i(this, t),
              n(this, t),
              o(this, t),
              s(this, t),
              r(this, t),
              a(this, t),
              u(this, t);
          }
          let i;
            let n;
            let o;
            let s;
            let r;
            let a;
            let l;
            let u;
            let c;
            let d;
            let h;
            let p;
            let f;
            let g;
            let m;
            let v;
            let _;
            let y;
            let b;
            let w;
            let x;
            let S;
            let C;
            let k;
            let T;
            let E;
            let D;
            let I;
            let P;
            let A;
            let O;
            let M;
            let N;
            let R;
            let L;
            let W;
            let j;
          return (
            i = function (e, t) {
              return t.source.serializedSong = JSON.stringify(t.dataset.song);
            },
            n = function () {},
            o = function (e, t) {
              return (
                e.on = function (i, n, o) {
                  let s;
                  switch (
                    o == null && (o = {}),
                    o.offset == null && (o.offset = 0),
                    o.useOriginalEvent == null && (o.useOriginalEvent = !1),
                    o.useNnEvent == null && (o.useNnEvent = !1),
                    o.useYtEvent == null && (o.useYtEvent = !1),
                    i = N(i),
                    i = R(i),
                    i = W(i),
                    i = L(i),
                    i = j(i),
                    !1
                  ) {
                    case !(i === "beatEnter" || i === "beatLeave"):
                      s = new __songle__.BeatDetector(e);
                      break;
                    case !(i === "chordEnter" || i === "chordLeave"):
                      s = new __songle__.ChordDetector(e);
                      break;
                    case !(i === "noteEnter" || i === "noteLeave"):
                      s = new __songle__.NoteDetector(e);
                      break;
                    case !(
                      i === "chorusSegmentEnter" || i === "chorusSegmentLeave"
                    ):
                      s = new __songle__.ChorusSegmentDetector(e);
                      break;
                    case !(
                      i === "repeatSegmentEnter" || i === "repeatSegmentLeave"
                    ):
                      s = new __songle__.RepeatSegmentDetector(e);
                  }
                  return (
                    t.traps[i] &&
                      t.traps[i].push({
                        detector: s,
                        invoke: n,
                        offset: o.offset,
                        useOriginalEvent: o.useOriginalEvent,
                        useNnEvent: o.useNnEvent,
                        useYtEvent: o.useYtEvent,
                      }),
                    e
                  );
                },
                e.off = function (i, n) {
                  return (
                    i = N(i),
                    i = R(i),
                    i = W(i),
                    i = L(i),
                    i = j(i),
                    n? t.traps[i] = t.traps[i].filter(function (e) {
                          return e.invoke !== n;
                        }): t.traps[i] = [],
                    e
                  );
                },
                e.play = function (t) {
                  return (
                    t == null && (t = {}), x(e, { type: "play", options: t }), e
                  );
                },
                e.pause = function (t) {
                  return (
                    t == null && (t = {}),
                    x(e, { type: "pause", options: t }),
                    e
                  );
                },
                e.stop = function (t) {
                  return (
                    t == null && (t = {}), x(e, { type: "stop", options: t }), e
                  );
                },
                e.seekTo = function (t, i) {
                  return (
                    i == null && (i = {}),
                    x(e, { type: "seekTo", milliseconds: t, options: i }),
                    e
                  );
                },
                e.seekToPrevChorus = function (t) {
                  return (
                    t == null && (t = {}),
                    x(e, { type: "seekToPrevChorus", options: t }),
                    e
                  );
                },
                e.seekToNextChorus = function (t) {
                  return (
                    t == null && (t = {}),
                    x(e, { type: "seekToNextChorus", options: t }),
                    e
                  );
                },
                e.seekToPrevRepeat = function (t) {
                  return (
                    t == null && (t = {}),
                    x(e, { type: "seekToPrevRepeat", options: t }),
                    e
                  );
                },
                e.seekToNextRepeat = function (t) {
                  return (
                    t == null && (t = {}),
                    x(e, { type: "seekToNextRepeat", options: t }),
                    e
                  );
                },
                e.setAllEventTimingOffset = function (t) {
                  return (
                    e.beatEventTimingOffset = t,
                    e.chordEventTimingOffset = t,
                    e.noteEventTimingOffset = t,
                    e.chorusSegmentEventTimingOffset = t,
                    e.repeatSegmentEventTimingOffset = t,
                    e
                  );
                },
                e.serialize = function () {
                  return t.source.serializedSong;
                },
                e.remove = function (t) {
                  return x(e, { type: "remove", options: t }), e;
                }
              );
            },
            s = function () {},
            r = function (e, t) {
              return Object.defineProperties(e, {
                dataset: {
                  get: function () {
                    return { api: t.dataset.api, url: t.dataset.url };
                  },
                },
                mode: {
                  get: function () {
                    return t.dataset.widgetMode;
                  },
                },
                uuid: {
                  get: function () {
                    return t.dataset.widgetUUID;
                  },
                },
                videoID: {
                  get: function () {
                    return t.dataset.videoID;
                  },
                },
                rootElement: {
                  get: function () {
                    let e;
                    if (
                      e = document.querySelector(
                        "[id='" + t.dataset.widgetUUID + "']"
                      ),
                      e && e.parentElement
                    )
                      {return e.parentElement;}
                  },
                },
                isPlaying: {
                  get: function () {
                    return (
                      t.source.status ===
                      __songle__.SONGLE_WIDGET_PLAYING_STATUS
                    );
                  },
                },
                isPaused: {
                  get: function () {
                    return (
                      t.source.status === __songle__.SONGLE_WIDGET_PAUSED_STATUS
                    );
                  },
                },
                isStopped: {
                  get: function () {
                    return (
                      t.source.status ===
                      __songle__.SONGLE_WIDGET_STOPPED_STATUS
                    );
                  },
                },
                isSeeking: {
                  get: function () {
                    return (
                      t.source.status ===
                      __songle__.SONGLE_WIDGET_SEEKING_STATUS
                    );
                  },
                },
                bpm: {
                  get: function () {
                    return t.source.bpm;
                  },
                },
                currentBeat: {
                  get: function () {
                    return t.source.currentBeat;
                  },
                },
                currentChord: {
                  get: function () {
                    return t.source.currentChord;
                  },
                },
                currentNote: {
                  get: function () {
                    return t.source.currentNote;
                  },
                },
                currentChorus: {
                  get: function () {
                    return e.currentChorusSegment;
                  },
                },
                currentChorusSegment: {
                  get: function () {
                    return t.source.currentChorusSegment;
                  },
                },
                currentRepeat: {
                  get: function () {
                    return e.currentRepeatSegment;
                  },
                },
                currentRepeatSegment: {
                  get: function () {
                    return t.source.currentRepeatSegment;
                  },
                },
                isPlayingChorus: {
                  get: function () {
                    return e.isPlayingChorusSegment;
                  },
                },
                isPlayingChorusSegment: {
                  get: function () {
                    return !!t.source.currentChorusSegment;
                  },
                },
                isPlayingRepeat: {
                  get: function () {
                    return e.isPlayingRepeatSegment;
                  },
                },
                isPlayingRepeatSegment: {
                  get: function () {
                    return !!t.source.currentRepeatSegment;
                  },
                },
                duration: {
                  get: function () {
                    let e;
                    return (
                      e = t.dataset.song.duration || t.source.duration,
                      {
                        milliseconds: e,
                        seconds: __songle__.millisecondsToSeconds(e),
                        minutes: __songle__.millisecondsToMinutes(e),
                      }
                    );
                  },
                },
                position: {
                  get: function () {
                    let i;
                    return (
                      i =
                        t.dataset.song.position || t.source.position + l(e, t),
                      {
                        milliseconds: i,
                        seconds: __songle__.millisecondsToSeconds(i),
                        minutes: __songle__.millisecondsToMinutes(i),
                      }
                    );
                  },
                },
                loadedRatio: {
                  get: function () {
                    return t.source.loadedRatio;
                  },
                },
                playedRatio: {
                  get: function () {
                    let i; let n;
                    return e.isPlaying? (i = e.duration.milliseconds,
                        n = e.position.milliseconds,
                        n / i): t.source.playedRatio;
                  },
                },
                volume: {
                  get: function () {
                    return void 0 !== t.source.volume? t.source.volume: __songle__.computeAverageVolume(t.dataset);
                  },
                  set: function (i) {
                    return (
                      i < __songle__.MIN_VOLUME && (i = __songle__.MIN_VOLUME),
                      i > __songle__.MAX_VOLUME && (i = __songle__.MAX_VOLUME),
                      x(e, { type: "setVolume", volume: i }),
                      t.source.volume = i
                    );
                  },
                },
                song: {
                  get: function () {
                    return t.dataset.song;
                  },
                },
                eventPollingInterval: {
                  get: function () {
                    return t.configuration.eventPollingInterval;
                  },
                  set: function (e) {
                    return t.configuration.eventPollingInterval = e;
                  },
                },
                beatEventPriority: {
                  get: function () {
                    return t.configuration.beatEventPriority;
                  },
                  set: function (e) {
                    return t.configuration.beatEventPriority = e;
                  },
                },
                beatEventTimingOffset: {
                  get: function () {
                    return t.configuration.beatEventTimingOffset;
                  },
                  set: function (e) {
                    return t.configuration.beatEventTimingOffset = e;
                  },
                },
                chordEventPriority: {
                  get: function () {
                    return t.configuration.chordEventPriority;
                  },
                  set: function (e) {
                    return t.configuration.chordEventPriority = e;
                  },
                },
                chordEventTimingOffset: {
                  get: function () {
                    return t.configuration.chordEventTimingOffset;
                  },
                  set: function (e) {
                    return t.configuration.chordEventTimingOffset = e;
                  },
                },
                noteEventPriority: {
                  get: function () {
                    return t.configuration.noteEventPriority;
                  },
                  set: function (e) {
                    return t.configuration.noteEventPriority = e;
                  },
                },
                noteEventTimingOffset: {
                  get: function () {
                    return t.configuration.noteEventTimingOffset;
                  },
                  set: function (e) {
                    return t.configuration.noteEventTimingOffset = e;
                  },
                },
                chorusSegmentEventPriority: {
                  get: function () {
                    return t.configuration.chorusSegmentEventPriority;
                  },
                  set: function (e) {
                    return t.configuration.chorusSegmentEventPriority = e;
                  },
                },
                chorusSegmentEventTimingOffset: {
                  get: function () {
                    return t.configuration.chorusSegmentEventTimingOffset;
                  },
                  set: function (e) {
                    return t.configuration.chorusSegmentEventTimingOffset = e;
                  },
                },
                repeatSegmentEventPriority: {
                  get: function () {
                    return t.configuration.repeatSegmentEventPriority;
                  },
                  set: function (e) {
                    return t.configuration.repeatSegmentEventPriority = e;
                  },
                },
                repeatSegmentEventTimingOffset: {
                  get: function () {
                    return t.configuration.repeatSegmentEventTimingOffset;
                  },
                  set: function (e) {
                    return t.configuration.repeatSegmentEventTimingOffset = e;
                  },
                },
              });
            },
            a = function (e, t) {
              return delete t.dataset.song.mp3Path;
            },
            l = function (e, t) {
              let i;
              return (
                i = e.isPlaying? __songle__.now -
                    (t.source.physicalTimeStamp +
                      t.source.physicalTimeStampJitter): 0,
                i < 0 && (i = 0),
                i > e.duration.milliseconds && (i = e.duration.milliseconds),
                i
              );
            },
            x = function (e, i) {
              let n;
              i = __songle__.createAPIMessage(e, i);
              try {
                return t.frames[e.uuid].postMessage(
                  __songle__.encodePostMessage(i),
                  "*"
                );
              } catch (e) {
                return n = e, __songle__.error(n);
              }
            },
            u = function (e, i) {
              return (
                t.addEventListener(
                  "message",
                  i.apiMessageListener = function (t) {
                    let n;
                    if (
                      __songle__ &&
                      t.origin ===
                        __songle__.protocol +
                          "//" +
                          __songle__.host +
                          __songle__.port &&
                      (n = __songle__.decodePostMessage(t.data),
                      n.api === i.dataset.api)
                    )
                      {switch (n.type) {
                        case "onSync":
                          return O(e, i, n);
                        case "onCreate":
                          return __songle__.debugSwAPI(
                            "was notified 'onCreate' by '" +
                              n.source +
                              "' (It's maybe API bug)",
                            { prefix: "[" + e.uuid + "]" }
                          );
                        case "onError":
                          return __songle__.debugSwAPI(
                            "was notified 'onError' by '" +
                              n.source +
                              "' (It's maybe API bug)",
                            { prefix: "[" + e.uuid + "]" }
                          );
                        case "onReady":
                          return __songle__.debugSwAPI(
                            "was notified 'onReady' by '" +
                              n.source +
                              "' (It's maybe API bug)",
                            { prefix: "[" + e.uuid + "]" }
                          );
                        case "onReload":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onReload' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            c(e, i, n)
                          );
                        case "onRemove":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onRemove' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            d(e, i, n)
                          );
                        case "onAutoPlayAbort":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onAutoPlayAbort' by '" +
                                n.source +
                                "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            w(e, i, n, "autoPlayAbort")
                          );
                        case "onAutoPlayDo":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onAutoPlayDo' by '" +
                                n.source +
                                "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            w(e, i, n, "autoPlayDo")
                          );
                        case "onAutoLoopAbort":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onAutoLoopAbort' by '" +
                                n.source +
                                "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            w(e, i, n, "autoLoopAbort")
                          );
                        case "onAutoLoopDo":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onAutoLoopDo' by '" +
                                n.source +
                                "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            w(e, i, n, "autoLoopDo")
                          );
                        case "onStartAtAbort":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onStartAtAbort' by '" +
                                n.source +
                                "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            w(e, i, n, "startAtAbort")
                          );
                        case "onStartAtDo":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onStartAtDo' by '" +
                                n.source +
                                "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            w(e, i, n, "startAtDo")
                          );
                        case "onPlay":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onPlay' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            O(e, i, n),
                            w(e, i, n, "play")
                          );
                        case "onPause":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onPause' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            O(e, i, n),
                            w(e, i, n, "pause")
                          );
                        case "onStop":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onStop' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            O(e, i, n),
                            w(e, i, n, "stop")
                          );
                        case "onSeek":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onSeek' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            O(e, i, n),
                            w(e, i, n, "seek")
                          );
                        case "onFinish":
                          return (
                            __songle__.debugSwAPI(
                              "was notified 'onFinish' by '" + n.source + "'",
                              { prefix: "[" + e.uuid + "]" }
                            ),
                            O(e, i, n),
                            w(e, i, n, "finish")
                          );
                      }}
                  },
                  !1
                ),
                P(e, i)
              );
            },
            c = function (e, t, i) {
              let n; let o; let s; let r; let a;
              for (
                t.dataset.song.scene = i.song.scene,
                  s = t.traps.reload,
                  r = [],
                  n = 0,
                  o = s.length;
                n < o;
                n++
              )
                {a = s[n], r.push(a.invoke({ source: i.source }, this));}
              return r;
            },
            d = function (e, t, i) {
              let n; let o; let s; let r; let a; let l; let u; let c; let d; let h; let p;
              for (
                __songle__.debugSwAPI(
                  "removed 'detector' worker (ID:" +
                    (t.detectorTimeoutID || 0) +
                    ")",
                  { prefix: "[" + e.uuid + "]" }
                ),
                  clearTimeout(t.detectorTimeoutID),
                  removeEventListener("message", t.apiMessageListener, !1),
                  h = document.querySelector("div[id='" + e.uuid + "']"),
                  h.parentNode.removeChild(h),
                  l = t.traps.remove,
                  n = 0,
                  r = l.length;
                n < r;
                n++
              )
                {p = l[n], p.invoke({ source: i.source }, this);}
              for (
                __songle__.debugSwAPI("removed", {
                  prefix: "[" + e.uuid + "]",
                }),
                  u = __songle__.__widgets__.readied,
                  c = [],
                  o = s = 0,
                  a = u.length;
                s < a;
                o = ++s
              )
                {d = u[o],
                  d && d.uuid === e.uuid? c.push(delete __songle__.__widgets__.readied[o]): c.push(void 0);}
              return c;
            },
            h = function (e, t, i) {
              return (
                t.globalBeatDetector.forEach(
                  {
                    enter: function (e) {
                      return (
                        t.source.bpm = e.beat.bpm,
                        t.source.currentBeat = e.beat
                      );
                    },
                  },
                  {
                    offset: e.beatEventTimingOffset,
                    positionA: i,
                    positionB: i,
                  }
                ),
                b(e, t, "beatLeave", i, e.beatEventTimingOffset),
                y(e, t, "beatEnter", i, e.beatEventTimingOffset)
              );
            },
            p = function (e, t, i) {
              return (
                t.globalChordDetector.forEach(
                  {
                    enter: function (e) {
                      return t.source.currentChord = e.chord;
                    },
                  },
                  {
                    offset: e.chordEventTimingOffset,
                    positionA: i,
                    positionB: i,
                  }
                ),
                b(e, t, "chordLeave", i, e.chordEventTimingOffset),
                y(e, t, "chordEnter", i, e.chordEventTimingOffset)
              );
            },
            m = function (e, t, i) {
              return (
                t.globalNoteDetector.forEach(
                  {
                    enter: function (e) {
                      return t.source.currentNote = e.note;
                    },
                  },
                  {
                    offset: e.noteEventTimingOffset,
                    positionA: i,
                    positionB: i,
                  }
                ),
                b(e, t, "noteLeave", i, e.noteEventTimingOffset),
                y(e, t, "noteEnter", i, e.noteEventTimingOffset)
              );
            },
            f = function (e, t, i) {
              return (
                t.globalChorusSegmentDetector.forEach(
                  {
                    enter: function (i) {
                      return (
                        t.source.currentChorusSegmentEventInvokedCount += 1,
                        __songle__.debugSwAPI(
                          "'currentChorusSegmentEventInvokedCount' is " +
                            t.source.currentChorusSegmentEventInvokedCount,
                          { prefix: "[" + e.uuid + "]" }
                        ),
                        t.source.currentChorusSegment &&
                        t.source.currentChorusSegment.segment.index >=
                          i.segment.index? t.source.currentChorusSegment = i: t.source.currentChorusSegment = i
                      );
                    },
                    leave: function () {
                      if (
                        t.source.currentChorusSegmentEventInvokedCount -= 1,
                        __songle__.debugSwAPI(
                          "'currentChorusSegmentEventInvokedCount' is " +
                            t.source.currentChorusSegmentEventInvokedCount,
                          { prefix: "[" + e.uuid + "]" }
                        ),
                        t.source.currentChorusSegmentEventInvokedCount === 0
                      )
                        {return t.source.currentChorusSegment = null;}
                    },
                  },
                  {
                    offset: e.chorusSegmentEventTimingOffset,
                    positionA: i,
                    positionB: i,
                  }
                ),
                b(
                  e,
                  t,
                  "chorusSegmentLeave",
                  i,
                  e.chorusSegmentEventTimingOffset
                ),
                y(
                  e,
                  t,
                  "chorusSegmentEnter",
                  i,
                  e.chorusSegmentEventTimingOffset
                )
              );
            },
            _ = function (e, t, i) {
              return (
                t.globalRepeatSegmentDetector.forEach(
                  {
                    enter: function (i) {
                      return (
                        t.source.currentRepeatSegmentEventInvokedCount += 1,
                        __songle__.debugSwAPI(
                          "'currentRepeatSegmentEventInvokedCount' is " +
                            t.source.currentRepeatSegmentEventInvokedCount,
                          { prefix: "[" + e.uuid + "]" }
                        ),
                        t.source.currentRepeatSegment &&
                        t.source.currentRepeatSegment.segment.index >=
                          i.segment.index? t.source.currentRepeatSegment = i: t.source.currentRepeatSegment = i
                      );
                    },
                    leave: function () {
                      if (
                        t.source.currentRepeatSegmentEventInvokedCount -= 1,
                        __songle__.debugSwAPI(
                          "'currentRepeatSegmentEventInvokedCount' is " +
                            t.source.currentRepeatSegmentEventInvokedCount,
                          { prefix: "[" + e.uuid + "]" }
                        ),
                        t.source.currentRepeatSegmentEventInvokedCount === 0
                      )
                        {return t.source.currentRepeatSegment = null;}
                    },
                  },
                  {
                    offset: e.repeatSegmentEventTimingOffset,
                    positionA: i,
                    positionB: i,
                  }
                ),
                b(
                  e,
                  t,
                  "repeatSegmentLeave",
                  i,
                  e.repeatSegmentEventTimingOffset
                ),
                y(
                  e,
                  t,
                  "repeatSegmentEnter",
                  i,
                  e.repeatSegmentEventTimingOffset
                )
              );
            },
            g = function (e, t, i) {
              let n; let o; let s; let r; let a;
              if (t.source.loadedRatio - i.loadedRatio !== 0) {
                for (
                  t.source.loadedRatio = i.loadedRatio,
                    s = t.traps.loadingProgress,
                    r = [],
                    n = 0,
                    o = s.length;
                  n < o;
                  n++
                )
                  {a = s[n],
                    r.push(
                      a.invoke({ source: __songle__.SOURCE_SONGLE_WIDGET }, e)
                    );}
                return r;
              }
            },
            v = function (e, t, i) {
              let n; let o; let s; let r; let a;
              if (t.source.playedRatio - i.playedRatio !== 0) {
                for (
                  t.source.playedRatio = i.playedRatio,
                    s = t.traps.playingProgress,
                    r = [],
                    n = 0,
                    o = s.length;
                  n < o;
                  n++
                )
                  {a = s[n],
                    r.push(
                      a.invoke({ source: __songle__.SOURCE_SONGLE_WIDGET }, e)
                    );}
                return r;
              }
            },
            y = function (e, t, i, n, o) {
              let s; let r; let a; let l; let u;
              for (a = t.traps[i], l = [], s = 0, r = a.length; s < r; s++)
                {u = a[s],
                  l.push(
                    u.detector.forEach(
                      {
                        enter: function (t) {
                          return u.invoke(t, e);
                        },
                      },
                      { offset: o + u.offset, positionA: n, positionB: n }
                    )
                  );}
              return l;
            },
            b = function (e, t, i, n, o) {
              let s; let r; let a; let l; let u;
              for (a = t.traps[i], l = [], s = 0, r = a.length; s < r; s++)
                {u = a[s],
                  l.push(
                    u.detector.forEach(
                      {
                        leave: function (t) {
                          return u.invoke(t, e);
                        },
                      },
                      { offset: o + u.offset, positionA: n, positionB: n }
                    )
                  );}
              return l;
            },
            w = function (e, t, i, n) {
              let o; let s; let r; let a; let l; let u; let c; let d; let h; let p; let f; let g;
              switch (i.source) {
                case __songle__.SOURCE_SONGLE_WIDGET:
                  for (c = t.traps[n], o = 0, a = c.length; o < a; o++)
                    {g = c[o], g.invoke({ source: i.source }, e);}
                  switch (i.type) {
                    case "onPlay":
                      return P(e, t);
                    case "onPause":
                      return P(e, t);
                    case "onStop":
                      return P(e, t);
                    case "onFinish":
                      return P(e, t);
                  }
                  break;
                case __songle__.SOURCE_NN_VIDEO:
                  for (d = t.traps[n], p = [], s = 0, l = d.length; s < l; s++)
                    {g = d[s],
                      g.useOriginalEvent || g.useNnEvent? p.push(g.invoke({ source: i.source }, e)): p.push(void 0);}
                  return p;
                case __songle__.SOURCE_YT_VIDEO:
                  for (h = t.traps[n], f = [], r = 0, u = h.length; r < u; r++)
                    {g = h[r],
                      g.useOriginalEvent || g.useYtEvent? f.push(g.invoke({ source: i.source }, e)): f.push(void 0);}
                  return f;
              }
            },
            S = function (e, t) {
              return (
                t.globalBeatDetector.reset(),
                I(e, t, "beatLeave"),
                D(e, t, "beatEnter")
              );
            },
            C = function (e, t) {
              return (
                t.globalChordDetector.reset(),
                I(e, t, "chordLeave"),
                D(e, t, "chordEnter")
              );
            },
            T = function (e, t) {
              return (
                t.globalNoteDetector.reset(),
                I(e, t, "noteLeave"),
                D(e, t, "noteEnter")
              );
            },
            k = function (e, t) {
              return (
                t.globalChorusSegmentDetector.reset({
                  leave: function () {
                    return (
                      t.source.currentChorusSegment = null,
                      t.source.currentChorusSegmentEventInvokedCount = 0
                    );
                  },
                }),
                I(e, t, "chorusSegmentLeave"),
                D(e, t, "chorusSegmentEnter")
              );
            },
            E = function (e, t) {
              return (
                t.globalRepeatSegmentDetector.reset({
                  leave: function () {
                    return (
                      t.source.currentRepeatSegment = null,
                      t.source.currentRepeatSegmentEventInvokedCount = 0
                    );
                  },
                }),
                I(e, t, "repeatSegmentLeave"),
                D(e, t, "repeatSegmentEnter")
              );
            },
            D = function (e, t, i) {
              let n; let o; let s; let r; let a;
              for (s = t.traps[i], r = [], n = 0, o = s.length; n < o; n++)
                {a = s[n],
                  r.push(
                    a.detector.reset({
                      enter: function (t) {
                        return a.invoke(t, e);
                      },
                    })
                  );}
              return r;
            },
            I = function (e, t, i) {
              let n; let o; let s; let r; let a;
              for (s = t.traps[i], r = [], n = 0, o = s.length; n < o; n++)
                {a = s[n],
                  r.push(
                    a.detector.reset({
                      leave: function (t) {
                        return a.invoke(t, e);
                      },
                    })
                  );}
              return r;
            },
            P = function (e, t) {
              let i;
              return (
                __songle__.debugSwAPI("detector worker was restarted", {
                  prefix: "[" + e.uuid + "]",
                }),
                t.globalBeatDetector == null &&
                  (t.globalBeatDetector = new __songle__.BeatDetector(e)),
                t.globalChordDetector == null &&
                  (t.globalChordDetector = new __songle__.ChordDetector(e)),
                t.globalNoteDetector == null &&
                  (t.globalNoteDetector = new __songle__.NoteDetector(e)),
                t.globalChorusSegmentDetector == null &&
                  (t.globalChorusSegmentDetector =
                    new __songle__.ChorusSegmentDetector(e)),
                t.globalRepeatSegmentDetector == null &&
                  (t.globalRepeatSegmentDetector =
                    new __songle__.RepeatSegmentDetector(e)),
                clearTimeout(t.detectorTimeoutID),
                A(e)[0].resetTrap(e, t),
                A(e)[1].resetTrap(e, t),
                A(e)[2].resetTrap(e, t),
                A(e)[3].resetTrap(e, t),
                A(e)[4].resetTrap(e, t),
                (i = function () {
                  return t.detectorTimeoutID = setTimeout(function () {
                    let n;
                    return (
                      e.isPlaying &&
                        (n = e.position.milliseconds,
                        A(e)[0].invokeTrap(e, t, n),
                        A(e)[1].invokeTrap(e, t, n),
                        A(e)[2].invokeTrap(e, t, n),
                        A(e)[3].invokeTrap(e, t, n),
                        A(e)[4].invokeTrap(e, t, n)),
                      i()
                    );
                  }, t.eventPollingInterval);
                })()
              );
            },
            A = function (e) {
              let t;
              return (
                t = [
                  {
                    priority: e.beatEventPriority,
                    invokeTrap: h,
                    resetTrap: S,
                  },
                  {
                    priority: e.chordEventPriority,
                    invokeTrap: p,
                    resetTrap: C,
                  },
                  {
                    priority: e.noteEventPriority,
                    invokeTrap: m,
                    resetTrap: T,
                  },
                  {
                    priority: e.chorusSegmentEventPriority,
                    invokeTrap: f,
                    resetTrap: k,
                  },
                  {
                    priority: e.repeatSegmentEventPriority,
                    invokeTrap: _,
                    resetTrap: E,
                  },
                ],
                t.sort(function (e, t) {
                  return e.priority < t.priority;
                })
              );
            },
            O = function (e, t, i) {
              return (
                t.source.status = i.status,
                t.source.volume = i.volume,
                g(e, t, i),
                v(e, t, i),
                M(e, t, i)
              );
            },
            M = function (e, t, i) {
              switch (i.widgetMode) {
                case __songle__.MP3_MODE:
                  return (
                    t.source.duration = i.duration,
                    t.source.position = i.position + 100,
                    t.source.physicalTimeStamp = i.physicalTimeStamp2,
                    t.source.physicalTimeStampJitter =
                      __songle__.now - i.physicalTimeStamp2
                  );
                case __songle__.NN_VIDEO_MODE:
                  return (
                    t.source.duration = i.duration,
                    t.source.position = i.position,
                    t.source.physicalTimeStamp = i.physicalTimeStamp1
                  );
                case __songle__.YT_VIDEO_MODE:
                  return (
                    t.source.duration = i.duration,
                    t.source.position = i.position + 100,
                    t.source.physicalTimeStamp = i.physicalTimeStamp1
                  );
              }
            },
            N = function (e) {
              switch (e) {
                case "beatPlay":
                  return "beatEnter";
              }
              return e;
            },
            R = function (e) {
              switch (e) {
                case "chordPlay":
                  return "chordEnter";
              }
              return e;
            },
            W = function (e) {
              switch (e) {
                case "notePlay":
                  return "noteEnter";
              }
              return e;
            },
            L = function (e) {
              switch (e) {
                case "chorusEnter":
                  return "chorusSegmentEnter";
                case "chorusLeave":
                  return "chorusSegmentLeave";
              }
              return e;
            },
            j = function (e) {
              switch (e) {
                case "repeatEnter":
                  return "repeatSegmentEnter";
                case "repeatLeave":
                  return "repeatSegmentLeave";
              }
              return e;
            },
            e
          );
        })(),
        t.addEventListener &&
          t.addEventListener(
            "message",
            function (e) {
              let t; let i;
              if (
                __songle__ &&
                e.origin ===
                  __songle__.protocol +
                    "//" +
                    __songle__.host +
                    __songle__.port &&
                (t = __songle__.decodePostMessage(e.data), t.api)
              )
                {switch (t.type) {
                  case "onCreate":
                    if (
                      __songle__.__widgets__.created.indexOf(t.widgetUUID) ===
                      -1
                    )
                      {return o(t);}
                    break;
                  case "onError":
                    if (
                      __songle__.__widgets__.errored.indexOf(t.widgetUUID) ===
                      -1
                    )
                      {return s(t);}
                    break;
                  case "onReady":
                    if (
                      i = __songle__.findSongleWidgetsByUUID(
                        t.widgetUUID
                      )[0],
                      !i
                    )
                      {return r(t);}
                }}
            },
            !1
          ),
        o = function (e) {
          return (
            __songle__.__widgets__.created.push(e.widgetUUID),
            t[e.callbackName] &&
              t[e.callbackName](e.api, {
                dataset: { api: e.api, url: e.url },
                mode: e.widgetMode,
                uuid: e.widgetUUID,
                videoID: e.videoID,
                source: e.source,
                status: e.status,
              })
          );
        },
        s = function (e) {
          return (
            __songle__.__widgets__.errored.push(e.widgetUUID),
            t[e.callbackName] &&
              t[e.callbackName](e.api, {
                dataset: { api: e.api, url: e.url },
                mode: e.widgetMode,
                uuid: e.widgetUUID,
                videoID: e.videoID,
                source: e.source,
                status: e.status,
              })
          );
        },
        r = function (e) {
          let n;
          return (
            __songle__.__widgets__.readied.push(n = new i(e)),
            t[e.callbackName] && t[e.callbackName](e.api, n)
          );
        },
        e.call(t, "process") >= 0 && (module.exports = n),
        t.SongleWidgetAPI = n
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.SongleWidgetAPI || {},
        i.computeAverageVolume = __songle__.computeAverageVolume,
        i.computeOffsetFromRepeatSegmentBy =
          __songle__.computeOffsetFromRepeatSegmentBy,
        i.findPrevRepeatSegmentRepeatBy =
          __songle__.findPrevRepeatSegmentRepeatBy,
        i.findNextRepeatSegmentRepeatBy =
          __songle__.findNextRepeatSegmentRepeatBy,
        i.mergeRepeatSegments = __songle__.mergeRepeatSegments,
        e.call(t, "process") >= 0 && (module.exports = i),
        t.SongleWidgetAPI = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.SongleWidgetAPI || {},
        Object.defineProperties(i, {
          DEFAULT_SONGLE_WIDGET_SIZE_W: {
            configurable: !0,
            get: function () {
              return __songle__.DEFAULT_SONGLE_WIDGET_SIZE_W;
            },
          },
          DEFAULT_SONGLE_WIDGET_SIZE_H: {
            configurable: !0,
            get: function () {
              return __songle__.DEFAULT_SONGLE_WIDGET_SIZE_H;
            },
          },
          DEFAULT_VIDEO_PLAYER_SIZE_W: {
            configurable: !0,
            get: function () {
              return __songle__.DEFAULT_VIDEO_PLAYER_SIZE_W;
            },
          },
          DEFAULT_VIDEO_PLAYER_SIZE_H: {
            configurable: !0,
            get: function () {
              return __songle__.DEFAULT_VIDEO_PLAYER_SIZE_H;
            },
          },
          MIN_SONGLE_WIDGET_SIZE_W: {
            configurable: !0,
            get: function () {
              return __songle__.MIN_SONGLE_WIDGET_SIZE_W;
            },
          },
          MIN_SONGLE_WIDGET_SIZE_H: {
            configurable: !0,
            get: function () {
              return __songle__.MIN_SONGLE_WIDGET_SIZE_H;
            },
          },
          MIN_VIDEO_PLAYER_SIZE_W: {
            configurable: !0,
            get: function () {
              return __songle__.MIN_VIDEO_PLAYER_SIZE_W;
            },
          },
          MIN_VIDEO_PLAYER_SIZE_H: {
            configurable: !0,
            get: function () {
              return __songle__.MIN_VIDEO_PLAYER_SIZE_H;
            },
          },
          MIN_VOLUME: {
            configurable: !0,
            get: function () {
              return __songle__.MIN_VOLUME;
            },
          },
          MAX_VOLUME: {
            configurable: !0,
            get: function () {
              return __songle__.MAX_VOLUME;
            },
          },
          MP3_MODE: {
            configurable: !0,
            get: function () {
              return __songle__.MP3_MODE;
            },
          },
          NN_VIDEO_MODE: {
            configurable: !0,
            get: function () {
              return __songle__.NN_VIDEO_MODE;
            },
          },
          YT_VIDEO_MODE: {
            configurable: !0,
            get: function () {
              return __songle__.YT_VIDEO_MODE;
            },
          },
          SOURCE_SONGLE_WIDGET: {
            configurable: !0,
            get: function () {
              return __songle__.SOURCE_SONGLE_WIDGET;
            },
          },
          SOURCE_MP3: {
            configurable: !0,
            get: function () {
              return __songle__.SOURCE_MP3;
            },
          },
          SOURCE_NN_VIDEO: {
            configurable: !0,
            get: function () {
              return __songle__.SOURCE_NN_VIDEO;
            },
          },
          SOURCE_YT_VIDEO: {
            configurable: !0,
            get: function () {
              return __songle__.SOURCE_YT_VIDEO;
            },
          },
        }),
        e.call(t, "process") >= 0 && (module.exports = i),
        t.SongleWidgetAPI = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i; let n; let o; let s;
      return (
        i = t.SongleWidgetAPI || {},
        i.createSongleWidgetElement = function (e) {
          let t;
          return (
            e == null && (e = {}),
            t = document.createElement("div"),
            t.appendChild(n(e)),
            t.appendChild(o(e)),
            t
          );
        },
        n = function (e) {
          return (
            e == null && (e = {}),
            e.version == null && (e.version = 1),
            __songle__.createScriptElement(
              __songle__.protocol +
                "//" +
                __songle__.host +
                __songle__.port +
                "/v" +
                e.version +
                "/widgets.js"
            )
          );
        },
        o = function (e) {
          let i;
          return (
            e == null && (e = {}),
            e.api = s("api", e) || e.api,
            e.url = s("url", e) || e.url,
            e.endpoint = s("endpoint", e) || e.endpoint,
            e.apiCreateCallbackName =
              s("api-create-callback-name", e) ||
              e.apiCreateCallbackName ||
              "onSongleWidgetCreate",
            e.apiErrorCallbackName =
              s("api-error-callback-name", e) ||
              e.apiErrorCallbackName ||
              "onSongleWidgetError",
            e.apiReadyCallbackName =
              s("api-ready-callback-name", e) ||
              e.apiReadyCallbackName ||
              "onSongleWidgetReady",
            e.apiReloadCallbackName =
              s("api-reload-callback-name", e) ||
              e.apiReloadCallbackName ||
              "onSongleWidgetReload",
            e.apiRemoveCallbackName =
              s("api-remove-callback-name", e) ||
              e.apiRemoveCallbackName ||
              "onSongleWidgetRemove",
            e.apiBeatAutoReload =
              s("api-beat-auto-reload", e) || e.apiBeatAutoReload,
            e.apiChordAutoReload =
              s("api-chord-auto-reload", e) || e.apiChordAutoReload,
            e.apiMelodyAutoReload =
              s("api-melody-auto-reload", e) || e.apiMelodyAutoReload,
            e.apiChorusAutoReload =
              s("api-chorus-auto-reload", e) || e.apiChorusAutoReload,
            e.apiBeatDisabled =
              s("api-beat-disabled", e) || e.apiBeatDisabled,
            e.apiChordDisabled =
              s("api-chord-disabled", e) || e.apiChordDisabled,
            e.apiMelodyDisabled =
              s("api-melody-disabled", e) || e.apiMelodyDisabled,
            e.apiChorusDisabled =
              s("api-chorus-disabled", e) || e.apiChorusDisabled,
            e.apiBeatRevision =
              s("api-beat-revision", e) || e.apiBeatRevision,
            e.apiChordRevision =
              s("api-chord-revision", e) || e.apiChordRevision,
            e.apiMelodyRevision =
              s("api-melody-revision", e) || e.apiMelodyRevision,
            e.apiChorusRevision =
              s("api-chorus-revision", e) || e.apiChorusRevision,
            e.songAutoLoad = s("song-auto-load", e) || e.songAutoLoad,
            e.songAutoPlay = s("song-auto-play", e) || e.songAutoPlay,
            e.songAutoPlayRetryCount =
              s("song-auto-play-retry-count", e) || e.songAutoPlayRetryCount,
            e.songAutoPlayTimeout =
              s("song-auto-play-timeout", e) || e.songAutoPlayTimeout,
            e.songAutoLoop = s("song-auto-loop", e) || e.songAutoLoop,
            e.songAutoLoopRetryCount =
              s("song-auto-loop-retry-count", e) || e.songAutoLoopRetryCount,
            e.songAutoLoopTimeout =
              s("song-auto-loop-timeout", e) || e.songAutoLoopTimeout,
            e.songAutoRegistration =
              s("song-auto-registration", e) || e.songAutoRegistration,
            e.songStartAt = s("song-start-at", e) || e.songStartAt,
            e.songStartAtRetryCount =
              s("song-start-at-retry-count", e) || e.songStartAtRetryCount,
            e.songStartAtTimeout =
              s("song-start-at-timeout", e) || e.songStartAtTimeout,
            e.songVolume = s("song-volume", e) || e.songVolume,
            e.songleWidgetCtrl =
              s("songle-widget-ctrl", e) || e.songleWidgetCtrl,
            e.songleWidgetCtrlEnterColor =
              s("songle-widget-ctrl-enter-color", e) ||
              e.songleWidgetCtrlEnterColor,
            e.songleWidgetCtrlLeaveColor =
              s("songle-widget-ctrl-leave-color", e) ||
              e.songleWidgetCtrlLeaveColor,
            e.songleWidgetLinkColor =
              s("songle-widget-link-color", e) || e.songleWidgetLinkColor,
            e.songleWidgetLinkCopyrightPadding =
              s("songle-widget-link-copyright-padding", e) ||
              e.songleWidgetLinkCopyrightPadding,
            e.songleWidgetLinkSongscenePadding =
              s("songle-widget-link-songscene-padding", e) ||
              e.songleWidgetLinkSongscenePadding,
            e.songleWidgetSizeW =
              s("songle-widget-size-w", e) || e.songleWidgetSizeW,
            e.songleWidgetSizeH =
              s("songle-widget-size-h", e) || e.songleWidgetSizeH,
            e.videoPlayerSizeW =
              s("video-player-size-w", e) || e.videoPlayerSizeW,
            e.videoPlayerSizeH =
              s("video-player-size-h", e) || e.videoPlayerSizeH,
            e.nnAutoLoad = s("nn-auto-load", e) || e.nnAutoLoad,
            e.nnAutoPlay = s("nn-auto-play", e) || e.nnAutoPlay,
            e.nnComment = s("nn-comment", e) || e.nnComment,
            e.nnCtrl = s("nn-ctrl", e) || e.nnCtrl,
            e.nnHtml5 = s("nn-html5", e) || e.nnHtml5,
            e.nnLink = s("nn-link", e) || e.nnLink,
            e.nnNewTab = s("nn-new-tab", e) || e.nnNewTab,
            e.nnTransparent = s("nn-transparent", e) || e.nnTransparent,
            e.ytCtrl = s("yt-ctrl", e) || e.ytCtrl,
            e.ytInfo = s("yt-info", e) || e.ytInfo,
            e.ytQuality = s("yt-quality", e) || e.ytQuality,
            e.standalone = s("standalone", e) || e.standalone,
            e.standaloneMp3Path =
              s("standalone-mp3-path", e) || e.standaloneMp3Path,
            e.standaloneSongJsonPath =
              s("standalone-song-json-path", e) || e.standaloneSongJsonPath,
            e.standaloneSongBeatJsonPath =
              s("standalone-song-beat-json-path", e) ||
              e.standaloneSongBeatJsonPath,
            e.standaloneSongChordJsonPath =
              s("standalone-song-chord-json-path", e) ||
              e.standaloneSongChordJsonPath,
            e.standaloneSongMelodyJsonPath =
              s("standalone-song-melody-json-path", e) ||
              e.standaloneSongMelodyJsonPath,
            e.standaloneSongChorusJsonPath =
              s("standalone-song-chorus-json-path", e) ||
              e.standaloneSongChorusJsonPath,
            e.wsProxyID = s("ws-proxy-id", e) || e.wsProxyID,
            e.wsProxyMode = s("ws-proxy-mode", e) || e.wsProxyMode,
            i = document.createElement("div"),
            i.id = "songle-widget",
            void 0 !== e.api && i.setAttribute("data-api", e.api),
            void 0 !== e.url && i.setAttribute("data-url", e.url),
            void 0 !== e.endpoint &&
              i.setAttribute("data-endpoint", e.endpoint),
            void 0 !== e.apiCreateCallbackName &&
              (void 0 !== e.onCreate &&
                (e.apiCreateCallbackName += "_" + __songle__.random()),
              i.setAttribute(
                "data-api-create-callback-name",
                e.apiCreateCallbackName
              )),
            void 0 !== e.apiErrorCallbackName &&
              (void 0 !== e.onError &&
                (e.apiErrorCallbackName += "_" + __songle__.random()),
              i.setAttribute(
                "data-api-error-callback-name",
                e.apiErrorCallbackName
              )),
            void 0 !== e.apiReadyCallbackName &&
              (void 0 !== e.onReady &&
                (e.apiReadyCallbackName += "_" + __songle__.random()),
              i.setAttribute(
                "data-api-ready-callback-name",
                e.apiReadyCallbackName
              )),
            void 0 !== e.apiReloadCallbackName &&
              (void 0 !== e.onReload &&
                (e.apiReloadCallbackName += "_" + __songle__.random()),
              i.setAttribute(
                "data-api-reload-callback-name",
                e.apiReloadCallbackName
              )),
            void 0 !== e.apiRemoveCallbackName &&
              (void 0 !== e.onRemove &&
                (e.apiRemoveCallbackName += "_" + __songle__.random()),
              i.setAttribute(
                "data-api-remove-callback-name",
                e.apiRemoveCallbackName
              )),
            void 0 !== e.apiBeatAutoReload &&
              i.setAttribute("data-api-beat-auto-reload", e.apiBeatAutoReload),
            void 0 !== e.apiChordAutoReload &&
              i.setAttribute(
                "data-api-chord-auto-reload",
                e.apiChordAutoReload
              ),
            void 0 !== e.apiMelodyAutoReload &&
              i.setAttribute(
                "data-api-melody-auto-reload",
                e.apiMelodyAutoReload
              ),
            void 0 !== e.apiChorusAutoReload &&
              i.setAttribute(
                "data-api-chorus-auto-reload",
                e.apiChorusAutoReload
              ),
            void 0 !== e.apiBeatDisabled &&
              i.setAttribute("data-api-beat-disabled", e.apiBeatDisabled),
            void 0 !== e.apiChordDisabled &&
              i.setAttribute("data-api-chord-disabled", e.apiChordDisabled),
            void 0 !== e.apiMelodyDisabled &&
              i.setAttribute("data-api-melody-disabled", e.apiMelodyDisabled),
            void 0 !== e.apiChorusDisabled &&
              i.setAttribute("data-api-chorus-disabled", e.apiChorusDisabled),
            void 0 !== e.apiBeatRevision &&
              i.setAttribute("data-api-beat-revision", e.apiBeatRevision),
            void 0 !== e.apiChordRevision &&
              i.setAttribute("data-api-chord-revision", e.apiChordRevision),
            void 0 !== e.apiMelodyRevision &&
              i.setAttribute("data-api-melody-revision", e.apiMelodyRevision),
            void 0 !== e.apiChorusRevision &&
              i.setAttribute("data-api-chorus-revision", e.apiChorusRevision),
            void 0 !== e.songAutoLoad &&
              i.setAttribute("data-song-auto-load", e.songAutoLoad),
            void 0 !== e.songAutoPlay &&
              i.setAttribute("data-song-auto-play", e.songAutoPlay),
            void 0 !== e.songAutoPlayRetryCount &&
              i.setAttribute(
                "data-song-auto-play-retry-count",
                e.songAutoPlayRetryCount
              ),
            void 0 !== e.songAutoPlayTimeout &&
              i.setAttribute(
                "data-song-auto-play-timeout",
                e.songAutoPlayTimeout
              ),
            void 0 !== e.songAutoLoop &&
              i.setAttribute("data-song-auto-loop", e.songAutoLoop),
            void 0 !== e.songAutoLoopRetryCount &&
              i.setAttribute(
                "data-song-auto-loop-retry-count",
                e.songAutoLoopRetryCount
              ),
            void 0 !== e.songAutoLoopTimeout &&
              i.setAttribute(
                "data-song-auto-loop-timeout",
                e.songAutoLoopTimeout
              ),
            void 0 !== e.songAutoRegistration &&
              i.setAttribute(
                "data-song-auto-registration",
                e.songAutoRegistration
              ),
            void 0 !== e.songStartAt &&
              i.setAttribute("data-song-start-at", e.songStartAt),
            void 0 !== e.songStartAtRetryCount &&
              i.setAttribute(
                "data-song-start-at-retry-count",
                e.songStartAtRetryCount
              ),
            void 0 !== e.songStartAtTimeout &&
              i.setAttribute(
                "data-song-start-at-timeout",
                e.songStartAtTimeout
              ),
            void 0 !== e.songVolume &&
              i.setAttribute("data-song-volume", e.songVolume),
            void 0 !== e.songleWidgetCtrl &&
              i.setAttribute("data-songle-widget-ctrl", e.songleWidgetCtrl),
            void 0 !== e.songleWidgetCtrlEnterColor &&
              i.setAttribute(
                "data-songle-widget-ctrl-enter-color",
                e.songleWidgetCtrlEnterColor
              ),
            void 0 !== e.songleWidgetCtrlLeaveColor &&
              i.setAttribute(
                "data-songle-widget-ctrl-leave-color",
                e.songleWidgetCtrlLeaveColor
              ),
            void 0 !== e.songleWidgetLinkColor &&
              i.setAttribute(
                "data-songle-widget-link-color",
                e.songleWidgetLinkColor
              ),
            void 0 !== e.songleWidgetCopyrightLinkPadding &&
              i.setAttribute(
                "data-songle-widget-copyright-link-padding",
                e.songleWidgetCopyrightLinkPadding
              ),
            void 0 !== e.songleWidgetSongsceneLinkPadding &&
              i.setAttribute(
                "data-songle-widget-songscene-link-padding",
                e.songleWidgetSongsceneLinkPadding
              ),
            void 0 !== e.songleWidgetSizeW &&
              i.setAttribute("data-songle-widget-size-w", e.songleWidgetSizeW),
            void 0 !== e.songleWidgetSizeH &&
              i.setAttribute("data-songle-widget-size-h", e.songleWidgetSizeH),
            void 0 !== e.videoPlayerSizeW &&
              i.setAttribute("data-video-player-size-w", e.videoPlayerSizeW),
            void 0 !== e.videoPlayerSizeH &&
              i.setAttribute("data-video-player-size-h", e.videoPlayerSizeH),
            void 0 !== e.nnComment &&
              i.setAttribute("data-nn-comment", e.nnComment),
            void 0 !== e.nnCtrl && i.setAttribute("data-nn-ctrl", e.nnCtrl),
            void 0 !== e.nnHtml5 && i.setAttribute("data-nn-html5", e.nnHtml5),
            void 0 !== e.nnLink && i.setAttribute("data-nn-link", e.nnLink),
            void 0 !== e.nnNewTab &&
              i.setAttribute("data-nn-new-tab", e.nnNewTab),
            void 0 !== e.nnTransparent &&
              i.setAttribute("data-nn-transparent", e.nnTransparent),
            void 0 !== e.ytCtrl && i.setAttribute("data-yt-ctrl", e.ytCtrl),
            void 0 !== e.ytInfo && i.setAttribute("data-yt-info", e.ytInfo),
            void 0 !== e.ytQuality &&
              i.setAttribute("data-yt-quality", e.ytQuality),
            void 0 !== e.standalone &&
              i.setAttribute("data-standalone", e.standalone),
            void 0 !== e.standaloneMp3Path &&
              i.setAttribute("data-standalone-mp3-path", e.standaloneMp3Path),
            void 0 !== e.standaloneSongJsonPath &&
              i.setAttribute(
                "data-standalone-song-json-path",
                e.standaloneSongJsonPath
              ),
            void 0 !== e.standaloneSongBeatJsonPath &&
              i.setAttribute(
                "data-standalone-song-beat-json-path",
                e.standaloneSongBeatJsonPath
              ),
            void 0 !== e.standaloneSongChordJsonPath &&
              i.setAttribute(
                "data-standalone-song-chord-json-path",
                e.standaloneSongChordJsonPath
              ),
            void 0 !== e.standaloneSongMelodyJsonPath &&
              i.setAttribute(
                "data-standalone-song-melody-json-path",
                e.standaloneSongMelodyJsonPath
              ),
            void 0 !== e.standaloneSongChorusJsonPath &&
              i.setAttribute(
                "data-standalone-song-chorus-json-path",
                e.standaloneSongChorusJsonPath
              ),
            void 0 !== e.wsProxyID &&
              i.setAttribute("data-ws-proxy-id", e.wsProxyID),
            void 0 !== e.wsProxyMode &&
              i.setAttribute("data-ws-proxy-mode", e.wsProxyMode),
            void 0 !== e.onCreate &&
              (t[e.apiCreateCallbackName] = function (t, i) {
                if (t === e.api) {return e.onCreate(i);}
              }),
            void 0 !== e.onError &&
              (t[e.apiErrorCallbackName] = function (t, i) {
                if (t === e.api) {return e.onError(i);}
              }),
            void 0 !== e.onReady &&
              (t[e.apiReadyCallbackName] = function (t, i) {
                if (t === e.api) {return e.onReady(i);}
              }),
            void 0 !== e.onReload &&
              (t[e.apiReloadCallbackName] = function (t, i) {
                if (t === e.api) {return e.onReload(i);}
              }),
            void 0 !== e.onRemove &&
              (t[e.apiRemoveCallbackName] = function (t, i) {
                if (t === e.api) {return e.onRemove(i);}
              }),
            i
          );
        },
        s = function (e, t) {
          return (
            t == null && (t = {}),
            t.queryNamePrefix == null && (t.queryNamePrefix = ""),
            t.queryNameSuffix == null && (t.queryNameSuffix = ""),
            __songle__.searchQueries[
              "" + t.queryNamePrefix + e + t.queryNameSuffix
            ]
          );
        },
        e.call(t, "process") >= 0 && (module.exports = i),
        t.SongleWidgetAPI = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.SongleWidgetAPI || {},
        i.findSongleWidgets = __songle__.findSongleWidgets,
        i.findSongleWidgetsByAPI = __songle__.findSongleWidgetsByAPI,
        i.findSongleWidgetsByURL = __songle__.findSongleWidgetsByURL,
        i.findSongleWidgetsByMode = __songle__.findSongleWidgetsByMode,
        i.findSongleWidgetsByUUID = __songle__.findSongleWidgetsByUUID,
        i.findSongleWidgetsByVideoID = __songle__.findSongleWidgetsByVideoID,
        e.call(t, "process") >= 0 && (module.exports = i),
        t.SongleWidgetAPI = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.SongleWidgetAPI || {},
        i.millisecondsToSeconds = __songle__.millisecondsToSeconds,
        i.millisecondsToMinutes = __songle__.millisecondsToMinutes,
        i.secondsToMilliseconds = __songle__.secondsToMilliseconds,
        i.minutesToMilliseconds = __songle__.minutesToMilliseconds,
        e.call(t, "process") >= 0 && (module.exports = i),
        t.SongleWidgetAPI = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {
    const e =
      [].indexOf ||
      function (e) {
        for (let t = 0, i = this.length; t < i; t++)
          {if (t in this && this[t] === e) {return t;}}
        return -1;
      };
    !(function (t) {
      "use strict";
      let i;
      return (
        i = t.SongleWidgetAPI || {},
        Object.defineProperties(i, {
          version: {
            configurable: !0,
            get: function () {
              return __songle__.version;
            },
          },
        }),
        e.call(t, "process") >= 0 && (module.exports = i),
        t.SongleWidgetAPI = i
      );
    })((this || 0).self || global);
  }.call(this),
  function () {}.call(this));
