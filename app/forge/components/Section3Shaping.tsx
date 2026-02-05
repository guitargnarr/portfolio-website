'use client'

import { useState, useMemo } from 'react'
import { AnimateIn } from '@/app/components/AnimateIn'
import { Search, X } from 'lucide-react'

/* ─────────────────────────────────────────────
   Section 3: SHAPING (40-60%)
   Crystal State: Defined geometry emerges

   Demonstrates Tier 3 patterns:
   - Search with real-time filtering
   - Category filter pills
   - Product/item grid
   ───────────────────────────────────────────── */

const materials = [
  { id: 1, name: 'React', category: 'Framework', icon: '⚛️', description: 'Component-based UI library' },
  { id: 2, name: 'TypeScript', category: 'Language', icon: '📘', description: 'Typed JavaScript at scale' },
  { id: 3, name: 'Tailwind', category: 'Styling', icon: '🎨', description: 'Utility-first CSS framework' },
  { id: 4, name: 'Framer Motion', category: 'Animation', icon: '✨', description: 'Production-ready animations' },
  { id: 5, name: 'Three.js', category: 'Animation', icon: '🔮', description: '3D graphics for the web' },
  { id: 6, name: 'Next.js', category: 'Framework', icon: '▲', description: 'React framework for production' },
  { id: 7, name: 'PostgreSQL', category: 'Database', icon: '🗄️', description: 'Relational database system' },
  { id: 8, name: 'Redis', category: 'Database', icon: '⚡', description: 'In-memory data structure store' },
  { id: 9, name: 'Vercel', category: 'Platform', icon: '🚀', description: 'Deploy at the edge' },
]

const categories = ['All', 'Framework', 'Language', 'Styling', 'Animation', 'Database', 'Platform']

export function Section3Shaping() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchesCategory = activeCategory === 'All' || m.category === activeCategory
      const matchesSearch =
        searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, activeCategory])

  return (
    <section
      id="section-3"
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
              03 &mdash; Shaping
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
            Select your <em style={{ color: 'var(--color-accent)' }}>materials</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              marginBottom: '32px',
              maxWidth: '500px',
            }}
          >
            The crystal takes form. Search and filter the tools that define your stack.
          </p>
        </AnimateIn>

        {/* Search Input - Tier 3 pattern */}
        <AnimateIn delay={0.2}>
          <div
            style={{
              position: 'relative',
              marginBottom: '20px',
            }}
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 48px 14px 48px',
                borderRadius: '100px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)'
                e.target.style.boxShadow = '0 0 0 3px var(--color-accent-glow)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)'
                e.target.style.boxShadow = 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </AnimateIn>

        {/* Category Filter Pills - Tier 3 pattern */}
        <AnimateIn delay={0.25}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                    backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                    color: isActive ? 'var(--color-void)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </AnimateIn>

        {/* Results count */}
        <AnimateIn delay={0.3}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              marginBottom: '20px',
            }}
          >
            {filteredMaterials.length} material{filteredMaterials.length !== 1 ? 's' : ''} found
          </p>
        </AnimateIn>

        {/* Materials Grid - Tier 3 pattern */}
        <AnimateIn delay={0.35}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredMaterials.map((material, i) => (
              <div
                key={material.id}
                className="card-glass"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  animation: `fadeSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s both`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{material.icon}</span>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: 'var(--color-text-primary)',
                        marginBottom: '2px',
                      }}
                    >
                      {material.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {material.category}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {material.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Empty state */}
        {filteredMaterials.length === 0 && (
          <AnimateIn>
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--color-text-muted)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}>
                No materials found
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                Try adjusting your search or filters
              </p>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  )
}
