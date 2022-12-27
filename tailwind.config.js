// remember to update ./styles/colors on update
const colors = {
  transparent: 'transparent',
  "white": "#FFFFFF",
  "black": "#000000",
  "gray": {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  "red": {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  "yellow": {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },
  "green": {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },
  'blue': {
    50: '#E7F5FF',
    100: '#D0EBFF',
    200: '#BCCDDC',
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
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: colors,
    extend: {
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
  plugins: [],
}

