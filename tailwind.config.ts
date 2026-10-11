import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF8F5',
          alt: '#F4EFEB',
          warm: '#EFE8E1',
        },
        ink: {
          DEFAULT: '#141619',
          card: '#1E2228',
          subtle: '#2E333C',
          muted: '#626875',
          border: '#3A3F4B',
        },
        brand: {
          50: '#FDF4F0',
          100: '#FAE6DD',
          200: '#F5CEBD',
          300: '#EDA88F',
          400: '#E47D5C',
          500: '#D9532F', // Primary Terracotta Accent
          600: '#C1411F',
          700: '#A13217',
          800: '#842B17',
          900: '#6D2617',
          DEFAULT: '#D9532F',
        },
        sage: {
          50: '#F2F6F3',
          100: '#E2ECE4',
          500: '#3D7A58',
          600: '#2F6145',
          DEFAULT: '#2F6145',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Newsreader',
          'Playfair Display',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        'book': '0 12px 30px -10px rgba(20, 22, 25, 0.15), 0 4px 10px -4px rgba(20, 22, 25, 0.08)',
        'book-hover': '0 20px 40px -12px rgba(217, 83, 47, 0.25), 0 8px 16px -6px rgba(20, 22, 25, 0.12)',
        'tactile': '0 2px 0 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'card': '14px',
      },
    },
  },
  plugins: [],
};

export default config;
