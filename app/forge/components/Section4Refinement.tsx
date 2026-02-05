'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimateIn } from '@/app/components/AnimateIn'
import { TrendingUp, Users, Zap, Target } from 'lucide-react'
import { useToast } from './ToastProvider'

/* ─────────────────────────────────────────────
   Section 4: REFINEMENT (60-80%)
   Crystal State: Polished facets, transmission

   Demonstrates Tier 4 patterns:
   - Progress rings
   - Mini sparkline charts
   - Toast notifications
   - Dashboard stat cards
   ───────────────────────────────────────────── */

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  label: string
}

function ProgressRing({ progress, size = 80, strokeWidth = 6, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(progress), 100)
    return () => clearTimeout(timer)
  }, [progress])

  const animatedOffset = circumference - (animated / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {animated}%
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

interface SparklineProps {
  data: number[]
  color?: string
}

function Sparkline({ data, color = 'var(--color-accent)' }: SparklineProps) {
  const width = 100
  const height = 32
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        style={{
          strokeDasharray: '1000',
          strokeDashoffset: '1000',
          animation: 'drawLine 1.5s ease-out forwards',
        }}
      />
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  )
}

const stats = [
  {
    label: 'Conversion',
    value: '94%',
    progress: 94,
    icon: Target,
    sparkline: [30, 45, 55, 50, 70, 85, 94],
    trend: '+12%',
  },
  {
    label: 'Performance',
    value: '98',
    progress: 98,
    icon: Zap,
    sparkline: [80, 85, 82, 90, 95, 97, 98],
    trend: '+5%',
  },
  {
    label: 'Engagement',
    value: '4.8k',
    progress: 85,
    icon: Users,
    sparkline: [1200, 1800, 2200, 3000, 3500, 4200, 4800],
    trend: '+24%',
  },
  {
    label: 'Growth',
    value: '127%',
    progress: 100,
    icon: TrendingUp,
    sparkline: [20, 35, 55, 70, 90, 110, 127],
    trend: '+127%',
  },
]

export function Section4Refinement() {
  const { addToast } = useToast()

  const handleShowToast = (type: 'success' | 'error' | 'info') => {
    const messages = {
      success: 'Crystal refinement complete!',
      error: 'Unable to polish this facet.',
      info: 'Processing refinement...',
    }
    addToast(type, messages[type])
  }

  return (
    <section
      id="section-4"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        {/* Header */}
        <AnimateIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              04 &mdash; Refinement
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Polish the <em style={{ color: 'var(--color-accent)' }}>facets</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              marginBottom: '40px',
              maxWidth: '500px',
            }}
          >
            Every edge sharpens. Track metrics, visualize progress, receive feedback.
          </p>
        </AnimateIn>

        {/* Dashboard Stats Grid - Tier 4 pattern */}
        <AnimateIn delay={0.2}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="card-glass"
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    animation: `fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.1}s both`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-accent-glow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color="var(--color-accent)" />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--color-accent)',
                        backgroundColor: 'var(--color-accent-glow)',
                        padding: '4px 8px',
                        borderRadius: '100px',
                      }}
                    >
                      {stat.trend}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '4px',
                    }}
                  >
                    {stat.label}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      fontWeight: 400,
                      color: 'var(--color-text-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    {stat.value}
                  </p>

                  {/* Mini Sparkline - Tier 4 pattern */}
                  <Sparkline data={stat.sparkline} />
                </div>
              )
            })}
          </div>
        </AnimateIn>

        {/* Progress Rings Row */}
        <AnimateIn delay={0.4}>
          <div
            className="card-glass"
            style={{
              padding: '32px',
              borderRadius: '20px',
              marginBottom: '32px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: '24px',
              }}
            >
              Completion Status
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <ProgressRing progress={94} label="Design" />
              <ProgressRing progress={88} label="Code" />
              <ProgressRing progress={76} label="Test" />
              <ProgressRing progress={100} label="Deploy" />
            </div>
          </div>
        </AnimateIn>

        {/* Toast Demo Buttons - Tier 4 pattern */}
        <AnimateIn delay={0.5}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => handleShowToast('success')}
              className="cta-button"
              style={{ background: 'var(--color-accent)' }}
            >
              Show Success Toast
            </button>
            <button
              onClick={() => handleShowToast('error')}
              className="cta-button-outline"
              style={{ borderColor: '#ef4444', color: '#ef4444' }}
            >
              Show Error Toast
            </button>
            <button
              onClick={() => handleShowToast('info')}
              className="cta-button-outline"
            >
              Show Info Toast
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
