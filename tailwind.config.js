/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'deep-black': '#0A0A0A',
        'warm-black': '#0E0D0C',
        surface: '#161616',
        'surface-alt': '#1D1C1C',
        'surface-hover': '#232323',
        'surface-light': '#2C2C2C',
        border: '#363636',
        muted: '#78736C',
        secondary: '#AAA5A0',
        'primary-text': '#E8E2DC'
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
