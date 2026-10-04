const Wheel = ({ cx }) => (
  <g className="wheel">
    <circle cx={cx} cy="112" r="24" fill="#0e1116" />
    <circle cx={cx} cy="112" r="14" fill="#c9d1dc" />
    <path d={`M${cx} 98v28M${cx - 14} 112h28`} stroke="#0e1116" strokeWidth="4" />
  </g>
)

// Streaks trail behind the car; the whole group is moved by one transform
export default function Car() {
  return (
    <div className="car absolute bottom-[calc(26vh-2px)] left-0 z-30 w-[clamp(220px,30vw,420px)]">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="streak absolute right-[92%] h-[2px] w-[22vw] origin-right rounded bg-gradient-to-l from-fizz/80 to-transparent"
          style={{ bottom: `${14 + i * 14}%` }}
        />
      ))}
      <svg viewBox="0 0 400 140" role="img" aria-label="Car driving across the road" className="relative w-full overflow-visible">
        <defs>
          <linearGradient id="beam" x1="0" x2="1">
            <stop offset="0" stopColor="#ffe9a8" stopOpacity=".85" />
            <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon className="beam" points="388,86 760,30 760,140" fill="url(#beam)" />
        <path d="M18 98c0-14 6-22 22-26l50-12c14-14 34-26 62-26h42c24 0 42 10 58 28l66 12c18 3 28 10 28 24v14c0 6-4 10-10 10H28c-6 0-10-4-10-10z" fill="#ff5a36" />
        <path d="M118 64c10-9 24-18 46-18h34v30h-96zM212 46h14c14 0 26 7 38 20l8 10h-60z" fill="#0e1116" opacity=".85" />
        <rect x="372" y="86" width="18" height="8" rx="3" fill="#ffe9a8" />
        <rect x="10" y="86" width="12" height="8" rx="3" fill="#ffb3a1" />
        <Wheel cx={302} />
        <Wheel cx={104} />
      </svg>
    </div>
  )
}
