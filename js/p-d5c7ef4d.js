const t = "pokemon-stencil";
let n;
let e;
let s = false;
let o = false;
const l = (t, n = "") => {
    {
        return () => {};
    }
};
const c = (t, n) => {
    {
        return () => {};
    }
};
const i = "{visibility:hidden}.hydrated{visibility:inherit}";
const f = {};
const r = (t) => t != null;
const u = (t) => {
    t = typeof t;
    return t === "object" || t === "function";
};
function a(t) {
    var n, e, s;
    return (s =
        (e =
            (n = t.head) === null || n === void 0
                ? void 0
                : n.querySelector('meta[name="csp-nonce"]')) === null ||
        e === void 0
            ? void 0
            : e.getAttribute("content")) !== null && s !== void 0
        ? s
        : undefined;
}
const d = (t, n, ...e) => {
    let s = null;
    let o = false;
    let l = false;
    const c = [];
    const i = (n) => {
        for (let e = 0; e < n.length; e++) {
            s = n[e];
            if (Array.isArray(s)) {
                i(s);
            } else if (s != null && typeof s !== "boolean") {
                if ((o = typeof t !== "function" && !u(s))) {
                    s = String(s);
                }
                if (o && l) {
                    c[c.length - 1].t += s;
                } else {
                    c.push(o ? h(null, s) : s);
                }
                l = o;
            }
        }
    };
    i(e);
    if (n) {
        {
            const t = n.className || n.class;
            if (t) {
                n.class =
                    typeof t !== "object"
                        ? t
                        : Object.keys(t)
                              .filter((n) => t[n])
                              .join(" ");
            }
        }
    }
    const f = h(t, null);
    f.o = n;
    if (c.length > 0) {
        f.l = c;
    }
    return f;
};
const h = (t, n) => {
    const e = { i: 0, u: t, t: n, h: null, l: null };
    {
        e.o = null;
    }
    return e;
};
const p = {};
const y = (t) => t && t.u === p;
const $ = (t, n) => {
    if (t != null && !u(t)) {
        if (n & 1) {
            return String(t);
        }
        return t;
    }
    return t;
};
const m = (t, n, e) => {
    const s = rt.ce(n, e);
    t.dispatchEvent(s);
    return s;
};
const b = new WeakMap();
const w = (t, n, e) => {
    let s = ct.get(t);
    if (at && e) {
        s = s || new CSSStyleSheet();
        if (typeof s === "string") {
            s = n;
        } else {
            s.replaceSync(n);
        }
    } else {
        s = n;
    }
    ct.set(t, s);
};
const S = (t, n, e, s) => {
    var o;
    let l = g(n);
    const c = ct.get(l);
    t = t.nodeType === 11 ? t : ft;
    if (c) {
        if (typeof c === "string") {
            t = t.head || t;
            let n = b.get(t);
            let e;
            if (!n) {
                b.set(t, (n = new Set()));
            }
            if (!n.has(l)) {
                {
                    {
                        e = ft.createElement("style");
                        e.innerHTML = c;
                    }
                    const n = (o = rt.p) !== null && o !== void 0 ? o : a(ft);
                    if (n != null) {
                        e.setAttribute("nonce", n);
                    }
                    t.insertBefore(e, t.querySelector("link"));
                }
                if (n) {
                    n.add(l);
                }
            }
        } else if (!t.adoptedStyleSheets.includes(c)) {
            t.adoptedStyleSheets = [...t.adoptedStyleSheets, c];
        }
    }
    return l;
};
const v = (t) => {
    const n = t.$;
    const e = t.m;
    const s = n.i;
    const o = l("attachStyles", n.S);
    const c = S(e.shadowRoot ? e.shadowRoot : e.getRootNode(), n);
    if (s & 10) {
        e["s-sc"] = c;
        e.classList.add(c + "-h");
    }
    o();
};
const g = (t, n) => "sc-" + t.S;
const j = (t, n, e, s, o, l) => {
    if (e !== s) {
        let c = et(t, n);
        n.toLowerCase();
        if (n === "class") {
            const n = t.classList;
            const o = M(e);
            const l = M(s);
            n.remove(...o.filter((t) => t && !l.includes(t)));
            n.add(...l.filter((t) => t && !o.includes(t)));
        } else {
            const i = u(s);
            if ((c || (i && s !== null)) && !o) {
                try {
                    if (!t.tagName.includes("-")) {
                        const o = s == null ? "" : s;
                        if (n === "list") {
                            c = false;
                        } else if (e == null || t[n] != o) {
                            t[n] = o;
                        }
                    } else {
                        t[n] = s;
                    }
                } catch (t) {}
            }
            if (s == null || s === false) {
                if (s !== false || t.getAttribute(n) === "") {
                    {
                        t.removeAttribute(n);
                    }
                }
            } else if ((!c || l & 4 || o) && !i) {
                s = s === true ? "" : s;
                {
                    t.setAttribute(n, s);
                }
            }
        }
    }
};
const k = /\s/;
const M = (t) => (!t ? [] : t.split(k));
const C = (t, n, e, s) => {
    const o = n.h.nodeType === 11 && n.h.host ? n.h.host : n.h;
    const l = (t && t.o) || f;
    const c = n.o || f;
    {
        for (s in l) {
            if (!(s in c)) {
                j(o, s, l[s], undefined, e, n.i);
            }
        }
    }
    for (s in c) {
        j(o, s, l[s], c[s], e, n.i);
    }
};
const O = (t, e, o, l) => {
    const c = e.l[o];
    let i = 0;
    let f;
    let u;
    if (c.t !== null) {
        f = c.h = ft.createTextNode(c.t);
    } else {
        f = c.h = ft.createElement(c.u);
        {
            C(null, c, s);
        }
        if (r(n) && f["s-si"] !== n) {
            f.classList.add((f["s-si"] = n));
        }
        if (c.l) {
            for (i = 0; i < c.l.length; ++i) {
                u = O(t, c, i);
                if (u) {
                    f.appendChild(u);
                }
            }
        }
    }
    return f;
};
const P = (t, n, s, o, l, c) => {
    let i = t;
    let f;
    if (i.shadowRoot && i.tagName === e) {
        i = i.shadowRoot;
    }
    for (; l <= c; ++l) {
        if (o[l]) {
            f = O(null, s, l);
            if (f) {
                o[l].h = f;
                i.insertBefore(f, n);
            }
        }
    }
};
const U = (t, n, e) => {
    for (let s = n; s <= e; ++s) {
        const n = t[s];
        if (n) {
            const t = n.h;
            if (t) {
                t.remove();
            }
        }
    }
};
const x = (t, n, e, s) => {
    let o = 0;
    let l = 0;
    let c = n.length - 1;
    let i = n[0];
    let f = n[c];
    let r = s.length - 1;
    let u = s[0];
    let a = s[r];
    let d;
    while (o <= c && l <= r) {
        if (i == null) {
            i = n[++o];
        } else if (f == null) {
            f = n[--c];
        } else if (u == null) {
            u = s[++l];
        } else if (a == null) {
            a = s[--r];
        } else if (E(i, u)) {
            N(i, u);
            i = n[++o];
            u = s[++l];
        } else if (E(f, a)) {
            N(f, a);
            f = n[--c];
            a = s[--r];
        } else if (E(i, a)) {
            N(i, a);
            t.insertBefore(i.h, f.h.nextSibling);
            i = n[++o];
            a = s[--r];
        } else if (E(f, u)) {
            N(f, u);
            t.insertBefore(f.h, i.h);
            f = n[--c];
            u = s[++l];
        } else {
            {
                d = O(n && n[l], e, l);
                u = s[++l];
            }
            if (d) {
                {
                    i.h.parentNode.insertBefore(d, i.h);
                }
            }
        }
    }
    if (o > c) {
        P(t, s[r + 1] == null ? null : s[r + 1].h, e, s, l, r);
    } else if (l > r) {
        U(n, o, c);
    }
};
const E = (t, n) => {
    if (t.u === n.u) {
        return true;
    }
    return false;
};
const N = (t, n) => {
    const e = (n.h = t.h);
    const o = t.l;
    const l = n.l;
    const c = n.t;
    if (c === null) {
        {
            {
                C(t, n, s);
            }
        }
        if (o !== null && l !== null) {
            x(e, o, n, l);
        } else if (l !== null) {
            if (t.t !== null) {
                e.textContent = "";
            }
            P(e, null, n, l, 0, l.length - 1);
        } else if (o !== null) {
            U(o, 0, o.length - 1);
        }
    } else if (t.t !== c) {
        e.data = c;
    }
};
const T = (t, s) => {
    const o = t.m;
    const l = t.v || h(null, null);
    const c = y(s) ? s : d(null, null, s);
    e = o.tagName;
    c.u = null;
    c.i |= 4;
    t.v = c;
    c.h = l.h = o.shadowRoot || o;
    {
        n = o["s-sc"];
    }
    N(l, c);
};
const A = (t, n) => {
    if (n && !t.g && n["s-p"]) {
        n["s-p"].push(new Promise((n) => (t.g = n)));
    }
};
const L = (t, n) => {
    {
        t.i |= 16;
    }
    if (t.i & 4) {
        t.i |= 512;
        return;
    }
    A(t, t.j);
    const e = () => R(t, n);
    return bt(e);
};
const R = (t, n) => {
    const e = l("scheduleUpdate", t.$.S);
    const s = t.k;
    let o;
    e();
    return W(o, () => F(t, s, n));
};
const W = (t, n) => (q(t) ? t.then(n) : n());
const q = (t) =>
    t instanceof Promise || (t && t.then && typeof t.then === "function");
const F = async (t, n, e) => {
    var s;
    const o = t.m;
    const c = l("update", t.$.S);
    const i = o["s-rc"];
    if (e) {
        v(t);
    }
    const f = l("render", t.$.S);
    {
        H(t, n);
    }
    if (i) {
        i.map((t) => t());
        o["s-rc"] = undefined;
    }
    f();
    c();
    {
        const n = (s = o["s-p"]) !== null && s !== void 0 ? s : [];
        const e = () => I(t);
        if (n.length === 0) {
            e();
        } else {
            Promise.all(n).then(e);
            t.i |= 4;
            n.length = 0;
        }
    }
};
const H = (t, n, e) => {
    try {
        n = n.render();
        {
            t.i &= ~16;
        }
        {
            t.i |= 2;
        }
        {
            {
                {
                    T(t, n);
                }
            }
        }
    } catch (n) {
        st(n, t.m);
    }
    return null;
};
const I = (t) => {
    const n = t.$.S;
    const e = t.m;
    const s = l("postUpdate", n);
    const o = t.j;
    if (!(t.i & 64)) {
        t.i |= 64;
        {
            _(e);
        }
        s();
        {
            t.M(e);
            if (!o) {
                V();
            }
        }
    } else {
        s();
    }
    {
        if (t.g) {
            t.g();
            t.g = undefined;
        }
        if (t.i & 512) {
            mt(() => L(t, false));
        }
        t.i &= ~(4 | 512);
    }
};
const V = (n) => {
    {
        _(ft.documentElement);
    }
    mt(() => m(it, "appload", { detail: { namespace: t } }));
};
const _ = (t) => t.classList.add("hydrated");
const z = (t, n) => Z(t).C.get(n);
const B = (t, n, e, s) => {
    const o = Z(t);
    const l = o.C.get(n);
    const c = o.i;
    const i = o.k;
    e = $(e, s.O[n][0]);
    const f = Number.isNaN(l) && Number.isNaN(e);
    const r = e !== l && !f;
    if ((!(c & 8) || l === undefined) && r) {
        o.C.set(n, e);
        if (i) {
            if ((c & (2 | 16)) === 2) {
                L(o, false);
            }
        }
    }
};
const D = (t, n, e) => {
    if (n.O) {
        const s = Object.entries(n.O);
        const o = t.prototype;
        s.map(([t, [s]]) => {
            if (s & 31 || (e & 2 && s & 32)) {
                Object.defineProperty(o, t, {
                    get() {
                        return z(this, t);
                    },
                    set(e) {
                        B(this, t, e, n);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
        });
        if (e & 1) {
            const n = new Map();
            o.attributeChangedCallback = function (t, e, s) {
                rt.jmp(() => {
                    const e = n.get(t);
                    if (this.hasOwnProperty(e)) {
                        s = this[e];
                        delete this[e];
                    } else if (
                        o.hasOwnProperty(e) &&
                        typeof this[e] === "number" &&
                        this[e] == s
                    ) {
                        return;
                    }
                    this[e] =
                        s === null && typeof this[e] === "boolean" ? false : s;
                });
            };
            t.observedAttributes = s
                .filter(([t, n]) => n[0] & 15)
                .map(([t, e]) => {
                    const s = e[1] || t;
                    n.set(s, t);
                    return s;
                });
        }
    }
    return t;
};
const G = async (t, n, e, s, o) => {
    if ((n.i & 32) === 0) {
        n.i |= 32;
        {
            o = lt(e);
            if (o.then) {
                const t = c();
                o = await o;
                t();
            }
            if (!o.isProxied) {
                D(o, e, 2);
                o.isProxied = true;
            }
            const t = l("createInstance", e.S);
            {
                n.i |= 8;
            }
            try {
                new o(n);
            } catch (t) {
                st(t);
            }
            {
                n.i &= ~8;
            }
            t();
        }
        if (o.style) {
            let t = o.style;
            const n = g(e);
            if (!ct.has(n)) {
                const s = l("registerStyles", e.S);
                w(n, t, !!(e.i & 1));
                s();
            }
        }
    }
    const i = n.j;
    const f = () => L(n, true);
    if (i && i["s-rc"]) {
        i["s-rc"].push(f);
    } else {
        f();
    }
};
const J = (t) => {
    if ((rt.i & 1) === 0) {
        const n = Z(t);
        const e = n.$;
        const s = l("connectedCallback", e.S);
        if (!(n.i & 1)) {
            n.i |= 1;
            {
                let e = t;
                while ((e = e.parentNode || e.host)) {
                    if (e["s-p"]) {
                        A(n, (n.j = e));
                        break;
                    }
                }
            }
            if (e.O) {
                Object.entries(e.O).map(([n, [e]]) => {
                    if (e & 31 && t.hasOwnProperty(n)) {
                        const e = t[n];
                        delete t[n];
                        t[n] = e;
                    }
                });
            }
            {
                G(t, n, e);
            }
        }
        s();
    }
};
const K = (t) => {
    if ((rt.i & 1) === 0) {
        Z(t);
    }
};
const Q = (t, n = {}) => {
    var e;
    const s = l();
    const o = [];
    const c = n.exclude || [];
    const f = it.customElements;
    const r = ft.head;
    const u = r.querySelector("meta[charset]");
    const d = ft.createElement("style");
    const h = [];
    let p;
    let y = true;
    Object.assign(rt, n);
    rt.P = new URL(n.resourcesUrl || "./", ft.baseURI).href;
    t.map((t) => {
        t[1].map((n) => {
            const e = { i: n[0], S: n[1], O: n[2], U: n[3] };
            {
                e.O = n[2];
            }
            const s = e.S;
            const l = class extends HTMLElement {
                constructor(t) {
                    super(t);
                    t = this;
                    nt(t, e);
                    if (e.i & 1) {
                        {
                            {
                                t.attachShadow({ mode: "open" });
                            }
                        }
                    }
                }
                connectedCallback() {
                    if (p) {
                        clearTimeout(p);
                        p = null;
                    }
                    if (y) {
                        h.push(this);
                    } else {
                        rt.jmp(() => J(this));
                    }
                }
                disconnectedCallback() {
                    rt.jmp(() => K(this));
                }
                componentOnReady() {
                    return Z(this).N;
                }
            };
            e.T = t[0];
            if (!c.includes(s) && !f.get(s)) {
                o.push(s);
                f.define(s, D(l, e, 1));
            }
        });
    });
    {
        d.innerHTML = o + i;
        d.setAttribute("data-styles", "");
        const t = (e = rt.p) !== null && e !== void 0 ? e : a(ft);
        if (t != null) {
            d.setAttribute("nonce", t);
        }
        r.insertBefore(d, u ? u.nextSibling : r.firstChild);
    }
    y = false;
    if (h.length) {
        h.map((t) => t.connectedCallback());
    } else {
        {
            rt.jmp(() => (p = setTimeout(V, 30)));
        }
    }
    s();
};
const X = (t) => (rt.p = t);
const Y = new WeakMap();
const Z = (t) => Y.get(t);
const tt = (t, n) => Y.set((n.k = t), n);
const nt = (t, n) => {
    const e = { i: 0, m: t, $: n, C: new Map() };
    {
        e.N = new Promise((t) => (e.M = t));
        t["s-p"] = [];
        t["s-rc"] = [];
    }
    return Y.set(t, e);
};
const et = (t, n) => n in t;
const st = (t, n) => (0, console.error)(t, n);
const ot = new Map();
const lt = (t, n, e) => {
    const s = t.S.replace(/-/g, "_");
    const o = t.T;
    const l = ot.get(o);
    if (l) {
        return l[s];
    }
    /*!__STENCIL_STATIC_IMPORT_SWITCH__*/ return import(
        `./${o}.entry.js${""}`
    ).then((t) => {
        {
            ot.set(o, t);
        }
        return t[s];
    }, st);
};
const ct = new Map();
const it = typeof window !== "undefined" ? window : {};
const ft = it.document || { head: {} };
const rt = {
    i: 0,
    P: "",
    jmp: (t) => t(),
    raf: (t) => requestAnimationFrame(t),
    ael: (t, n, e, s) => t.addEventListener(n, e, s),
    rel: (t, n, e, s) => t.removeEventListener(n, e, s),
    ce: (t, n) => new CustomEvent(t, n),
};
const ut = (t) => Promise.resolve(t);
const at = (() => {
    try {
        new CSSStyleSheet();
        return typeof new CSSStyleSheet().replaceSync === "function";
    } catch (t) {}
    return false;
})();
const dt = [];
const ht = [];
const pt = (t, n) => (e) => {
    t.push(e);
    if (!o) {
        o = true;
        if (n && rt.i & 4) {
            mt($t);
        } else {
            rt.raf($t);
        }
    }
};
const yt = (t) => {
    for (let n = 0; n < t.length; n++) {
        try {
            t[n](performance.now());
        } catch (t) {
            st(t);
        }
    }
    t.length = 0;
};
const $t = () => {
    yt(dt);
    {
        yt(ht);
        if ((o = dt.length > 0)) {
            rt.raf($t);
        }
    }
};
const mt = (t) => ut().then(t);
const bt = pt(ht, true);
export { Q as b, d as h, ut as p, tt as r, X as s };
//# sourceMappingURL=p-d5c7ef4d.js.map
