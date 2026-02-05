'use client'

import { useState } from 'react'
import { AnimateIn } from '@/app/components/AnimateIn'
import { Send, Check, AlertCircle, Github, Linkedin, Mail, Twitter, Instagram, Dribbble } from 'lucide-react'
import { useToast } from './ToastProvider'
import { forgeConfig, ForgeSocialLink } from '../config/forge.config'

/* ─────────────────────────────────────────────
   Section 5: RADIANCE (80-100%)
   Crystal State: Full glow, perfect form

   Demonstrates combined patterns:
   - Contact form with validation
   - Glass-morphism cards
   - Staggered animations
   - Social links

   Content driven by forge.config.ts
   ───────────────────────────────────────────── */

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  instagram: Instagram,
  dribbble: Dribbble,
}

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Section5Radiance() {
  const { addToast } = useToast()
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { contact, socialLinks, brand, sections } = forgeConfig
  const section = sections[4]

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateField = (field: keyof FormData, value: string): string => {
    if (field === 'name' && !value.trim()) return 'Name is required'
    if (field === 'email' && !value.trim()) return 'Email is required'
    if (field === 'email' && value && !validateEmail(value)) return 'Please enter a valid email'
    if (field === 'message' && !value.trim()) return 'Message is required'
    if (field === 'message' && value.length < 10) return 'Message must be at least 10 characters'
    return ''
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
    }
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FormErrors = {}
    ;(Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    setErrors(newErrors)
    setTouched({ name: true, email: true, message: true })

    if (Object.keys(newErrors).length > 0) {
      addToast('error', 'Please fix the form errors')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    addToast('success', contact.successTitle)
  }

  return (
    <section
      id={section.id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '700px', width: '100%' }}>
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
              {section.number} &mdash; {section.label}
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            {contact.heading} <em style={{ color: 'var(--color-accent)' }}>{contact.headingAccent}</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              color: 'var(--color-text-secondary)',
              marginBottom: '48px',
              textAlign: 'center',
              maxWidth: '480px',
              margin: '0 auto 48px',
            }}
          >
            {contact.subtitle}
          </p>
        </AnimateIn>

        {/* Contact Form - Combined patterns */}
        <AnimateIn delay={0.2}>
          <div
            className="card-glass"
            style={{
              padding: '40px',
              borderRadius: '24px',
              marginBottom: '40px',
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <Check size={32} color="var(--color-void)" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px',
                  }}
                >
                  {contact.successTitle}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {contact.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${touched.name && errors.name ? '#ef4444' : 'var(--color-border)'}`,
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                  {touched.name && errors.name && (
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: '#ef4444',
                      }}
                    >
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${touched.email && errors.email ? '#ef4444' : 'var(--color-border)'}`,
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                  {touched.email && errors.email && (
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: '#ef4444',
                      }}
                    >
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: '32px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell us about your project..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${touched.message && errors.message ? '#ef4444' : 'var(--color-border)'}`,
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px',
                      transition: 'all 0.2s ease',
                    }}
                  />
                  {touched.message && errors.message && (
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: '#ef4444',
                      }}
                    >
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '16px',
                    fontSize: '15px',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? (
                    contact.submittingLabel
                  ) : (
                    <>
                      {contact.submitLabel} <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </AnimateIn>

        {/* Social Links */}
        <AnimateIn delay={0.3}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)'
                    e.currentTarget.style.color = 'var(--color-accent)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </AnimateIn>

        {/* Closing */}
        <AnimateIn delay={0.4}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              marginTop: '48px',
            }}
          >
            {brand.footerText}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
