import type { Config } from 'tailwindcss';

/**
 * Design tokens extracted from the Koach Figma library (node 17:11690).
 * All component styling must reference these tokens — no hardcoded values.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#962067',
          50: '#fbeef6',
          100: '#f6e0ee',
          200: '#ecc1dc',
          600: '#962067',
          700: '#7c1a55',
        },
        ink: {
          primary: '#212121',
          secondary: '#737373',
          tertiary: '#aeaeae',
        },
        grey: {
          50: '#fbfbfb',
          100: '#f5f5f5',
          200: '#e9eaea',
          300: '#dedede',
          400: '#abacad',
          500: '#757575',
          600: '#58595b',
          700: '#797a7c',
        },
        surface: {
          page: '#f2f0f0',
          raised: '#fbfbfb',
          card: '#ffffff',
        },
        line: '#e9eaea',
        success: {
          DEFAULT: '#1f9254',
          bg: '#eafff1',
        },
        danger: {
          DEFAULT: '#cc1d1d',
          bg: '#fdeaea',
        },
        warning: {
          DEFAULT: '#b25e09',
          bg: '#fdf3e7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '18px' }],
        base: ['16px', { lineHeight: '20px' }],
        lg: ['18px', { lineHeight: '24px' }],
        xl: ['20px', { lineHeight: '28px' }],
      },
      borderRadius: {
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
