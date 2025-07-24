import { r as s } from './iframe-RsHbt8uy.js'
function y(e, t) {
  if (typeof e == 'function') return e(t)
  e != null && (e.current = t)
}
function m(...e) {
  return (t) => {
    let o = !1
    const n = e.map((r) => {
      const l = y(r, t)
      return (!o && typeof l == 'function' && (o = !0), l)
    })
    if (o)
      return () => {
        for (let r = 0; r < n.length; r++) {
          const l = n[r]
          typeof l == 'function' ? l() : y(e[r], null)
        }
      }
  }
}
function k(...e) {
  return s.useCallback(m(...e), e)
}
var _ = { exports: {} },
  p = {}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var R = s,
  C = Symbol.for('react.element'),
  b = Symbol.for('react.fragment'),
  g = Object.prototype.hasOwnProperty,
  h = R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  v = { key: !0, ref: !0, __self: !0, __source: !0 }
function S(e, t, o) {
  var n,
    r = {},
    l = null,
    i = null
  ;(o !== void 0 && (l = '' + o),
    t.key !== void 0 && (l = '' + t.key),
    t.ref !== void 0 && (i = t.ref))
  for (n in t) g.call(t, n) && !v.hasOwnProperty(n) && (r[n] = t[n])
  if (e && e.defaultProps) for (n in ((t = e.defaultProps), t)) r[n] === void 0 && (r[n] = t[n])
  return { $$typeof: C, type: e, key: l, ref: i, props: r, _owner: h.current }
}
p.Fragment = b
p.jsx = S
p.jsxs = S
_.exports = p
var f = _.exports
function O(e) {
  const t = j(e),
    o = s.forwardRef((n, r) => {
      const { children: l, ...i } = n,
        u = s.Children.toArray(l),
        a = u.find(I)
      if (a) {
        const c = a.props.children,
          x = u.map((d) =>
            d === a
              ? s.Children.count(c) > 1
                ? s.Children.only(null)
                : s.isValidElement(c)
                  ? c.props.children
                  : null
              : d
          )
        return f.jsx(t, {
          ...i,
          ref: r,
          children: s.isValidElement(c) ? s.cloneElement(c, void 0, x) : null,
        })
      }
      return f.jsx(t, { ...i, ref: r, children: l })
    })
  return ((o.displayName = `${e}.Slot`), o)
}
var T = O('Slot')
function j(e) {
  const t = s.forwardRef((o, n) => {
    const { children: r, ...l } = o
    if (s.isValidElement(r)) {
      const i = N(r),
        u = P(l, r.props)
      return (r.type !== s.Fragment && (u.ref = n ? m(n, i) : i), s.cloneElement(r, u))
    }
    return s.Children.count(r) > 1 ? s.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var E = Symbol('radix.slottable')
function V(e) {
  const t = ({ children: o }) => f.jsx(f.Fragment, { children: o })
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = E), t)
}
function I(e) {
  return (
    s.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === E
  )
}
function P(e, t) {
  const o = { ...t }
  for (const n in t) {
    const r = e[n],
      l = t[n]
    ;/^on[A-Z]/.test(n)
      ? r && l
        ? (o[n] = (...u) => {
            const a = l(...u)
            return (r(...u), a)
          })
        : r && (o[n] = r)
      : n === 'style'
        ? (o[n] = { ...r, ...l })
        : n === 'className' && (o[n] = [r, l].filter(Boolean).join(' '))
  }
  return { ...e, ...o }
}
function N(e) {
  var n, r
  let t = (n = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null ? void 0 : n.get,
    o = t && 'isReactWarning' in t && t.isReactWarning
  return o
    ? e.ref
    : ((t = (r = Object.getOwnPropertyDescriptor(e, 'ref')) == null ? void 0 : r.get),
      (o = t && 'isReactWarning' in t && t.isReactWarning),
      o ? e.props.ref : e.props.ref || e.ref)
}
export { T as S, O as a, V as c, f as j, k as u }
