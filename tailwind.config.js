module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      regular: ['IM Fell English', 'serif'],
      smallCaps: ['IM Fell Great Primer SC', 'serif'],
    },
    extend: {
      backgroundImage: {
        'ttr-rainbow-grad':
          'linear-gradient(125deg, rgba(172,102,183,1) 0%, rgba(10,121,192,1) 25%, rgba(164,203,72,1) 50%, rgba(244,210,86,1) 75%, rgba(197,128,50,1) 100%)',
      },
      colors: {
        'ttr-black': '#392f2f',
        'ttr-blue': '#0a79c0',
        'ttr-green': '#a4cb48',
        'ttr-orange': '#c58032',
        'ttr-purple': '#ac66b7',
        'ttr-red': '#e03f0a',
        'ttr-white': '#f0efec',
        'ttr-yellow': '#f4d256',
        'cart-black': '#282f25',
        'cart-blue': '#009cc1',
        'cart-green': '#02aa50',
        'cart-red': '#e91c26',
        'cart-yellow': '#fee138',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
