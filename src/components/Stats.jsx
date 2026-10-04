const STATS = [
  { value: 58, label: 'Increase in pick-up point usage' },
  { value: 23, label: 'Decrease in customer phone calls' },
  { value: 27, label: 'Increase in repeat deliveries' },
  { value: 40, label: 'Decrease in missed handovers' },
]

export default function Stats() {
  return (
    <ul className="mt-[7vh] grid w-full max-w-5xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
      {STATS.map((s) => (
        <li key={s.label} className="stat">
          <p className="font-display text-5xl font-extrabold text-fizz md:text-6xl">
            <span data-count={s.value}>0</span>%
          </p>
          <p className="mx-auto mt-2 max-w-[14rem] text-sm text-mist">{s.label}</p>
        </li>
      ))}
    </ul>
  )
}
