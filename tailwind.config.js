/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ecf5ff',
          200: '#d9ecff',
          300: '#c6e2ff',
          400: '#a0cfff',
          500: '#79bbff',
          600: '#409EFF',
          700: '#337ecc'
        }
      }
    }
  },
  plugins: []
}