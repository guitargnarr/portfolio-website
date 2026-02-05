'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, X } from 'lucide-react'
import { useForgeTheme } from '../config/ForgeThemeProvider'

/* ─────────────────────────────────────────────
   Theme Switcher

   Floating button that opens a theme selection
   panel. Shows all available themes with live
   preview swatches.
   ───────────────────────────────────────────── */

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, themeId, setTheme, themeIds, config } = useForgeTheme()

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          color: 'var(--color-accent)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        aria-label="Open theme switcher"
      >
        <Palette size={20} />
      </motion.button>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 100,
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                bottom: '88px',
                left: '24px',
                width: '280px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                padding: '20px',
                zIndex: 101,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Theme
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    padding: '4px',
                    display: 'flex',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Theme Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {themeIds.map((id) => {
                  const t = config.themes[id]
                  const isActive = themeId === id

                  return (
                    <motion.button
                      key={id}
                      onClick={() => {
                        setTheme(id)
                        setIsOpen(false)
                      }}
                      whileHover={{ x: 4 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        border: isActive ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                        backgroundColor: isActive ? 'var(--color-accent-glow)' : 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Color swatches */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '4px',
                          padding: '4px',
                          borderRadius: '8px',
                          backgroundColor: t.colors.void,
                        }}
                      >
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            backgroundColor: t.colors.accent,
                          }}
                        />
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            backgroundColor: t.colors.textPrimary,
                          }}
                        />
                      </div>

                      {/* Name */}
                      <span
                        style={{
                          flex: 1,
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {t.name}
                      </span>

                      {/* Active indicator */}
                      {isActive && <Check size={16} style={{ color: 'var(--color-accent)' }} />}
                    </motion.button>
                  )
                })}
              </div>

              {/* Footer */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginTop: '16px',
                  textAlign: 'center',
                }}
              >
                Theme persists across sessions
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
