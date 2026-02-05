'use client'

interface DocumentCardProps {
  title: string
  subtitle: string
  type: string
  accentColor: string
  available?: boolean
}

export function DocumentCard({ title, subtitle, type, accentColor, available = true }: DocumentCardProps) {
  return (
    <div
      className="card-glass"
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: available ? 'pointer' : 'default',
        opacity: available ? 1 : 0.6,
        minWidth: '240px',
        flex: '1 1 240px',
        maxWidth: '320px',
      }}
    >
      {/* Cover area — dark navy with concentric ring motif */}
      <div
        style={{
          position: 'relative',
          padding: '40px 24px 32px',
          background: 'linear-gradient(145deg, #0c1220 0%, #0a0e18 100%)',
          overflow: 'hidden',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Concentric ring motif */}
        {[80, 120, 160].map((size) => (
          <div
            key={size}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              border: `1px solid ${accentColor}`,
              opacity: 0.08 + (160 - size) * 0.001,
            }}
          />
        ))}

        {/* Document type label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            {type}
          </span>
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {title}
        </h4>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            marginTop: '6px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Accent bar at bottom */}
      <div
        style={{
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />
    </div>
  )
}
