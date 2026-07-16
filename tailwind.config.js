/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        surface: '#1e293b',
        accent: '#3b82f6',
        success: '#22c55e',
        danger: '#ef4444',
        gold: '#eab308',
        border: '#334155'
      }
    }
  },
  plugins: []
}
