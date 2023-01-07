
const colors = {
  transparent: 'transparent',
  "white": "#ebebeb",
  "black": "#101010",
  'blue': {
    50: '#E7F5FF',
    100: '#D0EBFF',
    200: '#8FC6FF',
    300: '#A8B2C5',
    500: '#5A7899',
    600: '#4B6584',
    700: '#3D5170',
    800: '#2E3D5C',
    900: '#013566',
  },
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: colors,
      animation: {
        autoscroll: 'autoscroll 7s linear infinite',
      },
      keyframes: {
        autoscroll: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: false,
    themes: false,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
  },
}

