'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { FloatingParticles } from '@/app/components/FloatingParticles'
import { AnimatedAccentLine } from '@/app/components/AnimateIn'
import { ToastProvider } from './components/ToastProvider'
import { ForgeNav } from './components/ForgeNav'
import { Section1Entropy } from './components/Section1Entropy'
import { Section2Gathering } from './components/Section2Gathering'
import { Section3Shaping } from './components/Section3Shaping'
import { Section4Refinement } from './components/Section4Refinement'
import { Section5Radiance } from './components/Section5Radiance'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { ForgeThemeProvider, useForgeTheme } from './config/ForgeThemeProvider'
import { forgeConfig } from './config/forge.config'

/* ─────────────────────────────────────────────
   The Forge: Elite Frontend Masterclass
   WHITE-LABEL EDITION

   A single-page experience with one evolving 3D
   crystal that morphs through 5 stages as the
   user scrolls. Each stage demonstrates a
   different tier pattern.

   Configuration: ./config/forge.config.ts
   Theme Provider: ./config/ForgeThemeProvider.tsx

   Metaphor: "From chaos to clarity. Watch ideas
   take form."
   ───────────────────────────────────────────── */

// Dynamic import for 3D canvas to avoid SSR issues
const ForgeCanvas = dynamic(
  () => import('./components/ForgeCanvas').then((m) => ({ default: m.ForgeCanvas })),
  { ssr: false }
)

function ForgePageContent() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const { theme } = useForgeTheme()

  // Track scroll progress (0-1)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track which section is visible
  useEffect(() => {
    const sectionIds = forgeConfig.sections.map((s) => s.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id)
            if (idx !== -1) setCurrentSection(idx)
          }
        }
      },
      { threshold: 0.4 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const sectionIds = forgeConfig.sections.map((s) => s.id)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSection < sectionIds.length - 1) {
        e.preventDefault()
        document.getElementById(sectionIds[currentSection + 1])?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault()
        document.getElementById(sectionIds[currentSection - 1])?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentSection])

  const handleNavigate = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <ToastProvider>
      {/* Fixed 3D canvas in background */}
      <Suspense fallback={null}>
        <ForgeCanvas
          progress={scrollProgress}
          crystalColors={theme.crystal}
          voidColor={theme.colors.void}
        />
      </Suspense>

      {/* Floating ambient particles */}
      <FloatingParticles count={15} />

      {/* Side navigation dots */}
      <ForgeNav currentSection={currentSection} />

      {/* Theme switcher */}
      <ThemeSwitcher />

      {/* Scrollable content sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Section1Entropy onNavigate={handleNavigate} />
        <AnimatedAccentLine />

        <Section2Gathering />
        <AnimatedAccentLine />

        <Section3Shaping />
        <AnimatedAccentLine />

        <Section4Refinement />
        <AnimatedAccentLine />

        <Section5Radiance />
      </main>

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </ToastProvider>
  )
}

export default function ForgePage() {
  return (
    <ForgeThemeProvider>
      <ForgePageContent />
    </ForgeThemeProvider>
  )
}
