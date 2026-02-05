'use client'

import { AnimateIn } from '@/app/components/AnimateIn'

/* ─────────────────────────────────────────────
   Section 1: ENTROPY (0-20%)
   Crystal State: Scattered particles

   Demonstrates Tier 1 patterns:
   - Hero headline with staggered entrance
   - Smooth scroll navigation
   - Parallax text effect
   ───────────────────────────────────────────── */

interface Section1Props {
  onNavigate: (sectionId: string) => void
}

const navItems = [
  { id: 'section-2', label: 'Gathering' },
  { id: 'section-3', label: 'Shaping' },
  { id: 'section-4', label: 'Refinement' },
  { id: 'section-5', label: 'Radiance' },
]

export function Section1Entropy({ onNavigate }: Section1Props) {
  return (
    <section
      id="section-1"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Eyebrow */}
      <AnimateIn>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '24px',
          }}
        >
          Elite Frontend Masterclass
        </p>
      </AnimateIn>

      {/* Main headline - staggered */}
      <AnimateIn delay={0.15}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          The Forge
        </h1>
      </AnimateIn>

      {/* Subtitle with italic accent */}
      <AnimateIn delay={0.3}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 4vw, 36px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
          }}
        >
          From chaos to{' '}
          <em style={{ color: 'var(--color-accent)' }}>clarity</em>
        </p>
      </AnimateIn>

      {/* Description */}
      <AnimateIn delay={0.45}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            maxWidth: '480px',
            marginBottom: '48px',
          }}
        >
          Watch a crystal form as you scroll. Five stages.
          Five tier patterns. One continuous transformation.
        </p>
      </AnimateIn>

      {/* Smooth scroll navigation - Tier 1 pattern */}
      <AnimateIn delay={0.6}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="card-glass"
              style={{
                padding: '10px 20px',
                borderRadius: '100px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.02em',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>
                0{i + 2}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </AnimateIn>

      {/* Scroll hint with parallax effect */}
      <AnimateIn delay={0.8}>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            Scroll to forge
          </p>
          <div
            className="animate-pulse-subtle"
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
            }}
          />
        </div>
      </AnimateIn>
    </section>
  )
}
