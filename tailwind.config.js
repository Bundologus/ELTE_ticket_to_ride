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
      number: ['Old Standard TT', 'serif'],
    },
    extend: {
      backgroundImage: {
        'ttr-locomotive':
          'linear-gradient(45deg, rgba(219,119,213,1) 5%, rgba(19,171,223,1) 21%, rgba(137,195,75,1) 42%, rgba(251,225,77,1) 63%, rgba(235,144,73,1) 84%, rgba(233,28,38,1) 100%)',
      },
      colors: {
        'ttr-black': '#9d9291',
        'ttr-blue': '#13abdf',
        'ttr-green': '#89c34b',
        'ttr-orange': '#eb9049',
        'ttr-pink': '#db77d5',
        'ttr-red': '#d14338',
        'ttr-white': '#f4f3e2',
        'ttr-yellow': '#fbe14d',
        'player-black': '#282f25',
        'player-blue': '#005796',
        'player-green': '#066b35',
        'player-red': '#b11017',
        'player-yellow': '#d09d01',
      },
      fontSize: {
        '2xs': ['.65rem', '.8rem'],
      },
      lineHeight: {
        custom: '2.85rem',
      },
      spacing: {
        15: '3.75rem',
        108: '27rem',
        112: '28rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
