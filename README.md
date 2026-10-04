# Welcome ITZ FIZZ – Scroll-driven hero

React 18 + Vite + GSAP (ScrollTrigger, `@gsap/react`) + Tailwind CSS.

## Run with Docker (recommended)
```bash
# Production build (nginx)  ->  http://localhost:8080
docker compose up --build

# Dev server with hot reload  ->  http://localhost:5173
docker compose --profile dev up --build dev
```
Stop with `Ctrl+C`, or `docker compose down`.

## Run without Docker
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Deploy to GitHub Pages
1. Push to a GitHub repo on the `main` branch.
2. Repo Settings → Pages → Source: **GitHub Actions**.
3. The included workflow builds and publishes automatically.

## Structure
```
src/
  main.jsx            entry
  App.jsx
  components/
    Hero.jsx          all GSAP logic (useGSAP hook): intro + scroll timeline
    Headline.jsx      masked, letter-spaced headline
    Stats.jsx         impact metrics
    Car.jsx           SVG car, wheels, headlight beam, speed streaks
    Skyline.jsx       generated parallax city layers
```

## How it works
- **Intro (time-based):** skyline rises, headline letters slide up out of masks, car drives in, stats rise one by one while numbers count up.
- **Scroll (progress-based):** the hero is pinned and one GSAP timeline is scrubbed by scroll (`scrub: 1.2` for smoothing). The car travels across the road, wheels spin, headlight beam and speed streaks build, two skyline layers move at different speeds (parallax), the sky warms to dawn, the headline lifts away and a progress bar fills.
- **Performance:** only `transform` and `opacity` animate; the progress number is written straight to the DOM (no React re-renders on scroll); travel distance is recalculated only on resize.
- Respects `prefers-reduced-motion`.
