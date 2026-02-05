'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { Mesh, InstancedMesh as InstancedMeshType } from 'three'

/* ─────────────────────────────────────────────
   Morphing Crystal — From Chaos to Clarity

   A single geometry that evolves through 5 stages
   based on scroll progress (0-1):

   0.0-0.2: Entropy - Scattered particles, no form
   0.2-0.4: Gathering - Particles coalesce
   0.4-0.6: Shaping - Geometry defined
   0.6-0.8: Refinement - Transmission material
   0.8-1.0: Radiance - Full glow, perfect form

   Colors driven by theme from forge.config.ts
   ───────────────────────────────────────────── */

export interface CrystalColors {
  baseColor: string
  glowColor: string
  particleColorStart: string
  particleColorEnd: string
}

interface CrystalGeometryProps {
  progress: number
  colors: CrystalColors
}

function CrystalParticles({ progress, colors }: CrystalGeometryProps) {
  const meshRef = useRef<InstancedMeshType>(null)
  const count = 200
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const smoothProgress = useRef(0)

  // Parse colors from hex to RGB components
  const startColor = useMemo(() => new THREE.Color(colors.particleColorStart), [colors.particleColorStart])
  const endColor = useMemo(() => new THREE.Color(colors.particleColorEnd), [colors.particleColorEnd])

  // Random positions for scattered state
  const scatteredPositions = useMemo(() => {
    return Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ] as [number, number, number])
  }, [])

  // Target positions forming a crystal shape (icosahedron-like distribution)
  const crystalPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const phi = (1 + Math.sqrt(5)) / 2 // golden ratio

    for (let i = 0; i < count; i++) {
      // Distribute on icosahedron surface with some noise
      const t = i / count
      const theta = t * Math.PI * 20
      const r = 1 + (t * 0.8) + (Math.random() - 0.5) * 0.3

      // Faceted crystal distribution
      const facetAngle = Math.floor(theta / (Math.PI / 6)) * (Math.PI / 6)
      const x = Math.cos(facetAngle + Math.sin(theta * 3) * 0.2) * r * Math.sin(t * Math.PI)
      const y = (t - 0.5) * 3 + Math.sin(theta * 2) * 0.2
      const z = Math.sin(facetAngle + Math.sin(theta * 3) * 0.2) * r * Math.sin(t * Math.PI)

      positions.push([x, y, z])
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Smooth interpolation
    smoothProgress.current += (progress - smoothProgress.current) * 0.05
    const p = smoothProgress.current

    // Calculate stage-specific parameters
    // Stage 1 (0-0.2): Full scatter, chaotic motion
    // Stage 2 (0.2-0.4): Begin gathering
    // Stage 3 (0.4-0.6): Form crystal shape
    // Stage 4 (0.6-0.8): Tighten, polish
    // Stage 5 (0.8-1.0): Perfect form, glow

    const gatherStrength = Math.max(0, Math.min(1, (p - 0.1) / 0.5))
    const formStrength = Math.max(0, Math.min(1, (p - 0.35) / 0.3))
    const polishStrength = Math.max(0, Math.min(1, (p - 0.6) / 0.3))

    // Motion chaos decreases as we progress
    const motionChaos = Math.max(0.05, 1 - p * 1.2)
    const motionSpeed = 0.5 + (1 - p) * 2

    for (let i = 0; i < count; i++) {
      const sx = scatteredPositions[i][0]
      const sy = scatteredPositions[i][1]
      const sz = scatteredPositions[i][2]
      const cx = crystalPositions[i][0]
      const cy = crystalPositions[i][1]
      const cz = crystalPositions[i][2]

      // Brownian motion decreases with progress
      const noise = motionChaos * 0.5
      const bx = Math.sin(t * motionSpeed + i * 0.5) * noise
      const by = Math.cos(t * motionSpeed * 0.7 + i * 0.3) * noise
      const bz = Math.sin(t * motionSpeed * 0.9 + i * 0.7) * noise

      // Interpolate between scattered and crystal positions
      const x = sx + (cx - sx) * gatherStrength + bx
      const y = sy + (cy - sy) * gatherStrength + by
      const z = sz + (cz - sz) * gatherStrength + bz

      // Tighten toward center in refinement stage
      const tightness = 1 - polishStrength * 0.15
      dummy.position.set(x * tightness, y * tightness, z * tightness)

      // Scale: small scattered, larger as they form
      const baseScale = 0.02 + formStrength * 0.03 + polishStrength * 0.02
      dummy.scale.setScalar(baseScale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Update material color/emissive based on progress
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    // Interpolate from start color (chaos) to end color (formed)
    const colorProgress = Math.min(1, p * 1.5)
    const currentColor = new THREE.Color().lerpColors(startColor, endColor, colorProgress)
    mat.color.copy(currentColor)
    mat.emissive.copy(currentColor)
    mat.emissiveIntensity = 0.1 + p * 0.8
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={colors.particleColorStart} emissive={colors.particleColorStart} emissiveIntensity={0.1} />
    </instancedMesh>
  )
}

function CrystalCore({ progress, colors }: CrystalGeometryProps) {
  const meshRef = useRef<Mesh>(null)
  const smoothProgress = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    smoothProgress.current += (progress - smoothProgress.current) * 0.05
    const p = smoothProgress.current

    // Crystal only appears in Shaping stage (0.4+)
    const visibility = Math.max(0, Math.min(1, (p - 0.4) / 0.3))

    // Rotation slows as it becomes more refined
    meshRef.current.rotation.y = t * (0.2 - p * 0.15)
    meshRef.current.rotation.x = Math.sin(t * 0.3) * (0.1 - p * 0.08)

    // Scale grows and stabilizes
    const scale = visibility * (0.8 + p * 0.4)
    meshRef.current.scale.setScalar(scale)
  })

  // Only render if we're past gathering stage
  const visibility = Math.max(0, Math.min(1, (progress - 0.4) / 0.3))
  if (visibility < 0.01) return null

  return (
    <Float speed={1} rotationIntensity={0.1 * (1 - progress)} floatIntensity={0.3 * (1 - progress)}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.4 + progress * 0.3}
          chromaticAberration={0.15 - progress * 0.1}
          distortion={0.2 - progress * 0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.5}
          color={colors.baseColor}
          roughness={0.15 - progress * 0.1}
          transmission={0.9 + progress * 0.1}
          transparent
          opacity={Math.max(0, (progress - 0.4) / 0.3)}
        />
      </mesh>
    </Float>
  )
}

function CrystalGlow({ progress, colors }: CrystalGeometryProps) {
  const meshRef = useRef<Mesh>(null)
  const smoothProgress = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    smoothProgress.current += (progress - smoothProgress.current) * 0.05
    const p = smoothProgress.current

    // Glow only visible in Radiance stage (0.8+)
    const glowStrength = Math.max(0, (p - 0.75) / 0.25)

    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = glowStrength * (0.15 + Math.sin(t * 2) * 0.05)

    // Pulse scale
    const pulse = 1 + Math.sin(t * 1.5) * 0.1 * glowStrength
    meshRef.current.scale.setScalar(2 * pulse)
  })

  const glowStrength = Math.max(0, (progress - 0.75) / 0.25)
  if (glowStrength < 0.01) return null

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={colors.glowColor} transparent opacity={0} />
    </mesh>
  )
}

export function MorphingCrystal({ progress, colors }: CrystalGeometryProps) {
  return (
    <group>
      <CrystalParticles progress={progress} colors={colors} />
      <CrystalCore progress={progress} colors={colors} />
      <CrystalGlow progress={progress} colors={colors} />
    </group>
  )
}

export function CrystalLights({ progress, colors }: CrystalGeometryProps) {
  const spotRef = useRef<THREE.SpotLight>(null)
  const smoothProgress = useRef(0)

  useFrame(() => {
    smoothProgress.current += (progress - smoothProgress.current) * 0.05
    const p = smoothProgress.current

    if (spotRef.current) {
      // Intensity grows with progress
      spotRef.current.intensity = 1 + p * 3
    }
  })

  return (
    <>
      <ambientLight intensity={0.1 + progress * 0.15} />
      <spotLight
        ref={spotRef}
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color={colors.baseColor}
      />
      <spotLight
        position={[-5, -2, 3]}
        angle={0.4}
        penumbra={1}
        intensity={0.5 + progress * 0.8}
        color={colors.particleColorStart}
      />
      <pointLight position={[0, 3, 0]} intensity={0.2 + progress * 0.6} color={colors.glowColor} />
    </>
  )
}
