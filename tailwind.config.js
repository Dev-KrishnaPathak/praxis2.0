/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          400: '#1e40af',
          500: '#1e3a8a',
          600: '#1e3a8a',
          700: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}