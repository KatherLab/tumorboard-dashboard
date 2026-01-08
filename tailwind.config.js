/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Correctness colors
    { pattern: /^(bg|border|text|ring)-(emerald|amber|red|blue|green|gray|rose|violet|purple|cyan|orange|slate|brand)-(50|100|200|300|400|500|600|700|800)$/ },
    { pattern: /^shadow-(red|amber|emerald)-(100|200)$/ },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3f9',
          100: '#ebe7f3',
          200: '#d4cce6',
          300: '#b5a5d4',
          400: '#9279be',
          500: '#4B56D2',  // Vibrant Blue/Purple - secondary
          600: '#472183',  // Deep Purple - primary
          700: '#3a1b6b',
          800: '#2d1553',
          900: '#1f0f3b',
        },
        accent: {
          light: '#82C3EC',  // Light Blue accent
          DEFAULT: '#4B56D2',
          dark: '#472183',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
