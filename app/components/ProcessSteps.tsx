'use client'

import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'We talk about your business and what you need. No jargon, no hard sell.',
  },
  {
    number: '02',
    title: 'I Build It',
    description: 'You see a working preview within one week. Changes are easy.',
  },
  {
    number: '03',
    title: 'You Go Live',
    description: 'Your site launches. I walk you through everything.',
  },
  {
    number: '04',
    title: 'Ongoing Support',
    description: "I'm here when you need me. Updates, changes, questions — just ask.",
  },
]

/* Animated connecting line that draws between steps */
function ProgressLine({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15 + 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: 'absolute',
        left: '15px',
        top: '40px',
        bottom: '-32px',
        width: '1px',
        background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
        transformOrigin: 'top',
        opacity: 0.3,
      }}
    />
  )
}

/* Step number with animated ring */
function StepNumber({ number, index }: { number: string; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', flexShrink: 0 }}
    >
      {/* Pulsing ring */}
      <motion.div
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: index * 0.6,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: '50%',
          border: '1px solid var(--color-accent)',
        }}
      />
      {/* Number circle */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.05em',
          color: 'var(--color-accent)',
        }}
      >
        {number}
      </div>
    </motion.div>
  )
}

export function ProcessSteps() {
  return (
    <section
      id="process"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 24px 80px',
        width: '100%',
      }}
    >
      {/* Section label */}
      <AnimateIn>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            How It Works
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>
      </AnimateIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: 'flex',
              gap: '24px',
              padding: '32px 0',
              borderBottom: i < steps.length - 1 ? '1px solid var(--color-border)' : 'none',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            {/* Connecting line between steps */}
            {i < steps.length - 1 && <ProgressLine index={i} />}

            <StepNumber number={step.number} index={i} />

            <div>
              <motion.h3
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  maxWidth: '500px',
                }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
