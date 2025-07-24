import { r as U, j as W } from './iframe-RsHbt8uy.js'
import { S as X } from './index-C4ESynIQ.js'
import { t as Y, c as Z, a as $ } from './bundle-mjs-B2rm_Apj.js'
function ee(...e) {
  return Y(Z(e))
}
function g() {
  return (
    (g = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var a = arguments[r]
            for (var s in a) ({}).hasOwnProperty.call(a, s) && (e[s] = a[s])
          }
          return e
        }),
    g.apply(null, arguments)
  )
}
const re = $(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-md px-3',
          lg: 'h-11 rounded-md px-8',
          icon: 'h-10 w-10',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  ),
  h = U.forwardRef(({ className: e, variant: r, size: a, asChild: s = !1, ...K }, Q) =>
    W(s ? X : 'button', g({ className: ee(re({ variant: r, size: a, className: e })), ref: Q }, K))
  )
h.displayName = 'Button'
h.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Button',
  props: {
    asChild: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
  },
  composes: ['VariantProps'],
}
const oe = {
    title: 'Components/Button',
    component: h,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      },
      size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    },
  },
  n = { args: { children: 'Button' } },
  t = { args: { variant: 'secondary', children: 'Secondary' } },
  o = { args: { variant: 'destructive', children: 'Destructive' } },
  c = { args: { variant: 'outline', children: 'Outline' } },
  i = { args: { variant: 'ghost', children: 'Ghost' } },
  d = { args: { variant: 'link', children: 'Link' } },
  l = { args: { size: 'sm', children: 'Small' } },
  u = { args: { size: 'lg', children: 'Large' } },
  m = { args: { size: 'icon', children: '🚀' } },
  p = { args: { disabled: !0, children: 'Disabled' } }
var f, v, b
n.parameters = {
  ...n.parameters,
  docs: {
    ...((f = n.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Button'
  }
}`,
      ...((b = (v = n.parameters) == null ? void 0 : v.docs) == null ? void 0 : b.source),
    },
  },
}
var y, S, x
t.parameters = {
  ...t.parameters,
  docs: {
    ...((y = t.parameters) == null ? void 0 : y.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,
      ...((x = (S = t.parameters) == null ? void 0 : S.docs) == null ? void 0 : x.source),
    },
  },
}
var k, D, z
o.parameters = {
  ...o.parameters,
  docs: {
    ...((k = o.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'destructive',
    children: 'Destructive'
  }
}`,
      ...((z = (D = o.parameters) == null ? void 0 : D.docs) == null ? void 0 : z.source),
    },
  },
}
var L, O, w
c.parameters = {
  ...c.parameters,
  docs: {
    ...((L = c.parameters) == null ? void 0 : L.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,
      ...((w = (O = c.parameters) == null ? void 0 : O.docs) == null ? void 0 : w.source),
    },
  },
}
var B, j, _
i.parameters = {
  ...i.parameters,
  docs: {
    ...((B = i.parameters) == null ? void 0 : B.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}`,
      ...((_ = (j = i.parameters) == null ? void 0 : j.docs) == null ? void 0 : _.source),
    },
  },
}
var C, G, V
d.parameters = {
  ...d.parameters,
  docs: {
    ...((C = d.parameters) == null ? void 0 : C.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'link',
    children: 'Link'
  }
}`,
      ...((V = (G = d.parameters) == null ? void 0 : G.docs) == null ? void 0 : V.source),
    },
  },
}
var I, N, E
l.parameters = {
  ...l.parameters,
  docs: {
    ...((I = l.parameters) == null ? void 0 : I.docs),
    source: {
      originalSource: `{
  args: {
    size: 'sm',
    children: 'Small'
  }
}`,
      ...((E = (N = l.parameters) == null ? void 0 : N.docs) == null ? void 0 : E.source),
    },
  },
}
var P, T, q
u.parameters = {
  ...u.parameters,
  docs: {
    ...((P = u.parameters) == null ? void 0 : P.docs),
    source: {
      originalSource: `{
  args: {
    size: 'lg',
    children: 'Large'
  }
}`,
      ...((q = (T = u.parameters) == null ? void 0 : T.docs) == null ? void 0 : q.source),
    },
  },
}
var M, R, A
m.parameters = {
  ...m.parameters,
  docs: {
    ...((M = m.parameters) == null ? void 0 : M.docs),
    source: {
      originalSource: `{
  args: {
    size: 'icon',
    children: '🚀'
  }
}`,
      ...((A = (R = m.parameters) == null ? void 0 : R.docs) == null ? void 0 : A.source),
    },
  },
}
var F, H, J
p.parameters = {
  ...p.parameters,
  docs: {
    ...((F = p.parameters) == null ? void 0 : F.docs),
    source: {
      originalSource: `{
  args: {
    disabled: true,
    children: 'Disabled'
  }
}`,
      ...((J = (H = p.parameters) == null ? void 0 : H.docs) == null ? void 0 : J.source),
    },
  },
}
const ce = [
  'Default',
  'Secondary',
  'Destructive',
  'Outline',
  'Ghost',
  'Link',
  'Small',
  'Large',
  'Icon',
  'Disabled',
]
export {
  n as Default,
  o as Destructive,
  p as Disabled,
  i as Ghost,
  m as Icon,
  u as Large,
  d as Link,
  c as Outline,
  t as Secondary,
  l as Small,
  ce as __namedExportsOrder,
  oe as default,
}
