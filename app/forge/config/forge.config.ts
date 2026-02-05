/* ─────────────────────────────────────────────
   Forge White-Label Configuration

   Single source of truth for all customizable
   elements. Change this file to rebrand the
   entire Forge experience.

   Usage:
   - Import { forgeConfig } from './config/forge.config'
   - Access: forgeConfig.brand.name, forgeConfig.sections[0].title, etc.
   - For themes: forgeConfig.themes.noir (default), forgeConfig.themes.arctic, etc.
   ───────────────────────────────────────────── */

export interface ForgeTheme {
  id: string
  name: string
  colors: {
    void: string
    surface: string
    border: string
    borderHover: string
    textPrimary: string
    textSecondary: string
    textMuted: string
    accent: string
    accentBright: string
    accentGlow: string
  }
  crystal: {
    baseColor: string
    glowColor: string
    particleColorStart: string
    particleColorEnd: string
  }
}

export interface ForgeService {
  id: string
  title: string
  description: string
  features: string[]
}

export interface ForgeMaterial {
  id: number
  name: string
  category: string
  icon: string
  description: string
}

export interface ForgeSocialLink {
  icon: 'github' | 'linkedin' | 'mail' | 'twitter' | 'instagram' | 'dribbble'
  href: string
  label: string
}

export interface ForgeSection {
  id: string
  number: string
  label: string
  stage: string
  title: string
  titleAccent: string
  subtitle: string
}

export interface ForgeConfig {
  // Brand Identity
  brand: {
    name: string
    tagline: string
    eyebrow: string
    description: string
    footerText: string
  }

  // Typography (Google Fonts)
  fonts: {
    display: string
    body: string
    googleImport: string
  }

  // Available themes
  themes: Record<string, ForgeTheme>

  // Default theme ID
  defaultTheme: string

  // Section metadata
  sections: ForgeSection[]

  // Section 2: Services
  services: ForgeService[]

  // Section 3: Materials/Skills
  materials: ForgeMaterial[]
  materialCategories: string[]

  // Section 4: Dashboard metrics
  metrics: {
    label: string
    value: string
    trend: string
    trendUp: boolean
    data: number[]
  }[]

  // Section 5: Contact
  contact: {
    heading: string
    headingAccent: string
    subtitle: string
    successTitle: string
    successMessage: string
    submitLabel: string
    submittingLabel: string
  }

  // Social links
  socialLinks: ForgeSocialLink[]

  // Navigation labels
  navItems: { id: string; label: string }[]

  // CMS Integration (optional)
  cms?: {
    enabled: boolean
    endpoint?: string
    apiKey?: string
  }
}

// ═══════════════════════════════════════════════
// DEFAULT CONFIGURATION — Architectural Noir
// ═══════════════════════════════════════════════

export const forgeConfig: ForgeConfig = {
  // ─────────────────────────────────────────────
  // BRAND IDENTITY
  // ─────────────────────────────────────────────
  brand: {
    name: 'The Forge',
    tagline: 'From chaos to clarity',
    eyebrow: 'Elite Frontend Masterclass',
    description:
      'Watch a crystal form as you scroll. Five stages. Five tier patterns. One continuous transformation.',
    footerText: 'Built with React, Three.js, Framer Motion, and Tailwind CSS.',
  },

  // ─────────────────────────────────────────────
  // TYPOGRAPHY
  // ─────────────────────────────────────────────
  fonts: {
    display: "'Instrument Serif', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    googleImport:
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
  },

  // ─────────────────────────────────────────────
  // THEMES
  // ─────────────────────────────────────────────
  themes: {
    noir: {
      id: 'noir',
      name: 'Architectural Noir',
      colors: {
        void: '#050505',
        surface: '#0a0a0a',
        border: '#1a1a1a',
        borderHover: '#2a2a2a',
        textPrimary: '#f5f0eb',
        textSecondary: '#8a8580',
        textMuted: '#4a4540',
        accent: '#c8956c',
        accentBright: '#e8b08a',
        accentGlow: 'rgba(200, 149, 108, 0.15)',
      },
      crystal: {
        baseColor: '#c8956c',
        glowColor: '#e8b08a',
        particleColorStart: '#4a4540',
        particleColorEnd: '#c8956c',
      },
    },
    arctic: {
      id: 'arctic',
      name: 'Arctic Frost',
      colors: {
        void: '#0a1628',
        surface: '#0f1d32',
        border: '#1e3a5f',
        borderHover: '#2d5a8a',
        textPrimary: '#e8f4fc',
        textSecondary: '#8bb8d9',
        textMuted: '#4a7699',
        accent: '#38bdf8',
        accentBright: '#7dd3fc',
        accentGlow: 'rgba(56, 189, 248, 0.15)',
      },
      crystal: {
        baseColor: '#38bdf8',
        glowColor: '#7dd3fc',
        particleColorStart: '#4a7699',
        particleColorEnd: '#38bdf8',
      },
    },
    ember: {
      id: 'ember',
      name: 'Ember Glow',
      colors: {
        void: '#0f0a08',
        surface: '#1a1210',
        border: '#3d2a22',
        borderHover: '#5c3d30',
        textPrimary: '#fef3eb',
        textSecondary: '#c9a08a',
        textMuted: '#7a5a48',
        accent: '#f97316',
        accentBright: '#fb923c',
        accentGlow: 'rgba(249, 115, 22, 0.15)',
      },
      crystal: {
        baseColor: '#f97316',
        glowColor: '#fb923c',
        particleColorStart: '#7a5a48',
        particleColorEnd: '#f97316',
      },
    },
    verdant: {
      id: 'verdant',
      name: 'Verdant Grove',
      colors: {
        void: '#050a08',
        surface: '#0a1410',
        border: '#1a2e24',
        borderHover: '#2a4a38',
        textPrimary: '#ecf5f0',
        textSecondary: '#8ab89a',
        textMuted: '#4a7a5a',
        accent: '#10b981',
        accentBright: '#34d399',
        accentGlow: 'rgba(16, 185, 129, 0.15)',
      },
      crystal: {
        baseColor: '#10b981',
        glowColor: '#34d399',
        particleColorStart: '#4a7a5a',
        particleColorEnd: '#10b981',
      },
    },
    violet: {
      id: 'violet',
      name: 'Violet Nebula',
      colors: {
        void: '#0a0812',
        surface: '#12101c',
        border: '#2a2440',
        borderHover: '#3d3660',
        textPrimary: '#f0ecf8',
        textSecondary: '#a89cc8',
        textMuted: '#6a5a8a',
        accent: '#a855f7',
        accentBright: '#c084fc',
        accentGlow: 'rgba(168, 85, 247, 0.15)',
      },
      crystal: {
        baseColor: '#a855f7',
        glowColor: '#c084fc',
        particleColorStart: '#6a5a8a',
        particleColorEnd: '#a855f7',
      },
    },
  },

  defaultTheme: 'noir',

  // ─────────────────────────────────────────────
  // SECTIONS
  // ─────────────────────────────────────────────
  sections: [
    {
      id: 'section-1',
      number: '01',
      label: 'Entropy',
      stage: 'Scattered',
      title: 'The Forge',
      titleAccent: 'clarity',
      subtitle: 'From chaos to',
    },
    {
      id: 'section-2',
      number: '02',
      label: 'Gathering',
      stage: 'Coalescing',
      title: 'Choose your',
      titleAccent: 'path',
      subtitle: 'Elements gather with purpose. Select the foundation for your project.',
    },
    {
      id: 'section-3',
      number: '03',
      label: 'Shaping',
      stage: 'Forming',
      title: 'Select your',
      titleAccent: 'materials',
      subtitle: 'The crystal takes form. Search and filter the tools that define your stack.',
    },
    {
      id: 'section-4',
      number: '04',
      label: 'Refinement',
      stage: 'Polishing',
      title: 'Measure your',
      titleAccent: 'progress',
      subtitle: 'Facets polish to perfection. Watch your metrics shine.',
    },
    {
      id: 'section-5',
      number: '05',
      label: 'Radiance',
      stage: 'Complete',
      title: 'Your vision,',
      titleAccent: 'realized',
      subtitle:
        'The crystal is complete. It radiates with all the patterns you have explored. Now, let us create something together.',
    },
  ],

  // ─────────────────────────────────────────────
  // SERVICES (Section 2)
  // ─────────────────────────────────────────────
  services: [
    {
      id: 'landing',
      title: 'Landing Page',
      description: 'Single-page with smooth scroll, animations, and contact form.',
      features: ['Responsive design', 'Staggered animations', 'Contact form'],
    },
    {
      id: 'booking',
      title: 'Booking System',
      description: 'Multi-page with scheduling, calendar integration, and payments.',
      features: ['3-step wizard', 'Real-time slots', 'Validation'],
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      description: 'Full shop with cart, search, filters, and checkout flow.',
      features: ['Product grid', 'Cart system', 'Analytics'],
    },
  ],

  // ─────────────────────────────────────────────
  // MATERIALS (Section 3)
  // ─────────────────────────────────────────────
  materials: [
    { id: 1, name: 'React', category: 'Framework', icon: '⚛️', description: 'Component-based UI library' },
    { id: 2, name: 'TypeScript', category: 'Language', icon: '📘', description: 'Typed JavaScript at scale' },
    { id: 3, name: 'Tailwind', category: 'Styling', icon: '🎨', description: 'Utility-first CSS framework' },
    { id: 4, name: 'Framer Motion', category: 'Animation', icon: '✨', description: 'Production-ready animations' },
    { id: 5, name: 'Three.js', category: 'Animation', icon: '🔮', description: '3D graphics for the web' },
    { id: 6, name: 'Next.js', category: 'Framework', icon: '▲', description: 'React framework for production' },
    { id: 7, name: 'PostgreSQL', category: 'Database', icon: '🗄️', description: 'Relational database system' },
    { id: 8, name: 'Redis', category: 'Database', icon: '⚡', description: 'In-memory data structure store' },
    { id: 9, name: 'Vercel', category: 'Platform', icon: '🚀', description: 'Deploy at the edge' },
  ],

  materialCategories: ['All', 'Framework', 'Language', 'Styling', 'Animation', 'Database', 'Platform'],

  // ─────────────────────────────────────────────
  // METRICS (Section 4)
  // ─────────────────────────────────────────────
  metrics: [
    { label: 'Performance', value: '98', trend: '+3%', trendUp: true, data: [85, 88, 90, 92, 95, 97, 98] },
    { label: 'Accessibility', value: '100', trend: 'Perfect', trendUp: true, data: [95, 96, 98, 99, 100, 100, 100] },
    { label: 'Best Practices', value: '95', trend: '+5%', trendUp: true, data: [80, 82, 85, 88, 90, 93, 95] },
    { label: 'SEO', value: '100', trend: 'Optimal', trendUp: true, data: [90, 92, 95, 97, 98, 99, 100] },
  ],

  // ─────────────────────────────────────────────
  // CONTACT (Section 5)
  // ─────────────────────────────────────────────
  contact: {
    heading: 'Your vision,',
    headingAccent: 'realized',
    subtitle:
      'The crystal is complete. It radiates with all the patterns you have explored. Now, let us create something together.',
    successTitle: 'Message Sent',
    successMessage: 'Thank you for reaching out. We will be in touch soon.',
    submitLabel: 'Send Message',
    submittingLabel: 'Sending...',
  },

  // ─────────────────────────────────────────────
  // SOCIAL LINKS
  // ─────────────────────────────────────────────
  socialLinks: [
    { icon: 'github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'mail', href: 'mailto:hello@example.com', label: 'Email' },
  ],

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────
  navItems: [
    { id: 'section-2', label: 'Gathering' },
    { id: 'section-3', label: 'Shaping' },
    { id: 'section-4', label: 'Refinement' },
    { id: 'section-5', label: 'Radiance' },
  ],

  // ─────────────────────────────────────────────
  // CMS INTEGRATION (Optional)
  // ─────────────────────────────────────────────
  cms: {
    enabled: false,
    endpoint: undefined,
    apiKey: undefined,
  },
}

// ═══════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════

export function getTheme(themeId?: string): ForgeTheme {
  const id = themeId || forgeConfig.defaultTheme
  return forgeConfig.themes[id] || forgeConfig.themes[forgeConfig.defaultTheme]
}

export function getThemeCSS(theme: ForgeTheme): string {
  return `
    --color-void: ${theme.colors.void};
    --color-surface: ${theme.colors.surface};
    --color-border: ${theme.colors.border};
    --color-border-hover: ${theme.colors.borderHover};
    --color-text-primary: ${theme.colors.textPrimary};
    --color-text-secondary: ${theme.colors.textSecondary};
    --color-text-muted: ${theme.colors.textMuted};
    --color-accent: ${theme.colors.accent};
    --color-accent-bright: ${theme.colors.accentBright};
    --color-accent-glow: ${theme.colors.accentGlow};
  `
}

export function getAllThemeIds(): string[] {
  return Object.keys(forgeConfig.themes)
}
