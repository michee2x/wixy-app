/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      perspective:{
        1000:"1000px",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

