import { r as s, j as o } from './iframe-RsHbt8uy.js'
import { a as t } from './lucide-wrapper-MqQNZape.js'
function d() {
  return (
    (d = Object.assign
      ? Object.assign.bind()
      : function (r) {
          for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a]
            for (var n in e) ({}).hasOwnProperty.call(e, n) && (r[n] = e[n])
          }
          return r
        }),
    d.apply(null, arguments)
  )
}
const i = s.forwardRef(({ className: r, ...a }, e) =>
  o(
    'div',
    d({ ref: e, className: t('rounded-xl border bg-card text-card-foreground shadow-sm', r) }, a)
  )
)
i.displayName = 'Card'
const c = s.forwardRef(({ className: r, ...a }, e) =>
  o('div', d({ ref: e, className: t('flex flex-col space-y-1.5 p-6', r) }, a))
)
c.displayName = 'CardHeader'
const m = s.forwardRef(({ className: r, ...a }, e) =>
  o('h3', d({ ref: e, className: t('text-2xl font-semibold leading-none tracking-tight', r) }, a))
)
m.displayName = 'CardTitle'
const l = s.forwardRef(({ className: r, ...a }, e) =>
  o('p', d({ ref: e, className: t('text-sm text-muted-foreground', r) }, a))
)
l.displayName = 'CardDescription'
const p = s.forwardRef(({ className: r, ...a }, e) =>
  o('div', d({ ref: e, className: t('p-6 pt-0', r) }, a))
)
p.displayName = 'CardContent'
const f = s.forwardRef(({ className: r, ...a }, e) =>
  o('div', d({ ref: e, className: t('flex items-center p-6 pt-0', r) }, a))
)
f.displayName = 'CardFooter'
i.__docgenInfo = { description: '', methods: [], displayName: 'Card' }
c.__docgenInfo = { description: '', methods: [], displayName: 'CardHeader' }
f.__docgenInfo = { description: '', methods: [], displayName: 'CardFooter' }
m.__docgenInfo = { description: '', methods: [], displayName: 'CardTitle' }
l.__docgenInfo = { description: '', methods: [], displayName: 'CardDescription' }
p.__docgenInfo = { description: '', methods: [], displayName: 'CardContent' }
export { i as C, p as a, c as b, m as c, l as d, f as e }
