'use client'

interface ProjectCardProps {
  title: string
  description: string
  index: number
  tags?: string[]
  year?: string
}

export function ProjectCard({ title, description, index, tags = [], year = '2024' }: ProjectCardProps) {
  const padIndex = String(index).padStart(2, '0')

  return (
    <div className="card-glass" style={{ borderRadius: '16px', padding: '32px', cursor: 'pointer' }}>
      {/* Top row: index + year */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <span
          className="card-index"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            transition: 'color 0.4s ease',
          }}
        >
          {padIndex}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--color-text-muted)',
          }}
        >
          {year}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          marginBottom: '24px',
        }}
      >
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
                color: 'var(--color-text-muted)',
                padding: '4px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: '100px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Arrow indicator */}
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ color: 'var(--color-text-muted)', transition: 'color 0.3s ease, transform 0.3s ease' }}
        >
          <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
