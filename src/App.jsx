import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <main>
      <Hero />
      <section className="grid min-h-screen place-items-center bg-road px-6 text-center">
        <p className="max-w-xl font-display text-3xl font-bold md:text-5xl">Delivered, right on time.</p>
      </section>
    </main>
  )
}
