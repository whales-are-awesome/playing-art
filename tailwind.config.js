/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: '#729ACD',
        softblue: '#B9CFDA',
        olive: '#B4B534',
        yellow: '#F5DC90',
        orange: '#F18C1F',
        pink: '#E56787',
        sunny: '#F5DC90',
      },
    },
  },
  plugins: [],
}
