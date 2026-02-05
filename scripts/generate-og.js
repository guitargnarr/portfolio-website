const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

const W = 1200
const H = 630

const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')

// Background
ctx.fillStyle = '#050505'
ctx.fillRect(0, 0, W, H)

// Subtle noise texture simulation
ctx.globalAlpha = 0.03
for (let x = 0; x < W; x += 4) {
  for (let y = 0; y < H; y += 4) {
    if (Math.random() > 0.5) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x, y, 1, 1)
    }
  }
}
ctx.globalAlpha = 1

// Concentric rings (Mobius strip suggestion)
const cx = W * 0.72
const cy = H * 0.48
for (let r = 60; r <= 200; r += 20) {
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(200, 149, 108, ' + (0.04 + (200 - r) * 0.0004) + ')'
  ctx.lineWidth = 1
  ctx.stroke()
}

// Accent line
const lineY = H * 0.62
ctx.beginPath()
const grad = ctx.createLinearGradient(80, lineY, W - 80, lineY)
grad.addColorStop(0, 'transparent')
grad.addColorStop(0.3, 'rgba(200, 149, 108, 0.4)')
grad.addColorStop(0.5, 'rgba(232, 176, 138, 0.6)')
grad.addColorStop(0.7, 'rgba(200, 149, 108, 0.4)')
grad.addColorStop(1, 'transparent')
ctx.strokeStyle = grad
ctx.lineWidth = 1
ctx.moveTo(80, lineY)
ctx.lineTo(W - 80, lineY)
ctx.stroke()

// Eyebrow
ctx.fillStyle = '#c8956c'
ctx.font = '12px Helvetica'
ctx.fillText('LOUISVILLE, KY', 80, 200)

// Title
ctx.fillStyle = '#f5f0eb'
ctx.font = '72px Georgia'
ctx.fillText('M. Scott', 80, 290)

// Tagline
ctx.fillStyle = '#c8956c'
ctx.font = 'italic 28px Georgia'
ctx.fillText('Complexity, untangled.', 80, 340)

// Subtitle
ctx.fillStyle = '#8a8580'
ctx.font = '16px Helvetica'
ctx.fillText('Systems, software, proof.', 80, 390)

// URL
ctx.fillStyle = '#4a4540'
ctx.font = '13px Helvetica'
ctx.fillText('portfolio-website-one-mu-68.vercel.app', 80, H - 50)

const outPath = path.join(__dirname, '..', 'public', 'og-image.png')
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync(outPath, buffer)
console.log('OG image written to ' + outPath + ' (' + buffer.length + ' bytes)')
