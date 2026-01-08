/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Correctness colors
    { pattern: /^(bg|border|text|ring)-(emerald|amber|red|blue|green|gray|rose|violet|purple|cyan|orange|slate)-(50|100|200|300|400|500|600|700|800)$/ },
    { pattern: /^shadow-(red|amber|emerald)-(100|200)$/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
