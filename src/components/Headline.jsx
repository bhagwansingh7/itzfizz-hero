// Each letter sits in an overflow-hidden mask so it can slide up into view
export default function Headline({ text }) {
  return (
    <h1
      aria-label={text}
      className="flex flex-wrap justify-center gap-x-[0.9em] font-display text-[clamp(1.75rem,4.6vw,4.5rem)] font-extrabold leading-tight"
    >
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden="true" className="flex">
          {word.split('').map((c, i) => (
            <span key={i} className="inline-block overflow-hidden px-[0.07em]">
              <span className="char inline-block">{c}</span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
