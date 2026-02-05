'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/*
  Reusable scroll-triggered reveal wrapper.

  Uses Framer Motion's whileInView to animate elements
  as they enter the viewport — creating a narrative flow
  as the visitor scrolls through the story.
*/

interface AnimateInProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  once?: boolean
  className?: string
  style?: React.CSSProperties
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'h2' | 'h3'
}

const MotionComponents = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
}

export function AnimateIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  x = 0,
  once = true,
  className,
  style,
  as = 'div',
}: AnimateInProps) {
  const Component = MotionComponents[as]

  return (
    <Component
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // same spring-out curve used throughout
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  )
}

/* Stagger container — children animate in sequence */
export function StaggerIn({
  children,
  staggerDelay = 0.1,
  className,
  style,
}: {
  children: ReactNode
  staggerDelay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export const staggerChild = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/* Accent line that expands on scroll with shimmer */
export function AnimatedAccentLine({ style }: { style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        transformOrigin: 'center',
        position: 'relative',
        height: '1px',
        ...style,
      }}
    >
      {/* Base gradient line */}
      <div className="accent-line" style={{ position: 'absolute', inset: 0 }} />
      {/* Shimmer that travels across */}
      <div className="accent-line-shimmer" />
    </motion.div>
  )
}
