'use client'

import { useState } from 'react'
import { AnimateIn } from '@/app/components/AnimateIn'
import { Check } from 'lucide-react'
import { forgeConfig } from '../config/forge.config'

/* ─────────────────────────────────────────────
   Section 2: GATHERING (20-40%)
   Crystal State: Particles coalescing

   Demonstrates Tier 2 patterns:
   - Multi-step progress indicator
   - Selection cards
   - Form preview

   Content driven by forge.config.ts
   ───────────────────────────────────────────── */

export function Section2Gathering() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const { services, sections } = forgeConfig
  const section = sections[1]

  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Confirm' },
  ]

  return (
    <section
      id={section.id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
        }}
      >
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
              {section.number} &mdash; {section.label}
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
            {section.title} <em style={{ color: 'var(--color-accent)' }}>{section.titleAccent}</em>
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
            {section.subtitle}
          </p>
        </AnimateIn>

        {/* Progress Indicator - Tier 2 pattern */}
        <AnimateIn delay={0.2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              marginBottom: '48px',
              position: 'relative',
            }}
          >
            {/* Connection line */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '25%',
                right: '25%',
                height: '2px',
                backgroundColor: 'var(--color-border)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '25%',
                width: `${(step - 1) * 50}%`,
                height: '2px',
                backgroundColor: 'var(--color-accent)',
                zIndex: 1,
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '16px',
                    backgroundColor:
                      step > s.num
                        ? 'var(--color-accent)'
                        : step === s.num
                        ? 'var(--color-accent)'
                        : 'var(--color-surface)',
                    color:
                      step >= s.num
                        ? 'var(--color-void)'
                        : 'var(--color-text-muted)',
                    border:
                      step === s.num
                        ? '3px solid var(--color-accent-bright)'
                        : '1px solid var(--color-border)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => setStep(s.num)}
                >
                  {step > s.num ? <Check size={20} /> : s.num}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500,
                    marginTop: '12px',
                    color:
                      step >= s.num
                        ? 'var(--color-accent)'
                        : 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Service Selection Cards - Tier 2 pattern */}
        <AnimateIn delay={0.3}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {services.map((service) => {
              const isSelected = selectedService === service.id
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id)
                    setTimeout(() => setStep(2), 300)
                  }}
                  className="card-glass"
                  style={{
                    padding: '28px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    borderColor: isSelected
                      ? 'var(--color-accent)'
                      : 'var(--color-border)',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(200, 149, 108, 0.08) 0%, rgba(200, 149, 108, 0.02) 100%)'
                      : undefined,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: isSelected
                          ? 'var(--color-accent)'
                          : 'var(--color-text-primary)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {service.title}
                    </h3>
                    {isSelected && (
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={14} color="var(--color-void)" />
                      </div>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--color-text-secondary)',
                      marginBottom: '16px',
                    }}
                  >
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          letterSpacing: '0.05em',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          backgroundColor: 'var(--color-surface)',
                          color: 'var(--color-text-muted)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
