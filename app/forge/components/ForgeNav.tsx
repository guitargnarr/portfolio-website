'use client'

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   5-Dot Side Navigation

   Fixed navigation showing current section
   with smooth transitions between stages.
   ───────────────────────────────────────────── */

const sections = [
  { id: 'section-1', label: 'Entropy', stage: 'Scattered' },
  { id: 'section-2', label: 'Gathering', stage: 'Coalescing' },
  { id: 'section-3', label: 'Shaping', stage: 'Forming' },
  { id: 'section-4', label: 'Refinement', stage: 'Polishing' },
  { id: 'section-5', label: 'Radiance', stage: 'Complete' },
]

interface ForgeNavProps {
  currentSection: number
}

export function ForgeNav({ currentSection }: ForgeNavProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-end',
      }}
      aria-label="Section navigation"
    >
      {sections.map((section, i) => {
        const isActive = currentSection === i
        const isPast = currentSection > i

        return (
          <div
            key={section.id}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  whiteSpace: 'nowrap',
                }}
              >
                {section.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  color: 'var(--color-text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {section.stage}
              </span>
            </motion.div>

            {/* Dot */}
            <button
              onClick={() => scrollTo(section.id)}
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: isActive ? '14px' : isPast ? '10px' : '8px',
                height: isActive ? '14px' : isPast ? '10px' : '8px',
                borderRadius: '50%',
                border: `1.5px solid ${
                  isActive
                    ? 'var(--color-accent)'
                    : isPast
                    ? 'var(--color-accent)'
                    : 'var(--color-text-muted)'
                }`,
                backgroundColor: isActive || isPast ? 'var(--color-accent)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: 0,
                display: 'block',
                boxShadow: isActive ? '0 0 12px var(--color-accent-glow)' : 'none',
              }}
            />
          </div>
        )
      })}

      {/* Progress line */}
      <div
        style={{
          position: 'absolute',
          right: '6px',
          top: '7px',
          bottom: '7px',
          width: '2px',
          backgroundColor: 'var(--color-border)',
          zIndex: -1,
        }}
      >
        <motion.div
          style={{
            width: '100%',
            backgroundColor: 'var(--color-accent)',
            position: 'absolute',
            top: 0,
            borderRadius: '1px',
          }}
          initial={{ height: '0%' }}
          animate={{ height: `${(currentSection / (sections.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </nav>
  )
}
