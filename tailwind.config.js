module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          50: '#f9f8f6',
          100: '#f3f2ef',
          200: '#e6e4df',
          300: '#cfc9bd',
          400: '#a99873',
          500: '#C7A239',
          600: '#b08e2f',
          700: '#6b5f4a',
          800: '#0b1221',
          900: '#07090f'
        },
      },
      container: {
        center: true,
        padding: '1rem'
      },
      borderRadius: {
        xl: '12px'
      }
    },
  },
  plugins: [],
}
