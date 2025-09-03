import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode using a class
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
