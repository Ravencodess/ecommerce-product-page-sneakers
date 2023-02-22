/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.html", "./build/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'kumbh-Sans': ['Kumbh Sans', 'sans-serif']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        '--clr-primary-400': 'hsl(26, 100%, 55%)',
        '--clr-primary-600': 'hsl(26, 100%, 45%)',
        '--clr-primary-300': 'hsl(26, 100%, 60%)',
        '--clr-primary-200': ' hsl(25, 100%, 94%)',
        '--clr-neutral-blue-400': 'hsl(220, 13%, 13%)',
        '--clr-neutral-grayblue-400': 'hsl(220, 14%, 75%)',
        '--clr-neutral-grayblue-600': 'hsl(219, 9%, 45%)',
        '--clr-neutral-grayblue-200': 'hsl(223, 64%, 98%)',
        '--clr-neutral-black': 'rgba(0,0,0,0.75)',
        '--clr-neutral-fade': 'rgba(255,255,255,0.75)',
      },
      
      keyframes: {
        'slidein': {
          '0%': {transform: 'translateX(-100px)'},
          '100%': {transform: 'translateX(0)'},
        },
      },
      animation: {
        'slidein': 'slidein 500ms'
      }
    },
  },
  plugins: [],
}
