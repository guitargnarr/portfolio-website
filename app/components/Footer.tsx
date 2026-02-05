'use client'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/guitargnarr' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/matthewdscott7/' },
]

export function Footer() {
  return (
    <footer
      style={{
        padding: '40px 24px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: 'var(--color-text-primary)',
            }}
          >
            M. Scott
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: 'var(--color-text-muted)',
            }}
          >
            Louisville, KY &mdash; Systems, Software, Proof
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)' }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              opacity: 0.6,
            }}
          >
            Every site on this page is live. Click any of them to verify.
          </span>
        </div>
      </div>
    </footer>
  )
}
