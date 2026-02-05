'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { AnimateIn, AnimatedAccentLine } from '@/app/components/AnimateIn'
import { FloatingParticles } from '@/app/components/FloatingParticles'
import { ActNav } from '@/app/components/quest/ActNav'
import { ActSection } from '@/app/components/quest/ActSection'
import { EntropyDemo } from '@/app/components/quest/EntropyDemo'
import { GiniDemo } from '@/app/components/quest/GiniDemo'
import { BayesDemo } from '@/app/components/quest/BayesDemo'
import { RSADemo } from '@/app/components/quest/RSADemo'

const EntropyScene = dynamic(() => import('@/app/components/Animation').then(m => ({ default: m.EntropyScene })), { ssr: false })
const GiniScene = dynamic(() => import('@/app/components/Animation').then(m => ({ default: m.GiniScene })), { ssr: false })
const BayesScene = dynamic(() => import('@/app/components/Animation').then(m => ({ default: m.BayesScene })), { ssr: false })
const RSAScene = dynamic(() => import('@/app/components/Animation').then(m => ({ default: m.RSAScene })), { ssr: false })

export default function QuestPage() {
  const [currentAct, setCurrentAct] = useState(0)
  const [entropy, setEntropy] = useState(0.2)
  const [purity, setPurity] = useState(0.5)
  const [prior, setPrior] = useState(0.45)
  const [likelihood, setLikelihood] = useState(0.9)
  const [encrypting, setEncrypting] = useState(false)

  // IntersectionObserver to track which section is visible
  useEffect(() => {
    const sections = ['intro', 'act-1', 'act-2', 'act-3', 'act-4']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target.id)
            if (idx !== -1) setCurrentAct(idx)
          }
        }
      },
      { threshold: 0.4 }
    )

    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const sections = ['intro', 'act-1', 'act-2', 'act-3', 'act-4']
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentAct < 4) {
        e.preventDefault()
        document.getElementById(sections[currentAct + 1])?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' && currentAct > 0) {
        e.preventDefault()
        document.getElementById(sections[currentAct - 1])?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentAct])

  const handleBayesChange = useCallback((p: number, l: number) => {
    setPrior(p)
    setLikelihood(l)
  }, [])

  return (
    <>
      <FloatingParticles count={20} />
      <ActNav currentAct={currentAct} />

      {/* ── Intro ── */}
      <section
        id="intro"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
          scrollSnapAlign: 'start',
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
            An Interactive Journey
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 7vw, 80px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.05,
              marginBottom: '8px',
            }}
          >
            Quest for
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 7vw, 80px)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.03em',
              color: 'var(--color-accent)',
              lineHeight: 1.05,
              marginBottom: '32px',
            }}
          >
            Data Security
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.45}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              marginBottom: '48px',
            }}
          >
            Four mathematical concepts that protect the digital world.
            Scroll to explore each one through real-time visualizations
            and interactive demos you can touch.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.6}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Shannon Entropy', 'Gini Impurity', "Bayes' Theorem", 'RSA Encryption'].map((name, i) => (
              <button
                key={name}
                onClick={() => document.getElementById(`act-${i + 1}`)?.scrollIntoView({ behavior: 'smooth' })}
                className="card-glass"
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.02em',
                  background: 'transparent',
                }}
              >
                <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>0{i + 1}</span>
                {name}
              </button>
            ))}
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
              Scroll to begin
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

      {/* ── Act 1: Shannon Entropy ── */}
      <ActSection
        id="act-1"
        actNumber={1}
        label="Information Theory"
        title="Shannon Entropy"
        subtitle="Measuring the unpredictable"
        paragraphs={[
          'In 1948, Claude Shannon asked a deceptively simple question: how do you measure information? His answer -- entropy -- quantifies the average surprise in a message. A fair coin flip carries 1 bit of entropy. A loaded coin carries less.',
          'In security, entropy is everything. A password like "aaaa" has near-zero entropy -- trivial to guess. A string like "k9$Fm!2x" has high entropy -- each character is unpredictable. Attackers measure entropy to estimate how long brute-force will take.',
          'Network traffic analysis uses the same principle: normal traffic has predictable entropy patterns. A sudden spike in randomness can signal encrypted exfiltration or a zero-day payload.',
        ]}
        formula="H(X) = -\u03A3 p(x) log\u2082 p(x)"
        formulaLabel="Shannon Entropy"
        animation={
          <Suspense fallback={null}>
            <EntropyScene entropy={entropy} />
          </Suspense>
        }
        demo={<EntropyDemo onEntropyChange={setEntropy} />}
      />

      <AnimatedAccentLine />

      {/* ── Act 2: Gini Impurity ── */}
      <ActSection
        id="act-2"
        actNumber={2}
        label="Decision Trees"
        title="Gini Impurity"
        subtitle="Sorting signal from noise"
        paragraphs={[
          'Imagine a bag of marbles. If every marble is red, the bag is pure -- Gini impurity is 0. Mix in blue and green marbles and impurity rises. At maximum diversity, impurity approaches 1 minus 1 over the number of classes.',
          'Decision trees use Gini impurity to decide where to split data. At each node, the algorithm asks: "which feature, which threshold, gives me the purest child groups?" This is how intrusion detection systems classify network packets as normal or malicious.',
          'Spam filters, fraud detection, and malware classifiers all rely on decision tree variants like Random Forests and Gradient Boosting -- each splitting on features to minimize impurity and maximize classification accuracy.',
        ]}
        formula="Gini(S) = 1 - \u03A3 p\u1D62\u00B2"
        formulaLabel="Gini Impurity Index"
        animation={
          <Suspense fallback={null}>
            <GiniScene purity={purity} />
          </Suspense>
        }
        demo={<GiniDemo onPurityChange={setPurity} />}
      />

      <AnimatedAccentLine />

      {/* ── Act 3: Bayes' Theorem ── */}
      <ActSection
        id="act-3"
        actNumber={3}
        label="Probabilistic Reasoning"
        title="Bayes' Theorem"
        subtitle="Updating belief with evidence"
        paragraphs={[
          "You start with a prior belief -- say, 45% of your email is spam. Then you see evidence: the phrase 'Nigerian prince' appears. Bayes' theorem tells you exactly how to update your belief given this evidence.",
          "If 90% of spam emails contain that phrase, but only 1% of legitimate emails do, the math is decisive: your posterior probability jumps to over 98%. The evidence overwhelms the prior. This is how modern spam filters actually work -- they're Bayesian classifiers.",
          "Threat intelligence platforms use the same framework. Start with a base rate for IP addresses being malicious (prior). Observe traffic patterns, geo-location, known-bad lists (evidence). Update to a threat score (posterior). Every new piece of evidence refines the belief.",
        ]}
        formula="P(A|B) = P(B|A) \u00D7 P(A) / P(B)"
        formulaLabel="Bayes' Theorem"
        animation={
          <Suspense fallback={null}>
            <BayesScene prior={prior} likelihood={likelihood} />
          </Suspense>
        }
        demo={<BayesDemo onValuesChange={handleBayesChange} />}
      />

      <AnimatedAccentLine />

      {/* ── Act 4: RSA Encryption ── */}
      <ActSection
        id="act-4"
        actNumber={4}
        label="Public-Key Cryptography"
        title="RSA Encryption"
        subtitle="The lock anyone can close, only you can open"
        paragraphs={[
          "RSA's elegance lies in an asymmetry: multiplying two prime numbers is trivial, but factoring their product is computationally infeasible at scale. Take p=61 and q=53. Their product is 3,233. Easy. Now try factoring 3,233 without knowing p and q -- harder. Scale to 2048-bit primes and it becomes impossible.",
          "This one-way function enables public-key cryptography. Anyone can encrypt a message with your public key (e=17, n=3233). Only you, with the private key (d=2753, n=3233), can decrypt it. This is the foundation of HTTPS, SSH, digital signatures, and certificate authorities.",
          "Every time you see the lock icon in your browser, RSA (or its elliptic-curve cousin) is at work. Your browser and the server negotiate a shared secret using public-key exchange, then switch to symmetric encryption for speed. The handshake takes milliseconds but rests on number theory centuries old.",
        ]}
        formula="c = m\u1D49 mod n  /  m = c\u1D48 mod n"
        formulaLabel="RSA Encrypt / Decrypt"
        animation={
          <Suspense fallback={null}>
            <RSAScene encrypting={encrypting} />
          </Suspense>
        }
        demo={<RSADemo onEncryptingChange={setEncrypting} />}
      />

      {/* ── Closing ── */}
      <AnimatedAccentLine />
      <section
        style={{
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
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
              marginBottom: '16px',
            }}
          >
            End of Quest
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '12px',
            }}
          >
            Mathematics <em>is</em> security.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '500px',
            }}
          >
            Every encryption key, every spam filter, every anomaly detector
            rests on mathematical foundations. Understanding them is the first
            step to building -- and breaking -- the systems that protect us.
          </p>
        </AnimateIn>
      </section>

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  )
}
