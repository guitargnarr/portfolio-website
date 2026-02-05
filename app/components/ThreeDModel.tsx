'use client'

import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'

/* ─────────────────────────────────────────────
   Glass Mobius Strip — Infinite Crystalline Form

   A one-sided surface with a half-twist rendered
   in glass. Light refracts along the continuous
   ribbon, creating shifting caustic patterns as
   the strip slowly rotates. The mathematical
   impossibility made tangible in amber crystal.
   ───────────────────────────────────────────── */

/* ─── Parametric Mobius strip geometry ─── */
function createMobiusGeometry(
  radius: number,
  width: number,
  segmentsU: number,
  segmentsT: number
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  // Generate vertices
  for (let i = 0; i <= segmentsU; i++) {
    const u = (i / segmentsU) * Math.PI * 2
    const cosU = Math.cos(u)
    const sinU = Math.sin(u)
    const cosHalfU = Math.cos(u / 2)
    const sinHalfU = Math.sin(u / 2)

    for (let j = 0; j <= segmentsT; j++) {
      const t = (j / segmentsT - 0.5) * width

      // Mobius parametric equations
      const x = (radius + t * cosHalfU) * cosU
      const y = (radius + t * cosHalfU) * sinU
      const z = t * sinHalfU

      positions.push(x, y, z)

      // Compute normals via partial derivatives
      // du partial
      const dxdu = -(radius + t * cosHalfU) * sinU + t * (-0.5 * sinHalfU) * cosU
      const dydu = (radius + t * cosHalfU) * cosU + t * (-0.5 * sinHalfU) * sinU
      const dzdu = t * 0.5 * cosHalfU

      // dt partial
      const dxdt = cosHalfU * cosU
      const dydt = cosHalfU * sinU
      const dzdt = sinHalfU

      // Cross product for normal
      const nx = dydu * dzdt - dzdu * dydt
      const ny = dzdu * dxdt - dxdu * dzdt
      const nz = dxdu * dydt - dydu * dxdt

      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1
      normals.push(nx / len, ny / len, nz / len)

      uvs.push(i / segmentsU, j / segmentsT)
    }
  }

  // Generate indices
  for (let i = 0; i < segmentsU; i++) {
    for (let j = 0; j < segmentsT; j++) {
      const a = i * (segmentsT + 1) + j
      const b = a + segmentsT + 1
      const c = a + 1
      const d = b + 1

      indices.push(a, b, c)
      indices.push(c, b, d)
    }
  }

  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

  return geometry
}

/* ─── The glass Mobius strip ─── */
function MobiusStrip() {
  const meshRef = useRef<THREE.Mesh>(null!)

  const geometry = useMemo(
    () => createMobiusGeometry(1.4, 0.9, 256, 64),
    []
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    // Slow continuous rotation
    meshRef.current.rotation.y = t * 0.15

    // Subtle breathing scale pulse
    const breath = 1 + Math.sin(t * 0.5) * 0.02
    meshRef.current.scale.setScalar(breath)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[Math.PI * 0.5, 0, 0]}
      >
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          chromaticAberration={0.15}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.5}
          color="#c8956c"
          roughness={0.08}
          transmission={1}
        />
      </mesh>
    </Float>
  )
}

/* ─── Orbiting dust particles ─── */
function OrbitalParticles({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        angle: Math.random() * Math.PI * 2,
        radius: 2 + Math.random() * 1,
        height: (Math.random() - 0.5) * 1.5,
        speed: 0.08 + Math.random() * 0.12,
        size: 0.005 + Math.random() * 0.01,
        opacity: 0.4 + Math.random() * 0.3,
        phaseY: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    particles.forEach((p, i) => {
      const a = p.angle + t * p.speed
      const r = p.radius + Math.sin(t * 0.3 + p.phaseY) * 0.15

      dummy.position.set(
        Math.cos(a) * r,
        p.height + Math.sin(t * 0.5 + p.phaseY) * 0.2,
        Math.sin(a) * r
      )
      dummy.scale.setScalar(p.size)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c8956c" transparent opacity={0.55} />
    </instancedMesh>
  )
}

/* ─── Scene ─── */
function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 15]} />

      {/* Dramatic lighting — accent-colored spots */}
      <ambientLight intensity={0.15} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#c8956c"
      />
      <spotLight
        position={[-5, -2, 3]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#4a3f35"
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#f5f0eb" />
      <Environment preset="night" />

      {/* The glass Mobius strip */}
      <MobiusStrip />

      {/* Ambient orbiting dust */}
      <OrbitalParticles count={50} />
    </>
  )
}

/* ─── Export ─── */
export function ThreeDModel() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="canvas-container"
      style={{
        width: '100%',
        height: isMobile ? '40vh' : '70vh',
        minHeight: isMobile ? '280px' : '480px',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: !isMobile, alpha: false }}
        dpr={isMobile ? 1 : [1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
