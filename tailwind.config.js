/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'bg-deep': '#080808',
        'bg-main': '#0D0D0D',
        'surface-1': '#131312',
        'surface-warm': '#191817',
        'surface-alt': '#211F1D',
        border: 'rgba(240,237,231,0.10)',
        'border-strong': 'rgba(240,237,231,0.18)',
        muted: '#716D66',
        secondary: '#AAA49A',
        'primary-text': '#F0EDE7',
        'accent-warm': '#A98E72'
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
