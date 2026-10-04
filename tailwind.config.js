/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#0e1116', road: '#1b2028', fizz: '#ff5a36', mist: '#c9d1dc' },
      fontFamily: { display: ['"Syne"', 'sans-serif'], body: ['"Inter"', 'sans-serif'] },
    },
  },
  plugins: [],
}
