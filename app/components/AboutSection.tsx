'use client'

import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'

export function AboutSection() {
  const paragraphs = [
    "I build websites for local businesses in Louisville. Not templates you can't change. Not overengineered apps that break. Real websites that work, look professional, and help your customers find you.",
    "60+ sites for businesses like yours \u2014 dentists, restaurants, salons, jewelers. Every one of them is live right now. You can visit any of them.",
    "I live in Louisville. I'm not an agency. I'm not overseas. When you hire me, you work directly with me.",
  ]

  return (
    <section
      id="about"
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '100px 24px 80px',
        width: '100%',
      }}
    >
      <AnimateIn>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            About
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: '32px',
          lineHeight: 1.2,
        }}>
          Hi, I&apos;m <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Matthew</span>.
        </h2>
      </AnimateIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {paragraphs.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
            }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  )
}
