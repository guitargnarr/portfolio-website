'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

/*
  Ambient floating particles that drift across the entire page.
  Creates visual continuity between the hero 3D and the rest
  of the content — like embers from the light trails drifting
  through the void.

  Pure CSS/Framer Motion — no Three.js overhead.
*/

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
}

export function FloatingParticles({ count = 25 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20,
      drift: (Math.random() - 0.5) * 30,
      opacity: 0.1 + Math.random() * 0.25,
    }))
  }, [count])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -900, 0],
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
          }}
        />
      ))}
    </div>
  )
}
