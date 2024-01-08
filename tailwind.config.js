/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '2500px'},
      // => @media (max-width: 1535px) { ultra }

      'xl': {'max': '1879px'},
      // => @media (max-width: 1279px) { wide screen }

      'lg': {'max': '1200px'},
      // => @media (max-width: 1023px) { min wide screen }

      'md': {'max': '950px'},
      // => @media (max-width: 767px) { tablet }

      'sm': {'max': '650px'},
      // => @media (max-width: 639px) { mobile }
    }
  },
  plugins: [],
}