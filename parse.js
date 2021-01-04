(function i(t) {
	function e(i) {
		if (r[i]) return r[i].exports;
		var n = r[i] = {
			i: i,
			l: !1,
			exports: {}
		};
		return t[i].call(n.exports, n, n.exports, e),
		n.l = !0,
		n.exports
	}
	var r = {};
	e.m = t,
	e.c = r,
	e.i = function(t) {
		return t
	},
	e.d = function(t, r, i) {
		e.o(t, r) || Object.defineProperty(t, r, {
			configurable: !1,
			enumerable: !0,
			get: i
		})
	},
	e.n = function(t) {
		var r = t && t.__esModule ?
		function() {
			return t.
		default
		}:
		function() {
			return t
		};
		return e.d(r, "a", r),
		r
	},
	e.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	},
	e.p = "/",
	e.oe = function(t) {
		throw console.error(t),
		t
	};
	var i = e(e.s = 47);
	return i.
default || i
})({
	47 : function(t, e, r) {
		"use strict";
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var i = r(19),
		n = r(1),
		a = r(0),
		o = r(10),
		s = r.n(o),
		l = function(t) {
			var e = new s.a;
			e.trigger = function(t) {
				for (var r = arguments.length,
				i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
				e.emit.apply(e, [t, t].concat(i))
			},
			e.off = function(t) {
				for (var r = arguments.length,
				i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
				e.removeListener.apply(e, [t].concat(i))
			};
			var r = function(e, r) {
				t.postMessage({
					event: e,
					data: r
				})
			};
			t.addEventListener("message",
			function(n) {
				var o = n.data;
				switch (o.cmd) {
				case "init":
					var s = JSON.parse(o.config);
					t.demuxer = new i.a(e, o.typeSupported, s, o.vendor);
					try {
						Object(a.a)(!0 === s.debug)
					} catch(t) {
						console.warn("demuxerWorker: unable to enable logs")
					}
					r("init", null);
					break;
				case "demux":
					t.demuxer.push(o.data, o.decryptdata, o.initSegment, o.audioCodec, o.videoCodec, o.timeOffset, o.discontinuity, o.trackSwitch, o.contiguous, o.duration, o.accurateTimeOffset, o.defaultInitPTS)
				}
			}),
			e.on(n.a.FRAG_DECRYPTED, r),
			e.on(n.a.FRAG_PARSING_INIT_SEGMENT, r),
			e.on(n.a.FRAG_PARSED, r),
			e.on(n.a.ERROR, r),
			e.on(n.a.FRAG_PARSING_METADATA, r),
			e.on(n.a.FRAG_PARSING_USERDATA, r),
			e.on(n.a.INIT_PTS_FOUND, r),
			e.on(n.a.FRAG_PARSING_DATA,
			function(e, r) {
				var i = [],
				n = {
					event: e,
					data: r
				};
				r.data1 && (n.data1 = r.data1.buffer, i.push(r.data1.buffer), delete r.data1),
				r.data2 && (n.data2 = r.data2.buffer, i.push(r.data2.buffer), delete r.data2),
				t.postMessage(n, i)
			})
		};
		e.
	default = l
	},
	"10": function(t, e) {
		function r() {
			this._events = this._events || {},
			this._maxListeners = this._maxListeners || void 0
		}
		function i(t) {
			return "function" == typeof t
		}
		function n(t) {
			return "number" == typeof t
		}
		function a(t) {
			return "object" == typeof t && null !== t
		}
		function o(t) {
			return void 0 === t
		}
		t.exports = r,
		r.EventEmitter = r,
		r.prototype._events = void 0,
		r.prototype._maxListeners = void 0,
		r.defaultMaxListeners = 10,
		r.prototype.setMaxListeners = function(t) {
			if (!n(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
			return this._maxListeners = t,
			this
		},
		r.prototype.emit = function(t) {
			var e, r, n, s, l, u;
			if (this._events || (this._events = {}), "error" === t && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
				if ((e = arguments[1]) instanceof Error) throw e;
				var d = new Error('Uncaught, unspecified "error" event. (' + e + ")");
				throw d.context = e,
				d
			}
			if (r = this._events[t], o(r)) return ! 1;
			if (i(r)) switch (arguments.length) {
			case 1:
				r.call(this);
				break;
			case 2:
				r.call(this, arguments[1]);
				break;
			case 3:
				r.call(this, arguments[1], arguments[2]);
				break;
			default:
				s = Array.prototype.slice.call(arguments, 1),
				r.apply(this, s)
			} else if (a(r)) for (s = Array.prototype.slice.call(arguments, 1), u = r.slice(), n = u.length, l = 0; l < n; l++) u[l].apply(this, s);
			return ! 0
		},
		r.prototype.addListener = function(t, e) {
			var n;
			if (!i(e)) throw TypeError("listener must be a function");
			return this._events || (this._events = {}),
			this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener: e),
			this._events[t] ? a(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e,
			a(this._events[t]) && !this._events[t].warned && (n = o(this._maxListeners) ? r.defaultMaxListeners: this._maxListeners) && n > 0 && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()),
			this
		},
		r.prototype.on = r.prototype.addListener,
		r.prototype.once = function(t, e) {
			function r() {
				this.removeListener(t, r),
				n || (n = !0, e.apply(this, arguments))
			}
			if (!i(e)) throw TypeError("listener must be a function");
			var n = !1;
			return r.listener = e,
			this.on(t, r),
			this
		},
		r.prototype.removeListener = function(t, e) {
			var r, n, o, s;
			if (!i(e)) throw TypeError("listener must be a function");
			if (!this._events || !this._events[t]) return this;
			if (r = this._events[t], o = r.length, n = -1, r === e || i(r.listener) && r.listener === e) delete this._events[t],
			this._events.removeListener && this.emit("removeListener", t, e);
			else if (a(r)) {
				for (s = o; s-->0;) if (r[s] === e || r[s].listener && r[s].listener === e) {
					n = s;
					break
				}
				if (n < 0) return this;
				1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(n, 1),
				this._events.removeListener && this.emit("removeListener", t, e)
			}
			return this
		},
		r.prototype.removeAllListeners = function(t) {
			var e, r;
			if (!this._events) return this;
			if (!this._events.removeListener) return 0 === arguments.length ? this._events = {}: this._events[t] && delete this._events[t],
			this;
			if (0 === arguments.length) {
				for (e in this._events)"removeListener" !== e && this.removeAllListeners(e);
				return this.removeAllListeners("removeListener"),
				this._events = {},
				this
			}
			if (r = this._events[t], i(r)) this.removeListener(t, r);
			else if (r) for (; r.length;) this.removeListener(t, r[r.length - 1]);
			return delete this._events[t],
			this
		},
		r.prototype.listeners = function(t) {
			return this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
		},
		r.prototype.listenerCount = function(t) {
			if (this._events) {
				var e = this._events[t];
				if (i(e)) return 1;
				if (e) return e.length
			}
			return 0
		},
		r.listenerCount = function(t, e) {
			return t.listenerCount(e)
		}
	},
	"0": function(t, e, r) {
		"use strict";
		function i() {}
		function n(t, e) {
			return e = "[" + t + "] > " + e
		}
		function a(t) {
			var e = self.console[t];
			return e ?
			function() {
				for (var r = arguments.length,
				i = Array(r), a = 0; a < r; a++) i[a] = arguments[a];
				i[0] && (i[0] = n(t, i[0])),
				e.apply(self.console, i)
			}: i
		}
		function o(t) {
			for (var e = arguments.length,
			r = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
			r.forEach(function(e) {
				u[e] = t[e] ? t[e].bind(t) : a(e)
			})
		}
		r.d(e, "a",
		function() {
			return d
		}),
		r.d(e, "b",
		function() {
			return c
		});
		var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(t) {
			return typeof t
		}: function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
		},
		l = {
			trace: i,
			debug: i,
			log: i,
			warn: i,
			info: i,
			error: i
		},
		u = l,
		d = function(t) {
			if (!0 === t || "object" === (void 0 === t ? "undefined": s(t))) {
				o(t, "debug", "log", "info", "warn", "error");
				try {
					u.log()
				} catch(t) {
					u = l
				}
			} else u = l
		},
		c = u
	},
	"1": function(t, e, r) {
		"use strict";
		var i = {
			MEDIA_ATTACHING: "hlsMediaAttaching",
			MEDIA_ATTACHED: "hlsMediaAttached",
			MEDIA_DETACHING: "hlsMediaDetaching",
			MEDIA_DETACHED: "hlsMediaDetached",
			BUFFER_RESET: "hlsBufferReset",
			BUFFER_CODECS: "hlsBufferCodecs",
			BUFFER_CREATED: "hlsBufferCreated",
			BUFFER_APPENDING: "hlsBufferAppending",
			BUFFER_APPENDED: "hlsBufferAppended",
			BUFFER_EOS: "hlsBufferEos",
			BUFFER_FLUSHING: "hlsBufferFlushing",
			BUFFER_FLUSHED: "hlsBufferFlushed",
			MANIFEST_LOADING: "hlsManifestLoading",
			MANIFEST_LOADED: "hlsManifestLoaded",
			MANIFEST_PARSED: "hlsManifestParsed",
			LEVEL_SWITCHING: "hlsLevelSwitching",
			LEVEL_SWITCHED: "hlsLevelSwitched",
			LEVEL_LOADING: "hlsLevelLoading",
			LEVEL_LOADED: "hlsLevelLoaded",
			LEVEL_UPDATED: "hlsLevelUpdated",
			LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
			AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
			AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
			AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
			AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
			AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
			SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
			SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
			SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
			SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
			SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
			INIT_PTS_FOUND: "hlsInitPtsFound",
			FRAG_LOADING: "hlsFragLoading",
			FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
			FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
			FRAG_LOADED: "hlsFragLoaded",
			FRAG_DECRYPTED: "hlsFragDecrypted",
			FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
			FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
			FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
			FRAG_PARSING_DATA: "hlsFragParsingData",
			FRAG_PARSED: "hlsFragParsed",
			FRAG_BUFFERED: "hlsFragBuffered",
			FRAG_CHANGED: "hlsFragChanged",
			FPS_DROP: "hlsFpsDrop",
			FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
			ERROR: "hlsError",
			DESTROYING: "hlsDestroying",
			KEY_LOADING: "hlsKeyLoading",
			KEY_LOADED: "hlsKeyLoaded",
			STREAM_STATE_TRANSITION: "hlsStreamStateTransition"
		};
		e.a = i
	},
	"19": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(1),
		a = r(2),
		o = r(11),
		s = r(37),
		l = r(15),
		u = r(38),
		d = r(42),
		c = r(43),
		h = r(46),
		f = function() {
			function t(e, r, n, a) {
				i(this, t),
				this.observer = e,
				this.typeSupported = r,
				this.config = n,
				this.vendor = a
			}
			return t.prototype.destroy = function() {
				var t = this.demuxer;
				t && t.destroy()
			},
			t.prototype.push = function(t, e, r, i, a, s, l, u, d, c, h, f) {
				if (t.byteLength > 0 && null != e && null != e.key && "AES-128" === e.method) {
					var p = this.decrypter;
					null == p && (p = this.decrypter = new o.a(this.observer, this.config));
					var v = this,
					g = void 0;
					try {
						g = performance.now()
					} catch(t) {
						g = Date.now()
					}
					p.decrypt(t, e.key.buffer, e.iv.buffer,
					function(t) {
						var o = void 0;
						try {
							o = performance.now()
						} catch(t) {
							o = Date.now()
						}
						v.observer.trigger(n.a.FRAG_DECRYPTED, {
							stats: {
								tstart: g,
								tdecrypt: o
							}
						}),
						v.pushDecrypted(new Uint8Array(t), e, new Uint8Array(r), i, a, s, l, u, d, c, h, f)
					})
				} else this.pushDecrypted(new Uint8Array(t), e, new Uint8Array(r), i, a, s, l, u, d, c, h, f)
			},
			t.prototype.pushDecrypted = function(t, e, r, i, o, f, p, v, g, y, m, b) {
				var E = this.demuxer;
				if (!E || (p || v) && !this.probe(t)) {
					for (var T = this.observer,
					S = this.typeSupported,
					_ = this.config,
					A = [{
						demux: u.a,
						remux: c.a
					},
					{
						demux: l.a,
						remux: h.a
					},
					{
						demux: s.a,
						remux: c.a
					},
					{
						demux: d.a,
						remux: c.a
					}], R = 0, w = A.length; R < w; R++) {
						var L = A[R],
						D = L.demux.probe;
						if (D(t)) {
							var I = this.remuxer = new L.remux(T, _, S, this.vendor);
							E = new L.demux(T, I, _, S),
							this.probe = D;
							break
						}
					}
					if (!E) return void T.trigger(n.a.ERROR, {
						type: a.b.MEDIA_ERROR,
						details: a.a.FRAG_PARSING_ERROR,
						fatal: !0,
						reason: "no demux matching with content found"
					});
					this.demuxer = E
				}
				var k = this.remuxer; (p || v) && (E.resetInitSegment(r, i, o, y), k.resetInitSegment()),
				p && (E.resetTimeStamp(b), k.resetTimeStamp(b)),
				"function" == typeof E.setDecryptData && E.setDecryptData(e),
				E.append(t, f, g, m)
			},
			t
		} ();
		e.a = f
	},
	"46": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(1),
		a = function() {
			function t(e) {
				i(this, t),
				this.observer = e
			}
			return t.prototype.destroy = function() {},
			t.prototype.resetTimeStamp = function() {},
			t.prototype.resetInitSegment = function() {},
			t.prototype.remux = function(t, e, r, i, a, o, s, l) {
				var u = this.observer,
				d = "";
				t && (d += "audio"),
				e && (d += "video"),
				u.trigger(n.a.FRAG_PARSING_DATA, {
					data1: l,
					startPTS: a,
					startDTS: a,
					type: d,
					hasAudio: !!t,
					hasVideo: !!e,
					nb: 1,
					dropped: 0
				}),
				u.trigger(n.a.FRAG_PARSED)
			},
			t
		} ();
		e.a = a
	},
	"43": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(44),
		a = r(45),
		o = r(1),
		s = r(2),
		l = r(0),
		u = function() {
			function t(e, r, n, a) {
				i(this, t),
				this.observer = e,
				this.config = r,
				this.typeSupported = n;
				var o = navigator.userAgent;
				this.isSafari = a && a.indexOf("Apple") > -1 && o && !o.match("CriOS"),
				this.ISGenerated = !1
			}
			return t.prototype.destroy = function() {},
			t.prototype.resetTimeStamp = function(t) {
				this._initPTS = this._initDTS = t
			},
			t.prototype.resetInitSegment = function() {
				this.ISGenerated = !1
			},
			t.prototype.remux = function(t, e, r, i, n, a, s) {
				if (this.ISGenerated || this.generateIS(t, e, n), this.ISGenerated) {
					var u = t.samples.length,
					d = e.samples.length,
					c = n,
					h = n;
					if (u && d) {
						var f = (t.samples[0].dts - e.samples[0].dts) / e.inputTimeScale;
						c += Math.max(0, f),
						h += Math.max(0, -f)
					}
					if (u) {
						t.timescale || (l.b.warn("regenerate InitSegment as audio detected"), this.generateIS(t, e, n));
						var p = this.remuxAudio(t, c, a, s);
						if (d) {
							var v = void 0;
							p && (v = p.endPTS - p.startPTS),
							e.timescale || (l.b.warn("regenerate InitSegment as video detected"), this.generateIS(t, e, n)),
							this.remuxVideo(e, h, a, v, s)
						}
					} else if (d) {
						var g = this.remuxVideo(e, h, a, 0, s);
						g && t.codec && this.remuxEmptyAudio(t, c, a, g)
					}
				}
				r.samples.length && this.remuxID3(r, n),
				i.samples.length && this.remuxText(i, n),
				this.observer.trigger(o.a.FRAG_PARSED)
			},
			t.prototype.generateIS = function(t, e, r) {
				var i = this.observer,
				n = t.samples,
				u = e.samples,
				d = this.typeSupported,
				c = "audio/mp4",
				h = {},
				f = {
					tracks: h
				},
				p = void 0 === this._initPTS,
				v = void 0,
				g = void 0;
				if (p && (v = g = 1 / 0), t.config && n.length && (t.timescale = t.samplerate, l.b.log("audio sampling rate : " + t.samplerate), t.isAAC || (d.mpeg ? (c = "audio/mpeg", t.codec = "") : d.mp3 && (t.codec = "mp3")), h.audio = {
					container: c,
					codec: t.codec,
					initSegment: !t.isAAC && d.mpeg ? new Uint8Array: a.a.initSegment([t]),
					metadata: {
						channelCount: t.channelCount
					}
				},
				p && (v = g = n[0].pts - t.inputTimeScale * r)), e.sps && e.pps && u.length) {
					var y = e.inputTimeScale;
					e.timescale = y,
					h.video = {
						container: "video/mp4",
						codec: e.codec,
						initSegment: a.a.initSegment([e]),
						metadata: {
							width: e.width,
							height: e.height
						}
					},
					p && (v = Math.min(v, u[0].pts - y * r), g = Math.min(g, u[0].dts - y * r), this.observer.trigger(o.a.INIT_PTS_FOUND, {
						initPTS: v
					}))
				}
				Object.keys(h).length ? (i.trigger(o.a.FRAG_PARSING_INIT_SEGMENT, f), this.ISGenerated = !0, p && (this._initPTS = v, this._initDTS = g)) : i.trigger(o.a.ERROR, {
					type: s.b.MEDIA_ERROR,
					details: s.a.FRAG_PARSING_ERROR,
					fatal: !1,
					reason: "no audio/video samples found"
				})
			},
			t.prototype.remuxVideo = function(t, e, r, i, n) {
				var u = 8,
				d = t.timescale,
				c = void 0,
				h = void 0,
				f = void 0,
				p = void 0,
				v = void 0,
				g = void 0,
				y = void 0,
				m = t.samples,
				b = [],
				E = m.length,
				T = this._PTSNormalize,
				S = this._initDTS,
				_ = this.nextAvcDts,
				A = this.isSafari;
				if (0 !== E) {
					A && (r |= m.length && _ && (n && Math.abs(e - _ / d) < .1 || Math.abs(m[0].pts - _ - S) < d / 5)),
					r || (_ = e * d),
					m.forEach(function(t) {
						t.pts = T(t.pts - S, _),
						t.dts = T(t.dts - S, _)
					}),
					m.sort(function(t, e) {
						var r = t.dts - e.dts,
						i = t.pts - e.pts;
						return r || i || t.id - e.id
					});
					var R = m.reduce(function(t, e) {
						return Math.max(Math.min(t, e.pts - e.dts), -18e3)
					},
					0);
					if (R < 0) {
						l.b.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(R / 90) + " ms to overcome this issue");
						for (var w = 0; w < m.length; w++) m[w].dts += R
					}
					var L = m[0];
					v = Math.max(L.dts, 0),
					p = Math.max(L.pts, 0);
					var D = Math.round((v - _) / 90);
					r && D && (D > 1 ? l.b.log("AVC:" + D + " ms hole between fragments detected,filling it") : D < -1 && l.b.log("AVC:" + -D + " ms overlapping between fragments detected"), v = _, m[0].dts = v, p = Math.max(p - D, _), m[0].pts = p, l.b.log("Video/PTS/DTS adjusted: " + Math.round(p / 90) + "/" + Math.round(v / 90) + ",delta:" + D + " ms")),
					v,
					L = m[m.length - 1],
					y = Math.max(L.dts, 0),
					g = Math.max(L.pts, 0, y),
					A && (c = Math.round((y - v) / (m.length - 1)));
					for (var I = 0,
					k = 0,
					O = 0; O < E; O++) {
						for (var C = m[O], P = C.units, x = P.length, F = 0, N = 0; N < x; N++) F += P[N].data.length;
						k += F,
						I += x,
						C.length = F,
						C.dts = A ? v + O * c: Math.max(C.dts, v),
						C.pts = Math.max(C.pts, C.dts)
					}
					var M = k + 4 * I + 8;
					try {
						h = new Uint8Array(M)
					} catch(t) {
						return void this.observer.trigger(o.a.ERROR, {
							type: s.b.MUX_ERROR,
							details: s.a.REMUX_ALLOC_ERROR,
							fatal: !1,
							bytes: M,
							reason: "fail allocating video mdat " + M
						})
					}
					var U = new DataView(h.buffer);
					U.setUint32(0, M),
					h.set(a.a.types.mdat, 4);
					for (var B = 0; B < E; B++) {
						for (var G = m[B], K = G.units, j = 0, H = void 0, V = 0, Y = K.length; V < Y; V++) {
							var W = K[V],
							z = W.data,
							q = W.data.byteLength;
							U.setUint32(u, q),
							u += 4,
							h.set(z, u),
							u += q,
							j += 4 + q
						}
						if (A) H = Math.max(0, c * Math.round((G.pts - G.dts) / c));
						else {
							if (B < E - 1) c = m[B + 1].dts - G.dts;
							else {
								var X = this.config,
								Q = G.dts - m[B > 0 ? B - 1 : B].dts;
								if (X.stretchShortVideoTrack) {
									var $ = X.maxBufferHole,
									J = Math.floor($ * d),
									Z = (i ? p + i * d: this.nextAudioPts) - G.pts;
									Z > J ? (c = Z - Q, c < 0 && (c = Q), l.b.log("It is approximately " + Z / 90 + " ms to the next segment; using duration " + c / 90 + " ms for the last video frame.")) : c = Q
								} else c = Q
							}
							H = Math.round(G.pts - G.dts)
						}
						b.push({
							size: j,
							duration: c,
							cts: H,
							flags: {
								isLeading: 0,
								isDependedOn: 0,
								hasRedundancy: 0,
								degradPrio: 0,
								dependsOn: G.key ? 2 : 1,
								isNonSync: G.key ? 0 : 1
							}
						})
					}
					this.nextAvcDts = y + c;
					var tt = t.dropped;
					if (t.len = 0, t.nbNalu = 0, t.dropped = 0, b.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
						var et = b[0].flags;
						et.dependsOn = 2,
						et.isNonSync = 0
					}
					t.samples = b,
					f = a.a.moof(t.sequenceNumber++, v, t),
					t.samples = [];
					var rt = {
						data1: f,
						data2: h,
						startPTS: p / d,
						endPTS: (g + c) / d,
						startDTS: v / d,
						endDTS: this.nextAvcDts / d,
						type: "video",
						hasAudio: !1,
						hasVideo: !0,
						nb: b.length,
						dropped: tt
					};
					return this.observer.trigger(o.a.FRAG_PARSING_DATA, rt),
					rt
				}
			},
			t.prototype.remuxAudio = function(t, e, r, i) {
				var u = t.inputTimeScale,
				d = t.timescale,
				c = u / d,
				h = t.isAAC ? 1024 : 1152,
				f = h * c,
				p = this._PTSNormalize,
				v = this._initDTS,
				g = !t.isAAC && this.typeSupported.mpeg,
				y = void 0,
				m = void 0,
				b = void 0,
				E = void 0,
				T = void 0,
				S = void 0,
				_ = void 0,
				A = t.samples,
				R = [],
				w = this.nextAudioPts;
				if (r |= A.length && w && (i && Math.abs(e - w / u) < .1 || Math.abs(A[0].pts - w - v) < 20 * f), A.forEach(function(t) {
					t.pts = t.dts = p(t.pts - v, e * u)
				}), A = A.filter(function(t) {
					return t.pts >= 0
				}), 0 !== A.length) {
					if (r || (w = i ? e * u: A[0].pts), t.isAAC) for (var L = this.config.maxAudioFramesDrift,
					D = 0,
					I = w; D < A.length;) {
						var k, O = A[D],
						C = O.pts;
						k = C - I;
						var P = Math.abs(1e3 * k / u);
						if (k <= -L * f) l.b.warn("Dropping 1 audio frame @ " + (I / u).toFixed(3) + "s due to " + Math.round(P) + " ms overlap."),
						A.splice(D, 1),
						t.len -= O.unit.length;
						else if (k >= L * f && P < 1e4 && I) {
							var x = Math.round(k / f);
							l.b.warn("Injecting " + x + " audio frame @ " + (I / u).toFixed(3) + "s due to " + Math.round(1e3 * k / u) + " ms gap.");
							for (var F = 0; F < x; F++) {
								var N = Math.max(I, 0);
								b = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount),
								b || (l.b.log("Unable to get silent frame for given audio codec; duplicating last frame instead."), b = O.unit.subarray()),
								A.splice(D, 0, {
									unit: b,
									pts: N,
									dts: N
								}),
								t.len += b.length,
								I += f,
								D++
							}
							O.pts = O.dts = I,
							I += f,
							D++
						} else Math.abs(k),
						O.pts = O.dts = I,
						I += f,
						D++
					}
					for (var M = 0,
					U = A.length; M < U; M++) {
						var B = A[M],
						G = B.unit,
						K = B.pts;
						if (void 0 !== _) m.duration = Math.round((K - _) / c);
						else {
							var j = Math.round(1e3 * (K - w) / u),
							H = 0;
							if (r && t.isAAC && j) {
								if (j > 0 && j < 1e4) H = Math.round((K - w) / f),
								l.b.log(j + " ms hole between AAC samples detected,filling it"),
								H > 0 && (b = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount), b || (b = G.subarray()), t.len += H * b.length);
								else if (j < -12) {
									l.b.log("drop overlapping AAC sample, expected/parsed/delta:" + (w / u).toFixed(3) + "s/" + (K / u).toFixed(3) + "s/" + -j + "ms"),
									t.len -= G.byteLength;
									continue
								}
								K = w
							}
							if (S = K, !(t.len > 0)) return;
							var V = g ? t.len: t.len + 8;
							y = g ? 0 : 8;
							try {
								E = new Uint8Array(V)
							} catch(t) {
								return void this.observer.trigger(o.a.ERROR, {
									type: s.b.MUX_ERROR,
									details: s.a.REMUX_ALLOC_ERROR,
									fatal: !1,
									bytes: V,
									reason: "fail allocating audio mdat " + V
								})
							}
							if (!g) {
								new DataView(E.buffer).setUint32(0, V),
								E.set(a.a.types.mdat, 4)
							}
							for (var Y = 0; Y < H; Y++) b = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount),
							b || (l.b.log("Unable to get silent frame for given audio codec; duplicating this frame instead."), b = G.subarray()),
							E.set(b, y),
							y += b.byteLength,
							m = {
								size: b.byteLength,
								cts: 0,
								duration: 1024,
								flags: {
									isLeading: 0,
									isDependedOn: 0,
									hasRedundancy: 0,
									degradPrio: 0,
									dependsOn: 1
								}
							},
							R.push(m)
						}
						E.set(G, y);
						var W = G.byteLength;
						y += W,
						m = {
							size: W,
							cts: 0,
							duration: 0,
							flags: {
								isLeading: 0,
								isDependedOn: 0,
								hasRedundancy: 0,
								degradPrio: 0,
								dependsOn: 1
							}
						},
						R.push(m),
						_ = K
					}
					var z = 0,
					q = R.length;
					if (q >= 2 && (z = R[q - 2].duration, m.duration = z), q) {
						this.nextAudioPts = w = _ + c * z,
						t.len = 0,
						t.samples = R,
						T = g ? new Uint8Array: a.a.moof(t.sequenceNumber++, S / c, t),
						t.samples = [];
						var X = S / u,
						Q = w / u,
						$ = {
							data1: T,
							data2: E,
							startPTS: X,
							endPTS: Q,
							startDTS: X,
							endDTS: Q,
							type: "audio",
							hasAudio: !0,
							hasVideo: !1,
							nb: q
						};
						return this.observer.trigger(o.a.FRAG_PARSING_DATA, $),
						$
					}
					return null
				}
			},
			t.prototype.remuxEmptyAudio = function(t, e, r, i) {
				var a = t.inputTimeScale,
				o = t.samplerate ? t.samplerate: a,
				s = a / o,
				u = this.nextAudioPts,
				d = (void 0 !== u ? u: i.startDTS * a) + this._initDTS,
				c = i.endDTS * a + this._initDTS,
				h = 1024 * s,
				f = Math.ceil((c - d) / h),
				p = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
				if (l.b.warn("remux empty Audio"), !p) return void l.b.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");
				for (var v = [], g = 0; g < f; g++) {
					var y = d + g * h;
					v.push({
						unit: p,
						pts: y,
						dts: y
					}),
					t.len += p.length
				}
				t.samples = v,
				this.remuxAudio(t, e, r)
			},
			t.prototype.remuxID3 = function(t, e) {
				var r = t.samples.length,
				i = void 0,
				n = t.inputTimeScale,
				a = this._initPTS,
				s = this._initDTS;
				if (r) {
					for (var l = 0; l < r; l++) i = t.samples[l],
					i.pts = (i.pts - a) / n,
					i.dts = (i.dts - s) / n;
					this.observer.trigger(o.a.FRAG_PARSING_METADATA, {
						samples: t.samples
					})
				}
				t.samples = [],
				e = e
			},
			t.prototype.remuxText = function(t, e) {
				t.samples.sort(function(t, e) {
					return t.pts - e.pts
				});
				var r = t.samples.length,
				i = void 0,
				n = t.inputTimeScale,
				a = this._initPTS;
				if (r) {
					for (var s = 0; s < r; s++) i = t.samples[s],
					i.pts = (i.pts - a) / n;
					this.observer.trigger(o.a.FRAG_PARSING_USERDATA, {
						samples: t.samples
					})
				}
				t.samples = [],
				e = e
			},
			t.prototype._PTSNormalize = function(t, e) {
				var r = void 0;
				if (void 0 === e) return t;
				for (r = e < t ? -8589934592 : 8589934592; Math.abs(t - e) > 4294967296;) t += r;
				return t
			},
			t
		} ();
		e.a = u
	},
	"2": function(t, e, r) {
		"use strict";
		r.d(e, "b",
		function() {
			return i
		}),
		r.d(e, "a",
		function() {
			return n
		});
		var i = {
			NETWORK_ERROR: "networkError",
			MEDIA_ERROR: "mediaError",
			KEY_SYSTEM_ERROR: "keySystemError",
			MUX_ERROR: "muxError",
			OTHER_ERROR: "otherError"
		},
		n = {
			KEY_SYSTEM_NO_KEYS: "keySystemNoKeys",
			KEY_SYSTEM_NO_ACCESS: "keySystemNoAccess",
			KEY_SYSTEM_NO_SESSION: "keySystemNoSession",
			KEY_SYSTEM_LICENSE_REQUEST_FAILED: "keySystemLicenseRequestFailed",
			MANIFEST_LOAD_ERROR: "manifestLoadError",
			MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
			MANIFEST_PARSING_ERROR: "manifestParsingError",
			MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
			LEVEL_LOAD_ERROR: "levelLoadError",
			LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
			LEVEL_SWITCH_ERROR: "levelSwitchError",
			AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
			AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
			FRAG_LOAD_ERROR: "fragLoadError",
			FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
			FRAG_DECRYPT_ERROR: "fragDecryptError",
			FRAG_PARSING_ERROR: "fragParsingError",
			REMUX_ALLOC_ERROR: "remuxAllocError",
			KEY_LOAD_ERROR: "keyLoadError",
			KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
			BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
			BUFFER_APPEND_ERROR: "bufferAppendError",
			BUFFER_APPENDING_ERROR: "bufferAppendingError",
			BUFFER_STALLED_ERROR: "bufferStalledError",
			BUFFER_FULL_ERROR: "bufferFullError",
			BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
			BUFFER_NUDGE_ON_STALL: "bufferNudgeOnStall",
			INTERNAL_EXCEPTION: "internalException"
		}
	},
	"45": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = Math.pow(2, 32) - 1,
		a = function() {
			function t() {
				i(this, t)
			}
			return t.init = function() {
				t.types = {
					avc1: [],
					avcC: [],
					btrt: [],
					dinf: [],
					dref: [],
					esds: [],
					ftyp: [],
					hdlr: [],
					mdat: [],
					mdhd: [],
					mdia: [],
					mfhd: [],
					minf: [],
					moof: [],
					moov: [],
					mp4a: [],
					".mp3": [],
					mvex: [],
					mvhd: [],
					pasp: [],
					sdtp: [],
					stbl: [],
					stco: [],
					stsc: [],
					stsd: [],
					stsz: [],
					stts: [],
					tfdt: [],
					tfhd: [],
					traf: [],
					trak: [],
					trun: [],
					trex: [],
					tkhd: [],
					vmhd: [],
					smhd: []
				};
				var e = void 0;
				for (e in t.types) t.types.hasOwnProperty(e) && (t.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
				var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
				i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
				t.HDLR_TYPES = {
					video: r,
					audio: i
				};
				var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
				a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
				t.STTS = t.STSC = t.STCO = a,
				t.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
				t.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
				t.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
				t.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
				var o = new Uint8Array([105, 115, 111, 109]),
				s = new Uint8Array([97, 118, 99, 49]),
				l = new Uint8Array([0, 0, 0, 1]);
				t.FTYP = t.box(t.types.ftyp, o, l, o, s),
				t.DINF = t.box(t.types.dinf, t.box(t.types.dref, n))
			},
			t.box = function(t) {
				for (var e = Array.prototype.slice.call(arguments, 1), r = 8, i = e.length, n = i, a = void 0; i--;) r += e[i].byteLength;
				for (a = new Uint8Array(r), a[0] = r >> 24 & 255, a[1] = r >> 16 & 255, a[2] = r >> 8 & 255, a[3] = 255 & r, a.set(t, 4), i = 0, r = 8; i < n; i++) a.set(e[i], r),
				r += e[i].byteLength;
				return a
			},
			t.hdlr = function(e) {
				return t.box(t.types.hdlr, t.HDLR_TYPES[e])
			},
			t.mdat = function(e) {
				return t.box(t.types.mdat, e)
			},
			t.mdhd = function(e, r) {
				r *= e;
				var i = Math.floor(r / (n + 1)),
				a = Math.floor(r % (n + 1));
				return t.box(t.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 85, 196, 0, 0]))
			},
			t.mdia = function(e) {
				return t.box(t.types.mdia, t.mdhd(e.timescale, e.duration), t.hdlr(e.type), t.minf(e))
			},
			t.mfhd = function(e) {
				return t.box(t.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]))
			},
			t.minf = function(e) {
				return "audio" === e.type ? t.box(t.types.minf, t.box(t.types.smhd, t.SMHD), t.DINF, t.stbl(e)) : t.box(t.types.minf, t.box(t.types.vmhd, t.VMHD), t.DINF, t.stbl(e))
			},
			t.moof = function(e, r, i) {
				return t.box(t.types.moof, t.mfhd(e), t.traf(i, r))
			},
			t.moov = function(e) {
				for (var r = e.length,
				i = []; r--;) i[r] = t.trak(e[r]);
				return t.box.apply(null, [t.types.moov, t.mvhd(e[0].timescale, e[0].duration)].concat(i).concat(t.mvex(e)))
			},
			t.mvex = function(e) {
				for (var r = e.length,
				i = []; r--;) i[r] = t.trex(e[r]);
				return t.box.apply(null, [t.types.mvex].concat(i))
			},
			t.mvhd = function(e, r) {
				r *= e;
				var i = Math.floor(r / (n + 1)),
				a = Math.floor(r % (n + 1)),
				o = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
				return t.box(t.types.mvhd, o)
			},
			t.sdtp = function(e) {
				var r = e.samples || [],
				i = new Uint8Array(4 + r.length),
				n = void 0,
				a = void 0;
				for (a = 0; a < r.length; a++) n = r[a].flags,
				i[a + 4] = n.dependsOn << 4 | n.isDependedOn << 2 | n.hasRedundancy;
				return t.box(t.types.sdtp, i)
			},
			t.stbl = function(e) {
				return t.box(t.types.stbl, t.stsd(e), t.box(t.types.stts, t.STTS), t.box(t.types.stsc, t.STSC), t.box(t.types.stsz, t.STSZ), t.box(t.types.stco, t.STCO))
			},
			t.avc1 = function(e) {
				var r = [],
				i = [],
				n = void 0,
				a = void 0,
				o = void 0;
				for (n = 0; n < e.sps.length; n++) a = e.sps[n],
				o = a.byteLength,
				r.push(o >>> 8 & 255),
				r.push(255 & o),
				r = r.concat(Array.prototype.slice.call(a));
				for (n = 0; n < e.pps.length; n++) a = e.pps[n],
				o = a.byteLength,
				i.push(o >>> 8 & 255),
				i.push(255 & o),
				i = i.concat(Array.prototype.slice.call(a));
				var s = t.box(t.types.avcC, new Uint8Array([1, r[3], r[4], r[5], 255, 224 | e.sps.length].concat(r).concat([e.pps.length]).concat(i))),
				l = e.width,
				u = e.height,
				d = e.pixelRatio[0],
				c = e.pixelRatio[1];
				return t.box(t.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), s, t.box(t.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), t.box(t.types.pasp, new Uint8Array([d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c])))
			},
			t.esds = function(t) {
				var e = t.config.length;
				return new Uint8Array([0, 0, 0, 0, 3, 23 + e, 0, 1, 0, 4, 15 + e, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([e]).concat(t.config).concat([6, 1, 2]))
			},
			t.mp4a = function(e) {
				var r = e.samplerate;
				return t.box(t.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), t.box(t.types.esds, t.esds(e)))
			},
			t.mp3 = function(e) {
				var r = e.samplerate;
				return t.box(t.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
			},
			t.stsd = function(e) {
				return "audio" === e.type ? e.isAAC || "mp3" !== e.codec ? t.box(t.types.stsd, t.STSD, t.mp4a(e)) : t.box(t.types.stsd, t.STSD, t.mp3(e)) : t.box(t.types.stsd, t.STSD, t.avc1(e))
			},
			t.tkhd = function(e) {
				var r = e.id,
				i = e.duration * e.timescale,
				a = e.width,
				o = e.height,
				s = Math.floor(i / (n + 1)),
				l = Math.floor(i % (n + 1));
				return t.box(t.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >> 8 & 255, 255 & a, 0, 0, o >> 8 & 255, 255 & o, 0, 0]))
			},
			t.traf = function(e, r) {
				var i = t.sdtp(e),
				a = e.id,
				o = Math.floor(r / (n + 1)),
				s = Math.floor(r % (n + 1));
				return t.box(t.types.traf, t.box(t.types.tfhd, new Uint8Array([0, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a])), t.box(t.types.tfdt, new Uint8Array([1, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s])), t.trun(e, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
			},
			t.trak = function(e) {
				return e.duration = e.duration || 4294967295,
				t.box(t.types.trak, t.tkhd(e), t.mdia(e))
			},
			t.trex = function(e) {
				var r = e.id;
				return t.box(t.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
			},
			t.trun = function(e, r) {
				var i = e.samples || [],
				n = i.length,
				a = 12 + 16 * n,
				o = new Uint8Array(a),
				s = void 0,
				l = void 0,
				u = void 0,
				d = void 0,
				c = void 0,
				h = void 0;
				for (r += 8 + a, o.set([0, 0, 15, 1, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0), s = 0; s < n; s++) l = i[s],
				u = l.duration,
				d = l.size,
				c = l.flags,
				h = l.cts,
				o.set([u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, c.isLeading << 2 | c.dependsOn, c.isDependedOn << 6 | c.hasRedundancy << 4 | c.paddingValue << 1 | c.isNonSync, 61440 & c.degradPrio, 15 & c.degradPrio, h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, 255 & h], 12 + 16 * s);
				return t.box(t.types.trun, o)
			},
			t.initSegment = function(e) {
				t.types || t.init();
				var r = t.moov(e),
				i = void 0;
				return i = new Uint8Array(t.FTYP.byteLength + r.byteLength),
				i.set(t.FTYP),
				i.set(r, t.FTYP.byteLength),
				i
			},
			t
		} ();
		e.a = a
	},
	"44": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = function() {
			function t() {
				i(this, t)
			}
			return t.getSilentFrame = function(t, e) {
				switch (t) {
				case "mp4a.40.2":
					if (1 === e) return new Uint8Array([0, 200, 0, 128, 35, 128]);
					if (2 === e) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
					if (3 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
					if (4 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
					if (5 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
					if (6 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
					break;
				default:
					if (1 === e) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
					if (2 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
					if (3 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
				}
				return null
			},
			t
		} ();
		e.a = n
	},
	"42": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(6),
		a = r(0),
		o = r(21),
		s = function() {
			function t(e, r, n) {
				i(this, t),
				this.observer = e,
				this.config = n,
				this.remuxer = r
			}
			return t.prototype.resetInitSegment = function(t, e, r, i) {
				this._audioTrack = {
					container: "audio/mpeg",
					type: "audio",
					id: -1,
					sequenceNumber: 0,
					isAAC: !1,
					samples: [],
					len: 0,
					manifestCodec: e,
					duration: i,
					inputTimeScale: 9e4
				}
			},
			t.prototype.resetTimeStamp = function() {},
			t.probe = function(t) {
				var e = void 0,
				r = void 0,
				i = n.a.getID3Data(t, 0);
				if (i && void 0 !== n.a.getTimeStamp(i)) for (e = i.length, r = Math.min(t.length - 1, e + 100); e < r; e++) if (o.a.probe(t, e)) return a.b.log("MPEG Audio sync word found !"),
				!0;
				return ! 1
			},
			t.prototype.append = function(t, e, r, i) {
				for (var a = n.a.getID3Data(t, 0), s = n.a.getTimeStamp(a), l = s ? 90 * s: 9e4 * e, u = a.length, d = t.length, c = 0, h = 0, f = this._audioTrack, p = [{
					pts: l,
					dts: l,
					data: a
				}]; u < d;) if (o.a.isHeader(t, u)) {
					var v = o.a.appendFrame(f, t, u, l, c);
					if (!v) break;
					u += v.length,
					h = v.sample.pts,
					c++
				} else n.a.isHeader(t, u) ? (a = n.a.getID3Data(t, u), p.push({
					pts: h,
					dts: h,
					data: a
				}), u += a.length) : u++;
				this.remuxer.remux(f, {
					samples: []
				},
				{
					samples: p,
					inputTimeScale: 9e4
				},
				{
					samples: []
				},
				e, r, i)
			},
			t.prototype.destroy = function() {},
			t
		} ();
		e.a = s
	},
	"21": function(t, e, r) {
		"use strict";
		var i = {
			BitratesMap: [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
			SamplingRateMap: [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
			SamplesCoefficients: [[0, 72, 144, 12], [0, 0, 0, 0], [0, 72, 144, 12], [0, 144, 144, 12]],
			BytesInSlot: [0, 1, 1, 4],
			appendFrame: function(t, e, r, i, n) {
				if (! (r + 24 > e.length)) {
					var a = this.parseHeader(e, r);
					if (a && r + a.frameLength <= e.length) {
						var o = 9e4 * a.samplesPerFrame / a.sampleRate,
						s = i + n * o,
						l = {
							unit: e.subarray(r, r + a.frameLength),
							pts: s,
							dts: s
						};
						return t.config = [],
						t.channelCount = a.channelCount,
						t.samplerate = a.sampleRate,
						t.samples.push(l),
						t.len += a.frameLength,
						{
							sample: l,
							length: a.frameLength
						}
					}
				}
			},
			parseHeader: function(t, e) {
				var r = t[e + 1] >> 3 & 3,
				n = t[e + 1] >> 1 & 3,
				a = t[e + 2] >> 4 & 15,
				o = t[e + 2] >> 2 & 3,
				s = t[e + 2] >> 1 & 1;
				if (1 !== r && 0 !== a && 15 !== a && 3 !== o) {
					var l = 3 === r ? 3 - n: 3 === n ? 3 : 4,
					u = 1e3 * i.BitratesMap[14 * l + a - 1],
					d = 3 === r ? 0 : 2 === r ? 1 : 2,
					c = i.SamplingRateMap[3 * d + o],
					h = t[e + 3] >> 6 == 3 ? 1 : 2,
					f = i.SamplesCoefficients[r][n],
					p = i.BytesInSlot[n],
					v = 8 * f * p;
					return {
						sampleRate: c,
						channelCount: h,
						frameLength: parseInt(f * u / c + s, 10) * p,
						samplesPerFrame: v
					}
				}
			},
			isHeaderPattern: function(t, e) {
				return 255 === t[e] && 224 == (224 & t[e + 1]) && 0 != (6 & t[e + 1])
			},
			isHeader: function(t, e) {
				return !! (e + 1 < t.length && this.isHeaderPattern(t, e))
			},
			probe: function(t, e) {
				if (e + 1 < t.length && this.isHeaderPattern(t, e)) {
					var r = this.parseHeader(t, e),
					i = 4;
					r && r.frameLength && (i = r.frameLength);
					var n = e + i;
					if (n === t.length || n + 1 < t.length && this.isHeaderPattern(t, n)) return ! 0
				}
				return ! 1
			}
		};
		e.a = i
	},
	"6": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		r.d(e, "b",
		function() {
			return a
		});
		var n = function() {
			function t() {
				i(this, t)
			}
			return t.isHeader = function(t, e) {
				return e + 10 <= t.length && 73 === t[e] && 68 === t[e + 1] && 51 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
			},
			t.isFooter = function(t, e) {
				return e + 10 <= t.length && 51 === t[e] && 68 === t[e + 1] && 73 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
			},
			t.getID3Data = function(e, r) {
				for (var i = r,
				n = 0; t.isHeader(e, r);) {
					n += 10;
					n += t._readSize(e, r + 6),
					t.isFooter(e, r + 10) && (n += 10),
					r += n
				}
				if (n > 0) return e.subarray(i, i + n)
			},
			t._readSize = function(t, e) {
				var r = 0;
				return r = (127 & t[e]) << 21,
				r |= (127 & t[e + 1]) << 14,
				r |= (127 & t[e + 2]) << 7,
				r |= 127 & t[e + 3]
			},
			t.getTimeStamp = function(e) {
				for (var r = t.getID3Frames(e), i = 0; i < r.length; i++) {
					var n = r[i];
					if (t.isTimeStampFrame(n)) return t._readTimeStamp(n)
				}
			},
			t.isTimeStampFrame = function(t) {
				return t && "PRIV" === t.key && "com.apple.streaming.transportStreamTimestamp" === t.info
			},
			t._getFrameData = function(e) {
				var r = String.fromCharCode(e[0], e[1], e[2], e[3]),
				i = t._readSize(e, 4);
				return {
					type: r,
					size: i,
					data: e.subarray(10, 10 + i)
				}
			},
			t.getID3Frames = function(e) {
				for (var r = 0,
				i = []; t.isHeader(e, r);) {
					var n = t._readSize(e, r + 6);
					r += 10;
					for (var a = r + n; r + 8 < a;) {
						var o = t._getFrameData(e.subarray(r)),
						s = t._decodeFrame(o);
						s && i.push(s),
						r += o.size + 10
					}
					t.isFooter(e, r) && (r += 10)
				}
				return i
			},
			t._decodeFrame = function(e) {
				return "PRIV" === e.type ? t._decodePrivFrame(e) : "T" === e.type[0] ? t._decodeTextFrame(e) : "W" === e.type[0] ? t._decodeURLFrame(e) : void 0
			},
			t._readTimeStamp = function(t) {
				if (8 === t.data.byteLength) {
					var e = new Uint8Array(t.data),
					r = 1 & e[3],
					i = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
					return i /= 45,
					r && (i += 47721858.84),
					Math.round(i)
				}
			},
			t._decodePrivFrame = function(e) {
				if (! (e.size < 2)) {
					var r = t._utf8ArrayToStr(e.data, !0),
					i = new Uint8Array(e.data.subarray(r.length + 1));
					return {
						key: e.type,
						info: r,
						data: i.buffer
					}
				}
			},
			t._decodeTextFrame = function(e) {
				if (! (e.size < 2)) {
					if ("TXXX" === e.type) {
						var r = 1,
						i = t._utf8ArrayToStr(e.data.subarray(r));
						r += i.length + 1;
						var n = t._utf8ArrayToStr(e.data.subarray(r));
						return {
							key: e.type,
							info: i,
							data: n
						}
					}
					var a = t._utf8ArrayToStr(e.data.subarray(1));
					return {
						key: e.type,
						data: a
					}
				}
			},
			t._decodeURLFrame = function(e) {
				if ("WXXX" === e.type) {
					if (e.size < 2) return;
					var r = 1,
					i = t._utf8ArrayToStr(e.data.subarray(r));
					r += i.length + 1;
					var n = t._utf8ArrayToStr(e.data.subarray(r));
					return {
						key: e.type,
						info: i,
						data: n
					}
				}
				var a = t._utf8ArrayToStr(e.data);
				return {
					key: e.type,
					data: a
				}
			},
			t._utf8ArrayToStr = function(t) {
				for (var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = t.length, i = void 0, n = void 0, a = void 0, o = "", s = 0; s < r;) {
					if (0 === (i = t[s++]) && e) return o;
					if (0 !== i && 3 !== i) switch (i >> 4) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						o += String.fromCharCode(i);
						break;
					case 12:
					case 13:
						n = t[s++],
						o += String.fromCharCode((31 & i) << 6 | 63 & n);
						break;
					case 14:
						n = t[s++],
						a = t[s++],
						o += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & a) << 0)
					}
				}
				return o
			},
			t
		} (),
		a = n._utf8ArrayToStr;
		e.a = n
	},
	"38": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		function n(t, e) {
			try {
				var r = (new Date).valueOf(),
				i = new h.ModeOfOperation.ecb(e),
				n = t;
				if (t.length % 16 > 0) {
					var a = 16 * parseInt(t.length / 16);
					n = n.slice(0, a),
					n = i.decrypt(n),
					t.set(n, 0);
					var o = (new Date).valueOf();
					return d.b.log("parse pes extra time:" + (o - r)),
					t
				}
				n = t,
				n = i.decrypt(t);
				var o = (new Date).valueOf();
				return d.b.log("parse pes extra time:" + (o - r)),
				n
			} catch(e) {
				return t
			}
		}
		var a = r(20),
		o = r(21),
		s = r(1),
		l = r(39),
		u = r(40),
		d = r(0),
		c = r(2),
		h = r(41),
		f = null,
		p = "",
		v = {
			video: 1,
			audio: 2,
			id3: 3,
			text: 4
		},
		g = function() {
			function t(e, r, a, o) {
				i(this, t),
				this.observer = e,
				this.config = a,
				this.typeSupported = o,
				this.remuxer = r,
				this.sampleAes = null,
				f = n,
				p = a._sce_dlgtqredxx
			}
			return t.prototype.setDecryptData = function(t) {
				null != t && null != t.key && "SAMPLE-AES" === t.method ? this.sampleAes = new u.a(this.observer, this.config, t, this.discardEPB) : this.sampleAes = null
			},
			t.probe = function(e) {
				var r = t._syncOffset(e);
				return ! (r < 0) && (r && d.b.warn("MPEG2-TS detected but first sync word found @ offset " + r + ", junk ahead ?"), !0)
			},
			t._syncOffset = function(t) {
				for (var e = Math.min(1e3, t.length - 564), r = 0; r < e;) {
					if (71 === t[r] && 71 === t[r + 188] && 71 === t[r + 376]) return r;
					r++
				}
				return - 1
			},
			t.createTrack = function(t, e) {
				return {
					container: "video" === t || "audio" === t ? "video/mp2t": void 0,
					type: t,
					id: v[t],
					pid: -1,
					inputTimeScale: 9e4,
					sequenceNumber: 0,
					samples: [],
					len: 0,
					dropped: "video" === t ? 0 : void 0,
					isAAC: "audio" === t || void 0,
					duration: "audio" === t ? e: void 0
				}
			},
			t.prototype.resetInitSegment = function(e, r, i, n) {
				this.pmtParsed = !1,
				this._pmtId = -1,
				this._avcTrack = t.createTrack("video", n),
				this._audioTrack = t.createTrack("audio", n),
				this._id3Track = t.createTrack("id3", n),
				this._txtTrack = t.createTrack("text", n),
				this.aacOverFlow = null,
				this.aacLastPTS = null,
				this.avcSample = null,
				this.audioCodec = r,
				this.videoCodec = i,
				this._duration = n
			},
			t.prototype.resetTimeStamp = function() {},
			t.prototype.append = function(e, r, i, n) {
				var a = void 0,
				o = e.length,
				l = void 0,
				u = void 0,
				h = void 0,
				f = void 0,
				p = !1;
				this.contiguous = i;
				var v = this.pmtParsed,
				g = this._avcTrack,
				y = this._audioTrack,
				m = this._id3Track,
				b = g.pid,
				E = y.pid,
				T = m.pid,
				S = this._pmtId,
				_ = g.pesData,
				A = y.pesData,
				R = m.pesData,
				w = this._parsePAT,
				L = this._parsePMT,
				D = this._parsePES,
				I = this._parseAVCPES.bind(this),
				k = this._parseAACPES.bind(this),
				O = this._parseMPEGPES.bind(this),
				C = this._parseID3PES.bind(this),
				P = t._syncOffset(e);
				for (o -= (o + P) % 188, a = P; a < o; a += 188) if (71 === e[a]) {
					if (l = !!(64 & e[a + 1]), u = ((31 & e[a + 1]) << 8) + e[a + 2], (48 & e[a + 3]) >> 4 > 1) {
						if ((h = a + 5 + e[a + 4]) === a + 188) continue
					} else h = a + 4;
					switch (u) {
					case b:
						l && (_ && (f = D(_)) && void 0 !== f.pts && I(f, !1), _ = {
							data: [],
							size: 0
						}),
						_ && (_.data.push(e.subarray(h, a + 188)), _.size += a + 188 - h);
						break;
					case E:
						l && (A && (f = D(A)) && void 0 !== f.pts && (y.isAAC ? k(f) : O(f)), A = {
							data: [],
							size: 0
						}),
						A && (A.data.push(e.subarray(h, a + 188)), A.size += a + 188 - h);
						break;
					case T:
						l && (R && (f = D(R)) && void 0 !== f.pts && C(f), R = {
							data: [],
							size: 0
						}),
						R && (R.data.push(e.subarray(h, a + 188)), R.size += a + 188 - h);
						break;
					case 0:
						l && (h += e[h] + 1),
						S = this._pmtId = w(e, h);
						break;
					case S:
						l && (h += e[h] + 1);
						var x = L(e, h, !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3, null != this.sampleAes);
						b = x.avc,
						b > 0 && (g.pid = b),
						E = x.audio,
						E > 0 && (y.pid = E, y.isAAC = x.isAAC),
						T = x.id3,
						T > 0 && (m.pid = T),
						p && !v && (d.b.log("reparse from beginning"), p = !1, a = P - 188),
						v = this.pmtParsed = !0;
						break;
					case 17:
					case 8191:
						break;
					default:
						p = !0
					}
				} else this.observer.trigger(s.a.ERROR, {
					type: c.b.MEDIA_ERROR,
					details: c.a.FRAG_PARSING_ERROR,
					fatal: !1,
					reason: "TS packet did not start with 0x47"
				});
				_ && (f = D(_)) && void 0 !== f.pts ? (I(f, !0), g.pesData = null) : g.pesData = _,
				A && (f = D(A)) && void 0 !== f.pts ? (y.isAAC ? k(f) : O(f), y.pesData = null) : (A && A.size && d.b.log("last AAC PES packet truncated,might overlap between fragments"), y.pesData = A),
				R && (f = D(R)) && void 0 !== f.pts ? (C(f), m.pesData = null) : m.pesData = R,
				null == this.sampleAes ? this.remuxer.remux(y, g, m, this._txtTrack, r, i, n) : this.decryptAndRemux(y, g, m, this._txtTrack, r, i, n)
			},
			t.prototype.decryptAndRemux = function(t, e, r, i, n, a, o) {
				if (t.samples && t.isAAC) {
					var s = this;
					this.sampleAes.decryptAacSamples(t.samples, 0,
					function() {
						s.decryptAndRemuxAvc(t, e, r, i, n, a, o)
					})
				} else this.decryptAndRemuxAvc(t, e, r, i, n, a, o)
			},
			t.prototype.decryptAndRemuxAvc = function(t, e, r, i, n, a, o) {
				if (e.samples) {
					var s = this;
					this.sampleAes.decryptAvcSamples(e.samples, 0, 0,
					function() {
						s.remuxer.remux(t, e, r, i, n, a, o)
					})
				} else this.remuxer.remux(t, e, r, i, n, a, o)
			},
			t.prototype.destroy = function() {
				this._initPTS = this._initDTS = void 0,
				this._duration = 0
			},
			t.prototype._parsePAT = function(t, e) {
				return (31 & t[e + 10]) << 8 | t[e + 11]
			},
			t.prototype._parsePMT = function(t, e, r, i) {
				var n = void 0,
				a = void 0,
				o = void 0,
				s = void 0,
				l = {
					audio: -1,
					avc: -1,
					id3: -1,
					isAAC: !0
				};
				for (n = (15 & t[e + 1]) << 8 | t[e + 2], a = e + 3 + n - 4, o = (15 & t[e + 10]) << 8 | t[e + 11], e += 12 + o; e < a;) {
					switch (s = (31 & t[e + 1]) << 8 | t[e + 2], t[e]) {
					case 207:
						if (!i) {
							d.b.log("unkown stream type:" + t[e]);
							break
						}
					case 15:
						-1 === l.audio && (l.audio = s);
						break;
					case 21:
						-1 === l.id3 && (l.id3 = s);
						break;
					case 219:
						if (!i) {
							d.b.log("unkown stream type:" + t[e]);
							break
						}
					case 27:
						-1 === l.avc && (l.avc = s);
						break;
					case 3:
					case 4:
						r ? -1 === l.audio && (l.audio = s, l.isAAC = !1) : d.b.log("MPEG audio found, not supported in this browser for now");
						break;
					case 36:
						d.b.warn("HEVC stream type found, not supported for now");
						break;
					default:
						d.b.log("unkown stream type:" + t[e])
					}
					e += 5 + ((15 & t[e + 3]) << 8 | t[e + 4])
				}
				return l
			},
			t.prototype._parsePES = function(t) {
				var e = 0,
				r = void 0,
				i = void 0,
				n = void 0,
				a = void 0,
				o = void 0,
				s = void 0,
				l = void 0,
				u = void 0,
				c = t.data;
				if (!t || 0 === t.size) return null;
				for (; c[0].length < 19 && c.length > 1;) {
					var h = new Uint8Array(c[0].length + c[1].length);
					h.set(c[0]),
					h.set(c[1], c[0].length),
					c[0] = h,
					c.splice(1, 1)
				}
				if (r = c[0], 1 === (r[0] << 16) + (r[1] << 8) + r[2]) {
					if ((n = (r[4] << 8) + r[5]) && n > t.size - 6) return null;
					i = r[7],
					192 & i && (s = 536870912 * (14 & r[9]) + 4194304 * (255 & r[10]) + 16384 * (254 & r[11]) + 128 * (255 & r[12]) + (254 & r[13]) / 2, s > 4294967295 && (s -= 8589934592), 64 & i ? (l = 536870912 * (14 & r[14]) + 4194304 * (255 & r[15]) + 16384 * (254 & r[16]) + 128 * (255 & r[17]) + (254 & r[18]) / 2, l > 4294967295 && (l -= 8589934592), s - l > 54e5 && (d.b.warn(Math.round((s - l) / 9e4) + "s delta between PTS and DTS, align them"), s = l)) : l = s),
					a = r[8],
					u = a + 9,
					t.size -= u,
					o = new Uint8Array(t.size);
					for (var v = 0,
					g = c.length; v < g; v++) {
						r = c[v];
						var y = r.byteLength;
						if (u) {
							if (u > y) {
								u -= y;
								continue
							}
							r = r.subarray(u),
							y -= u,
							u = 0
						}
						o.set(r, e),
						e += y
					}
					return n && (n -= a + 3),
					p && f && (o = f(o, p)),
					{
						data: o,
						pts: s,
						dts: l,
						len: n
					}
				}
				return null
			},
			t.prototype.pushAccesUnit = function(t, e) {
				if (t.units.length && t.frame) {
					var r = e.samples,
					i = r.length; ! this.config.forceKeyFrameOnDiscontinuity || !0 === t.key || e.sps && (i || this.contiguous) ? (t.id = i, r.push(t)) : e.dropped++
				}
				t.debug.length && d.b.log(t.pts + "/" + t.dts + ":" + t.debug)
			},
			t.prototype._parseAVCPES = function(t, e) {
				var r = this,
				i = this._avcTrack,
				n = this._parseAVCNALu(t.data),
				a = void 0,
				o = this.avcSample,
				s = void 0,
				u = !1,
				d = void 0,
				c = this.pushAccesUnit.bind(this),
				h = function(t, e, r, i) {
					return {
						key: t,
						pts: e,
						dts: r,
						units: [],
						debug: i
					}
				};
				t.data = null,
				o && n.length && !i.audFound && (c(o, i), o = this.avcSample = h(!1, t.pts, t.dts, "")),
				n.forEach(function(e) {
					switch (e.type) {
					case 1:
						s = !0,
						o || (o = r.avcSample = h(!0, t.pts, t.dts, "")),
						o.frame = !0;
						var n = e.data;
						if (u && n.length > 4) {
							var f = new l.a(n).readSliceType();
							2 !== f && 4 !== f && 7 !== f && 9 !== f || (o.key = !0)
						}
						break;
					case 5:
						s = !0,
						o || (o = r.avcSample = h(!0, t.pts, t.dts, "")),
						o.key = !0,
						o.frame = !0;
						break;
					case 6:
						s = !0,
						a = new l.a(r.discardEPB(e.data)),
						a.readUByte();
						for (var p = 0,
						v = 0,
						g = !1,
						y = 0; ! g && a.bytesAvailable > 1;) {
							p = 0;
							do {
								y = a.readUByte(), p += y
							} while ( 255 === y );
							v = 0;
							do {
								y = a.readUByte(), v += y
							} while ( 255 === y );
							if (4 === p && 0 !== a.bytesAvailable) {
								g = !0;
								if (181 === a.readUByte()) {
									if (49 === a.readUShort()) {
										if (1195456820 === a.readUInt()) {
											if (3 === a.readUByte()) {
												var m = a.readUByte(),
												b = a.readUByte(),
												E = 31 & m,
												T = [m, b];
												for (d = 0; d < E; d++) T.push(a.readUByte()),
												T.push(a.readUByte()),
												T.push(a.readUByte());
												r._insertSampleInOrder(r._txtTrack.samples, {
													type: 3,
													pts: t.pts,
													bytes: T
												})
											}
										}
									}
								}
							} else if (v < a.bytesAvailable) for (d = 0; d < v; d++) a.readUByte()
						}
						break;
					case 7:
						if (s = !0, u = !0, !i.sps) {
							a = new l.a(e.data);
							var S = a.readSPS();
							i.width = S.width,
							i.height = S.height,
							i.pixelRatio = S.pixelRatio,
							i.sps = [e.data],
							i.duration = r._duration;
							var _ = e.data.subarray(1, 4),
							A = "avc1.";
							for (d = 0; d < 3; d++) {
								var R = _[d].toString(16);
								R.length < 2 && (R = "0" + R),
								A += R
							}
							i.codec = A
						}
						break;
					case 8:
						s = !0,
						i.pps || (i.pps = [e.data]);
						break;
					case 9:
						s = !1,
						i.audFound = !0,
						o && c(o, i),
						o = r.avcSample = h(!1, t.pts, t.dts, "");
						break;
					case 12:
						s = !1;
						break;
					default:
						s = !1,
						o && (o.debug += "unknown NAL " + e.type + " ")
					}
					if (o && s) {
						o.units.push(e)
					}
				}),
				e && o && (c(o, i), this.avcSample = null)
			},
			t.prototype._insertSampleInOrder = function(t, e) {
				var r = t.length;
				if (r > 0) {
					if (e.pts >= t[r - 1].pts) t.push(e);
					else for (var i = r - 1; i >= 0; i--) if (e.pts < t[i].pts) {
						t.splice(i, 0, e);
						break
					}
				} else t.push(e)
			},
			t.prototype._getLastNalUnit = function() {
				var t = this.avcSample,
				e = void 0;
				if (!t || 0 === t.units.length) {
					var r = this._avcTrack,
					i = r.samples;
					t = i[i.length - 1]
				}
				if (t) {
					var n = t.units;
					e = n[n.length - 1]
				}
				return e
			},
			t.prototype._parseAVCNALu = function(t) {
				var e = 0,
				r = t.byteLength,
				i = void 0,
				n = void 0,
				a = this._avcTrack,
				o = a.naluState || 0,
				s = o,
				l = [],
				u = void 0,
				d = void 0,
				c = -1,
				h = void 0;
				for ( - 1 === o && (c = 0, h = 31 & t[0], o = 0, e = 1); e < r;) if (i = t[e++], o) if (1 !== o) if (i) if (1 === i) {
					if (c >= 0) u = {
						data: t.subarray(c, e - o - 1),
						type: h
					},
					l.push(u);
					else {
						var f = this._getLastNalUnit();
						if (f && (s && e <= 4 - s && f.state && (f.data = f.data.subarray(0, f.data.byteLength - s)), (n = e - o - 1) > 0)) {
							var p = new Uint8Array(f.data.byteLength + n);
							p.set(f.data, 0),
							p.set(t.subarray(0, n), f.data.byteLength),
							f.data = p
						}
					}
					e < r ? (d = 31 & t[e], c = e, h = d, o = 0) : o = -1
				} else o = 0;
				else o = 3;
				else o = i ? 0 : 2;
				else o = i ? 0 : 1;
				if (c >= 0 && o >= 0 && (u = {
					data: t.subarray(c, r),
					type: h,
					state: o
				},
				l.push(u)), 0 === l.length) {
					var v = this._getLastNalUnit();
					if (v) {
						var g = new Uint8Array(v.data.byteLength + t.byteLength);
						g.set(v.data, 0),
						g.set(t, v.data.byteLength),
						v.data = g
					}
				}
				return a.naluState = o,
				l
			},
			t.prototype.discardEPB = function(t) {
				for (var e = t.byteLength,
				r = [], i = 1, n = void 0, a = void 0; i < e - 2;) 0 === t[i] && 0 === t[i + 1] && 3 === t[i + 2] ? (r.push(i + 2), i += 2) : i++;
				if (0 === r.length) return t;
				n = e - r.length,
				a = new Uint8Array(n);
				var o = 0;
				for (i = 0; i < n; o++, i++) o === r[0] && (o++, r.shift()),
				a[i] = t[o];
				return a
			},
			t.prototype._parseAACPES = function(t) {
				var e = this._audioTrack,
				r = t.data,
				i = t.pts,
				n = this.aacOverFlow,
				o = this.aacLastPTS,
				l = void 0,
				u = void 0,
				h = void 0,
				f = void 0,
				p = void 0;
				if (n) {
					var v = new Uint8Array(n.byteLength + r.byteLength);
					v.set(n, 0),
					v.set(r, n.byteLength),
					r = v
				}
				for (h = 0, p = r.length; h < p - 1 && !a.d(r, h); h++);
				if (h) {
					var g = void 0,
					y = void 0;
					if (h < p - 1 ? (g = "AAC PES did not start with ADTS header,offset:" + h, y = !1) : (g = "no ADTS header found in AAC PES", y = !0), d.b.warn("parsing error:" + g), this.observer.trigger(s.a.ERROR, {
						type: c.b.MEDIA_ERROR,
						details: c.a.FRAG_PARSING_ERROR,
						fatal: y,
						reason: g
					}), y) return
				}
				if (a.c(e, this.observer, r, h, this.audioCodec), u = 0, l = a.b(e.samplerate), n && o) {
					var m = o + l;
					Math.abs(m - i) > 1 && (d.b.log("AAC: align PTS for overlapping frames by " + Math.round((m - i) / 90)), i = m)
				}
				for (; h < p;) if (a.d(r, h) && h + 5 < p) {
					var b = a.a(e, r, h, i, u);
					if (!b) break;
					h += b.length,
					f = b.sample.pts,
					u++
				} else h++;
				n = h < p ? r.subarray(h, p) : null,
				this.aacOverFlow = n,
				this.aacLastPTS = f
			},
			t.prototype._parseMPEGPES = function(t) {
				for (var e = t.data,
				r = e.length,
				i = 0,
				n = 0,
				a = t.pts; n < r;) if (o.a.isHeader(e, n)) {
					var s = o.a.appendFrame(this._audioTrack, e, n, a, i);
					if (!s) break;
					n += s.length,
					i++
				} else n++
			},
			t.prototype._parseID3PES = function(t) {
				this._id3Track.samples.push(t)
			},
			t
		} ();
		e.a = g
	},
	"41": function(t, e, r) {
		/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
		!
		function(e) {
			"use strict";
			function r(t) {
				return parseInt(t) === t
			}
			function i(t) {
				if (!r(t.length)) return ! 1;
				for (var e = 0; e < t.length; e++) if (!r(t[e]) || t[e] < 0 || t[e] > 255) return ! 1;
				return ! 0
			}
			function n(t, e) {
				if (t.buffer && "Uint8Array" === t.name) return e && (t = t.slice ? t.slice() : Array.prototype.slice.call(t)),
				t;
				if (Array.isArray(t)) {
					if (!i(t)) throw new Error("Array contains invalid value: " + t);
					return new Uint8Array(t)
				}
				if (r(t.length) && i(t)) return new Uint8Array(t);
				throw new Error("unsupported array-like object")
			}
			function a(t) {
				return new Uint8Array(t)
			}
			function o(t, e, r, i, n) {
				null == i && null == n || (t = t.slice ? t.slice(i, n) : Array.prototype.slice.call(t, i, n)),
				e.set(t, r)
			}
			function s(t) {
				for (var e = [], r = 0; r < t.length; r += 4) e.push(t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]);
				return e
			}
			function l(t) {
				t = n(t, !0);
				var e = 16 - t.length % 16,
				r = a(t.length + e);
				o(t, r);
				for (var i = t.length; i < r.length; i++) r[i] = e;
				return r
			}
			function u(t) {
				if (t = n(t, !0), t.length < 16) throw new Error("PKCS#7 invalid length");
				var e = t[t.length - 1];
				if (e > 16) throw new Error("PKCS#7 padding byte out of range");
				for (var r = t.length - e,
				i = 0; i < e; i++) if (t[r + i] !== e) throw new Error("PKCS#7 invalid padding byte");
				var s = a(r);
				return o(t, s, 0, 0, r),
				s
			}
			var d = function() {
				function t(t) {
					var e = [],
					r = 0;
					for (t = encodeURI(t); r < t.length;) {
						var i = t.charCodeAt(r++);
						37 === i ? (e.push(parseInt(t.substr(r, 2), 16)), r += 2) : e.push(i)
					}
					return n(e)
				}
				function e(t) {
					for (var e = [], r = 0; r < t.length;) {
						var i = t[r];
						i < 128 ? (e.push(String.fromCharCode(i)), r++) : i > 191 && i < 224 ? (e.push(String.fromCharCode((31 & i) << 6 | 63 & t[r + 1])), r += 2) : (e.push(String.fromCharCode((15 & i) << 12 | (63 & t[r + 1]) << 6 | 63 & t[r + 2])), r += 3)
					}
					return e.join("")
				}
				return {
					toBytes: t,
					fromBytes: e
				}
			} (),
			c = function() {
				function t(t) {
					for (var e = [], r = 0; r < t.length; r += 2) e.push(parseInt(t.substr(r, 2), 16));
					return e
				}
				function e(t) {
					for (var e = [], i = 0; i < t.length; i++) {
						var n = t[i];
						e.push(r[(240 & n) >> 4] + r[15 & n])
					}
					return e.join("")
				}
				var r = "0123456789abcdef";
				return {
					toBytes: t,
					fromBytes: e
				}
			} (),
			h = {
				16 : 10,
				24 : 12,
				32 : 14
			},
			f = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
			p = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
			v = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125],
			g = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986],
			y = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766],
			m = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126],
			b = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436],
			E = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890],
			T = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935],
			S = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600],
			_ = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480],
			A = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795],
			R = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855],
			w = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150],
			L = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925],
			D = function(t) {
				if (! (this instanceof D)) throw Error("AES must be instanitated with `new`");
				Object.defineProperty(this, "key", {
					value: n(t, !0)
				}),
				this._prepare()
			};
			D.prototype._prepare = function() {
				var t = h[this.key.length];
				if (null == t) throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
				this._Ke = [],
				this._Kd = [];
				for (var e = 0; e <= t; e++) this._Ke.push([0, 0, 0, 0]),
				this._Kd.push([0, 0, 0, 0]);
				for (var r, i = 4 * (t + 1), n = this.key.length / 4, a = s(this.key), e = 0; e < n; e++) r = e >> 2,
				this._Ke[r][e % 4] = a[e],
				this._Kd[t - r][e % 4] = a[e];
				for (var o, l = 0,
				u = n; u < i;) {
					if (o = a[n - 1], a[0] ^= p[o >> 16 & 255] << 24 ^ p[o >> 8 & 255] << 16 ^ p[255 & o] << 8 ^ p[o >> 24 & 255] ^ f[l] << 24, l += 1, 8 != n) for (var e = 1; e < n; e++) a[e] ^= a[e - 1];
					else {
						for (var e = 1; e < n / 2; e++) a[e] ^= a[e - 1];
						o = a[n / 2 - 1],
						a[n / 2] ^= p[255 & o] ^ p[o >> 8 & 255] << 8 ^ p[o >> 16 & 255] << 16 ^ p[o >> 24 & 255] << 24;
						for (var e = n / 2 + 1; e < n; e++) a[e] ^= a[e - 1]
					}
					for (var d, c, e = 0; e < n && u < i;) d = u >> 2,
					c = u % 4,
					this._Ke[d][c] = a[e],
					this._Kd[t - d][c] = a[e++],
					u++
				}
				for (var d = 1; d < t; d++) for (var c = 0; c < 4; c++) o = this._Kd[d][c],
				this._Kd[d][c] = A[o >> 24 & 255] ^ R[o >> 16 & 255] ^ w[o >> 8 & 255] ^ L[255 & o]
			},
			D.prototype.encrypt = function(t) {
				if (16 != t.length) throw new Error("invalid plaintext size (must be 16 bytes)");
				for (var e = this._Ke.length - 1,
				r = [0, 0, 0, 0], i = s(t), n = 0; n < 4; n++) i[n] ^= this._Ke[0][n];
				for (var o = 1; o < e; o++) {
					for (var n = 0; n < 4; n++) r[n] = g[i[n] >> 24 & 255] ^ y[i[(n + 1) % 4] >> 16 & 255] ^ m[i[(n + 2) % 4] >> 8 & 255] ^ b[255 & i[(n + 3) % 4]] ^ this._Ke[o][n];
					i = r.slice()
				}
				for (var l, u = a(16), n = 0; n < 4; n++) l = this._Ke[e][n],
				u[4 * n] = 255 & (p[i[n] >> 24 & 255] ^ l >> 24),
				u[4 * n + 1] = 255 & (p[i[(n + 1) % 4] >> 16 & 255] ^ l >> 16),
				u[4 * n + 2] = 255 & (p[i[(n + 2) % 4] >> 8 & 255] ^ l >> 8),
				u[4 * n + 3] = 255 & (p[255 & i[(n + 3) % 4]] ^ l);
				return u
			},
			D.prototype.decrypt = function(t) {
				if (16 != t.length) throw new Error("invalid ciphertext size (must be 16 bytes)");
				for (var e = this._Kd.length - 1,
				r = [0, 0, 0, 0], i = s(t), n = 0; n < 4; n++) i[n] ^= this._Kd[0][n];
				for (var o = 1; o < e; o++) {
					for (var n = 0; n < 4; n++) r[n] = E[i[n] >> 24 & 255] ^ T[i[(n + 3) % 4] >> 16 & 255] ^ S[i[(n + 2) % 4] >> 8 & 255] ^ _[255 & i[(n + 1) % 4]] ^ this._Kd[o][n];
					i = r.slice()
				}
				for (var l, u = a(16), n = 0; n < 4; n++) l = this._Kd[e][n],
				u[4 * n] = 255 & (v[i[n] >> 24 & 255] ^ l >> 24),
				u[4 * n + 1] = 255 & (v[i[(n + 3) % 4] >> 16 & 255] ^ l >> 16),
				u[4 * n + 2] = 255 & (v[i[(n + 2) % 4] >> 8 & 255] ^ l >> 8),
				u[4 * n + 3] = 255 & (v[255 & i[(n + 1) % 4]] ^ l);
				return u
			};
			var I = function(t) {
				if (! (this instanceof I)) throw Error("AES must be instanitated with `new`");
				this.description = "Electronic Code Block",
				this.name = "ecb",
				this._aes = new D(t)
			};
			I.prototype.encrypt = function(t) {
				if (t = n(t), t.length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
				for (var e = a(t.length), r = a(16), i = 0; i < t.length; i += 16) o(t, r, 0, i, i + 16),
				r = this._aes.encrypt(r),
				o(r, e, i);
				return e
			},
			I.prototype.decrypt = function(t) {
				if (t = n(t), t.length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
				for (var e = a(t.length), r = a(16), i = 0; i < t.length; i += 16) o(t, r, 0, i, i + 16),
				r = this._aes.decrypt(r),
				o(r, e, i);
				return e
			};
			var k = function(t, e) {
				if (! (this instanceof k)) throw Error("AES must be instanitated with `new`");
				if (this.description = "Cipher Block Chaining", this.name = "cbc", e) {
					if (16 != e.length) throw new Error("invalid initialation vector size (must be 16 bytes)")
				} else e = a(16);
				this._lastCipherblock = n(e, !0),
				this._aes = new D(t)
			};
			k.prototype.encrypt = function(t) {
				if (t = n(t), t.length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
				for (var e = a(t.length), r = a(16), i = 0; i < t.length; i += 16) {
					o(t, r, 0, i, i + 16);
					for (var s = 0; s < 16; s++) r[s] ^= this._lastCipherblock[s];
					this._lastCipherblock = this._aes.encrypt(r),
					o(this._lastCipherblock, e, i)
				}
				return e
			},
			k.prototype.decrypt = function(t) {
				if (t = n(t), t.length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
				for (var e = a(t.length), r = a(16), i = 0; i < t.length; i += 16) {
					o(t, r, 0, i, i + 16),
					r = this._aes.decrypt(r);
					for (var s = 0; s < 16; s++) e[i + s] = r[s] ^ this._lastCipherblock[s];
					o(t, this._lastCipherblock, 0, i, i + 16)
				}
				return e
			};
			var O = function(t, e, r) {
				if (! (this instanceof O)) throw Error("AES must be instanitated with `new`");
				if (this.description = "Cipher Feedback", this.name = "cfb", e) {
					if (16 != e.length) throw new Error("invalid initialation vector size (must be 16 size)")
				} else e = a(16);
				r || (r = 1),
				this.segmentSize = r,
				this._shiftRegister = n(e, !0),
				this._aes = new D(t)
			};
			O.prototype.encrypt = function(t) {
				if (t.length % this.segmentSize != 0) throw new Error("invalid plaintext size (must be segmentSize bytes)");
				for (var e, r = n(t, !0), i = 0; i < r.length; i += this.segmentSize) {
					e = this._aes.encrypt(this._shiftRegister);
					for (var a = 0; a < this.segmentSize; a++) r[i + a] ^= e[a];
					o(this._shiftRegister, this._shiftRegister, 0, this.segmentSize),
					o(r, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize)
				}
				return r
			},
			O.prototype.decrypt = function(t) {
				if (t.length % this.segmentSize != 0) throw new Error("invalid ciphertext size (must be segmentSize bytes)");
				for (var e, r = n(t, !0), i = 0; i < r.length; i += this.segmentSize) {
					e = this._aes.encrypt(this._shiftRegister);
					for (var a = 0; a < this.segmentSize; a++) r[i + a] ^= e[a];
					o(this._shiftRegister, this._shiftRegister, 0, this.segmentSize),
					o(t, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize)
				}
				return r
			};
			var C = function(t, e) {
				if (! (this instanceof C)) throw Error("AES must be instanitated with `new`");
				if (this.description = "Output Feedback", this.name = "ofb", e) {
					if (16 != e.length) throw new Error("invalid initialation vector size (must be 16 bytes)")
				} else e = a(16);
				this._lastPrecipher = n(e, !0),
				this._lastPrecipherIndex = 16,
				this._aes = new D(t)
			};
			C.prototype.encrypt = function(t) {
				for (var e = n(t, !0), r = 0; r < e.length; r++) 16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher), this._lastPrecipherIndex = 0),
				e[r] ^= this._lastPrecipher[this._lastPrecipherIndex++];
				return e
			},
			C.prototype.decrypt = C.prototype.encrypt;
			var P = function(t) {
				if (! (this instanceof P)) throw Error("Counter must be instanitated with `new`");
				0 === t || t || (t = 1),
				"number" == typeof t ? (this._counter = a(16), this.setValue(t)) : this.setBytes(t)
			};
			P.prototype.setValue = function(t) {
				if ("number" != typeof t || parseInt(t) != t) throw new Error("invalid counter value (must be an integer)");
				if (t > Number.MAX_SAFE_INTEGER) throw new Error("integer value out of safe range");
				for (var e = 15; e >= 0; --e) this._counter[e] = t % 256,
				t = parseInt(t / 256)
			},
			P.prototype.setBytes = function(t) {
				if (t = n(t, !0), 16 != t.length) throw new Error("invalid counter bytes size (must be 16 bytes)");
				this._counter = t
			},
			P.prototype.increment = function() {
				for (var t = 15; t >= 0; t--) {
					if (255 !== this._counter[t]) {
						this._counter[t]++;
						break
					}
					this._counter[t] = 0
				}
			};
			var x = function(t, e) {
				if (! (this instanceof x)) throw Error("AES must be instanitated with `new`");
				this.description = "Counter",
				this.name = "ctr",
				e instanceof P || (e = new P(e)),
				this._counter = e,
				this._remainingCounter = null,
				this._remainingCounterIndex = 16,
				this._aes = new D(t)
			};
			x.prototype.encrypt = function(t) {
				for (var e = n(t, !0), r = 0; r < e.length; r++) 16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter), this._remainingCounterIndex = 0, this._counter.increment()),
				e[r] ^= this._remainingCounter[this._remainingCounterIndex++];
				return e
			},
			x.prototype.decrypt = x.prototype.encrypt;
			var F = {
				AES: D,
				Counter: P,
				ModeOfOperation: {
					ecb: I,
					cbc: k,
					cfb: O,
					ofb: C,
					ctr: x
				},
				utils: {
					hex: c,
					utf8: d
				},
				padding: {
					pkcs7: {
						pad: l,
						strip: u
					}
				},
				_arrayTest: {
					coerceArray: n,
					createArray: a,
					copyArray: o
				}
			};
			t.exports = F
		} ()
	},
	"40": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(11),
		a = function() {
			function t(e, r, a, o) {
				i(this, t),
				this.decryptdata = a,
				this.discardEPB = o,
				this.decrypter = new n.a(e, r, {
					removePKCS7Padding: !1
				})
			}
			return t.prototype.decryptBuffer = function(t, e) {
				this.decrypter.decrypt(t, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, e)
			},
			t.prototype.decryptAacSample = function(t, e, r, i) {
				var n = t[e].unit,
				a = n.subarray(16, n.length - n.length % 16),
				o = a.buffer.slice(a.byteOffset, a.byteOffset + a.length),
				s = this;
				this.decryptBuffer(o,
				function(a) {
					a = new Uint8Array(a),
					n.set(a, 16),
					i || s.decryptAacSamples(t, e + 1, r)
				})
			},
			t.prototype.decryptAacSamples = function(t, e, r) {
				for (;; e++) {
					if (e >= t.length) return void r();
					if (! (t[e].unit.length < 32)) {
						var i = this.decrypter.isSync();
						if (this.decryptAacSample(t, e, r, i), !i) return
					}
				}
			},
			t.prototype.getAvcEncryptedData = function(t) {
				for (var e = 16 * Math.floor((t.length - 48) / 160) + 16, r = new Int8Array(e), i = 0, n = 32; n <= t.length - 16; n += 160, i += 16) r.set(t.subarray(n, n + 16), i);
				return r
			},
			t.prototype.getAvcDecryptedUnit = function(t, e) {
				e = new Uint8Array(e);
				for (var r = 0,
				i = 32; i <= t.length - 16; i += 160, r += 16) t.set(e.subarray(r, r + 16), i);
				return t
			},
			t.prototype.decryptAvcSample = function(t, e, r, i, n, a) {
				var o = this.discardEPB(n.data),
				s = this.getAvcEncryptedData(o),
				l = this;
				this.decryptBuffer(s.buffer,
				function(s) {
					n.data = l.getAvcDecryptedUnit(o, s),
					a || l.decryptAvcSamples(t, e, r + 1, i)
				})
			},
			t.prototype.decryptAvcSamples = function(t, e, r, i) {
				for (;; e++, r = 0) {
					if (e >= t.length) return void i();
					for (var n = t[e].units; ! (r >= n.length); r++) {
						var a = n[r];
						if (! (a.length <= 48 || 1 !== a.type && 5 !== a.type)) {
							var o = this.decrypter.isSync();
							if (this.decryptAvcSample(t, e, r, i, a, o), !o) return
						}
					}
				}
			},
			t
		} ();
		e.a = a
	},
	"11": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(34),
		a = r(35),
		o = r(36),
		s = r(2),
		l = r(0),
		u = function() {
			function t(e, r) {
				var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
				a = n.removePKCS7Padding,
				o = void 0 === a || a;
				if (i(this, t), this.logEnabled = !0, this.observer = e, this.config = r, this.removePKCS7Padding = o, o) try {
					var s = crypto || self.crypto;
					this.subtle = s.subtle || s.webkitSubtle
				} catch(t) {}
				this.disableWebCrypto = !this.subtle
			}
			return t.prototype.isSync = function() {
				return this.disableWebCrypto && this.config.enableSoftwareAES
			},
			t.prototype.decrypt = function(t, e, r, i) {
				var s = this;
				if (this.disableWebCrypto && this.config.enableSoftwareAES) {
					this.logEnabled && (l.b.log("JS AES decrypt"), this.logEnabled = !1);
					var u = this.decryptor;
					u || (this.decryptor = u = new o.a),
					u.expandKey(e),
					i(u.decrypt(t, 0, r, this.removePKCS7Padding))
				} else {
					this.logEnabled && (l.b.log("WebCrypto AES decrypt"), this.logEnabled = !1);
					var d = this.subtle;
					this.key !== e && (this.key = e, this.fastAesKey = new a.a(d, e)),
					this.fastAesKey.expandKey().then(function(a) {
						new n.a(d, r).decrypt(t, a).
						catch(function(n) {
							s.onWebCryptoError(n, t, e, r, i)
						}).then(function(t) {
							i(t)
						})
					}).
					catch(function(n) {
						s.onWebCryptoError(n, t, e, r, i)
					})
				}
			},
			t.prototype.onWebCryptoError = function(t, e, r, i, n) {
				this.config.enableSoftwareAES ? (l.b.log("WebCrypto Error, disable WebCrypto API"), this.disableWebCrypto = !0, this.logEnabled = !0, this.decrypt(e, r, i, n)) : (l.b.error("decrypting error : " + t.message), this.observer.trigger(Event.ERROR, {
					type: s.b.MEDIA_ERROR,
					details: s.a.FRAG_DECRYPT_ERROR,
					fatal: !0,
					reason: t.message
				}))
			},
			t.prototype.destroy = function() {
				var t = this.decryptor;
				t && (t.destroy(), this.decryptor = void 0)
			},
			t
		} ();
		e.a = u
	},
	"36": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		function n(t) {
			var e = t.byteLength,
			r = e && new DataView(t).getUint8(e - 1);
			return r ? t.slice(0, e - r) : t
		}
		var a = function() {
			function t() {
				i(this, t),
				this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
				this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
				this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
				this.sBox = new Uint32Array(256),
				this.invSBox = new Uint32Array(256),
				this.key = new Uint32Array(0),
				this.initTable()
			}
			return t.prototype.uint8ArrayToUint32Array_ = function(t) {
				for (var e = new DataView(t), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = e.getUint32(4 * i);
				return r
			},
			t.prototype.initTable = function() {
				var t = this.sBox,
				e = this.invSBox,
				r = this.subMix,
				i = r[0],
				n = r[1],
				a = r[2],
				o = r[3],
				s = this.invSubMix,
				l = s[0],
				u = s[1],
				d = s[2],
				c = s[3],
				h = new Uint32Array(256),
				f = 0,
				p = 0,
				v = 0;
				for (v = 0; v < 256; v++) h[v] = v < 128 ? v << 1 : v << 1 ^ 283;
				for (v = 0; v < 256; v++) {
					var g = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4;
					g = g >>> 8 ^ 255 & g ^ 99,
					t[f] = g,
					e[g] = f;
					var y = h[f],
					m = h[y],
					b = h[m],
					E = 257 * h[g] ^ 16843008 * g;
					i[f] = E << 24 | E >>> 8,
					n[f] = E << 16 | E >>> 16,
					a[f] = E << 8 | E >>> 24,
					o[f] = E,
					E = 16843009 * b ^ 65537 * m ^ 257 * y ^ 16843008 * f,
					l[g] = E << 24 | E >>> 8,
					u[g] = E << 16 | E >>> 16,
					d[g] = E << 8 | E >>> 24,
					c[g] = E,
					f ? (f = y ^ h[h[h[b ^ y]]], p ^= h[h[p]]) : f = p = 1
				}
			},
			t.prototype.expandKey = function(t) {
				for (var e = this.uint8ArrayToUint32Array_(t), r = !0, i = 0; i < e.length && r;) r = e[i] === this.key[i],
				i++;
				if (!r) {
					this.key = e;
					var n = this.keySize = e.length;
					if (4 !== n && 6 !== n && 8 !== n) throw new Error("Invalid aes key size=" + n);
					var a = this.ksRows = 4 * (n + 6 + 1),
					o = void 0,
					s = void 0,
					l = this.keySchedule = new Uint32Array(a),
					u = this.invKeySchedule = new Uint32Array(a),
					d = this.sBox,
					c = this.rcon,
					h = this.invSubMix,
					f = h[0],
					p = h[1],
					v = h[2],
					g = h[3],
					y = void 0,
					m = void 0;
					for (o = 0; o < a; o++) o < n ? y = l[o] = e[o] : (m = y, o % n == 0 ? (m = m << 8 | m >>> 24, m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m], m ^= c[o / n | 0] << 24) : n > 6 && o % n == 4 && (m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m]), l[o] = y = (l[o - n] ^ m) >>> 0);
					for (s = 0; s < a; s++) o = a - s,
					m = 3 & s ? l[o] : l[o - 4],
					u[s] = s < 4 || o <= 4 ? m: f[d[m >>> 24]] ^ p[d[m >>> 16 & 255]] ^ v[d[m >>> 8 & 255]] ^ g[d[255 & m]],
					u[s] = u[s] >>> 0
				}
			},
			t.prototype.networkToHostOrderSwap = function(t) {
				return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24
			},
			t.prototype.decrypt = function(t, e, r, i) {
				for (var a = this.keySize + 6,
				o = this.invKeySchedule,
				s = this.invSBox,
				l = this.invSubMix,
				u = l[0], d = l[1], c = l[2], h = l[3], f = this.uint8ArrayToUint32Array_(r), p = f[0], v = f[1], g = f[2], y = f[3], m = new Int32Array(t), b = new Int32Array(m.length), E = void 0, T = void 0, S = void 0, _ = void 0, A = void 0, R = void 0, w = void 0, L = void 0, D = void 0, I = void 0, k = void 0, O = void 0, C = void 0, P = void 0, x = this.networkToHostOrderSwap; e < m.length;) {
					for (D = x(m[e]), I = x(m[e + 1]), k = x(m[e + 2]), O = x(m[e + 3]), A = D ^ o[0], R = O ^ o[1], w = k ^ o[2], L = I ^ o[3], C = 4, P = 1; P < a; P++) E = u[A >>> 24] ^ d[R >> 16 & 255] ^ c[w >> 8 & 255] ^ h[255 & L] ^ o[C],
					T = u[R >>> 24] ^ d[w >> 16 & 255] ^ c[L >> 8 & 255] ^ h[255 & A] ^ o[C + 1],
					S = u[w >>> 24] ^ d[L >> 16 & 255] ^ c[A >> 8 & 255] ^ h[255 & R] ^ o[C + 2],
					_ = u[L >>> 24] ^ d[A >> 16 & 255] ^ c[R >> 8 & 255] ^ h[255 & w] ^ o[C + 3],
					A = E,
					R = T,
					w = S,
					L = _,
					C += 4;
					E = s[A >>> 24] << 24 ^ s[R >> 16 & 255] << 16 ^ s[w >> 8 & 255] << 8 ^ s[255 & L] ^ o[C],
					T = s[R >>> 24] << 24 ^ s[w >> 16 & 255] << 16 ^ s[L >> 8 & 255] << 8 ^ s[255 & A] ^ o[C + 1],
					S = s[w >>> 24] << 24 ^ s[L >> 16 & 255] << 16 ^ s[A >> 8 & 255] << 8 ^ s[255 & R] ^ o[C + 2],
					_ = s[L >>> 24] << 24 ^ s[A >> 16 & 255] << 16 ^ s[R >> 8 & 255] << 8 ^ s[255 & w] ^ o[C + 3],
					C += 3,
					b[e] = x(E ^ p),
					b[e + 1] = x(_ ^ v),
					b[e + 2] = x(S ^ g),
					b[e + 3] = x(T ^ y),
					p = D,
					v = I,
					g = k,
					y = O,
					e += 4
				}
				return i ? n(b.buffer) : b.buffer
			},
			t.prototype.destroy = function() {
				this.key = void 0,
				this.keySize = void 0,
				this.ksRows = void 0,
				this.sBox = void 0,
				this.invSBox = void 0,
				this.subMix = void 0,
				this.invSubMix = void 0,
				this.keySchedule = void 0,
				this.invKeySchedule = void 0,
				this.rcon = void 0
			},
			t
		} ();
		e.a = a
	},
	"35": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = function() {
			function t(e, r) {
				i(this, t),
				this.subtle = e,
				this.key = r
			}
			return t.prototype.expandKey = function() {
				return this.subtle.importKey("raw", this.key, {
					name: "AES-CBC"
				},
				!1, ["encrypt", "decrypt"])
			},
			t
		} ();
		e.a = n
	},
	"34": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = function() {
			function t(e, r) {
				i(this, t),
				this.subtle = e,
				this.aesIV = r
			}
			return t.prototype.decrypt = function(t, e) {
				return this.subtle.decrypt({
					name: "AES-CBC",
					iv: this.aesIV
				},
				e, t)
			},
			t
		} ();
		e.a = n
	},
	"39": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(0),
		a = function() {
			function t(e) {
				i(this, t),
				this.data = e,
				this.bytesAvailable = e.byteLength,
				this.word = 0,
				this.bitsAvailable = 0
			}
			return t.prototype.loadWord = function() {
				var t = this.data,
				e = this.bytesAvailable,
				r = t.byteLength - e,
				i = new Uint8Array(4),
				n = Math.min(4, e);
				if (0 === n) throw new Error("no bytes available");
				i.set(t.subarray(r, r + n)),
				this.word = new DataView(i.buffer).getUint32(0),
				this.bitsAvailable = 8 * n,
				this.bytesAvailable -= n
			},
			t.prototype.skipBits = function(t) {
				var e = void 0;
				this.bitsAvailable > t ? (this.word <<= t, this.bitsAvailable -= t) : (t -= this.bitsAvailable, e = t >> 3, t -= e >> 3, this.bytesAvailable -= e, this.loadWord(), this.word <<= t, this.bitsAvailable -= t)
			},
			t.prototype.readBits = function(t) {
				var e = Math.min(this.bitsAvailable, t),
				r = this.word >>> 32 - e;
				return t > 32 && n.b.error("Cannot read more than 32 bits at a time"),
				this.bitsAvailable -= e,
				this.bitsAvailable > 0 ? this.word <<= e: this.bytesAvailable > 0 && this.loadWord(),
				e = t - e,
				e > 0 && this.bitsAvailable ? r << e | this.readBits(e) : r
			},
			t.prototype.skipLZ = function() {
				var t = void 0;
				for (t = 0; t < this.bitsAvailable; ++t) if (0 != (this.word & 2147483648 >>> t)) return this.word <<= t,
				this.bitsAvailable -= t,
				t;
				return this.loadWord(),
				t + this.skipLZ()
			},
			t.prototype.skipUEG = function() {
				this.skipBits(1 + this.skipLZ())
			},
			t.prototype.skipEG = function() {
				this.skipBits(1 + this.skipLZ())
			},
			t.prototype.readUEG = function() {
				var t = this.skipLZ();
				return this.readBits(t + 1) - 1
			},
			t.prototype.readEG = function() {
				var t = this.readUEG();
				return 1 & t ? 1 + t >>> 1 : -1 * (t >>> 1)
			},
			t.prototype.readBoolean = function() {
				return 1 === this.readBits(1)
			},
			t.prototype.readUByte = function() {
				return this.readBits(8)
			},
			t.prototype.readUShort = function() {
				return this.readBits(16)
			},
			t.prototype.readUInt = function() {
				return this.readBits(32)
			},
			t.prototype.skipScalingList = function(t) {
				var e = 8,
				r = 8,
				i = void 0,
				n = void 0;
				for (i = 0; i < t; i++) 0 !== r && (n = this.readEG(), r = (e + n + 256) % 256),
				e = 0 === r ? e: r
			},
			t.prototype.readSPS = function() {
				var t = 0,
				e = 0,
				r = 0,
				i = 0,
				n = void 0,
				a = void 0,
				o = void 0,
				s = void 0,
				l = void 0,
				u = void 0,
				d = void 0,
				c = this.readUByte.bind(this),
				h = this.readBits.bind(this),
				f = this.readUEG.bind(this),
				p = this.readBoolean.bind(this),
				v = this.skipBits.bind(this),
				g = this.skipEG.bind(this),
				y = this.skipUEG.bind(this),
				m = this.skipScalingList.bind(this);
				if (c(), n = c(), h(5), v(3), c(), y(), 100 === n || 110 === n || 122 === n || 244 === n || 44 === n || 83 === n || 86 === n || 118 === n || 128 === n) {
					var b = f();
					if (3 === b && v(1), y(), y(), v(1), p()) for (u = 3 !== b ? 8 : 12, d = 0; d < u; d++) p() && m(d < 6 ? 16 : 64)
				}
				y();
				var E = f();
				if (0 === E) f();
				else if (1 === E) for (v(1), g(), g(), a = f(), d = 0; d < a; d++) g();
				y(),
				v(1),
				o = f(),
				s = f(),
				l = h(1),
				0 === l && v(1),
				v(1),
				p() && (t = f(), e = f(), r = f(), i = f());
				var T = [1, 1];
				if (p() && p()) {
					switch (c()) {
					case 1:
						T = [1, 1];
						break;
					case 2:
						T = [12, 11];
						break;
					case 3:
						T = [10, 11];
						break;
					case 4:
						T = [16, 11];
						break;
					case 5:
						T = [40, 33];
						break;
					case 6:
						T = [24, 11];
						break;
					case 7:
						T = [20, 11];
						break;
					case 8:
						T = [32, 11];
						break;
					case 9:
						T = [80, 33];
						break;
					case 10:
						T = [18, 11];
						break;
					case 11:
						T = [15, 11];
						break;
					case 12:
						T = [64, 33];
						break;
					case 13:
						T = [160, 99];
						break;
					case 14:
						T = [4, 3];
						break;
					case 15:
						T = [3, 2];
						break;
					case 16:
						T = [2, 1];
						break;
					case 255:
						T = [c() << 8 | c(), c() << 8 | c()]
					}
				}
				return {
					width: Math.ceil(16 * (o + 1) - 2 * t - 2 * e),
					height: (2 - l) * (s + 1) * 16 - (l ? 2 : 4) * (r + i),
					pixelRatio: T
				}
			},
			t.prototype.readSliceType = function() {
				return this.readUByte(),
				this.readUEG(),
				this.readUEG()
			},
			t
		} ();
		e.a = a
	},
	"20": function(t, e, r) {
		"use strict";
		function i(t, e, r, i) {
			var n = void 0,
			a = void 0,
			o = void 0,
			s = void 0,
			l = void 0,
			u = navigator.userAgent.toLowerCase(),
			d = i,
			c = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
			return n = 1 + ((192 & e[r + 2]) >>> 6),
			(a = (60 & e[r + 2]) >>> 2) > c.length - 1 ? void t.trigger(Event.ERROR, {
				type: p.b.MEDIA_ERROR,
				details: p.a.FRAG_PARSING_ERROR,
				fatal: !0,
				reason: "invalid ADTS sampling index:" + a
			}) : (s = (1 & e[r + 2]) << 2, s |= (192 & e[r + 3]) >>> 6, f.b.log("manifest codec:" + i + ",ADTS data:type:" + n + ",sampleingIndex:" + a + "[" + c[a] + "Hz],channelConfig:" + s), /firefox/i.test(u) ? a >= 6 ? (n = 5, l = new Array(4), o = a - 3) : (n = 2, l = new Array(2), o = a) : -1 !== u.indexOf("android") ? (n = 2, l = new Array(2), o = a) : (n = 5, l = new Array(4), i && ( - 1 !== i.indexOf("mp4a.40.29") || -1 !== i.indexOf("mp4a.40.5")) || !i && a >= 6 ? o = a - 3 : ((i && -1 !== i.indexOf("mp4a.40.2") && (a >= 6 && 1 === s || /vivaldi/i.test(u)) || !i && 1 === s) && (n = 2, l = new Array(2)), o = a)), l[0] = n << 3, l[0] |= (14 & a) >> 1, l[1] |= (1 & a) << 7, l[1] |= s << 3, 5 === n && (l[1] |= (14 & o) >> 1, l[2] = (1 & o) << 7, l[2] |= 8, l[3] = 0), {
				config: l,
				samplerate: c[a],
				channelCount: s,
				codec: "mp4a.40." + n,
				manifestCodec: d
			})
		}
		function n(t, e) {
			return 255 === t[e] && 240 == (246 & t[e + 1])
		}
		function a(t, e) {
			return 1 & t[e + 1] ? 7 : 9
		}
		function o(t, e) {
			return (3 & t[e + 3]) << 11 | t[e + 4] << 3 | (224 & t[e + 5]) >>> 5
		}
		function s(t, e) {
			return !! (e + 1 < t.length && n(t, e))
		}
		function l(t, e) {
			if (e + 1 < t.length && n(t, e)) {
				var r = a(t, e),
				i = r;
				e + 5 < t.length && (i = o(t, e));
				var s = e + i;
				if (s === t.length || s + 1 < t.length && n(t, s)) return ! 0
			}
			return ! 1
		}
		function u(t, e, r, n, a) {
			if (!t.samplerate) {
				var o = i(e, r, n, a);
				t.config = o.config,
				t.samplerate = o.samplerate,
				t.channelCount = o.channelCount,
				t.codec = o.codec,
				t.manifestCodec = o.manifestCodec,
				f.b.log("parsed codec:" + t.codec + ",rate:" + o.samplerate + ",nb channel:" + o.channelCount)
			}
		}
		function d(t) {
			return 9216e4 / t
		}
		function c(t, e, r, i, n) {
			var s = void 0,
			l = void 0,
			u = void 0,
			d = t.length;
			if (s = a(t, e), l = o(t, e), (l -= s) > 0 && e + s + l <= d) return u = r + i * n,
			{
				headerLength: s,
				frameLength: l,
				stamp: u
			}
		}
		function h(t, e, r, i, n) {
			var a = d(t.samplerate),
			o = c(e, r, i, n, a);
			if (o) {
				var s = o.stamp,
				l = o.headerLength,
				u = o.frameLength,
				h = {
					unit: e.subarray(r + l, r + l + u),
					pts: s,
					dts: s
				};
				return t.samples.push(h),
				t.len += u,
				{
					sample: h,
					length: u + l
				}
			}
		}
		e.d = s,
		e.e = l,
		e.c = u,
		e.b = d,
		e.a = h;
		var f = r(0),
		p = r(2)
	},
	"15": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(0),
		a = r(1),
		o = Math.pow(2, 32) - 1,
		s = function() {
			function t(e, r) {
				i(this, t),
				this.observer = e,
				this.remuxer = r
			}
			return t.prototype.resetTimeStamp = function(t) {
				this.initPTS = t
			},
			t.prototype.resetInitSegment = function(e, r, i, n) {
				if (e && e.byteLength) {
					var o = this.initData = t.parseInitSegment(e);
					null == r && (r = "mp4a.40.5"),
					null == i && (i = "avc1.42e01e");
					var s = {};
					o.audio && o.video ? s.audiovideo = {
						container: "video/mp4",
						codec: r + "," + i,
						initSegment: n ? e: null
					}: (o.audio && (s.audio = {
						container: "audio/mp4",
						codec: r,
						initSegment: n ? e: null
					}), o.video && (s.video = {
						container: "video/mp4",
						codec: i,
						initSegment: n ? e: null
					})),
					this.observer.trigger(a.a.FRAG_PARSING_INIT_SEGMENT, {
						tracks: s
					})
				} else r && (this.audioCodec = r),
				i && (this.videoCodec = i)
			},
			t.probe = function(e) {
				return t.findBox({
					data: e,
					start: 0,
					end: Math.min(e.length, 16384)
				},
				["moof"]).length > 0
			},
			t.bin2str = function(t) {
				return String.fromCharCode.apply(null, t)
			},
			t.readUint16 = function(t, e) {
				t.data && (e += t.start, t = t.data);
				var r = t[e] << 8 | t[e + 1];
				return r < 0 ? 65536 + r: r
			},
			t.readUint32 = function(t, e) {
				t.data && (e += t.start, t = t.data);
				var r = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3];
				return r < 0 ? 4294967296 + r: r
			},
			t.writeUint32 = function(t, e, r) {
				t.data && (e += t.start, t = t.data),
				t[e] = r >> 24,
				t[e + 1] = r >> 16 & 255,
				t[e + 2] = r >> 8 & 255,
				t[e + 3] = 255 & r
			},
			t.findBox = function(e, r) {
				var i = [],
				n = void 0,
				a = void 0,
				o = void 0,
				s = void 0,
				l = void 0,
				u = void 0,
				d = void 0;
				if (e.data ? (u = e.start, s = e.end, e = e.data) : (u = 0, s = e.byteLength), !r.length) return null;
				for (n = u; n < s;) a = t.readUint32(e, n),
				o = t.bin2str(e.subarray(n + 4, n + 8)),
				d = a > 1 ? n + a: s,
				o === r[0] && (1 === r.length ? i.push({
					data: e,
					start: n + 8,
					end: d
				}) : (l = t.findBox({
					data: e,
					start: n + 8,
					end: d
				},
				r.slice(1)), l.length && (i = i.concat(l)))),
				n = d;
				return i
			},
			t.parseSegmentIndex = function(e) {
				var r = t.findBox(e, ["moov"])[0],
				i = r ? r.end: null,
				n = 0,
				a = t.findBox(e, ["sidx"]),
				o = void 0;
				if (!a || !a[0]) return null;
				o = [],
				a = a[0];
				var s = a.data[0];
				n = 0 === s ? 8 : 16;
				var l = t.readUint32(a, n);
				n += 4;
				n += 0 === s ? 8 : 16,
				n += 2;
				var u = a.end + 0,
				d = t.readUint16(a, n);
				n += 2;
				for (var c = 0; c < d; c++) {
					var h = n,
					f = t.readUint32(a, h);
					h += 4;
					var p = 2147483647 & f;
					if (1 === (2147483648 & f) >>> 31) return void console.warn("SIDX has hierarchical references (not supported)");
					var v = t.readUint32(a, h);
					h += 4,
					o.push({
						referenceSize: p,
						subsegmentDuration: v,
						info: {
							duration: v / l,
							start: u,
							end: u + p - 1
						}
					}),
					u += p,
					h += 4,
					n = h
				}
				return {
					earliestPresentationTime: 0,
					timescale: l,
					version: s,
					referencesCount: d,
					references: o,
					moovEndOffset: i
				}
			},
			t.parseInitSegment = function(e) {
				var r = [];
				return t.findBox(e, ["moov", "trak"]).forEach(function(e) {
					var i = t.findBox(e, ["tkhd"])[0];
					if (i) {
						var a = i.data[i.start],
						o = 0 === a ? 12 : 20,
						s = t.readUint32(i, o),
						l = t.findBox(e, ["mdia", "mdhd"])[0];
						if (l) {
							a = l.data[l.start],
							o = 0 === a ? 12 : 20;
							var u = t.readUint32(l, o),
							d = t.findBox(e, ["mdia", "hdlr"])[0];
							if (d) {
								var c = t.bin2str(d.data.subarray(d.start + 8, d.start + 12)),
								h = {
									soun: "audio",
									vide: "video"
								} [c];
								if (h) {
									var f = t.findBox(e, ["mdia", "minf", "stbl", "stsd"]);
									if (f.length) {
										f = f[0];
										var p = t.bin2str(f.data.subarray(f.start + 12, f.start + 16));
										n.b.log("MP4Demuxer:" + h + ":" + p + " found")
									}
									r[s] = {
										timescale: u,
										type: h
									},
									r[h] = {
										timescale: u,
										id: s
									}
								}
							}
						}
					}
				}),
				r
			},
			t.getStartDTS = function(e, r) {
				var i = void 0,
				n = void 0,
				a = void 0;
				return i = t.findBox(r, ["moof", "traf"]),
				n = [].concat.apply([], i.map(function(r) {
					return t.findBox(r, ["tfhd"]).map(function(i) {
						var n = void 0,
						a = void 0;
						return n = t.readUint32(i, 4),
						a = e[n].timescale || 9e4,
						t.findBox(r, ["tfdt"]).map(function(e) {
							var r = void 0,
							i = void 0;
							return r = e.data[e.start],
							i = t.readUint32(e, 4),
							1 === r && (i *= Math.pow(2, 32), i += t.readUint32(e, 8)),
							i
						})[0] / a
					})
				})),
				a = Math.min.apply(null, n),
				isFinite(a) ? a: 0
			},
			t.offsetStartDTS = function(e, r, i) {
				t.findBox(r, ["moof", "traf"]).map(function(r) {
					return t.findBox(r, ["tfhd"]).map(function(n) {
						var a = t.readUint32(n, 4),
						s = e[a].timescale || 9e4;
						t.findBox(r, ["tfdt"]).map(function(e) {
							var r = e.data[e.start],
							n = t.readUint32(e, 4);
							if (0 === r) t.writeUint32(e, 4, n - i * s);
							else {
								n *= Math.pow(2, 32),
								n += t.readUint32(e, 8),
								n -= i * s,
								n = Math.max(n, 0);
								var a = Math.floor(n / (o + 1)),
								l = Math.floor(n % (o + 1));
								t.writeUint32(e, 4, a),
								t.writeUint32(e, 8, l)
							}
						})
					})
				})
			},
			t.prototype.append = function(e, r, i, n) {
				var o = this.initData;
				o || (this.resetInitSegment(e, this.audioCodec, this.videoCodec, !1), o = this.initData);
				var s = void 0,
				l = this.initPTS;
				if (void 0 === l) {
					var u = t.getStartDTS(o, e);
					this.initPTS = l = u - r,
					this.observer.trigger(a.a.INIT_PTS_FOUND, {
						initPTS: l
					})
				}
				t.offsetStartDTS(o, e, l),
				s = t.getStartDTS(o, e),
				this.remuxer.remux(o.audio, o.video, null, null, s, i, n, e)
			},
			t.prototype.destroy = function() {},
			t
		} ();
		e.a = s
	},
	"37": function(t, e, r) {
		"use strict";
		function i(t, e) {
			if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		var n = r(20),
		a = r(0),
		o = r(6),
		s = function() {
			function t(e, r, n) {
				i(this, t),
				this.observer = e,
				this.config = n,
				this.remuxer = r
			}
			return t.prototype.resetInitSegment = function(t, e, r, i) {
				this._audioTrack = {
					container: "audio/adts",
					type: "audio",
					id: 0,
					sequenceNumber: 0,
					isAAC: !0,
					samples: [],
					len: 0,
					manifestCodec: e,
					duration: i,
					inputTimeScale: 9e4
				}
			},
			t.prototype.resetTimeStamp = function() {},
			t.probe = function(t) {
				if (!t) return ! 1;
				for (var e = o.a.getID3Data(t, 0) || [], r = e.length, i = t.length; r < i; r++) if (n.e(t, r)) return a.b.log("ADTS sync word found !"),
				!0;
				return ! 1
			},
			t.prototype.append = function(t, e, r, i) {
				for (var s = this._audioTrack,
				l = o.a.getID3Data(t, 0) || [], u = o.a.getTimeStamp(l), d = u ? 90 * u: 9e4 * e, c = 0, h = d, f = t.length, p = l.length, v = [{
					pts: h,
					dts: h,
					data: l
				}]; p < f - 1;) if (n.d(t, p) && p + 5 < f) {
					n.c(s, this.observer, t, p, s.manifestCodec);
					var g = n.a(s, t, p, d, c);
					if (!g) {
						a.b.log("Unable to parse AAC frame");
						break
					}
					p += g.length,
					h = g.sample.pts,
					c++
				} else o.a.isHeader(t, p) ? (l = o.a.getID3Data(t, p), v.push({
					pts: h,
					dts: h,
					data: l
				}), p += l.length) : p++;
				this.remuxer.remux(s, {
					samples: []
				},
				{
					samples: v,
					inputTimeScale: 9e4
				},
				{
					samples: []
				},
				e, r, i)
			},
			t.prototype.destroy = function() {},
			t
		} ();
		e.a = s
	}
})(self);