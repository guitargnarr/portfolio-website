'use client'

import type { ReactNode } from 'react'
import { AnimateIn } from '@/app/components/AnimateIn'

interface ActSectionProps {
  id: string
  actNumber: number
  label: string
  title: string
  subtitle: string
  paragraphs: string[]
  formula: string
  formulaLabel: string
  animation: ReactNode
  demo: ReactNode
}

export function ActSection({
  id,
  actNumber,
  label,
  title,
  subtitle,
  paragraphs,
  formula,
  formulaLabel,
  animation,
  demo,
}: ActSectionProps) {
  return (
    <section
      id={id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        scrollSnapAlign: 'start',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="act-grid"
      >
        {/* Left: 3D visualization */}
        <AnimateIn x={-30} y={0}>
          <div
            style={{
              width: '100%',
              maxHeight: '500px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
            }}
            className="card-glass act-3d-container"
          >
            {animation}
          </div>
        </AnimateIn>

        {/* Right: Content */}
        <div>
          <AnimateIn delay={0.1}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '8px',
              }}
            >
              Act {actNumber} &mdash; {label}
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                marginBottom: '4px',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--color-accent)',
                marginBottom: '24px',
                lineHeight: 1.2,
              }}
            >
              {subtitle}
            </p>
          </AnimateIn>

          {paragraphs.map((p, i) => (
            <AnimateIn key={i} delay={0.3 + i * 0.1}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '16px',
                }}
              >
                {p}
              </p>
            </AnimateIn>
          ))}

          {/* Formula */}
          <AnimateIn delay={0.5}>
            <div
              className="card-glass"
              style={{
                padding: '16px 24px',
                borderRadius: '12px',
                marginBottom: '24px',
                display: 'inline-block',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '6px',
                }}
              >
                {formulaLabel}
              </p>
              <code
                style={{
                  fontFamily: "'DM Mono', 'SF Mono', monospace",
                  fontSize: '14px',
                  color: 'var(--color-accent-bright)',
                  letterSpacing: '0.02em',
                }}
              >
                {formula}
              </code>
            </div>
          </AnimateIn>

          {/* Interactive demo */}
          <AnimateIn delay={0.6}>
            {demo}
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
