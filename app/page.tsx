'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { AnimateIn, AnimatedAccentLine } from '@/app/components/AnimateIn'
import { FloatingParticles } from '@/app/components/FloatingParticles'
import { ProjectCard } from '@/app/components/ProjectCard'
import { SocialProofBar } from '@/app/components/SocialProofBar'
import { ContactForm } from '@/app/components/ContactForm'
import { DocumentCard } from '@/app/components/DocumentCard'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

const ThreeDModel = dynamic(
  () => import('@/app/components/ThreeDModel').then((m) => ({ default: m.ThreeDModel })),
  { ssr: false }
)

const projects = [
  {
    title: 'DataSource Monitor',
    description: 'Automated HVAC monitoring prototype with companion engineering document. Python backend, real-time dashboards, alert pipelines.',
    tags: ['Python', 'Automation', 'HVAC'],
    year: '2026',
    url: 'https://datasource-monitor.vercel.app',
  },
  {
    title: 'Jobway',
    description: 'Job search automation with Gmail OAuth scanning, NLP-powered ATS optimization, and 30 REST endpoints. Replaced manual inbox checking entirely.',
    tags: ['FastAPI', 'Gmail OAuth', 'NLP'],
    year: '2025',
    url: 'https://jobtrack.projectlavos.com',
  },
  {
    title: 'PhishGuard',
    description: 'Phishing detection platform with sentiment analysis, threat scoring, and real-time email classification. Zero-trust verification layer.',
    tags: ['Security', 'Sentiment', 'React'],
    year: '2025',
    url: 'https://phishguard.projectlavos.com',
  },
  {
    title: 'Guitar Model Lab',
    description: 'Deterministic music theory engine. Generates GP5 tablature from scale and pattern parameters. AI interprets style, Python does the math.',
    tags: ['Music Theory', 'Python', 'GP5'],
    year: '2025',
    url: 'https://guitar-model-lab.onrender.com',
  },
  {
    title: 'Interactive Resume',
    description: 'Three.js-powered resume with spatial navigation. Not a PDF. An experience that demonstrates what it describes.',
    tags: ['Three.js', 'Next.js'],
    year: '2025',
    url: 'https://resume.projectlavos.com',
  },
  {
    title: '51 Louisville Sites',
    description: 'Spec work portfolio: 51 deployed client demo sites across healthcare, food, retail, and professional services. Every one live.',
    tags: ['React', 'Tailwind', 'Spec Work'],
    year: '2026',
    url: 'https://projectlavos.com',
  },
]

const principles = [
  {
    title: 'Truth over theater',
    body: 'No aspirational claims. Only what can be shown and proven. Every item on this page is live. Click any of them to verify.',
  },
  {
    title: 'Guardrails over vibes',
    body: 'AI where it is strong. Deterministic logic where it fails. The right tool for the right problem.',
  },
  {
    title: 'Zero-trust by default',
    body: 'Verification matters more than confidence. Build the proof into the system, not the pitch deck.',
  },
  {
    title: 'Human impact first',
    body: 'Quality is not abstract. Healthcare regulations affect real patients. HVAC failures affect real buildings. Ship accordingly.',
  },
]

const documents = [
  {
    title: 'DataSource Monitor',
    subtitle: 'Prototype Companion',
    type: 'Engineering',
    accentColor: '#c8956c',
    available: true,
  },
  {
    title: 'Portfolio Assessment',
    subtitle: 'Strategic Analysis',
    type: 'Analysis',
    accentColor: '#14b8a6',
    available: false,
  },
  {
    title: 'Engagement Scope',
    subtitle: 'Client Proposal',
    type: 'Proposal',
    accentColor: '#2a4a7f',
    available: false,
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <FloatingParticles count={20} />

      {/* ── Hero ── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <AnimateIn>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '24px',
            }}
          >
            Louisville, KY
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            M. Scott
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'var(--color-accent)',
              marginBottom: '32px',
            }}
          >
            Complexity, untangled.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.45}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '520px',
              marginBottom: '48px',
            }}
          >
            Nine years translating healthcare regulations into working systems.
            Now I apply that rigor to yours.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.6}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#work" className="cta-button" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See the Work
            </a>
            <a href="#contact" className="cta-button-outline" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Reach Out
            </a>
          </div>
        </AnimateIn>

        {/* Scroll hint */}
        <AnimateIn delay={0.8}>
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Scroll to explore
            </p>
            <div
              className="animate-pulse-subtle"
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
              }}
            />
          </div>
        </AnimateIn>
      </section>

      <AnimatedAccentLine />

      {/* ── Mobius Strip Showcase ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          position: 'relative',
        }}
      >
        <AnimateIn>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Infinite Surface
          </p>
        </AnimateIn>

        <Suspense fallback={null}>
          <ThreeDModel />
        </Suspense>

        <AnimateIn delay={0.3}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '440px',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            A one-sided ribbon with a half-twist.
            Glass refracts along the continuous loop.
          </p>
        </AnimateIn>
      </section>

      <AnimatedAccentLine />

      {/* ── Work ── */}
      <section
        id="work"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '100px 24px',
          width: '100%',
        }}
      >
        <AnimateIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Selected Work
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>
        </AnimateIn>

        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 0.1}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  index={i + 1}
                  tags={project.tags}
                  year={project.year}
                />
              </a>
            </AnimateIn>
          ))}
        </div>
      </section>

      <AnimatedAccentLine />

      {/* ── Method ── */}
      <section
        id="method"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '100px 24px',
          width: '100%',
        }}
      >
        <AnimateIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Method
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              marginBottom: '48px',
            }}
          >
            I work at the seams where disciplines don&apos;t connect &mdash; translating between
            technical and business realms, extracting methods so they become repeatable.
          </p>
        </AnimateIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
          className="method-grid"
        >
          {principles.map((p, i) => (
            <AnimateIn key={p.title} delay={0.15 + i * 0.1}>
              <div
                className="card-glass"
                style={{
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {p.body}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <AnimatedAccentLine />

      {/* ── Documents ── */}
      <section
        id="documents"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '100px 24px',
          width: '100%',
        }}
      >
        <AnimateIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Documents
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              marginBottom: '48px',
            }}
          >
            Companion documents I prepare for clients. Each one accompanies working software.
          </p>
        </AnimateIn>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {documents.map((doc, i) => (
            <AnimateIn key={doc.title} delay={0.15 + i * 0.1}>
              <DocumentCard {...doc} />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── Social Proof ── */}
      <SocialProofBar />

      <AnimatedAccentLine />

      {/* ── Contact ── */}
      <ContactForm />

      <Footer />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  )
}
