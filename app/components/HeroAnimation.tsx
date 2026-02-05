'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

/* ─────────────────────────────────────────────
   Cinematic Hero Entrance

   Orchestrated reveal sequence:
   1. Eyebrow types in with a cursor blink
   2. Headline words cascade with masked clip reveals
   3. Accent word ("Works") gets a luminous sweep
   4. Body text fades up softly
   5. CTAs spring in with elastic overshoot
   6. Mouse parallax adds living depth

   Every element is timed to a master timeline
   so the whole thing feels like ONE choreographed moment.
   ───────────────────────────────────────────── */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

// Master timeline delays (seconds)
const T = {
  eyebrow: 0.2,
  headline: 0.5,
  wordGap: 0.08,
  accent: 1.1,
  subtext: 1.4,
  ctas: 1.7,
  ctaGap: 0.12,
}

/* Splits headline into words, giving each its own masked reveal */
function MaskedWord({
  word,
  delay,
  isAccent,
}: {
  word: string
  delay: number
  isAccent?: boolean
}) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
      <motion.span
        initial={{ y: '110%', rotateX: 40 }}
        animate={{ y: '0%', rotateX: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: EASE_OUT_EXPO,
        }}
        style={{
          display: 'inline-block',
          transformOrigin: 'bottom center',
          ...(isAccent ? { fontStyle: 'italic', color: 'var(--color-accent)' } : {}),
        }}
      >
        {word}
        {isAccent && <LuminousSweep delay={delay + 0.4} />}
      </motion.span>
    </span>
  )
}

/* A light sweep that passes over the accent word */
function LuminousSweep({ delay }: { delay: number }) {
  return (
    <motion.span
      initial={{ left: '-100%' }}
      animate={{ left: '200%' }}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      style={{
        position: 'absolute',
        top: 0,
        width: '60%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(232, 176, 138, 0.4), transparent)',
        pointerEvents: 'none',
        filter: 'blur(8px)',
      }}
    />
  )
}

/* Cursor that blinks next to eyebrow text */
function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1, 0, 1, 0] }}
      transition={{ duration: 3, times: [0, 0.16, 0.33, 0.5, 0.66, 1] }}
      style={{
        display: 'inline-block',
        width: '1px',
        height: '12px',
        backgroundColor: 'var(--color-accent)',
        marginLeft: '4px',
        verticalAlign: 'middle',
      }}
    />
  )
}

/* Parallax container that follows mouse position */
function ParallaxLayer({
  children,
  intensity = 1,
}: {
  children: React.ReactNode
  intensity?: number
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(((e.clientX - centerX) / centerX) * 15 * intensity)
      mouseY.set(((e.clientY - centerY) / centerY) * 10 * intensity)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY, intensity])

  return (
    <motion.div style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  )
}

/* Scroll-driven fade for the entire hero */
function useHeroScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  const y = useTransform(scrollY, [0, 600], [0, -80])
  const scale = useTransform(scrollY, [0, 600], [1, 0.95])
  return { ref, opacity, y, scale }
}

/* ─── Main Hero Component ─── */

export function HeroAnimation() {
  const { ref, opacity, y, scale } = useHeroScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const headlineWords = [
    { text: 'Your', accent: false },
    { text: 'Business', accent: false },
    { text: 'Deserves', accent: false },
    { text: 'a', accent: false },
    { text: 'Website', accent: false },
    { text: 'That', accent: false },
    { text: 'Actually', accent: false },
    { text: 'Works', accent: true },
  ]

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, position: 'relative', zIndex: 10 }}
    >
      <ParallaxLayer intensity={0.4}>
        <div
          style={{
            textAlign: 'center',
            paddingTop: '80px',
            paddingBottom: '0',
            paddingLeft: '24px',
            paddingRight: '24px',
            pointerEvents: 'none',
          }}
        >
          {/* Eyebrow — types in */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={mounted ? { opacity: 1, letterSpacing: '0.2em' } : {}}
            transition={{ duration: 1.2, delay: T.eyebrow, ease: EASE_OUT_EXPO }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '20px',
            }}
          >
            Web Design for Louisville Businesses
            <BlinkingCursor />
          </motion.p>

          {/* Headline — masked word reveals */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 80px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              maxWidth: '800px',
              margin: '0 auto',
              perspective: '600px',
            }}
          >
            {headlineWords.map((w, i) => (
              <span key={i}>
                <MaskedWord
                  word={w.text}
                  delay={T.headline + i * T.wordGap}
                  isAccent={w.accent}
                />{' '}
              </span>
            ))}
          </h1>

          {/* Subtext — soft fade with subtle blur */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, delay: T.subtext, ease: EASE_OUT_EXPO }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '520px',
              margin: '24px auto 0',
            }}
          >
            I build professional websites for dentists, restaurants, salons, and local businesses.
            60+ sites delivered. Yours could be live in two weeks.
          </motion.p>

          {/* CTAs — spring scale-in */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '32px',
              pointerEvents: 'auto',
              flexWrap: 'wrap',
            }}
          >
            <motion.a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="cta-button"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: T.ctas,
                ease: EASE_SPRING,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 40px rgba(200, 149, 108, 0.3)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              See My Work
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="cta-button-outline"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: T.ctas + T.ctaGap,
                ease: EASE_SPRING,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: 'var(--color-accent-bright)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Get a Free Quote
            </motion.a>
          </div>
        </div>
      </ParallaxLayer>
    </motion.div>
  )
}

/* 3D model entrance — dramatic scale bloom */
export function ThreeDModelEntrance({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        delay: 0.3,
        ease: EASE_OUT_EXPO,
      }}
      style={{ width: '100%', marginTop: '-60px' }}
    >
      {children}
    </motion.div>
  )
}
