'use client'

import { useState, useCallback } from 'react'

// Simple RSA with small primes for demonstration
// p=61, q=53 -> n=3233, phi=3120, e=17, d=2753
const P = 61
const Q = 53
const N = P * Q // 3233
const E = 17
const D = 2753

function modPow(base: number, exp: number, mod: number): number {
  let result = 1
  base = base % mod
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod
    }
    exp = Math.floor(exp / 2)
    base = (base * base) % mod
  }
  return result
}

function rsaEncrypt(charCode: number): number {
  return modPow(charCode, E, N)
}

function rsaDecrypt(cipher: number): number {
  return modPow(cipher, D, N)
}

interface RSADemoProps {
  onEncryptingChange?: (encrypting: boolean) => void
}

export function RSADemo({ onEncryptingChange }: RSADemoProps) {
  const [message, setMessage] = useState('')
  const [encrypted, setEncrypted] = useState<number[]>([])
  const [decrypted, setDecrypted] = useState('')
  const [mode, setMode] = useState<'idle' | 'encrypted' | 'decrypted'>('idle')

  const handleEncrypt = useCallback(() => {
    if (!message.trim()) return
    const codes = Array.from(message).map(ch => ch.charCodeAt(0))
    const enc = codes.map(c => rsaEncrypt(c))
    setEncrypted(enc)
    setDecrypted('')
    setMode('encrypted')
    onEncryptingChange?.(true)
  }, [message, onEncryptingChange])

  const handleDecrypt = useCallback(() => {
    if (encrypted.length === 0) return
    const dec = encrypted.map(c => rsaDecrypt(c))
    setDecrypted(dec.map(c => String.fromCharCode(c)).join(''))
    setMode('decrypted')
    onEncryptingChange?.(false)
  }, [encrypted, onEncryptingChange])

  const handleReset = useCallback(() => {
    setMessage('')
    setEncrypted([])
    setDecrypted('')
    setMode('idle')
    onEncryptingChange?.(false)
  }, [onEncryptingChange])

  const btnStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid var(--color-accent)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  return (
    <div className="card-glass" style={{ padding: '20px', borderRadius: '16px' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '8px',
        }}
      >
        Live RSA (p={P}, q={Q}, n={N})
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
        Public key: (e={E}, n={N}) &middot; Private key: (d={D}, n={N})
      </p>

      {/* Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => { setMessage(e.target.value); setMode('idle') }}
        placeholder="Type a short message..."
        maxLength={20}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '10px 12px',
          fontFamily: "'DM Mono', 'SF Mono', monospace",
          fontSize: '14px',
          color: 'var(--color-text-primary)',
          outline: 'none',
          marginBottom: '12px',
        }}
      />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={handleEncrypt}
          disabled={!message.trim()}
          style={{
            ...btnStyle,
            background: mode === 'idle' && message.trim() ? 'var(--color-accent)' : 'transparent',
            color: mode === 'idle' && message.trim() ? 'var(--color-void)' : 'var(--color-accent)',
            opacity: message.trim() ? 1 : 0.4,
          }}
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          disabled={mode !== 'encrypted'}
          style={{
            ...btnStyle,
            background: mode === 'encrypted' ? 'var(--color-accent)' : 'transparent',
            color: mode === 'encrypted' ? 'var(--color-void)' : 'var(--color-accent)',
            opacity: mode === 'encrypted' ? 1 : 0.4,
          }}
        >
          Decrypt
        </button>
        <button
          onClick={handleReset}
          style={{
            ...btnStyle,
            background: 'transparent',
            color: 'var(--color-text-muted)',
            borderColor: 'var(--color-border)',
          }}
        >
          Reset
        </button>
      </div>

      {/* Encrypted output */}
      {encrypted.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Ciphertext
          </p>
          <div
            style={{
              padding: '8px 12px',
              background: 'rgba(200, 149, 108, 0.08)',
              borderRadius: '6px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              color: 'var(--color-accent-bright)',
              wordBreak: 'break-all',
              lineHeight: 1.6,
            }}
          >
            [{encrypted.join(', ')}]
          </div>
        </div>
      )}

      {/* Decrypted output */}
      {decrypted && (
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Decrypted
          </p>
          <div
            style={{
              padding: '8px 12px',
              background: 'rgba(74, 156, 138, 0.1)',
              borderRadius: '6px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '14px',
              color: '#4a9c8a',
            }}
          >
            {decrypted}
          </div>
        </div>
      )}
    </div>
  )
}
