import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#08080B',
          elevated: '#101014',
          subtle: '#15151A',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.10)',
        },
        ink: {
          DEFAULT: '#F5F5F7',
          soft: '#A1A1AA',
          muted: '#52525B',
        },
        brand: {
          blue: '#5B6CFF',
          purple: '#A855F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'PingFang SC', '-apple-system', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #5B6CFF 0%, #A855F7 100%)',
        'grid-fade':
          'linear-gradient(to bottom, transparent 0%, #08080B 80%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 1s ease-out both',
        'glow-pulse': 'glowPulse 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
