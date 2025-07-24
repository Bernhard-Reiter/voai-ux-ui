import { r as g, j as f } from './iframe-RsHbt8uy.js'
import {
  P as me,
  u as $e,
  c as Wt,
  a as Dn,
  b as Ln,
  d as kn,
  e as re,
  f as Mn,
  D as Bn,
} from './index-Ba6GDh-1.js'
import { j as E, u as Le, c as _n } from './index-C4ESynIQ.js'
import { r as Hn } from './index-CBPhPhPK.js'
import { a as In, L as ne } from './lucide-wrapper-MqQNZape.js'
import { B as U } from './Button-DnyYgvCD.js'
import { B as ft } from './Badge-DsgB-mpp.js'
import { H as Ee } from './help-circle-DoW5kDqM.js'
import { I as zn } from './info-Dtqw4Mqm.js'
import { S as jn } from './settings-DboNApfp.js'
import { U as $n } from './user-DFbMOwPs.js'
import './bundle-mjs-B2rm_Apj.js'
const Fn = ['top', 'right', 'bottom', 'left'],
  ee = Math.min,
  $ = Math.max,
  Oe = Math.round,
  we = Math.floor,
  X = (e) => ({ x: e, y: e }),
  Wn = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
  Vn = { start: 'end', end: 'start' }
function Fe(e, t, n) {
  return $(e, ee(t, n))
}
function J(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function Q(e) {
  return e.split('-')[0]
}
function ae(e) {
  return e.split('-')[1]
}
function Ge(e) {
  return e === 'x' ? 'y' : 'x'
}
function Xe(e) {
  return e === 'y' ? 'height' : 'width'
}
const Yn = new Set(['top', 'bottom'])
function G(e) {
  return Yn.has(Q(e)) ? 'y' : 'x'
}
function qe(e) {
  return Ge(G(e))
}
function Zn(e, t, n) {
  n === void 0 && (n = !1)
  const o = ae(e),
    r = qe(e),
    i = Xe(r)
  let s =
    r === 'x' ? (o === (n ? 'end' : 'start') ? 'right' : 'left') : o === 'start' ? 'bottom' : 'top'
  return (t.reference[i] > t.floating[i] && (s = Se(s)), [s, Se(s)])
}
function Un(e) {
  const t = Se(e)
  return [We(e), t, We(t)]
}
function We(e) {
  return e.replace(/start|end/g, (t) => Vn[t])
}
const dt = ['left', 'right'],
  pt = ['right', 'left'],
  Gn = ['top', 'bottom'],
  Xn = ['bottom', 'top']
function qn(e, t, n) {
  switch (e) {
    case 'top':
    case 'bottom':
      return n ? (t ? pt : dt) : t ? dt : pt
    case 'left':
    case 'right':
      return t ? Gn : Xn
    default:
      return []
  }
}
function Kn(e, t, n, o) {
  const r = ae(e)
  let i = qn(Q(e), n === 'start', o)
  return (r && ((i = i.map((s) => s + '-' + r)), t && (i = i.concat(i.map(We)))), i)
}
function Se(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Wn[t])
}
function Jn(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e }
}
function Vt(e) {
  return typeof e != 'number' ? Jn(e) : { top: e, right: e, bottom: e, left: e }
}
function Ne(e) {
  const { x: t, y: n, width: o, height: r } = e
  return { width: o, height: r, top: n, left: t, right: t + o, bottom: n + r, x: t, y: n }
}
function mt(e, t, n) {
  let { reference: o, floating: r } = e
  const i = G(t),
    s = qe(t),
    a = Xe(s),
    l = Q(t),
    u = i === 'y',
    c = o.x + o.width / 2 - r.width / 2,
    p = o.y + o.height / 2 - r.height / 2,
    m = o[a] / 2 - r[a] / 2
  let d
  switch (l) {
    case 'top':
      d = { x: c, y: o.y - r.height }
      break
    case 'bottom':
      d = { x: c, y: o.y + o.height }
      break
    case 'right':
      d = { x: o.x + o.width, y: p }
      break
    case 'left':
      d = { x: o.x - r.width, y: p }
      break
    default:
      d = { x: o.x, y: o.y }
  }
  switch (ae(t)) {
    case 'start':
      d[s] -= m * (n && u ? -1 : 1)
      break
    case 'end':
      d[s] += m * (n && u ? -1 : 1)
      break
  }
  return d
}
const Qn = async (e, t, n) => {
  const { placement: o = 'bottom', strategy: r = 'absolute', middleware: i = [], platform: s } = n,
    a = i.filter(Boolean),
    l = await (s.isRTL == null ? void 0 : s.isRTL(t))
  let u = await s.getElementRects({ reference: e, floating: t, strategy: r }),
    { x: c, y: p } = mt(u, o, l),
    m = o,
    d = {},
    h = 0
  for (let x = 0; x < a.length; x++) {
    const { name: w, fn: v } = a[x],
      {
        x: y,
        y: C,
        data: T,
        reset: b,
      } = await v({
        x: c,
        y: p,
        initialPlacement: o,
        placement: m,
        strategy: r,
        middlewareData: d,
        rects: u,
        platform: s,
        elements: { reference: e, floating: t },
      })
    ;((c = y ?? c),
      (p = C ?? p),
      (d = { ...d, [w]: { ...d[w], ...T } }),
      b &&
        h <= 50 &&
        (h++,
        typeof b == 'object' &&
          (b.placement && (m = b.placement),
          b.rects &&
            (u =
              b.rects === !0
                ? await s.getElementRects({ reference: e, floating: t, strategy: r })
                : b.rects),
          ({ x: c, y: p } = mt(u, m, l))),
        (x = -1)))
  }
  return { x: c, y: p, placement: m, strategy: r, middlewareData: d }
}
async function fe(e, t) {
  var n
  t === void 0 && (t = {})
  const { x: o, y: r, platform: i, rects: s, elements: a, strategy: l } = e,
    {
      boundary: u = 'clippingAncestors',
      rootBoundary: c = 'viewport',
      elementContext: p = 'floating',
      altBoundary: m = !1,
      padding: d = 0,
    } = J(t, e),
    h = Vt(d),
    w = a[m ? (p === 'floating' ? 'reference' : 'floating') : p],
    v = Ne(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null || n
            ? w
            : w.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating))),
        boundary: u,
        rootBoundary: c,
        strategy: l,
      })
    ),
    y =
      p === 'floating'
        ? { x: o, y: r, width: s.floating.width, height: s.floating.height }
        : s.reference,
    C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)),
    T = (await (i.isElement == null ? void 0 : i.isElement(C)))
      ? (await (i.getScale == null ? void 0 : i.getScale(C))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    b = Ne(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: y,
            offsetParent: C,
            strategy: l,
          })
        : y
    )
  return {
    top: (v.top - b.top + h.top) / T.y,
    bottom: (b.bottom - v.bottom + h.bottom) / T.y,
    left: (v.left - b.left + h.left) / T.x,
    right: (b.right - v.right + h.right) / T.x,
  }
}
const eo = (e) => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: n, y: o, placement: r, rects: i, platform: s, elements: a, middlewareData: l } = t,
        { element: u, padding: c = 0 } = J(e, t) || {}
      if (u == null) return {}
      const p = Vt(c),
        m = { x: n, y: o },
        d = qe(r),
        h = Xe(d),
        x = await s.getDimensions(u),
        w = d === 'y',
        v = w ? 'top' : 'left',
        y = w ? 'bottom' : 'right',
        C = w ? 'clientHeight' : 'clientWidth',
        T = i.reference[h] + i.reference[d] - m[d] - i.floating[h],
        b = m[d] - i.reference[d],
        P = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u))
      let R = P ? P[C] : 0
      ;(!R || !(await (s.isElement == null ? void 0 : s.isElement(P)))) &&
        (R = a.floating[C] || i.floating[h])
      const k = T / 2 - b / 2,
        I = R / 2 - x[h] / 2 - 1,
        L = ee(p[v], I),
        B = ee(p[y], I),
        _ = L,
        S = R - x[h] - B,
        O = R / 2 - x[h] / 2 + k,
        j = Fe(_, O, S),
        N =
          !l.arrow &&
          ae(r) != null &&
          O !== j &&
          i.reference[h] / 2 - (O < _ ? L : B) - x[h] / 2 < 0,
        D = N ? (O < _ ? O - _ : O - S) : 0
      return {
        [d]: m[d] + D,
        data: { [d]: j, centerOffset: O - j - D, ...(N && { alignmentOffset: D }) },
        reset: N,
      }
    },
  }),
  to = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var n, o
          const {
              placement: r,
              middlewareData: i,
              rects: s,
              initialPlacement: a,
              platform: l,
              elements: u,
            } = t,
            {
              mainAxis: c = !0,
              crossAxis: p = !0,
              fallbackPlacements: m,
              fallbackStrategy: d = 'bestFit',
              fallbackAxisSideDirection: h = 'none',
              flipAlignment: x = !0,
              ...w
            } = J(e, t)
          if ((n = i.arrow) != null && n.alignmentOffset) return {}
          const v = Q(r),
            y = G(a),
            C = Q(a) === a,
            T = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)),
            b = m || (C || !x ? [Se(a)] : Un(a)),
            P = h !== 'none'
          !m && P && b.push(...Kn(a, x, h, T))
          const R = [a, ...b],
            k = await fe(t, w),
            I = []
          let L = ((o = i.flip) == null ? void 0 : o.overflows) || []
          if ((c && I.push(k[v]), p)) {
            const O = Zn(r, s, T)
            I.push(k[O[0]], k[O[1]])
          }
          if (((L = [...L, { placement: r, overflows: I }]), !I.every((O) => O <= 0))) {
            var B, _
            const O = (((B = i.flip) == null ? void 0 : B.index) || 0) + 1,
              j = R[O]
            if (
              j &&
              (!(p === 'alignment' ? y !== G(j) : !1) ||
                L.every((A) => A.overflows[0] > 0 && G(A.placement) === y))
            )
              return { data: { index: O, overflows: L }, reset: { placement: j } }
            let N =
              (_ = L.filter((D) => D.overflows[0] <= 0).sort(
                (D, A) => D.overflows[1] - A.overflows[1]
              )[0]) == null
                ? void 0
                : _.placement
            if (!N)
              switch (d) {
                case 'bestFit': {
                  var S
                  const D =
                    (S = L.filter((A) => {
                      if (P) {
                        const M = G(A.placement)
                        return M === y || M === 'y'
                      }
                      return !0
                    })
                      .map((A) => [
                        A.placement,
                        A.overflows.filter((M) => M > 0).reduce((M, Z) => M + Z, 0),
                      ])
                      .sort((A, M) => A[1] - M[1])[0]) == null
                      ? void 0
                      : S[0]
                  D && (N = D)
                  break
                }
                case 'initialPlacement':
                  N = a
                  break
              }
            if (r !== N) return { reset: { placement: N } }
          }
          return {}
        },
      }
    )
  }
function ht(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  }
}
function gt(e) {
  return Fn.some((t) => e[t] >= 0)
}
const no = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: n } = t,
            { strategy: o = 'referenceHidden', ...r } = J(e, t)
          switch (o) {
            case 'referenceHidden': {
              const i = await fe(t, { ...r, elementContext: 'reference' }),
                s = ht(i, n.reference)
              return { data: { referenceHiddenOffsets: s, referenceHidden: gt(s) } }
            }
            case 'escaped': {
              const i = await fe(t, { ...r, altBoundary: !0 }),
                s = ht(i, n.floating)
              return { data: { escapedOffsets: s, escaped: gt(s) } }
            }
            default:
              return {}
          }
        },
      }
    )
  },
  Yt = new Set(['left', 'top'])
async function oo(e, t) {
  const { placement: n, platform: o, elements: r } = e,
    i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)),
    s = Q(n),
    a = ae(n),
    l = G(n) === 'y',
    u = Yt.has(s) ? -1 : 1,
    c = i && l ? -1 : 1,
    p = J(t, e)
  let {
    mainAxis: m,
    crossAxis: d,
    alignmentAxis: h,
  } = typeof p == 'number'
    ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: p.mainAxis || 0, crossAxis: p.crossAxis || 0, alignmentAxis: p.alignmentAxis }
  return (
    a && typeof h == 'number' && (d = a === 'end' ? h * -1 : h),
    l ? { x: d * c, y: m * u } : { x: m * u, y: d * c }
  )
}
const ro = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, o
          const { x: r, y: i, placement: s, middlewareData: a } = t,
            l = await oo(t, e)
          return s === ((n = a.offset) == null ? void 0 : n.placement) &&
            (o = a.arrow) != null &&
            o.alignmentOffset
            ? {}
            : { x: r + l.x, y: i + l.y, data: { ...l, placement: s } }
        },
      }
    )
  },
  io = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: n, y: o, placement: r } = t,
            {
              mainAxis: i = !0,
              crossAxis: s = !1,
              limiter: a = {
                fn: (w) => {
                  let { x: v, y } = w
                  return { x: v, y }
                },
              },
              ...l
            } = J(e, t),
            u = { x: n, y: o },
            c = await fe(t, l),
            p = G(Q(r)),
            m = Ge(p)
          let d = u[m],
            h = u[p]
          if (i) {
            const w = m === 'y' ? 'top' : 'left',
              v = m === 'y' ? 'bottom' : 'right',
              y = d + c[w],
              C = d - c[v]
            d = Fe(y, d, C)
          }
          if (s) {
            const w = p === 'y' ? 'top' : 'left',
              v = p === 'y' ? 'bottom' : 'right',
              y = h + c[w],
              C = h - c[v]
            h = Fe(y, h, C)
          }
          const x = a.fn({ ...t, [m]: d, [p]: h })
          return { ...x, data: { x: x.x - n, y: x.y - o, enabled: { [m]: i, [p]: s } } }
        },
      }
    )
  },
  so = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: o, placement: r, rects: i, middlewareData: s } = t,
            { offset: a = 0, mainAxis: l = !0, crossAxis: u = !0 } = J(e, t),
            c = { x: n, y: o },
            p = G(r),
            m = Ge(p)
          let d = c[m],
            h = c[p]
          const x = J(a, t),
            w =
              typeof x == 'number'
                ? { mainAxis: x, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...x }
          if (l) {
            const C = m === 'y' ? 'height' : 'width',
              T = i.reference[m] - i.floating[C] + w.mainAxis,
              b = i.reference[m] + i.reference[C] - w.mainAxis
            d < T ? (d = T) : d > b && (d = b)
          }
          if (u) {
            var v, y
            const C = m === 'y' ? 'width' : 'height',
              T = Yt.has(Q(r)),
              b =
                i.reference[p] -
                i.floating[C] +
                ((T && ((v = s.offset) == null ? void 0 : v[p])) || 0) +
                (T ? 0 : w.crossAxis),
              P =
                i.reference[p] +
                i.reference[C] +
                (T ? 0 : ((y = s.offset) == null ? void 0 : y[p]) || 0) -
                (T ? w.crossAxis : 0)
            h < b ? (h = b) : h > P && (h = P)
          }
          return { [m]: d, [p]: h }
        },
      }
    )
  },
  lo = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, o
          const { placement: r, rects: i, platform: s, elements: a } = t,
            { apply: l = () => {}, ...u } = J(e, t),
            c = await fe(t, u),
            p = Q(r),
            m = ae(r),
            d = G(r) === 'y',
            { width: h, height: x } = i.floating
          let w, v
          p === 'top' || p === 'bottom'
            ? ((w = p),
              (v =
                m === ((await (s.isRTL == null ? void 0 : s.isRTL(a.floating))) ? 'start' : 'end')
                  ? 'left'
                  : 'right'))
            : ((v = p), (w = m === 'end' ? 'top' : 'bottom'))
          const y = x - c.top - c.bottom,
            C = h - c.left - c.right,
            T = ee(x - c[w], y),
            b = ee(h - c[v], C),
            P = !t.middlewareData.shift
          let R = T,
            k = b
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (k = C),
            (o = t.middlewareData.shift) != null && o.enabled.y && (R = y),
            P && !m)
          ) {
            const L = $(c.left, 0),
              B = $(c.right, 0),
              _ = $(c.top, 0),
              S = $(c.bottom, 0)
            d
              ? (k = h - 2 * (L !== 0 || B !== 0 ? L + B : $(c.left, c.right)))
              : (R = x - 2 * (_ !== 0 || S !== 0 ? _ + S : $(c.top, c.bottom)))
          }
          await l({ ...t, availableWidth: k, availableHeight: R })
          const I = await s.getDimensions(a.floating)
          return h !== I.width || x !== I.height ? { reset: { rects: !0 } } : {}
        },
      }
    )
  }
function ke() {
  return typeof window < 'u'
}
function ce(e) {
  return Zt(e) ? (e.nodeName || '').toLowerCase() : '#document'
}
function W(e) {
  var t
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function K(e) {
  var t
  return (t = (Zt(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement
}
function Zt(e) {
  return ke() ? e instanceof Node || e instanceof W(e).Node : !1
}
function V(e) {
  return ke() ? e instanceof Element || e instanceof W(e).Element : !1
}
function q(e) {
  return ke() ? e instanceof HTMLElement || e instanceof W(e).HTMLElement : !1
}
function xt(e) {
  return !ke() || typeof ShadowRoot > 'u'
    ? !1
    : e instanceof ShadowRoot || e instanceof W(e).ShadowRoot
}
const ao = new Set(['inline', 'contents'])
function he(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = Y(e)
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !ao.has(r)
}
const co = new Set(['table', 'td', 'th'])
function uo(e) {
  return co.has(ce(e))
}
const fo = [':popover-open', ':modal']
function Me(e) {
  return fo.some((t) => {
    try {
      return e.matches(t)
    } catch {
      return !1
    }
  })
}
const po = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
  mo = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'],
  ho = ['paint', 'layout', 'strict', 'content']
function Ke(e) {
  const t = Je(),
    n = V(e) ? Y(e) : e
  return (
    po.some((o) => (n[o] ? n[o] !== 'none' : !1)) ||
    (n.containerType ? n.containerType !== 'normal' : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
    (!t && (n.filter ? n.filter !== 'none' : !1)) ||
    mo.some((o) => (n.willChange || '').includes(o)) ||
    ho.some((o) => (n.contain || '').includes(o))
  )
}
function go(e) {
  let t = te(e)
  for (; q(t) && !se(t); ) {
    if (Ke(t)) return t
    if (Me(t)) return null
    t = te(t)
  }
  return null
}
function Je() {
  return typeof CSS > 'u' || !CSS.supports ? !1 : CSS.supports('-webkit-backdrop-filter', 'none')
}
const xo = new Set(['html', 'body', '#document'])
function se(e) {
  return xo.has(ce(e))
}
function Y(e) {
  return W(e).getComputedStyle(e)
}
function Be(e) {
  return V(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY }
}
function te(e) {
  if (ce(e) === 'html') return e
  const t = e.assignedSlot || e.parentNode || (xt(e) && e.host) || K(e)
  return xt(t) ? t.host : t
}
function Ut(e) {
  const t = te(e)
  return se(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : q(t) && he(t) ? t : Ut(t)
}
function de(e, t, n) {
  var o
  ;(t === void 0 && (t = []), n === void 0 && (n = !0))
  const r = Ut(e),
    i = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    s = W(r)
  if (i) {
    const a = Ve(s)
    return t.concat(s, s.visualViewport || [], he(r) ? r : [], a && n ? de(a) : [])
  }
  return t.concat(r, de(r, [], n))
}
function Ve(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function Gt(e) {
  const t = Y(e)
  let n = parseFloat(t.width) || 0,
    o = parseFloat(t.height) || 0
  const r = q(e),
    i = r ? e.offsetWidth : n,
    s = r ? e.offsetHeight : o,
    a = Oe(n) !== i || Oe(o) !== s
  return (a && ((n = i), (o = s)), { width: n, height: o, $: a })
}
function Qe(e) {
  return V(e) ? e : e.contextElement
}
function ie(e) {
  const t = Qe(e)
  if (!q(t)) return X(1)
  const n = t.getBoundingClientRect(),
    { width: o, height: r, $: i } = Gt(t)
  let s = (i ? Oe(n.width) : n.width) / o,
    a = (i ? Oe(n.height) : n.height) / r
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: s, y: a }
  )
}
const wo = X(0)
function Xt(e) {
  const t = W(e)
  return !Je() || !t.visualViewport
    ? wo
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
}
function vo(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== W(e)) ? !1 : t)
}
function oe(e, t, n, o) {
  ;(t === void 0 && (t = !1), n === void 0 && (n = !1))
  const r = e.getBoundingClientRect(),
    i = Qe(e)
  let s = X(1)
  t && (o ? V(o) && (s = ie(o)) : (s = ie(e)))
  const a = vo(i, n, o) ? Xt(i) : X(0)
  let l = (r.left + a.x) / s.x,
    u = (r.top + a.y) / s.y,
    c = r.width / s.x,
    p = r.height / s.y
  if (i) {
    const m = W(i),
      d = o && V(o) ? W(o) : o
    let h = m,
      x = Ve(h)
    for (; x && o && d !== h; ) {
      const w = ie(x),
        v = x.getBoundingClientRect(),
        y = Y(x),
        C = v.left + (x.clientLeft + parseFloat(y.paddingLeft)) * w.x,
        T = v.top + (x.clientTop + parseFloat(y.paddingTop)) * w.y
      ;((l *= w.x), (u *= w.y), (c *= w.x), (p *= w.y), (l += C), (u += T), (h = W(x)), (x = Ve(h)))
    }
  }
  return Ne({ width: c, height: p, x: l, y: u })
}
function et(e, t) {
  const n = Be(e).scrollLeft
  return t ? t.left + n : oe(K(e)).left + n
}
function qt(e, t, n) {
  n === void 0 && (n = !1)
  const o = e.getBoundingClientRect(),
    r = o.left + t.scrollLeft - (n ? 0 : et(e, o)),
    i = o.top + t.scrollTop
  return { x: r, y: i }
}
function yo(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e
  const i = r === 'fixed',
    s = K(o),
    a = t ? Me(t.floating) : !1
  if (o === s || (a && i)) return n
  let l = { scrollLeft: 0, scrollTop: 0 },
    u = X(1)
  const c = X(0),
    p = q(o)
  if ((p || (!p && !i)) && ((ce(o) !== 'body' || he(s)) && (l = Be(o)), q(o))) {
    const d = oe(o)
    ;((u = ie(o)), (c.x = d.x + o.clientLeft), (c.y = d.y + o.clientTop))
  }
  const m = s && !p && !i ? qt(s, l, !0) : X(0)
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + m.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + m.y,
  }
}
function To(e) {
  return Array.from(e.getClientRects())
}
function bo(e) {
  const t = K(e),
    n = Be(e),
    o = e.ownerDocument.body,
    r = $(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth),
    i = $(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight)
  let s = -n.scrollLeft + et(e)
  const a = -n.scrollTop
  return (
    Y(o).direction === 'rtl' && (s += $(t.clientWidth, o.clientWidth) - r),
    { width: r, height: i, x: s, y: a }
  )
}
function Co(e, t) {
  const n = W(e),
    o = K(e),
    r = n.visualViewport
  let i = o.clientWidth,
    s = o.clientHeight,
    a = 0,
    l = 0
  if (r) {
    ;((i = r.width), (s = r.height))
    const u = Je()
    ;(!u || (u && t === 'fixed')) && ((a = r.offsetLeft), (l = r.offsetTop))
  }
  return { width: i, height: s, x: a, y: l }
}
const Ao = new Set(['absolute', 'fixed'])
function Po(e, t) {
  const n = oe(e, !0, t === 'fixed'),
    o = n.top + e.clientTop,
    r = n.left + e.clientLeft,
    i = q(e) ? ie(e) : X(1),
    s = e.clientWidth * i.x,
    a = e.clientHeight * i.y,
    l = r * i.x,
    u = o * i.y
  return { width: s, height: a, x: l, y: u }
}
function wt(e, t, n) {
  let o
  if (t === 'viewport') o = Co(e, n)
  else if (t === 'document') o = bo(K(e))
  else if (V(t)) o = Po(t, n)
  else {
    const r = Xt(e)
    o = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height }
  }
  return Ne(o)
}
function Kt(e, t) {
  const n = te(e)
  return n === t || !V(n) || se(n) ? !1 : Y(n).position === 'fixed' || Kt(n, t)
}
function Ro(e, t) {
  const n = t.get(e)
  if (n) return n
  let o = de(e, [], !1).filter((a) => V(a) && ce(a) !== 'body'),
    r = null
  const i = Y(e).position === 'fixed'
  let s = i ? te(e) : e
  for (; V(s) && !se(s); ) {
    const a = Y(s),
      l = Ke(s)
    ;(!l && a.position === 'fixed' && (r = null),
      (
        i
          ? !l && !r
          : (!l && a.position === 'static' && !!r && Ao.has(r.position)) ||
            (he(s) && !l && Kt(e, s))
      )
        ? (o = o.filter((c) => c !== s))
        : (r = a),
      (s = te(s)))
  }
  return (t.set(e, o), o)
}
function Eo(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e
  const s = [...(n === 'clippingAncestors' ? (Me(t) ? [] : Ro(t, this._c)) : [].concat(n)), o],
    a = s[0],
    l = s.reduce(
      (u, c) => {
        const p = wt(t, c, r)
        return (
          (u.top = $(p.top, u.top)),
          (u.right = ee(p.right, u.right)),
          (u.bottom = ee(p.bottom, u.bottom)),
          (u.left = $(p.left, u.left)),
          u
        )
      },
      wt(t, a, r)
    )
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top }
}
function Oo(e) {
  const { width: t, height: n } = Gt(e)
  return { width: t, height: n }
}
function So(e, t, n) {
  const o = q(t),
    r = K(t),
    i = n === 'fixed',
    s = oe(e, !0, i, t)
  let a = { scrollLeft: 0, scrollTop: 0 }
  const l = X(0)
  function u() {
    l.x = et(r)
  }
  if (o || (!o && !i))
    if (((ce(t) !== 'body' || he(r)) && (a = Be(t)), o)) {
      const d = oe(t, !0, i, t)
      ;((l.x = d.x + t.clientLeft), (l.y = d.y + t.clientTop))
    } else r && u()
  i && !o && r && u()
  const c = r && !o && !i ? qt(r, a) : X(0),
    p = s.left + a.scrollLeft - l.x - c.x,
    m = s.top + a.scrollTop - l.y - c.y
  return { x: p, y: m, width: s.width, height: s.height }
}
function ze(e) {
  return Y(e).position === 'static'
}
function vt(e, t) {
  if (!q(e) || Y(e).position === 'fixed') return null
  if (t) return t(e)
  let n = e.offsetParent
  return (K(e) === n && (n = n.ownerDocument.body), n)
}
function Jt(e, t) {
  const n = W(e)
  if (Me(e)) return n
  if (!q(e)) {
    let r = te(e)
    for (; r && !se(r); ) {
      if (V(r) && !ze(r)) return r
      r = te(r)
    }
    return n
  }
  let o = vt(e, t)
  for (; o && uo(o) && ze(o); ) o = vt(o, t)
  return o && se(o) && ze(o) && !Ke(o) ? n : o || go(e) || n
}
const No = async function (e) {
  const t = this.getOffsetParent || Jt,
    n = this.getDimensions,
    o = await n(e.floating)
  return {
    reference: So(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  }
}
function Do(e) {
  return Y(e).direction === 'rtl'
}
const Lo = {
  convertOffsetParentRelativeRectToViewportRelativeRect: yo,
  getDocumentElement: K,
  getClippingRect: Eo,
  getOffsetParent: Jt,
  getElementRects: No,
  getClientRects: To,
  getDimensions: Oo,
  getScale: ie,
  isElement: V,
  isRTL: Do,
}
function Qt(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function ko(e, t) {
  let n = null,
    o
  const r = K(e)
  function i() {
    var a
    ;(clearTimeout(o), (a = n) == null || a.disconnect(), (n = null))
  }
  function s(a, l) {
    ;(a === void 0 && (a = !1), l === void 0 && (l = 1), i())
    const u = e.getBoundingClientRect(),
      { left: c, top: p, width: m, height: d } = u
    if ((a || t(), !m || !d)) return
    const h = we(p),
      x = we(r.clientWidth - (c + m)),
      w = we(r.clientHeight - (p + d)),
      v = we(c),
      C = {
        rootMargin: -h + 'px ' + -x + 'px ' + -w + 'px ' + -v + 'px',
        threshold: $(0, ee(1, l)) || 1,
      }
    let T = !0
    function b(P) {
      const R = P[0].intersectionRatio
      if (R !== l) {
        if (!T) return s()
        R
          ? s(!1, R)
          : (o = setTimeout(() => {
              s(!1, 1e-7)
            }, 1e3))
      }
      ;(R === 1 && !Qt(u, e.getBoundingClientRect()) && s(), (T = !1))
    }
    try {
      n = new IntersectionObserver(b, { ...C, root: r.ownerDocument })
    } catch {
      n = new IntersectionObserver(b, C)
    }
    n.observe(e)
  }
  return (s(!0), i)
}
function Mo(e, t, n, o) {
  o === void 0 && (o = {})
  const {
      ancestorScroll: r = !0,
      ancestorResize: i = !0,
      elementResize: s = typeof ResizeObserver == 'function',
      layoutShift: a = typeof IntersectionObserver == 'function',
      animationFrame: l = !1,
    } = o,
    u = Qe(e),
    c = r || i ? [...(u ? de(u) : []), ...de(t)] : []
  c.forEach((v) => {
    ;(r && v.addEventListener('scroll', n, { passive: !0 }), i && v.addEventListener('resize', n))
  })
  const p = u && a ? ko(u, n) : null
  let m = -1,
    d = null
  s &&
    ((d = new ResizeObserver((v) => {
      let [y] = v
      ;(y &&
        y.target === u &&
        d &&
        (d.unobserve(t),
        cancelAnimationFrame(m),
        (m = requestAnimationFrame(() => {
          var C
          ;(C = d) == null || C.observe(t)
        }))),
        n())
    })),
    u && !l && d.observe(u),
    d.observe(t))
  let h,
    x = l ? oe(e) : null
  l && w()
  function w() {
    const v = oe(e)
    ;(x && !Qt(x, v) && n(), (x = v), (h = requestAnimationFrame(w)))
  }
  return (
    n(),
    () => {
      var v
      ;(c.forEach((y) => {
        ;(r && y.removeEventListener('scroll', n), i && y.removeEventListener('resize', n))
      }),
        p == null || p(),
        (v = d) == null || v.disconnect(),
        (d = null),
        l && cancelAnimationFrame(h))
    }
  )
}
const Bo = ro,
  _o = io,
  Ho = to,
  Io = lo,
  zo = no,
  yt = eo,
  jo = so,
  $o = (e, t, n) => {
    const o = new Map(),
      r = { platform: Lo, ...n },
      i = { ...r.platform, _c: o }
    return Qn(e, t, { ...r, platform: i })
  }
var Fo = typeof document < 'u',
  Wo = function () {},
  Re = Fo ? g.useLayoutEffect : Wo
function De(e, t) {
  if (e === t) return !0
  if (typeof e != typeof t) return !1
  if (typeof e == 'function' && e.toString() === t.toString()) return !0
  let n, o, r
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1
      for (o = n; o-- !== 0; ) if (!De(e[o], t[o])) return !1
      return !0
    }
    if (((r = Object.keys(e)), (n = r.length), n !== Object.keys(t).length)) return !1
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, r[o])) return !1
    for (o = n; o-- !== 0; ) {
      const i = r[o]
      if (!(i === '_owner' && e.$$typeof) && !De(e[i], t[i])) return !1
    }
    return !0
  }
  return e !== e && t !== t
}
function en(e) {
  return typeof window > 'u' ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function Tt(e, t) {
  const n = en(e)
  return Math.round(t * n) / n
}
function je(e) {
  const t = g.useRef(e)
  return (
    Re(() => {
      t.current = e
    }),
    t
  )
}
function Vo(e) {
  e === void 0 && (e = {})
  const {
      placement: t = 'bottom',
      strategy: n = 'absolute',
      middleware: o = [],
      platform: r,
      elements: { reference: i, floating: s } = {},
      transform: a = !0,
      whileElementsMounted: l,
      open: u,
    } = e,
    [c, p] = g.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [m, d] = g.useState(o)
  De(m, o) || d(o)
  const [h, x] = g.useState(null),
    [w, v] = g.useState(null),
    y = g.useCallback((A) => {
      A !== P.current && ((P.current = A), x(A))
    }, []),
    C = g.useCallback((A) => {
      A !== R.current && ((R.current = A), v(A))
    }, []),
    T = i || h,
    b = s || w,
    P = g.useRef(null),
    R = g.useRef(null),
    k = g.useRef(c),
    I = l != null,
    L = je(l),
    B = je(r),
    _ = je(u),
    S = g.useCallback(() => {
      if (!P.current || !R.current) return
      const A = { placement: t, strategy: n, middleware: m }
      ;(B.current && (A.platform = B.current),
        $o(P.current, R.current, A).then((M) => {
          const Z = { ...M, isPositioned: _.current !== !1 }
          O.current &&
            !De(k.current, Z) &&
            ((k.current = Z),
            Hn.flushSync(() => {
              p(Z)
            }))
        }))
    }, [m, t, n, B, _])
  Re(() => {
    u === !1 &&
      k.current.isPositioned &&
      ((k.current.isPositioned = !1), p((A) => ({ ...A, isPositioned: !1 })))
  }, [u])
  const O = g.useRef(!1)
  ;(Re(
    () => (
      (O.current = !0),
      () => {
        O.current = !1
      }
    ),
    []
  ),
    Re(() => {
      if ((T && (P.current = T), b && (R.current = b), T && b)) {
        if (L.current) return L.current(T, b, S)
        S()
      }
    }, [T, b, S, L, I]))
  const j = g.useMemo(
      () => ({ reference: P, floating: R, setReference: y, setFloating: C }),
      [y, C]
    ),
    N = g.useMemo(() => ({ reference: T, floating: b }), [T, b]),
    D = g.useMemo(() => {
      const A = { position: n, left: 0, top: 0 }
      if (!N.floating) return A
      const M = Tt(N.floating, c.x),
        Z = Tt(N.floating, c.y)
      return a
        ? {
            ...A,
            transform: 'translate(' + M + 'px, ' + Z + 'px)',
            ...(en(N.floating) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: n, left: M, top: Z }
    }, [n, a, N.floating, c.x, c.y])
  return g.useMemo(
    () => ({ ...c, update: S, refs: j, elements: N, floatingStyles: D }),
    [c, S, j, N, D]
  )
}
const Yo = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, 'current')
    }
    return {
      name: 'arrow',
      options: e,
      fn(n) {
        const { element: o, padding: r } = typeof e == 'function' ? e(n) : e
        return o && t(o)
          ? o.current != null
            ? yt({ element: o.current, padding: r }).fn(n)
            : {}
          : o
            ? yt({ element: o, padding: r }).fn(n)
            : {}
      },
    }
  },
  Zo = (e, t) => ({ ...Bo(e), options: [e, t] }),
  Uo = (e, t) => ({ ..._o(e), options: [e, t] }),
  Go = (e, t) => ({ ...jo(e), options: [e, t] }),
  Xo = (e, t) => ({ ...Ho(e), options: [e, t] }),
  qo = (e, t) => ({ ...Io(e), options: [e, t] }),
  Ko = (e, t) => ({ ...zo(e), options: [e, t] }),
  Jo = (e, t) => ({ ...Yo(e), options: [e, t] })
var Qo = 'Arrow',
  tn = g.forwardRef((e, t) => {
    const { children: n, width: o = 10, height: r = 5, ...i } = e
    return E.jsx(me.svg, {
      ...i,
      ref: t,
      width: o,
      height: r,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: e.asChild ? n : E.jsx('polygon', { points: '0,0 30,0 15,10' }),
    })
  })
tn.displayName = Qo
var er = tn
function tr(e) {
  const [t, n] = g.useState(void 0)
  return (
    $e(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight })
        const o = new ResizeObserver((r) => {
          if (!Array.isArray(r) || !r.length) return
          const i = r[0]
          let s, a
          if ('borderBoxSize' in i) {
            const l = i.borderBoxSize,
              u = Array.isArray(l) ? l[0] : l
            ;((s = u.inlineSize), (a = u.blockSize))
          } else ((s = e.offsetWidth), (a = e.offsetHeight))
          n({ width: s, height: a })
        })
        return (o.observe(e, { box: 'border-box' }), () => o.unobserve(e))
      } else n(void 0)
    }, [e]),
    t
  )
}
var tt = 'Popper',
  [nn, on] = Wt(tt),
  [nr, rn] = nn(tt),
  sn = (e) => {
    const { __scopePopper: t, children: n } = e,
      [o, r] = g.useState(null)
    return E.jsx(nr, { scope: t, anchor: o, onAnchorChange: r, children: n })
  }
sn.displayName = tt
var ln = 'PopperAnchor',
  an = g.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e,
      i = rn(ln, n),
      s = g.useRef(null),
      a = Le(t, s)
    return (
      g.useEffect(() => {
        i.onAnchorChange((o == null ? void 0 : o.current) || s.current)
      }),
      o ? null : E.jsx(me.div, { ...r, ref: a })
    )
  })
an.displayName = ln
var nt = 'PopperContent',
  [or, rr] = nn(nt),
  cn = g.forwardRef((e, t) => {
    var rt, it, st, lt, at, ct
    const {
        __scopePopper: n,
        side: o = 'bottom',
        sideOffset: r = 0,
        align: i = 'center',
        alignOffset: s = 0,
        arrowPadding: a = 0,
        avoidCollisions: l = !0,
        collisionBoundary: u = [],
        collisionPadding: c = 0,
        sticky: p = 'partial',
        hideWhenDetached: m = !1,
        updatePositionStrategy: d = 'optimized',
        onPlaced: h,
        ...x
      } = e,
      w = rn(nt, n),
      [v, y] = g.useState(null),
      C = Le(t, (ue) => y(ue)),
      [T, b] = g.useState(null),
      P = tr(T),
      R = (P == null ? void 0 : P.width) ?? 0,
      k = (P == null ? void 0 : P.height) ?? 0,
      I = o + (i !== 'center' ? '-' + i : ''),
      L = typeof c == 'number' ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c },
      B = Array.isArray(u) ? u : [u],
      _ = B.length > 0,
      S = { padding: L, boundary: B.filter(sr), altBoundary: _ },
      {
        refs: O,
        floatingStyles: j,
        placement: N,
        isPositioned: D,
        middlewareData: A,
      } = Vo({
        strategy: 'fixed',
        placement: I,
        whileElementsMounted: (...ue) => Mo(...ue, { animationFrame: d === 'always' }),
        elements: { reference: w.anchor },
        middleware: [
          Zo({ mainAxis: r + k, alignmentAxis: s }),
          l && Uo({ mainAxis: !0, crossAxis: !1, limiter: p === 'partial' ? Go() : void 0, ...S }),
          l && Xo({ ...S }),
          qo({
            ...S,
            apply: ({ elements: ue, rects: ut, availableWidth: En, availableHeight: On }) => {
              const { width: Sn, height: Nn } = ut.reference,
                xe = ue.floating.style
              ;(xe.setProperty('--radix-popper-available-width', `${En}px`),
                xe.setProperty('--radix-popper-available-height', `${On}px`),
                xe.setProperty('--radix-popper-anchor-width', `${Sn}px`),
                xe.setProperty('--radix-popper-anchor-height', `${Nn}px`))
            },
          }),
          T && Jo({ element: T, padding: a }),
          lr({ arrowWidth: R, arrowHeight: k }),
          m && Ko({ strategy: 'referenceHidden', ...S }),
        ],
      }),
      [M, Z] = dn(N),
      ge = Dn(h)
    $e(() => {
      D && (ge == null || ge())
    }, [D, ge])
    const bn = (rt = A.arrow) == null ? void 0 : rt.x,
      Cn = (it = A.arrow) == null ? void 0 : it.y,
      An = ((st = A.arrow) == null ? void 0 : st.centerOffset) !== 0,
      [Pn, Rn] = g.useState()
    return (
      $e(() => {
        v && Rn(window.getComputedStyle(v).zIndex)
      }, [v]),
      E.jsx('div', {
        ref: O.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...j,
          transform: D ? j.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: Pn,
          '--radix-popper-transform-origin': [
            (lt = A.transformOrigin) == null ? void 0 : lt.x,
            (at = A.transformOrigin) == null ? void 0 : at.y,
          ].join(' '),
          ...(((ct = A.hide) == null ? void 0 : ct.referenceHidden) && {
            visibility: 'hidden',
            pointerEvents: 'none',
          }),
        },
        dir: e.dir,
        children: E.jsx(or, {
          scope: n,
          placedSide: M,
          onArrowChange: b,
          arrowX: bn,
          arrowY: Cn,
          shouldHideArrow: An,
          children: E.jsx(me.div, {
            'data-side': M,
            'data-align': Z,
            ...x,
            ref: C,
            style: { ...x.style, animation: D ? void 0 : 'none' },
          }),
        }),
      })
    )
  })
cn.displayName = nt
var un = 'PopperArrow',
  ir = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  fn = g.forwardRef(function (t, n) {
    const { __scopePopper: o, ...r } = t,
      i = rr(un, o),
      s = ir[i.placedSide]
    return E.jsx('span', {
      ref: i.onArrowChange,
      style: {
        position: 'absolute',
        left: i.arrowX,
        top: i.arrowY,
        [s]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[
          i.placedSide
        ],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[i.placedSide],
        visibility: i.shouldHideArrow ? 'hidden' : void 0,
      },
      children: E.jsx(er, { ...r, ref: n, style: { ...r.style, display: 'block' } }),
    })
  })
fn.displayName = un
function sr(e) {
  return e !== null
}
var lr = (e) => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    var w, v, y
    const { placement: n, rects: o, middlewareData: r } = t,
      s = ((w = r.arrow) == null ? void 0 : w.centerOffset) !== 0,
      a = s ? 0 : e.arrowWidth,
      l = s ? 0 : e.arrowHeight,
      [u, c] = dn(n),
      p = { start: '0%', center: '50%', end: '100%' }[c],
      m = (((v = r.arrow) == null ? void 0 : v.x) ?? 0) + a / 2,
      d = (((y = r.arrow) == null ? void 0 : y.y) ?? 0) + l / 2
    let h = '',
      x = ''
    return (
      u === 'bottom'
        ? ((h = s ? p : `${m}px`), (x = `${-l}px`))
        : u === 'top'
          ? ((h = s ? p : `${m}px`), (x = `${o.floating.height + l}px`))
          : u === 'right'
            ? ((h = `${-l}px`), (x = s ? p : `${d}px`))
            : u === 'left' && ((h = `${o.floating.width + l}px`), (x = s ? p : `${d}px`)),
      { data: { x: h, y: x } }
    )
  },
})
function dn(e) {
  const [t, n = 'center'] = e.split('-')
  return [t, n]
}
var ar = sn,
  cr = an,
  ur = cn,
  fr = fn,
  dr = Object.freeze({
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  }),
  pr = 'VisuallyHidden',
  pn = g.forwardRef((e, t) => E.jsx(me.span, { ...e, ref: t, style: { ...dr, ...e.style } }))
pn.displayName = pr
var mr = pn,
  [_e, Ur] = Wt('Tooltip', [on]),
  He = on(),
  mn = 'TooltipProvider',
  hr = 700,
  Ye = 'tooltip.open',
  [gr, ot] = _e(mn),
  hn = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: n = hr,
        skipDelayDuration: o = 300,
        disableHoverableContent: r = !1,
        children: i,
      } = e,
      s = g.useRef(!0),
      a = g.useRef(!1),
      l = g.useRef(0)
    return (
      g.useEffect(() => {
        const u = l.current
        return () => window.clearTimeout(u)
      }, []),
      E.jsx(gr, {
        scope: t,
        isOpenDelayedRef: s,
        delayDuration: n,
        onOpen: g.useCallback(() => {
          ;(window.clearTimeout(l.current), (s.current = !1))
        }, []),
        onClose: g.useCallback(() => {
          ;(window.clearTimeout(l.current),
            (l.current = window.setTimeout(() => (s.current = !0), o)))
        }, [o]),
        isPointerInTransitRef: a,
        onPointerInTransitChange: g.useCallback((u) => {
          a.current = u
        }, []),
        disableHoverableContent: r,
        children: i,
      })
    )
  }
hn.displayName = mn
var pe = 'Tooltip',
  [xr, Ie] = _e(pe),
  gn = (e) => {
    const {
        __scopeTooltip: t,
        children: n,
        open: o,
        defaultOpen: r,
        onOpenChange: i,
        disableHoverableContent: s,
        delayDuration: a,
      } = e,
      l = ot(pe, e.__scopeTooltip),
      u = He(t),
      [c, p] = g.useState(null),
      m = Ln(),
      d = g.useRef(0),
      h = s ?? l.disableHoverableContent,
      x = a ?? l.delayDuration,
      w = g.useRef(!1),
      [v, y] = kn({
        prop: o,
        defaultProp: r ?? !1,
        onChange: (R) => {
          ;(R ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Ye))) : l.onClose(),
            i == null || i(R))
        },
        caller: pe,
      }),
      C = g.useMemo(() => (v ? (w.current ? 'delayed-open' : 'instant-open') : 'closed'), [v]),
      T = g.useCallback(() => {
        ;(window.clearTimeout(d.current), (d.current = 0), (w.current = !1), y(!0))
      }, [y]),
      b = g.useCallback(() => {
        ;(window.clearTimeout(d.current), (d.current = 0), y(!1))
      }, [y]),
      P = g.useCallback(() => {
        ;(window.clearTimeout(d.current),
          (d.current = window.setTimeout(() => {
            ;((w.current = !0), y(!0), (d.current = 0))
          }, x)))
      }, [x, y])
    return (
      g.useEffect(
        () => () => {
          d.current && (window.clearTimeout(d.current), (d.current = 0))
        },
        []
      ),
      E.jsx(ar, {
        ...u,
        children: E.jsx(xr, {
          scope: t,
          contentId: m,
          open: v,
          stateAttribute: C,
          trigger: c,
          onTriggerChange: p,
          onTriggerEnter: g.useCallback(() => {
            l.isOpenDelayedRef.current ? P() : T()
          }, [l.isOpenDelayedRef, P, T]),
          onTriggerLeave: g.useCallback(() => {
            h ? b() : (window.clearTimeout(d.current), (d.current = 0))
          }, [b, h]),
          onOpen: T,
          onClose: b,
          disableHoverableContent: h,
          children: n,
        }),
      })
    )
  }
gn.displayName = pe
var Ze = 'TooltipTrigger',
  xn = g.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...o } = e,
      r = Ie(Ze, n),
      i = ot(Ze, n),
      s = He(n),
      a = g.useRef(null),
      l = Le(t, a, r.onTriggerChange),
      u = g.useRef(!1),
      c = g.useRef(!1),
      p = g.useCallback(() => (u.current = !1), [])
    return (
      g.useEffect(() => () => document.removeEventListener('pointerup', p), [p]),
      E.jsx(cr, {
        asChild: !0,
        ...s,
        children: E.jsx(me.button, {
          'aria-describedby': r.open ? r.contentId : void 0,
          'data-state': r.stateAttribute,
          ...o,
          ref: l,
          onPointerMove: re(e.onPointerMove, (m) => {
            m.pointerType !== 'touch' &&
              !c.current &&
              !i.isPointerInTransitRef.current &&
              (r.onTriggerEnter(), (c.current = !0))
          }),
          onPointerLeave: re(e.onPointerLeave, () => {
            ;(r.onTriggerLeave(), (c.current = !1))
          }),
          onPointerDown: re(e.onPointerDown, () => {
            ;(r.open && r.onClose(),
              (u.current = !0),
              document.addEventListener('pointerup', p, { once: !0 }))
          }),
          onFocus: re(e.onFocus, () => {
            u.current || r.onOpen()
          }),
          onBlur: re(e.onBlur, r.onClose),
          onClick: re(e.onClick, r.onClose),
        }),
      })
    )
  })
xn.displayName = Ze
var wr = 'TooltipPortal',
  [Gr, vr] = _e(wr, { forceMount: void 0 }),
  le = 'TooltipContent',
  wn = g.forwardRef((e, t) => {
    const n = vr(le, e.__scopeTooltip),
      { forceMount: o = n.forceMount, side: r = 'top', ...i } = e,
      s = Ie(le, e.__scopeTooltip)
    return E.jsx(Mn, {
      present: o || s.open,
      children: s.disableHoverableContent
        ? E.jsx(vn, { side: r, ...i, ref: t })
        : E.jsx(yr, { side: r, ...i, ref: t }),
    })
  }),
  yr = g.forwardRef((e, t) => {
    const n = Ie(le, e.__scopeTooltip),
      o = ot(le, e.__scopeTooltip),
      r = g.useRef(null),
      i = Le(t, r),
      [s, a] = g.useState(null),
      { trigger: l, onClose: u } = n,
      c = r.current,
      { onPointerInTransitChange: p } = o,
      m = g.useCallback(() => {
        ;(a(null), p(!1))
      }, [p]),
      d = g.useCallback(
        (h, x) => {
          const w = h.currentTarget,
            v = { x: h.clientX, y: h.clientY },
            y = Pr(v, w.getBoundingClientRect()),
            C = Rr(v, y),
            T = Er(x.getBoundingClientRect()),
            b = Sr([...C, ...T])
          ;(a(b), p(!0))
        },
        [p]
      )
    return (
      g.useEffect(() => () => m(), [m]),
      g.useEffect(() => {
        if (l && c) {
          const h = (w) => d(w, c),
            x = (w) => d(w, l)
          return (
            l.addEventListener('pointerleave', h),
            c.addEventListener('pointerleave', x),
            () => {
              ;(l.removeEventListener('pointerleave', h), c.removeEventListener('pointerleave', x))
            }
          )
        }
      }, [l, c, d, m]),
      g.useEffect(() => {
        if (s) {
          const h = (x) => {
            const w = x.target,
              v = { x: x.clientX, y: x.clientY },
              y = (l == null ? void 0 : l.contains(w)) || (c == null ? void 0 : c.contains(w)),
              C = !Or(v, s)
            y ? m() : C && (m(), u())
          }
          return (
            document.addEventListener('pointermove', h),
            () => document.removeEventListener('pointermove', h)
          )
        }
      }, [l, c, s, u, m]),
      E.jsx(vn, { ...e, ref: i })
    )
  }),
  [Tr, br] = _e(pe, { isInside: !1 }),
  Cr = _n('TooltipContent'),
  vn = g.forwardRef((e, t) => {
    const {
        __scopeTooltip: n,
        children: o,
        'aria-label': r,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        ...a
      } = e,
      l = Ie(le, n),
      u = He(n),
      { onClose: c } = l
    return (
      g.useEffect(
        () => (document.addEventListener(Ye, c), () => document.removeEventListener(Ye, c)),
        [c]
      ),
      g.useEffect(() => {
        if (l.trigger) {
          const p = (m) => {
            const d = m.target
            d != null && d.contains(l.trigger) && c()
          }
          return (
            window.addEventListener('scroll', p, { capture: !0 }),
            () => window.removeEventListener('scroll', p, { capture: !0 })
          )
        }
      }, [l.trigger, c]),
      E.jsx(Bn, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: c,
        children: E.jsxs(ur, {
          'data-state': l.stateAttribute,
          ...u,
          ...a,
          ref: t,
          style: {
            ...a.style,
            '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
          },
          children: [
            E.jsx(Cr, { children: o }),
            E.jsx(Tr, {
              scope: n,
              isInside: !0,
              children: E.jsx(mr, { id: l.contentId, role: 'tooltip', children: r || o }),
            }),
          ],
        }),
      })
    )
  })
wn.displayName = le
var yn = 'TooltipArrow',
  Ar = g.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...o } = e,
      r = He(n)
    return br(yn, n).isInside ? null : E.jsx(fr, { ...r, ...o, ref: t })
  })
Ar.displayName = yn
function Pr(e, t) {
  const n = Math.abs(t.top - e.y),
    o = Math.abs(t.bottom - e.y),
    r = Math.abs(t.right - e.x),
    i = Math.abs(t.left - e.x)
  switch (Math.min(n, o, r, i)) {
    case i:
      return 'left'
    case r:
      return 'right'
    case n:
      return 'top'
    case o:
      return 'bottom'
    default:
      throw new Error('unreachable')
  }
}
function Rr(e, t, n = 5) {
  const o = []
  switch (t) {
    case 'top':
      o.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n })
      break
    case 'bottom':
      o.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n })
      break
    case 'left':
      o.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n })
      break
    case 'right':
      o.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n })
      break
  }
  return o
}
function Er(e) {
  const { top: t, right: n, bottom: o, left: r } = e
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: o },
    { x: r, y: o },
  ]
}
function Or(e, t) {
  const { x: n, y: o } = e
  let r = !1
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i],
      l = t[s],
      u = a.x,
      c = a.y,
      p = l.x,
      m = l.y
    c > o != m > o && n < ((p - u) * (o - c)) / (m - c) + u && (r = !r)
  }
  return r
}
function Sr(e) {
  const t = e.slice()
  return (
    t.sort((n, o) => (n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0)),
    Nr(t)
  )
}
function Nr(e) {
  if (e.length <= 1) return e.slice()
  const t = []
  for (let o = 0; o < e.length; o++) {
    const r = e[o]
    for (; t.length >= 2; ) {
      const i = t[t.length - 1],
        s = t[t.length - 2]
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) t.pop()
      else break
    }
    t.push(r)
  }
  t.pop()
  const n = []
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o]
    for (; n.length >= 2; ) {
      const i = n[n.length - 1],
        s = n[n.length - 2]
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) n.pop()
      else break
    }
    n.push(r)
  }
  return (
    n.pop(),
    t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n)
  )
}
var Dr = hn,
  Lr = gn,
  kr = xn,
  Tn = wn
function Ue() {
  return (
    (Ue = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o])
          }
          return e
        }),
    Ue.apply(null, arguments)
  )
}
const Mr = Dr,
  z = Lr,
  F = kr,
  H = g.forwardRef(({ className: e, sideOffset: t = 4, ...n }, o) =>
    f(
      Tn,
      Ue(
        {
          ref: o,
          sideOffset: t,
          className: In(
            'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            e
          ),
        },
        n
      )
    )
  )
H.displayName = Tn.displayName
H.__docgenInfo = {
  description: '',
  methods: [],
  props: { sideOffset: { defaultValue: { value: '4', computed: !1 }, required: !1 } },
}
const Xr = {
    title: 'Atoms/Tooltip',
    component: z,
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component:
            'Ein Tooltip-Component zur Anzeige von Hilfstexten und zusätzlichen Informationen.',
        },
      },
    },
    tags: ['autodocs'],
    decorators: [
      (e) =>
        f(
          Mr,
          null,
          f('div', { className: 'flex min-h-[200px] items-center justify-center' }, f(e, null))
        ),
    ],
  },
  ve = {
    render: () =>
      f(
        z,
        null,
        f(F, { asChild: !0 }, f(U, { variant: 'outline' }, 'Hover me')),
        f(H, null, f('p', null, 'Dies ist ein Tooltip'))
      ),
  },
  ye = {
    render: () =>
      f(
        z,
        null,
        f(
          F,
          { asChild: !0 },
          f(
            'button',
            {
              className:
                'inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground',
            },
            f(ne, { icon: Ee, className: 'h-4 w-4' })
          )
        ),
        f(H, null, f('p', null, 'Klicken Sie hier für weitere Informationen'))
      ),
  },
  Te = {
    render: () =>
      f(
        'div',
        { className: 'flex gap-8' },
        f(
          z,
          null,
          f(F, { asChild: !0 }, f(U, { variant: 'outline' }, 'Oben')),
          f(H, { side: 'top' }, f('p', null, 'Tooltip oben'))
        ),
        f(
          z,
          null,
          f(F, { asChild: !0 }, f(U, { variant: 'outline' }, 'Rechts')),
          f(H, { side: 'right' }, f('p', null, 'Tooltip rechts'))
        ),
        f(
          z,
          null,
          f(F, { asChild: !0 }, f(U, { variant: 'outline' }, 'Unten')),
          f(H, { side: 'bottom' }, f('p', null, 'Tooltip unten'))
        ),
        f(
          z,
          null,
          f(F, { asChild: !0 }, f(U, { variant: 'outline' }, 'Links')),
          f(H, { side: 'left' }, f('p', null, 'Tooltip links'))
        )
      ),
  },
  be = {
    render: () =>
      f(
        z,
        null,
        f(
          F,
          { asChild: !0 },
          f(
            U,
            { variant: 'outline' },
            f(ne, { icon: zn, className: 'mr-2 h-4 w-4' }),
            'Erweiterte Info'
          )
        ),
        f(
          H,
          { className: 'max-w-xs' },
          f(
            'div',
            { className: 'space-y-2' },
            f('p', { className: 'font-semibold' }, 'Erweiterte Informationen'),
            f(
              'p',
              { className: 'text-sm' },
              'Dies ist ein längerer Tooltip mit mehreren Zeilen Text und zusätzlichen Details.'
            ),
            f(
              'div',
              { className: 'flex gap-2' },
              f(ft, { variant: 'secondary' }, 'Tag 1'),
              f(ft, { variant: 'secondary' }, 'Tag 2')
            )
          )
        )
      ),
  },
  Ce = {
    render: () =>
      f(
        z,
        { delayDuration: 1e3 },
        f(F, { asChild: !0 }, f(U, { variant: 'outline' }, 'Verzögerter Tooltip (1s)')),
        f(H, null, f('p', null, 'Dieser Tooltip erscheint nach 1 Sekunde'))
      ),
  },
  Ae = {
    render: () =>
      f(
        'div',
        { className: 'flex gap-2 rounded-lg border p-2' },
        f(
          z,
          null,
          f(
            F,
            { asChild: !0 },
            f(U, { variant: 'ghost', size: 'icon' }, f(ne, { icon: $n, className: 'h-4 w-4' }))
          ),
          f(H, null, f('p', null, 'Profil'))
        ),
        f(
          z,
          null,
          f(
            F,
            { asChild: !0 },
            f(U, { variant: 'ghost', size: 'icon' }, f(ne, { icon: jn, className: 'h-4 w-4' }))
          ),
          f(H, null, f('p', null, 'Einstellungen'))
        ),
        f(
          z,
          null,
          f(
            F,
            { asChild: !0 },
            f(U, { variant: 'ghost', size: 'icon' }, f(ne, { icon: Ee, className: 'h-4 w-4' }))
          ),
          f(H, null, f('p', null, 'Hilfe & Support'))
        )
      ),
  },
  Pe = {
    render: () =>
      f(
        'div',
        { className: 'space-y-4' },
        f(
          'div',
          { className: 'space-y-2' },
          f(
            'div',
            { className: 'flex items-center gap-2' },
            f('label', { htmlFor: 'username', className: 'text-sm font-medium' }, 'Benutzername'),
            f(
              z,
              null,
              f(
                F,
                { asChild: !0 },
                f(ne, { icon: Ee, className: 'h-3 w-3 text-muted-foreground' })
              ),
              f(H, null, f('p', null, 'Mindestens 3 Zeichen, nur Buchstaben und Zahlen'))
            )
          ),
          f('input', {
            id: 'username',
            type: 'text',
            className: 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            placeholder: 'Ihr Benutzername',
          })
        ),
        f(
          'div',
          { className: 'space-y-2' },
          f(
            'div',
            { className: 'flex items-center gap-2' },
            f('label', { htmlFor: 'password', className: 'text-sm font-medium' }, 'Passwort'),
            f(
              z,
              null,
              f(
                F,
                { asChild: !0 },
                f(ne, { icon: Ee, className: 'h-3 w-3 text-muted-foreground' })
              ),
              f(
                H,
                { className: 'max-w-xs' },
                f(
                  'div',
                  { className: 'space-y-1' },
                  f('p', { className: 'font-semibold' }, 'Passwort-Anforderungen:'),
                  f(
                    'ul',
                    { className: 'text-sm space-y-1' },
                    f('li', null, '• Mindestens 8 Zeichen'),
                    f('li', null, '• Ein Großbuchstabe'),
                    f('li', null, '• Eine Zahl'),
                    f('li', null, '• Ein Sonderzeichen')
                  )
                )
              )
            )
          ),
          f('input', {
            id: 'password',
            type: 'password',
            className: 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            placeholder: 'Ihr Passwort',
          })
        )
      ),
  }
var bt, Ct, At
ve.parameters = {
  ...ve.parameters,
  docs: {
    ...((bt = ve.parameters) == null ? void 0 : bt.docs),
    source: {
      originalSource: `{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dies ist ein Tooltip</p>
      </TooltipContent>
    </Tooltip>
}`,
      ...((At = (Ct = ve.parameters) == null ? void 0 : Ct.docs) == null ? void 0 : At.source),
    },
  },
}
var Pt, Rt, Et
ye.parameters = {
  ...ye.parameters,
  docs: {
    ...((Pt = ye.parameters) == null ? void 0 : Pt.docs),
    source: {
      originalSource: `{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <button className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
          <LucideIconWrapper icon={HelpCircle} className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Klicken Sie hier für weitere Informationen</p>
      </TooltipContent>
    </Tooltip>
}`,
      ...((Et = (Rt = ye.parameters) == null ? void 0 : Rt.docs) == null ? void 0 : Et.source),
    },
  },
}
var Ot, St, Nt
Te.parameters = {
  ...Te.parameters,
  docs: {
    ...((Ot = Te.parameters) == null ? void 0 : Ot.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Oben</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip oben</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Rechts</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip rechts</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Unten</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip unten</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Links</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip links</p>
        </TooltipContent>
      </Tooltip>
    </div>
}`,
      ...((Nt = (St = Te.parameters) == null ? void 0 : St.docs) == null ? void 0 : Nt.source),
    },
  },
}
var Dt, Lt, kt
be.parameters = {
  ...be.parameters,
  docs: {
    ...((Dt = be.parameters) == null ? void 0 : Dt.docs),
    source: {
      originalSource: `{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <LucideIconWrapper icon={Info} className="mr-2 h-4 w-4" />
          Erweiterte Info
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <p className="font-semibold">Erweiterte Informationen</p>
          <p className="text-sm">
            Dies ist ein längerer Tooltip mit mehreren Zeilen Text und zusätzlichen Details.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">Tag 1</Badge>
            <Badge variant="secondary">Tag 2</Badge>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
}`,
      ...((kt = (Lt = be.parameters) == null ? void 0 : Lt.docs) == null ? void 0 : kt.source),
    },
  },
}
var Mt, Bt, _t
Ce.parameters = {
  ...Ce.parameters,
  docs: {
    ...((Mt = Ce.parameters) == null ? void 0 : Mt.docs),
    source: {
      originalSource: `{
  render: () => <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="outline">Verzögerter Tooltip (1s)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dieser Tooltip erscheint nach 1 Sekunde</p>
      </TooltipContent>
    </Tooltip>
}`,
      ...((_t = (Bt = Ce.parameters) == null ? void 0 : Bt.docs) == null ? void 0 : _t.source),
    },
  },
}
var Ht, It, zt
Ae.parameters = {
  ...Ae.parameters,
  docs: {
    ...((Ht = Ae.parameters) == null ? void 0 : Ht.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex gap-2 rounded-lg border p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideIconWrapper icon={User} className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Profil</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideIconWrapper icon={Settings} className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Einstellungen</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideIconWrapper icon={HelpCircle} className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hilfe & Support</p>
        </TooltipContent>
      </Tooltip>
    </div>
}`,
      ...((zt = (It = Ae.parameters) == null ? void 0 : It.docs) == null ? void 0 : zt.source),
    },
  },
}
var jt, $t, Ft
Pe.parameters = {
  ...Pe.parameters,
  docs: {
    ...((jt = Pe.parameters) == null ? void 0 : jt.docs),
    source: {
      originalSource: `{
  render: () => <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="username" className="text-sm font-medium">
            Benutzername
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <LucideIconWrapper icon={HelpCircle} className="h-3 w-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mindestens 3 Zeichen, nur Buchstaben und Zahlen</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <input id="username" type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ihr Benutzername" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Passwort
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <LucideIconWrapper icon={HelpCircle} className="h-3 w-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-semibold">Passwort-Anforderungen:</p>
                <ul className="text-sm space-y-1">
                  <li>• Mindestens 8 Zeichen</li>
                  <li>• Ein Großbuchstabe</li>
                  <li>• Eine Zahl</li>
                  <li>• Ein Sonderzeichen</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <input id="password" type="password" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ihr Passwort" />
      </div>
    </div>
}`,
      ...((Ft = ($t = Pe.parameters) == null ? void 0 : $t.docs) == null ? void 0 : Ft.source),
    },
  },
}
const qr = ['Default', 'WithIcon', 'Positions', 'RichContent', 'Delayed', 'IconBar', 'FormHelper']
export {
  ve as Default,
  Ce as Delayed,
  Pe as FormHelper,
  Ae as IconBar,
  Te as Positions,
  be as RichContent,
  ye as WithIcon,
  qr as __namedExportsOrder,
  Xr as default,
}
