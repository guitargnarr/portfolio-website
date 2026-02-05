'use client'

import { useState, useCallback } from 'react'

const COLORS = ['#c8956c', '#4a9c8a', '#8a8580', '#e8b08a']
const COLOR_NAMES = ['Amber', 'Teal', 'Gray', 'Gold']

function calculateGini(grid: number[]): number {
  const total = grid.length
  if (total === 0) return 0
  const freq: Record<number, number> = {}
  for (const c of grid) {
    freq[c] = (freq[c] || 0) + 1
  }
  let sumSquares = 0
  for (const c in freq) {
    const p = freq[c] / total
    sumSquares += p * p
  }
  return 1 - sumSquares
}

interface GiniDemoProps {
  onPurityChange?: (value: number) => void
}

export function GiniDemo({ onPurityChange }: GiniDemoProps) {
  const [grid, setGrid] = useState<number[]>(() => {
    // Random initial grid
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 4))
  })

  const gini = calculateGini(grid)
  const purity = 1 - gini

  const cycleColor = useCallback((index: number) => {
    setGrid(prev => {
      const next = [...prev]
      next[index] = (next[index] + 1) % 4
      const newGini = calculateGini(next)
      onPurityChange?.(1 - newGini)
      return next
    })
  }, [onPurityChange])

  const makeAllSame = useCallback(() => {
    const all = Array.from({ length: 16 }, () => 0)
    setGrid(all)
    onPurityChange?.(1)
  }, [onPurityChange])

  const makeRandom = useCallback(() => {
    const rand = Array.from({ length: 16 }, () => Math.floor(Math.random() * 4))
    setGrid(rand)
    onPurityChange?.(1 - calculateGini(rand))
  }, [onPurityChange])

  const getPurityLabel = (g: number) => {
    if (g < 0.1) return 'Pure'
    if (g < 0.3) return 'Mostly Pure'
    if (g < 0.5) return 'Mixed'
    return 'Highly Impure'
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
          marginBottom: '12px',
        }}
      >
        Click circles to cycle colors
      </p>

      {/* 4x4 grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginBottom: '16px',
          maxWidth: '200px',
        }}
      >
        {grid.map((colorIdx, i) => (
          <button
            key={i}
            onClick={() => cycleColor(i)}
            aria-label={`Cell ${i + 1}: ${COLOR_NAMES[colorIdx]}. Click to change.`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: COLORS[colorIdx],
              border: '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Preset buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={makeAllSame}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          All Same
        </button>
        <button
          onClick={makeRandom}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          Randomize
        </button>
      </div>

      {/* Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Gini: <strong style={{ color: 'var(--color-text-primary)' }}>{gini.toFixed(3)}</strong>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 600,
            color: purity > 0.7 ? '#22c55e' : purity > 0.4 ? '#eab308' : '#ef4444',
          }}
        >
          {getPurityLabel(gini)}
        </span>
      </div>
    </div>
  )
}
