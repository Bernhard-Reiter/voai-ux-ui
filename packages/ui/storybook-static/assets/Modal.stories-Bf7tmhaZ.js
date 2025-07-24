import { r as s, j as a } from './iframe-RsHbt8uy.js'
import {
  u as Ft,
  P as _,
  a as Ce,
  d as Ot,
  c as _t,
  b as de,
  e as q,
  f as xe,
  D as Lt,
  g as jt,
} from './index-Ba6GDh-1.js'
import { j as v, u as se, a as zt } from './index-C4ESynIQ.js'
import { R as Wt } from './index-CBPhPhPK.js'
import { c as nt, a as V, L as G } from './lucide-wrapper-MqQNZape.js'
import { X as Ht } from './x-X83kEHGU.js'
import { B as w } from './Button-DnyYgvCD.js'
import { B as Ut } from './Badge-DsgB-mpp.js'
import { A as ke } from './alert-circle-CMtWS-OJ.js'
import { S as Gt } from './settings-DboNApfp.js'
import './bundle-mjs-B2rm_Apj.js'
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vt = nt('Trash2', [
  ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
  ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
  ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
  ['line', { x1: '10', x2: '10', y1: '11', y2: '17', key: '1uufr5' }],
  ['line', { x1: '14', x2: '14', y1: '11', y2: '17', key: 'xtxkd' }],
])
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kt = nt('UserPlus', [
  ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
  ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
  ['line', { x1: '19', x2: '19', y1: '8', y2: '14', key: '1bvyxn' }],
  ['line', { x1: '22', x2: '16', y1: '11', y2: '11', key: '1shjgl' }],
])
var qt = 'Portal',
  rt = s.forwardRef((e, t) => {
    var l
    const { container: n, ...r } = e,
      [o, i] = s.useState(!1)
    Ft(() => i(!0), [])
    const u =
      n ||
      (o && ((l = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : l.body))
    return u ? Wt.createPortal(v.jsx(_.div, { ...r, ref: t }), u) : null
  })
rt.displayName = qt
var fe = 'focusScope.autoFocusOnMount',
  me = 'focusScope.autoFocusOnUnmount',
  De = { bubbles: !1, cancelable: !0 },
  Xt = 'FocusScope',
  at = s.forwardRef((e, t) => {
    const { loop: n = !1, trapped: r = !1, onMountAutoFocus: o, onUnmountAutoFocus: i, ...u } = e,
      [l, g] = s.useState(null),
      p = Ce(o),
      h = Ce(i),
      f = s.useRef(null),
      b = se(t, (c) => g(c)),
      y = s.useRef({
        paused: !1,
        pause() {
          this.paused = !0
        },
        resume() {
          this.paused = !1
        },
      }).current
    ;(s.useEffect(() => {
      if (r) {
        let c = function (M) {
            if (y.paused || !l) return
            const N = M.target
            l.contains(N) ? (f.current = N) : A(f.current, { select: !0 })
          },
          d = function (M) {
            if (y.paused || !l) return
            const N = M.relatedTarget
            N !== null && (l.contains(N) || A(f.current, { select: !0 }))
          },
          m = function (M) {
            if (document.activeElement === document.body)
              for (const S of M) S.removedNodes.length > 0 && A(l)
          }
        ;(document.addEventListener('focusin', c), document.addEventListener('focusout', d))
        const x = new MutationObserver(m)
        return (
          l && x.observe(l, { childList: !0, subtree: !0 }),
          () => {
            ;(document.removeEventListener('focusin', c),
              document.removeEventListener('focusout', d),
              x.disconnect())
          }
        )
      }
    }, [r, l, y.paused]),
      s.useEffect(() => {
        if (l) {
          Te.add(y)
          const c = document.activeElement
          if (!l.contains(c)) {
            const m = new CustomEvent(fe, De)
            ;(l.addEventListener(fe, p),
              l.dispatchEvent(m),
              m.defaultPrevented ||
                (Yt(en(ot(l)), { select: !0 }), document.activeElement === c && A(l)))
          }
          return () => {
            ;(l.removeEventListener(fe, p),
              setTimeout(() => {
                const m = new CustomEvent(me, De)
                ;(l.addEventListener(me, h),
                  l.dispatchEvent(m),
                  m.defaultPrevented || A(c ?? document.body, { select: !0 }),
                  l.removeEventListener(me, h),
                  Te.remove(y))
              }, 0))
          }
        }
      }, [l, p, h, y]))
    const E = s.useCallback(
      (c) => {
        if ((!n && !r) || y.paused) return
        const d = c.key === 'Tab' && !c.altKey && !c.ctrlKey && !c.metaKey,
          m = document.activeElement
        if (d && m) {
          const x = c.currentTarget,
            [M, N] = $t(x)
          M && N
            ? !c.shiftKey && m === N
              ? (c.preventDefault(), n && A(M, { select: !0 }))
              : c.shiftKey && m === M && (c.preventDefault(), n && A(N, { select: !0 }))
            : m === x && c.preventDefault()
        }
      },
      [n, r, y.paused]
    )
    return v.jsx(_.div, { tabIndex: -1, ...u, ref: b, onKeyDown: E })
  })
at.displayName = Xt
function Yt(e, { select: t = !1 } = {}) {
  const n = document.activeElement
  for (const r of e) if ((A(r, { select: t }), document.activeElement !== n)) return
}
function $t(e) {
  const t = ot(e),
    n = Ae(t, e),
    r = Ae(t.reverse(), e)
  return [n, r]
}
function ot(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden'
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; n.nextNode(); ) t.push(n.currentNode)
  return t
}
function Ae(e, t) {
  for (const n of e) if (!Zt(n, { upTo: t })) return n
}
function Zt(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0
  for (; e; ) {
    if (t !== void 0 && e === t) return !1
    if (getComputedStyle(e).display === 'none') return !0
    e = e.parentElement
  }
  return !1
}
function Qt(e) {
  return e instanceof HTMLInputElement && 'select' in e
}
function A(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement
    ;(e.focus({ preventScroll: !0 }), e !== n && Qt(e) && t && e.select())
  }
}
var Te = Jt()
function Jt() {
  let e = []
  return {
    add(t) {
      const n = e[0]
      ;(t !== n && (n == null || n.pause()), (e = Re(e, t)), e.unshift(t))
    },
    remove(t) {
      var n
      ;((e = Re(e, t)), (n = e[0]) == null || n.resume())
    },
  }
}
function Re(e, t) {
  const n = [...e],
    r = n.indexOf(t)
  return (r !== -1 && n.splice(r, 1), n)
}
function en(e) {
  return e.filter((t) => t.tagName !== 'A')
}
var ve = 0
function tn() {
  s.useEffect(() => {
    const e = document.querySelectorAll('[data-radix-focus-guard]')
    return (
      document.body.insertAdjacentElement('afterbegin', e[0] ?? Ie()),
      document.body.insertAdjacentElement('beforeend', e[1] ?? Ie()),
      ve++,
      () => {
        ;(ve === 1 &&
          document.querySelectorAll('[data-radix-focus-guard]').forEach((t) => t.remove()),
          ve--)
      }
    )
  }, [])
}
function Ie() {
  const e = document.createElement('span')
  return (
    e.setAttribute('data-radix-focus-guard', ''),
    (e.tabIndex = 0),
    (e.style.outline = 'none'),
    (e.style.opacity = '0'),
    (e.style.position = 'fixed'),
    (e.style.pointerEvents = 'none'),
    e
  )
}
var k = function () {
  return (
    (k =
      Object.assign ||
      function (t) {
        for (var n, r = 1, o = arguments.length; r < o; r++) {
          n = arguments[r]
          for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
        }
        return t
      }),
    k.apply(this, arguments)
  )
}
function it(e, t) {
  var n = {}
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r])
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]])
  return n
}
function nn(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]))
  return e.concat(i || Array.prototype.slice.call(t))
}
var oe = 'right-scroll-bar-position',
  ie = 'width-before-scroll-bar',
  rn = 'with-scroll-bars-hidden',
  an = '--removed-body-scroll-bar-size'
function pe(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e)
}
function on(e, t) {
  var n = s.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value
        },
        set current(r) {
          var o = n.value
          o !== r && ((n.value = r), n.callback(r, o))
        },
      },
    }
  })[0]
  return ((n.callback = t), n.facade)
}
var ln = typeof window < 'u' ? s.useLayoutEffect : s.useEffect,
  Pe = new WeakMap()
function sn(e, t) {
  var n = on(null, function (r) {
    return e.forEach(function (o) {
      return pe(o, r)
    })
  })
  return (
    ln(
      function () {
        var r = Pe.get(n)
        if (r) {
          var o = new Set(r),
            i = new Set(e),
            u = n.current
          ;(o.forEach(function (l) {
            i.has(l) || pe(l, null)
          }),
            i.forEach(function (l) {
              o.has(l) || pe(l, u)
            }))
        }
        Pe.set(n, e)
      },
      [e]
    ),
    n
  )
}
function cn(e) {
  return e
}
function un(e, t) {
  t === void 0 && (t = cn)
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
          )
        return n.length ? n[n.length - 1] : e
      },
      useMedium: function (i) {
        var u = t(i, r)
        return (
          n.push(u),
          function () {
            n = n.filter(function (l) {
              return l !== u
            })
          }
        )
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var u = n
          ;((n = []), u.forEach(i))
        }
        n = {
          push: function (l) {
            return i(l)
          },
          filter: function () {
            return n
          },
        }
      },
      assignMedium: function (i) {
        r = !0
        var u = []
        if (n.length) {
          var l = n
          ;((n = []), l.forEach(i), (u = n))
        }
        var g = function () {
            var h = u
            ;((u = []), h.forEach(i))
          },
          p = function () {
            return Promise.resolve().then(g)
          }
        ;(p(),
          (n = {
            push: function (h) {
              ;(u.push(h), p())
            },
            filter: function (h) {
              return ((u = u.filter(h)), n)
            },
          }))
      },
    }
  return o
}
function dn(e) {
  e === void 0 && (e = {})
  var t = un(null)
  return ((t.options = k({ async: !0, ssr: !1 }, e)), t)
}
var lt = function (e) {
  var t = e.sideCar,
    n = it(e, ['sideCar'])
  if (!t) throw new Error('Sidecar: please provide `sideCar` property to import the right car')
  var r = t.read()
  if (!r) throw new Error('Sidecar medium not found')
  return s.createElement(r, k({}, n))
}
lt.isSideCarExport = !0
function fn(e, t) {
  return (e.useMedium(t), lt)
}
var st = dn(),
  ge = function () {},
  ce = s.forwardRef(function (e, t) {
    var n = s.useRef(null),
      r = s.useState({ onScrollCapture: ge, onWheelCapture: ge, onTouchMoveCapture: ge }),
      o = r[0],
      i = r[1],
      u = e.forwardProps,
      l = e.children,
      g = e.className,
      p = e.removeScrollBar,
      h = e.enabled,
      f = e.shards,
      b = e.sideCar,
      y = e.noRelative,
      E = e.noIsolation,
      c = e.inert,
      d = e.allowPinchZoom,
      m = e.as,
      x = m === void 0 ? 'div' : m,
      M = e.gapMode,
      N = it(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      S = b,
      j = sn([n, t]),
      D = k(k({}, N), o)
    return s.createElement(
      s.Fragment,
      null,
      h &&
        s.createElement(S, {
          sideCar: st,
          removeScrollBar: p,
          shards: f,
          noRelative: y,
          noIsolation: E,
          inert: c,
          setCallbacks: i,
          allowPinchZoom: !!d,
          lockRef: n,
          gapMode: M,
        }),
      u
        ? s.cloneElement(s.Children.only(l), k(k({}, D), { ref: j }))
        : s.createElement(x, k({}, D, { className: g, ref: j }), l)
    )
  })
ce.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }
ce.classNames = { fullWidth: ie, zeroRight: oe }
var mn = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__
}
function vn() {
  if (!document) return null
  var e = document.createElement('style')
  e.type = 'text/css'
  var t = mn()
  return (t && e.setAttribute('nonce', t), e)
}
function pn(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t))
}
function gn(e) {
  var t = document.head || document.getElementsByTagName('head')[0]
  t.appendChild(e)
}
var hn = function () {
    var e = 0,
      t = null
    return {
      add: function (n) {
        ;(e == 0 && (t = vn()) && (pn(t, n), gn(t)), e++)
      },
      remove: function () {
        ;(e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)))
      },
    }
  },
  bn = function () {
    var e = hn()
    return function (t, n) {
      s.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove()
            }
          )
        },
        [t && n]
      )
    }
  },
  ct = function () {
    var e = bn(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic
        return (e(r, o), null)
      }
    return t
  },
  yn = { left: 0, top: 0, right: 0, gap: 0 },
  he = function (e) {
    return parseInt(e || '', 10) || 0
  },
  xn = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      r = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      o = t[e === 'padding' ? 'paddingRight' : 'marginRight']
    return [he(n), he(r), he(o)]
  },
  Mn = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return yn
    var t = xn(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) }
  },
  Nn = ct(),
  U = 'data-scroll-locked',
  wn = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      u = e.right,
      l = e.gap
    return (
      n === void 0 && (n = 'margin'),
      `
  .`
        .concat(
          rn,
          ` {
   overflow: hidden `
        )
        .concat(
          r,
          `;
   padding-right: `
        )
        .concat(l, 'px ')
        .concat(
          r,
          `;
  }
  body[`
        )
        .concat(
          U,
          `] {
    overflow: hidden `
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && 'position: relative '.concat(r, ';'),
            n === 'margin' &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  i,
                  `px;
    padding-right: `
                )
                .concat(
                  u,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(l, 'px ')
                .concat(
                  r,
                  `;
    `
                ),
            n === 'padding' && 'padding-right: '.concat(l, 'px ').concat(r, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`
        )
        .concat(
          oe,
          ` {
    right: `
        )
        .concat(l, 'px ')
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(
          ie,
          ` {
    margin-right: `
        )
        .concat(l, 'px ')
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(oe, ' .')
        .concat(
          oe,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(ie, ' .')
        .concat(
          ie,
          ` {
    margin-right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  body[`
        )
        .concat(
          U,
          `] {
    `
        )
        .concat(an, ': ')
        .concat(
          l,
          `px;
  }
`
        )
    )
  },
  Be = function () {
    var e = parseInt(document.body.getAttribute(U) || '0', 10)
    return isFinite(e) ? e : 0
  },
  Sn = function () {
    s.useEffect(function () {
      return (
        document.body.setAttribute(U, (Be() + 1).toString()),
        function () {
          var e = Be() - 1
          e <= 0 ? document.body.removeAttribute(U) : document.body.setAttribute(U, e.toString())
        }
      )
    }, [])
  },
  En = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? 'margin' : r
    Sn()
    var i = s.useMemo(
      function () {
        return Mn(o)
      },
      [o]
    )
    return s.createElement(Nn, { styles: wn(i, !t, o, n ? '' : '!important') })
  },
  ye = !1
if (typeof window < 'u')
  try {
    var Y = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((ye = !0), !0)
      },
    })
    ;(window.addEventListener('test', Y, Y), window.removeEventListener('test', Y, Y))
  } catch {
    ye = !1
  }
var z = ye ? { passive: !1 } : !1,
  Cn = function (e) {
    return e.tagName === 'TEXTAREA'
  },
  ut = function (e, t) {
    if (!(e instanceof Element)) return !1
    var n = window.getComputedStyle(e)
    return n[t] !== 'hidden' && !(n.overflowY === n.overflowX && !Cn(e) && n[t] === 'visible')
  },
  kn = function (e) {
    return ut(e, 'overflowY')
  },
  Dn = function (e) {
    return ut(e, 'overflowX')
  },
  Fe = function (e, t) {
    var n = t.ownerDocument,
      r = t
    do {
      typeof ShadowRoot < 'u' && r instanceof ShadowRoot && (r = r.host)
      var o = dt(e, r)
      if (o) {
        var i = ft(e, r),
          u = i[1],
          l = i[2]
        if (u > l) return !0
      }
      r = r.parentNode
    } while (r && r !== n.body)
    return !1
  },
  An = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight
    return [t, n, r]
  },
  Tn = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth
    return [t, n, r]
  },
  dt = function (e, t) {
    return e === 'v' ? kn(t) : Dn(t)
  },
  ft = function (e, t) {
    return e === 'v' ? An(t) : Tn(t)
  },
  Rn = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1
  },
  In = function (e, t, n, r, o) {
    var i = Rn(e, window.getComputedStyle(t).direction),
      u = i * r,
      l = n.target,
      g = t.contains(l),
      p = !1,
      h = u > 0,
      f = 0,
      b = 0
    do {
      if (!l) break
      var y = ft(e, l),
        E = y[0],
        c = y[1],
        d = y[2],
        m = c - d - i * E
      ;(E || m) && dt(e, l) && ((f += m), (b += E))
      var x = l.parentNode
      l = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x
    } while ((!g && l !== document.body) || (g && (t.contains(l) || t === l)))
    return (((h && Math.abs(f) < 1) || (!h && Math.abs(b) < 1)) && (p = !0), p)
  },
  $ = function (e) {
    return 'changedTouches' in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0]
  },
  Oe = function (e) {
    return [e.deltaX, e.deltaY]
  },
  _e = function (e) {
    return e && 'current' in e ? e.current : e
  },
  Pn = function (e, t) {
    return e[0] === t[0] && e[1] === t[1]
  },
  Bn = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      )
  },
  Fn = 0,
  W = []
function On(e) {
  var t = s.useRef([]),
    n = s.useRef([0, 0]),
    r = s.useRef(),
    o = s.useState(Fn++)[0],
    i = s.useState(ct)[0],
    u = s.useRef(e)
  ;(s.useEffect(
    function () {
      u.current = e
    },
    [e]
  ),
    s.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(o))
          var c = nn([e.lockRef.current], (e.shards || []).map(_e), !0).filter(Boolean)
          return (
            c.forEach(function (d) {
              return d.classList.add('allow-interactivity-'.concat(o))
            }),
            function () {
              ;(document.body.classList.remove('block-interactivity-'.concat(o)),
                c.forEach(function (d) {
                  return d.classList.remove('allow-interactivity-'.concat(o))
                }))
            }
          )
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    ))
  var l = s.useCallback(function (c, d) {
      if (('touches' in c && c.touches.length === 2) || (c.type === 'wheel' && c.ctrlKey))
        return !u.current.allowPinchZoom
      var m = $(c),
        x = n.current,
        M = 'deltaX' in c ? c.deltaX : x[0] - m[0],
        N = 'deltaY' in c ? c.deltaY : x[1] - m[1],
        S,
        j = c.target,
        D = Math.abs(M) > Math.abs(N) ? 'h' : 'v'
      if ('touches' in c && D === 'h' && j.type === 'range') return !1
      var X = Fe(D, j)
      if (!X) return !0
      if ((X ? (S = D) : ((S = D === 'v' ? 'h' : 'v'), (X = Fe(D, j))), !X)) return !1
      if ((!r.current && 'changedTouches' in c && (M || N) && (r.current = S), !S)) return !0
      var Ee = r.current || S
      return In(Ee, d, c, Ee === 'h' ? M : N)
    }, []),
    g = s.useCallback(function (c) {
      var d = c
      if (!(!W.length || W[W.length - 1] !== i)) {
        var m = 'deltaY' in d ? Oe(d) : $(d),
          x = t.current.filter(function (S) {
            return (
              S.name === d.type &&
              (S.target === d.target || d.target === S.shadowParent) &&
              Pn(S.delta, m)
            )
          })[0]
        if (x && x.should) {
          d.cancelable && d.preventDefault()
          return
        }
        if (!x) {
          var M = (u.current.shards || [])
              .map(_e)
              .filter(Boolean)
              .filter(function (S) {
                return S.contains(d.target)
              }),
            N = M.length > 0 ? l(d, M[0]) : !u.current.noIsolation
          N && d.cancelable && d.preventDefault()
        }
      }
    }, []),
    p = s.useCallback(function (c, d, m, x) {
      var M = { name: c, delta: d, target: m, should: x, shadowParent: _n(m) }
      ;(t.current.push(M),
        setTimeout(function () {
          t.current = t.current.filter(function (N) {
            return N !== M
          })
        }, 1))
    }, []),
    h = s.useCallback(function (c) {
      ;((n.current = $(c)), (r.current = void 0))
    }, []),
    f = s.useCallback(function (c) {
      p(c.type, Oe(c), c.target, l(c, e.lockRef.current))
    }, []),
    b = s.useCallback(function (c) {
      p(c.type, $(c), c.target, l(c, e.lockRef.current))
    }, [])
  s.useEffect(function () {
    return (
      W.push(i),
      e.setCallbacks({ onScrollCapture: f, onWheelCapture: f, onTouchMoveCapture: b }),
      document.addEventListener('wheel', g, z),
      document.addEventListener('touchmove', g, z),
      document.addEventListener('touchstart', h, z),
      function () {
        ;((W = W.filter(function (c) {
          return c !== i
        })),
          document.removeEventListener('wheel', g, z),
          document.removeEventListener('touchmove', g, z),
          document.removeEventListener('touchstart', h, z))
      }
    )
  }, [])
  var y = e.removeScrollBar,
    E = e.inert
  return s.createElement(
    s.Fragment,
    null,
    E ? s.createElement(i, { styles: Bn(o) }) : null,
    y ? s.createElement(En, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  )
}
function _n(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode))
  return t
}
const Ln = fn(st, On)
var mt = s.forwardRef(function (e, t) {
  return s.createElement(ce, k({}, e, { ref: t, sideCar: Ln }))
})
mt.classNames = ce.classNames
var jn = function (e) {
    if (typeof document > 'u') return null
    var t = Array.isArray(e) ? e[0] : e
    return t.ownerDocument.body
  },
  H = new WeakMap(),
  Z = new WeakMap(),
  Q = {},
  be = 0,
  vt = function (e) {
    return e && (e.host || vt(e.parentNode))
  },
  zn = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n
        var r = vt(n)
        return r && e.contains(r)
          ? r
          : (console.error('aria-hidden', n, 'in not contained inside', e, '. Doing nothing'), null)
      })
      .filter(function (n) {
        return !!n
      })
  },
  Wn = function (e, t, n, r) {
    var o = zn(t, Array.isArray(e) ? e : [e])
    Q[n] || (Q[n] = new WeakMap())
    var i = Q[n],
      u = [],
      l = new Set(),
      g = new Set(o),
      p = function (f) {
        !f || l.has(f) || (l.add(f), p(f.parentNode))
      }
    o.forEach(p)
    var h = function (f) {
      !f ||
        g.has(f) ||
        Array.prototype.forEach.call(f.children, function (b) {
          if (l.has(b)) h(b)
          else
            try {
              var y = b.getAttribute(r),
                E = y !== null && y !== 'false',
                c = (H.get(b) || 0) + 1,
                d = (i.get(b) || 0) + 1
              ;(H.set(b, c),
                i.set(b, d),
                u.push(b),
                c === 1 && E && Z.set(b, !0),
                d === 1 && b.setAttribute(n, 'true'),
                E || b.setAttribute(r, 'true'))
            } catch (m) {
              console.error('aria-hidden: cannot operate on ', b, m)
            }
        })
    }
    return (
      h(t),
      l.clear(),
      be++,
      function () {
        ;(u.forEach(function (f) {
          var b = H.get(f) - 1,
            y = i.get(f) - 1
          ;(H.set(f, b),
            i.set(f, y),
            b || (Z.has(f) || f.removeAttribute(r), Z.delete(f)),
            y || f.removeAttribute(n))
        }),
          be--,
          be || ((H = new WeakMap()), (H = new WeakMap()), (Z = new WeakMap()), (Q = {})))
      }
    )
  },
  Hn = function (e, t, n) {
    n === void 0 && (n = 'data-aria-hidden')
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = jn(e)
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll('[aria-live], script'))),
        Wn(r, o, n, 'aria-hidden'))
      : function () {
          return null
        }
  },
  ue = 'Dialog',
  [pt, vr] = _t(ue),
  [Un, C] = pt(ue),
  gt = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        modal: u = !0,
      } = e,
      l = s.useRef(null),
      g = s.useRef(null),
      [p, h] = Ot({ prop: r, defaultProp: o ?? !1, onChange: i, caller: ue })
    return v.jsx(Un, {
      scope: t,
      triggerRef: l,
      contentRef: g,
      contentId: de(),
      titleId: de(),
      descriptionId: de(),
      open: p,
      onOpenChange: h,
      onOpenToggle: s.useCallback(() => h((f) => !f), [h]),
      modal: u,
      children: n,
    })
  }
gt.displayName = ue
var ht = 'DialogTrigger',
  bt = s.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = C(ht, n),
      i = se(t, o.triggerRef)
    return v.jsx(_.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': o.open,
      'aria-controls': o.contentId,
      'data-state': we(o.open),
      ...r,
      ref: i,
      onClick: q(e.onClick, o.onOpenToggle),
    })
  })
bt.displayName = ht
var Me = 'DialogPortal',
  [Gn, yt] = pt(Me, { forceMount: void 0 }),
  xt = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      i = C(Me, t)
    return v.jsx(Gn, {
      scope: t,
      forceMount: n,
      children: s.Children.map(r, (u) =>
        v.jsx(xe, {
          present: n || i.open,
          children: v.jsx(rt, { asChild: !0, container: o, children: u }),
        })
      ),
    })
  }
xt.displayName = Me
var le = 'DialogOverlay',
  Mt = s.forwardRef((e, t) => {
    const n = yt(le, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = C(le, e.__scopeDialog)
    return i.modal
      ? v.jsx(xe, { present: r || i.open, children: v.jsx(Kn, { ...o, ref: t }) })
      : null
  })
Mt.displayName = le
var Vn = zt('DialogOverlay.RemoveScroll'),
  Kn = s.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = C(le, n)
    return v.jsx(mt, {
      as: Vn,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: v.jsx(_.div, {
        'data-state': we(o.open),
        ...r,
        ref: t,
        style: { pointerEvents: 'auto', ...r.style },
      }),
    })
  }),
  O = 'DialogContent',
  Nt = s.forwardRef((e, t) => {
    const n = yt(O, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = C(O, e.__scopeDialog)
    return v.jsx(xe, {
      present: r || i.open,
      children: i.modal ? v.jsx(qn, { ...o, ref: t }) : v.jsx(Xn, { ...o, ref: t }),
    })
  })
Nt.displayName = O
var qn = s.forwardRef((e, t) => {
    const n = C(O, e.__scopeDialog),
      r = s.useRef(null),
      o = se(t, n.contentRef, r)
    return (
      s.useEffect(() => {
        const i = r.current
        if (i) return Hn(i)
      }, []),
      v.jsx(wt, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: q(e.onCloseAutoFocus, (i) => {
          var u
          ;(i.preventDefault(), (u = n.triggerRef.current) == null || u.focus())
        }),
        onPointerDownOutside: q(e.onPointerDownOutside, (i) => {
          const u = i.detail.originalEvent,
            l = u.button === 0 && u.ctrlKey === !0
          ;(u.button === 2 || l) && i.preventDefault()
        }),
        onFocusOutside: q(e.onFocusOutside, (i) => i.preventDefault()),
      })
    )
  }),
  Xn = s.forwardRef((e, t) => {
    const n = C(O, e.__scopeDialog),
      r = s.useRef(!1),
      o = s.useRef(!1)
    return v.jsx(wt, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (i) => {
        var u, l
        ;((u = e.onCloseAutoFocus) == null || u.call(e, i),
          i.defaultPrevented ||
            (r.current || (l = n.triggerRef.current) == null || l.focus(), i.preventDefault()),
          (r.current = !1),
          (o.current = !1))
      },
      onInteractOutside: (i) => {
        var g, p
        ;((g = e.onInteractOutside) == null || g.call(e, i),
          i.defaultPrevented ||
            ((r.current = !0), i.detail.originalEvent.type === 'pointerdown' && (o.current = !0)))
        const u = i.target
        ;(((p = n.triggerRef.current) == null ? void 0 : p.contains(u)) && i.preventDefault(),
          i.detail.originalEvent.type === 'focusin' && o.current && i.preventDefault())
      },
    })
  }),
  wt = s.forwardRef((e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: i, ...u } = e,
      l = C(O, n),
      g = s.useRef(null),
      p = se(t, g)
    return (
      tn(),
      v.jsxs(v.Fragment, {
        children: [
          v.jsx(at, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: i,
            children: v.jsx(Lt, {
              role: 'dialog',
              id: l.contentId,
              'aria-describedby': l.descriptionId,
              'aria-labelledby': l.titleId,
              'data-state': we(l.open),
              ...u,
              ref: p,
              onDismiss: () => l.onOpenChange(!1),
            }),
          }),
          v.jsxs(v.Fragment, {
            children: [
              v.jsx(Yn, { titleId: l.titleId }),
              v.jsx(Zn, { contentRef: g, descriptionId: l.descriptionId }),
            ],
          }),
        ],
      })
    )
  }),
  Ne = 'DialogTitle',
  St = s.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = C(Ne, n)
    return v.jsx(_.h2, { id: o.titleId, ...r, ref: t })
  })
St.displayName = Ne
var Et = 'DialogDescription',
  Ct = s.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = C(Et, n)
    return v.jsx(_.p, { id: o.descriptionId, ...r, ref: t })
  })
Ct.displayName = Et
var kt = 'DialogClose',
  Dt = s.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = C(kt, n)
    return v.jsx(_.button, {
      type: 'button',
      ...r,
      ref: t,
      onClick: q(e.onClick, () => o.onOpenChange(!1)),
    })
  })
Dt.displayName = kt
function we(e) {
  return e ? 'open' : 'closed'
}
var At = 'DialogTitleWarning',
  [pr, Tt] = jt(At, { contentName: O, titleName: Ne, docsSlug: 'dialog' }),
  Yn = ({ titleId: e }) => {
    const t = Tt(At),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`
    return (
      s.useEffect(() => {
        e && (document.getElementById(e) || console.error(n))
      }, [n, e]),
      null
    )
  },
  $n = 'DialogDescriptionWarning',
  Zn = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Tt($n).contentName}}.`
    return (
      s.useEffect(() => {
        var i
        const o = (i = e.current) == null ? void 0 : i.getAttribute('aria-describedby')
        t && o && (document.getElementById(t) || console.warn(r))
      }, [r, e, t]),
      null
    )
  },
  Qn = gt,
  Jn = bt,
  er = xt,
  Rt = Mt,
  It = Nt,
  Pt = St,
  Bt = Ct,
  tr = Dt
function T() {
  return (
    (T = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    T.apply(null, arguments)
  )
}
const L = Qn,
  K = Jn,
  nr = er,
  Se = s.forwardRef(({ className: e, ...t }, n) =>
    a(
      Rt,
      T(
        {
          ref: n,
          className: V(
            'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            e
          ),
        },
        t
      )
    )
  )
Se.displayName = Rt.displayName
const R = s.forwardRef(({ className: e, children: t, ...n }, r) =>
  a(
    nr,
    null,
    a(Se, null),
    a(
      It,
      T(
        {
          ref: r,
          className: V(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            e
          ),
        },
        n
      ),
      t,
      a(
        tr,
        {
          className:
            'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
        },
        a(G, { icon: Ht, className: 'h-4 w-4' }),
        a('span', { className: 'sr-only' }, 'Schließen')
      )
    )
  )
)
R.displayName = It.displayName
const I = ({ className: e, ...t }) =>
  a('div', T({ className: V('flex flex-col space-y-1.5 text-center sm:text-left', e) }, t))
I.displayName = 'ModalHeader'
const P = ({ className: e, ...t }) =>
  a(
    'div',
    T({ className: V('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', e) }, t)
  )
P.displayName = 'ModalFooter'
const B = s.forwardRef(({ className: e, ...t }, n) =>
  a(Pt, T({ ref: n, className: V('text-lg font-semibold leading-none tracking-tight', e) }, t))
)
B.displayName = Pt.displayName
const F = s.forwardRef(({ className: e, ...t }, n) =>
  a(Bt, T({ ref: n, className: V('text-sm text-muted-foreground', e) }, t))
)
F.displayName = Bt.displayName
Se.__docgenInfo = { description: '', methods: [] }
R.__docgenInfo = { description: '', methods: [] }
I.__docgenInfo = { description: '', methods: [], displayName: 'ModalHeader' }
P.__docgenInfo = { description: '', methods: [], displayName: 'ModalFooter' }
B.__docgenInfo = { description: '', methods: [] }
F.__docgenInfo = { description: '', methods: [] }
const gr = {
    title: 'Molecules/Modal',
    component: L,
    parameters: {
      layout: 'centered',
      docs: {
        description: { component: 'Ein flexibles Modal/Dialog-Component für Overlays und Popups.' },
      },
    },
    tags: ['autodocs'],
  },
  J = {
    render: () =>
      a(
        L,
        null,
        a(K, { asChild: !0 }, a(w, null, 'Modal öffnen')),
        a(
          R,
          null,
          a(
            I,
            null,
            a(B, null, 'Modal Titel'),
            a(
              F,
              null,
              'Dies ist eine Beschreibung des Modals. Hier können Sie weitere Informationen hinzufügen.'
            )
          ),
          a(
            'div',
            { className: 'py-4' },
            a(
              'p',
              { className: 'text-sm text-muted-foreground' },
              'Der Inhalt des Modals kann beliebig gestaltet werden. Sie können hier Formulare, Informationen oder andere Komponenten einfügen.'
            )
          ),
          a(P, null, a(w, { variant: 'outline' }, 'Abbrechen'), a(w, null, 'Speichern'))
        )
      ),
  },
  ee = {
    render: () =>
      a(
        L,
        null,
        a(
          K,
          { asChild: !0 },
          a(w, { variant: 'destructive' }, a(G, { icon: Vt, className: 'mr-2 h-4 w-4' }), 'Löschen')
        ),
        a(
          R,
          null,
          a(
            I,
            null,
            a(B, null, 'Sind Sie sicher?'),
            a(
              F,
              null,
              'Diese Aktion kann nicht rückgängig gemacht werden. Das Element wird permanent gelöscht.'
            )
          ),
          a(
            P,
            null,
            a(w, { variant: 'outline' }, 'Abbrechen'),
            a(w, { variant: 'destructive' }, 'Endgültig löschen')
          )
        )
      ),
  },
  te = {
    render: () =>
      a(
        L,
        null,
        a(
          K,
          { asChild: !0 },
          a(w, null, a(G, { icon: Kt, className: 'mr-2 h-4 w-4' }), 'Benutzer hinzufügen')
        ),
        a(
          R,
          { className: 'sm:max-w-md' },
          a(
            I,
            null,
            a(B, null, 'Neuen Benutzer hinzufügen'),
            a(F, null, 'Fügen Sie einen neuen Benutzer zu Ihrem Team hinzu.')
          ),
          a(
            'div',
            { className: 'grid gap-4 py-4' },
            a(
              'div',
              { className: 'grid gap-2' },
              a('label', { htmlFor: 'name', className: 'text-sm font-medium' }, 'Name'),
              a('input', {
                id: 'name',
                type: 'text',
                placeholder: 'Max Mustermann',
                className: 'h-9 rounded-md border border-input bg-background px-3 text-sm',
              })
            ),
            a(
              'div',
              { className: 'grid gap-2' },
              a('label', { htmlFor: 'email', className: 'text-sm font-medium' }, 'E-Mail'),
              a('input', {
                id: 'email',
                type: 'email',
                placeholder: 'max@beispiel.de',
                className: 'h-9 rounded-md border border-input bg-background px-3 text-sm',
              })
            ),
            a(
              'div',
              { className: 'grid gap-2' },
              a('label', { htmlFor: 'role', className: 'text-sm font-medium' }, 'Rolle'),
              a(
                'select',
                {
                  id: 'role',
                  className: 'h-9 rounded-md border border-input bg-background px-3 text-sm',
                },
                a('option', null, 'Mitglied'),
                a('option', null, 'Administrator'),
                a('option', null, 'Gast')
              )
            )
          ),
          a(P, null, a(w, { variant: 'outline' }, 'Abbrechen'), a(w, null, 'Benutzer hinzufügen'))
        )
      ),
  },
  ne = {
    render: () =>
      a(
        L,
        null,
        a(
          K,
          { asChild: !0 },
          a(
            w,
            { variant: 'outline' },
            a(G, { icon: ke, className: 'mr-2 h-4 w-4' }),
            'Warnung anzeigen'
          )
        ),
        a(
          R,
          null,
          a(
            I,
            null,
            a(
              'div',
              { className: 'flex items-center gap-2' },
              a(
                'div',
                {
                  className:
                    'flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100',
                },
                a(G, { icon: ke, className: 'h-5 w-5 text-yellow-600' })
              ),
              a(
                'div',
                null,
                a(B, null, 'Achtung erforderlich'),
                a(F, null, 'Es gibt ein Problem, das Ihre Aufmerksamkeit erfordert.')
              )
            )
          ),
          a(
            'div',
            { className: 'py-4' },
            a(
              'p',
              { className: 'text-sm' },
              'Ihr Speicherplatz ist fast voll. Sie haben nur noch 15% freien Speicherplatz. Bitte löschen Sie einige Dateien oder upgraden Sie Ihren Plan.'
            ),
            a(
              'div',
              { className: 'mt-4 flex items-center gap-2' },
              a(Ut, { variant: 'warning' }, '15% verfügbar'),
              a('span', { className: 'text-sm text-muted-foreground' }, '850 MB von 1 GB verwendet')
            )
          ),
          a(P, null, a(w, { variant: 'outline' }, 'Später'), a(w, null, 'Speicher verwalten'))
        )
      ),
  },
  re = {
    render: () =>
      a(
        L,
        null,
        a(
          K,
          { asChild: !0 },
          a(w, { variant: 'ghost', size: 'icon' }, a(G, { icon: Gt, className: 'h-4 w-4' }))
        ),
        a(
          R,
          { className: 'sm:max-w-2xl' },
          a(
            I,
            null,
            a(B, null, 'Einstellungen'),
            a(F, null, 'Verwalten Sie Ihre Anwendungseinstellungen und Präferenzen.')
          ),
          a(
            'div',
            { className: 'py-4' },
            a(
              'div',
              { className: 'space-y-4' },
              a(
                'div',
                { className: 'flex items-center justify-between' },
                a(
                  'div',
                  null,
                  a('p', { className: 'font-medium' }, 'Benachrichtigungen'),
                  a(
                    'p',
                    { className: 'text-sm text-muted-foreground' },
                    'Erhalten Sie Benachrichtigungen über wichtige Updates'
                  )
                ),
                a('input', { type: 'checkbox', className: 'h-4 w-4 rounded', defaultChecked: !0 })
              ),
              a(
                'div',
                { className: 'flex items-center justify-between' },
                a(
                  'div',
                  null,
                  a('p', { className: 'font-medium' }, 'Dark Mode'),
                  a(
                    'p',
                    { className: 'text-sm text-muted-foreground' },
                    'Aktivieren Sie das dunkle Farbschema'
                  )
                ),
                a('input', { type: 'checkbox', className: 'h-4 w-4 rounded' })
              ),
              a(
                'div',
                { className: 'flex items-center justify-between' },
                a(
                  'div',
                  null,
                  a('p', { className: 'font-medium' }, 'Automatische Updates'),
                  a(
                    'p',
                    { className: 'text-sm text-muted-foreground' },
                    'Installieren Sie Updates automatisch'
                  )
                ),
                a('input', { type: 'checkbox', className: 'h-4 w-4 rounded', defaultChecked: !0 })
              )
            )
          ),
          a(P, null, a(w, { variant: 'outline' }, 'Abbrechen'), a(w, null, 'Änderungen speichern'))
        )
      ),
  },
  ae = {
    render: () =>
      a(
        L,
        null,
        a(K, { asChild: !0 }, a(w, null, 'Große Inhalte anzeigen')),
        a(
          R,
          { className: 'max-h-[80vh] sm:max-w-4xl' },
          a(
            I,
            null,
            a(B, null, 'Nutzungsbedingungen'),
            a(F, null, 'Bitte lesen Sie unsere Nutzungsbedingungen sorgfältig durch.')
          ),
          a(
            'div',
            { className: 'overflow-y-auto py-4' },
            Array.from({ length: 10 }, (e, t) =>
              a(
                'div',
                { key: t, className: 'mb-4' },
                a('h3', { className: 'mb-2 font-medium' }, '§ ', t + 1, ' Abschnitt ', t + 1),
                a(
                  'p',
                  { className: 'text-sm text-muted-foreground' },
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                )
              )
            )
          ),
          a(P, null, a(w, { variant: 'outline' }, 'Ablehnen'), a(w, null, 'Akzeptieren'))
        )
      ),
  }
var Le, je, ze
J.parameters = {
  ...J.parameters,
  docs: {
    ...((Le = J.parameters) == null ? void 0 : Le.docs),
    source: {
      originalSource: `{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button>Modal öffnen</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Titel</ModalTitle>
          <ModalDescription>
            Dies ist eine Beschreibung des Modals. Hier können Sie weitere Informationen hinzufügen.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Der Inhalt des Modals kann beliebig gestaltet werden. Sie können hier Formulare,
            Informationen oder andere Komponenten einfügen.
          </p>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,
      ...((ze = (je = J.parameters) == null ? void 0 : je.docs) == null ? void 0 : ze.source),
    },
  },
}
var We, He, Ue
ee.parameters = {
  ...ee.parameters,
  docs: {
    ...((We = ee.parameters) == null ? void 0 : We.docs),
    source: {
      originalSource: `{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">
          <LucideIconWrapper icon={Trash2} className="mr-2 h-4 w-4" />
          Löschen
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Sind Sie sicher?</ModalTitle>
          <ModalDescription>
            Diese Aktion kann nicht rückgängig gemacht werden. Das Element wird permanent gelöscht.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button variant="destructive">Endgültig löschen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,
      ...((Ue = (He = ee.parameters) == null ? void 0 : He.docs) == null ? void 0 : Ue.source),
    },
  },
}
var Ge, Ve, Ke
te.parameters = {
  ...te.parameters,
  docs: {
    ...((Ge = te.parameters) == null ? void 0 : Ge.docs),
    source: {
      originalSource: `{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button>
          <LucideIconWrapper icon={UserPlus} className="mr-2 h-4 w-4" />
          Benutzer hinzufügen
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>Neuen Benutzer hinzufügen</ModalTitle>
          <ModalDescription>
            Fügen Sie einen neuen Benutzer zu Ihrem Team hinzu.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input id="name" type="text" placeholder="Max Mustermann" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-Mail
            </label>
            <input id="email" type="email" placeholder="max@beispiel.de" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="role" className="text-sm font-medium">
              Rolle
            </label>
            <select id="role" className="h-9 rounded-md border border-input bg-background px-3 text-sm">
              <option>Mitglied</option>
              <option>Administrator</option>
              <option>Gast</option>
            </select>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Benutzer hinzufügen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,
      ...((Ke = (Ve = te.parameters) == null ? void 0 : Ve.docs) == null ? void 0 : Ke.source),
    },
  },
}
var qe, Xe, Ye
ne.parameters = {
  ...ne.parameters,
  docs: {
    ...((qe = ne.parameters) == null ? void 0 : qe.docs),
    source: {
      originalSource: `{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">
          <LucideIconWrapper icon={AlertCircle} className="mr-2 h-4 w-4" />
          Warnung anzeigen
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <LucideIconWrapper icon={AlertCircle} className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <ModalTitle>Achtung erforderlich</ModalTitle>
              <ModalDescription>
                Es gibt ein Problem, das Ihre Aufmerksamkeit erfordert.
              </ModalDescription>
            </div>
          </div>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm">
            Ihr Speicherplatz ist fast voll. Sie haben nur noch 15% freien Speicherplatz.
            Bitte löschen Sie einige Dateien oder upgraden Sie Ihren Plan.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="warning">15% verfügbar</Badge>
            <span className="text-sm text-muted-foreground">850 MB von 1 GB verwendet</span>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Später</Button>
          <Button>Speicher verwalten</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,
      ...((Ye = (Xe = ne.parameters) == null ? void 0 : Xe.docs) == null ? void 0 : Ye.source),
    },
  },
}
var $e, Ze, Qe
re.parameters = {
  ...re.parameters,
  docs: {
    ...(($e = re.parameters) == null ? void 0 : $e.docs),
    source: {
      originalSource: `{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucideIconWrapper icon={Settings} className="h-4 w-4" />
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-2xl">
        <ModalHeader>
          <ModalTitle>Einstellungen</ModalTitle>
          <ModalDescription>
            Verwalten Sie Ihre Anwendungseinstellungen und Präferenzen.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Benachrichtigungen</p>
                <p className="text-sm text-muted-foreground">
                  Erhalten Sie Benachrichtigungen über wichtige Updates
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Aktivieren Sie das dunkle Farbschema
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatische Updates</p>
                <p className="text-sm text-muted-foreground">
                  Installieren Sie Updates automatisch
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Änderungen speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,
      ...((Qe = (Ze = re.parameters) == null ? void 0 : Ze.docs) == null ? void 0 : Qe.source),
    },
  },
}
var Je, et, tt
ae.parameters = {
  ...ae.parameters,
  docs: {
    ...((Je = ae.parameters) == null ? void 0 : Je.docs),
    source: {
      originalSource: `{
  render: () => <Modal>
      <ModalTrigger asChild>
        <Button>Große Inhalte anzeigen</Button>
      </ModalTrigger>
      <ModalContent className="max-h-[80vh] sm:max-w-4xl">
        <ModalHeader>
          <ModalTitle>Nutzungsbedingungen</ModalTitle>
          <ModalDescription>
            Bitte lesen Sie unsere Nutzungsbedingungen sorgfältig durch.
          </ModalDescription>
        </ModalHeader>
        <div className="overflow-y-auto py-4">
          {Array.from({
          length: 10
        }, (_, i) => <div key={i} className="mb-4">
              <h3 className="mb-2 font-medium">§ {i + 1} Abschnitt {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>)}
        </div>
        <ModalFooter>
          <Button variant="outline">Ablehnen</Button>
          <Button>Akzeptieren</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}`,
      ...((tt = (et = ae.parameters) == null ? void 0 : et.docs) == null ? void 0 : tt.source),
    },
  },
}
const hr = ['Default', 'Confirmation', 'FormModal', 'Alert', 'SettingsModal', 'LargeContent']
export {
  ne as Alert,
  ee as Confirmation,
  J as Default,
  te as FormModal,
  ae as LargeContent,
  re as SettingsModal,
  hr as __namedExportsOrder,
  gr as default,
}
