/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        georgian: ['Noto Serif Georgian', 'serif'],
      },
      colors: {
        // Original gold
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Cinematic Dark palette
        cinema: {
          black: '#050505',
          dark: '#0a0a0a',
          mid: '#111111',
          soft: '#1a1a1a',
        },
        'gold-aged': '#c9a84c',
        'gold-bright': '#e8c86a',
        'gold-dim': '#8a6f30',
        // Luxury Elegant palette
        ivory: '#faf8f3',
        cream: {
          DEFAULT: '#f4efe5',
          dark: '#ede6d8',
        },
        linen: '#e8dece',
        stone: {
          light: '#c8bba9',
          DEFAULT: '#a0917e',
        },
        umber: '#6b5744',
        espresso: '#3a2e25',
        ink: '#1e1610',
        terracotta: '#967259',
        forest: '#2c4a3e',
        // Adventure Bold palette
        'gold-glow': 'rgba(251, 191, 36, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'fade-in-down': 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-up': 'revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -1%)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(251, 191, 36, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
