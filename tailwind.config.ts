import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#6366f1',
          600: '#5b4df3', // Primary Brand
          700: '#4c3fe0',
        },
        accent: {
          lime: '#a3e635',
          amber: '#f59e0b',
          rose: '#f43f5e',
          emerald: '#10b981',
        },
        surface: {
          app: '#f8fafc',
          card: '#ffffff',
          subtle: '#f1f5f9',
        },
        borderSubtle: '#e2e8f0',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
