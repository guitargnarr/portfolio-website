'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { MorphingCrystal, CrystalLights, CrystalColors } from './CrystalGeometry'

/* ─────────────────────────────────────────────
   Fixed Fullscreen 3D Canvas

   Stays behind scrolling content, showing the
   morphing crystal that responds to scroll progress.
   Colors driven by theme from forge.config.ts
   ───────────────────────────────────────────── */

interface ForgeCanvasProps {
  progress: number
  crystalColors: CrystalColors
  voidColor: string
}

function Scene({ progress, crystalColors, voidColor }: ForgeCanvasProps) {
  return (
    <>
      <color attach="background" args={[voidColor]} />
      <fog attach="fog" args={[voidColor, 6, 18]} />

      <CrystalLights progress={progress} colors={crystalColors} />
      <Environment preset="night" />

      <MorphingCrystal progress={progress} colors={crystalColors} />
    </>
  )
}

export function ForgeCanvas({ progress, crystalColors, voidColor }: ForgeCanvasProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: !isMobile, alpha: false }}
        dpr={isMobile ? 1 : [1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene progress={progress} crystalColors={crystalColors} voidColor={voidColor} />
        </Suspense>
      </Canvas>

      {/* Gradient fade at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, var(--color-void), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
