const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// === BACKGROUND: Deep void with subtle radial gradient ===
const bgGrad = ctx.createRadialGradient(WIDTH * 0.5, HEIGHT * 0.45, 0, WIDTH * 0.5, HEIGHT * 0.45, WIDTH * 0.7);
bgGrad.addColorStop(0, '#0f0d0a');
bgGrad.addColorStop(0.5, '#080706');
bgGrad.addColorStop(1, '#050505');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// === DECORATIVE: Amber glow orb (simulates the 3D light) ===
const glowGrad = ctx.createRadialGradient(WIDTH * 0.72, HEIGHT * 0.5, 0, WIDTH * 0.72, HEIGHT * 0.5, 280);
glowGrad.addColorStop(0, 'rgba(200, 149, 108, 0.15)');
glowGrad.addColorStop(0.4, 'rgba(200, 149, 108, 0.06)');
glowGrad.addColorStop(1, 'rgba(200, 149, 108, 0)');
ctx.fillStyle = glowGrad;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// === DECORATIVE: Secondary subtle glow top-left ===
const glow2 = ctx.createRadialGradient(WIDTH * 0.15, HEIGHT * 0.2, 0, WIDTH * 0.15, HEIGHT * 0.2, 200);
glow2.addColorStop(0, 'rgba(200, 149, 108, 0.05)');
glow2.addColorStop(1, 'rgba(200, 149, 108, 0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// === DECORATIVE: Geometric wireframe ring (right side) ===
ctx.strokeStyle = 'rgba(200, 149, 108, 0.12)';
ctx.lineWidth = 1;

// Draw elliptical rings to suggest the torus knot
for (let i = 0; i < 5; i++) {
  ctx.beginPath();
  const cx = WIDTH * 0.73;
  const cy = HEIGHT * 0.48;
  const rx = 100 + i * 30;
  const ry = 80 + i * 20;
  const angle = (i * 15 * Math.PI) / 180;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// Inner bright ring
ctx.strokeStyle = 'rgba(200, 149, 108, 0.25)';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.ellipse(WIDTH * 0.73, HEIGHT * 0.48, 60, 45, -0.3, 0, Math.PI * 2);
ctx.stroke();

// === DECORATIVE: Scatter dots (floating particles) ===
const rng = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};
const rand = rng(42);

for (let i = 0; i < 40; i++) {
  const x = rand() * WIDTH;
  const y = rand() * HEIGHT;
  const r = rand() * 1.5 + 0.3;
  const alpha = rand() * 0.4 + 0.1;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(200, 149, 108, ${alpha})`;
  ctx.fill();
}

// === TOP: Eyebrow label ===
ctx.fillStyle = '#4a4540';
ctx.font = '500 11px "Helvetica Neue", Arial, sans-serif';
ctx.letterSpacing = '3px';
const eyebrow = 'W E B   D E V E L O P E R   &   C R E A T I V E   T E C H N O L O G I S T';
ctx.fillText(eyebrow, 72, 200);

// === MAIN: Title ===
ctx.fillStyle = '#f5f0eb';
ctx.font = '300 72px Georgia, "Times New Roman", serif';
ctx.fillText('Crafting digital', 72, 300);

// === MAIN: Italic accent word ===
ctx.fillStyle = '#c8956c';
ctx.font = 'italic 300 72px Georgia, "Times New Roman", serif';
ctx.fillText('experiences', 72, 385);

// === SUBTITLE ===
ctx.fillStyle = '#6a6560';
ctx.font = '400 16px "Helvetica Neue", Arial, sans-serif';
ctx.fillText('Building at the intersection of design and engineering', 72, 440);

// === BOTTOM: Accent line ===
const lineGrad = ctx.createLinearGradient(72, 0, 500, 0);
lineGrad.addColorStop(0, 'rgba(200, 149, 108, 0.6)');
lineGrad.addColorStop(0.5, 'rgba(232, 176, 138, 0.8)');
lineGrad.addColorStop(1, 'rgba(200, 149, 108, 0)');
ctx.strokeStyle = lineGrad;
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(72, 470);
ctx.lineTo(500, 470);
ctx.stroke();

// === BOTTOM-LEFT: Logo ===
ctx.fillStyle = '#f5f0eb';
ctx.font = '400 18px Georgia, "Times New Roman", serif';
ctx.fillText('Portfolio', 72, HEIGHT - 48);
ctx.fillStyle = '#c8956c';
ctx.fillText('.', 72 + ctx.measureText('Portfolio').width, HEIGHT - 48);

// === BOTTOM-RIGHT: URL hint ===
ctx.fillStyle = '#4a4540';
ctx.font = '400 12px "Helvetica Neue", Arial, sans-serif';
const urlText = 'portfolio-website.vercel.app';
const urlWidth = ctx.measureText(urlText).width;
ctx.fillText(urlText, WIDTH - 72 - urlWidth, HEIGHT - 48);

// === DECORATIVE: Corner accent marks ===
ctx.strokeStyle = 'rgba(200, 149, 108, 0.2)';
ctx.lineWidth = 1;

// Top-right corner mark
ctx.beginPath();
ctx.moveTo(WIDTH - 72, 48);
ctx.lineTo(WIDTH - 72, 68);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(WIDTH - 72, 48);
ctx.lineTo(WIDTH - 92, 48);
ctx.stroke();

// Bottom-left corner mark
ctx.beginPath();
ctx.moveTo(72, HEIGHT - 28);
ctx.lineTo(72, HEIGHT - 8);
ctx.stroke();

// === NOISE GRAIN OVERLAY ===
const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
const data = imageData.data;
const noiseRand = rng(7);
for (let i = 0; i < data.length; i += 4) {
  const noise = (noiseRand() - 0.5) * 12;
  data[i] = Math.min(255, Math.max(0, data[i] + noise));
  data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
  data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
}
ctx.putImageData(imageData, 0, 0);

// === EXPORT ===
const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outPath, buffer);
console.log(`OG image generated: ${outPath} (${(buffer.length / 1024).toFixed(1)}KB)`);
