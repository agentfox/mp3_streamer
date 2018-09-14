! function (a, b) {
    function c(a) {
        for (var b = this; b && (!b.matches || !b.matches(a));) b = b.parentNode;
        return b
    }

    function d(a) {
        return a.toString()
    }

    function e(a) {
        var b = a.getBoundingClientRect(),
            c = window.getComputedStyle(a);
        return b.top + a.clientTop + parseInt(c["padding-top"]) || 0
    }

    function f(a, b) {
        var c, d, f = a.getClientRects();
        if (!f.length) return null;
        var g = f[f.length - 1],
            h = b.lineHeight,
            i = a.endContainer.parentElement,
            j = e(p.getElement(i));
        return d = a.getBoundingClientRect().bottom, c = d - j < 1.5 * b.assumedLineHeight ? j : h ? d - h : g.top, {
            left: g.left,
            right: g.right,
            top: c,
            bottom: d,
            height: d - c,
            width: g.width
        }
    }

    function g(a) {
        if (a.rangeCount) {
            var b = a.getRangeAt(a.rangeCount - 1),
                c = h(a);
            return f(b, c)
        }
        return null
    }

    function h(a) {
        var b = p.getElement(a);
        if (!b) return {
            background: "highlight"
        };
        var c = window.getComputedStyle(b).backgroundColor,
            d = window.getComputedStyle(b, "::selection"),
            e = parseInt(d.lineHeight),
            f = e,
            g = d.backgroundColor,
            h = d.color,
            i = window.navigator.userAgent.match(/Windows/i);
        return ("rgba(0, 0, 0, 0)" === g || g === c) && (g = i ? "#328efe" : "highlight"), isNaN(f) && (f = 1.14 * parseInt(d.fontSize)), {
            lineHeight: e,
            assumedLineHeight: f,
            background: g,
            color: h
        }
    }

    function i(a) {
        var b = document.body,
            c = document.documentElement,
            d = document.createElement("div");
        d.style.paddingLeft = d.style.width = "1px", b.appendChild(d);
        var e = 2 == d.offsetWidth;
        b.removeChild(d), d = a.getBoundingClientRect();
        var f = c.clientTop || b.clientTop || 0,
            g = c.clientLeft || b.clientLeft || 0,
            h = window.pageYOffset || e && c.scrollTop || b.scrollTop,
            i = window.pageXOffset || e && c.scrollLeft || b.scrollLeft;
        return {
            top: d.top + h - f,
            left: d.left + i - g
        }
    }

    function j(a) {
        const b = ["direction", "font-family", "font-size", "font-size-adjust", "font-variant", "font-weight", "font-style", "letter-spacing", "line-height", "text-align", "text-indent", "text-transform", "word-wrap", "word-spacing"];
        for (var c = "white-space:pre;padding:0;margin:0;", d = 0; d < b.length; d++) {
            var e = b[d];
            c += e + ":" + a.getPropertyValue(e) + ";"
        }
        return c
    }

    function k(a, b, c) {
        var d = document.createElement("span");
        return d.style.cssText = b, d.textContent = c, a.appendChild(d), d
    }

    function l(a, b, c, d) {
        if (!(a && "value" in a)) return null;
        if (b >= c) return null;
        var e = window.getComputedStyle(a),
            f = i(a),
            g = f.top,
            h = f.left,
            l = parseFloat(e.width),
            m = parseFloat(e.height);
        g += parseFloat(e["padding-top"]), g += parseFloat(e["border-top-width"]), h += parseFloat(e["padding-left"]), h += parseFloat(e["border-left-width"]), h += 1;
        var n = j(e),
            o = a.value,
            p = o.length,
            q = document.createElement("div");
        b > 0 && k(q, n, o.substring(0, b));
        var r = k(q, n, o.substring(b, c));
        p > c && k(q, n, o.substring(c, p)), q.style.cssText = n, q.style.position = "absolute", q.style.top = g + "px", q.style.left = h + "px", q.style.width = l + "px", q.style.height = m + "px", document.body.appendChild(q);
        var s = r.getBoundingClientRect();
        return s = {
            bottom: s.bottom,
            top: s.top,
            height: s.height,
            left: s.left,
            right: s.right,
            width: s.width
        }, s.left -= a.scrollLeft, s.right -= a.scrollLeft, s.bottom -= a.scrollTop, s.top -= a.scrollTop, d || q.parentNode.removeChild(q), s
    }

    function m(a) {
        if ("true" === a.contentEditable) return !0;
        for (; a = a.parentNode;)
            if ("true" === a.contentEditable) return !0;
        return !1
    }

    function n() {
        function a(a) {
            a && chrome.runtime.sendMessage({
                type: "disable_menu"
            }), null !== h && (h.request.reject(), h = null), a || window.popup.hide()
        }

        function b(a) {
            j = {
                text: a.text,
                coords: a.coords,
                style: a.style
            };
            var b = !a.coords || !g.isTranslateEnabled(a.source),
                c = {
                    text: a.text,
                    notify: b
                },
                d = new q;
            chrome.runtime.sendMessage({
                type: "on_selection",
                data: c
            }, function (a) {
                d[a.error ? "reject" : "resolve"](a)
            }), d.success(function (b) {
                popup.show({
                    text: b.translation,
                    coords: a.coords,
                    style: a.style,
                    expand: !1
                })
            }), h = {
                text: a.text,
                request: d,
                source: a.source
            }
        }

        function c() {
            if (h) {
                if (!g.isDoubleClickTranslateEnabled(h.source)) return;
                h.request.success(function () {
                    e(k.POPUP_OPENED_DOUBLECLICK), popup.expanded = !0
                })
            }
        }

        function d(a) {
            return p.getNearest(a.target, ".corom-element") ? void a.stopPropagation() : void chrome.runtime.sendMessage({
                type: "close_popups"
            })
        }

        function e(a) {
            h && h.text !== i && (chrome.runtime.sendMessage({
                type: "report_small_count",
                name: "PopupOpened",
                value: a
            }), i = h.text)
        }

        function f() {
            return document.head || document.body ? void(document.querySelector('link[rel="stylesheet"], style') || (document.head || document.body).appendChild(document.createElement("style"))) : setTimeout(f)
        }
        var g = new t;
        g.load();
        var h = null,
            i = null,
            j = null,
            k = {
                POPUP_OPENED_SELECTION: 0,
                POPUP_OPENED_DOUBLECLICK: 1,
                POPUP_OPENED_CONTEXTMENU: 2
            };
        selection.onSelect.addListener(b), selection.onDeselect.addListener(a), popup.onPopupShow.addListener(e.bind(this, k.POPUP_OPENED_SELECTION)), document.addEventListener("dblclick", setTimeout.bind(this, c), !1), window.addEventListener("resize", d, !1), document.addEventListener("contextmenu", d, !1), chrome.runtime.onMessage.addListener(function (a) {
            if ("on_context_menu" === a.type) {
                if (!a.data) return;
                var b = a.data.translation;
                if (!b) return;
                var c = null,
                    d = null;
                if (j && j.text === a.data.originalText ? (c = j.coords, d = j.style) : (j = null, c = selection.getCoords(), d = selection.getStyle()), null === c) return;
                e(k.POPUP_OPENED_CONTEXTMENU), popup.show({
                    text: b,
                    coords: c,
                    style: d,
                    expand: !0
                })
            }
            "close_popup" === a.type && popup.hide()
        }), f()
    }

    function o() {
        var a = function () {
            this._coords = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: 0,
                height: 0
            }, this._isShown = !1, this._isExpanded = !1, this._createNodes(), this.onPopupShow = new Notifier
        };
        a.prototype = {
            constructor: a,
            TRIGGER_INNER_HTML: "",
            POPUP_INNER_HTML: "{{text}}",
            HORIZONTAL_GAP: window === window.top ? 20 : 0,
            VERTICAL_GAP: window === window.top ? 20 : 0,
            _createNodes: function () {
                var a = document.createElement("div");
                a.style.position = "absolute", a.style.top = 0, a.style.left = 0, a.style.right = 0, a.style.height = 0, a.style.margin = 0, a.style.zIndex = 1e10, a.style.pointerEvents = "none", a.style.border = "none", a.classList.add("corom-element"), this._rootNode = a;
                var b = document.createElement("style");
                b.innerHTML = '@import "' + chrome.extension.getURL("css/style.css") + '";', this._shadowRoot = a.createShadowRoot(), this._shadowRoot.appendChild(b), this._createTriggerNode(), this._createPopupNode(), this.expanded = !1, window.addEventListener("pagehide", this._destroy.bind(this))
            },
            _createTriggerNode: function () {
                var a = document.createElement("div");
                a.classList.add("corom-trigger"), a.innerHTML = this.TRIGGER_INNER_HTML, a.addEventListener("mouseup", this._toggle.bind(this), !1), this._triggerNode = a
            },
            _createPopupNode: function () {
                var a = document.createElement("div"),
                    b = document.createElement("div");
                b.classList.add("corom-popup"), a.hidden = !this._isExpanded, a.appendChild(b), a.style.left = 0, a.style.right = 0, a.style.pointerEvents = "none", a.style.position = "absolute", a.style.zIndex = "10000000000000", this._popupNode = a, this._popupNodeInner = b
            },
            _toggle: function (a) {
                return this.expanded = !this.expanded, this.expanded || this.hide(), p.thouShallNotPass(a)
            },
            _setText: function (a) {
                this._popupNodeInner.innerHTML = this.POPUP_INNER_HTML.replace("{{text}}", a)
            },
            _setStyle: function (a) {
                this._triggerNode.style.height = a.lineHeight, this._triggerNode.style.lineHeight = a.lineHeight, this._triggerNode.style.backgroundColor = a.background
            },
            _getActualPopupSize: function () {
                this._isShown || (this._popupNodeInner.style.left = "-1000px", this._triggerNode.style.left = "-1000px", this._popupNode.hidden = !1, this._shadowRoot.appendChild(this._popupNode));
                var a = {
                    width: this._popupNodeInner.offsetWidth,
                    height: this._popupNodeInner.offsetHeight
                };
                return this._isShown || (this._popupNode.hidden = !this._isExpanded, this.hide()), a
            },
            _destroy: function () {
                null !== this._triggerNode && (this._triggerNode.remove(), this._popupNode.remove(), this._rootNode.remove(), this._shadowRoot = null, this._triggerNode = null, this._popupNode = null, this._popupNodeInner = null, this._rootNode = null)
            },
            get isShown() {
                return this._isShown
            },
            get coords() {
                return this._coords
            },
            set coords(a) {
                var b = document.body.scrollTop,
                    c = window.innerHeight,
                    d = window.innerWidth,
                    e = this._getActualPopupSize();
                this._popupNode.style.top = a.top + e.height + this.VERTICAL_GAP > c ? a.top + b - e.height + "px" : a.top + a.height + b + "px", this._triggerNode.style.top = a.top + b + "px", this._triggerNode.style.left = a.right + "px", this._triggerNode.style.height = a.height + "px";
                var f = Math.max(a.left + e.width + this.HORIZONTAL_GAP - d, 0);
                this._popupNodeInner.style.left = Math.max(a.left - f, this.HORIZONTAL_GAP) + "px", this._coords = a
            },
            get expanded() {
                return this._isExpanded
            },
            set expanded(a) {
                a !== this._isExpanded && (this._isExpanded = a, this._triggerNode.classList[a ? "add" : "remove"]("shown"), this._popupNode.hidden = !a), a && this.onPopupShow.trigger()
            },
            show: function (a) {
                this._setText(a.text), this.coords = a.coords, this._setStyle(a.style), this._isShown || (document.body.appendChild(this._rootNode, document.body), this._shadowRoot.appendChild(this._popupNode), this._shadowRoot.appendChild(this._triggerNode)), this.expanded = Boolean(a.expand), this._isShown = !0
            },
            hide: function () {
                this._isShown && (this.expanded = !1, this._triggerNode.remove(), this._popupNode.remove(), this._isShown = !1)
            }
        }, window.popup = new a, document.addEventListener("mousedown", function (a) {
            p.getNearest(a.target, ".corom-element") ? a.stopPropagation() : window.popup.isShown && window.popup.hide()
        }, !1), n()
    }
    b.global = a;
    var p = {};
    p.query = function (a) {
        return 0 == a.indexOf("#") ? document.getElementById(a.substring(1)) : null
    }, Element.prototype.matches || (Element.prototype.matches = Element.prototype.webkitMatchesSelector), p.getNearest = function (a, b) {
        return c.call(a, b)
    }, p.getElement = function (a) {
        for (; a && 1 !== a.nodeType;) a = a.parentNode;
        return a
    }, p.thouShallNotPass = function (a) {
        return a.preventDefault(), a.stopPropagation(), !1
    }, p.noop = function () {}, "undefined" == typeof PRODUCTION && (p.throttle = function (a, b) {
        var c, d = null;
        return function () {
            return d ? void(c = arguments) : (c = arguments, void(d = setTimeout(function () {
                return d = null, a.apply(this, c)
            }, b)))
        }
    }, p.html = function (a) {
        var b = document.createElement(a.tag || "keke");
        if (a.style)
            for (var c in a.style) b.style[c] = a.style[c];
        return a.text && (b.textContent = a.text), b
    }), window.Utils = p;
    var q = function (a) {
        if (0 === arguments.length) return this._init(), this;
        if (a instanceof q) return a;
        var b = new q;
        return b.resolve(a), b
    };
    q.RUNNING = 0, q.RESOLVED = 1, q.FAILED = 2, q.prototype = {
        constructor: q,
        _init: function () {
            this._results = [], this._subscribers = [], this.state = q.RUNNING
        },
        _notify: function () {
            var a = this;
            this._subscribers.forEach(function (b) {
                b.apply(a, a._results)
            }), this._subscribers = []
        },
        resolve: function () {
            return this.state = q.RESOLVED, this._results = arguments, this._notify(), this
        },
        reject: function () {
            return this.state = q.FAILED, this._results = arguments, this._notify(), this
        },
        subscribe: function (a) {
            this.state !== q.RUNNING ? a.apply(this, this._results) : this._subscribers.push(a)
        },
        done: function (a) {
            return this.subscribe(a), this
        },
        success: function (a) {
            var b = this;
            return this.subscribe(function () {
                b.state === q.RESOLVED && a.apply(b, b._results)
            }), this
        },
        fail: function (a) {
            var b = this;
            return this.subscribe(function () {
                b.state === q.FAILED && a.apply(b, b._results)
            }), this
        },
        bind: function (a) {
            return a = new q(a), a.success(this.resolve.bind(this)).fail(this.reject.bind(this)), this
        }
    }, q.when = function () {
        var a = [];
        return a = Array.isArray(arguments[0]) ? arguments[0] : p.toArray(arguments), new q.When(a)
    }, q.When = function (a) {
        this._doneCallbacks = [], this._successCallbacks = [], this._failCallbacks = [], this._state = q.RUNNING, this._thingsToDo = a.length, this._results = Array(this._thingsToDo), this._init(a)
    }, q.When.prototype = {
        constructor: q.When,
        _init: function (a) {
            var b = this;
            a.forEach(function (a, c) {
                a = new q(a), a.subscribe(function () {
                    a.state === q.FAILED && (b._state = q.FAILED), b._results[c] = p.toArray(arguments), b._thingsToDo--, b._checkIsDone()
                })
            }), this._checkIsDone()
        },
        _checkIsDone: function () {
            if (0 !== this._thingsToDo) return !1;
            var a = [];
            this._results.forEach(function (b) {
                a = a.concat(b)
            }), this._state === q.FAILED ? this._runCallbacks(this._failCallbacks, a) : this._runCallbacks(this._successCallbacks, a), this._runCallbacks(this._doneCallbacks, a), this._doneCallbacks = [], this._successCallbacks = [], this._failCallbacks = []
        },
        _runCallbacks: function (a, b) {
            a.forEach(function (a) {
                a.apply(this, b)
            })
        },
        done: function (a) {
            return this._doneCallbacks.push(a), this._checkIsDone(), this
        },
        success: function (a) {
            return this._successCallbacks.push(a), this._checkIsDone(), this
        },
        fail: function (a) {
            return this._failCallbacks.push(a), this._checkIsDone(), this
        }
    }, q.chain = function () {
        function a(b) {
            if (!b.length) return c.resolve.apply(c, d);
            var e, f = b.shift();
            "function" == typeof f ? (e = q(f()), e.done(function (c) {
                d.push(c), a(b)
            })) : (d.push(f), a(b))
        }
        var b, c = new q,
            d = [];
        return b = Array.isArray(arguments[0]) ? arguments[0] : p.toArray(arguments), a(b), c
    }, window.Promise = q, Notifier = function () {
        this._subscribers = []
    }, Notifier.prototype = {
        constructor: Notifier,
        addListener: function (a) {
            return "function" == typeof a && this._subscribers.push(a), this
        },
        unsubscribe: function (a) {
            var b = this._subscribers.indexOf(a);
            return -1 !== b && this._subscribers.splice(b, 1), this
        },
        trigger: function () {
            var a = arguments,
                b = this;
            return this._subscribers.forEach(function (c) {
                c.apply(b, a)
            }), this
        }
    };
    var r = (window, ["text", "password", "search", "tel", "url"]),
        s = function () {
            this._lastSelectionText = this.getText(), this.onSelect = new Notifier, this.onDeselect = new Notifier;
            var a = this._checkSelection.bind(this);
            document.addEventListener("mouseup", a, !1), document.addEventListener("contextmenu", a, !1), document.addEventListener("keyup", a, !1), document.addEventListener("select", a, !1)
        };
    s.prototype = {
        constructor: s,
        _checkSelection: function (a) {
            if (p.getNearest(a.target, ".corom-element") || "keyup" === a.type && "input" !== a.target.tagName.toLowerCase() && "textarea" !== a.target.tagName.toLowerCase() && !a.target.isContentEditable) return this.onDeselect.trigger(!0), a.stopPropagation(), !0;
            var b = window.getSelection(),
                c = d(b),
                e = p.getElement(b.focusNode);
            if (this._lastSelectionText === c) return void(e === a.target && (this._lastSelectionText = null, this.onDeselect.trigger()));
            if (this.onDeselect.trigger(), "" !== c) {
                var f = g(b),
                    i = a.target;
                if (!f && ("select" === a.type || "contextmenu" === a.type)) {
                    var j = a.target,
                        k = "text";
                    j && ("TEXTAREA" === j.tagName || "INPUT" === j.tagName && r.indexOf(j.type) > -1) && j.selectionStart != j.selectionEnd && (f = l(j, j.selectionStart, j.selectionEnd), k = "input", i = j)
                }
                if ("input" !== k && (k = m(i) ? "input" : "notInput"), !f) return;
                this._lastSelectionText = c;
                var n = h(p.getElement(i)),
                    o = window.getComputedStyle(p.getElement(i)),
                    q = o.getPropertyValue("zoom");
                q = q ? parseInt(q) : 1, f.left *= q, f.right *= q, f.top *= q, f.bottom *= q, f.height *= q, f.width *= q, this.onSelect.trigger({
                    element: a.target,
                    text: c,
                    coords: f,
                    style: n,
                    source: k
                })
            }
        },
        getCoords: function () {
            return g(window.getSelection())
        },
        getStyle: function () {
            return h(window.getSelection())
        },
        getText: function () {
            return d(window.getSelection())
        }
    }, "undefined" == typeof PRODUCTION && (s.prototype.__drawRect = function (a, b) {
        var c = "rgb(" + [192 * Math.random() | 0, 192 * Math.random() | 0, 192 * Math.random() | 0].join(",") + ")";
        node = p.html({
            style: {
                boxSizing: "border-box",
                border: "1px dotted " + c,
                zIndex: 2147483647,
                position: "absolute",
                left: a.left + "px",
                top: document.body.scrollTop + a.top + "px",
                height: a.bottom - a.top + "px",
                width: a.width + "px",
                fontWeight: "bold",
                overflow: "hidden",
                opacity: .6,
                color: c
            },
            text: "" + b
        }), document.body.appendChild(node)
    }, s.prototype.__drawElementBounds = function (a, b) {
        a = p.getElement(a);
        var c = a.getBoundingClientRect();
        this.__drawRect(c, b)
    }, s.prototype.__drawSeletionBounds = function () {
        var a = window.getSelection();
        if (a.rangeCount) {
            for (var b = h(selection), c = 0; c < a.rangeCount; ++c) {
                for (var d = a.getRangeAt(c), e = d.getClientRects(), g = 0; g < e.length; ++g) this.__drawRect(e[g], "r" + c + "," + g), this.__drawRect(f(e[g], b), "r" + c + "," + g + "c");
                this.__drawRect(d.getBoundingClientRect(), "b" + c + ","), this.__drawElementBounds(d.commonAncestorContainer, "r" + c + "A")
            }
            var d = a.getRangeAt(a.rangeCount - 1);
            return f(d, b)
        }
    }), window.selection = new s;
    var t = function () {
        this._storage = chrome.storage.local, this._options = {}, this._default = {
            double_click_translate_enabled: !0,
            input_translate_enabled: !0,
            double_click_input_translate_enabled: !1
        };
        var a = this;
        chrome.storage.onChanged.addListener(function (b, c) {
            if ("local" === c)
                for (var d in b) a._options[d] = b[d].newValue
        }), this.isTranslateEnabled = function (b) {
            return "input" === b ? a.get("input_translate_enabled") : !0
        }, this.isDoubleClickTranslateEnabled = function (b) {
            return a.isTranslateEnabled(b) ? a.get("input" === b ? "double_click_input_translate_enabled" : "double_click_translate_enabled") : !1
        }
    };
    t.prototype = {
        load: function () {
            var a = new q,
                b = this;
            return this._storage.get(null, function (c) {
                b._options = c, a.resolve(c)
            }), a
        },
        set: function (a, b) {
            var c = {};
            "string" != typeof a && "number" != typeof a || "undefined" == typeof b || (c[a] = b, this._options[a] = b, this._storage.set(c))
        },
        get: function (a) {
            return a in this._options ? this._options[a] : this._default[a]
        }
    }, window.Options = t, Element.prototype.createShadowRoot || (Element.prototype.createShadowRoot = Element.prototype.webkitCreateShadowRoot), o()
}({}, function () {
    return this
}());