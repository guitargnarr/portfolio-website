'use client'

import { motion } from 'framer-motion'

const acts = [
  { id: 'intro', label: 'Introduction' },
  { id: 'act-1', label: 'Shannon Entropy' },
  { id: 'act-2', label: 'Gini Impurity' },
  { id: 'act-3', label: "Bayes' Theorem" },
  { id: 'act-4', label: 'RSA Encryption' },
]

interface ActNavProps {
  currentAct: number
}

export function ActNav({ currentAct }: ActNavProps) {
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
        alignItems: 'center',
      }}
      aria-label="Act navigation"
    >
      {acts.map((act, i) => {
        const isActive = currentAct === i
        return (
          <div key={act.id} style={{ position: 'relative' }}>
            <button
              onClick={() => scrollTo(act.id)}
              aria-label={act.label}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: isActive ? '14px' : '8px',
                height: isActive ? '14px' : '8px',
                borderRadius: '50%',
                border: `1.5px solid ${isActive ? 'var(--color-accent)' : 'var(--color-text-muted)'}`,
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
                display: 'block',
              }}
            />
            {/* Tooltip on hover */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              style={{
                position: 'absolute',
                right: '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {act.label}
            </motion.span>
          </div>
        )
      })}
    </nav>
  )
}
