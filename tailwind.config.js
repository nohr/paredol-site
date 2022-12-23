/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  colors: {
    'blue': {
      300:'hsla(209, 100%, 80%, 1)',
      900:'hsl(209, 100%, 20%)',
    },
    'gray': '#8492a6',
    'gray-light': '#d3dce6',
  },
  theme: {
    extend: {
      animation: {
        quotescroll: 'quotescroll 7s linear infinite',
      },
      keyframes: {
        quotescroll: {
          'from': { transform: 'translate3d(50%, 0, 0)' },
          'to': { transform: 'translate3d(-90%, 0, 0)' },
        },
    },
  },
},
  plugins: [],
}
