const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/index.js',
    './components/**/*.{html,js}'
  ],
  theme: {
    colors: {
      background: '#001111',
      backgroundHover: "#484848",
      accent1: "#627AB0",
      accent2: "#356FBB",
      accent3: "#F8E1F1",
      green: "#22c55e",
      red: "#ef4444",
      text: "#FFFFFF",
      subtext: "#e5e7eb",
      disabled: "#6b7280"
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
