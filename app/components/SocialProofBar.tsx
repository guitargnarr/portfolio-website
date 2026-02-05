'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* Animated counter with spring physics — numbers feel alive */
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, value, motionVal])

  useEffect(() => {
    const unsub = springVal.on('change', (v) => setDisplay(Math.floor(v)))
    return unsub
  }, [springVal])

  return (
    <div ref={ref}>
      {display}{suffix}
    </div>
  )
}

/* Glowing border that pulses on the stat boxes */
function GlowBorder({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            'inset 0 0 0px rgba(200, 149, 108, 0)',
            'inset 0 0 20px rgba(200, 149, 108, 0.08)',
            'inset 0 0 0px rgba(200, 149, 108, 0)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, delay }}
        style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }}
      />
    </motion.div>
  )
}

const stats = [
  { value: 60, suffix: '+', label: 'Websites Delivered' },
  { value: 14, suffix: '', label: 'Industries Served' },
  { text: 'Louisville, KY', label: 'Based' },
  { text: '2 Weeks', label: 'Average Delivery' },
]

export function SocialProofBar() {
  return (
    <section
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '60px 24px',
        width: '100%',
      }}
    >
      <motion.div
        className="social-proof-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{
              backgroundColor: 'rgba(200, 149, 108, 0.04)',
              transition: { duration: 0.3 },
            }}
            style={{
              textAlign: 'center',
              padding: '24px 16px',
              position: 'relative',
              cursor: 'default',
            }}
          >
            <GlowBorder delay={i * 0.5} />
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
                marginBottom: '8px',
              }}
            >
              {'value' in stat ? (
                <CountUp value={stat.value!} suffix={stat.suffix} />
              ) : (
                stat.text
              )}
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '24px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'var(--color-accent)',
                margin: '8px auto',
                opacity: 0.5,
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
