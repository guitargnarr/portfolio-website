'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import type { Mesh, Group, InstancedMesh as InstancedMeshType } from 'three'
import * as THREE from 'three'

/* ─── Act 1: Shannon Entropy ─── */
/* Instanced spheres transition from grid (ordered) to Brownian motion (chaotic) */

function EntropyParticles({ entropy }: { entropy: number }) {
  const meshRef = useRef<InstancedMeshType>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const count = 150
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const smoothEntropy = useRef(0.2)

  const gridPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const side = Math.ceil(Math.cbrt(count))
    const spacing = 3 / side
    for (let i = 0; i < count; i++) {
      const x = (i % side) * spacing - 1.5
      const y = (Math.floor(i / side) % side) * spacing - 1.5
      const z = Math.floor(i / (side * side)) * spacing - 1.5
      positions.push([x, y, z])
    }
    return positions
  }, [])

  const randomTargets = useMemo(() => {
    return Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
    ] as [number, number, number])
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Smooth interpolation toward target entropy for fluid transitions
    smoothEntropy.current += (entropy - smoothEntropy.current) * 0.08
    const e = smoothEntropy.current

    // Brownian motion speed scales dramatically with entropy
    const motionSpeed = 0.3 + e * 2.5
    const motionAmplitude = 0.2 + e * 1.8
    // Scatter radius expands at high entropy
    const scatterScale = 1 + e * 1.5

    for (let i = 0; i < count; i++) {
      const gx = gridPositions[i][0]
      const gy = gridPositions[i][1]
      const gz = gridPositions[i][2]
      const rx = randomTargets[i][0] * scatterScale + Math.sin(t * motionSpeed + i) * motionAmplitude
      const ry = randomTargets[i][1] * scatterScale + Math.cos(t * (motionSpeed * 0.7) + i * 0.7) * motionAmplitude
      const rz = randomTargets[i][2] * scatterScale + Math.sin(t * (motionSpeed * 0.8) + i * 1.3) * motionAmplitude

      dummy.position.set(
        gx + (rx - gx) * e,
        gy + (ry - gy) * e,
        gz + (rz - gz) * e,
      )
      // Scale grows with entropy: tight dots when ordered, bigger when chaotic
      const scale = 0.03 + e * 0.05
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Color shifts: amber at low entropy -> red/hot at high entropy
    if (matRef.current) {
      const r = 0.78 + e * 0.22 // 0.78 -> 1.0
      const g = 0.58 - e * 0.35 // 0.58 -> 0.23
      const b = 0.42 - e * 0.32 // 0.42 -> 0.10
      matRef.current.color.setRGB(r, g, b)
      matRef.current.emissive.setRGB(r, g, b)
      matRef.current.emissiveIntensity = 0.2 + e * 0.8
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial ref={matRef} color="#c8956c" emissive="#c8956c" emissiveIntensity={0.3} />
    </instancedMesh>
  )
}

function EntropyLights({ entropy }: { entropy: number }) {
  const lightRef = useRef<THREE.PointLight>(null)
  const smoothE = useRef(0.2)

  useFrame(() => {
    smoothE.current += (entropy - smoothE.current) * 0.08
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + smoothE.current * 2.5
    }
  })

  return (
    <>
      <ambientLight intensity={0.2 + entropy * 0.2} />
      <pointLight ref={lightRef} position={[5, 5, 5]} intensity={1} color="#c8956c" />
      <pointLight position={[-3, -3, 3]} intensity={0.3 + entropy * 0.5} color="#ef4444" />
    </>
  )
}

export function EntropyScene({ entropy = 0.5 }: { entropy?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <EntropyLights entropy={entropy} />
      <EntropyParticles entropy={entropy} />
    </Canvas>
  )
}

/* ─── Act 2: Gini Impurity ─── */
/* Colored spheres in wireframe box, decision plane sweeps through */

function GiniSpheres({ purity }: { purity: number }) {
  const groupRef = useRef<Group>(null)
  const planeRef = useRef<Mesh>(null)
  const wireRef = useRef<Mesh>(null)
  const count = 60
  const smoothPurity = useRef(0.5)

  const sphereData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      color: i < count * 0.5 ? '#c8956c' : '#4a9c8a',
      colorVec: i < count * 0.5 ? new THREE.Color('#c8956c') : new THREE.Color('#4a9c8a'),
      sortedPosition: [
        i < count * 0.5 ? -0.8 - Math.random() * 0.8 : 0.8 + Math.random() * 0.8,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      ] as [number, number, number],
      meshRef: null as Mesh | null,
    }))
  }, [])

  useFrame((state) => {
    smoothPurity.current += (purity - smoothPurity.current) * 0.08
    const p = smoothPurity.current

    if (groupRef.current) {
      // Rotation slows as purity increases (order = calm)
      groupRef.current.rotation.y = state.clock.elapsedTime * (0.05 + (1 - p) * 0.2)
    }
    if (planeRef.current) {
      // Decision plane becomes bold and solid when pure
      planeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * (0.1 + (1 - p) * 0.5)
      const mat = planeRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.05 + p * 0.4
    }
    if (wireRef.current) {
      // Wireframe goes from dim to bright accent when pure
      const wMat = wireRef.current.material as THREE.MeshBasicMaterial
      const wireColor = new THREE.Color('#1a1a1a').lerp(new THREE.Color('#c8956c'), p * 0.4)
      wMat.color.copy(wireColor)
    }

    // Update sphere positions, scales, and emissive intensity per frame
    sphereData.forEach((s) => {
      if (!s.meshRef) return
      const mesh = s.meshRef
      const px = s.position[0] + (s.sortedPosition[0] - s.position[0]) * p
      const py = s.position[1] + (s.sortedPosition[1] - s.position[1]) * p
      const pz = s.position[2] + (s.sortedPosition[2] - s.position[2]) * p
      mesh.position.set(px, py, pz)
      // Spheres grow larger when pure (confident classification)
      const scale = 0.06 + p * 0.06
      mesh.scale.setScalar(scale / 0.08) // normalized to base geometry radius
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.2 + p * 1.0
    })
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe container */}
      <mesh ref={wireRef}>
        <boxGeometry args={[3.5, 3.5, 3.5]} />
        <meshBasicMaterial color="#1a1a1a" wireframe />
      </mesh>

      {/* Decision plane */}
      <mesh ref={planeRef} rotation={[0, 0, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial color="#c8956c" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Colored spheres */}
      {sphereData.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { sphereData[i].meshRef = el }}
          position={[s.position[0], s.position[1], s.position[2]]}
        >
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export function GiniScene({ purity = 0.5 }: { purity?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.3 + purity * 0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8 + purity * 1.2} color="#c8956c" />
      <pointLight position={[-5, -3, 3]} intensity={0.3 + purity * 0.7} color="#4a9c8a" />
      <GiniSpheres purity={purity} />
    </Canvas>
  )
}

/* ─── Act 3: Bayes' Theorem ─── */
/* Two overlapping translucent spheres -- overlap region = posterior */

function BayesSpheres({ prior, likelihood }: { prior: number; likelihood: number }) {
  const groupRef = useRef<Group>(null)
  const priorRef = useRef<Mesh>(null)
  const likelihoodRef = useRef<Mesh>(null)
  const posteriorRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)
  const smoothPrior = useRef(0.5)
  const smoothLikelihood = useRef(0.5)

  useFrame((state) => {
    smoothPrior.current += (prior - smoothPrior.current) * 0.06
    smoothLikelihood.current += (likelihood - smoothLikelihood.current) * 0.06
    const p = smoothPrior.current
    const l = smoothLikelihood.current

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }

    const sep = 2.5 - (p + l) * 0.8
    const overlap = Math.max(0, 1 - sep / 2.5)

    // Move spheres toward each other
    if (priorRef.current) {
      priorRef.current.position.x = -sep / 2
      priorRef.current.scale.setScalar(1 + p * 0.5)
      const mat = priorRef.current.material as THREE.MeshPhysicalMaterial
      mat.opacity = 0.15 + p * 0.25
    }
    if (likelihoodRef.current) {
      likelihoodRef.current.position.x = sep / 2
      likelihoodRef.current.scale.setScalar(1 + l * 0.5)
      const mat = likelihoodRef.current.material as THREE.MeshPhysicalMaterial
      mat.opacity = 0.15 + l * 0.25
    }

    // Posterior glow: pulsing, size scales with overlap
    if (posteriorRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.15 * overlap
      posteriorRef.current.scale.setScalar(0.3 + overlap * 0.9 + pulse)
      const mat = posteriorRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = overlap * 2.5
      mat.opacity = overlap * 0.8
    }

    // Ring halo at overlap point
    if (ringRef.current) {
      ringRef.current.scale.setScalar(0.5 + overlap * 1.2)
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.5
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = overlap * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      {/* Prior sphere */}
      <mesh ref={priorRef} position={[-1, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#c8956c"
          transparent
          opacity={0.25}
          roughness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Likelihood sphere */}
      <mesh ref={likelihoodRef} position={[1, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#4a9c8a"
          transparent
          opacity={0.25}
          roughness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Posterior glow at overlap */}
      <mesh ref={posteriorRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#e8b08a"
          emissive="#e8b08a"
          emissiveIntensity={0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Ring halo at overlap */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 64]} />
        <meshBasicMaterial color="#e8b08a" transparent opacity={0} />
      </mesh>

      {/* Labels */}
      <mesh position={[-1, -1.8, 0]}>
        <planeGeometry args={[0.8, 0.02]} />
        <meshBasicMaterial color="#c8956c" />
      </mesh>
      <mesh position={[1, -1.8, 0]}>
        <planeGeometry args={[0.8, 0.02]} />
        <meshBasicMaterial color="#4a9c8a" />
      </mesh>
    </group>
  )
}

export function BayesScene({ prior = 0.5, likelihood = 0.5 }: { prior?: number; likelihood?: number }) {
  const overlap = Math.max(0, 1 - (2.5 - (prior + likelihood) * 0.8) / 2.5)
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.2 + overlap * 0.3} />
      <pointLight position={[5, 5, 5]} intensity={1 + overlap * 1.5} color="#f5f0eb" />
      <pointLight position={[-3, -2, 4]} intensity={0.3 + overlap * 0.8} color="#e8b08a" />
      <BayesSpheres prior={prior} likelihood={likelihood} />
    </Canvas>
  )
}

/* ─── Act 4: RSA Encryption ─── */
/* Two key shapes with message particles flowing through */

function RSAKeys({ encrypting }: { encrypting: boolean }) {
  const groupRef = useRef<Group>(null)
  const particlesRef = useRef<Group>(null)
  const pubKeyRef = useRef<Group>(null)
  const privKeyRef = useRef<Group>(null)
  const beamRef = useRef<Mesh>(null)
  const particleCount = 30
  const smoothEncrypt = useRef(0)

  const particleData = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      offset: (i / particleCount) * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.3,
      radius: 0.04 + Math.random() * 0.04,
      yOffset: (Math.random() - 0.5) * 0.4,
    }))
  }, [])

  useFrame((state) => {
    const target = encrypting ? 1 : 0
    smoothEncrypt.current += (target - smoothEncrypt.current) * 0.06
    const enc = smoothEncrypt.current

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (0.08 + enc * 0.04)
    }

    // Key glow intensifies when encrypting
    if (pubKeyRef.current) {
      pubKeyRef.current.children.forEach(child => {
        const mat = (child as Mesh).material as THREE.MeshStandardMaterial
        if (mat.emissiveIntensity !== undefined) {
          mat.emissiveIntensity = 0.2 + enc * 1.0
        }
      })
    }
    if (privKeyRef.current) {
      privKeyRef.current.children.forEach(child => {
        const mat = (child as Mesh).material as THREE.MeshStandardMaterial
        if (mat.emissiveIntensity !== undefined) {
          mat.emissiveIntensity = 0.2 + enc * 0.8
        }
      })
    }

    // Connection beam pulses
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = enc * (0.2 + Math.sin(state.clock.elapsedTime * 4) * 0.15)
      beamRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 6) * enc * 0.5
    }

    if (particlesRef.current) {
      const speedMultiplier = 1 + enc * 2.5
      particlesRef.current.children.forEach((child, i) => {
        const d = particleData[i]
        const t = state.clock.elapsedTime * d.speed * speedMultiplier + d.offset
        const progress = ((t % (Math.PI * 2)) / (Math.PI * 2))

        if (enc > 0.1) {
          // Particles stream from public to private key with arc
          child.position.x = -2.5 + progress * 5
          child.position.y = Math.sin(progress * Math.PI) * (0.6 + d.yOffset) + d.yOffset * 0.3
          child.position.z = Math.cos(progress * Math.PI * 2) * 0.3
          child.scale.setScalar(0.8 + enc * 0.8)
        } else {
          // Slow orbit when idle
          child.position.x = Math.cos(t) * 1.5
          child.position.y = Math.sin(t * 0.7) * 0.5
          child.position.z = Math.sin(t) * 1.5
          child.scale.setScalar(0.6)
        }

        // Color: gray when idle -> bright amber when encrypting
        const mat = (child as Mesh).material as THREE.MeshStandardMaterial
        const r = 0.54 + enc * 0.37
        const g = 0.52 + enc * 0.17
        const b = 0.50 - enc * 0.16
        mat.color.setRGB(r, g, b)
        mat.emissive.setRGB(r, g, b)
        mat.emissiveIntensity = 0.2 + enc * 1.2
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Public key (open lock shape) */}
      <group ref={pubKeyRef} position={[-1.8, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.12, 16, 32, Math.PI * 1.5]} />
          <meshStandardMaterial color="#c8956c" emissive="#c8956c" emissiveIntensity={0.3} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[0.8, 0.7, 0.4]} />
          <meshStandardMaterial color="#c8956c" emissive="#c8956c" emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Private key (closed lock) */}
      <group ref={privKeyRef} position={[1.8, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.12, 16, 32]} />
          <meshStandardMaterial color="#4a9c8a" emissive="#4a9c8a" emissiveIntensity={0.3} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[0.8, 0.7, 0.4]} />
          <meshStandardMaterial color="#4a9c8a" emissive="#4a9c8a" emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Message particles */}
      <group ref={particlesRef}>
        {particleData.map((d, i) => (
          <mesh key={i}>
            <sphereGeometry args={[d.radius, 8, 8]} />
            <meshStandardMaterial
              color="#8a8580"
              emissive="#8a8580"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Connection beam (always present, opacity controlled by ref) */}
      <mesh ref={beamRef} position={[0, 0.3, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshBasicMaterial color="#e8b08a" transparent opacity={0} />
      </mesh>
    </group>
  )
}

export function RSAScene({ encrypting = false }: { encrypting?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.2 + (encrypting ? 0.2 : 0)} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={encrypting ? 3 : 1.5} color="#c8956c" />
      <pointLight position={[-3, -2, 4]} intensity={encrypting ? 1 : 0.4} color="#4a9c8a" />
      <RSAKeys encrypting={encrypting} />
    </Canvas>
  )
}

/* ─── Default export for backward compat ─── */
interface AnimationProps {
  currentAct: number
  entropy?: number
  purity?: number
  prior?: number
  likelihood?: number
  encrypting?: boolean
}

export default function Animation({ currentAct, entropy, purity, prior, likelihood, encrypting }: AnimationProps) {
  switch (currentAct) {
    case 1: return <EntropyScene entropy={entropy} />
    case 2: return <GiniScene purity={purity} />
    case 3: return <BayesScene prior={prior} likelihood={likelihood} />
    case 4: return <RSAScene encrypting={encrypting} />
    default: return <EntropyScene entropy={0.2} />
  }
}
