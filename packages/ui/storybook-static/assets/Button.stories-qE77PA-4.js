import { j as e, r as L } from './iframe-RsHbt8uy.js'
import { B as r } from './Button-DnyYgvCD.js'
import { c as y, L as S } from './lucide-wrapper-MqQNZape.js'
import './index-C4ESynIQ.js'
import './bundle-mjs-B2rm_Apj.js'
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const he = y('ArrowRight', [
  ['path', { d: 'M5 12h14', key: '1ays0h' }],
  ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
])
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ve = y('Download', [
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
  ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
  ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
])
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Be = y('Heart', [
  [
    'path',
    {
      d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
      key: 'c3ymky',
    },
  ],
])
/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ye = y('Loader2', [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }]]),
  Ge = {
    title: 'Atoms/Button',
    component: r,
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Ein vielseitiger Button-Component mit verschiedenen Varianten und Größen.',
        },
      },
    },
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'gradient'],
        description: 'Die visuelle Variante des Buttons',
      },
      size: {
        control: 'select',
        options: ['default', 'sm', 'lg', 'icon'],
        description: 'Die Größe des Buttons',
      },
      asChild: {
        control: 'boolean',
        description: 'Rendert den Button als Child-Component (für Composition)',
      },
      disabled: { control: 'boolean', description: 'Deaktiviert den Button' },
    },
  },
  a = { args: { children: 'Button' } },
  n = { args: { variant: 'destructive', children: 'Löschen' } },
  t = { args: { variant: 'outline', children: 'Outline' } },
  s = { args: { variant: 'secondary', children: 'Secondary' } },
  o = { args: { variant: 'ghost', children: 'Ghost' } },
  c = { args: { variant: 'link', children: 'Link Button' } },
  i = { args: { variant: 'gradient', children: 'Gradient' } },
  d = { args: { size: 'sm', children: 'Klein' } },
  l = { args: { size: 'lg', children: 'Groß' } },
  u = { args: { size: 'icon', children: e(S, { icon: Be, className: 'h-4 w-4' }) } },
  m = {
    args: {
      children: e(L.Fragment, null, 'Download', e(S, { icon: ve, className: 'ml-2 h-4 w-4' })),
    },
  },
  p = {
    args: {
      children: e(L.Fragment, null, e(S, { icon: he, className: 'mr-2 h-4 w-4' }), 'Weiter'),
    },
  },
  g = {
    args: {
      disabled: !0,
      children: e(
        L.Fragment,
        null,
        e(S, { icon: ye, className: 'mr-2 h-4 w-4 animate-spin' }),
        'Bitte warten...'
      ),
    },
  },
  h = { args: { disabled: !0, children: 'Deaktiviert' } },
  v = {
    render: () =>
      e(
        'div',
        { className: 'flex items-center space-x-2' },
        e(r, { variant: 'outline' }, 'Abbrechen'),
        e(r, null, 'Speichern')
      ),
  },
  B = {
    render: () =>
      e(
        'div',
        { className: 'grid grid-cols-4 gap-4' },
        e(r, null, 'Default'),
        e(r, { variant: 'destructive' }, 'Destructive'),
        e(r, { variant: 'outline' }, 'Outline'),
        e(r, { variant: 'secondary' }, 'Secondary'),
        e(r, { variant: 'ghost' }, 'Ghost'),
        e(r, { variant: 'link' }, 'Link'),
        e(r, { variant: 'gradient' }, 'Gradient'),
        e(r, { disabled: !0 }, 'Disabled')
      ),
  }
var k, D, w
a.parameters = {
  ...a.parameters,
  docs: {
    ...((k = a.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Button'
  }
}`,
      ...((w = (D = a.parameters) == null ? void 0 : D.docs) == null ? void 0 : w.source),
    },
  },
}
var G, b, f
n.parameters = {
  ...n.parameters,
  docs: {
    ...((G = n.parameters) == null ? void 0 : G.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'destructive',
    children: 'Löschen'
  }
}`,
      ...((f = (b = n.parameters) == null ? void 0 : b.docs) == null ? void 0 : f.source),
    },
  },
}
var I, N, x
t.parameters = {
  ...t.parameters,
  docs: {
    ...((I = t.parameters) == null ? void 0 : I.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,
      ...((x = (N = t.parameters) == null ? void 0 : N.docs) == null ? void 0 : x.source),
    },
  },
}
var A, z, W
s.parameters = {
  ...s.parameters,
  docs: {
    ...((A = s.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,
      ...((W = (z = s.parameters) == null ? void 0 : z.docs) == null ? void 0 : W.source),
    },
  },
}
var O, C, H
o.parameters = {
  ...o.parameters,
  docs: {
    ...((O = o.parameters) == null ? void 0 : O.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}`,
      ...((H = (C = o.parameters) == null ? void 0 : C.docs) == null ? void 0 : H.source),
    },
  },
}
var M, R, V
c.parameters = {
  ...c.parameters,
  docs: {
    ...((M = c.parameters) == null ? void 0 : M.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,
      ...((V = (R = c.parameters) == null ? void 0 : R.docs) == null ? void 0 : V.source),
    },
  },
}
var j, E, F
i.parameters = {
  ...i.parameters,
  docs: {
    ...((j = i.parameters) == null ? void 0 : j.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'gradient',
    children: 'Gradient'
  }
}`,
      ...((F = (E = i.parameters) == null ? void 0 : E.docs) == null ? void 0 : F.source),
    },
  },
}
var q, K, _
d.parameters = {
  ...d.parameters,
  docs: {
    ...((q = d.parameters) == null ? void 0 : q.docs),
    source: {
      originalSource: `{
  args: {
    size: 'sm',
    children: 'Klein'
  }
}`,
      ...((_ = (K = d.parameters) == null ? void 0 : K.docs) == null ? void 0 : _.source),
    },
  },
}
var T, Z, J
l.parameters = {
  ...l.parameters,
  docs: {
    ...((T = l.parameters) == null ? void 0 : T.docs),
    source: {
      originalSource: `{
  args: {
    size: 'lg',
    children: 'Groß'
  }
}`,
      ...((J = (Z = l.parameters) == null ? void 0 : Z.docs) == null ? void 0 : J.source),
    },
  },
}
var P, Q, U
u.parameters = {
  ...u.parameters,
  docs: {
    ...((P = u.parameters) == null ? void 0 : P.docs),
    source: {
      originalSource: `{
  args: {
    size: 'icon',
    children: <LucideIconWrapper icon={Heart} className="h-4 w-4" />
  }
}`,
      ...((U = (Q = u.parameters) == null ? void 0 : Q.docs) == null ? void 0 : U.source),
    },
  },
}
var X, Y, $
m.parameters = {
  ...m.parameters,
  docs: {
    ...((X = m.parameters) == null ? void 0 : X.docs),
    source: {
      originalSource: `{
  args: {
    children: <>
        Download
        <LucideIconWrapper icon={Download} className="ml-2 h-4 w-4" />
      </>
  }
}`,
      ...(($ = (Y = m.parameters) == null ? void 0 : Y.docs) == null ? void 0 : $.source),
    },
  },
}
var ee, re, ae
p.parameters = {
  ...p.parameters,
  docs: {
    ...((ee = p.parameters) == null ? void 0 : ee.docs),
    source: {
      originalSource: `{
  args: {
    children: <>
        <LucideIconWrapper icon={ArrowRight} className="mr-2 h-4 w-4" />
        Weiter
      </>
  }
}`,
      ...((ae = (re = p.parameters) == null ? void 0 : re.docs) == null ? void 0 : ae.source),
    },
  },
}
var ne, te, se
g.parameters = {
  ...g.parameters,
  docs: {
    ...((ne = g.parameters) == null ? void 0 : ne.docs),
    source: {
      originalSource: `{
  args: {
    disabled: true,
    children: <>
        <LucideIconWrapper icon={Loader2} className="mr-2 h-4 w-4 animate-spin" />
        Bitte warten...
      </>
  }
}`,
      ...((se = (te = g.parameters) == null ? void 0 : te.docs) == null ? void 0 : se.source),
    },
  },
}
var oe, ce, ie
h.parameters = {
  ...h.parameters,
  docs: {
    ...((oe = h.parameters) == null ? void 0 : oe.docs),
    source: {
      originalSource: `{
  args: {
    disabled: true,
    children: 'Deaktiviert'
  }
}`,
      ...((ie = (ce = h.parameters) == null ? void 0 : ce.docs) == null ? void 0 : ie.source),
    },
  },
}
var de, le, ue
v.parameters = {
  ...v.parameters,
  docs: {
    ...((de = v.parameters) == null ? void 0 : de.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex items-center space-x-2">
      <Button variant="outline">Abbrechen</Button>
      <Button>Speichern</Button>
    </div>
}`,
      ...((ue = (le = v.parameters) == null ? void 0 : le.docs) == null ? void 0 : ue.source),
    },
  },
}
var me, pe, ge
B.parameters = {
  ...B.parameters,
  docs: {
    ...((me = B.parameters) == null ? void 0 : me.docs),
    source: {
      originalSource: `{
  render: () => <div className="grid grid-cols-4 gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="gradient">Gradient</Button>
      <Button disabled>Disabled</Button>
    </div>
}`,
      ...((ge = (pe = B.parameters) == null ? void 0 : pe.docs) == null ? void 0 : ge.source),
    },
  },
}
const be = [
  'Default',
  'Destructive',
  'Outline',
  'Secondary',
  'Ghost',
  'Link',
  'Gradient',
  'Small',
  'Large',
  'Icon',
  'WithIcon',
  'IconLeft',
  'Loading',
  'Disabled',
  'ButtonGroup',
  'AllVariants',
]
export {
  B as AllVariants,
  v as ButtonGroup,
  a as Default,
  n as Destructive,
  h as Disabled,
  o as Ghost,
  i as Gradient,
  u as Icon,
  p as IconLeft,
  l as Large,
  c as Link,
  g as Loading,
  t as Outline,
  s as Secondary,
  d as Small,
  m as WithIcon,
  be as __namedExportsOrder,
  Ge as default,
}
