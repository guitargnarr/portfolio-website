'use client'

import { useState, useCallback } from 'react'

function calculateEntropy(text: string): number {
  if (!text.length) return 0
  const freq: Record<string, number> = {}
  for (const ch of text) {
    freq[ch] = (freq[ch] || 0) + 1
  }
  let entropy = 0
  const len = text.length
  for (const ch in freq) {
    const p = freq[ch] / len
    if (p > 0) entropy -= p * Math.log2(p)
  }
  return entropy
}

function getStrengthLabel(entropy: number): { label: string; color: string } {
  if (entropy < 1) return { label: 'Very Weak', color: '#ef4444' }
  if (entropy < 2) return { label: 'Weak', color: '#f97316' }
  if (entropy < 3) return { label: 'Moderate', color: '#eab308' }
  if (entropy < 4) return { label: 'Strong', color: '#22c55e' }
  return { label: 'Very Strong', color: '#14b8a6' }
}

interface EntropyDemoProps {
  onEntropyChange?: (value: number) => void
}

export function EntropyDemo({ onEntropyChange }: EntropyDemoProps) {
  const [text, setText] = useState('')

  const entropy = calculateEntropy(text)
  const maxEntropy = Math.log2(95) // ~6.57 for printable ASCII
  const normalized = Math.min(entropy / maxEntropy, 1)
  const { label, color } = getStrengthLabel(entropy)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setText(val)
    onEntropyChange?.(Math.min(calculateEntropy(val) / maxEntropy, 1))
  }, [onEntropyChange, maxEntropy])

  return (
    <div
      className="card-glass"
      style={{ padding: '20px', borderRadius: '16px' }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '12px',
        }}
      >
        Try it: type anything
      </p>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type a password, sentence, or random text..."
        rows={2}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '12px',
          fontFamily: "'DM Mono', 'SF Mono', monospace",
          fontSize: '14px',
          color: 'var(--color-text-primary)',
          resize: 'none',
          outline: 'none',
        }}
      />

      {/* Entropy bar */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Entropy: <strong style={{ color: 'var(--color-text-primary)' }}>{entropy.toFixed(2)}</strong> bits/char
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color }}>
            {text.length > 0 ? label : '---'}
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'var(--color-border)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${normalized * 100}%`,
              height: '100%',
              background: color,
              borderRadius: '3px',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}
