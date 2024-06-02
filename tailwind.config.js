/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: '"Raleway", sans-serif'
      },
      colors: {
        primary: '#3572EF',
        footer: '#A9A9A9'
      }
    },
  },
  plugins: [require("daisyui")],
}

