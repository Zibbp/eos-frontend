module.exports = {
  darkMode: 'class',
  prefix: 'tw-',
  important: true,
  content: [],
  theme: {
    extend: {
      colors: {
        'eos-grey': {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
          925: '#171010',
          950: '#212121',
          999: '#181818'
        }
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
