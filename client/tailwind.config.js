/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          teal: '#32F9B1',
          teal_glow: 'rgba(50, 249, 177, 0.4)',
        },
        dark: {
          900: '#000000',
          800: '#0B0C0E',
          700: '#1A1C1E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #32F9B1, 0 0 10px #32F9B1' },
          'to': { boxShadow: '0 0 20px #32F9B1, 0 0 30px #32F9B1' },
        }
      }
    },
  },
  plugins: [],
}
