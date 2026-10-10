/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01261f',
          dark: '#001a15',
          forest: '#1a3c34',
          container: '#1a3c34',
          fixed: '#c5eadf',
          'fixed-dim': '#aacec3',
        },
        secondary: {
          DEFAULT: '#944a00',
          container: '#fc8f34',
          fixed: '#ffdcc5',
          'fixed-dim': '#ffb783',
        },
        accent: {
          DEFAULT: '#e67e22',
          hover: '#d35400',
          warm: '#fc8f34',
          amber: '#f59e0b',
        },
        background: {
          DEFAULT: '#fbf9f8',
          cream: '#fdfbf7',
        },
        surface: {
          DEFAULT: '#ffffff',
          dim: '#dcd9d9',
          bright: '#fbf9f8',
          container: '#f0eded',
          'container-low': '#f6f3f2',
          'container-high': '#eae8e7',
          'container-highest': '#e4e2e1',
          'container-lowest': '#ffffff',
        },
        textMain: '#1b1c1c',
        textMuted: '#64748b',
        outline: '#717976',
        'outline-variant': '#c1c8c4',
      },
      fontFamily: {
        heading: ['"DM Serif Display"', '"Playfair Display"', 'serif'],
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'subtle': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'luxury': '0 20px 40px -15px rgba(1, 38, 31, 0.12)',
        'glow': '0 0 25px rgba(230, 126, 34, 0.25)',
      },
    },
  },
  plugins: [],
}
