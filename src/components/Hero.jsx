import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Headline from './Headline.jsx'
import Stats from './Stats.jsx'
import Car from './Car.jsx'
import Skyline from './Skyline.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Hero() {
  const root = useRef(null)
  const readout = useRef(null)

  useGSAP(
    () => {
      /* ---- 1. Intro: runs once on load ---- */
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .from('.sky-far, .sky-near', { yPercent: 40, opacity: 0, duration: 1.4, stagger: 0.15 })
        .from('.char', { yPercent: 120, duration: 1.1, stagger: 0.05 }, 0.2)
        .from('.car', { x: -300, opacity: 0, duration: 1.2 }, 0.6)
        .from('.stat', { y: 40, opacity: 0, duration: 0.8, stagger: 0.18 }, 1)

      root.current.querySelectorAll('[data-count]').forEach((el, i) => {
        const n = { v: 0 }
        gsap.to(n, {
          v: Number(el.dataset.count),
          duration: 1.6,
          delay: 1.1 + i * 0.18,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = Math.round(n.v)),
        })
      })

      /* ---- 2. Scroll: one timeline scrubbed by scroll progress ---- */
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const car = root.current.querySelector('.car')

        const tl = gsap.timeline({
          defaults: { ease: 'none', duration: 1 },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1.2, // smoothing: animation eases toward scroll position
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              readout.current.textContent = String(Math.round(self.progress * 100)).padStart(3, '0')
            },
          },
        })

        tl.fromTo('.car', { x: 16 }, { x: () => window.innerWidth - car.offsetWidth - 32 }, 0)
          .fromTo('.trail', { scaleX: 0.04 }, { scaleX: 1 }, 0)
          .to('.wheel', { rotation: 1440 }, 0)
          .fromTo('.beam', { opacity: 0.25 }, { opacity: 1 }, 0)
          .fromTo('.streak', { scaleX: 0.1, opacity: 0 }, { scaleX: 1, opacity: 0.8, duration: 0.3, stagger: 0.04 }, 0.05)
          .to('.sky-far', { xPercent: -25 }, 0) // parallax: far layer slower,
          .to('.sky-near', { xPercent: -50 }, 0) // near layer faster
          .to('.dawn', { opacity: 0.75 }, 0)
          .to('.char', { y: -70, opacity: 0.1, duration: 0.4, stagger: 0.03 }, 0.05)
          .to('.stat', { y: -36, scale: 1.06, duration: 0.5, stagger: 0.07 }, 0.15)
          .fromTo('.bar', { scaleX: 0 }, { scaleX: 1 }, 0)
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-ink to-[#1b2432]">
      <div className="dawn absolute inset-0 bg-gradient-to-t from-fizz/60 via-fizz/10 to-transparent opacity-0" />

      <Skyline className="sky-far absolute bottom-[26vh] left-0 h-[30vh] w-[200%]" seed={7} minH={50} maxH={150} fill="#18202c" />
      <Skyline className="sky-near absolute bottom-[26vh] left-0 h-[20vh] w-[200%]" seed={21} minH={40} maxH={170} fill="#0f141b" lit />

      <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[12vh] text-center">
        <Headline text="WELCOME ITZ FIZZ" />
        <Stats />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-[26vh] bg-road">
        <div className="trail absolute left-0 top-0 h-1 w-full origin-left bg-fizz shadow-[0_0_24px_4px_#ff5a36]" />
        <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-white/15" />
        <div className="absolute inset-x-0 bottom-6 flex items-center gap-4 px-6 text-xs text-mist">
          <span>Scroll to drive</span>
          <div className="h-px flex-1 bg-white/10">
            <div className="bar h-px origin-left bg-fizz" />
          </div>
          <span ref={readout} className="tabular-nums">000</span>
        </div>
      </div>

      <Car />
    </section>
  )
}
