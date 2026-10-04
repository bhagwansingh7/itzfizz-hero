// Deterministic pseudo-random so the skyline is identical on every render
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647

function makeCity(seed, minH, maxH, lit) {
  const r = rng(seed)
  const out = []
  for (let x = 0; x < 780; ) {
    const w = 30 + r() * 50
    const h = minH + r() * (maxH - minH)
    const wins = lit
      ? Array.from({ length: Math.floor(r() * 4) }, () => ({ x: x + 6 + r() * (w - 14), y: 200 - h + 8 + r() * (h - 22) }))
      : []
    out.push({ x, w, h, wins })
    x += w + r() * 8
  }
  return out
}

// The pattern is drawn twice side by side, so sliding the layer by -50% loops seamlessly
export default function Skyline({ className, seed, minH, maxH, fill, lit = false }) {
  const city = makeCity(seed, minH, maxH, lit)
  return (
    <svg viewBox="0 0 1600 200" preserveAspectRatio="none" aria-hidden="true" className={className}>
      {[0, 800].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`} fill={fill}>
          {city.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={200 - b.h} width={b.w} height={b.h} />
              {b.wins.map((w, j) => (
                <rect key={j} x={w.x} y={w.y} width="4" height="6" fill="#ffb347" opacity=".8" />
              ))}
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}
