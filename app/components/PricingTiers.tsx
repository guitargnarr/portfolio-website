'use client'

import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'

const tiers = [
  {
    name: 'Essential',
    price: '$X',
    description: 'Single page, contact form, works on phones',
    features: ['Single-page design', 'Contact form', 'Mobile-friendly', 'Fast loading'],
    example: { name: 'Cleaning by Regina', url: 'https://cleaning-by-regina.vercel.app' },
  },
  {
    name: 'Professional',
    price: '$X',
    description: 'Multiple pages, online booking, photo gallery',
    features: ['Multi-page site', 'Online booking', 'Photo gallery', 'Google Maps'],
    example: { name: 'Fritz Salon', url: 'https://fritz-salon.vercel.app' },
    popular: true,
  },
  {
    name: 'Advanced',
    price: '$X',
    description: 'Online store, shopping cart, search and filtering',
    features: ['E-commerce ready', 'Shopping cart', 'Product search', 'Payment integration'],
    example: { name: 'Genesis Diamonds', url: 'https://genesis-diamonds.vercel.app' },
  },
  {
    name: 'Custom',
    price: 'Let\'s talk',
    description: 'Login system, dashboard, whatever you need',
    features: ['User accounts', 'Admin dashboard', 'Custom features', 'API integration'],
    example: { name: 'Hideaway Saloon', url: 'https://hideaway-saloon.vercel.app' },
  },
]

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  return (
    <motion.div
      className="card-glass"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.25 },
      }}
      style={{
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
        borderColor: tier.popular ? 'var(--color-accent)' : undefined,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Animated glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          boxShadow: '0 0 40px rgba(200, 149, 108, 0.1), inset 0 0 40px rgba(200, 149, 108, 0.03)',
          pointerEvents: 'none',
        }}
      />

      {tier.popular && (
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-void)',
            backgroundColor: 'var(--color-accent)',
            padding: '4px 14px',
            borderRadius: '0 0 8px 8px',
          }}>
          Most Popular
        </motion.span>
      )}

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '24px',
        fontWeight: 400,
        color: 'var(--color-text-primary)',
        marginBottom: '8px',
        marginTop: tier.popular ? '8px' : '0',
      }}>
        {tier.name}
      </h3>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          color: 'var(--color-accent)',
          marginBottom: '8px',
        }}
      >
        {tier.price}
      </motion.div>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--color-text-secondary)',
        marginBottom: '24px',
      }}>
        {tier.description}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
        {tier.features.map((feature, fi) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 + fi * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              padding: '6px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <motion.span
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: fi * 0.5, ease: 'easeInOut' }}
              style={{ color: 'var(--color-accent)', fontSize: '14px', display: 'inline-block' }}
            >
              +
            </motion.span>
            {feature}
          </motion.li>
        ))}
      </ul>

      <a
        href={tier.example.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          letterSpacing: '0.05em',
          color: 'var(--color-accent)',
          textDecoration: 'none',
          transition: 'gap 0.3s ease',
          marginTop: 'auto',
        }}
      >
        See example: {tier.example.name}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5M9.5 2.5V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}

export function PricingTiers() {
  return (
    <section
      id="pricing"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 24px 80px',
        width: '100%',
      }}
    >
      {/* Section label */}
      <AnimateIn>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            Pricing
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: '60px',
        }}>
          Simple, honest <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>pricing</span>
        </h2>
      </AnimateIn>

      <motion.div
        className="pricing-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} index={i} />
        ))}
      </motion.div>

      <AnimateIn delay={0.3}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
          marginTop: '40px',
        }}>
          Not sure which is right? That&apos;s what the free consultation is for.
        </p>
      </AnimateIn>
    </section>
  )
}
