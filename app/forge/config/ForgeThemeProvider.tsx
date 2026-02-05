'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { forgeConfig, getTheme, getThemeCSS, getAllThemeIds, type ForgeTheme } from './forge.config'

/* ─────────────────────────────────────────────
   Forge Theme Provider

   Provides instant theme switching for the entire
   Forge experience. Themes are defined in
   forge.config.ts and applied via CSS variables.

   Usage:
   const { theme, setTheme, themeIds } = useForgeTheme()
   ───────────────────────────────────────────── */

interface ForgeThemeContextType {
  theme: ForgeTheme
  themeId: string
  setTheme: (id: string) => void
  themeIds: string[]
  config: typeof forgeConfig
}

const ForgeThemeContext = createContext<ForgeThemeContextType | null>(null)

export function useForgeTheme() {
  const context = useContext(ForgeThemeContext)
  if (!context) {
    throw new Error('useForgeTheme must be used within ForgeThemeProvider')
  }
  return context
}

export function useForgeConfig() {
  const context = useContext(ForgeThemeContext)
  if (!context) {
    throw new Error('useForgeConfig must be used within ForgeThemeProvider')
  }
  return context.config
}

interface ForgeThemeProviderProps {
  children: ReactNode
  initialTheme?: string
}

export function ForgeThemeProvider({ children, initialTheme }: ForgeThemeProviderProps) {
  const [themeId, setThemeId] = useState(initialTheme || forgeConfig.defaultTheme)
  const [theme, setThemeState] = useState<ForgeTheme>(() => getTheme(themeId))

  // Apply theme CSS variables to document
  useEffect(() => {
    const css = getThemeCSS(theme)
    document.documentElement.style.cssText = css
  }, [theme])

  // Persist theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('forge-theme', themeId)
    }
  }, [themeId])

  // Load saved theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forge-theme')
      if (saved && forgeConfig.themes[saved]) {
        setThemeId(saved)
        setThemeState(getTheme(saved))
      }
    }
  }, [])

  const setTheme = (id: string) => {
    if (forgeConfig.themes[id]) {
      setThemeId(id)
      setThemeState(getTheme(id))
    }
  }

  return (
    <ForgeThemeContext.Provider
      value={{
        theme,
        themeId,
        setTheme,
        themeIds: getAllThemeIds(),
        config: forgeConfig,
      }}
    >
      {children}
    </ForgeThemeContext.Provider>
  )
}
