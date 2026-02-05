'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimateIn } from './AnimateIn'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Website inquiry from ${formData.name} - ${formData.business}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nBusiness: ${formData.business}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:matthewdscott7@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  }

  if (submitted) {
    return (
      <section
        id="contact"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 400,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}>
            Message sent
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
          }}>
            I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '100px 24px 120px',
        width: '100%',
      }}
    >
      <AnimateIn>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            Contact
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
        }}>
          If you recognize the work, <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>reach out</span>
        </h2>
      </AnimateIn>

      <AnimateIn delay={0.15}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          marginBottom: '40px',
        }}>
          If you need convincing, I&apos;m not for you.
        </p>
      </AnimateIn>

      <motion.form
        onSubmit={handleSubmit}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <input
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ ...inputStyle, flex: '1 1 200px' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
          />
          <input
            type="text"
            placeholder="Business name"
            value={formData.business}
            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            style={{ ...inputStyle, flex: '1 1 200px' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}>
          <input
            type="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}>
          <textarea
            placeholder="Tell me about your business and what you need..."
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}>
          <button
            type="submit"
            className="cta-button"
            style={{ marginTop: '8px' }}
          >
            Send Me a Message
          </button>
        </motion.div>
      </motion.form>

      <AnimateIn delay={0.4}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          marginTop: '24px',
        }}>
          Or email me directly:{' '}
          <a
            href="mailto:matthewdscott7@gmail.com"
            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
          >
            matthewdscott7@gmail.com
          </a>
        </p>
      </AnimateIn>
    </section>
  )
}
