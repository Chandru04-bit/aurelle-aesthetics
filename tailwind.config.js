/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './js/**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        aurelle: {
          ivory: '#FAF8F4',
          beige: '#E9E0D5',
          blush: '#EBD9D5',
          sage: '#A8B5A0',
          charcoal: '#292A27',
          gold: '#C5A880',
          'gold-light': '#DFC8A8',
          'gold-dark': '#9A7D56',
          darkbg: '#161715',
          darkcard: '#1F201D',
          darkborder: '#2F302C',
          darktext: '#F5F2EB',
          darkmuted: '#9E9C96'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 42, 39, 0.05)',
        'luxury': '0 10px 30px -5px rgba(41, 42, 39, 0.08)',
        'glow': '0 0 25px rgba(235, 217, 213, 0.45)',
        'dark-luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.4)'
      },
      borderRadius: {
        'luxury': '1.25rem',
        'subtle': '0.625rem'
      }
    }
  },
  plugins: []
};
