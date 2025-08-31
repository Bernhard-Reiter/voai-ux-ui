import * as React from 'react'
export function Card({ children, className='' }:{children:React.ReactNode; className?:string}) {
  return (
    <div className={
      'rounded-lg border border-border bg-bg p-6 ' +
      'transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-card ' +
      className
    }>
      {children}
    </div>
  )
}