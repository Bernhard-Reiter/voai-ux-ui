import { r as d, j as u } from './iframe-RsHbt8uy.js'
import { S as c } from './index-C4ESynIQ.js'
import { a as l } from './bundle-mjs-B2rm_Apj.js'
import { a as f } from './lucide-wrapper-MqQNZape.js'
function n() {
  return (
    (n = Object.assign
      ? Object.assign.bind()
      : function (o) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e]
            for (var t in r) ({}).hasOwnProperty.call(r, t) && (o[t] = r[t])
          }
          return o
        }),
    n.apply(null, arguments)
  )
}
const g = l(
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'text-primary underline-offset-4 hover:underline',
          gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg',
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-lg px-3',
          lg: 'h-11 rounded-xl px-8',
          icon: 'h-10 w-10',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  ),
  a = d.forwardRef(({ className: o, variant: e, size: r, asChild: t = !1, ...s }, i) =>
    u(t ? c : 'button', n({ className: f(g({ variant: e, size: r, className: o })), ref: i }, s))
  )
a.displayName = 'Button'
a.__docgenInfo = {
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
export { a as B }
