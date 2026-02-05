'use client'

const industries = [
  'All',
  'Healthcare',
  'Food & Drink',
  'Salons & Spas',
  'Retail',
  'Entertainment',
  'Real Estate',
]

interface IndustryFilterProps {
  active: string
  onChange: (industry: string) => void
}

export function IndustryFilter({ active, onChange }: IndustryFilterProps) {
  return (
    <div
      className="industry-filter-scroll"
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '40px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {industries.map((industry) => {
        const isActive = active === industry
        return (
          <button
            key={industry}
            onClick={() => onChange(industry)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '8px 20px',
              borderRadius: '100px',
              border: isActive ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              backgroundColor: isActive ? 'rgba(200, 149, 108, 0.12)' : 'transparent',
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {industry}
          </button>
        )
      })}
    </div>
  )
}
