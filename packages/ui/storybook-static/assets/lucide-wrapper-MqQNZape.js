import { t as f, c as w } from './bundle-mjs-B2rm_Apj.js'
import { r as s, j as L } from './iframe-RsHbt8uy.js'
function b(...e) {
  return f(w(e))
}
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var g = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const h = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .trim(),
  k = (e, r) => {
    const o = s.forwardRef(
      (
        {
          color: i = 'currentColor',
          size: t = 24,
          strokeWidth: c = 2,
          absoluteStrokeWidth: a,
          className: p = '',
          children: n,
          ...u
        },
        d
      ) =>
        s.createElement(
          'svg',
          {
            ref: d,
            ...g,
            width: t,
            height: t,
            stroke: i,
            strokeWidth: a ? (Number(c) * 24) / Number(t) : c,
            className: ['lucide', `lucide-${h(e)}`, p].join(' '),
            ...u,
          },
          [...r.map(([m, l]) => s.createElement(m, l)), ...(Array.isArray(n) ? n : [n])]
        )
    )
    return ((o.displayName = `${e}`), o)
  }
function y({ icon: e, ...r }) {
  return L(e, r)
}
y.__docgenInfo = {
  description: `Wrapper function to correctly type Lucide icons for use as JSX components
This resolves TypeScript errors when using Lucide icons in React components`,
  methods: [],
  displayName: 'LucideIconWrapper',
  props: { icon: { required: !0, tsType: { name: 'LucideIcon' }, description: '' } },
}
export { y as L, b as a, k as c }
