/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue': {
          950: '#050A30',
          900: '#0A1852',
          800: '#102680',
          700: '#1A3A9F',
          600: '#2652DF',
          500: '#4A75E6',
          400: '#7B9CEF',
          300: '#ADC2F5',
          200: '#D0DEFA',
          100: '#E8EFFC',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};