import * as React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }

export function ButtonPrimary({ className='', ...props }: Props) {
  return (
    <button
      {...props}
      className={
        'font-epilogue inline-flex items-center justify-center h-11 px-5 rounded-lg ' +
        'bg-brand text-white hover:bg-brand-700 ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] ' +
        className
      }
    />
  )
}

export function ButtonSecondary({ className='', ...props }: Props) {
  return (
    <button
      {...props}
      className={
        'font-epilogue inline-flex items-center justify-center h-11 px-5 rounded-lg ' +
        'border border-border text-fg hover:bg-surface ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] ' +
        className
      }
    />
  )
}