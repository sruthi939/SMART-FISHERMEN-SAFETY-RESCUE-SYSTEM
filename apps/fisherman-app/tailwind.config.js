/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#030712',
          900: '#0b1329',
          800: '#111e38',
          700: '#1a2e54',
          500: '#0284c7',
          400: '#38bdf8'
        }
      }
    },
  },
  plugins: [],
}
