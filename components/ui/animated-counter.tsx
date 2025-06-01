'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false)
  const spring = useSpring(0, { duration: duration * 1000 })
  const display = useTransform(
    spring,
    (current) => `${prefix}${current.toFixed(decimals)}${suffix}`
  )

  useEffect(() => {
    if (isVisible) {
      spring.set(value)
    }
  }, [spring, value, isVisible])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true }}
    >
      <motion.span>{display}</motion.span>
    </motion.span>
  )
}
