'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface ClientSite {
  name: string
  slug: string
  industry: string
  features: string[]
  url: string
  ogImage?: string
}

export const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export function ClientSiteCard({ site }: { site: ClientSite }) {
  const siteUrl = site.url || `https://${site.slug}.vercel.app`
  const imageUrl = site.ogImage || `https://${site.slug}.vercel.app/og-image.png`

  /* 3D tilt tracking */
  const cardRef = useRef<HTMLAnchorElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), { stiffness: 200, damping: 20 })
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 800 }}
    >
      <motion.a
        ref={cardRef}
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="card-glass client-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'block',
          textDecoration: 'none',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
      >
        {/* Screenshot/OG Image */}
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'var(--color-surface)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={imageUrl}
            alt={`${site.name} website preview`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          {/* Glare overlay */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 60%)`,
              pointerEvents: 'none',
              opacity: 0,
            }}
          />
          {/* Industry tag */}
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              padding: '4px 10px',
              borderRadius: '100px',
              backgroundColor: 'rgba(5, 5, 5, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200, 149, 108, 0.2)',
            }}
          >
            {site.industry}
          </span>
        </div>

        {/* Card content */}
        <div style={{ padding: '20px 24px 24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            {site.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            {site.features.join(' / ')}
          </p>

          {/* Visit link with animated arrow */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: 'var(--color-accent)',
            }}
          >
            Visit Live Site
            <motion.svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 2, y: -2 }}
            >
              <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  )
}
