'use client'

import { useState, useCallback } from 'react'

interface BayesDemoProps {
  onValuesChange?: (prior: number, likelihood: number) => void
}

export function BayesDemo({ onValuesChange }: BayesDemoProps) {
  const [prior, setPrior] = useState(0.45) // P(spam)
  const [likelihood, setLikelihood] = useState(0.90) // P("nigerian prince" | spam)
  const [falsePositive, setFalsePositive] = useState(0.01) // P("nigerian prince" | not spam)

  // Bayes: P(spam | "nigerian prince") = P("nigerian prince"|spam) * P(spam) / P("nigerian prince")
  const pEvidence = likelihood * prior + falsePositive * (1 - prior)
  const posterior = pEvidence > 0 ? (likelihood * prior) / pEvidence : 0

  const handlePriorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setPrior(val)
    onValuesChange?.(val, likelihood)
  }, [likelihood, onValuesChange])

  const handleLikelihoodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setLikelihood(val)
    onValuesChange?.(prior, val)
  }, [prior, onValuesChange])

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '4px',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    background: 'var(--color-border)',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    accentColor: 'var(--color-accent)',
  }

  return (
    <div className="card-glass" style={{ padding: '20px', borderRadius: '16px' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '16px',
        }}
      >
        Spam filter scenario
      </p>

      {/* Prior slider */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            P(spam) &mdash; prior
          </label>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--color-accent)' }}>
            {(prior * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          value={prior}
          onChange={handlePriorChange}
          style={sliderStyle}
        />
      </div>

      {/* Likelihood slider */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            P(&quot;nigerian prince&quot; | spam)
          </label>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--color-accent)' }}>
            {(likelihood * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          value={likelihood}
          onChange={handleLikelihoodChange}
          style={sliderStyle}
        />
      </div>

      {/* False positive slider */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            P(&quot;nigerian prince&quot; | not spam)
          </label>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--color-accent)' }}>
            {(falsePositive * 100).toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min="0.001"
          max="0.5"
          step="0.001"
          value={falsePositive}
          onChange={(e) => setFalsePositive(parseFloat(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Result */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(200, 149, 108, 0.1)',
          border: '1px solid rgba(200, 149, 108, 0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            P(spam | evidence)
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '20px',
              fontWeight: 700,
              color: posterior > 0.8 ? '#ef4444' : posterior > 0.5 ? '#eab308' : '#22c55e',
            }}
          >
            {(posterior * 100).toFixed(1)}%
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          {posterior > 0.9 ? 'Almost certainly spam.' : posterior > 0.7 ? 'Likely spam.' : posterior > 0.5 ? 'Possibly spam.' : 'Probably not spam.'}
        </p>
      </div>
    </div>
  )
}
