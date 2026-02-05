'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { MorphingCrystal, CrystalLights } from './CrystalGeometry'

/* ─────────────────────────────────────────────
   Fixed Fullscreen 3D Canvas

   Stays behind scrolling content, showing the
   morphing crystal that responds to scroll progress.
   ───────────────────────────────────────────── */

interface ForgeCanvasProps {
  progress: number
}

function Scene({ progress }: ForgeCanvasProps) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 6, 18]} />

      <CrystalLights progress={progress} />
      <Environment preset="night" />

      <MorphingCrystal progress={progress} />
    </>
  )
}

export function ForgeCanvas({ progress }: ForgeCanvasProps) {
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
          <Scene progress={progress} />
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
