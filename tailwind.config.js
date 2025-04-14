/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#0D9488', // teal-600
            50: '#F0FDFA',
            100: '#CCFBF1',
            200: '#99F6E4',
            300: '#5EEAD4',
            400: '#2DD4BF',
            500: '#14B8A6',
            600: '#0D9488',
            700: '#0F766E',
            800: '#115E59',
            900: '#134E4A',
            950: '#042F2E',
          },
          secondary: {
            DEFAULT: '#0891B2', // cyan-600
            50: '#ECFEFF',
            100: '#CFFAFE',
            200: '#A5F3FC',
            300: '#67E8F9',
            400: '#22D3EE',
            500: '#06B6D4',
            600: '#0891B2',
            700: '#0E7490',
            800: '#155E75',
            900: '#164E63',
            950: '#083344',
          },
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        'hero-pattern': "url('/assets/hero/healthier.png')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'grid': '20px 20px',
      },
    },
  },
  plugins: [],
};
