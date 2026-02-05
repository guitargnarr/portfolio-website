'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import type { Mesh, Group, InstancedMesh as InstancedMeshType } from 'three'
import * as THREE from 'three'

/* ─── Act 1: Shannon Entropy ─── */
/* Instanced spheres transition from grid (ordered) to Brownian motion (chaotic) */

function EntropyParticles({ entropy }: { entropy: number }) {
  const meshRef = useRef<InstancedMeshType>(null)
  const count = 150
  const dummy = useMemo(() => new THREE.Object3D(), [])

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

    for (let i = 0; i < count; i++) {
      const gx = gridPositions[i][0]
      const gy = gridPositions[i][1]
      const gz = gridPositions[i][2]
      const rx = randomTargets[i][0] + Math.sin(t * 0.5 + i) * 0.5
      const ry = randomTargets[i][1] + Math.cos(t * 0.3 + i * 0.7) * 0.5
      const rz = randomTargets[i][2] + Math.sin(t * 0.4 + i * 1.3) * 0.5

      dummy.position.set(
        gx + (rx - gx) * entropy,
        gy + (ry - gy) * entropy,
        gz + (rz - gz) * entropy,
      )
      const scale = 0.04 + entropy * 0.02
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color="#c8956c" emissive="#c8956c" emissiveIntensity={0.3} />
    </instancedMesh>
  )
}

export function EntropyScene({ entropy = 0.5 }: { entropy?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#c8956c" />
      <pointLight position={[-3, -3, 3]} intensity={0.4} color="#8a8580" />
      <EntropyParticles entropy={entropy} />
    </Canvas>
  )
}

/* ─── Act 2: Gini Impurity ─── */
/* Colored spheres in wireframe box, decision plane sweeps through */

function GiniSpheres({ purity }: { purity: number }) {
  const groupRef = useRef<Group>(null)
  const planeRef = useRef<Mesh>(null)
  const count = 60

  const sphereData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      color: i < count * 0.5 ? '#c8956c' : '#4a9c8a',
      sortedPosition: [
        i < count * 0.5 ? -0.8 - Math.random() * 0.8 : 0.8 + Math.random() * 0.8,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      ] as [number, number, number],
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (planeRef.current) {
      planeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      const mat = planeRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + purity * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe container */}
      <mesh>
        <boxGeometry args={[3.5, 3.5, 3.5]} />
        <meshBasicMaterial color="#1a1a1a" wireframe />
      </mesh>

      {/* Decision plane */}
      <mesh ref={planeRef} rotation={[0, 0, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial color="#c8956c" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Colored spheres */}
      {sphereData.map((s, i) => {
        const px = s.position[0] + (s.sortedPosition[0] - s.position[0]) * purity
        const py = s.position[1] + (s.sortedPosition[1] - s.position[1]) * purity
        const pz = s.position[2] + (s.sortedPosition[2] - s.position[2]) * purity
        return (
          <mesh key={i} position={[px, py, pz]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

export function GiniScene({ purity = 0.5 }: { purity?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#c8956c" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#4a9c8a" />
      <GiniSpheres purity={purity} />
    </Canvas>
  )
}

/* ─── Act 3: Bayes' Theorem ─── */
/* Two overlapping translucent spheres -- overlap region = posterior */

function BayesSpheres({ prior, likelihood }: { prior: number; likelihood: number }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  const separation = 2.5 - (prior + likelihood) * 0.8
  const overlapIntensity = Math.max(0, 1 - separation / 2.5)

  return (
    <group ref={groupRef}>
      {/* Prior sphere */}
      <mesh position={[-separation / 2, 0, 0]}>
        <sphereGeometry args={[1 + prior * 0.5, 32, 32]} />
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
      <mesh position={[separation / 2, 0, 0]}>
        <sphereGeometry args={[1 + likelihood * 0.5, 32, 32]} />
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
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3 + overlapIntensity * 0.7, 24, 24]} />
        <meshStandardMaterial
          color="#e8b08a"
          emissive="#e8b08a"
          emissiveIntensity={overlapIntensity * 1.5}
          transparent
          opacity={overlapIntensity * 0.6}
        />
      </mesh>

      {/* Labels */}
      <mesh position={[-separation / 2, -1.8, 0]}>
        <planeGeometry args={[0.8, 0.02]} />
        <meshBasicMaterial color="#c8956c" />
      </mesh>
      <mesh position={[separation / 2, -1.8, 0]}>
        <planeGeometry args={[0.8, 0.02]} />
        <meshBasicMaterial color="#4a9c8a" />
      </mesh>
    </group>
  )
}

export function BayesScene({ prior = 0.5, likelihood = 0.5 }: { prior?: number; likelihood?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#f5f0eb" />
      <pointLight position={[-3, -2, 4]} intensity={0.5} color="#c8956c" />
      <BayesSpheres prior={prior} likelihood={likelihood} />
    </Canvas>
  )
}

/* ─── Act 4: RSA Encryption ─── */
/* Two key shapes with message particles flowing through */

function RSAKeys({ encrypting }: { encrypting: boolean }) {
  const groupRef = useRef<Group>(null)
  const particlesRef = useRef<Group>(null)
  const particleCount = 20

  const particleData = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      offset: (i / particleCount) * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.3,
      radius: 0.05 + Math.random() * 0.04,
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const d = particleData[i]
        const t = state.clock.elapsedTime * d.speed + d.offset
        const progress = ((t % (Math.PI * 2)) / (Math.PI * 2))

        if (encrypting) {
          // Particles flow from left key to right key
          child.position.x = -2.5 + progress * 5
          child.position.y = Math.sin(progress * Math.PI) * 0.8
          child.position.z = Math.cos(progress * Math.PI * 2) * 0.3
        } else {
          // Particles orbit center
          child.position.x = Math.cos(t) * 1.5
          child.position.y = Math.sin(t * 0.7) * 0.5
          child.position.z = Math.sin(t) * 1.5
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Public key (open lock shape) */}
      <group position={[-1.8, 0, 0]}>
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
      <group position={[1.8, 0, 0]}>
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
              color={encrypting ? '#e8b08a' : '#8a8580'}
              emissive={encrypting ? '#e8b08a' : '#8a8580'}
              emissiveIntensity={encrypting ? 0.8 : 0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Connection line when encrypting */}
      {encrypting && (
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[3, 0.01, 0.01]} />
          <meshBasicMaterial color="#c8956c" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  )
}

export function RSAScene({ encrypting = false }: { encrypting?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#c8956c" />
      <pointLight position={[-3, -2, 4]} intensity={0.5} color="#4a9c8a" />
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
