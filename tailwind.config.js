/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // If using App router in the future
  ],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ['DynaPuff', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        sixtyfour: ['Sixtyfour', 'sans-serif'], // Added Sixtyfour font
      },
      animation: {
        typewriter: 'typing-effect 2.5s steps(19, end) forwards, blink-caret-effect 0.75s step-end infinite',
      },
      keyframes: {
        'typing-effect': {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'blink-caret-effect': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#34D399' }, // emerald-400
        },
      },
    },
  },
  plugins: [],
};